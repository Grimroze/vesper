import type { Node, Edge } from '@xyflow/react';
import { Position } from '@xyflow/react';
import dagre from 'dagre';
import {
  Calculator, Cpu, Settings2, Network, Zap, Compass, Layers, Brain,
  Database, Link2, Search, Workflow, Terminal, Bot, Target, Gauge,
  Server, Clock, Cloud, Shield
} from 'lucide-react';

export type ProgressStatus = 'Todo' | 'In Progress' | 'Completed';

export interface InterviewQuestion {
  q: string;
  a: string;
}

export interface ResourceLink {
  label: string;
  url: string;
}

export interface NodeData {
  id: string;
  title: string;
  tag: string;
  description: string;
  duration: string;
  hours: number;
  tools: string[];
  concepts: string[];
  deliverable: string;
  interview: InterviewQuestion[];
  links: ResourceLink[];
  status?: ProgressStatus;
  icon?: any;
  isMatched?: boolean;
}

export const PHASES = [
  'All',
  'Foundations',
  'Architecture',
  'Data Pipeline',
  'Agents',
  'Fine-Tuning',
  'Alignment',
  'Inference',
  'Ops & Scale'
] as const;

export const RAW_NODE_DATA: Omit<NodeData, 'status'>[] = [
  // Phase 1: Foundations
  {
    id: 'math-linear-algebra',
    title: 'Linear Algebra & Calculus',
    tag: 'Foundations',
    description: 'Matrix decompositions, vector spaces, gradients, and multivariable chain rules powering neural backpropagation.',
    duration: '15 Hours',
    hours: 15,
    icon: Calculator,
    tools: ['NumPy', 'SciPy', 'SymPy', 'Einops'],
    concepts: ['Jacobian & Hessian Matrices', 'Singular Value Decomposition (SVD)', 'Eigenvalues & Spectral Radius', 'Vector Calculus & Automatic Differentiation'],
    deliverable: 'Vectorized Multivariable Backprop Engine from Scratch',
    interview: [
      { q: 'Why is SVD equivalent to PCA on zero-centered data?', a: 'SVD decomposes matrix X into U S V^T. The right singular vectors V are the eigenvectors of the sample covariance matrix X^T X, and singular values S are proportional to standard deviations along principal components.' },
      { q: 'What causes vanishing or exploding gradients from an eigenvalue perspective?', a: 'Repeated matrix multiplications during backprop scale error vectors by eigenvalues of weight matrices. If the spectral radius > 1, gradients explode exponentially; if < 1, they vanish to zero.' }
    ],
    links: [
      { label: 'Matrix Calculus for Deep Learning', url: 'https://arxiv.org/abs/1802.01528' },
      { label: '3Blue1Brown: Essence of Linear Algebra', url: 'https://www.youtube.com/playlist?list=PLZHQObOWTQDPD3MizzM2xVFitgF8hE_ab' }
    ]
  },
  {
    id: 'cuda-basics',
    title: 'CUDA & GPU Architecture',
    tag: 'Foundations',
    description: 'Hardware hierarchy, warps, streaming multiprocessors (SMs), shared memory tiling, and parallel kernel execution.',
    duration: '20 Hours',
    hours: 20,
    icon: Cpu,
    tools: ['CUDA C++', 'Nvidia Nsight Compute', 'PyCUDA', 'Triton JIT'],
    concepts: ['Thread Blocks, Grids & Warps', 'Warp Divergence & Branch Penalties', 'Shared Memory Bank Conflicts', 'Memory Coalescing & Global HBM Bandwidth'],
    deliverable: 'Tiled CUDA Matrix Multiplication Kernel with Shared Memory',
    interview: [
      { q: 'What is warp divergence and how does it hurt GPU performance?', a: 'A warp consists of 32 threads executing instructions in lockstep (SIMT). If threads take divergent branches (if/else), the GPU serializes each path, idling non-participating threads and wasting compute capacity.' },
      { q: 'What are Shared Memory Bank Conflicts and how are they avoided?', a: 'Shared memory is divided into 32 equal-sized banks. If multiple threads in a warp access different addresses within the same bank simultaneously, requests serialize. Padding array columns avoids stride-based conflicts.' }
    ],
    links: [
      { label: 'Nvidia CUDA C++ Best Practices', url: 'https://docs.nvidia.com/cuda/cuda-c-best-practices-guide/' },
      { label: 'Simon Boehm: Optimize CUDA MatMul', url: 'https://siboehm.com/articles/22/CUDA-MMM' }
    ]
  },
  {
    id: 'pytorch-internals',
    title: 'PyTorch & Autograd',
    tag: 'Foundations',
    description: 'Dynamic computational graphs, backward execution tape, memory pinned tensors, and TorchDynamo compilation.',
    duration: '25 Hours',
    hours: 25,
    icon: Settings2,
    tools: ['PyTorch 2.x', 'TorchScript', 'TorchDynamo', 'CUDA Streams'],
    concepts: ['Autograd DAG & Function Nodes', 'Non-blocking Transfers & Pinned Memory', 'In-place Operations vs Leaf Variable Mutation', 'TorchInductor Graph Lowering'],
    deliverable: 'Custom C++/CUDA Extension for Custom Activation Function',
    interview: [
      { q: 'What is the difference between tensor.view(), reshape(), and contiguous()?', a: 'view() returns a tensor with modified strides sharing original storage (requires contiguous data). reshape() returns a view when contiguous, else re-allocates a copy. contiguous() forces memory reallocation if strides are non-contiguous.' },
      { q: 'Why should PyTorch optimizers zero gradients before each backward pass?', a: 'By default, PyTorch accumulates gradients (tensor.grad += ...) on each .backward() call, which is intentional for gradient accumulation across mini-batches. Calling optimizer.zero_grad(set_to_none=True) clears old buffers without extra allocations.' }
    ],
    links: [
      { label: 'Edward Yang: PyTorch Internals', url: 'http://blog.ezyang.com/2019/05/pytorch-internals/' },
      { label: 'PyTorch 2.0 Torch.compile Guide', url: 'https://pytorch.org/get-started/pytorch-2.0/' }
    ]
  },

  // Phase 2: Architecture
  {
    id: 'transformer-basics',
    title: 'The Transformer Architecture',
    tag: 'Architecture',
    description: 'Self-attention mechanisms, multi-head projection matrices, residual connections, and layer normalization variants.',
    duration: '20 Hours',
    hours: 20,
    icon: Network,
    tools: ['PyTorch', 'Hugging Face Transformers', 'Tiktoken'],
    concepts: ['Scaled Dot-Product Attention', 'Multi-Head Attention Projections', 'Pre-LN vs Post-LN Dynamics', 'Byte-Pair Encoding (BPE) Tokenization'],
    deliverable: 'Decoder-Only GPT Architecture Implemented from Raw PyTorch',
    interview: [
      { q: 'Why is dot-product attention scaled by 1/sqrt(d_k)?', a: 'For large projection dimensions d_k, the dot products grow large in magnitude, pushing softmax into regions with vanishingly small gradients. Scaling by 1/sqrt(d_k) preserves unit variance and stable gradients.' },
      { q: 'Why did modern LLMs shift from Post-LN to Pre-LN or RMSNorm?', a: 'Post-LN normalizes after residual additions, causing gradient instability that requires delicate learning rate warmup. Pre-LN normalizes inputs to sub-layers, allowing unimpeded gradient flow through the residual highway.' }
    ],
    links: [
      { label: 'Attention Is All You Need (Paper)', url: 'https://arxiv.org/abs/1706.03762' },
      { label: 'Andrej Karpathy: Let\'s build GPT', url: 'https://www.youtube.com/watch?v=kCc8FmEb1nY' }
    ]
  },
  {
    id: 'attn-mechanisms',
    title: 'FlashAttention & GQA',
    tag: 'Architecture',
    description: 'Hardware-aware IO-complexity reduction via tiling in SRAM, and Grouped Query Attention (GQA) for memory savings.',
    duration: '15 Hours',
    hours: 15,
    icon: Zap,
    tools: ['FlashAttention-2', 'Triton', 'xFormers'],
    concepts: ['IO-Complexity & Memory Hierarchy Tiling', 'Online Softmax Computation', 'Multi-Query (MQA) vs Grouped-Query Attention (GQA)', 'KV Cache Footprint Reduction'],
    deliverable: 'Triton Implementation of Tiled Online Softmax Attention',
    interview: [
      { q: 'How does FlashAttention achieve 3-5x speedup without changing mathematical output?', a: 'Standard attention writes N x N attention matrices to slow GPU HBM. FlashAttention tiles query, key, and value blocks into fast on-chip SRAM and uses online softmax rescaling, drastically cutting memory read/write cycles.' },
      { q: 'What advantage does Grouped Query Attention (GQA) provide over Multi-Head Attention?', a: 'GQA groups multiple query heads to share a single key/value head pair. This preserves representation capacity while slashing KV cache memory by 4x-8x during generation.' }
    ],
    links: [
      { label: 'FlashAttention Paper (Dao et al.)', url: 'https://arxiv.org/abs/2205.14135' },
      { label: 'GQA: Training Generalized Multi-Query Transformer', url: 'https://arxiv.org/abs/2305.13245' }
    ]
  },
  {
    id: 'rope-embeddings',
    title: 'Rotary Position Embeddings (RoPE)',
    tag: 'Architecture',
    description: 'Relative position encoding via complex 2D rotational transformations and long-context length extrapolation techniques.',
    duration: '10 Hours',
    hours: 10,
    icon: Compass,
    tools: ['PyTorch', 'Hugging Face', 'vLLM'],
    concepts: ['Complex Inner Product Orthogonality', 'Relative Distance Decay Function', 'Linear RoPE Scaling vs YaRN Interpolation', 'Base Frequency (Theta) Modulation'],
    deliverable: 'RoPE Layer with Dynamic Context Window Extrapolation Module',
    interview: [
      { q: 'Why is RoPE preferred over learned absolute positional embeddings in modern models?', a: 'RoPE applies an orthogonal rotation matrix directly to Q and K vectors. The resulting dot product (Q_m · K_n) depends strictly on relative token distance (m - n), enabling natural length extrapolation.' },
      { q: 'What is the purpose of YaRN (Yet another RoPE extensioN)?', a: 'Direct linear scaling compresses all frequencies uniformly, blurring high-frequency localized attention. YaRN applies dynamic temperature-scaled interpolation to high and low frequencies separately.' }
    ],
    links: [
      { label: 'RoFormer: Enhanced Transformer with RoPE', url: 'https://arxiv.org/abs/2104.09864' },
      { label: 'YaRN: Efficient Context Window Extension', url: 'https://arxiv.org/abs/2309.00071' }
    ]
  },
  {
    id: 'moe-arch',
    title: 'Mixture of Experts (MoE)',
    tag: 'Architecture',
    description: 'Conditional computation, sparse gating routers, load balancing aux-losses, and expert parallel distributed routing.',
    duration: '20 Hours',
    hours: 20,
    icon: Layers,
    tools: ['Megablocks', 'DeepSpeed-MoE', 'vLLM'],
    concepts: ['Top-K Sparse Softmax Gating', 'Expert Over-capacity & Dropped Tokens', 'Load Balancing Auxiliary Losses', 'Shared Experts vs Routed Experts'],
    deliverable: 'Production Sparse MoE Layer with Auxiliary Load-Balancing Loss',
    interview: [
      { q: 'Why is token dropping or padding necessary in standard MoE routing?', a: 'If a popular expert receives more tokens than its fixed buffer capacity, tokens are dropped (skipped) to prevent GPU straggler bottlenecks, which can degrade output quality if load-balancing loss is poorly tuned.' },
      { q: 'How does Mixtral-style MoE differ from classic Switch Transformers?', a: 'Switch Transformer routes each token to top-1 expert. Mixtral routes to top-2 experts out of 8 per layer, allowing combination of diverse specialized sub-networks without doubling forward compute.' }
    ],
    links: [
      { label: 'Mixtral of Experts Technical Report', url: 'https://arxiv.org/abs/2401.04088' },
      { label: 'MegaBlocks: Efficient Sparse MoE', url: 'https://arxiv.org/abs/2211.15841' }
    ]
  },
  {
    id: 'ssm-mamba',
    title: 'State Space Models (Mamba)',
    tag: 'Architecture',
    description: 'Sub-quadratic long-context sequence modeling using continuous-time state spaces and hardware-aware selective scans.',
    duration: '25 Hours',
    hours: 25,
    icon: Brain,
    tools: ['Mamba', 'PyTorch', 'CUDA'],
    concepts: ['Continuous Linear Time-Invariant Systems', 'Selective State Space Mechanism (S6)', 'Hardware-Aware Associative Parallel Scan', 'Hybrid Mamba-Transformer Hybrids (Jamba)'],
    deliverable: 'Selective Scan Linear Attention Module in PyTorch',
    interview: [
      { q: 'How does Mamba achieve O(N) sequence length complexity compared to Transformer O(N^2)?', a: 'Instead of comparing every token against every other token via attention matrices, Mamba maps input sequences into a hidden state vector of fixed dimension that updates recurrence-style over time.' },
      { q: 'Why was traditional LTI State Space (S4) insufficient for language modeling until Mamba?', a: 'S4 parameters (A, B, C) were static across all inputs. Mamba makes B, C, and Delta input-dependent, enabling the model to selectively remember or filter out information token-by-token.' }
    ],
    links: [
      { label: 'Mamba: Linear-Time Sequence Modeling', url: 'https://arxiv.org/abs/2312.00752' },
      { label: 'The Annotated S4', url: 'https://srush.github.io/annotated-s4/' }
    ]
  },

  // Phase 3: RAG & Data
  {
    id: 'vector-dbs',
    title: 'Vector DBs & Indexing',
    tag: 'Data Pipeline',
    description: 'Hierarchical Navigable Small World (HNSW) graphs, inverted file product quantization (IVF-PQ), and metric indexing.',
    duration: '15 Hours',
    hours: 15,
    icon: Database,
    tools: ['Qdrant', 'Milvus', 'Faiss', 'pgvector'],
    concepts: ['HNSW Proximity Graph Traversal', 'Product Quantization Vector Compression', 'Exact Cosine vs Dot Product vs L2 Distance', 'Payload Filtering & Hybrid Search Indexing'],
    deliverable: 'High-Throughput Vector Search Service with Qdrant and HNSW Indexing',
    interview: [
      { q: 'What is the trade-off between M and efConstruction parameters in HNSW?', a: 'M controls the maximum number of bidirectional connections per node; higher M improves recall but increases RAM and build time. efConstruction sets the search queue size during graph construction, improving index quality at the cost of indexing speed.' },
      { q: 'How does Product Quantization (PQ) compress high-dimensional vectors?', a: 'PQ splits a D-dimensional vector into M sub-vectors, clusters each sub-space with k-means into 256 centroids, and represents each sub-vector with an 8-bit cluster index, yielding 95%+ memory compression.' }
    ],
    links: [
      { label: 'HNSW Algorithm Paper (Malkov et al.)', url: 'https://arxiv.org/abs/1603.09320' },
      { label: 'Qdrant Architecture Documentation', url: 'https://qdrant.tech/documentation/' }
    ]
  },
  {
    id: 'embedding-models',
    title: 'Embedding Models & Tuning',
    tag: 'Data Pipeline',
    description: 'Contrastive learning, Matryoshka representation learning, hard negative mining, and domain-adapted text embeddings.',
    duration: '20 Hours',
    hours: 20,
    icon: Link2,
    tools: ['SentenceTransformers', 'FlagEmbedding (BGE)', 'Tevatron', 'PyTorch'],
    concepts: ['MultipleNegativesRankingLoss & InfoNCE', 'Hard Negative Mining with BM25/Cross-Encoders', 'Matryoshka Representation Embeddings (MRL)', 'Asymmetric Query-Passage Fine-Tuning'],
    deliverable: 'Domain-Fine-Tuned Matryoshka Embedding Model with Hard Negatives',
    interview: [
      { q: 'Why is Matryoshka Representation Learning (MRL) useful in production?', a: 'MRL trains the model so the first d dimensions (e.g. 128 of 1024) retain most semantic information. You can use 128-d for fast coarse retrieval and full 1024-d for reranking, cutting search latency by 80%.' },
      { q: 'Why are random negatives inferior to hard negatives during contrastive embedding training?', a: 'Random negatives are trivially easy for the encoder to separate, resulting in near-zero gradients. Hard negatives (lexically similar passages that do not answer the query) force the model to capture deep semantic distinctions.' }
    ],
    links: [
      { label: 'Matryoshka Representation Learning Paper', url: 'https://arxiv.org/abs/2205.13147' },
      { label: 'Sentence Transformers Documentation', url: 'https://sbert.net/' }
    ]
  },
  {
    id: 'naive-rag',
    title: 'Naive RAG & Chunking',
    tag: 'Data Pipeline',
    description: 'Document extraction, recursive chunking strategies, semantic overlap, and end-to-end vector retrieval pipelines.',
    duration: '15 Hours',
    hours: 15,
    icon: Search,
    tools: ['LangChain', 'LlamaIndex', 'Unstructured.io', 'ChromaDB'],
    concepts: ['Recursive Character Splitting', 'Semantic Sentence Similarity Chunking', 'Token Budget Allocation & Context Overflow', 'Retrieval Recall vs Precision Trade-offs'],
    deliverable: 'Complete Document Ingestion and Semantic Retrieval QA Service',
    interview: [
      { q: 'What are the failure modes of naive fixed-size chunking?', a: 'Fixed chunks sever semantic contexts mid-sentence or mid-paragraph, drop hierarchical heading context, and struggle when answers span multiple chunk boundaries, leading to hallucination.' },
      { q: 'How does Parent-Document retrieval resolve the chunking dilemma?', a: 'It splits documents into tiny chunks for accurate vector retrieval matching, but retrieves the larger parent document or surrounding window to feed the LLM for complete context.' }
    ],
    links: [
      { label: 'LlamaIndex Documentation', url: 'https://docs.llamaindex.ai/' },
      { label: 'Chunking Strategies Guide (Pinecone)', url: 'https://www.pinecone.io/learn/chunking-strategies/' }
    ]
  },
  {
    id: 'colbert-reranking',
    title: 'ColBERT & Late Interaction',
    tag: 'Data Pipeline',
    description: 'Token-level semantic search, MaxSim operator, cross-encoder reranking, and sub-millisecond multi-vector retrieval.',
    duration: '20 Hours',
    hours: 20,
    icon: Layers,
    tools: ['ColBERTv2', 'RAGatouille', 'Cohere Rerank API', 'FlashRank'],
    concepts: ['Late Interaction vs Bi-Encoder vs Cross-Encoder', 'MaxSim Token Alignment Operator', 'Centroid Pruning & Residual Compression', 'Two-Stage Retrieval-Rerank Architecture'],
    deliverable: 'ColBERT Late-Interaction Reranking Pipeline with RAGatouille',
    interview: [
      { q: 'Why is ColBERT faster than Cross-Encoders while matching their accuracy?', a: 'Cross-encoders compute all-to-all attention over Query + Document together at runtime (O((L_q+L_d)^2)). ColBERT precomputes token representations and calculates cheap token-level MaxSim dot products in milliseconds.' },
      { q: 'What is the MaxSim operator in ColBERT?', a: 'For each token vector in the query, MaxSim finds the maximum cosine similarity among all token vectors in the passage, then sums these maximum scores across all query tokens.' }
    ],
    links: [
      { label: 'ColBERTv2: Effective and Efficient Retrieval', url: 'https://arxiv.org/abs/2112.01488' },
      { label: 'RAGatouille GitHub Repository', url: 'https://github.com/bclavie/RAGatouille' }
    ]
  },
  {
    id: 'adv-rag-routing',
    title: 'Advanced RAG & Routing',
    tag: 'Data Pipeline',
    description: 'HyDE, multi-query expansion, semantic router gateways, contextual compression, and self-querying structured filters.',
    duration: '25 Hours',
    hours: 25,
    icon: Workflow,
    tools: ['LlamaIndex', 'DSPy', 'Semantic Router', 'Haystack'],
    concepts: ['Hypothetical Document Embeddings (HyDE)', 'Reciprocal Rank Fusion (RRF)', 'Multi-Query Expansion & Step-Back Prompting', 'Dynamic Intent Router Gateways'],
    deliverable: 'Self-Routing RAG System with HyDE and Hybrid BM25/Vector Fusion',
    interview: [
      { q: 'How does Hypothetical Document Embedding (HyDE) solve vocabulary mismatch?', a: 'Instead of searching with a brief question, HyDE prompts an LLM to generate a hypothetical answer passage. The generated passage vector sits in the document space rather than the query space, matching real documents better.' },
      { q: 'Explain Reciprocal Rank Fusion (RRF) and why it outperforms score averaging.', a: 'Different retrievers (e.g. BM25 and Dense Vectors) output incomparable raw score scales. RRF sums 1 / (k + rank) for each document across rankings, providing robust scale-invariant fusion.' }
    ],
    links: [
      { label: 'Precise Zero-Shot Dense Retrieval (HyDE Paper)', url: 'https://arxiv.org/abs/2212.10496' },
      { label: 'Advanced RAG Techniques (LlamaIndex Blog)', url: 'https://www.llamaindex.ai/blog' }
    ]
  },
  {
    id: 'graph-rag',
    title: 'GraphRAG & Knowledge Graphs',
    tag: 'Data Pipeline',
    description: 'Extracting entity-relationship triplets, community detection clustering, Graph ML algorithms, and multi-hop reasoning.',
    duration: '30 Hours',
    hours: 30,
    icon: Network,
    tools: ['Neo4j', 'Microsoft GraphRAG', 'NetworkX', 'Cypher'],
    concepts: ['Entity-Relation Triplet Extraction via LLMs', 'Hierarchical Leiden Community Detection', 'Global Summary vs Local Multi-Hop Traversal', 'Graph-Vector Hybrid Query Engines'],
    deliverable: 'Enterprise Knowledge Graph RAG Engine with Neo4j & Cypher Queries',
    interview: [
      { q: 'When does GraphRAG outperform traditional Vector RAG?', a: 'Standard RAG fails on global synthesis queries (e.g., "What are the major themes across all 500 documents?"). GraphRAG summarizes hierarchically clustered communities, synthesizing comprehensive answers across the entire corpus.' },
      { q: 'How does Leiden community detection help in GraphRAG?', a: 'It clusters densely connected entities into hierarchical topic communities, allowing the system to pre-generate holistic summary reports at multiple abstraction levels.' }
    ],
    links: [
      { label: 'Microsoft GraphRAG Research Paper', url: 'https://arxiv.org/abs/2404.16130' },
      { label: 'Neo4j GenAI Integration Guide', url: 'https://neo4j.com/developer/genai-ecosystem/' }
    ]
  },

  // Phase 4: Agents
  {
    id: 'prompt-eng',
    title: 'Advanced Prompt Engineering',
    tag: 'Agents',
    description: 'Structured output schemas, grammar-constrained decoding (CFGs), chain-of-thought, and few-shot in-context learning.',
    duration: '15 Hours',
    hours: 15,
    icon: Terminal,
    tools: ['Outlines', 'Guidance', 'Pydantic', 'Instructor'],
    concepts: ['Grammar-Constrained Finite State Decoding', 'Chain-of-Thought & Tree-of-Thoughts', 'Self-Consistency Sampling', 'Few-Shot Exemplar Selection with KNN'],
    deliverable: 'Guaranteed-Schema JSON Extractor with Outlines and Regex CFGs',
    interview: [
      { q: 'How does Outlines guarantee 100% valid JSON without parsing retries?', a: 'Outlines builds a Finite State Machine from Pydantic JSON schemas and masks out invalid token logits at every decoding step, making it mathematically impossible for the LLM to emit invalid tokens.' },
      { q: 'What is Self-Consistency in Chain-of-Thought prompting?', a: 'Generating multiple reasoning paths at high temperature and selecting the majority vote answer, which significantly reduces reasoning blunders on multi-step problems.' }
    ],
    links: [
      { label: 'Outlines GitHub: Structured Text Generation', url: 'https://github.com/outlines-dev/outlines' },
      { label: 'Prompt Engineering Guide (DAIR.AI)', url: 'https://www.promptingguide.ai/' }
    ]
  },
  {
    id: 'tool-calling',
    title: 'Function Calling & Tools',
    tag: 'Agents',
    description: 'OpenAPI tool bindings, SQL query generation, safe sandboxed execution environments, and tool schema validation.',
    duration: '20 Hours',
    hours: 20,
    icon: Settings2,
    tools: ['OpenAI Function Calling', 'LangChain Tools', 'Gorilla', 'Docker'],
    concepts: ['JSON Schema Tool Definitions', 'Tool Execution Sandboxing (E2B / Firecracker)', 'Error Reflection & Self-Correction Loops', 'Parallel Tool Calling Sequences'],
    deliverable: 'Sandboxed Python Code Execution & SQL Database Query Agent',
    interview: [
      { q: 'How does an LLM decide when to call a function versus generating text?', a: 'Tool definitions are injected into the model context with special tokens. The model outputs a designated function call token followed by arguments matching the required JSON schema.' },
      { q: 'What security precautions are mandatory for LLM code execution tools?', a: 'Code must run in isolated ephemeral microVMs (e.g. Firecracker or gVisor) with network restrictions, strict CPU/memory limits, read-only root filesystems, and bounded execution timeouts.' }
    ],
    links: [
      { label: 'OpenAI Function Calling Guide', url: 'https://platform.openai.com/docs/guides/function-calling' },
      { label: 'E2B Code Interpreter SDK', url: 'https://e2b.dev/' }
    ]
  },
  {
    id: 'agent-loops',
    title: 'ReAct & Agentic Loops',
    tag: 'Agents',
    description: 'Reasoning and acting loops, scratchpads, state management, cycle detection, and tool invocation backtracking.',
    duration: '20 Hours',
    hours: 20,
    icon: Bot,
    tools: ['LangChain', 'SmythOS', 'Autogen', 'Pydantic'],
    concepts: ['Thought-Action-Observation Pattern', 'Working Memory vs Long-Term Scratchpads', 'Cycle Detection & Stuck Loop Breakers', 'Human-in-the-Loop Interruption Points'],
    deliverable: 'Autonomous Deep Research Agent with Multi-Step Tool Verification',
    interview: [
      { q: 'What is the core premise of the ReAct (Reason + Act) paradigm?', a: 'Synergizing reasoning traces (Thoughts) with action execution (Actions) allows the agent to update its plan based on environment observations, avoiding hallucinated action chains.' },
      { q: 'How do you prevent agent infinite loops in production?', a: 'Enforce max-step limits, calculate semantic similarity between consecutive thoughts to detect cyclic stalls, and implement reflection fallbacks that prompt the agent to pivot strategy.' }
    ],
    links: [
      { label: 'ReAct: Synergizing Reasoning and Acting in LLMs', url: 'https://arxiv.org/abs/2210.03629' },
      { label: 'Anthropic: Building Effective Agents', url: 'https://www.anthropic.com/research/building-effective-agents' }
    ]
  },
  {
    id: 'dspy-compile',
    title: 'DSPy & Programmatic Prompts',
    tag: 'Agents',
    description: 'Replacing hand-crafted prompts with declarative modules, teleprompters, few-shot optimizers, and automated evaluators.',
    duration: '25 Hours',
    hours: 25,
    icon: Terminal,
    tools: ['DSPy', 'MIPROv2', 'BootstrapFewShot', 'Optuna'],
    concepts: ['Signatures, Modules & Predictors', 'Teleprompter Prompt Compilation', 'MIPRO Bayesian Prompt Search', 'Metric-Driven Self-Optimization'],
    deliverable: 'Compiled Multi-Hop QA Agent with Automated DSPy Metric Tuning',
    interview: [
      { q: 'Why does DSPy treat prompts like model weights in PyTorch?', a: 'Instead of manually prompt-engineering strings, DSPy defines modular pipelines with typed input/output signatures. Optimizers (teleprompters) compile and search over demonstrations and instructions to maximize metrics.' },
      { q: 'How does BootstrapFewShot work in DSPy?', a: 'It runs the un-optimized pipeline across training examples, collects successful execution traces where the validation metric passes, and converts them into few-shot exemplars.' }
    ],
    links: [
      { label: 'DSPy Official Documentation', url: 'https://dspy.ai/' },
      { label: 'DSPy Paper: Compiling Declarative Language Model Calls', url: 'https://arxiv.org/abs/2310.03714' }
    ]
  },
  {
    id: 'langgraph',
    title: 'Multi-Agent Orchestration',
    tag: 'Agents',
    description: 'Graph-based state machines, cyclic agent workflows, checkpoint persistence, supervisor-worker topologies, and LangGraph.',
    duration: '30 Hours',
    hours: 30,
    icon: Workflow,
    tools: ['LangGraph', 'AutoGen', 'CrewAI', 'Langfuse'],
    concepts: ['State Graphs & Reducers', 'Cyclic Execution Graphs & Routing Edges', 'Thread-Level Persistence & Time Travel', 'Supervisor-Worker Hierarchical Patterns'],
    deliverable: 'Collaborative Multi-Agent Code Generation & Review Team in LangGraph',
    interview: [
      { q: 'Why is LangGraph state-graph architecture superior to linear chain pipelines?', a: 'Linear chains cannot model cycles, conditional branch looping, human intervention, or distributed multi-agent handoffs. Graphs maintain explicit state reducers and can pause/resume execution from checkpoints.' },
      { q: 'What is Time Travel in LangGraph and why is it useful?', a: 'Because LangGraph checkpoints state after every node step, developers can rewind to past execution checkpoints, fork alternative states, or edit state values to debug agent trajectories.' }
    ],
    links: [
      { label: 'LangGraph Documentation', url: 'https://langchain-ai.github.io/langgraph/' },
      { label: 'CrewAI Multi-Agent Framework', url: 'https://www.crewai.com/' }
    ]
  },

  // Phase 5: Tuning
  {
    id: 'peft-lora',
    title: 'LoRA & PEFT Basics',
    tag: 'Fine-Tuning',
    description: 'Low-rank adaptation decomposition, rank selection, alpha scaling factors, target modules, and adapter weight merging.',
    duration: '15 Hours',
    hours: 15,
    icon: Target,
    tools: ['Hugging Face PEFT', 'PyTorch', 'Transformers'],
    concepts: ['Low-Rank Matrix Decomposition (W = W0 + B*A)', 'Rank (r) and Alpha Scaling Hyperparameters', 'Target Projections (Q, K, V vs MLP layers)', 'Adapter Merging & Zero-Latency Serving'],
    deliverable: 'Custom LoRA Implementation from Raw PyTorch Linear Layers',
    interview: [
      { q: 'Explain the mathematical formulation of LoRA (Low-Rank Adaptation).', a: 'During forward pass: h = W_0 x + (alpha / r) * B A x, where W_0 is frozen (d x k), A is initialized with Gaussian noise (r x k), and B is initialized with zeros (d x r). Since r << min(d, k), parameters are reduced by 99%.' },
      { q: 'Why should B be initialized to zero and A to random Gaussian?', a: 'Initializing B to zeros guarantees that Delta W = B * A = 0 at step 0, ensuring model predictions start identically to the pre-trained base model without disturbance.' }
    ],
    links: [
      { label: 'LoRA: Low-Rank Adaptation of Large Language Models', url: 'https://arxiv.org/abs/2106.09685' },
      { label: 'Hugging Face PEFT Documentation', url: 'https://huggingface.co/docs/peft' }
    ]
  },
  {
    id: 'qlora-tuning',
    title: 'QLoRA & 4-bit Tuning',
    tag: 'Fine-Tuning',
    description: 'NormalFloat4 (NF4) data type, double quantization, paged optimizers for VRAM spikes, and BitsAndBytes integration.',
    duration: '20 Hours',
    hours: 20,
    icon: Cpu,
    tools: ['BitsAndBytes', 'TRL', 'PEFT', 'Accelerate'],
    concepts: ['NormalFloat4 (NF4) Quantization Scheme', 'Double Quantization (DQ) Footprint Reduction', 'Paged Optimizers via CUDA Unified Memory', 'VRAM Budgeting for Single GPU Training'],
    deliverable: 'Fine-Tuned 8B Parameter Instruct LLM on Single 16GB VRAM GPU',
    interview: [
      { q: 'Why is NormalFloat4 (NF4) information-theoretically optimal for neural weights?', a: 'Pretrained neural weights follow a normal distribution N(0, sigma^2). NF4 constructs quantile bins with equal area under the standard normal curve, ensuring each bit carries maximum entropy.' },
      { q: 'How do Paged Optimizers prevent Out-Of-Memory (OOM) crashes during fine-tuning?', a: 'They utilize CUDA Unified Memory to automatically page optimizer state tensors between GPU VRAM and CPU RAM during transient allocation spikes (e.g. long sequences).' }
    ],
    links: [
      { label: 'QLoRA: Efficient Finetuning of Quantized LLMs', url: 'https://arxiv.org/abs/2305.14314' },
      { label: 'BitsAndBytes GitHub Repository', url: 'https://github.com/bitsandbytes-foundation/bitsandbytes' }
    ]
  },
  {
    id: 'synthetic-data',
    title: 'Synthetic Data Curation',
    tag: 'Fine-Tuning',
    description: 'Self-Instruct, Evol-Instruct complexity scaling, LLM-based filtering, deduplication with MinHash, and dataset curation.',
    duration: '25 Hours',
    hours: 25,
    icon: Database,
    tools: ['Distilabel', 'Argilla', 'Datatrove', 'MinHash LSH'],
    concepts: ['Self-Instruct Seed Expansion', 'Evol-Instruct In-Depth & In-Breadth Evolution', 'MinHash LSH Near-Deduplication', 'Quality Filtering with Reward Models & Perplexity'],
    deliverable: '10,000-Sample Curated Synthetic Domain Dataset with Evol-Instruct',
    interview: [
      { q: 'How does Evol-Instruct create high-difficulty synthetic training data?', a: 'It prompts an advanced model to evolve seed instructions across dimensions: adding constraints, deepening reasoning steps, concretizing abstract questions, and creating multi-step scenarios.' },
      { q: 'Why is MinHash LSH crucial before fine-tuning on synthetic data?', a: 'LLM generation generates redundant variations of prompts. MinHash LSH clusters and purges near-duplicate samples, preventing overfitting and benchmark contamination.' }
    ],
    links: [
      { label: 'WizardLM: Empowering LLMs via Evol-Instruct', url: 'https://arxiv.org/abs/2304.12244' },
      { label: 'Distilabel: Synthetic Data Framework', url: 'https://distilabel.argilla.io/' }
    ]
  },
  {
    id: 'axolotl-unsloth',
    title: 'High-Performance Tuning',
    tag: 'Fine-Tuning',
    description: 'Cross-entropy kernel optimization in Triton, FlashAttention-2 integrations, declarative training YAMLs, and Unsloth.',
    duration: '25 Hours',
    hours: 25,
    icon: Zap,
    tools: ['Unsloth', 'Axolotl', 'DeepSpeed ZeRO', 'PyTorch FSDP'],
    concepts: ['Custom Triton Cross-Entropy Kernels', 'Fused LoRA Weight Updates', 'FSDP ZeRO-3 Memory Partitioning', 'Gradient Checkpointing Trade-offs'],
    deliverable: 'Production Axolotl Multi-GPU Fine-Tuning Pipeline with YAML Configs',
    interview: [
      { q: 'How does Unsloth achieve 2-5x faster fine-tuning with 80% less memory?', a: 'Unsloth replaces PyTorch autograd graph overhead with custom Triton kernels that compute manual backprop derivatives directly, fusing RoPE, cross-entropy, and LoRA projections without allocating temporary activation tensors.' },
      { q: 'What is the trade-off of Gradient Checkpointing?', a: 'It discards intermediate activations during the forward pass and recomputes them during the backward pass. This reduces activation VRAM by up to 70% at the cost of ~20% slower training speed.' }
    ],
    links: [
      { label: 'Unsloth AI GitHub Repository', url: 'https://github.com/unslothai/unsloth' },
      { label: 'Axolotl LLM Training Framework', url: 'https://github.com/axolotl-ai-cloud/axolotl' }
    ]
  },

  // Phase 6: Alignment
  {
    id: 'rlhf-basics',
    title: 'RLHF & Reward Modeling',
    tag: 'Alignment',
    description: 'Bradley-Terry preference models, Proximal Policy Optimization (PPO), KL divergence penalties, and value networks.',
    duration: '25 Hours',
    hours: 25,
    icon: Brain,
    tools: ['TRL (Transformer Reinforcement Learning)', 'DeepSpeed-Chat', 'Weights & Biases'],
    concepts: ['Bradley-Terry Paired Preference Formulation', 'PPO Actor-Critic Policy Updates', 'KL Divergence Regularization Penalty', 'Reward Hacking & Policy Drift'],
    deliverable: 'Trained Reward Model on Pairwise Human Preferences',
    interview: [
      { q: 'Why is a KL-divergence penalty necessary in RLHF PPO training?', a: 'Without a KL penalty relative to the initial supervised policy, the RL actor rapidly exploits flaws in the reward model (reward hacking), outputting gibberish or repetitive text that scores artificially high.' },
      { q: 'How is the Bradley-Terry loss computed for reward modeling?', a: 'Loss = -E[log sigma(r_theta(x, y_chosen) - r_theta(x, y_rejected))], maximizing the score gap between preferred and dispreferred responses.' }
    ],
    links: [
      { label: 'Training language models to follow instructions (InstructGPT)', url: 'https://arxiv.org/abs/2203.02155' },
      { label: 'Hugging Face TRL Library', url: 'https://huggingface.co/docs/trl' }
    ]
  },
  {
    id: 'dpo-orpo',
    title: 'DPO, ORPO & KTO',
    tag: 'Alignment',
    description: 'Direct preference optimization without reinforcement learning, Odds Ratio Policy Optimization, and Kahneman-Tversky loss.',
    duration: '25 Hours',
    hours: 25,
    icon: Target,
    tools: ['TRL', 'Axolotl', 'DeepSpeed'],
    concepts: ['Implicit Reward Function Formulation', 'DPO Closed-Form Loss Gradient', 'ORPO Unification of SFT & Alignment', 'KTO Asymmetric Prospect Theory Loss'],
    deliverable: 'DPO Aligned Llama Model via Pairwise Preference Optimization',
    interview: [
      { q: 'Why has DPO largely superseded PPO in industrial practice?', a: 'DPO reparameterizes the reward function analytically into the policy loss, eliminating the need to train a separate reward model, value network, or navigate unstable PPO reinforcement learning loops.' },
      { q: 'How does ORPO (Odds Ratio Preference Optimization) simplify training further?', a: 'ORPO combines SFT and preference alignment into a single loss function by penalizing the odds ratio of generating dispreferred tokens alongside standard cross-entropy.' }
    ],
    links: [
      { label: 'Direct Preference Optimization (DPO Paper)', url: 'https://arxiv.org/abs/2305.18290' },
      { label: 'ORPO: Monolithic Preference Optimization', url: 'https://arxiv.org/abs/2403.07691' }
    ]
  },
  {
    id: 'model-eval',
    title: 'Evaluation & LLM-as-Judge',
    tag: 'Alignment',
    description: 'MT-Bench, AlpacaEval, LLM-as-a-Judge pairwise scoring, MMLU, GSM8K benchmarks, and automated CI/CD eval harnesses.',
    duration: '20 Hours',
    hours: 20,
    icon: Gauge,
    tools: ['LM-Evaluation-Harness', 'Prometheus-Eval', 'Deepeval', 'Ragas'],
    concepts: ['Position Bias & Egocentric Bias in LLM Judges', 'G-Eval Multi-Criteria Rubric Scoring', 'Benchmark Contamination & Decontamination', 'Automated PR Evaluation CI/CD Workflows'],
    deliverable: 'Automated CI/CD Evaluation Pipeline for LLM Pull Requests',
    interview: [
      { q: 'What biases plague LLM-as-a-Judge evaluations and how do you mitigate them?', a: 'Position bias (favoring candidate 1), verbosity bias (favoring longer outputs), and self-enhancement bias (favoring their own generation style). Mitigate by swapping candidate order (bidirectional eval) and anchoring with strict rubrics.' },
      { q: 'How do you detect test dataset contamination in open LLM weights?', a: 'Measure perplexity and n-gram overlap against canonical benchmark splits; an anomalously low perplexity on test questions versus train data signals direct contamination.' }
    ],
    links: [
      { label: 'Judging LLM-as-a-Judge (MT-Bench Paper)', url: 'https://arxiv.org/abs/2306.05685' },
      { label: 'EleutherAI LM Evaluation Harness', url: 'https://github.com/EleutherAI/lm-evaluation-harness' }
    ]
  },

  // Phase 7: Inference
  {
    id: 'quantization-awq',
    title: 'Post-Training Quantization',
    tag: 'Inference',
    description: 'AWQ, GPTQ, GGUF formats, weight-only vs weight-activation quantization (FP8, INT4), and hardware matrix cores.',
    duration: '20 Hours',
    hours: 20,
    icon: Layers,
    tools: ['AutoAWQ', 'Llama.cpp', 'ExLlamaV2', 'TensorRT-LLM'],
    concepts: ['Activation-Aware Weight Quantization (AWQ)', 'Second-Order Optimal Brain Surgeon (GPTQ)', 'GGUF K-Quants & CPU Unified Memory', 'FP8 vs INT4 Precision on Hopper Tensor Cores'],
    deliverable: '4-bit AWQ Quantized Model Serving Endpoint on Consumer Hardware',
    interview: [
      { q: 'What is the core insight behind Activation-Aware Weight Quantization (AWQ)?', a: 'Not all weights are equally important: the top 1% of weights corresponding to large activation channels dominate output quality. AWQ protects salient weights from quantization noise by scaling them prior to quantization.' },
      { q: 'What is the difference between GGUF format and AWQ/GPTQ formats?', a: 'GGUF is designed for llama.cpp on CPUs, Apple Silicon (Metal), and mixed offloading. AWQ and GPTQ are tailored for high-speed GPU tensor cores using specialized CUDA/Triton dequantization kernels.' }
    ],
    links: [
      { label: 'AWQ: Activation-aware Weight Quantization', url: 'https://arxiv.org/abs/2306.00978' },
      { label: 'Llama.cpp GitHub Repository', url: 'https://github.com/ggerganov/llama.cpp' }
    ]
  },
  {
    id: 'vllm-paged-attention',
    title: 'vLLM & PagedAttention',
    tag: 'Inference',
    description: 'Virtual memory paging for KV cache, eliminating fragmentation, continuous batching, and high-throughput inference.',
    duration: '25 Hours',
    hours: 25,
    icon: Server,
    tools: ['vLLM', 'Triton Inference Server', 'FastAPI'],
    concepts: ['KV Cache Memory Allocation & Fragmentation', 'PagedAttention Virtual Memory Block Mapping', 'Copy-on-Write for Parallel Sampling', 'Chunked Prefill & Prompt Caching'],
    deliverable: 'Production vLLM Cluster with Prompt Caching & High Concurrency',
    interview: [
      { q: 'Why does standard KV caching waste up to 60-80% of GPU memory?', a: 'Standard engines allocate contiguous memory for the maximum possible sequence length up front. Because actual outputs are unpredictable and variable, unutilized reserved memory causes severe internal and external fragmentation.' },
      { q: 'How does PagedAttention solve KV cache fragmentation?', a: 'Inspired by OS virtual memory paging, PagedAttention stores non-contiguous KV cache blocks in fixed-size blocks (e.g. 16 tokens). Physical blocks are allocated on-demand via a block table, dropping memory waste to near zero.' }
    ],
    links: [
      { label: 'PagedAttention & vLLM Paper', url: 'https://arxiv.org/abs/2309.06180' },
      { label: 'vLLM Official Documentation', url: 'https://docs.vllm.ai/' }
    ]
  },
  {
    id: 'continuous-batching',
    title: 'Continuous Batching',
    tag: 'Inference',
    description: 'Iteration-level scheduling versus request-level batching, dynamic preemption, and maximizing GPU compute saturation.',
    duration: '15 Hours',
    hours: 15,
    icon: Clock,
    tools: ['vLLM', 'TensorRT-LLM', 'TGI (Text Generation Inference)'],
    concepts: ['Static Batching vs Iteration-Level Continuous Batching', 'Prefill (Compute-Bound) vs Decode (Memory-Bound) Phases', 'Chunked Prefill Scheduling', 'Request Preemption & Re-computation Policies'],
    deliverable: 'Benchmarked Continuous Batching Load Test (>150 RPS)',
    interview: [
      { q: 'Why does continuous batching provide a 10x throughput gain over static batching?', a: 'Static batching locks the entire batch until the slowest generation finishes, idling compute. Continuous batching operates at the token-iteration level, ejecting completed sequences and inserting new requests immediately.' },
      { q: 'Why do Prefill and Decode phases have conflicting computational characteristics?', a: 'Prefill processes all prompt tokens in parallel, which is compute-bound (saturates Tensor Cores). Decode generates one token at a time per request, which is memory-bound (constrained by HBM memory bandwidth).' }
    ],
    links: [
      { label: 'Orca: A Distributed Serving System for Transformer Models', url: 'https://www.usenix.org/conference/osdi22/presentation/yu' },
      { label: 'TensorRT-LLM Architecture Guide', url: 'https://nvidia.github.io/TensorRT-LLM/' }
    ]
  },
  {
    id: 'speculative-decoding',
    title: 'Speculative Decoding',
    tag: 'Inference',
    description: 'Accelerating inference with draft-verification pipelines, tree-based verification (Medusa/Eagle), and speculative tokens.',
    duration: '20 Hours',
    hours: 20,
    icon: Zap,
    tools: ['Medusa', 'Eagle', 'vLLM', 'SGLang'],
    concepts: ['Draft Model Speculation & Verification', 'Tree-Structured Attention Verification', 'Acceptance Rate vs Latency Speedup Dynamics', 'Draft-less Self-Speculative Decoding'],
    deliverable: '2.5x Speedup Inference Engine with Medusa Multi-Head Verification',
    interview: [
      { q: 'How does speculative decoding guarantee identical output distribution to the target model?', a: 'The target model verifies all candidate tokens in a single parallel forward pass using rejection sampling. If token i is accepted, sampling continues; if rejected, the target model resamples from an adjusted distribution, preserving exact mathematical equivalence.' },
      { q: 'What is Medusa and how does it eliminate the need for a separate draft model?', a: 'Medusa attaches multiple small decoding heads directly on top of the base model\'s final hidden states. Each head predicts tokens at future offsets (t+1, t+2, t+3) concurrently without maintaining a second model in VRAM.' }
    ],
    links: [
      { label: 'Fast Inference from Transformers via Speculative Decoding', url: 'https://arxiv.org/abs/2211.17192' },
      { label: 'Medusa: Simple LLM Inference Acceleration Framework', url: 'https://arxiv.org/abs/2401.10774' }
    ]
  },

  // Phase 8: Ops
  {
    id: 'tensor-parallelism',
    title: 'Tensor & Pipeline Parallelism',
    tag: 'Ops & Scale',
    description: 'Megatron-LM sharding, column/row linear parallel partitioning, NCCL All-Reduce, and inter-node pipeline bubbles.',
    duration: '30 Hours',
    hours: 30,
    icon: Network,
    tools: ['Megatron-LM', 'DeepSpeed ZeRO', 'PyTorch Distributed', 'NCCL'],
    concepts: ['Column-Parallel & Row-Parallel MLP Splitting', 'All-Reduce & All-Gather Collective Operations', 'Pipeline Parallelism Bubbles (1F1B Scheduling)', 'NVLink vs InfiniBand Interconnect Bottlenecks'],
    deliverable: 'Distributed Megatron-Style Multi-GPU Model Sharding Pipeline',
    interview: [
      { q: 'Why does Megatron tensor parallelism place an All-Reduce between Column and Row parallel layers?', a: 'The first linear layer is split column-wise (no communication). The second layer is split row-wise, producing partial activations. An All-Reduce sum aggregates partial outputs into the true activation with minimal synchronization.' },
      { q: 'What is the 1F1B (One-Forward-One-Backward) schedule in Pipeline Parallelism?', a: 'It alternates one forward step and one backward step per micro-batch on each GPU, keeping peak activation memory bounded compared to running all forward passes before backward passes.' }
    ],
    links: [
      { label: 'Megatron-LM: Training Multi-Billion Parameter Models', url: 'https://arxiv.org/abs/1909.08053' },
      { label: 'PyTorch Distributed Overview', url: 'https://pytorch.org/tutorials/beginner/dist_overview.html' }
    ]
  },
  {
    id: 'ray-distributed',
    title: 'Ray Serve Distributed',
    tag: 'Ops & Scale',
    description: 'Actor-based distributed model serving, dynamic auto-scaling, deployment graphs, and zero-copy Apache Arrow plasma store.',
    duration: '25 Hours',
    hours: 25,
    icon: Cloud,
    tools: ['Ray Serve', 'Ray Core', 'vLLM Engine', 'Langfuse'],
    concepts: ['Ray Actor Lifecycle & GPU Placement Groups', 'Deployment Graphs & Pipeline Orchestration', 'Dynamic Replica Autoscaling Policies', 'Object Store Shared Memory Zero-Copy'],
    deliverable: 'Multi-GPU Auto-scaling LLM Service with Ray Serve & Monitoring',
    interview: [
      { q: 'What advantage does Ray Serve provide over traditional Kubernetes pods for LLM serving?', a: 'Ray treats GPUs and nodes as a unified actor pool, allowing dynamic fractional GPU allocation, multi-GPU tensor-parallel replica management, and zero-copy shared memory without container cold-start overhead.' },
      { q: 'How do Ray Placement Groups guarantee co-locality of multi-GPU workers?', a: 'Placement Groups enforce STRICT_SPREAD or STRICT_PACK scheduling rules, ensuring tensor-parallel worker actors land on the exact same physical node with high-speed NVLink connections.' }
    ],
    links: [
      { label: 'Ray Serve Documentation', url: 'https://docs.ray.io/en/latest/serve/' },
      { label: 'vLLM on Ray Serve Architecture', url: 'https://docs.vllm.ai/en/latest/serving/distributed_serving.html' }
    ]
  },
  {
    id: 'k8s-gpu',
    title: 'K8s GPU Orchestration',
    tag: 'Ops & Scale',
    description: 'KubeRay operator, NVIDIA GPU Operator, Multi-Instance GPU (MIG) slicing, and production declarative manifests.',
    duration: '30 Hours',
    hours: 30,
    icon: Shield,
    tools: ['Kubernetes', 'KubeRay', 'Nvidia GPU Operator', 'Helm'],
    concepts: ['NVIDIA Container Toolkit & Device Plugins', 'Multi-Instance GPU (MIG) Hardware Slicing', 'RayCluster Custom Resource Definitions (CRDs)', 'GPU Taints, Tolerations & Node Affinities'],
    deliverable: 'Production-Grade Helm Chart & KubeRay Cluster Manifest with MIG Slicing',
    interview: [
      { q: 'What is NVIDIA MIG (Multi-Instance GPU) and how does it differ from MPS (Multi-Process Service)?', a: 'MPS shares compute and memory dynamically among processes with software isolation. MIG partitions a physical A100/H100 GPU into up to 7 hardware-isolated instances with dedicated memory, cache, and SMs.' },
      { q: 'Why are KubeRay CRDs preferred over raw Kubernetes Deployments for Ray workloads?', a: 'KubeRay manages head-worker heartbeats, handles node evictions cleanly, and orchestrates stateful Ray worker pool autoscaling natively based on Ray metrics rather than raw CPU/RAM utilization.' }
    ],
    links: [
      { label: 'KubeRay Operator Documentation', url: 'https://ray-project.github.io/kuberay/' },
      { label: 'Nvidia GPU Operator on Kubernetes', url: 'https://docs.nvidia.com/datacenter/cloud-native/gpu-operator/latest/' }
    ]
  },
  {
    id: 'spot-autoscaling',
    title: 'Spot Autoscaling & FinOps',
    tag: 'Ops & Scale',
    description: 'Cost-optimized spot instances, Karpenter node provisioning, graceful node drain interruption handlers, and GitOps CI/CD.',
    duration: '25 Hours',
    hours: 25,
    icon: Gauge,
    tools: ['Karpenter', 'ArgoCD', 'Terraform', 'Prometheus'],
    concepts: ['2-Minute Spot Interruption Handling & Draining', 'Karpenter Just-In-Time Node Provisioning', 'ArgoCD Declarative GitOps Deployments', 'Cost Allocation & Token-Level FinOps Tracing'],
    deliverable: 'Zero-Downtime Multi-AZ Spot Infrastructure with Karpenter & ArgoCD',
    interview: [
      { q: 'How do you design a zero-downtime LLM serving cluster on volatile Spot/Preemptible GPU instances?', a: 'Use Karpenter to diversify across multiple GPU instance families, listen for 2-minute preemption event webhooks, route traffic away before SIGTERM, and keep warm fallback on-demand instances or multi-region routing.' },
      { q: 'How does Karpenter outperform traditional Kubernetes Cluster Autoscaler for AI workloads?', a: 'Cluster Autoscaler scales existing node groups slowly. Karpenter provisions compute directly against unscheduled pod requirements without node groups, spinning up specialized GPU shapes in seconds.' }
    ],
    links: [
      { label: 'Karpenter Node Autoscaler', url: 'https://karpenter.sh/' },
      { label: 'ArgoCD GitOps for Kubernetes', url: 'https://argo-cd.readthedocs.io/' }
    ]
  },
  {
    id: 'edge-deployment',
    title: 'Edge & Local Deployment',
    tag: 'Ops & Scale',
    description: 'Running LLMs natively on Apple Silicon with MLX, WebGPU in-browser inference (WebLLM), and embedded edge devices.',
    duration: '20 Hours',
    hours: 20,
    icon: Cpu,
    tools: ['Apple MLX', 'Llama.cpp', 'WebLLM (WebGPU)', 'Ollama'],
    concepts: ['Apple Silicon Unified Memory Architecture (UMA)', 'Metal Performance Shaders (MPS)', 'WebGPU Compute Shaders in Browser', 'Zero-Latency On-Device Privacy Inference'],
    deliverable: 'Native Swift/MLX macOS Local Assistant with Offline Vector Search',
    interview: [
      { q: 'Why is Apple Silicon Unified Memory Architecture (UMA) uniquely suited for local LLM inference?', a: 'CPUs and GPUs share a single unified memory pool with up to 800 GB/s bandwidth on M-series chips, allowing running 70B+ parameter models on a MacBook Pro without costly PCIe data copies between RAM and VRAM.' },
      { q: 'How does WebGPU enable client-side in-browser LLM inference in WebLLM?', a: 'WebGPU grants direct access to client GPU compute shaders from JavaScript/WASM, executing quantized weight matrix multiplications natively on the user\'s local GPU without cloud server roundtrips.' }
    ],
    links: [
      { label: 'Apple MLX Framework', url: 'https://github.com/ml-explore/mlx' },
      { label: 'WebLLM: In-Browser LLM Inference with WebGPU', url: 'https://webllm.mlc.ai/' }
    ]
  }
];

