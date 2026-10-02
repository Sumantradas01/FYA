import { useEffect, useState } from "react";
import { getPowerBIConfig, PowerBIConfig } from "../services/powerbi";

export default function PowerBIReport() {
  const [config, setConfig] = useState<PowerBIConfig | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadConfig = async () => {
      try {
        const data = await getPowerBIConfig();
        setConfig(data);
      } catch (err) {
        setError("Power BI report is not available.");
      } finally {
        setLoading(false);
      }
    };

    loadConfig();
  }, []);

  if (loading) {
    return (
      <div className="powerbi-container">
        Loading Power BI report...
      </div>
    );
  }

  if (error || !config) {
    return (
      <div className="powerbi-container">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="powerbi-container">
      <iframe
        title="ASPogit Power BI Report"
        src={config.embedUrl}
        width="100%"
        height="600"
        frameBorder="0"
        allowFullScreen
      />
    </div>
  );
}