export interface Repository {
  name: string;
  owner: string;
  url: string;
  branch?: string;
  language?: string;
  framework?: string;
}

export interface Finding {
  id: string | number;
  title: string;
  description: string;
  severity: "critical" | "high" | "medium" | "low" | "info";
  category?: string;
  file?: string;
  line?: number;
  recommendation?: string;
}

export interface PipelineStage {
  name: string;
  status: "completed" | "running" | "pending" | "failed";
  duration?: number;
}

export interface Report {
  id: string | number;
  repository: Repository;
  created_at: string;
  score: number;
  findings: Finding[];
  stages?: PipelineStage[];
}

export interface DashboardStats {
  repositories: number;
  findings: number;
  critical: number;
  high: number;
  medium: number;
  low: number;
  score: number;
}

export interface AnalyticsData {
  labels: string[];
  values: number[];
}