const fs = require('fs');
const path = require('path');

const baseDir = path.resolve(__dirname, '../public/flows/hld');

// Descriptive metadata for each of the 12 stages in beginner learning order
const STAGE_CONFIG = [
  {
    dir: '01_UML_Activity_Diagrams',
    number: '01',
    title: 'UML & Activity Fundamentals',
    shortName: 'UML Basics',
    description: 'Learn how to read and draw system flows, decision points, concurrent forks, and swimlanes.',
    icon: 'GitFork',
    category: 'Foundations'
  },
  {
    dir: '02_Communication_Protocols',
    number: '02',
    title: 'Communication Protocols & IPC',
    shortName: 'Protocols',
    description: 'HTTP, WebSockets, gRPC, and Realtime Push techniques for client-server and service-to-service links.',
    icon: 'Radio',
    category: 'Networking'
  },
  {
    dir: '03_CDN',
    number: '03',
    title: 'CDN (Content Delivery Network)',
    shortName: 'CDN & Edge',
    description: 'Edge caching, PoP routing, and reducing round-trip latency for static and dynamic assets.',
    icon: 'Globe',
    category: 'Edge Layer'
  },
  {
    dir: '04_Load_Balancer',
    number: '04',
    title: 'Load Balancing (L4 vs L7)',
    shortName: 'Load Balancer',
    description: 'Distribute traffic across server pools, health checks, automatic failover, and routing algorithms.',
    icon: 'Scale',
    category: 'Infrastructure'
  },
  {
    dir: '05_API_Gateway',
    number: '05',
    title: 'API Gateway & Perimeter',
    shortName: 'API Gateway',
    description: 'Centralized entry point: auth verification, rate limiting, SSL termination, and protocol translation.',
    icon: 'ShieldCheck',
    category: 'Infrastructure'
  },
  {
    dir: '06_Rate_Limiting_Algorithms',
    number: '06',
    title: 'Rate Limiting Algorithms',
    shortName: 'Rate Limiting',
    description: 'Protect services against DDoS and abuse using Token Bucket, Leaky Bucket, and Sliding Windows.',
    icon: 'Gauge',
    category: 'Security & Traffic'
  },
  {
    dir: '07_Caching',
    number: '07',
    title: 'Distributed Caching Strategies',
    shortName: 'Caching',
    description: 'Cache layers, Read-Through/Cache-Aside, Write-Back/Through, eviction policies, and cache invalidation.',
    icon: 'Zap',
    category: 'Data & Performance'
  },
  {
    dir: '08_Consistent_Hashing',
    number: '08',
    title: 'Consistent Hashing & Partitioning',
    shortName: 'Consistent Hashing',
    description: 'Horizontal data distribution, minimal key remapping during server scale up/down, and virtual nodes.',
    icon: 'Disc',
    category: 'Data & Performance'
  },
  {
    dir: '09_Message_Queues',
    number: '09',
    title: 'Asynchronous Message Queues',
    shortName: 'Message Queues',
    description: 'Decoupling services, traffic spike buffering, pub/sub, point-to-point, and delivery guarantees.',
    icon: 'Layers',
    category: 'Async Processing'
  },
  {
    dir: '10_Distributed_Transactions',
    number: '10',
    title: 'Distributed Transactions & Sagas',
    shortName: 'Transactions',
    description: 'Maintain data consistency across microservices via 2PC, Saga Choreography/Orchestration, and Outbox Pattern.',
    icon: 'RefreshCw',
    category: 'Distributed Systems'
  },
  {
    dir: '11_CAP_Theorem',
    number: '11',
    title: 'CAP Theorem & Tradeoffs',
    shortName: 'CAP Theorem',
    description: 'The fundamental trade-off: Consistency vs Availability under network partitions in real-world databases.',
    icon: 'Triangle',
    category: 'Distributed Systems'
  },
  {
    dir: '12_Full_HLD_Architectures',
    number: '12',
    title: 'End-to-End Master HLD Architectures',
    shortName: 'Master HLD',
    description: 'Complete production architectures putting all 11 building blocks together from browser to database and events.',
    icon: 'LayoutGrid',
    category: 'Master Architectures'
  }
];

function titleize(str) {
  return str
    .replace(/^(\d+_)?/, '')
    .replace(/_/g, ' ')
    .replace(/\b\w/g, c => c.toUpperCase())
    .replace(/Cdn/g, 'CDN')
    .replace(/Api/g, 'API')
    .replace(/Uml/g, 'UML')
    .replace(/Mq/g, 'Message Queue')
    .replace(/L4 Vs L7/g, 'L4 vs L7')
    .replace(/2pc/g, '2PC')
    .replace(/Cap/g, 'CAP')
    .replace(/Cp Vs Ap/g, 'CP vs AP')
    .replace(/Hld/g, 'HLD')
    .replace(/V2/g, '(Enhanced v2)');
}

const allStages = STAGE_CONFIG.map(cfg => {
  const stageDirPath = path.join(baseDir, cfg.dir);
  const items = [];

  function scan(dir, subDir = '') {
    if (!fs.existsSync(dir)) return;
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    entries.forEach(e => {
      const full = path.join(dir, e.name);
      if (e.isDirectory()) {
        scan(full, path.join(subDir, e.name));
      } else if (e.name.endsWith('.svg')) {
        const relUrl = `/flows/hld/${cfg.dir}/${subDir ? subDir.replace(/\\/g, '/') + '/' : ''}${e.name}`;
        const baseName = path.basename(e.name, '.svg');
        const flowId = `${cfg.number}_${subDir ? subDir.toLowerCase().replace(/[^a-z0-9]/g, '_') + '_' : ''}${baseName}`;
        
        items.push({
          id: flowId,
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

const totalFlows = allStages.reduce((sum, s) => sum + s.flows.length, 0);

console.log(`Generated ${allStages.length} stages with total ${totalFlows} flows.`);

const outputCode = `// Auto-generated High Level System Design Flows Dataset
export interface HLDFlow {
  id: string;
  stageNumber: string;
  stageTitle: string;
  subCategory?: string;
  fileName: string;
  title: string;
  svgUrl: string;
}

export interface HLDStage {
  dir: string;
  number: string;
  title: string;
  shortName: string;
  description: string;
  icon: string;
  category: string;
  flowCount: number;
  flows: HLDFlow[];
}

export const HLD_STAGES: HLDStage[] = ${JSON.stringify(allStages, null, 2)};

export const ALL_HLD_FLOWS: HLDFlow[] = HLD_STAGES.flatMap(s => s.flows);
`;

fs.writeFileSync(path.resolve(__dirname, '../src/data/hldFlowsData.ts'), outputCode, 'utf-8');
console.log('Saved src/data/hldFlowsData.ts successfully!');
