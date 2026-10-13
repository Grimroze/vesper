// Auto-generated Complete Architecture Flows Dataset (HLD, Databases, GenAI & AI)

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

export const HLD_STAGES: FlowStage[] = [
  {
    "dir": "02_Communication_Protocols",
    "number": "01",
    "title": "Communication Protocols & IPC",
    "shortName": "Protocols",
    "description": "HTTP, WebSockets, gRPC, and Realtime Push techniques.",
    "icon": "Radio",
    "category": "Networking",
    "flowCount": 5,
    "flows": [
      {
        "id": "hld_01_comm_protocol_comparison",
        "categoryKey": "hld",
        "stageNumber": "01",
        "stageTitle": "Communication Protocols & IPC",
        "fileName": "comm_protocol_comparison.svg",
        "title": "Comm Protocol Comparison",
        "svgUrl": "/flows/hld/02_Communication_Protocols/comm_protocol_comparison.svg"
      },
      {
        "id": "hld_01_comm_pub_sub",
        "categoryKey": "hld",
        "stageNumber": "01",
        "stageTitle": "Communication Protocols & IPC",
        "fileName": "comm_pub_sub.svg",
        "title": "Comm Pub Sub",
        "svgUrl": "/flows/hld/02_Communication_Protocols/comm_pub_sub.svg"
      },
      {
        "id": "hld_01_comm_realtime_push_techniques_v2",
        "categoryKey": "hld",
        "stageNumber": "01",
        "stageTitle": "Communication Protocols & IPC",
        "fileName": "comm_realtime_push_techniques_v2.svg",
        "title": "Comm Realtime Push Techniques (Enhanced v2)",
        "svgUrl": "/flows/hld/02_Communication_Protocols/comm_realtime_push_techniques_v2.svg"
      },
      {
        "id": "hld_01_comm_realtime_push_techniques",
        "categoryKey": "hld",
        "stageNumber": "01",
        "stageTitle": "Communication Protocols & IPC",
        "fileName": "comm_realtime_push_techniques.svg",
        "title": "Comm Realtime Push Techniques",
        "svgUrl": "/flows/hld/02_Communication_Protocols/comm_realtime_push_techniques.svg"
      },
      {
        "id": "hld_01_comm_sync_vs_async",
        "categoryKey": "hld",
        "stageNumber": "01",
        "stageTitle": "Communication Protocols & IPC",
        "fileName": "comm_sync_vs_async.svg",
        "title": "Comm Sync Vs Async",
        "svgUrl": "/flows/hld/02_Communication_Protocols/comm_sync_vs_async.svg"
      }
    ]
  },
  {
    "dir": "03_CDN",
    "number": "02",
    "title": "CDN (Content Delivery Network)",
    "shortName": "CDN & Edge",
    "description": "Edge caching, PoP routing, and latency reduction.",
    "icon": "Globe",
    "category": "Edge Layer",
    "flowCount": 3,
    "flows": [
      {
        "id": "hld_02_cdn_architecture",
        "categoryKey": "hld",
        "stageNumber": "02",
        "stageTitle": "CDN (Content Delivery Network)",
        "fileName": "cdn_architecture.svg",
        "title": "CDN Architecture",
        "svgUrl": "/flows/hld/03_CDN/cdn_architecture.svg"
      },
      {
        "id": "hld_02_cdn_cache_hit_miss",
        "categoryKey": "hld",
        "stageNumber": "02",
        "stageTitle": "CDN (Content Delivery Network)",
        "fileName": "cdn_cache_hit_miss.svg",
        "title": "CDN Cache Hit Miss",
        "svgUrl": "/flows/hld/03_CDN/cdn_cache_hit_miss.svg"
      },
      {
        "id": "hld_02_cdn_step_by_step_flow",
        "categoryKey": "hld",
        "stageNumber": "02",
        "stageTitle": "CDN (Content Delivery Network)",
        "fileName": "cdn_step_by_step_flow.svg",
        "title": "CDN Step By Step Flow",
        "svgUrl": "/flows/hld/03_CDN/cdn_step_by_step_flow.svg"
      }
    ]
  },
  {
    "dir": "04_Load_Balancer",
    "number": "03",
    "title": "Load Balancing (L4 vs L7)",
    "shortName": "Load Balancer",
    "description": "Traffic distribution, health checks, failover, and algorithms.",
    "icon": "Scale",
    "category": "Infrastructure",
    "flowCount": 4,
    "flows": [
      {
        "id": "hld_03_load_balancer_algorithms",
        "categoryKey": "hld",
        "stageNumber": "03",
        "stageTitle": "Load Balancing (L4 vs L7)",
        "fileName": "load_balancer_algorithms.svg",
        "title": "Load Balancer Algorithms",
        "svgUrl": "/flows/hld/04_Load_Balancer/load_balancer_algorithms.svg"
      },
      {
        "id": "hld_03_load_balancer_architecture",
        "categoryKey": "hld",
        "stageNumber": "03",
        "stageTitle": "Load Balancing (L4 vs L7)",
        "fileName": "load_balancer_architecture.svg",
        "title": "Load Balancer Architecture",
        "svgUrl": "/flows/hld/04_Load_Balancer/load_balancer_architecture.svg"
      },
      {
        "id": "hld_03_load_balancer_health_check_failover",
        "categoryKey": "hld",
        "stageNumber": "03",
        "stageTitle": "Load Balancing (L4 vs L7)",
        "fileName": "load_balancer_health_check_failover.svg",
        "title": "Load Balancer Health Check Failover",
        "svgUrl": "/flows/hld/04_Load_Balancer/load_balancer_health_check_failover.svg"
      },
      {
        "id": "hld_03_load_balancer_l4_vs_l7",
        "categoryKey": "hld",
        "stageNumber": "03",
        "stageTitle": "Load Balancing (L4 vs L7)",
        "fileName": "load_balancer_l4_vs_l7.svg",
        "title": "Load Balancer L4 vs L7",
        "svgUrl": "/flows/hld/04_Load_Balancer/load_balancer_l4_vs_l7.svg"
      }
    ]
  },
  {
    "dir": "05_API_Gateway",
    "number": "04",
    "title": "API Gateway & Perimeter",
    "shortName": "API Gateway",
    "description": "Auth verification, rate limiting, SSL termination, and routing.",
    "icon": "ShieldCheck",
    "category": "Infrastructure",
    "flowCount": 10,
    "flows": [
      {
        "id": "hld_04_api_gateway_architecture",
        "categoryKey": "hld",
        "stageNumber": "04",
        "stageTitle": "API Gateway & Perimeter",
        "fileName": "api_gateway_architecture.svg",
        "title": "API Gateway Architecture",
        "svgUrl": "/flows/hld/05_API_Gateway/api_gateway_architecture.svg"
      },
      {
        "id": "hld_04_api_gateway_request_lifecycle",
        "categoryKey": "hld",
        "stageNumber": "04",
        "stageTitle": "API Gateway & Perimeter",
        "fileName": "api_gateway_request_lifecycle.svg",
        "title": "API Gateway Request Lifecycle",
        "svgUrl": "/flows/hld/05_API_Gateway/api_gateway_request_lifecycle.svg"
      },
      {
        "id": "hld_04_gateway_auth",
        "categoryKey": "hld",
        "stageNumber": "04",
        "stageTitle": "API Gateway & Perimeter",
        "fileName": "gateway_auth.svg",
        "title": "Gateway Auth",
        "svgUrl": "/flows/hld/05_API_Gateway/gateway_auth.svg"
      },
      {
        "id": "hld_04_gateway_caching",
        "categoryKey": "hld",
        "stageNumber": "04",
        "stageTitle": "API Gateway & Perimeter",
        "fileName": "gateway_caching.svg",
        "title": "Gateway Caching",
        "svgUrl": "/flows/hld/05_API_Gateway/gateway_caching.svg"
      },
      {
        "id": "hld_04_gateway_load_balancing",
        "categoryKey": "hld",
        "stageNumber": "04",
        "stageTitle": "API Gateway & Perimeter",
        "fileName": "gateway_load_balancing.svg",
        "title": "Gateway Load Balancing",
        "svgUrl": "/flows/hld/05_API_Gateway/gateway_load_balancing.svg"
      },
      {
        "id": "hld_04_gateway_monitoring_logging",
        "categoryKey": "hld",
        "stageNumber": "04",
        "stageTitle": "API Gateway & Perimeter",
        "fileName": "gateway_monitoring_logging.svg",
        "title": "Gateway Monitoring Logging",
        "svgUrl": "/flows/hld/05_API_Gateway/gateway_monitoring_logging.svg"
      },
      {
        "id": "hld_04_gateway_protocol_translation",
        "categoryKey": "hld",
        "stageNumber": "04",
        "stageTitle": "API Gateway & Perimeter",
        "fileName": "gateway_protocol_translation.svg",
        "title": "Gateway Protocol Translation",
        "svgUrl": "/flows/hld/05_API_Gateway/gateway_protocol_translation.svg"
      },
      {
        "id": "hld_04_gateway_rate_limiting",
        "categoryKey": "hld",
        "stageNumber": "04",
        "stageTitle": "API Gateway & Perimeter",
        "fileName": "gateway_rate_limiting.svg",
        "title": "Gateway Rate Limiting",
        "svgUrl": "/flows/hld/05_API_Gateway/gateway_rate_limiting.svg"
      },
      {
        "id": "hld_04_gateway_request_aggregation",
        "categoryKey": "hld",
        "stageNumber": "04",
        "stageTitle": "API Gateway & Perimeter",
        "fileName": "gateway_request_aggregation.svg",
        "title": "Gateway Request Aggregation",
        "svgUrl": "/flows/hld/05_API_Gateway/gateway_request_aggregation.svg"
      },
      {
        "id": "hld_04_gateway_routing",
        "categoryKey": "hld",
        "stageNumber": "04",
        "stageTitle": "API Gateway & Perimeter",
        "fileName": "gateway_routing.svg",
        "title": "Gateway Routing",
        "svgUrl": "/flows/hld/05_API_Gateway/gateway_routing.svg"
      }
    ]
  },
  {
    "dir": "06_Rate_Limiting_Algorithms",
    "number": "05",
    "title": "Rate Limiting Algorithms",
    "shortName": "Rate Limiting",
    "description": "Token Bucket, Leaky Bucket, Fixed and Sliding Windows.",
    "icon": "Gauge",
    "category": "Security",
    "flowCount": 4,
    "flows": [
      {
        "id": "hld_05_rate_limit_fixed_window",
        "categoryKey": "hld",
        "stageNumber": "05",
        "stageTitle": "Rate Limiting Algorithms",
        "fileName": "rate_limit_fixed_window.svg",
        "title": "Rate Limit Fixed Window",
        "svgUrl": "/flows/hld/06_Rate_Limiting_Algorithms/rate_limit_fixed_window.svg"
      },
      {
        "id": "hld_05_rate_limit_leaky_bucket",
        "categoryKey": "hld",
        "stageNumber": "05",
        "stageTitle": "Rate Limiting Algorithms",
        "fileName": "rate_limit_leaky_bucket.svg",
        "title": "Rate Limit Leaky Bucket",
        "svgUrl": "/flows/hld/06_Rate_Limiting_Algorithms/rate_limit_leaky_bucket.svg"
      },
      {
        "id": "hld_05_rate_limit_sliding_window",
        "categoryKey": "hld",
        "stageNumber": "05",
        "stageTitle": "Rate Limiting Algorithms",
        "fileName": "rate_limit_sliding_window.svg",
        "title": "Rate Limit Sliding Window",
        "svgUrl": "/flows/hld/06_Rate_Limiting_Algorithms/rate_limit_sliding_window.svg"
      },
      {
        "id": "hld_05_rate_limit_token_bucket",
        "categoryKey": "hld",
        "stageNumber": "05",
        "stageTitle": "Rate Limiting Algorithms",
        "fileName": "rate_limit_token_bucket.svg",
        "title": "Rate Limit Token Bucket",
        "svgUrl": "/flows/hld/06_Rate_Limiting_Algorithms/rate_limit_token_bucket.svg"
      }
    ]
  },
  {
    "dir": "07_Caching",
    "number": "06",
    "title": "Distributed Caching Strategies",
    "shortName": "Caching",
    "description": "Cache layers, Read/Write strategies, eviction policies, pitfalls.",
    "icon": "Zap",
    "category": "Data & Performance",
    "flowCount": 5,
    "flows": [
      {
        "id": "hld_06_caching_common_problems",
        "categoryKey": "hld",
        "stageNumber": "06",
        "stageTitle": "Distributed Caching Strategies",
        "fileName": "caching_common_problems.svg",
        "title": "Caching Common Problems",
        "svgUrl": "/flows/hld/07_Caching/caching_common_problems.svg"
      },
      {
        "id": "hld_06_caching_eviction_policies",
        "categoryKey": "hld",
        "stageNumber": "06",
        "stageTitle": "Distributed Caching Strategies",
        "fileName": "caching_eviction_policies.svg",
        "title": "Caching Eviction Policies",
        "svgUrl": "/flows/hld/07_Caching/caching_eviction_policies.svg"
      },
      {
        "id": "hld_06_caching_layers",
        "categoryKey": "hld",
        "stageNumber": "06",
        "stageTitle": "Distributed Caching Strategies",
        "fileName": "caching_layers.svg",
        "title": "Caching Layers",
        "svgUrl": "/flows/hld/07_Caching/caching_layers.svg"
      },
      {
        "id": "hld_06_caching_read_strategies",
        "categoryKey": "hld",
        "stageNumber": "06",
        "stageTitle": "Distributed Caching Strategies",
        "fileName": "caching_read_strategies.svg",
        "title": "Caching Read Strategies",
        "svgUrl": "/flows/hld/07_Caching/caching_read_strategies.svg"
      },
      {
        "id": "hld_06_caching_write_strategies",
        "categoryKey": "hld",
        "stageNumber": "06",
        "stageTitle": "Distributed Caching Strategies",
        "fileName": "caching_write_strategies.svg",
        "title": "Caching Write Strategies",
        "svgUrl": "/flows/hld/07_Caching/caching_write_strategies.svg"
      }
    ]
  },
  {
    "dir": "08_Consistent_Hashing",
    "number": "07",
    "title": "Consistent Hashing & Partitioning",
    "shortName": "Consistent Hashing",
    "description": "Horizontal distribution, minimal key remapping, and virtual nodes.",
    "icon": "Disc",
    "category": "Data & Performance",
    "flowCount": 4,
    "flows": [
      {
        "id": "hld_07_consistent_hashing_add_node",
        "categoryKey": "hld",
        "stageNumber": "07",
        "stageTitle": "Consistent Hashing & Partitioning",
        "fileName": "consistent_hashing_add_node.svg",
        "title": "Consistent Hashing Add Node",
        "svgUrl": "/flows/hld/08_Consistent_Hashing/consistent_hashing_add_node.svg"
      },
      {
        "id": "hld_07_consistent_hashing_basic_ring",
        "categoryKey": "hld",
        "stageNumber": "07",
        "stageTitle": "Consistent Hashing & Partitioning",
        "fileName": "consistent_hashing_basic_ring.svg",
        "title": "Consistent Hashing Basic Ring",
        "svgUrl": "/flows/hld/08_Consistent_Hashing/consistent_hashing_basic_ring.svg"
      },
      {
        "id": "hld_07_consistent_hashing_uneven_problem",
        "categoryKey": "hld",
        "stageNumber": "07",
        "stageTitle": "Consistent Hashing & Partitioning",
        "fileName": "consistent_hashing_uneven_problem.svg",
        "title": "Consistent Hashing Uneven Problem",
        "svgUrl": "/flows/hld/08_Consistent_Hashing/consistent_hashing_uneven_problem.svg"
      },
      {
        "id": "hld_07_consistent_hashing_virtual_nodes",
        "categoryKey": "hld",
        "stageNumber": "07",
        "stageTitle": "Consistent Hashing & Partitioning",
        "fileName": "consistent_hashing_virtual_nodes.svg",
        "title": "Consistent Hashing Virtual Nodes",
        "svgUrl": "/flows/hld/08_Consistent_Hashing/consistent_hashing_virtual_nodes.svg"
      }
    ]
  },
  {
    "dir": "09_Message_Queues",
    "number": "08",
    "title": "Asynchronous Message Queues",
    "shortName": "Message Queues",
    "description": "Decoupling services, spike buffering, and delivery guarantees.",
    "icon": "Layers",
    "category": "Async Processing",
    "flowCount": 4,
    "flows": [
      {
        "id": "hld_08_mq_basic_architecture",
        "categoryKey": "hld",
        "stageNumber": "08",
        "stageTitle": "Asynchronous Message Queues",
        "fileName": "mq_basic_architecture.svg",
        "title": "Message Queue Basic Architecture",
        "svgUrl": "/flows/hld/09_Message_Queues/mq_basic_architecture.svg"
      },
      {
        "id": "hld_08_mq_delivery_guarantees",
        "categoryKey": "hld",
        "stageNumber": "08",
        "stageTitle": "Asynchronous Message Queues",
        "fileName": "mq_delivery_guarantees.svg",
        "title": "Message Queue Delivery Guarantees",
        "svgUrl": "/flows/hld/09_Message_Queues/mq_delivery_guarantees.svg"
      },
      {
        "id": "hld_08_mq_point_to_point_vs_pubsub",
        "categoryKey": "hld",
        "stageNumber": "08",
        "stageTitle": "Asynchronous Message Queues",
        "fileName": "mq_point_to_point_vs_pubsub.svg",
        "title": "Message Queue Point To Point Vs Pubsub",
        "svgUrl": "/flows/hld/09_Message_Queues/mq_point_to_point_vs_pubsub.svg"
      },
      {
        "id": "hld_08_mq_why_needed",
        "categoryKey": "hld",
        "stageNumber": "08",
        "stageTitle": "Asynchronous Message Queues",
        "fileName": "mq_why_needed.svg",
        "title": "Message Queue Why Needed",
        "svgUrl": "/flows/hld/09_Message_Queues/mq_why_needed.svg"
      }
    ]
  },
  {
    "dir": "10_Distributed_Transactions",
    "number": "09",
    "title": "Distributed Transactions & Sagas",
    "shortName": "Transactions",
    "description": "2PC, Saga Choreography/Orchestration, and Outbox Pattern.",
    "icon": "RefreshCw",
    "category": "Distributed Systems",
    "flowCount": 5,
    "flows": [
      {
        "id": "hld_09_01_two_phase_commit_2pc",
        "categoryKey": "hld",
        "stageNumber": "09",
        "stageTitle": "Distributed Transactions & Sagas",
        "fileName": "01_two_phase_commit_2pc.svg",
        "title": "Two Phase Commit 2PC",
        "svgUrl": "/flows/hld/10_Distributed_Transactions/01_two_phase_commit_2pc.svg"
      },
      {
        "id": "hld_09_02_saga_choreography_vs_orchestration",
        "categoryKey": "hld",
        "stageNumber": "09",
        "stageTitle": "Distributed Transactions & Sagas",
        "fileName": "02_saga_choreography_vs_orchestration.svg",
        "title": "Saga Choreography Vs Orchestration",
        "svgUrl": "/flows/hld/10_Distributed_Transactions/02_saga_choreography_vs_orchestration.svg"
      },
      {
        "id": "hld_09_03_saga_compensating_transactions_rollback",
        "categoryKey": "hld",
        "stageNumber": "09",
        "stageTitle": "Distributed Transactions & Sagas",
        "fileName": "03_saga_compensating_transactions_rollback.svg",
        "title": "Saga Compensating Transactions Rollback",
        "svgUrl": "/flows/hld/10_Distributed_Transactions/03_saga_compensating_transactions_rollback.svg"
      },
      {
        "id": "hld_09_04_transactional_outbox_pattern",
        "categoryKey": "hld",
        "stageNumber": "09",
        "stageTitle": "Distributed Transactions & Sagas",
        "fileName": "04_transactional_outbox_pattern.svg",
        "title": "Transactional Outbox Pattern",
        "svgUrl": "/flows/hld/10_Distributed_Transactions/04_transactional_outbox_pattern.svg"
      },
      {
        "id": "hld_09_05_idempotency_key_payment_flow",
        "categoryKey": "hld",
        "stageNumber": "09",
        "stageTitle": "Distributed Transactions & Sagas",
        "fileName": "05_idempotency_key_payment_flow.svg",
        "title": "Idempotency Key Payment Flow",
        "svgUrl": "/flows/hld/10_Distributed_Transactions/05_idempotency_key_payment_flow.svg"
      }
    ]
  },
  {
    "dir": "11_CAP_Theorem",
    "number": "10",
    "title": "CAP Theorem & Tradeoffs",
    "shortName": "CAP Theorem",
    "description": "Consistency vs Availability under network partitions.",
    "icon": "Triangle",
    "category": "Distributed Systems",
    "flowCount": 4,
    "flows": [
      {
        "id": "hld_10_cap_cp_vs_ap_examples",
        "categoryKey": "hld",
        "stageNumber": "10",
        "stageTitle": "CAP Theorem & Tradeoffs",
        "fileName": "cap_cp_vs_ap_examples.svg",
        "title": "CAP CP vs AP Examples",
        "svgUrl": "/flows/hld/11_CAP_Theorem/cap_cp_vs_ap_examples.svg"
      },
      {
        "id": "hld_10_cap_partition_scenario",
        "categoryKey": "hld",
        "stageNumber": "10",
        "stageTitle": "CAP Theorem & Tradeoffs",
        "fileName": "cap_partition_scenario.svg",
        "title": "CAP Partition Scenario",
        "svgUrl": "/flows/hld/11_CAP_Theorem/cap_partition_scenario.svg"
      },
      {
        "id": "hld_10_cap_theorem_triangle",
        "categoryKey": "hld",
        "stageNumber": "10",
        "stageTitle": "CAP Theorem & Tradeoffs",
        "fileName": "cap_theorem_triangle.svg",
        "title": "CAP Theorem Triangle",
        "svgUrl": "/flows/hld/11_CAP_Theorem/cap_theorem_triangle.svg"
      },
      {
        "id": "hld_10_detailed_cap_tradeoffs_in_system",
        "categoryKey": "hld",
        "stageNumber": "10",
        "stageTitle": "CAP Theorem & Tradeoffs",
        "fileName": "detailed_cap_tradeoffs_in_system.svg",
        "title": "Detailed CAP Tradeoffs In System",
        "svgUrl": "/flows/hld/11_CAP_Theorem/detailed_cap_tradeoffs_in_system.svg"
      }
    ]
  },
  {
    "dir": "12_Full_HLD_Architectures",
    "number": "11",
    "title": "End-to-End Master HLD Architectures",
    "shortName": "Master HLD",
    "description": "Complete production architectures from browser to database.",
    "icon": "LayoutGrid",
    "category": "Master Architectures",
    "flowCount": 10,
    "flows": [
      {
        "id": "hld_11_01_master_hld_and_numbered_sequence_full_hld_numbered_sequence",
        "categoryKey": "hld",
        "stageNumber": "11",
        "stageTitle": "End-to-End Master HLD Architectures",
        "subCategory": "Master HLD And Numbered Sequence",
        "fileName": "full_hld_numbered_sequence.svg",
        "title": "Full HLD Numbered Sequence",
        "svgUrl": "/flows/hld/12_Full_HLD_Architectures/01_Master_HLD_And_Numbered_Sequence/full_hld_numbered_sequence.svg"
      },
      {
        "id": "hld_11_01_master_hld_and_numbered_sequence_full_hld_system_architecture",
        "categoryKey": "hld",
        "stageNumber": "11",
        "stageTitle": "End-to-End Master HLD Architectures",
        "subCategory": "Master HLD And Numbered Sequence",
        "fileName": "full_hld_system_architecture.svg",
        "title": "Full HLD System Architecture",
        "svgUrl": "/flows/hld/12_Full_HLD_Architectures/01_Master_HLD_And_Numbered_Sequence/full_hld_system_architecture.svg"
      },
      {
        "id": "hld_11_02_browser_to_response_round_trip_full_round_trip_browser_to_response",
        "categoryKey": "hld",
        "stageNumber": "11",
        "stageTitle": "End-to-End Master HLD Architectures",
        "subCategory": "Browser To Response Round Trip",
        "fileName": "full_round_trip_browser_to_response.svg",
        "title": "Full Round Trip Browser To Response",
        "svgUrl": "/flows/hld/12_Full_HLD_Architectures/02_Browser_To_Response_Round_Trip/full_round_trip_browser_to_response.svg"
      },
      {
        "id": "hld_11_02_browser_to_response_round_trip_full_round_trip_v2",
        "categoryKey": "hld",
        "stageNumber": "11",
        "stageTitle": "End-to-End Master HLD Architectures",
        "subCategory": "Browser To Response Round Trip",
        "fileName": "full_round_trip_v2.svg",
        "title": "Full Round Trip (Enhanced v2)",
        "svgUrl": "/flows/hld/12_Full_HLD_Architectures/02_Browser_To_Response_Round_Trip/full_round_trip_v2.svg"
      },
      {
        "id": "hld_11_03_detailed_3_part_system_breakdown_01_detailed_entry_path_part_1",
        "categoryKey": "hld",
        "stageNumber": "11",
        "stageTitle": "End-to-End Master HLD Architectures",
        "subCategory": "Detailed 3 Part System Breakdown",
        "fileName": "01_detailed_entry_path_part_1.svg",
        "title": "Detailed Entry Path Part 1",
        "svgUrl": "/flows/hld/12_Full_HLD_Architectures/03_Detailed_3_Part_System_Breakdown/01_detailed_entry_path_part_1.svg"
      },
      {
        "id": "hld_11_03_detailed_3_part_system_breakdown_02_detailed_service_and_data_layer_part_2",
        "categoryKey": "hld",
        "stageNumber": "11",
        "stageTitle": "End-to-End Master HLD Architectures",
        "subCategory": "Detailed 3 Part System Breakdown",
        "fileName": "02_detailed_service_and_data_layer_part_2.svg",
        "title": "Detailed Service And Data Layer Part 2",
        "svgUrl": "/flows/hld/12_Full_HLD_Architectures/03_Detailed_3_Part_System_Breakdown/02_detailed_service_and_data_layer_part_2.svg"
      },
      {
        "id": "hld_11_03_detailed_3_part_system_breakdown_03_detailed_event_system_part_3",
        "categoryKey": "hld",
        "stageNumber": "11",
        "stageTitle": "End-to-End Master HLD Architectures",
        "subCategory": "Detailed 3 Part System Breakdown",
        "fileName": "03_detailed_event_system_part_3.svg",
        "title": "Detailed Event System Part 3",
        "svgUrl": "/flows/hld/12_Full_HLD_Architectures/03_Detailed_3_Part_System_Breakdown/03_detailed_event_system_part_3.svg"
      },
      {
        "id": "hld_11_04_resilience_observability_and_tradeoffs_detailed_cap_tradeoffs_in_system",
        "categoryKey": "hld",
        "stageNumber": "11",
        "stageTitle": "End-to-End Master HLD Architectures",
        "subCategory": "Resilience Observability And Tradeoffs",
        "fileName": "detailed_cap_tradeoffs_in_system.svg",
        "title": "Detailed CAP Tradeoffs In System",
        "svgUrl": "/flows/hld/12_Full_HLD_Architectures/04_Resilience_Observability_And_Tradeoffs/detailed_cap_tradeoffs_in_system.svg"
      },
      {
        "id": "hld_11_04_resilience_observability_and_tradeoffs_detailed_circuit_breaker",
        "categoryKey": "hld",
        "stageNumber": "11",
        "stageTitle": "End-to-End Master HLD Architectures",
        "subCategory": "Resilience Observability And Tradeoffs",
        "fileName": "detailed_circuit_breaker.svg",
        "title": "Detailed Circuit Breaker",
        "svgUrl": "/flows/hld/12_Full_HLD_Architectures/04_Resilience_Observability_And_Tradeoffs/detailed_circuit_breaker.svg"
      },
      {
        "id": "hld_11_04_resilience_observability_and_tradeoffs_detailed_observability_layer",
        "categoryKey": "hld",
        "stageNumber": "11",
        "stageTitle": "End-to-End Master HLD Architectures",
        "subCategory": "Resilience Observability And Tradeoffs",
        "fileName": "detailed_observability_layer.svg",
        "title": "Detailed Observability Layer",
        "svgUrl": "/flows/hld/12_Full_HLD_Architectures/04_Resilience_Observability_And_Tradeoffs/detailed_observability_layer.svg"
      }
    ]
  },
  {
    "dir": "01_UML_Activity_Diagrams",
    "number": "12",
    "title": "UML & Activity Fundamentals (Appendix)",
    "shortName": "UML Basics",
    "description": "Flowcharts, decision merges, concurrent fork-joins, and swimlanes.",
    "icon": "GitFork",
    "category": "Appendix & Basics",
    "flowCount": 5,
    "flows": [
      {
        "id": "hld_12_uml_activity_basic_notation",
        "categoryKey": "hld",
        "stageNumber": "12",
        "stageTitle": "UML & Activity Fundamentals (Appendix)",
        "fileName": "uml_activity_basic_notation.svg",
        "title": "UML Activity Basic Notation",
        "svgUrl": "/flows/hld/01_UML_Activity_Diagrams/uml_activity_basic_notation.svg"
      },
      {
        "id": "hld_12_uml_activity_decision_merge_v2",
        "categoryKey": "hld",
        "stageNumber": "12",
        "stageTitle": "UML & Activity Fundamentals (Appendix)",
        "fileName": "uml_activity_decision_merge_v2.svg",
        "title": "UML Activity Decision Merge (Enhanced v2)",
        "svgUrl": "/flows/hld/01_UML_Activity_Diagrams/uml_activity_decision_merge_v2.svg"
      },
      {
        "id": "hld_12_uml_activity_decision_merge",
        "categoryKey": "hld",
        "stageNumber": "12",
        "stageTitle": "UML & Activity Fundamentals (Appendix)",
        "fileName": "uml_activity_decision_merge.svg",
        "title": "UML Activity Decision Merge",
        "svgUrl": "/flows/hld/01_UML_Activity_Diagrams/uml_activity_decision_merge.svg"
      },
      {
        "id": "hld_12_uml_activity_fork_join",
        "categoryKey": "hld",
        "stageNumber": "12",
        "stageTitle": "UML & Activity Fundamentals (Appendix)",
        "fileName": "uml_activity_fork_join.svg",
        "title": "UML Activity Fork Join",
        "svgUrl": "/flows/hld/01_UML_Activity_Diagrams/uml_activity_fork_join.svg"
      },
      {
        "id": "hld_12_uml_activity_swimlane_example",
        "categoryKey": "hld",
        "stageNumber": "12",
        "stageTitle": "UML & Activity Fundamentals (Appendix)",
        "fileName": "uml_activity_swimlane_example.svg",
        "title": "UML Activity Swimlane Example",
        "svgUrl": "/flows/hld/01_UML_Activity_Diagrams/uml_activity_swimlane_example.svg"
      }
    ]
  }
];
export const ALL_HLD_FLOWS: SystemFlow[] = HLD_STAGES.flatMap(s => s.flows);

