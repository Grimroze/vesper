// Auto-generated High Level System Design Flows Dataset
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

export const HLD_STAGES: HLDStage[] = [
  {
    "dir": "01_UML_Activity_Diagrams",
    "number": "01",
    "title": "UML & Activity Fundamentals",
    "shortName": "UML Basics",
    "description": "Learn how to read and draw system flows, decision points, concurrent forks, and swimlanes.",
    "icon": "GitFork",
    "category": "Foundations",
    "flowCount": 5,
    "flows": [
      {
        "id": "01_uml_activity_basic_notation",
        "stageNumber": "01",
        "stageTitle": "UML & Activity Fundamentals",
        "fileName": "uml_activity_basic_notation.svg",
        "title": "UML Activity Basic Notation",
        "svgUrl": "/flows/hld/01_UML_Activity_Diagrams/uml_activity_basic_notation.svg"
      },
      {
        "id": "01_uml_activity_decision_merge",
        "stageNumber": "01",
        "stageTitle": "UML & Activity Fundamentals",
        "fileName": "uml_activity_decision_merge.svg",
        "title": "UML Activity Decision Merge",
        "svgUrl": "/flows/hld/01_UML_Activity_Diagrams/uml_activity_decision_merge.svg"
      },
      {
        "id": "01_uml_activity_decision_merge_v2",
        "stageNumber": "01",
        "stageTitle": "UML & Activity Fundamentals",
        "fileName": "uml_activity_decision_merge_v2.svg",
        "title": "UML Activity Decision Merge (Enhanced v2)",
        "svgUrl": "/flows/hld/01_UML_Activity_Diagrams/uml_activity_decision_merge_v2.svg"
      },
      {
        "id": "01_uml_activity_fork_join",
        "stageNumber": "01",
        "stageTitle": "UML & Activity Fundamentals",
        "fileName": "uml_activity_fork_join.svg",
        "title": "UML Activity Fork Join",
        "svgUrl": "/flows/hld/01_UML_Activity_Diagrams/uml_activity_fork_join.svg"
      },
      {
        "id": "01_uml_activity_swimlane_example",
        "stageNumber": "01",
        "stageTitle": "UML & Activity Fundamentals",
        "fileName": "uml_activity_swimlane_example.svg",
        "title": "UML Activity Swimlane Example",
        "svgUrl": "/flows/hld/01_UML_Activity_Diagrams/uml_activity_swimlane_example.svg"
      }
    ]
  },
  {
    "dir": "02_Communication_Protocols",
    "number": "02",
    "title": "Communication Protocols & IPC",
    "shortName": "Protocols",
    "description": "HTTP, WebSockets, gRPC, and Realtime Push techniques for client-server and service-to-service links.",
    "icon": "Radio",
    "category": "Networking",
    "flowCount": 5,
    "flows": [
      {
        "id": "02_comm_protocol_comparison",
        "stageNumber": "02",
        "stageTitle": "Communication Protocols & IPC",
        "fileName": "comm_protocol_comparison.svg",
        "title": "Comm Protocol Comparison",
        "svgUrl": "/flows/hld/02_Communication_Protocols/comm_protocol_comparison.svg"
      },
      {
        "id": "02_comm_pub_sub",
        "stageNumber": "02",
        "stageTitle": "Communication Protocols & IPC",
        "fileName": "comm_pub_sub.svg",
        "title": "Comm Pub Sub",
        "svgUrl": "/flows/hld/02_Communication_Protocols/comm_pub_sub.svg"
      },
      {
        "id": "02_comm_realtime_push_techniques",
        "stageNumber": "02",
        "stageTitle": "Communication Protocols & IPC",
        "fileName": "comm_realtime_push_techniques.svg",
        "title": "Comm Realtime Push Techniques",
        "svgUrl": "/flows/hld/02_Communication_Protocols/comm_realtime_push_techniques.svg"
      },
      {
        "id": "02_comm_realtime_push_techniques_v2",
        "stageNumber": "02",
        "stageTitle": "Communication Protocols & IPC",
        "fileName": "comm_realtime_push_techniques_v2.svg",
        "title": "Comm Realtime Push Techniques (Enhanced v2)",
        "svgUrl": "/flows/hld/02_Communication_Protocols/comm_realtime_push_techniques_v2.svg"
      },
      {
        "id": "02_comm_sync_vs_async",
        "stageNumber": "02",
        "stageTitle": "Communication Protocols & IPC",
        "fileName": "comm_sync_vs_async.svg",
        "title": "Comm Sync Vs Async",
        "svgUrl": "/flows/hld/02_Communication_Protocols/comm_sync_vs_async.svg"
      }
    ]
  },
  {
    "dir": "03_CDN",
    "number": "03",
    "title": "CDN (Content Delivery Network)",
    "shortName": "CDN & Edge",
    "description": "Edge caching, PoP routing, and reducing round-trip latency for static and dynamic assets.",
    "icon": "Globe",
    "category": "Edge Layer",
    "flowCount": 3,
    "flows": [
      {
        "id": "03_cdn_architecture",
        "stageNumber": "03",
        "stageTitle": "CDN (Content Delivery Network)",
        "fileName": "cdn_architecture.svg",
        "title": "CDN Architecture",
        "svgUrl": "/flows/hld/03_CDN/cdn_architecture.svg"
      },
      {
        "id": "03_cdn_cache_hit_miss",
        "stageNumber": "03",
        "stageTitle": "CDN (Content Delivery Network)",
        "fileName": "cdn_cache_hit_miss.svg",
        "title": "CDN Cache Hit Miss",
        "svgUrl": "/flows/hld/03_CDN/cdn_cache_hit_miss.svg"
      },
      {
        "id": "03_cdn_step_by_step_flow",
        "stageNumber": "03",
        "stageTitle": "CDN (Content Delivery Network)",
        "fileName": "cdn_step_by_step_flow.svg",
        "title": "CDN Step By Step Flow",
        "svgUrl": "/flows/hld/03_CDN/cdn_step_by_step_flow.svg"
      }
    ]
  },
  {
    "dir": "04_Load_Balancer",
    "number": "04",
    "title": "Load Balancing (L4 vs L7)",
    "shortName": "Load Balancer",
    "description": "Distribute traffic across server pools, health checks, automatic failover, and routing algorithms.",
    "icon": "Scale",
    "category": "Infrastructure",
    "flowCount": 4,
    "flows": [
      {
        "id": "04_load_balancer_algorithms",
        "stageNumber": "04",
        "stageTitle": "Load Balancing (L4 vs L7)",
        "fileName": "load_balancer_algorithms.svg",
        "title": "Load Balancer Algorithms",
        "svgUrl": "/flows/hld/04_Load_Balancer/load_balancer_algorithms.svg"
      },
      {
        "id": "04_load_balancer_architecture",
        "stageNumber": "04",
        "stageTitle": "Load Balancing (L4 vs L7)",
        "fileName": "load_balancer_architecture.svg",
        "title": "Load Balancer Architecture",
        "svgUrl": "/flows/hld/04_Load_Balancer/load_balancer_architecture.svg"
      },
      {
        "id": "04_load_balancer_health_check_failover",
        "stageNumber": "04",
        "stageTitle": "Load Balancing (L4 vs L7)",
        "fileName": "load_balancer_health_check_failover.svg",
        "title": "Load Balancer Health Check Failover",
        "svgUrl": "/flows/hld/04_Load_Balancer/load_balancer_health_check_failover.svg"
      },
      {
        "id": "04_load_balancer_l4_vs_l7",
        "stageNumber": "04",
        "stageTitle": "Load Balancing (L4 vs L7)",
        "fileName": "load_balancer_l4_vs_l7.svg",
        "title": "Load Balancer L4 vs L7",
        "svgUrl": "/flows/hld/04_Load_Balancer/load_balancer_l4_vs_l7.svg"
      }
    ]
  },
  {
    "dir": "05_API_Gateway",
    "number": "05",
    "title": "API Gateway & Perimeter",
    "shortName": "API Gateway",
    "description": "Centralized entry point: auth verification, rate limiting, SSL termination, and protocol translation.",
    "icon": "ShieldCheck",
    "category": "Infrastructure",
    "flowCount": 10,
    "flows": [
      {
        "id": "05_api_gateway_architecture",
        "stageNumber": "05",
        "stageTitle": "API Gateway & Perimeter",
        "fileName": "api_gateway_architecture.svg",
        "title": "API Gateway Architecture",
        "svgUrl": "/flows/hld/05_API_Gateway/api_gateway_architecture.svg"
      },
      {
        "id": "05_api_gateway_request_lifecycle",
        "stageNumber": "05",
        "stageTitle": "API Gateway & Perimeter",
        "fileName": "api_gateway_request_lifecycle.svg",
        "title": "API Gateway Request Lifecycle",
        "svgUrl": "/flows/hld/05_API_Gateway/api_gateway_request_lifecycle.svg"
      },
      {
        "id": "05_gateway_auth",
        "stageNumber": "05",
        "stageTitle": "API Gateway & Perimeter",
        "fileName": "gateway_auth.svg",
        "title": "Gateway Auth",
        "svgUrl": "/flows/hld/05_API_Gateway/gateway_auth.svg"
      },
      {
        "id": "05_gateway_caching",
        "stageNumber": "05",
        "stageTitle": "API Gateway & Perimeter",
        "fileName": "gateway_caching.svg",
        "title": "Gateway Caching",
        "svgUrl": "/flows/hld/05_API_Gateway/gateway_caching.svg"
      },
      {
        "id": "05_gateway_load_balancing",
        "stageNumber": "05",
        "stageTitle": "API Gateway & Perimeter",
        "fileName": "gateway_load_balancing.svg",
        "title": "Gateway Load Balancing",
        "svgUrl": "/flows/hld/05_API_Gateway/gateway_load_balancing.svg"
      },
      {
        "id": "05_gateway_monitoring_logging",
        "stageNumber": "05",
        "stageTitle": "API Gateway & Perimeter",
        "fileName": "gateway_monitoring_logging.svg",
        "title": "Gateway Monitoring Logging",
        "svgUrl": "/flows/hld/05_API_Gateway/gateway_monitoring_logging.svg"
      },
      {
        "id": "05_gateway_protocol_translation",
        "stageNumber": "05",
        "stageTitle": "API Gateway & Perimeter",
        "fileName": "gateway_protocol_translation.svg",
        "title": "Gateway Protocol Translation",
        "svgUrl": "/flows/hld/05_API_Gateway/gateway_protocol_translation.svg"
      },
      {
        "id": "05_gateway_rate_limiting",
        "stageNumber": "05",
        "stageTitle": "API Gateway & Perimeter",
        "fileName": "gateway_rate_limiting.svg",
        "title": "Gateway Rate Limiting",
        "svgUrl": "/flows/hld/05_API_Gateway/gateway_rate_limiting.svg"
      },
      {
        "id": "05_gateway_request_aggregation",
        "stageNumber": "05",
        "stageTitle": "API Gateway & Perimeter",
        "fileName": "gateway_request_aggregation.svg",
        "title": "Gateway Request Aggregation",
        "svgUrl": "/flows/hld/05_API_Gateway/gateway_request_aggregation.svg"
      },
      {
        "id": "05_gateway_routing",
        "stageNumber": "05",
        "stageTitle": "API Gateway & Perimeter",
        "fileName": "gateway_routing.svg",
        "title": "Gateway Routing",
        "svgUrl": "/flows/hld/05_API_Gateway/gateway_routing.svg"
      }
    ]
  },
  {
    "dir": "06_Rate_Limiting_Algorithms",
    "number": "06",
    "title": "Rate Limiting Algorithms",
    "shortName": "Rate Limiting",
    "description": "Protect services against DDoS and abuse using Token Bucket, Leaky Bucket, and Sliding Windows.",
    "icon": "Gauge",
    "category": "Security & Traffic",
    "flowCount": 4,
    "flows": [
      {
        "id": "06_rate_limit_fixed_window",
        "stageNumber": "06",
        "stageTitle": "Rate Limiting Algorithms",
        "fileName": "rate_limit_fixed_window.svg",
        "title": "Rate Limit Fixed Window",
        "svgUrl": "/flows/hld/06_Rate_Limiting_Algorithms/rate_limit_fixed_window.svg"
      },
      {
        "id": "06_rate_limit_leaky_bucket",
        "stageNumber": "06",
        "stageTitle": "Rate Limiting Algorithms",
        "fileName": "rate_limit_leaky_bucket.svg",
        "title": "Rate Limit Leaky Bucket",
        "svgUrl": "/flows/hld/06_Rate_Limiting_Algorithms/rate_limit_leaky_bucket.svg"
      },
      {
        "id": "06_rate_limit_sliding_window",
        "stageNumber": "06",
        "stageTitle": "Rate Limiting Algorithms",
        "fileName": "rate_limit_sliding_window.svg",
        "title": "Rate Limit Sliding Window",
        "svgUrl": "/flows/hld/06_Rate_Limiting_Algorithms/rate_limit_sliding_window.svg"
      },
      {
        "id": "06_rate_limit_token_bucket",
        "stageNumber": "06",
        "stageTitle": "Rate Limiting Algorithms",
        "fileName": "rate_limit_token_bucket.svg",
        "title": "Rate Limit Token Bucket",
        "svgUrl": "/flows/hld/06_Rate_Limiting_Algorithms/rate_limit_token_bucket.svg"
      }
    ]
  },
  {
    "dir": "07_Caching",
    "number": "07",
    "title": "Distributed Caching Strategies",
    "shortName": "Caching",
    "description": "Cache layers, Read-Through/Cache-Aside, Write-Back/Through, eviction policies, and cache invalidation.",
    "icon": "Zap",
    "category": "Data & Performance",
    "flowCount": 5,
    "flows": [
      {
        "id": "07_caching_common_problems",
        "stageNumber": "07",
        "stageTitle": "Distributed Caching Strategies",
        "fileName": "caching_common_problems.svg",
        "title": "Caching Common Problems",
        "svgUrl": "/flows/hld/07_Caching/caching_common_problems.svg"
      },
      {
        "id": "07_caching_eviction_policies",
        "stageNumber": "07",
        "stageTitle": "Distributed Caching Strategies",
        "fileName": "caching_eviction_policies.svg",
        "title": "Caching Eviction Policies",
        "svgUrl": "/flows/hld/07_Caching/caching_eviction_policies.svg"
      },
      {
        "id": "07_caching_layers",
        "stageNumber": "07",
        "stageTitle": "Distributed Caching Strategies",
        "fileName": "caching_layers.svg",
        "title": "Caching Layers",
        "svgUrl": "/flows/hld/07_Caching/caching_layers.svg"
      },
      {
        "id": "07_caching_read_strategies",
        "stageNumber": "07",
        "stageTitle": "Distributed Caching Strategies",
        "fileName": "caching_read_strategies.svg",
        "title": "Caching Read Strategies",
        "svgUrl": "/flows/hld/07_Caching/caching_read_strategies.svg"
      },
      {
        "id": "07_caching_write_strategies",
        "stageNumber": "07",
        "stageTitle": "Distributed Caching Strategies",
        "fileName": "caching_write_strategies.svg",
        "title": "Caching Write Strategies",
        "svgUrl": "/flows/hld/07_Caching/caching_write_strategies.svg"
      }
    ]
  },
  {
    "dir": "08_Consistent_Hashing",
    "number": "08",
    "title": "Consistent Hashing & Partitioning",
    "shortName": "Consistent Hashing",
    "description": "Horizontal data distribution, minimal key remapping during server scale up/down, and virtual nodes.",
    "icon": "Disc",
    "category": "Data & Performance",
    "flowCount": 4,
    "flows": [
      {
        "id": "08_consistent_hashing_add_node",
        "stageNumber": "08",
        "stageTitle": "Consistent Hashing & Partitioning",
        "fileName": "consistent_hashing_add_node.svg",
        "title": "Consistent Hashing Add Node",
        "svgUrl": "/flows/hld/08_Consistent_Hashing/consistent_hashing_add_node.svg"
      },
      {
        "id": "08_consistent_hashing_basic_ring",
        "stageNumber": "08",
        "stageTitle": "Consistent Hashing & Partitioning",
        "fileName": "consistent_hashing_basic_ring.svg",
        "title": "Consistent Hashing Basic Ring",
        "svgUrl": "/flows/hld/08_Consistent_Hashing/consistent_hashing_basic_ring.svg"
      },
      {
        "id": "08_consistent_hashing_uneven_problem",
        "stageNumber": "08",
        "stageTitle": "Consistent Hashing & Partitioning",
        "fileName": "consistent_hashing_uneven_problem.svg",
        "title": "Consistent Hashing Uneven Problem",
        "svgUrl": "/flows/hld/08_Consistent_Hashing/consistent_hashing_uneven_problem.svg"
      },
      {
        "id": "08_consistent_hashing_virtual_nodes",
        "stageNumber": "08",
        "stageTitle": "Consistent Hashing & Partitioning",
        "fileName": "consistent_hashing_virtual_nodes.svg",
        "title": "Consistent Hashing Virtual Nodes",
        "svgUrl": "/flows/hld/08_Consistent_Hashing/consistent_hashing_virtual_nodes.svg"
      }
    ]
  },
  {
    "dir": "09_Message_Queues",
    "number": "09",
    "title": "Asynchronous Message Queues",
    "shortName": "Message Queues",
    "description": "Decoupling services, traffic spike buffering, pub/sub, point-to-point, and delivery guarantees.",
    "icon": "Layers",
    "category": "Async Processing",
    "flowCount": 4,
    "flows": [
      {
        "id": "09_mq_basic_architecture",
        "stageNumber": "09",
        "stageTitle": "Asynchronous Message Queues",
        "fileName": "mq_basic_architecture.svg",
        "title": "Message Queue Basic Architecture",
        "svgUrl": "/flows/hld/09_Message_Queues/mq_basic_architecture.svg"
      },
      {
        "id": "09_mq_delivery_guarantees",
        "stageNumber": "09",
        "stageTitle": "Asynchronous Message Queues",
        "fileName": "mq_delivery_guarantees.svg",
        "title": "Message Queue Delivery Guarantees",
        "svgUrl": "/flows/hld/09_Message_Queues/mq_delivery_guarantees.svg"
      },
      {
        "id": "09_mq_point_to_point_vs_pubsub",
        "stageNumber": "09",
        "stageTitle": "Asynchronous Message Queues",
        "fileName": "mq_point_to_point_vs_pubsub.svg",
        "title": "Message Queue Point To Point Vs Pubsub",
        "svgUrl": "/flows/hld/09_Message_Queues/mq_point_to_point_vs_pubsub.svg"
      },
      {
        "id": "09_mq_why_needed",
        "stageNumber": "09",
        "stageTitle": "Asynchronous Message Queues",
        "fileName": "mq_why_needed.svg",
        "title": "Message Queue Why Needed",
        "svgUrl": "/flows/hld/09_Message_Queues/mq_why_needed.svg"
      }
    ]
  },
  {
    "dir": "10_Distributed_Transactions",
    "number": "10",
    "title": "Distributed Transactions & Sagas",
    "shortName": "Transactions",
    "description": "Maintain data consistency across microservices via 2PC, Saga Choreography/Orchestration, and Outbox Pattern.",
    "icon": "RefreshCw",
    "category": "Distributed Systems",
    "flowCount": 5,
    "flows": [
      {
        "id": "10_01_two_phase_commit_2pc",
        "stageNumber": "10",
        "stageTitle": "Distributed Transactions & Sagas",
        "fileName": "01_two_phase_commit_2pc.svg",
        "title": "Two Phase Commit 2PC",
        "svgUrl": "/flows/hld/10_Distributed_Transactions/01_two_phase_commit_2pc.svg"
      },
      {
        "id": "10_02_saga_choreography_vs_orchestration",
        "stageNumber": "10",
        "stageTitle": "Distributed Transactions & Sagas",
        "fileName": "02_saga_choreography_vs_orchestration.svg",
        "title": "Saga Choreography Vs Orchestration",
        "svgUrl": "/flows/hld/10_Distributed_Transactions/02_saga_choreography_vs_orchestration.svg"
      },
      {
        "id": "10_03_saga_compensating_transactions_rollback",
        "stageNumber": "10",
        "stageTitle": "Distributed Transactions & Sagas",
        "fileName": "03_saga_compensating_transactions_rollback.svg",
        "title": "Saga Compensating Transactions Rollback",
        "svgUrl": "/flows/hld/10_Distributed_Transactions/03_saga_compensating_transactions_rollback.svg"
      },
      {
        "id": "10_04_transactional_outbox_pattern",
        "stageNumber": "10",
        "stageTitle": "Distributed Transactions & Sagas",
        "fileName": "04_transactional_outbox_pattern.svg",
        "title": "Transactional Outbox Pattern",
        "svgUrl": "/flows/hld/10_Distributed_Transactions/04_transactional_outbox_pattern.svg"
      },
      {
        "id": "10_05_idempotency_key_payment_flow",
        "stageNumber": "10",
        "stageTitle": "Distributed Transactions & Sagas",
        "fileName": "05_idempotency_key_payment_flow.svg",
        "title": "Idempotency Key Payment Flow",
        "svgUrl": "/flows/hld/10_Distributed_Transactions/05_idempotency_key_payment_flow.svg"
      }
    ]
  },
  {
    "dir": "11_CAP_Theorem",
    "number": "11",
    "title": "CAP Theorem & Tradeoffs",
    "shortName": "CAP Theorem",
    "description": "The fundamental trade-off: Consistency vs Availability under network partitions in real-world databases.",
    "icon": "Triangle",
    "category": "Distributed Systems",
    "flowCount": 4,
    "flows": [
      {
        "id": "11_cap_cp_vs_ap_examples",
        "stageNumber": "11",
        "stageTitle": "CAP Theorem & Tradeoffs",
        "fileName": "cap_cp_vs_ap_examples.svg",
        "title": "CAP CP vs AP Examples",
        "svgUrl": "/flows/hld/11_CAP_Theorem/cap_cp_vs_ap_examples.svg"
      },
      {
        "id": "11_cap_partition_scenario",
        "stageNumber": "11",
        "stageTitle": "CAP Theorem & Tradeoffs",
        "fileName": "cap_partition_scenario.svg",
        "title": "CAP Partition Scenario",
        "svgUrl": "/flows/hld/11_CAP_Theorem/cap_partition_scenario.svg"
      },
      {
        "id": "11_cap_theorem_triangle",
        "stageNumber": "11",
        "stageTitle": "CAP Theorem & Tradeoffs",
        "fileName": "cap_theorem_triangle.svg",
        "title": "CAP Theorem Triangle",
        "svgUrl": "/flows/hld/11_CAP_Theorem/cap_theorem_triangle.svg"
      },
      {
        "id": "11_detailed_cap_tradeoffs_in_system",
        "stageNumber": "11",
        "stageTitle": "CAP Theorem & Tradeoffs",
        "fileName": "detailed_cap_tradeoffs_in_system.svg",
        "title": "Detailed CAP Tradeoffs In System",
        "svgUrl": "/flows/hld/11_CAP_Theorem/detailed_cap_tradeoffs_in_system.svg"
      }
    ]
  },
  {
    "dir": "12_Full_HLD_Architectures",
    "number": "12",
    "title": "End-to-End Master HLD Architectures",
    "shortName": "Master HLD",
    "description": "Complete production architectures putting all 11 building blocks together from browser to database and events.",
    "icon": "LayoutGrid",
    "category": "Master Architectures",
    "flowCount": 10,
    "flows": [
      {
        "id": "12_01_master_hld_and_numbered_sequence_full_hld_numbered_sequence",
        "stageNumber": "12",
        "stageTitle": "End-to-End Master HLD Architectures",
        "subCategory": "Master HLD And Numbered Sequence",
        "fileName": "full_hld_numbered_sequence.svg",
        "title": "Full HLD Numbered Sequence",
        "svgUrl": "/flows/hld/12_Full_HLD_Architectures/01_Master_HLD_And_Numbered_Sequence/full_hld_numbered_sequence.svg"
      },
      {
        "id": "12_01_master_hld_and_numbered_sequence_full_hld_system_architecture",
        "stageNumber": "12",
        "stageTitle": "End-to-End Master HLD Architectures",
        "subCategory": "Master HLD And Numbered Sequence",
        "fileName": "full_hld_system_architecture.svg",
        "title": "Full HLD System Architecture",
        "svgUrl": "/flows/hld/12_Full_HLD_Architectures/01_Master_HLD_And_Numbered_Sequence/full_hld_system_architecture.svg"
      },
      {
        "id": "12_02_browser_to_response_round_trip_full_round_trip_browser_to_response",
        "stageNumber": "12",
        "stageTitle": "End-to-End Master HLD Architectures",
        "subCategory": "Browser To Response Round Trip",
        "fileName": "full_round_trip_browser_to_response.svg",
        "title": "Full Round Trip Browser To Response",
        "svgUrl": "/flows/hld/12_Full_HLD_Architectures/02_Browser_To_Response_Round_Trip/full_round_trip_browser_to_response.svg"
      },
      {
        "id": "12_02_browser_to_response_round_trip_full_round_trip_v2",
        "stageNumber": "12",
        "stageTitle": "End-to-End Master HLD Architectures",
        "subCategory": "Browser To Response Round Trip",
        "fileName": "full_round_trip_v2.svg",
        "title": "Full Round Trip (Enhanced v2)",
        "svgUrl": "/flows/hld/12_Full_HLD_Architectures/02_Browser_To_Response_Round_Trip/full_round_trip_v2.svg"
      },
      {
        "id": "12_03_detailed_3_part_system_breakdown_01_detailed_entry_path_part_1",
        "stageNumber": "12",
        "stageTitle": "End-to-End Master HLD Architectures",
        "subCategory": "Detailed 3 Part System Breakdown",
        "fileName": "01_detailed_entry_path_part_1.svg",
        "title": "Detailed Entry Path Part 1",
        "svgUrl": "/flows/hld/12_Full_HLD_Architectures/03_Detailed_3_Part_System_Breakdown/01_detailed_entry_path_part_1.svg"
      },
      {
        "id": "12_03_detailed_3_part_system_breakdown_02_detailed_service_and_data_layer_part_2",
        "stageNumber": "12",
        "stageTitle": "End-to-End Master HLD Architectures",
        "subCategory": "Detailed 3 Part System Breakdown",
        "fileName": "02_detailed_service_and_data_layer_part_2.svg",
        "title": "Detailed Service And Data Layer Part 2",
        "svgUrl": "/flows/hld/12_Full_HLD_Architectures/03_Detailed_3_Part_System_Breakdown/02_detailed_service_and_data_layer_part_2.svg"
      },
      {
        "id": "12_03_detailed_3_part_system_breakdown_03_detailed_event_system_part_3",
        "stageNumber": "12",
        "stageTitle": "End-to-End Master HLD Architectures",
        "subCategory": "Detailed 3 Part System Breakdown",
        "fileName": "03_detailed_event_system_part_3.svg",
        "title": "Detailed Event System Part 3",
        "svgUrl": "/flows/hld/12_Full_HLD_Architectures/03_Detailed_3_Part_System_Breakdown/03_detailed_event_system_part_3.svg"
      },
      {
        "id": "12_04_resilience_observability_and_tradeoffs_detailed_cap_tradeoffs_in_system",
        "stageNumber": "12",
        "stageTitle": "End-to-End Master HLD Architectures",
        "subCategory": "Resilience Observability And Tradeoffs",
        "fileName": "detailed_cap_tradeoffs_in_system.svg",
        "title": "Detailed CAP Tradeoffs In System",
        "svgUrl": "/flows/hld/12_Full_HLD_Architectures/04_Resilience_Observability_And_Tradeoffs/detailed_cap_tradeoffs_in_system.svg"
      },
      {
        "id": "12_04_resilience_observability_and_tradeoffs_detailed_circuit_breaker",
        "stageNumber": "12",
        "stageTitle": "End-to-End Master HLD Architectures",
        "subCategory": "Resilience Observability And Tradeoffs",
        "fileName": "detailed_circuit_breaker.svg",
        "title": "Detailed Circuit Breaker",
        "svgUrl": "/flows/hld/12_Full_HLD_Architectures/04_Resilience_Observability_And_Tradeoffs/detailed_circuit_breaker.svg"
      },
      {
        "id": "12_04_resilience_observability_and_tradeoffs_detailed_observability_layer",
        "stageNumber": "12",
        "stageTitle": "End-to-End Master HLD Architectures",
        "subCategory": "Resilience Observability And Tradeoffs",
        "fileName": "detailed_observability_layer.svg",
        "title": "Detailed Observability Layer",
        "svgUrl": "/flows/hld/12_Full_HLD_Architectures/04_Resilience_Observability_And_Tradeoffs/detailed_observability_layer.svg"
      }
    ]
  }
];

export const ALL_HLD_FLOWS: HLDFlow[] = HLD_STAGES.flatMap(s => s.flows);
