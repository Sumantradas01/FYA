import { useEffect, useState } from "react";
import {
  GitBranch,
  AlertTriangle,
  ShieldAlert,
  CheckCircle
} from "lucide-react";

import StatCard from "../components/StatCard";
import { getDashboardStats } from "../services/api";
import { DashboardStats } from "../types/report";

export default function Dashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    repositories: 0,
    findings: 0,
    critical: 0,
    high: 0,
    medium: 0,
    low: 0,
    score: 0
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadStats = async () => {
      try {
        const data = await getDashboardStats();
        setStats(data);
      } catch {
        console.log("Backend unavailable. Showing default values.");
      } finally {
        setLoading(false);
      }
    };

    loadStats();
  }, []);

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h1>Dashboard</h1>
          <p>Overview of your software pipeline analysis.</p>
        </div>
      </div>

      {loading && <p>Loading dashboard...</p>}

      <div className="stats-grid">
        <StatCard
          title="Repositories"
          value={stats.repositories}
          subtitle="Analyzed repositories"
          icon={<GitBranch size={22} />}
        />

        <StatCard
          title="Total Findings"
          value={stats.findings}
          subtitle="Detected issues"
          icon={<AlertTriangle size={22} />}
        />

        <StatCard
          title="Critical Issues"
          value={stats.critical}
          subtitle="Require immediate attention"
          icon={<ShieldAlert size={22} />}
        />

        <StatCard
          title="Pipeline Score"
          value={`${stats.score}%`}
          subtitle="Overall optimization score"
          icon={<CheckCircle size={22} />}
        />
      </div>

      <div className="dashboard-grid">
        <div className="panel">
          <h2>Finding Summary</h2>

          <div className="finding-row">
            <span>Critical</span>
            <strong>{stats.critical}</strong>
          </div>

          <div className="finding-row">
            <span>High</span>
            <strong>{stats.high}</strong>
          </div>

          <div className="finding-row">
            <span>Medium</span>
            <strong>{stats.medium}</strong>
          </div>

          <div className="finding-row">
            <span>Low</span>
            <strong>{stats.low}</strong>
          </div>
        </div>

        <div className="panel">
          <h2>Pipeline Status</h2>

          <div className="pipeline-status">
            <div className="status-dot completed" />
            <span>GitHub Repository</span>
            <strong>Completed</strong>
          </div>

          <div className="pipeline-status">
            <div className="status-dot completed" />
            <span>Profiler</span>
            <strong>Completed</strong>
          </div>

          <div className="pipeline-status">
            <div className="status-dot completed" />
            <span>Optimizer</span>
            <strong>Completed</strong>
          </div>

          <div className="pipeline-status">
            <div className="status-dot running" />
            <span>Report Generation</span>
            <strong>Running</strong>
          </div>
        </div>
      </div>
    </div>
  );
}