export const RAW_EDGES: Edge[] = [
  { id: 'e-math-pt', source: 'math-linear-algebra', target: 'pytorch-internals' },
  { id: 'e-cuda-pt', source: 'cuda-basics', target: 'pytorch-internals' },
  { id: 'e-pt-trans', source: 'pytorch-internals', target: 'transformer-basics' },
  { id: 'e-trans-attn', source: 'transformer-basics', target: 'attn-mechanisms' },
  { id: 'e-trans-rope', source: 'transformer-basics', target: 'rope-embeddings' },
  { id: 'e-trans-moe', source: 'transformer-basics', target: 'moe-arch' },
  { id: 'e-trans-mamba', source: 'transformer-basics', target: 'ssm-mamba' },
  { id: 'e-math-vec', source: 'math-linear-algebra', target: 'vector-dbs' },
  { id: 'e-vec-emb', source: 'vector-dbs', target: 'embedding-models' },
  { id: 'e-emb-rag', source: 'embedding-models', target: 'naive-rag' },
  { id: 'e-rag-colbert', source: 'naive-rag', target: 'colbert-reranking' },
  { id: 'e-colbert-adv', source: 'colbert-reranking', target: 'adv-rag-routing' },
  { id: 'e-adv-graph', source: 'adv-rag-routing', target: 'graph-rag' },
  { id: 'e-trans-prompt', source: 'transformer-basics', target: 'prompt-eng' },
  { id: 'e-prompt-tool', source: 'prompt-eng', target: 'tool-calling' },
  { id: 'e-tool-loop', source: 'tool-calling', target: 'agent-loops' },
  { id: 'e-loop-lang', source: 'agent-loops', target: 'langgraph' },
  { id: 'e-prompt-dspy', source: 'prompt-eng', target: 'dspy-compile' },
  { id: 'e-trans-peft', source: 'transformer-basics', target: 'peft-lora' },
  { id: 'e-peft-qlora', source: 'peft-lora', target: 'qlora-tuning' },
  { id: 'e-qlora-ax', source: 'qlora-tuning', target: 'axolotl-unsloth' },
  { id: 'e-prompt-syn', source: 'prompt-eng', target: 'synthetic-data' },
  { id: 'e-syn-ax', source: 'synthetic-data', target: 'axolotl-unsloth' },
  { id: 'e-ax-rlhf', source: 'axolotl-unsloth', target: 'rlhf-basics' },
  { id: 'e-rlhf-dpo', source: 'rlhf-basics', target: 'dpo-orpo' },
  { id: 'e-dpo-eval', source: 'dpo-orpo', target: 'model-eval' },
  { id: 'e-ax-quant', source: 'axolotl-unsloth', target: 'quantization-awq' },
  { id: 'e-quant-vllm', source: 'quantization-awq', target: 'vllm-paged-attention' },
  { id: 'e-vllm-cont', source: 'vllm-paged-attention', target: 'continuous-batching' },
  { id: 'e-cont-spec', source: 'continuous-batching', target: 'speculative-decoding' },
  { id: 'e-vllm-tens', source: 'vllm-paged-attention', target: 'tensor-parallelism' },
  { id: 'e-tens-ray', source: 'tensor-parallelism', target: 'ray-distributed' },
  { id: 'e-ray-k8s', source: 'ray-distributed', target: 'k8s-gpu' },
  { id: 'e-k8s-spot', source: 'k8s-gpu', target: 'spot-autoscaling' },
  { id: 'e-quant-edge', source: 'quantization-awq', target: 'edge-deployment' },
];

