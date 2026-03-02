import {
  FileSearch,
  ScanLine,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  Landmark,
  RefreshCw,
  Receipt,
  BadgeCheck,
} from "lucide-react";
import { nfsRecentes, conciliacaoBancaria } from "../data/mockData";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const tooltipStyle = {
  backgroundColor: "#0d1320",
  border: "1px solid rgba(255,255,255,0.08)",
  borderRadius: "10px",
  fontSize: "11px",
  color: "#94a3b8",
};

const flowSteps = [
  { icon: Receipt, label: "NF / Boleto recebido", sub: "Email ou WhatsApp", color: "#3b82f6" },
  { icon: FileSearch, label: "Triagem IA", sub: "Gemini Flash", color: "#f59e0b" },
  { icon: ScanLine, label: "OCR + Extração", sub: "GPT-4o Mini → JSON", color: "#8b5cf6" },
  { icon: BadgeCheck, label: "Categorização", sub: "Conta contábil auto", color: "#10b981" },
  { icon: Landmark, label: "Lançamento", sub: "Conta Azul / Nibo", color: "#3b82f6" },
];

export default function Bpo() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-[22px] font-semibold text-white tracking-tight">BPO Financeiro</h1>
        <p className="text-[13px] text-white/30 mt-1">
          Automação inteligente — OCR, categorização contábil e conciliação bancária
        </p>
      </div>

      {/* Flow */}
      <div className="bg-white/[0.02] border border-white/[0.06] rounded-xl p-6">
        <h3 className="text-[12px] font-medium text-white/50 uppercase tracking-[0.1em] mb-5">
          Fluxo de Processamento
        </h3>
        <div className="flex flex-wrap items-center justify-center gap-2">
          {flowSteps.map((step, i) => (
            <div key={i} className="flex items-center gap-3">
              <div className="flex flex-col items-center text-center w-[120px]">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center mb-2"
                  style={{ backgroundColor: `${step.color}10`, border: `1px solid ${step.color}20` }}
                >
                  <step.icon size={18} style={{ color: step.color }} strokeWidth={1.8} />
                </div>
                <p className="text-[11px] font-medium text-white/60">{step.label}</p>
                <p className="text-[9px] text-white/20">{step.sub}</p>
              </div>
              {i < flowSteps.length - 1 && (
                <ArrowRight size={14} className="text-white/10 flex-shrink-0 hidden md:block" />
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* NFs Table */}
        <div className="lg:col-span-2 bg-white/[0.02] border border-white/[0.06] rounded-xl overflow-hidden">
          <div className="px-6 py-4 border-b border-white/[0.04] flex items-center justify-between">
            <div>
              <h3 className="text-[13px] font-medium text-white">Documentos Processados</h3>
              <p className="text-[10px] text-white/20">Extração automática via OCR + IA</p>
            </div>
            <div className="flex items-center gap-1.5 text-[10px] text-white/20">
              <RefreshCw size={11} />
              há 3 min
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/[0.04]">
                  {["Fornecedor", "Valor", "Categoria", "Confiança IA", "Status"].map((h, i) => (
                    <th key={h} className={`px-6 py-3 text-[9px] uppercase tracking-[0.12em] text-white/20 font-medium ${i === 1 ? "text-right" : i >= 3 ? "text-center" : "text-left"}`}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.03]">
                {nfsRecentes.map((nf) => (
                  <tr key={nf.id} className="hover:bg-white/[0.02] transition-colors">
                    <td className="px-6 py-3.5 text-[12px] font-medium text-white/60">{nf.fornecedor}</td>
                    <td className="px-6 py-3.5 text-right text-[12px] font-mono text-white/50 tabular-nums">
                      R$ {nf.valor.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                    </td>
                    <td className="px-6 py-3.5">
                      <span className="px-2 py-0.5 rounded bg-white/[0.04] text-white/35 text-[10px]">
                        {nf.categoria}
                      </span>
                    </td>
                    <td className="px-6 py-3.5 text-center">
                      <span className={`text-[11px] font-mono font-medium ${
                        nf.confianca >= 97 ? "text-emerald-400/80" : nf.confianca >= 94 ? "text-amber-400/80" : "text-rose-400/80"
                      }`}>
                        {nf.confianca}%
                      </span>
                    </td>
                    <td className="px-6 py-3.5 text-center">
                      {nf.status === "aprovado_auto" ? (
                        <span className="inline-flex items-center gap-1 text-emerald-400/70 text-[10px]">
                          <CheckCircle2 size={11} /> Auto
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-amber-400/70 text-[10px]">
                          <AlertTriangle size={11} /> Pendente
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Rules */}
        <div className="bg-white/[0.02] border border-white/[0.06] rounded-xl p-5">
          <h3 className="text-[12px] font-medium text-white mb-4">Regras de Aprovação</h3>
          <div className="space-y-3">
            {[
              { icon: CheckCircle2, title: "Auto-Aprovado", color: "#10b981", desc: "Valor < R$ 1.000 + fornecedor reconhecido. Lançamento automático." },
              { icon: AlertTriangle, title: "Aprovação Gerencial", color: "#f59e0b", desc: "Valor > R$ 1.000 ou fornecedor novo. Notificação via WhatsApp ao gestor." },
              { icon: Landmark, title: "Open Finance", color: "#8b5cf6", desc: "Conciliação automática com extrato bancário. Liquidação autônoma." },
            ].map((rule) => (
              <div key={rule.title} className="p-4 rounded-lg" style={{ backgroundColor: `${rule.color}08`, border: `1px solid ${rule.color}15` }}>
                <div className="flex items-center gap-2 mb-1.5">
                  <rule.icon size={13} style={{ color: rule.color }} />
                  <p className="text-[11px] font-medium" style={{ color: rule.color }}>{rule.title}</p>
                </div>
                <p className="text-[10px] text-white/30 leading-relaxed">{rule.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Conciliacao */}
      <div className="bg-white/[0.02] border border-white/[0.06] rounded-xl p-6">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h3 className="text-[13px] font-medium text-white">Conciliação Bancária — Tempo Real</h3>
            <p className="text-[11px] text-white/20">Fluxo de caixa automático via Open Finance</p>
          </div>
          <div className="flex items-center gap-5 text-[10px] text-white/25">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400/70" /> Entradas
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-rose-400/70" /> Saídas
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-blue-400/70" /> Saldo
            </span>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={230}>
          <LineChart data={conciliacaoBancaria}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
            <XAxis dataKey="data" stroke="rgba(255,255,255,0.12)" fontSize={10} tickLine={false} axisLine={false} />
            <YAxis stroke="rgba(255,255,255,0.12)" fontSize={10} tickLine={false} axisLine={false} />
            <Tooltip contentStyle={tooltipStyle} formatter={(v) => `R$ ${Number(v).toLocaleString("pt-BR")}`} />
            <Line type="monotone" dataKey="entradas" stroke="#10b981" strokeWidth={1.5} dot={{ r: 3, fill: "#10b981" }} />
            <Line type="monotone" dataKey="saidas" stroke="#f43f5e" strokeWidth={1.5} dot={{ r: 3, fill: "#f43f5e" }} />
            <Line type="monotone" dataKey="saldo" stroke="#3b82f6" strokeWidth={2} dot={{ r: 3, fill: "#3b82f6" }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
