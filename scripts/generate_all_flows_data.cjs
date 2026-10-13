const fs = require('fs');
const path = require('path');

function titleize(str) {
  return str
    .replace(/^(\d+_)?/, '')
    .replace(/_/g, ' ')
    .replace(/\b\w/g, c => c.toUpperCase())
    .replace(/Cdn/g, 'CDN')
    .replace(/Api/g, 'API')
    .replace(/Uml/g, 'UML')
    .replace(/Mq/g, 'Message Queue')
    .replace(/Sql/g, 'SQL')
    .replace(/Nosql/g, 'NoSQL')
    .replace(/Db/g, 'DB')
    .replace(/Btree/g, 'B-Tree')
    .replace(/Lsm/g, 'LSM-Tree')
    .replace(/Llm/g, 'LLM')
    .replace(/Llms/g, 'LLMs')
    .replace(/Llm As A Judge/g, 'LLM-as-a-Judge')
    .replace(/Graphrag/g, 'GraphRAG')
    .replace(/Rag/g, 'RAG')
    .replace(/Ragas/g, 'Ragas')
    .replace(/G Eval/g, 'G-Eval')
    .replace(/Ci Cd/g, 'CI/CD')
    .replace(/Elo/g, 'Elo')
    .replace(/Needle In A Haystack/g, 'Needle in a Haystack')
    .replace(/Human In The Loop/g, 'Human-in-the-Loop')
    .replace(/Mem0/g, 'Mem0')
    .replace(/Memgpt/g, 'MemGPT')
    .replace(/Os/g, 'OS')
    .replace(/L4 Vs L7/g, 'L4 vs L7')
    .replace(/2pc/g, '2PC')
    .replace(/Cap/g, 'CAP')
    .replace(/Cp Vs Ap/g, 'CP vs AP')
    .replace(/Hld/g, 'HLD')
    .replace(/V2/g, '(Enhanced v2)');
}

// ----------------------------------------------------
// 1. HLD CONFIG (12 Stages)
// ----------------------------------------------------
const HLD_CONFIG = [
  { dir: '02_Communication_Protocols', number: '01', title: 'Communication Protocols & IPC', shortName: 'Protocols', description: 'HTTP, WebSockets, gRPC, and Realtime Push techniques.', icon: 'Radio', category: 'Networking' },
  { dir: '03_CDN', number: '02', title: 'CDN (Content Delivery Network)', shortName: 'CDN & Edge', description: 'Edge caching, PoP routing, and latency reduction.', icon: 'Globe', category: 'Edge Layer' },
  { dir: '04_Load_Balancer', number: '03', title: 'Load Balancing (L4 vs L7)', shortName: 'Load Balancer', description: 'Traffic distribution, health checks, failover, and algorithms.', icon: 'Scale', category: 'Infrastructure' },
  { dir: '05_API_Gateway', number: '04', title: 'API Gateway & Perimeter', shortName: 'API Gateway', description: 'Auth verification, rate limiting, SSL termination, and routing.', icon: 'ShieldCheck', category: 'Infrastructure' },
  { dir: '06_Rate_Limiting_Algorithms', number: '05', title: 'Rate Limiting Algorithms', shortName: 'Rate Limiting', description: 'Token Bucket, Leaky Bucket, Fixed and Sliding Windows.', icon: 'Gauge', category: 'Security' },
  { dir: '07_Caching', number: '06', title: 'Distributed Caching Strategies', shortName: 'Caching', description: 'Cache layers, Read/Write strategies, eviction policies, pitfalls.', icon: 'Zap', category: 'Data & Performance' },
  { dir: '08_Consistent_Hashing', number: '07', title: 'Consistent Hashing & Partitioning', shortName: 'Consistent Hashing', description: 'Horizontal distribution, minimal key remapping, and virtual nodes.', icon: 'Disc', category: 'Data & Performance' },
  { dir: '09_Message_Queues', number: '08', title: 'Asynchronous Message Queues', shortName: 'Message Queues', description: 'Decoupling services, spike buffering, and delivery guarantees.', icon: 'Layers', category: 'Async Processing' },
  { dir: '10_Distributed_Transactions', number: '09', title: 'Distributed Transactions & Sagas', shortName: 'Transactions', description: '2PC, Saga Choreography/Orchestration, and Outbox Pattern.', icon: 'RefreshCw', category: 'Distributed Systems' },
  { dir: '11_CAP_Theorem', number: '10', title: 'CAP Theorem & Tradeoffs', shortName: 'CAP Theorem', description: 'Consistency vs Availability under network partitions.', icon: 'Triangle', category: 'Distributed Systems' },
  { dir: '12_Full_HLD_Architectures', number: '11', title: 'End-to-End Master HLD Architectures', shortName: 'Master HLD', description: 'Complete production architectures from browser to database.', icon: 'LayoutGrid', category: 'Master Architectures' },
  { dir: '01_UML_Activity_Diagrams', number: '12', title: 'UML & Activity Fundamentals (Appendix)', shortName: 'UML Basics', description: 'Flowcharts, decision merges, concurrent fork-joins, and swimlanes.', icon: 'GitFork', category: 'Appendix & Basics' }
];