export const INITIAL_EDGES: Edge[] = RAW_EDGES.map(e => ({
  ...e,
  type: 'default',
  style: { stroke: '#3f3f46', strokeWidth: 2 }
}));

export const INITIAL_NODES_UNLAYOUTED: Node[] = RAW_NODE_DATA.map(n => ({
  id: n.id,
  position: { x: 0, y: 0 },
  data: { ...n },
  type: 'courseNode'
}));

// ==========================================
// Phase Color Themes for High Contrast Readability
// ==========================================
export interface PhaseColorConfig {
  badgeDark: string;
  badgeLight: string;
  accentHex: string;
  glowClass: string;
}

export const PHASE_COLORS: Record<string, PhaseColorConfig> = {
  'Foundations': {
    badgeDark: 'bg-[#18181b] text-zinc-400 border-[#27272a]',
    badgeLight: 'bg-slate-100 text-slate-600 border-slate-200',
    accentHex: '#3b82f6',
    glowClass: '',
  },
  'Architecture': {
    badgeDark: 'bg-[#18181b] text-zinc-400 border-[#27272a]',
    badgeLight: 'bg-slate-100 text-slate-600 border-slate-200',
    accentHex: '#6366f1',
    glowClass: '',
  },
  'Data Pipeline': {
    badgeDark: 'bg-[#18181b] text-zinc-400 border-[#27272a]',
    badgeLight: 'bg-slate-100 text-slate-600 border-slate-200',
    accentHex: '#0ea5e9',
    glowClass: '',
  },
  'Agents': {
    badgeDark: 'bg-[#18181b] text-zinc-400 border-[#27272a]',
    badgeLight: 'bg-slate-100 text-slate-600 border-slate-200',
    accentHex: '#2563eb',
    glowClass: '',
  },
  'Fine-Tuning': {
    badgeDark: 'bg-[#18181b] text-zinc-400 border-[#27272a]',
    badgeLight: 'bg-slate-100 text-slate-600 border-slate-200',
    accentHex: '#4f46e5',
    glowClass: '',
  },
  'Alignment': {
    badgeDark: 'bg-[#18181b] text-zinc-400 border-[#27272a]',
    badgeLight: 'bg-slate-100 text-slate-600 border-slate-200',
    accentHex: '#0284c7',
    glowClass: '',
  },
  'Inference': {
    badgeDark: 'bg-[#18181b] text-zinc-400 border-[#27272a]',
    badgeLight: 'bg-slate-100 text-slate-600 border-slate-200',
    accentHex: '#3b82f6',
    glowClass: '',
  },
  'Ops & Scale': {
    badgeDark: 'bg-[#18181b] text-zinc-400 border-[#27272a]',
    badgeLight: 'bg-slate-100 text-slate-600 border-slate-200',
    accentHex: '#6366f1',
    glowClass: '',
  },
};

