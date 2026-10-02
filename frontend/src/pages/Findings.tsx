import { useEffect, useState } from "react";
import { getFindings } from "../services/api";
import { Finding } from "../types/report";

export default function Findings() {
  const [findings, setFindings] = useState<Finding[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadFindings = async () => {
      try {
        const data = await getFindings();
        setFindings(data);
      } catch {
        console.log("Findings backend unavailable.");
      } finally {
        setLoading(false);
      }
    };

    loadFindings();
  }, []);

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h1>Findings</h1>
          <p>Issues discovered during pipeline analysis.</p>
        </div>
      </div>

      {loading && <p>Loading findings...</p>}

      {!loading && findings.length === 0 && (
        <div className="empty-state">
          No findings available.
        </div>
      )}

      <div className="findings-list">
        {findings.map((finding) => (
          <div className="finding-card" key={finding.id}>
            <div className="finding-card-header">
              <h3>{finding.title}</h3>

              <span
                className={`severity ${finding.severity}`}
              >
                {finding.severity.toUpperCase()}
              </span>
            </div>

            <p>{finding.description}</p>

            {finding.file && (
              <div className="finding-meta">
                File: <strong>{finding.file}</strong>

                {finding.line && (
                  <>
                    {" "}
                    · Line: <strong>{finding.line}</strong>
                  </>
                )}
              </div>
            )}

            {finding.recommendation && (
              <div className="recommendation">
                <strong>Recommendation:</strong>{" "}
                {finding.recommendation}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}