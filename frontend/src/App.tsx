import { useState } from "react";

import Header from "./components/Header";
import Sidebar from "./components/Sidebar";

import Dashboard from "./pages/Dashboard";
import Analytics from "./pages/Analytics";
import Findings from "./pages/Findings";
import Reports from "./pages/Reports";

export default function App() {
  const [activePage, setActivePage] =
    useState("dashboard");

  const renderPage = () => {
    switch (activePage) {
      case "analytics":
        return <Analytics />;

      case "findings":
        return <Findings />;

      case "reports":
        return <Reports />;

      case "dashboard":
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="app">
      <Header />

      <div className="app-body">
        <Sidebar
          activePage={activePage}
          setActivePage={setActivePage}
        />

        <main className="main-content">
          {renderPage()}
        </main>
      </div>
    </div>
  );
}