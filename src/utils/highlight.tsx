import React from 'react';

// Comprehensive list of high-value AI / CS keywords to highlight like TypeSafe AI
const HIGHLIGHT_KEYWORDS = [
  // Math & Foundations
  'SVD', 'Jacobian', 'Hessian', 'Eigenvalues', 'Eigenvectors', 'Calculus', 'Autograd', 'CUDA', 'PyTorch', 'TorchDynamo', 'Warp Divergence', 'Shared Memory', 'SRAM', 'HBM',
  // Architecture & Attention
  'Transformer', 'FlashAttention', 'FlashAttention-2', 'GQA', 'MQA', 'RoPE', 'YaRN', 'MoE', 'Mixtral', 'Mamba', 'State Space', 'Selective Scan', 'Attention', 'RMSNorm', 'BPE',
  // RAG & Vector
  'RAG', 'HNSW', 'IVF-PQ', 'Qdrant', 'Milvus', 'ColBERT', 'MaxSim', 'GraphRAG', 'HyDE', 'Late Interaction', 'BM25', 'Rerank', 'Matryoshka', 'Leiden',
  // Agents
  'Agents', 'ReAct', 'DSPy', 'LangGraph', 'Function Calling', 'OpenAPI', 'CFG', 'Chain-of-Thought', 'Multi-Agent', 'Outlines', 'Pydantic',
  // Tuning & Alignment
  'LoRA', 'QLoRA', 'PEFT', 'Unsloth', 'Axolotl', 'NF4', 'Synthetic Data', 'Evol-Instruct', 'RLHF', 'PPO', 'DPO', 'ORPO', 'KTO', 'LLM-as-a-Judge', 'MT-Bench',
  // Inference & Systems
  'vLLM', 'PagedAttention', 'Continuous Batching', 'Speculative Decoding', 'AWQ', 'GPTQ', 'GGUF', 'TensorRT-LLM', 'KV Cache', 'Prefill', 'Decode', 'Medusa',
  // Scale & Ops
  'Tensor Parallelism', 'Pipeline Parallelism', 'Megatron', 'DeepSpeed', 'ZeRO', 'Ray Serve', 'Ray', 'Kubernetes', 'KubeRay', 'MIG', 'Karpenter', 'MLX', 'WebGPU', 'Triton', 'NVLink', 'InfiniBand'
];

// Sort by length descending so multi-word keywords match before sub-words
const SORTED_KEYWORDS = [...HIGHLIGHT_KEYWORDS].sort((a, b) => b.length - a.length);

// Regex matching keywords
const KEYWORD_REGEX = new RegExp(
  `(${SORTED_KEYWORDS.map(k => k.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})`,
  'gi'
);

export function HighlightedText({ text, className = '' }: { text: string; className?: string }) {
  if (!text) return null;

  const parts = text.split(KEYWORD_REGEX);

  return (
    <span className={className}>
      {parts.map((part, index) => {
        const isMatch = SORTED_KEYWORDS.some(
          kw => kw.toLowerCase() === part.toLowerCase()
        );

        if (isMatch) {
          return (
            <span
              key={index}
              className="font-medium text-sky-700 dark:text-sky-400 underline decoration-sky-600/40 dark:decoration-sky-400/50 decoration-1 underline-offset-2 tracking-tight transition-colors hover:text-sky-800 dark:hover:text-sky-300"
            >
              {part}
            </span>
          );
        }

        return <React.Fragment key={index}>{part}</React.Fragment>;
      })}
    </span>
  );
}