// ----------------------------------------------------
// 2. DATABASES CONFIG (4 Stages)
// ----------------------------------------------------
const DB_CONFIG = [
  { dir: '01_SQL_vs_NoSQL_Paradigms', number: '01', title: 'SQL vs NoSQL Paradigms', shortName: 'SQL vs NoSQL', description: 'ACID vs BASE, relational schemas vs document, key-value, and wide-column models.', icon: 'Table', category: 'Paradigms' },
  { dir: '02_Storage_Engines_Internals', number: '02', title: 'Storage Engines & Internals', shortName: 'Storage Engines', description: 'B-Tree page structures vs LSM-Trees (MemTable, WAL, SSTables, Compaction).', icon: 'HardDrive', category: 'Storage Internals' },
  { dir: '03_Database_Replication', number: '03', title: 'Database Replication & High Availability', shortName: 'Replication', description: 'Single-leader, multi-leader, sync vs async, failover, and replication lag.', icon: 'Copy', category: 'High Availability' },
  { dir: '04_Database_Sharding', number: '04', title: 'Database Sharding & Horizontal Scaling', shortName: 'Sharding', description: 'Routing keys, range/hash/geo strategies, cross-shard joins, and resharding.', icon: 'Grid', category: 'Scaling' }
];

// ----------------------------------------------------
// 3. GENAI CONFIG (3 Stages)
// ----------------------------------------------------
const GENAI_CONFIG = [
  { dir: '01_GenAI_And_GraphRAG_Architecture', number: '01', title: 'GraphRAG & Agentic Architectures', shortName: 'GraphRAG & Agents', description: 'Knowledge graphs, multi-hop reasoning, LLM gateways, and async agent queues.', icon: 'Brain', category: 'RAG & Workflows' },
  { dir: '02_LLM_Memory_Architectures', number: '02', title: 'LLM Memory Architectures & MemGPT', shortName: 'LLM Memory', description: 'Solving the stateless problem: sliding windows, hierarchical summary, virtual memory paging.', icon: 'Sparkles', category: 'Memory Systems' },
  { dir: '03_LLM_Evaluations_And_Benchmarking', number: '03', title: 'LLM Evaluations & Benchmarking', shortName: 'LLM Evals', description: 'Evaluation taxonomy, G-Eval, RAG Triad, LLM-as-a-Judge, CI/CD regression, synthetic datasets, and leaderboard arenas.', icon: 'CheckSquare', category: 'Evaluation & Testing' }
];

function buildCategoryStages(categoryKey, config, baseFolder) {
  return config.map(cfg => {
    const stageDirPath = path.join(baseFolder, cfg.dir);
    const items = [];

    function scan(dir, subDir = '') {
      if (!fs.existsSync(dir)) return;
      const entries = fs.readdirSync(dir, { withFileTypes: true });
      entries.sort((a, b) => a.name.localeCompare(b.name, undefined, { numeric: true }));

      entries.forEach(e => {
        const full = path.join(dir, e.name);
        if (e.isDirectory()) {
          scan(full, path.join(subDir, e.name));
        } else if (e.name.endsWith('.svg')) {
          const relUrl = `/flows/${categoryKey}/${cfg.dir}/${subDir ? subDir.replace(/\\/g, '/') + '/' : ''}${e.name}`;
          const baseName = path.basename(e.name, '.svg');
          const flowId = `${categoryKey}_${cfg.number}_${subDir ? subDir.toLowerCase().replace(/[^a-z0-9]/g, '_') + '_' : ''}${baseName}`;
          
          items.push({
            id: flowId,
            categoryKey,
            stageNumber: cfg.number,
            stageTitle: cfg.title,
            subCategory: subDir ? titleize(subDir) : undefined,
            fileName: e.name,
            title: titleize(baseName),
            svgUrl: relUrl,
          });
        }
      });
    }

    scan(stageDirPath);

    return {
      ...cfg,
      flowCount: items.length,
      flows: items
    };
  });
}