// ==========================================
// Dynamic Dependency Path Tracing
// ==========================================
export const getConnectedPaths = (targetId: string, edges: Edge[]) => {
  const upstreamNodes = new Set<string>();
  const downstreamNodes = new Set<string>();
  const upstreamEdges = new Set<string>();
  const downstreamEdges = new Set<string>();

  const findUpstream = (currentId: string) => {
    edges.forEach(e => {
      if (e.target === currentId) {
        upstreamEdges.add(e.id);
        if (!upstreamNodes.has(e.source)) {
          upstreamNodes.add(e.source);
          findUpstream(e.source);
        }
      }
    });
  };

  const findDownstream = (currentId: string) => {
    edges.forEach(e => {
      if (e.source === currentId) {
        downstreamEdges.add(e.id);
        if (!downstreamNodes.has(e.target)) {
          downstreamNodes.add(e.target);
          findDownstream(e.target);
        }
      }
    });
  };

  findUpstream(targetId);
  findDownstream(targetId);

  return {
    upstreamNodes,
    downstreamNodes,
    upstreamEdges,
    downstreamEdges,
    allConnectedNodes: new Set([targetId, ...upstreamNodes, ...downstreamNodes]),
    allConnectedEdges: new Set([...upstreamEdges, ...downstreamEdges]),
  };
};

