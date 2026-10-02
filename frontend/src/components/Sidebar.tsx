import {
  LayoutDashboard,
  BarChart3,
  Search,
  FileText,
  Settings,
  GitBranch
} from "lucide-react";

interface SidebarProps {
  activePage: string;
  setActivePage: (page: string) => void;
}

const menuItems = [
  {
    id: "dashboard",
    label: "Dashboard",
    icon: LayoutDashboard
  },
  {
    id: "analytics",
    label: "Analytics",
    icon: BarChart3
  },
  {
    id: "findings",
    label: "Findings",
    icon: Search
  },
  {
    id: "reports",
    label: "Reports",
    icon: FileText
  }
];

export default function Sidebar({
  activePage,
  setActivePage
}: SidebarProps) {
  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <GitBranch size={22} />
        <span>Pipeline Optimizer</span>
      </div>

      <nav>
        {menuItems.map((item) => {
          const Icon = item.icon;

          return (
            <button
              key={item.id}
              className={`nav-item ${
                activePage === item.id ? "active" : ""
              }`}
              onClick={() => setActivePage(item.id)}
            >
              <Icon size={20} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      <div className="sidebar-bottom">
        <button className="nav-item">
          <Settings size={20} />
          <span>Settings</span>
        </button>
      </div>
    </aside>
  );
}