const hldStages = buildCategoryStages('hld', HLD_CONFIG, path.resolve(__dirname, '../public/flows/hld'));
const dbStages = buildCategoryStages('databases', DB_CONFIG, path.resolve(__dirname, '../public/flows/databases'));
const genaiStages = buildCategoryStages('genai', GENAI_CONFIG, path.resolve(__dirname, '../public/flows/genai'));

const hldCount = hldStages.reduce((sum, s) => sum + s.flows.length, 0);
const dbCount = dbStages.reduce((sum, s) => sum + s.flows.length, 0);
const genaiCount = genaiStages.reduce((sum, s) => sum + s.flows.length, 0);

console.log(`HLD: ${hldStages.length} stages, ${hldCount} flows`);
console.log(`Databases: ${dbStages.length} stages, ${dbCount} flows`);
console.log(`GenAI: ${genaiStages.length} stages, ${genaiCount} flows`);
console.log(`Total: ${hldCount + dbCount + genaiCount} flows across all 3 subsections!`);

const outputCode = `// Auto-generated Complete Architecture Flows Dataset (HLD, Databases, GenAI & AI)

export type FlowCategory = 'hld' | 'databases' | 'genai';

export interface SystemFlow {
  id: string;
  categoryKey: FlowCategory;
  stageNumber: string;
  stageTitle: string;
  subCategory?: string;
  fileName: string;
  title: string;
  svgUrl: string;
}

export interface FlowStage {
  dir: string;
  number: string;
  title: string;
  shortName: string;
  description: string;
  icon: string;
  category: string;
  flowCount: number;
  flows: SystemFlow[];
}

export interface CategoryMeta {
  key: FlowCategory;
  title: string;
  shortTitle: string;
  description: string;
  flowCount: number;
  stageCount: number;
  stages: FlowStage[];
  flows: SystemFlow[];
}

export const HLD_STAGES: FlowStage[] = ${JSON.stringify(hldStages, null, 2)};
export const ALL_HLD_FLOWS: SystemFlow[] = HLD_STAGES.flatMap(s => s.flows);

export const DB_STAGES: FlowStage[] = ${JSON.stringify(dbStages, null, 2)};
export const ALL_DB_FLOWS: SystemFlow[] = DB_STAGES.flatMap(s => s.flows);

export const GENAI_STAGES: FlowStage[] = ${JSON.stringify(genaiStages, null, 2)};
export const ALL_GENAI_FLOWS: SystemFlow[] = GENAI_STAGES.flatMap(s => s.flows);

export const CATEGORIES_DATA: Record<FlowCategory, CategoryMeta> = {
  hld: {
    key: 'hld',
    title: 'High Level System Design',
    shortTitle: 'HLD',
    description: 'Master large-scale distributed systems: load balancers, rate limiters, message queues, and end-to-end architectures.',
    stageCount: ${hldStages.length},
    flowCount: ${hldCount},
    stages: HLD_STAGES,
    flows: ALL_HLD_FLOWS
  },
  databases: {
    key: 'databases',
    title: 'Database & Storage Systems',
    shortTitle: 'Databases',
    description: 'Deep dive into storage engines: B-Trees, LSM-Trees, replication topologies, and horizontal sharding strategies.',
    stageCount: ${dbStages.length},
    flowCount: ${dbCount},
    stages: DB_STAGES,
    flows: ALL_DB_FLOWS
  },
  genai: {
    key: 'genai',
    title: 'GenAI & AI Systems',
    shortTitle: 'GenAI & AI',
    description: 'Production GraphRAG, multi-hop reasoning, agent memory paging (MemGPT, Mem0), and async workflow loops.',
    stageCount: ${genaiStages.length},
    flowCount: ${genaiCount},
    stages: GENAI_STAGES,
    flows: ALL_GENAI_FLOWS
  }
};
`;

fs.writeFileSync(path.resolve(__dirname, '../src/data/flowsData.ts'), outputCode, 'utf-8');
console.log('Saved src/data/flowsData.ts successfully!');