// ==========================================
// Layout Engine (Dagre with Dual Orientation)
// ==========================================
export const NODE_DATA_MAP: Record<string, Omit<NodeData, 'status'>> = RAW_NODE_DATA.reduce((acc, curr) => {
  acc[curr.id] = curr;
  return acc;
}, {} as Record<string, Omit<NodeData, 'status'>>);

export const TOTAL_CURRICULUM_HOURS = RAW_NODE_DATA.reduce((acc, curr) => acc + curr.hours, 0);

export interface PhaseGroupInfo {
  phase: string;
  number: string;
  title: string;
  subtitle: string;
  x: number;
  y: number;
  width: number;
  height: number;
  nodeCount: number;
  totalHours: number;
}

export const PHASE_META: Record<string, { number: string; title: string; subtitle: string }> = {
  'Foundations': { number: '01', title: 'Foundations', subtitle: 'Math, CUDA & PyTorch Internals' },
  'Architecture': { number: '02', title: 'Transformer & Attention', subtitle: 'FlashAttention, RoPE, MoE & Mamba' },
  'Data Pipeline': { number: '03', title: 'RAG & Vector Retrieval', subtitle: 'HNSW, ColBERT & GraphRAG' },
  'Agents': { number: '04', title: 'Autonomous Agentic Systems', subtitle: 'ReAct, DSPy Compilation & LangGraph' },
  'Fine-Tuning': { number: '05', title: 'Model Adaptation & PEFT', subtitle: 'LoRA, QLoRA & Synthetic Curation' },
  'Alignment': { number: '06', title: 'Preference Alignment', subtitle: 'RLHF, DPO/ORPO & Automated Evals' },
  'Inference': { number: '07', title: 'High-Throughput Inference', subtitle: 'vLLM, PagedAttention & Speculative Decoding' },
  'Ops & Scale': { number: '08', title: 'Distributed Scale & Ops', subtitle: 'Tensor Parallelism, Ray & K8s GPU Clusters' },
};

