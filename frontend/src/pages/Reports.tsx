import { useEffect, useState } from "react";
import { FileText, ExternalLink } from "lucide-react";

import { getReports } from "../services/api";
import { Report } from "../types/report";

export default function Reports() {
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadReports = async () => {
      try {
        const data = await getReports();
        setReports(data);
      } catch {
        console.log("Reports backend unavailable.");
      } finally {
        setLoading(false);
      }
    };

    loadReports();
  }, []);

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h1>Reports</h1>
          <p>Generated pipeline analysis reports.</p>
        </div>
      </div>

      {loading && <p>Loading reports...</p>}

      {!loading && reports.length === 0 && (
        <div className="empty-state">
          <FileText size={40} />

          <h3>No reports available</h3>

          <p>
            Run a repository analysis to generate your first report.
          </p>
        </div>
      )}

      <div className="reports-grid">
        {reports.map((report) => (
          <div className="report-card" key={report.id}>
            <div className="report-icon">
              <FileText size={26} />
            </div>

            <div className="report-content">
              <h3>{report.repository.name}</h3>

              <p>
                {report.repository.owner}
              </p>

              <div className="report-info">
                <span>
                  Score: <strong>{report.score}%</strong>
                </span>

                <span>
                  Findings:{" "}
                  <strong>{report.findings.length}</strong>
                </span>
              </div>

              <small>
                Created:{" "}
                {new Date(report.created_at).toLocaleString()}
              </small>
            </div>

            <button className="view-button">
              View
              <ExternalLink size={16} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}