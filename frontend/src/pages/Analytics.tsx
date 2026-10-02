import { useEffect, useState } from "react";
import PowerBIReport from "../components/PowerBIReport";
import { getAnalytics } from "../services/api";

interface Analytics {
  labels: string[];
  values: number[];
}

export default function Analytics() {
  const [data, setData] = useState<Analytics>({
    labels: [],
    values: []
  });

  useEffect(() => {
    const loadAnalytics = async () => {
      try {
        const response = await getAnalytics();
        setData(response);
      } catch {
        console.log("Analytics backend unavailable.");
      }
    };

    loadAnalytics();
  }, []);

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h1>Analytics</h1>
          <p>Analyze pipeline performance and optimization trends.</p>
        </div>
      </div>

      <div className="analytics-summary">
        {data.labels.map((label, index) => (
          <div className="analytics-card" key={label}>
            <span>{label}</span>
            <strong>{data.values[index] ?? 0}</strong>
          </div>
        ))}
      </div>

      <PowerBIReport />
    </div>
  );
}