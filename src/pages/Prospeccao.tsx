import {
  Target,
  Building2,
  MapPin,
  Filter,
  Database,
  Zap,
  Search,
} from "lucide-react";
import { empresasPorCidade } from "../data/mockData";
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

const cnaesAlvo = [
  { codigo: "4711-3/01", desc: "Comércio varejista de mercadorias em geral", empresas: 2340 },
  { codigo: "6201-5/00", desc: "Desenvolvimento de software sob encomenda", empresas: 1890 },
  { codigo: "8630-5/03", desc: "Atividade médica ambulatorial", empresas: 1420 },
  { codigo: "4930-2/02", desc: "Transporte rodoviário de carga", empresas: 1180 },
  { codigo: "2599-3/99", desc: "Fabricação de produtos de metal", empresas: 890 },
  { codigo: "4120-4/00", desc: "Construção de edifícios", empresas: 760 },
  { codigo: "6311-9/00", desc: "Tratamento de dados e hosting", empresas: 650 },
  { codigo: "5611-2/01", desc: "Restaurantes e similares", empresas: 1340 },
];

const fontes = [
  { nome: "Receita Federal (Dados Abertos)", tipo: "Gratuito", desc: "Base completa CNPJ — CNAE, capital social, situação, sócios" },
  { nome: "Brasil API / ReceitaWS", tipo: "Freemium", desc: "Consulta CNPJ em tempo real via API REST" },
  { nome: "Google Maps API", tipo: "Pay-as-you-go", desc: "Geolocalização e dados de presença física" },
  { nome: "Speedio / Econodata", tipo: "Premium", desc: "E-mail do decisor, LinkedIn, telefone validado" },
];

export default function Prospeccao() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-[22px] font-semibold text-white tracking-tight">Prospecção B2B</h1>
        <p className="text-[13px] text-white/30 mt-1">
          Motor de captura e enriquecimento de dados empresariais — Região Metropolitana de Curitiba
        </p>
      </div>

      {/* Funnel */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { icon: Database, value: "18.429", label: "Empresas Mapeadas", sub: "Receita Federal + APIs", color: "#8b5cf6" },
          { icon: Filter, value: "4.134", label: "Filtradas (ICP)", sub: "CNAE + Capital + Ativa", color: "#3b82f6" },
          { icon: Zap, value: "1.247", label: "Contatadas (Bot)", sub: "WhatsApp API Oficial", color: "#f59e0b" },
          { icon: Target, value: "89", label: "Convertidas", sub: "Taxa: 7.1%", color: "#10b981" },
        ].map((s) => (
          <div key={s.label} className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-5 text-center">
            <div className="w-9 h-9 mx-auto rounded-lg flex items-center justify-center mb-3" style={{ backgroundColor: `${s.color}12` }}>
              <s.icon size={17} style={{ color: s.color }} strokeWidth={1.8} />
            </div>
            <p className="text-[20px] font-semibold text-white">{s.value}</p>
            <p className="text-[10px] uppercase tracking-[0.1em] text-white/25 mt-1">{s.label}</p>
            <p className="text-[10px] text-white/15 mt-0.5">{s.sub}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Cities Chart */}
        <div className="bg-white/[0.02] border border-white/[0.06] rounded-xl p-6">
          <h3 className="text-[13px] font-medium text-white mb-0.5 flex items-center gap-2">
            <MapPin size={14} className="text-white/30" />
            Empresas por Município
          </h3>
          <p className="text-[11px] text-white/20 mb-5">Distribuição na RMC</p>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={empresasPorCidade} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
              <XAxis type="number" stroke="rgba(255,255,255,0.12)" fontSize={10} tickLine={false} axisLine={false} />
              <YAxis dataKey="cidade" type="category" stroke="rgba(255,255,255,0.12)" fontSize={10} width={90} tickLine={false} axisLine={false} />
              <Tooltip contentStyle={tooltipStyle} />
              <Legend wrapperStyle={{ fontSize: "10px", opacity: 0.5 }} />
              <Bar dataKey="total" name="Mapeadas" fill="#3b82f6" radius={[0, 3, 3, 0]} />
              <Bar dataKey="contatadas" name="Contatadas" fill="#f59e0b" radius={[0, 3, 3, 0]} />
              <Bar dataKey="convertidas" name="Convertidas" fill="#10b981" radius={[0, 3, 3, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* CNAE Table */}
        <div className="bg-white/[0.02] border border-white/[0.06] rounded-xl p-6">
          <h3 className="text-[13px] font-medium text-white mb-0.5 flex items-center gap-2">
            <Search size={14} className="text-white/30" />
            CNAEs Alvo
          </h3>
          <p className="text-[11px] text-white/20 mb-5">Atividades econômicas mais rentáveis</p>
          <div className="space-y-2">
            {cnaesAlvo.map((cnae) => (
              <div key={cnae.codigo} className="flex items-center justify-between p-3 rounded-lg bg-white/[0.02] border border-white/[0.04]">
                <div className="flex-1 min-w-0 mr-3">
                  <p className="text-[11px] text-white/60 truncate">{cnae.desc}</p>
                  <p className="text-[10px] text-white/20 font-mono">{cnae.codigo}</p>
                </div>
                <div className="flex items-center gap-1.5 flex-shrink-0">
                  <Building2 size={11} className="text-white/20" />
                  <span className="text-[11px] font-medium text-white/70 tabular-nums">
                    {cnae.empresas.toLocaleString("pt-BR")}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Data Sources */}
      <div className="bg-white/[0.02] border border-white/[0.06] rounded-xl p-6">
        <h3 className="text-[13px] font-medium text-white mb-4">Fontes de Dados</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          {fontes.map((f) => (
            <div key={f.nome} className="p-4 rounded-lg bg-white/[0.02] border border-white/[0.04]">
              <p className="text-[11px] font-medium text-white/60">{f.nome}</p>
              <span className="inline-block mt-1.5 px-2 py-0.5 rounded text-[9px] font-medium bg-blue-500/10 text-blue-400/70">
                {f.tipo}
              </span>
              <p className="text-[10px] text-white/25 mt-2 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
