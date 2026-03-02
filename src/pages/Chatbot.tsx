import {
  BotMessageSquare,
  Send,
  Phone,
  Globe,
  Clock,
  CheckCircle2,
  CalendarCheck,
  Sparkles,
  ShieldCheck,
  BookOpen,
} from "lucide-react";
import { conversasChatbot } from "../data/mockData";
import { useState } from "react";

const statusConfig: Record<string, { label: string; color: string; icon: typeof CheckCircle2 }> = {
  novo: { label: "Novo", color: "text-blue-400 bg-blue-500/10", icon: Sparkles },
  em_andamento: { label: "Em Andamento", color: "text-amber-400 bg-amber-500/10", icon: Clock },
  qualificado: { label: "Qualificado", color: "text-emerald-400 bg-emerald-500/10", icon: CheckCircle2 },
  agendado: { label: "Reunião Agendada", color: "text-violet-400 bg-violet-500/10", icon: CalendarCheck },
};

const demoMessages = [
  { role: "bot", text: "Olá! Sou a assistente virtual do escritório. Como posso ajudar?" },
  { role: "user", text: "Tenho uma empresa de logística e estou buscando trocar de contador. Vocês fazem BPO financeiro?" },
  { role: "bot", text: "Que ótimo que nos procurou! Sim, oferecemos BPO Financeiro completo — contas a pagar, receber, conciliação bancária e relatórios gerenciais.\n\nPosso fazer algumas perguntas rápidas para entender sua necessidade?" },
  { role: "user", text: "Claro, pode perguntar" },
  { role: "bot", text: "Perfeito! Preciso de 3 informações:\n\n1. Qual o regime tributário? (Simples, Presumido, Real)\n2. Quantos funcionários registrados?\n3. Qual o principal desafio financeiro no dia a dia?" },
  { role: "user", text: "Lucro presumido, 23 funcionários, e o problema é que perdemos muito tempo controlando contas a pagar" },
  { role: "bot", text: "Empresas de logística no Lucro Presumido com essa estrutura são o perfil ideal para nosso BPO. Automatizamos toda a rotina financeira — você só se preocupa com vendas.\n\nPosso agendar uma reunião com nosso sócio? Temos horários quinta e sexta." },
];