export const computePhaseBounds = (layoutedNodes: Node[]): Record<string, PhaseGroupInfo> => {
  const result: Record<string, PhaseGroupInfo> = {};
  
  Object.keys(PHASE_META).forEach(phase => {
    const phaseNodes = layoutedNodes.filter(n => (n.data as unknown as NodeData)?.tag === phase);
    if (phaseNodes.length === 0) return;

    let minX = Infinity;
    let minY = Infinity;
    let maxX = -Infinity;
    let maxY = -Infinity;
    let totalHours = 0;

    phaseNodes.forEach(node => {
      const data = node.data as unknown as NodeData;
      totalHours += data?.hours || 0;
      minX = Math.min(minX, node.position.x);
      minY = Math.min(minY, node.position.y);
      maxX = Math.max(maxX, node.position.x + 320);
      maxY = Math.max(maxY, node.position.y + 160);
    });

    const padX = 50;
    const padTop = 80;
    const padBottom = 50;

    result[phase] = {
      phase,
      number: PHASE_META[phase].number,
      title: PHASE_META[phase].title,
      subtitle: PHASE_META[phase].subtitle,
      x: minX - padX,
      y: minY - padTop,
      width: (maxX - minX) + padX * 2,
      height: (maxY - minY) + padTop + padBottom,
      nodeCount: phaseNodes.length,
      totalHours
    };
  });

  return result;
};