export const DB_STAGES: FlowStage[] = [
  {
    "dir": "01_SQL_vs_NoSQL_Paradigms",
    "number": "01",
    "title": "SQL vs NoSQL Paradigms",
    "shortName": "SQL vs NoSQL",
    "description": "ACID vs BASE, relational schemas vs document, key-value, and wide-column models.",
    "icon": "Table",
    "category": "Paradigms",
    "flowCount": 1,
    "flows": [
      {
        "id": "databases_01_db_sql_vs_nosql",
        "categoryKey": "databases",
        "stageNumber": "01",
        "stageTitle": "SQL vs NoSQL Paradigms",
        "fileName": "db_sql_vs_nosql.svg",
        "title": "DB SQL Vs NoSQL",
        "svgUrl": "/flows/databases/01_SQL_vs_NoSQL_Paradigms/db_sql_vs_nosql.svg"
      }
    ]
  },
  {
    "dir": "02_Storage_Engines_Internals",
    "number": "02",
    "title": "Storage Engines & Internals",
    "shortName": "Storage Engines",
    "description": "B-Tree page structures vs LSM-Trees (MemTable, WAL, SSTables, Compaction).",
    "icon": "HardDrive",
    "category": "Storage Internals",
    "flowCount": 2,
    "flows": [
      {
        "id": "databases_02_db_btree_structure",
        "categoryKey": "databases",
        "stageNumber": "02",
        "stageTitle": "Storage Engines & Internals",
        "fileName": "db_btree_structure.svg",
        "title": "DB B-Tree Structure",
        "svgUrl": "/flows/databases/02_Storage_Engines_Internals/db_btree_structure.svg"
      },
      {
        "id": "databases_02_db_lsm_tree_write_path",
        "categoryKey": "databases",
        "stageNumber": "02",
        "stageTitle": "Storage Engines & Internals",
        "fileName": "db_lsm_tree_write_path.svg",
        "title": "DB LSM-Tree Tree Write Path",
        "svgUrl": "/flows/databases/02_Storage_Engines_Internals/db_lsm_tree_write_path.svg"
      }
    ]
  },
  {
    "dir": "03_Database_Replication",
    "number": "03",
    "title": "Database Replication & High Availability",
    "shortName": "Replication",
    "description": "Single-leader, multi-leader, sync vs async, failover, and replication lag.",
    "icon": "Copy",
    "category": "High Availability",
    "flowCount": 5,
    "flows": [
      {
        "id": "databases_03_replication_failover",
        "categoryKey": "databases",
        "stageNumber": "03",
        "stageTitle": "Database Replication & High Availability",
        "fileName": "replication_failover.svg",
        "title": "Replication Failover",
        "svgUrl": "/flows/databases/03_Database_Replication/replication_failover.svg"
      },
      {
        "id": "databases_03_replication_lag_problem",
        "categoryKey": "databases",
        "stageNumber": "03",
        "stageTitle": "Database Replication & High Availability",
        "fileName": "replication_lag_problem.svg",
        "title": "Replication Lag Problem",
        "svgUrl": "/flows/databases/03_Database_Replication/replication_lag_problem.svg"
      },
      {
        "id": "databases_03_replication_leader_follower",
        "categoryKey": "databases",
        "stageNumber": "03",
        "stageTitle": "Database Replication & High Availability",
        "fileName": "replication_leader_follower.svg",
        "title": "Replication Leader Follower",
        "svgUrl": "/flows/databases/03_Database_Replication/replication_leader_follower.svg"
      },
      {
        "id": "databases_03_replication_multi_leader",
        "categoryKey": "databases",
        "stageNumber": "03",
        "stageTitle": "Database Replication & High Availability",
        "fileName": "replication_multi_leader.svg",
        "title": "Replication Multi Leader",
        "svgUrl": "/flows/databases/03_Database_Replication/replication_multi_leader.svg"
      },
      {
        "id": "databases_03_replication_sync_vs_async",
        "categoryKey": "databases",
        "stageNumber": "03",
        "stageTitle": "Database Replication & High Availability",
        "fileName": "replication_sync_vs_async.svg",
        "title": "Replication Sync Vs Async",
        "svgUrl": "/flows/databases/03_Database_Replication/replication_sync_vs_async.svg"
      }
    ]
  },
  {
    "dir": "04_Database_Sharding",
    "number": "04",
    "title": "Database Sharding & Horizontal Scaling",
    "shortName": "Sharding",
    "description": "Routing keys, range/hash/geo strategies, cross-shard joins, and resharding.",
    "icon": "Grid",
    "category": "Scaling",
    "flowCount": 5,
    "flows": [
      {
        "id": "databases_04_sharding_core_concept",
        "categoryKey": "databases",
        "stageNumber": "04",
        "stageTitle": "Database Sharding & Horizontal Scaling",
        "fileName": "sharding_core_concept.svg",
        "title": "Sharding Core Concept",
        "svgUrl": "/flows/databases/04_Database_Sharding/sharding_core_concept.svg"
      },
      {
        "id": "databases_04_sharding_cross_shard_query",
        "categoryKey": "databases",
        "stageNumber": "04",
        "stageTitle": "Database Sharding & Horizontal Scaling",
        "fileName": "sharding_cross_shard_query.svg",
        "title": "Sharding Cross Shard Query",
        "svgUrl": "/flows/databases/04_Database_Sharding/sharding_cross_shard_query.svg"
      },
      {
        "id": "databases_04_sharding_resharding_problem",
        "categoryKey": "databases",
        "stageNumber": "04",
        "stageTitle": "Database Sharding & Horizontal Scaling",
        "fileName": "sharding_resharding_problem.svg",
        "title": "Sharding Resharding Problem",
        "svgUrl": "/flows/databases/04_Database_Sharding/sharding_resharding_problem.svg"
      },
      {
        "id": "databases_04_sharding_routing",
        "categoryKey": "databases",
        "stageNumber": "04",
        "stageTitle": "Database Sharding & Horizontal Scaling",
        "fileName": "sharding_routing.svg",
        "title": "Sharding Routing",
        "svgUrl": "/flows/databases/04_Database_Sharding/sharding_routing.svg"
      },
      {
        "id": "databases_04_sharding_strategies",
        "categoryKey": "databases",
        "stageNumber": "04",
        "stageTitle": "Database Sharding & Horizontal Scaling",
        "fileName": "sharding_strategies.svg",
        "title": "Sharding Strategies",
        "svgUrl": "/flows/databases/04_Database_Sharding/sharding_strategies.svg"
      }
    ]
  }
];
export const ALL_DB_FLOWS: SystemFlow[] = DB_STAGES.flatMap(s => s.flows);