export default function Chatbot() {
  const [selectedChat, setSelectedChat] = useState(0);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-[22px] font-semibold text-white tracking-tight">Chatbot IA</h1>
        <p className="text-[13px] text-white/30 mt-1">
          Agente conversacional autônomo — WhatsApp + Website
        </p>
      </div>

      {/* Capabilities */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          {
            icon: Phone,
            title: "WhatsApp Business API",
            sub: "API Oficial da Meta",
            desc: "Selo verde verificado. Conversas receptivas gratuitas. Zero risco de banimento.",
            badge: { icon: ShieldCheck, text: "100% em conformidade", color: "text-emerald-400" },
          },
          {
            icon: Globe,
            title: "Widget no Website",
            sub: "Chat integrado ao site",
            desc: "Mesmo agente embutido no site institucional. Captura visitantes e converte em leads.",
            badge: null,
          },
          {
            icon: BookOpen,
            title: "RAG Personalizado",
            sub: "Base de conhecimento própria",
            desc: "IA treinada com tabelas de preços, manuais e políticas do escritório. Sem alucinações.",
            badge: null,
          },
        ].map((item) => (
          <div key={item.title} className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-5">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 rounded-lg bg-white/[0.05] flex items-center justify-center">
                <item.icon size={16} className="text-white/50" strokeWidth={1.8} />
              </div>
              <div>
                <h3 className="text-[12px] font-medium text-white">{item.title}</h3>
                <p className="text-[10px] text-white/25">{item.sub}</p>
              </div>
            </div>
            <p className="text-[11px] text-white/35 leading-relaxed">{item.desc}</p>
            {item.badge && (
              <div className={`mt-3 flex items-center gap-1.5 text-[10px] ${item.badge.color}`}>
                <item.badge.icon size={12} />
                <span>{item.badge.text}</span>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Chat area */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
        {/* List */}
        <div className="lg:col-span-2 bg-white/[0.02] border border-white/[0.06] rounded-xl overflow-hidden">
          <div className="px-5 py-4 border-b border-white/[0.04]">
            <h3 className="text-[12px] font-medium text-white">Conversas Ativas</h3>
            <p className="text-[10px] text-white/20">Pipeline de leads do chatbot</p>
          </div>
          <div className="divide-y divide-white/[0.03]">
            {conversasChatbot.map((chat, i) => {
              const s = statusConfig[chat.status];
              return (
                <button
                  key={chat.id}
                  onClick={() => setSelectedChat(i)}
                  className={`w-full text-left px-5 py-3.5 transition-colors ${
                    selectedChat === i ? "bg-white/[0.05]" : "hover:bg-white/[0.02]"
                  }`}
                >
                  <div className="flex items-start justify-between mb-1.5">
                    <h4 className="text-[11px] font-medium text-white/80 truncate pr-2">
                      {chat.empresa}
                    </h4>
                    <span className="text-[10px] text-white/20 flex-shrink-0">{chat.hora}</span>
                  </div>
                  <p className="text-[11px] text-white/25 truncate mb-2">{chat.ultimaMensagem}</p>
                  <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[9px] font-medium ${s.color}`}>
                    <s.icon size={10} />
                    {s.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Chat demo */}
        <div className="lg:col-span-3 bg-white/[0.02] border border-white/[0.06] rounded-xl overflow-hidden flex flex-col">
          <div className="px-5 py-4 border-b border-white/[0.04] flex items-center gap-3">
            <div className="w-7 h-7 rounded-full bg-blue-500/15 flex items-center justify-center">
              <BotMessageSquare size={14} className="text-blue-400" />
            </div>
            <div>
              <h3 className="text-[12px] font-medium text-white">Demo — Qualificação de Lead</h3>
              <p className="text-[10px] text-white/20">Exemplo de conversa automática B2B</p>
            </div>
          </div>

          <div className="flex-1 p-5 space-y-3 overflow-y-auto max-h-[400px]">
            {demoMessages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[80%] rounded-2xl px-4 py-3 text-[12px] leading-relaxed ${
                  msg.role === "user"
                    ? "bg-blue-600/80 text-white rounded-br-sm"
                    : "bg-white/[0.05] text-white/70 rounded-bl-sm"
                }`}>
                  {msg.text.split("\n").map((line, j) => (
                    <p key={j} className={j > 0 ? "mt-1.5" : ""}>{line}</p>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="px-5 py-3 border-t border-white/[0.04]">
            <div className="flex items-center gap-2 bg-white/[0.03] rounded-lg px-4 py-2.5">
              <input
                type="text"
                placeholder="O bot responde automaticamente..."
                className="flex-1 bg-transparent text-[12px] text-white/30 outline-none"
                disabled
              />
              <Send size={15} className="text-white/15" />
            </div>
          </div>
        </div>
      </div>

      {/* Lead detail */}
      {conversasChatbot[selectedChat] && (
        <div className="bg-white/[0.02] border border-white/[0.06] rounded-xl p-5">
          <h3 className="text-[12px] font-medium text-white mb-4">
            Dados Enriquecidos — {conversasChatbot[selectedChat].empresa}
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {[
              { label: "CNAE", value: conversasChatbot[selectedChat].cnae },
              { label: "Capital Social", value: conversasChatbot[selectedChat].capital },
              { label: "Mensagens Trocadas", value: `${conversasChatbot[selectedChat].mensagens}` },
              { label: "Status", value: statusConfig[conversasChatbot[selectedChat].status].label },
            ].map((d) => (
              <div key={d.label}>
                <p className="text-[9px] uppercase tracking-[0.12em] text-white/20 mb-1">{d.label}</p>
                <p className="text-[12px] text-white/60">{d.value}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
