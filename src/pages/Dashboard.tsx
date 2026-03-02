import {
  Users,
  BotMessageSquare,
  Target,
  DollarSign,
  Clock,
  FileCheck,
  TrendingUp,
  Building2,
} from "lucide-react";
import KpiCard from "../components/KpiCard";
import { kpiData, prospeccaoMensal, receitaProjetada } from "../data/mockData";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Legend,
} from "recharts";

const chartTooltipStyle = {
  backgroundColor: "#0d1320",
  border: "1px solid rgba(255,255,255,0.08)",
  borderRadius: "10px",
  fontSize: "11px",
  color: "#94a3b8",
  boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
};

export default function Dashboard() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-[22px] font-semibold text-white tracking-tight">
          Painel de Controle
        </h1>
        <p className="text-[13px] text-white/30 mt-1">
          Visão geral do ecossistema de automação — dados simulados para demonstração
        </p>
      </div>

      {/* KPIs - Row 1 */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        <KpiCard
          title="Empresas Mapeadas (RMC)"
          value={kpiData.empresasMapeadas.toLocaleString("pt-BR")}
          icon={Building2}
          accent="#8b5cf6"
          trend="up"
          trendValue="+1.2k/sem"
          subtitle="Receita Federal — dados abertos"
        />
        <KpiCard
          title="Leads Capturados"
          value={kpiData.leadsCapturados.toLocaleString("pt-BR")}
          icon={Target}
          accent="#3b82f6"
          trend="up"
          trendValue="+18.4%"
          subtitle="Prospecção automática via WhatsApp"
        />
        <KpiCard
          title="Clientes Ativos (BPO)"
          value={kpiData.clientesAtivos}
          icon={Users}
          accent="#10b981"
          trend="up"
          trendValue="+3 este mês"
          subtitle={`Ticket médio: R$ ${kpiData.ticketMedio.toLocaleString("pt-BR")}`}
        />
        <KpiCard
          title="Receita Mensal Recorrente"
          value={`R$ ${(kpiData.receitaMensal / 1000).toFixed(1)}k`}
          icon={DollarSign}
          accent="#10b981"
          trend="up"
          trendValue="+22.1%"
        />
      </div>

      {/* KPIs - Row 2 */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        <KpiCard
          title="Taxa de Conversão"
          value={`${kpiData.taxaConversao}%`}
          icon={TrendingUp}
          accent="#f59e0b"
          trend="up"
          trendValue="+1.2pp"
        />
        <KpiCard
          title="Tempo de Resposta (Bot)"
          value={`${kpiData.tempoRespostaBot}s`}
          icon={BotMessageSquare}
          accent="#3b82f6"
          subtitle="Atendimento 24/7 sem fila"
        />
        <KpiCard
          title="NFs Processadas (OCR)"
          value={kpiData.nfsProcessadas.toLocaleString("pt-BR")}
          icon={FileCheck}
          accent="#8b5cf6"
          trend="up"
          trendValue="+340/sem"
        />
        <KpiCard
          title="Horas Economizadas/Mês"
          value={`${kpiData.horasEconomizadas}h`}
          icon={Clock}
          accent="#f43f5e"
          subtitle="Equivalente a ~2 funcionários"
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white/[0.02] border border-white/[0.06] rounded-xl p-6">
          <h3 className="text-[13px] font-semibold text-white mb-0.5">
            Evolução da Prospecção
          </h3>
          <p className="text-[11px] text-white/25 mb-5">
            Leads gerados vs convertidos — últimos 7 meses
          </p>
          <ResponsiveContainer width="100%" height={240}>
            <AreaChart data={prospeccaoMensal}>
              <defs>
                <linearGradient id="gL" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.2} />
                  <stop offset="100%" stopColor="#3b82f6" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="gC" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#10b981" stopOpacity={0.2} />
                  <stop offset="100%" stopColor="#10b981" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
              <XAxis dataKey="mes" stroke="rgba(255,255,255,0.15)" fontSize={11} tickLine={false} axisLine={false} />
              <YAxis stroke="rgba(255,255,255,0.15)" fontSize={11} tickLine={false} axisLine={false} />
              <Tooltip contentStyle={chartTooltipStyle} />
              <Area type="monotone" dataKey="leads" name="Leads Gerados" stroke="#3b82f6" fill="url(#gL)" strokeWidth={2} />
              <Area type="monotone" dataKey="convertidos" name="Convertidos" stroke="#10b981" fill="url(#gC)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white/[0.02] border border-white/[0.06] rounded-xl p-6">
          <h3 className="text-[13px] font-semibold text-white mb-0.5">
            Projeção de Receita por Módulo
          </h3>
          <p className="text-[11px] text-white/25 mb-5">
            Estimativa de crescimento mensal
          </p>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={receitaProjetada}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
              <XAxis dataKey="mes" stroke="rgba(255,255,255,0.15)" fontSize={11} tickLine={false} axisLine={false} />
              <YAxis stroke="rgba(255,255,255,0.15)" fontSize={11} tickLine={false} axisLine={false} />
              <Tooltip
                contentStyle={chartTooltipStyle}
                formatter={(value) => `R$ ${Number(value).toLocaleString("pt-BR")}`}
              />
              <Legend wrapperStyle={{ fontSize: "11px", paddingTop: "10px", opacity: 0.6 }} />
              <Bar dataKey="basico" name="Essencial" fill="#3b82f6" radius={[3, 3, 0, 0]} />
              <Bar dataKey="completo" name="Completo" fill="#10b981" radius={[3, 3, 0, 0]} />
              <Bar dataKey="premium" name="Premium" fill="#8b5cf6" radius={[3, 3, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* ROI Banner */}
      <div className="relative overflow-hidden bg-gradient-to-r from-emerald-500/[0.07] to-transparent border border-emerald-500/10 rounded-xl p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h3 className="text-[15px] font-semibold text-emerald-400">
              Retorno sobre Investimento
            </h3>
            <p className="text-[13px] text-white/40 mt-1.5 leading-relaxed max-w-xl">
              Com apenas <span className="text-white font-medium">2 clientes de BPO</span>, o sistema já se paga completamente e gera lucro recorrente. A automação substitui trabalho manual equivalente a 2 funcionários.
            </p>
          </div>
          <div className="flex gap-8 flex-shrink-0">
            <div className="text-center">
              <p className="text-2xl font-semibold text-white">2 meses</p>
              <p className="text-[10px] uppercase tracking-[0.12em] text-white/25 mt-1">Payback</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-semibold text-emerald-400">487%</p>
              <p className="text-[10px] uppercase tracking-[0.12em] text-white/25 mt-1">ROI Anual</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
