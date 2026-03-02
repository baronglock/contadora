import {
  Check,
  X,
  ChevronDown,
  ChevronUp,
  TrendingUp,
  Zap,
  Shield,
  Clock,
} from "lucide-react";
import { planos, roiProjecao } from "../data/mockData";
import { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const tooltipStyle = {
  backgroundColor: "#0d1320",
  border: "1px solid rgba(255,255,255,0.08)",
  borderRadius: "10px",
  fontSize: "11px",
  color: "#94a3b8",
};

const corMap: Record<string, { accent: string; bg: string }> = {
  brand: { accent: "#3b82f6", bg: "rgba(59,130,246,0.06)" },
  emerald: { accent: "#10b981", bg: "rgba(16,185,129,0.06)" },
  violet: { accent: "#8b5cf6", bg: "rgba(139,92,246,0.06)" },
};

export default function Planos() {
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-[22px] font-semibold text-white tracking-tight">Módulos da Plataforma</h1>
        <p className="text-[13px] text-white/30 mt-1">
          Comparativo de funcionalidades por nível de implementação
        </p>
      </div>

      {/* Plan Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {planos.map((plano) => {
          const c = corMap[plano.cor];
          return (
            <div
              key={plano.id}
              className="relative rounded-2xl p-6 border transition-all duration-200 hover:scale-[1.01]"
              style={{
                backgroundColor: c.bg,
                borderColor: `${c.accent}20`,
                boxShadow: plano.destaque ? `0 0 40px ${c.accent}10` : undefined,
              }}
            >
              {plano.destaque && (
                <div
                  className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-[10px] font-semibold uppercase tracking-[0.12em] text-white"
                  style={{ backgroundColor: c.accent }}
                >
                  Recomendado
                </div>
              )}

              <div className="text-center mb-6 mt-1">
                <h3 className="text-[18px] font-semibold" style={{ color: c.accent }}>
                  {plano.nome}
                </h3>
                <p className="text-[11px] text-white/25 mt-0.5">{plano.subtitulo}</p>
              </div>

              <div className="space-y-1 mb-5">
                {plano.funcionalidades.map((f) => {
                  const key = `${plano.id}-${f.nome}`;
                  const isExpanded = expanded === key;
                  return (
                    <div key={f.nome}>
                      <button
                        onClick={() => f.incluso && setExpanded(isExpanded ? null : key)}
                        className={`w-full flex items-center gap-2.5 text-left px-3 py-2 rounded-lg transition-colors ${
                          f.incluso ? "hover:bg-white/[0.04] cursor-pointer" : "cursor-default opacity-30"
                        }`}
                      >
                        {f.incluso ? (
                          <Check size={14} className="text-emerald-400/80 flex-shrink-0" />
                        ) : (
                          <X size={14} className="text-white/20 flex-shrink-0" />
                        )}
                        <span className={`text-[12px] flex-1 ${f.incluso ? "text-white/60" : "text-white/20 line-through"}`}>
                          {f.nome}
                        </span>
                        {f.incluso && (
                          isExpanded
                            ? <ChevronUp size={12} className="text-white/15" />
                            : <ChevronDown size={12} className="text-white/15" />
                        )}
                      </button>
                      {isExpanded && (
                        <div className="ml-9 mr-2 mt-1 mb-2 p-3 rounded-lg bg-white/[0.03] border border-white/[0.04]">
                          <p className="text-[11px] text-white/35 leading-relaxed">{f.desc}</p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* ROI */}
      <div className="bg-white/[0.02] border border-white/[0.06] rounded-xl p-6">
        <div className="flex items-center gap-2 mb-0.5">
          <TrendingUp size={15} className="text-emerald-400" />
          <h3 className="text-[13px] font-medium text-white">
            Simulação de ROI — Receita vs Custo por Número de Clientes
          </h3>
        </div>
        <p className="text-[11px] text-white/20 mb-5">
          Ticket médio de R$ 3.500/mês — custos escalam muito menos que a receita
        </p>
        <ResponsiveContainer width="100%" height={280}>
          <BarChart data={roiProjecao.cenarios}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
            <XAxis dataKey="clientes" stroke="rgba(255,255,255,0.12)" fontSize={10} tickLine={false} axisLine={false} tickFormatter={(v) => `${v} cl.`} />
            <YAxis stroke="rgba(255,255,255,0.12)" fontSize={10} tickLine={false} axisLine={false} tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`} />
            <Tooltip contentStyle={tooltipStyle} formatter={(v) => `R$ ${Number(v).toLocaleString("pt-BR")}`} />
            <Legend wrapperStyle={{ fontSize: "10px", opacity: 0.5, paddingTop: "10px" }} />
            <Bar dataKey="receitaMensal" name="Receita Mensal" fill="#10b981" radius={[4, 4, 0, 0]} />
            <Bar dataKey="custoTotal" name="Custo Total" fill="#f43f5e" radius={[4, 4, 0, 0]} />
            <Bar dataKey="lucro" name="Lucro Líquido" fill="#3b82f6" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>

        <div className="mt-5 grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { value: "1 cliente", label: "Para breakeven" },
            { value: "R$ 4.300", label: "Lucro c/ 2 clientes" },
            { value: "R$ 30.900", label: "Lucro c/ 10 clientes" },
            { value: "R$ 165.500", label: "Lucro c/ 50 clientes" },
          ].map((item) => (
            <div key={item.label} className="p-3 rounded-lg bg-white/[0.03] text-center">
              <p className="text-[16px] font-semibold text-emerald-400">{item.value}</p>
              <p className="text-[9px] text-white/20 uppercase tracking-[0.1em] mt-1">{item.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Cronograma */}
      <div className="bg-white/[0.02] border border-white/[0.06] rounded-xl p-6">
        <h3 className="text-[13px] font-medium text-white mb-5">Cronograma de Implementação</h3>
        <div className="space-y-2">
          {[
            { sem: 1, titulo: "Infraestrutura Cloud + WhatsApp API", desc: "Servidores, Docker, n8n, credenciamento API Oficial", icon: Shield },
            { sem: 2, titulo: "Prospecção — Scripts CNPJ", desc: "Scraping Receita Federal, filtros CNAE/município, CRM, LGPD", icon: Zap },
            { sem: 3, titulo: "Chatbot IA + RAG", desc: "Treinamento com base do escritório, integração WhatsApp, testes", icon: Zap },
            { sem: 4, titulo: "BPO Financeiro — OCR + Categorização", desc: "Fluxos n8n, regras de aprovação, integração sistema contábil", icon: Zap },
            { sem: 5, titulo: "Open Finance + Testes E2E", desc: "Integração bancária, conciliação automática, stress test", icon: Zap },
            { sem: 6, titulo: "Go-Live + Treinamento", desc: "Capacitação dos sócios, SLA, lançamento de campanhas", icon: Clock },
          ].map((s) => (
            <div key={s.sem} className="flex items-start gap-4 p-4 rounded-lg bg-white/[0.02] border border-white/[0.04]">
              <div className="w-9 h-9 rounded-lg bg-blue-500/10 border border-blue-500/15 flex items-center justify-center flex-shrink-0">
                <span className="text-[12px] font-semibold text-blue-400">S{s.sem}</span>
              </div>
              <div>
                <h4 className="text-[12px] font-medium text-white/70">{s.titulo}</h4>
                <p className="text-[11px] text-white/25 mt-0.5">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Diferenciais */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { icon: Shield, title: "API Oficial WhatsApp", desc: "Selo verde, zero risco de banimento, conformidade total com Meta e LGPD." },
          { icon: TrendingUp, title: "ROI em 2 Meses", desc: "Com apenas 2 clientes de BPO, todo o investimento se paga e gera lucro recorrente." },
          { icon: Clock, title: "312h Economizadas/Mês", desc: "Automação substitui trabalho manual equivalente a 2 funcionários em tempo integral." },
        ].map((d) => (
          <div key={d.title} className="bg-white/[0.02] border border-white/[0.06] rounded-xl p-5">
            <d.icon size={18} className="text-white/20 mb-3" strokeWidth={1.8} />
            <h4 className="text-[12px] font-medium text-white/70 mb-1">{d.title}</h4>
            <p className="text-[11px] text-white/25 leading-relaxed">{d.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