export const GENAI_STAGES: FlowStage[] = [
  {
    "dir": "01_GenAI_And_GraphRAG_Architecture",
    "number": "01",
    "title": "GraphRAG & Agentic Architectures",
    "shortName": "GraphRAG & Agents",
    "description": "Knowledge graphs, multi-hop reasoning, LLM gateways, and async agent queues.",
    "icon": "Brain",
    "category": "RAG & Workflows",
    "flowCount": 5,
    "flows": [
      {
        "id": "genai_01_01_production_graphrag_architecture",
        "categoryKey": "genai",
        "stageNumber": "01",
        "stageTitle": "GraphRAG & Agentic Architectures",
        "fileName": "01_production_graphrag_architecture.svg",
        "title": "Production GraphRAG Architecture",
        "svgUrl": "/flows/genai/01_GenAI_And_GraphRAG_Architecture/01_production_graphrag_architecture.svg"
      },
      {
        "id": "genai_01_02_agentic_memory_architecture_mem0",
        "categoryKey": "genai",
        "stageNumber": "01",
        "stageTitle": "GraphRAG & Agentic Architectures",
        "fileName": "02_agentic_memory_architecture_mem0.svg",
        "title": "Agentic Memory Architecture Mem0",
        "svgUrl": "/flows/genai/01_GenAI_And_GraphRAG_Architecture/02_agentic_memory_architecture_mem0.svg"
      },
      {
        "id": "genai_01_03_llm_gateway_and_guardrails",
        "categoryKey": "genai",
        "stageNumber": "01",
        "stageTitle": "GraphRAG & Agentic Architectures",
        "fileName": "03_llm_gateway_and_guardrails.svg",
        "title": "LLM Gateway And Guardrails",
        "svgUrl": "/flows/genai/01_GenAI_And_GraphRAG_Architecture/03_llm_gateway_and_guardrails.svg"
      },
      {
        "id": "genai_01_04_multihop_graph_reasoning_deepdive",
        "categoryKey": "genai",
        "stageNumber": "01",
        "stageTitle": "GraphRAG & Agentic Architectures",
        "fileName": "04_multihop_graph_reasoning_deepdive.svg",
        "title": "Multihop Graph Reasoning Deepdive",
        "svgUrl": "/flows/genai/01_GenAI_And_GraphRAG_Architecture/04_multihop_graph_reasoning_deepdive.svg"
      },
      {
        "id": "genai_01_05_async_agentic_workflow_queue",
        "categoryKey": "genai",
        "stageNumber": "01",
        "stageTitle": "GraphRAG & Agentic Architectures",
        "fileName": "05_async_agentic_workflow_queue.svg",
        "title": "Async Agentic Workflow Queue",
        "svgUrl": "/flows/genai/01_GenAI_And_GraphRAG_Architecture/05_async_agentic_workflow_queue.svg"
      }
    ]
  },
  {
    "dir": "02_LLM_Memory_Architectures",
    "number": "02",
    "title": "LLM Memory Architectures & MemGPT",
    "shortName": "LLM Memory",
    "description": "Solving the stateless problem: sliding windows, hierarchical summary, virtual memory paging.",
    "icon": "Sparkles",
    "category": "Memory Systems",
    "flowCount": 6,
    "flows": [
      {
        "id": "genai_02_01_why_llms_need_memory_stateless_problem",
        "categoryKey": "genai",
        "stageNumber": "02",
        "stageTitle": "LLM Memory Architectures & MemGPT",
        "fileName": "01_why_llms_need_memory_stateless_problem.svg",
        "title": "Why LLMs Need Memory Stateless Problem",
        "svgUrl": "/flows/genai/02_LLM_Memory_Architectures/01_why_llms_need_memory_stateless_problem.svg"
      },
      {
        "id": "genai_02_02_memory_types_sliding_window_buffer",
        "categoryKey": "genai",
        "stageNumber": "02",
        "stageTitle": "LLM Memory Architectures & MemGPT",
        "fileName": "02_memory_types_sliding_window_buffer.svg",
        "title": "Memory Types Sliding Window Buffer",
        "svgUrl": "/flows/genai/02_LLM_Memory_Architectures/02_memory_types_sliding_window_buffer.svg"
      },
      {
        "id": "genai_02_03_human_brain_vs_agent_memory_taxonomy",
        "categoryKey": "genai",
        "stageNumber": "02",
        "stageTitle": "LLM Memory Architectures & MemGPT",
        "fileName": "03_human_brain_vs_agent_memory_taxonomy.svg",
        "title": "Human Brain Vs Agent Memory Taxonomy",
        "svgUrl": "/flows/genai/02_LLM_Memory_Architectures/03_human_brain_vs_agent_memory_taxonomy.svg"
      },
      {
        "id": "genai_02_04_hierarchical_summarization_infinite_memory",
        "categoryKey": "genai",
        "stageNumber": "02",
        "stageTitle": "LLM Memory Architectures & MemGPT",
        "fileName": "04_hierarchical_summarization_infinite_memory.svg",
        "title": "Hierarchical Summarization Infinite Memory",
        "svgUrl": "/flows/genai/02_LLM_Memory_Architectures/04_hierarchical_summarization_infinite_memory.svg"
      },
      {
        "id": "genai_02_05_memgpt_os_like_virtual_memory_paging",
        "categoryKey": "genai",
        "stageNumber": "02",
        "stageTitle": "LLM Memory Architectures & MemGPT",
        "fileName": "05_memgpt_os_like_virtual_memory_paging.svg",
        "title": "MemGPT OS Like Virtual Memory Paging",
        "svgUrl": "/flows/genai/02_LLM_Memory_Architectures/05_memgpt_os_like_virtual_memory_paging.svg"
      },
      {
        "id": "genai_02_06_semantic_graph_memory_update_lifecycle",
        "categoryKey": "genai",
        "stageNumber": "02",
        "stageTitle": "LLM Memory Architectures & MemGPT",
        "fileName": "06_semantic_graph_memory_update_lifecycle.svg",
        "title": "Semantic Graph Memory Update Lifecycle",
        "svgUrl": "/flows/genai/02_LLM_Memory_Architectures/06_semantic_graph_memory_update_lifecycle.svg"
      }
    ]
  },
  {
    "dir": "03_LLM_Evaluations_And_Benchmarking",
    "number": "03",
    "title": "LLM Evaluations & Benchmarking",
    "shortName": "LLM Evals",
    "description": "Evaluation taxonomy, G-Eval, RAG Triad, LLM-as-a-Judge, CI/CD regression, synthetic datasets, and leaderboard arenas.",
    "icon": "CheckSquare",
    "category": "Evaluation & Testing",
    "flowCount": 16,
    "flows": [
      {
        "id": "genai_03_01_llm_eval_taxonomy_and_landscape",
        "categoryKey": "genai",
        "stageNumber": "03",
        "stageTitle": "LLM Evaluations & Benchmarking",
        "fileName": "01_llm_eval_taxonomy_and_landscape.svg",
        "title": "LLM Eval Taxonomy And Landscape",
        "svgUrl": "/flows/genai/03_LLM_Evaluations_And_Benchmarking/01_llm_eval_taxonomy_and_landscape.svg"
      },
      {
        "id": "genai_03_02_g_eval_framework_internals",
        "categoryKey": "genai",
        "stageNumber": "03",
        "stageTitle": "LLM Evaluations & Benchmarking",
        "fileName": "02_g_eval_framework_internals.svg",
        "title": "G-Eval Framework Internals",
        "svgUrl": "/flows/genai/03_LLM_Evaluations_And_Benchmarking/02_g_eval_framework_internals.svg"
      },
      {
        "id": "genai_03_03_rag_triad_and_ragas_metrics",
        "categoryKey": "genai",
        "stageNumber": "03",
        "stageTitle": "LLM Evaluations & Benchmarking",
        "fileName": "03_rag_triad_and_ragas_metrics.svg",
        "title": "RAG Triad And RAGas Metrics",
        "svgUrl": "/flows/genai/03_LLM_Evaluations_And_Benchmarking/03_rag_triad_and_ragas_metrics.svg"
      },
      {
        "id": "genai_03_04_llm_as_a_judge_biases_and_mitigations",
        "categoryKey": "genai",
        "stageNumber": "03",
        "stageTitle": "LLM Evaluations & Benchmarking",
        "fileName": "04_llm_as_a_judge_biases_and_mitigations.svg",
        "title": "LLM As A Judge Biases And Mitigations",
        "svgUrl": "/flows/genai/03_LLM_Evaluations_And_Benchmarking/04_llm_as_a_judge_biases_and_mitigations.svg"
      },
      {
        "id": "genai_03_05_ci_cd_regression_eval_pipeline",
        "categoryKey": "genai",
        "stageNumber": "03",
        "stageTitle": "LLM Evaluations & Benchmarking",
        "fileName": "05_ci_cd_regression_eval_pipeline.svg",
        "title": "CI/CD Regression Eval Pipeline",
        "svgUrl": "/flows/genai/03_LLM_Evaluations_And_Benchmarking/05_ci_cd_regression_eval_pipeline.svg"
      },
      {
        "id": "genai_03_06_synthetic_dataset_generation_pipeline",
        "categoryKey": "genai",
        "stageNumber": "03",
        "stageTitle": "LLM Evaluations & Benchmarking",
        "fileName": "06_synthetic_dataset_generation_pipeline.svg",
        "title": "Synthetic Dataset Generation Pipeline",
        "svgUrl": "/flows/genai/03_LLM_Evaluations_And_Benchmarking/06_synthetic_dataset_generation_pipeline.svg"
      },
      {
        "id": "genai_03_07_online_production_eval_and_guardrails",
        "categoryKey": "genai",
        "stageNumber": "03",
        "stageTitle": "LLM Evaluations & Benchmarking",
        "fileName": "07_online_production_eval_and_guardrails.svg",
        "title": "Online Production Eval And Guardrails",
        "svgUrl": "/flows/genai/03_LLM_Evaluations_And_Benchmarking/07_online_production_eval_and_guardrails.svg"
      },
      {
        "id": "genai_03_08_agentic_eval_trajectory_and_tool_call_metrics",
        "categoryKey": "genai",
        "stageNumber": "03",
        "stageTitle": "LLM Evaluations & Benchmarking",
        "fileName": "08_agentic_eval_trajectory_and_tool_call_metrics.svg",
        "title": "Agentic Eval Trajectory And Tool Call Metrics",
        "svgUrl": "/flows/genai/03_LLM_Evaluations_And_Benchmarking/08_agentic_eval_trajectory_and_tool_call_metrics.svg"
      },
      {
        "id": "genai_03_09_pairwise_arena_elo_scoring_flow",
        "categoryKey": "genai",
        "stageNumber": "03",
        "stageTitle": "LLM Evaluations & Benchmarking",
        "fileName": "09_pairwise_arena_elo_scoring_flow.svg",
        "title": "Pairwise Arena Elo Scoring Flow",
        "svgUrl": "/flows/genai/03_LLM_Evaluations_And_Benchmarking/09_pairwise_arena_elo_scoring_flow.svg"
      },
      {
        "id": "genai_03_10_few_shot_calibration_and_alignment_loop",
        "categoryKey": "genai",
        "stageNumber": "03",
        "stageTitle": "LLM Evaluations & Benchmarking",
        "fileName": "10_few_shot_calibration_and_alignment_loop.svg",
        "title": "Few Shot Calibration And Alignment Loop",
        "svgUrl": "/flows/genai/03_LLM_Evaluations_And_Benchmarking/10_few_shot_calibration_and_alignment_loop.svg"
      },
      {
        "id": "genai_03_11_red_teaming_and_adversarial_jailbreak_flow",
        "categoryKey": "genai",
        "stageNumber": "03",
        "stageTitle": "LLM Evaluations & Benchmarking",
        "fileName": "11_red_teaming_and_adversarial_jailbreak_flow.svg",
        "title": "Red Teaming And Adversarial Jailbreak Flow",
        "svgUrl": "/flows/genai/03_LLM_Evaluations_And_Benchmarking/11_red_teaming_and_adversarial_jailbreak_flow.svg"
      },
      {
        "id": "genai_03_12_multimodal_vision_eval_flow",
        "categoryKey": "genai",
        "stageNumber": "03",
        "stageTitle": "LLM Evaluations & Benchmarking",
        "fileName": "12_multimodal_vision_eval_flow.svg",
        "title": "Multimodal Vision Eval Flow",
        "svgUrl": "/flows/genai/03_LLM_Evaluations_And_Benchmarking/12_multimodal_vision_eval_flow.svg"
      },
      {
        "id": "genai_03_13_long_context_needle_in_a_haystack_eval",
        "categoryKey": "genai",
        "stageNumber": "03",
        "stageTitle": "LLM Evaluations & Benchmarking",
        "fileName": "13_long_context_needle_in_a_haystack_eval.svg",
        "title": "Long Context Needle in a Haystack Eval",
        "svgUrl": "/flows/genai/03_LLM_Evaluations_And_Benchmarking/13_long_context_needle_in_a_haystack_eval.svg"
      },
      {
        "id": "genai_03_14_llm_benchmarks_radar_and_leaderboard_flow",
        "categoryKey": "genai",
        "stageNumber": "03",
        "stageTitle": "LLM Evaluations & Benchmarking",
        "fileName": "14_llm_benchmarks_radar_and_leaderboard_flow.svg",
        "title": "LLM Benchmarks Radar And Leaderboard Flow",
        "svgUrl": "/flows/genai/03_LLM_Evaluations_And_Benchmarking/14_llm_benchmarks_radar_and_leaderboard_flow.svg"
      },
      {
        "id": "genai_03_15_human_in_the_loop_active_audit_cycle",
        "categoryKey": "genai",
        "stageNumber": "03",
        "stageTitle": "LLM Evaluations & Benchmarking",
        "fileName": "15_human_in_the_loop_active_audit_cycle.svg",
        "title": "Human-in-the-Loop Active Audit Cycle",
        "svgUrl": "/flows/genai/03_LLM_Evaluations_And_Benchmarking/15_human_in_the_loop_active_audit_cycle.svg"
      },
      {
        "id": "genai_03_16_cost_latency_pareto_frontier_eval",
        "categoryKey": "genai",
        "stageNumber": "03",
        "stageTitle": "LLM Evaluations & Benchmarking",
        "fileName": "16_cost_latency_pareto_frontier_eval.svg",
        "title": "Cost Latency Pareto Frontier Eval",
        "svgUrl": "/flows/genai/03_LLM_Evaluations_And_Benchmarking/16_cost_latency_pareto_frontier_eval.svg"
      }
    ]
  }
];
export const ALL_GENAI_FLOWS: SystemFlow[] = GENAI_STAGES.flatMap(s => s.flows);

export const CATEGORIES_DATA: Record<FlowCategory, CategoryMeta> = {
  hld: {
    key: 'hld',
    title: 'High Level System Design',
    shortTitle: 'HLD',
    description: 'Master large-scale distributed systems: load balancers, rate limiters, message queues, and end-to-end architectures.',
    stageCount: 12,
    flowCount: 63,
    stages: HLD_STAGES,
    flows: ALL_HLD_FLOWS
  },
  databases: {
    key: 'databases',
    title: 'Database & Storage Systems',
    shortTitle: 'Databases',
    description: 'Deep dive into storage engines: B-Trees, LSM-Trees, replication topologies, and horizontal sharding strategies.',
    stageCount: 4,
    flowCount: 13,
    stages: DB_STAGES,
    flows: ALL_DB_FLOWS
  },
  genai: {
    key: 'genai',
    title: 'GenAI & AI Systems',
    shortTitle: 'GenAI & AI',
    description: 'Production GraphRAG, multi-hop reasoning, agent memory paging (MemGPT, Mem0), and async workflow loops.',
    stageCount: 3,
    flowCount: 27,
    stages: GENAI_STAGES,
    flows: ALL_GENAI_FLOWS
  }
};