export const getLayout = (direction: 'TB' | 'LR' = 'TB') => {
  const isHorizontal = direction === 'LR';
  const dagreInstance = new dagre.graphlib.Graph();
  dagreInstance.setDefaultEdgeLabel(() => ({}));
  dagreInstance.setGraph({
    rankdir: direction,
    nodesep: isHorizontal ? 60 : 70,
    ranksep: isHorizontal ? 160 : 150,
  });

  INITIAL_NODES_UNLAYOUTED.forEach(node => {
    dagreInstance.setNode(node.id, { width: 320, height: 160 });
  });

  INITIAL_EDGES.forEach(edge => {
    dagreInstance.setEdge(edge.source, edge.target);
  });

  dagre.layout(dagreInstance);

  const nodes = INITIAL_NODES_UNLAYOUTED.map(node => {
    const pos = dagreInstance.node(node.id);
    return {
      ...node,
      targetPosition: isHorizontal ? Position.Left : Position.Top,
      sourcePosition: isHorizontal ? Position.Right : Position.Bottom,
      position: {
        x: pos.x - 160,
        y: pos.y - 80,
      },
    };
  });

  const phaseBounds = computePhaseBounds(nodes);
  const clusterNodes: Node[] = Object.values(phaseBounds).map(info => ({
    id: `cluster-${info.phase}`,
    type: 'phaseClusterNode',
    position: { x: info.x, y: info.y },
    data: { ...info },
    selectable: false,
    draggable: false,
    zIndex: -10,
  }));

  return {
    nodes: [...clusterNodes, ...nodes],
    edges: INITIAL_EDGES,
    phaseBounds,
  };
};

