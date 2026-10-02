import { Bell, Github, Activity } from "lucide-react";

interface HeaderProps {
  onMenuClick?: () => void;
}

export default function Header({ onMenuClick }: HeaderProps) {
  return (
    <header className="header">
      <div className="header-left">
        <button className="menu-button" onClick={onMenuClick}>
          ☰
        </button>

        <div className="brand">
          <Activity size={24} />
          <span>ASPogit</span>
        </div>
      </div>

      <div className="header-right">
        <div className="github-status">
          <Github size={18} />
          <span>GitHub Connected</span>
        </div>

        <button className="icon-button">
          <Bell size={20} />
        </button>

        <div className="avatar">A</div>
      </div>
    </header>
  );
}