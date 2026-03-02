import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  BotMessageSquare,
  Target,
  Landmark,
  Layers,
  BrainCircuit,
} from "lucide-react";

const navItems = [
  { to: "/", icon: LayoutDashboard, label: "Painel Geral" },
  { to: "/chatbot", icon: BotMessageSquare, label: "Chatbot IA" },
  { to: "/prospeccao", icon: Target, label: "Prospecção B2B" },
  { to: "/bpo", icon: Landmark, label: "BPO Financeiro" },
  { to: "/planos", icon: Layers, label: "Módulos" },
];

export default function Sidebar() {
  return (
    <aside className="w-[240px] min-h-screen bg-[#0a0f1a] border-r border-white/[0.06] flex flex-col flex-shrink-0">
      {/* Logo */}
      <div className="flex items-center gap-3 px-5 h-[72px]">
        <div className="w-8 h-8 rounded-md bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
          <BrainCircuit size={17} className="text-white" />
        </div>
        <div>
          <h1 className="text-[13px] font-semibold text-white leading-none tracking-tight">
            Contabia
          </h1>
          <p className="text-[9px] text-white/30 tracking-[0.15em] uppercase mt-0.5">
            Intelligence Suite
          </p>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 mt-2 space-y-0.5">
        <p className="px-3 pt-2 pb-2 text-[9px] font-medium text-white/25 uppercase tracking-[0.15em]">
          Plataforma
        </p>
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `flex items-center gap-2.5 px-3 py-[9px] rounded-md text-[13px] transition-all duration-150 ${
                isActive
                  ? "bg-white/[0.07] text-white font-medium"
                  : "text-white/40 hover:text-white/70 hover:bg-white/[0.03]"
              }`
            }
          >
            <item.icon size={17} className="flex-shrink-0" strokeWidth={1.8} />
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>

      {/* Footer */}
      <div className="px-5 py-5 border-t border-white/[0.04]">
        <p className="text-[10px] text-white/20 leading-relaxed">
          Demo de apresentação
        </p>
        <p className="text-[10px] text-white/20">
          Dados simulados
        </p>
      </div>
    </aside>
  );
}