export const LAYOUT_TB = getLayout('TB');
export const LAYOUT_LR = getLayout('LR');

export const LAYOUTED_NODES = LAYOUT_TB.nodes;
export const LAYOUTED_EDGES = LAYOUT_TB.edges;
export const PHASE_BOUNDS_MAP = LAYOUT_TB.phaseBounds;
export const ALL_INITIAL_NODES = LAYOUT_TB.nodes;

// ==========================================
// Advanced Readiness & Evaluation Scoring System
// ==========================================
export interface ReadinessMetrics {
  readinessPercentage: number;
  earnedHours: number;
  totalHours: number;
  completedNodesCount: number;
  inProgressNodesCount: number;
  totalNodesCount: number;
  masteredConceptsCount: number;
  totalConceptsCount: number;
  currentTier: {
    level: number;
    title: string;
    subtitle: string;
    badgeColor: string;
  };
  nextMilestone: string;
  phaseProgress: Record<string, {
    completed: number;
    total: number;
    hours: number;
    percentage: number;
  }>;
}

export const TIERS = [
  { level: 1, min: 0, title: 'L1 • Foundations Initiate', subtitle: 'Building linear algebra, tensor calculus & CUDA kernel fundamentals.', badgeColor: 'text-zinc-400' },
  { level: 2, min: 20, title: 'L2 • Applied LLM Engineer', subtitle: 'Building production RAG, vector retrieval & agent workflows.', badgeColor: 'text-blue-400' },
  { level: 3, min: 40, title: 'L3 • Full-Stack AI Engineer', subtitle: 'Fine-tuning with LoRA/QLoRA & aligning models via DPO/ORPO.', badgeColor: 'text-emerald-400' },
  { level: 4, min: 65, title: 'L4 • Inference & Systems Specialist', subtitle: 'Serving with vLLM, continuous batching & speculative decoding.', badgeColor: 'text-purple-400' },
  { level: 5, min: 85, title: 'L5 • AI Systems & Platform Architect', subtitle: 'Distributed tensor parallelism, Ray clusters & Kubernetes GPU ops.', badgeColor: 'text-amber-400' },
];

export const calculateReadinessMetrics = (
  progress: Record<string, ProgressStatus>,
  subtasks: Record<string, Record<string, boolean>>
): ReadinessMetrics => {
  let earnedHours = 0;
  let completedNodesCount = 0;
  let inProgressNodesCount = 0;
  let masteredConceptsCount = 0;
  let totalConceptsCount = 0;

  const phaseProgress: Record<string, { completed: number; total: number; hours: number; percentage: number }> = {};
  
  // Initialize phases
  Object.keys(PHASE_META).forEach(p => {
    phaseProgress[p] = { completed: 0, total: 0, hours: 0, percentage: 0 };
  });

  RAW_NODE_DATA.forEach(node => {
    const st = progress[node.id] || 'Todo';
    const nodeSubtasks = subtasks[node.id] || {};
    const checkedInNode = Object.values(nodeSubtasks).filter(Boolean).length;
    const totalInNode = node.concepts.length;

    totalConceptsCount += totalInNode;
    masteredConceptsCount += checkedInNode;

    // Track phase stats
    if (phaseProgress[node.tag]) {
      phaseProgress[node.tag].total += 1;
      phaseProgress[node.tag].hours += node.hours;
      if (st === 'Completed') {
        phaseProgress[node.tag].completed += 1;
      }
    }

    if (st === 'Completed') {
      completedNodesCount += 1;
      earnedHours += node.hours;
    } else if (st === 'In Progress') {
      inProgressNodesCount += 1;
      const subtaskRatio = totalInNode > 0 ? checkedInNode / totalInNode : 0.5;
      earnedHours += node.hours * Math.max(0.3, subtaskRatio);
    }
  });

  // Calculate percentages
  Object.keys(phaseProgress).forEach(p => {
    const item = phaseProgress[p];
    item.percentage = item.total > 0 ? Math.round((item.completed / item.total) * 100) : 0;
  });

  const readinessPercentage = Math.min(100, Math.round((earnedHours / TOTAL_CURRICULUM_HOURS) * 100));

  // Find Tier
  let currentTier = TIERS[0];
  for (let i = TIERS.length - 1; i >= 0; i--) {
    if (readinessPercentage >= TIERS[i].min) {
      currentTier = TIERS[i];
      break;
    }
  }

  // Next milestone calculation
  const nextTierIndex = TIERS.findIndex(t => t.level === currentTier.level + 1);
  const nextMilestone = nextTierIndex !== -1
    ? `Reach ${TIERS[nextTierIndex].min}% (+${TIERS[nextTierIndex].min - readinessPercentage}%) to unlock ${TIERS[nextTierIndex].title}`
    : 'Maximum AI Systems Architecture Rank achieved!';

  return {
    readinessPercentage,
    earnedHours: Math.round(earnedHours),
    totalHours: TOTAL_CURRICULUM_HOURS,
    completedNodesCount,
    inProgressNodesCount,
    totalNodesCount: RAW_NODE_DATA.length,
    masteredConceptsCount,
    totalConceptsCount,
    currentTier,
    nextMilestone,
    phaseProgress,
  };
};

