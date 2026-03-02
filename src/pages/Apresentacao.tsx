import { useEffect, useRef, useState } from "react";
import {
  MessageCircle, Target, Landmark, Globe, ShieldCheck, BookOpen,
  Database, Filter, Zap, ScanLine, FileSearch, BadgeCheck, ArrowRight,
  Receipt, Check, Clock, TrendingUp, ChevronRight, Users, ArrowDown,
  Menu, X,
} from "lucide-react";

/* ─── Intersection Observer hook ─── */
function useReveal<T extends HTMLElement>(threshold = 0.15) {
  const ref = useRef<T>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { el.classList.add("visible"); obs.unobserve(el); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return ref;
}

/* ─── Wrapper for consistent centering ─── */
const W = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <div className={`w-full max-w-[1200px] mx-auto px-6 md:px-12 ${className}`}>
    {children}
  </div>
);

/* ─── Section header (always centered) ─── */
const SectionHead = ({ label, title, desc, refProp }: {
  label: string; title: string; desc: string;
  refProp?: React.RefObject<HTMLDivElement | null>;
}) => (
  <div ref={refProp} className="reveal text-center mb-16">
    <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-navy-400 mb-4">{label}</p>
    <h2
      className="font-display text-[28px] md:text-[32px] font-medium tracking-tight leading-snug max-w-[600px] mx-auto"
      dangerouslySetInnerHTML={{ __html: title }}
    />
    <p className="text-[15px] text-navy-400 mt-4 max-w-[520px] mx-auto leading-relaxed font-light">{desc}</p>
  </div>
);

/* ─── Divider ─── */
const Hr = () => (
  <W><div className="h-px bg-gradient-to-r from-transparent via-navy-100 to-transparent" /></W>
);


/* ═══════════════════════════════════════════════════ */
export default function Apresentacao() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const refNums     = useReveal<HTMLDivElement>(0.2);
  const refChat     = useReveal<HTMLDivElement>(0.12);
  const refChatGrid = useReveal<HTMLDivElement>(0.12);
  const refPipe     = useReveal<HTMLDivElement>(0.12);
  const refCidades  = useReveal<HTMLDivElement>(0.15);
  const refBpo      = useReveal<HTMLDivElement>(0.12);
  const refBpoCards = useReveal<HTMLDivElement>(0.15);
  const refWebsite  = useReveal<HTMLDivElement>(0.12);
  const refPlanos   = useReveal<HTMLDivElement>(0.1);
  const refCrono    = useReveal<HTMLDivElement>(0.12);
  const refDifs     = useReveal<HTMLDivElement>(0.15);

  const navLinks = [
    ["#chatbot", "Chatbot"],
    ["#prospeccao", "Prospecção"],
    ["#bpo", "BPO Financeiro"],
    ["#website", "Website"],
    ["#planos", "Planos"],
  ];

  return (
    <div className="min-h-screen bg-white text-navy-900 overflow-x-hidden">

      {/* ═══ NAV ═══ */}
      <nav className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-white/80 backdrop-blur-2xl border-b border-navy-100/60 shadow-[0_1px_8px_rgba(0,0,0,0.04)]"
          : "bg-transparent border-b border-transparent"
      }`}>
        <W className="!max-w-[1400px]">
          <div className="h-16 flex items-center justify-between">
            <span className="font-display text-lg font-semibold tracking-tight">Contabia</span>
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map(([h, l]) => (
                <a key={h} href={h}
                  className="text-[13px] text-navy-400 hover:text-navy-800 transition-colors duration-300 relative after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[1.5px] after:bg-navy-800 after:transition-all after:duration-300 hover:after:w-full"
                >{l}</a>
              ))}
            </div>
            <button className="md:hidden p-2 text-navy-500" onClick={() => setMobileMenu(!mobileMenu)}>
              {mobileMenu ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </W>
        {/* Mobile */}
        <div className={`md:hidden overflow-hidden transition-all duration-300 ${mobileMenu ? "max-h-80 opacity-100" : "max-h-0 opacity-0"}`}>
          <W className="pb-6 pt-2 space-y-3 bg-white/95 backdrop-blur-xl">
            {navLinks.map(([h, l]) => (
              <a key={h} href={h} onClick={() => setMobileMenu(false)}
                className="block text-[14px] text-navy-500 hover:text-navy-800 transition-colors py-1"
              >{l}</a>
            ))}
          </W>
        </div>
      </nav>


      {/* ═══ HERO ═══ */}
      <section className="pt-40 md:pt-48 pb-28">
        <W className="text-center hero-anim">
          <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-navy-300 mb-8">
            Proposta Técnica
          </p>
          <h1 className="font-display text-[36px] md:text-[52px] font-medium leading-[1.12] tracking-tight text-navy-950 max-w-[700px] mx-auto">
            Automação inteligente para seu escritório contábil
          </h1>
          <p className="text-[16px] text-navy-400 mt-8 max-w-[500px] mx-auto leading-relaxed font-light">
            Capte clientes automaticamente, atenda via WhatsApp 24 horas
            e automatize toda a rotina financeira — sem ampliar a equipe.
          </p>
          <div className="mt-10">
            <a href="#chatbot"
              className="btn-shine inline-flex items-center gap-2 px-7 py-3.5 bg-navy-900 text-white text-[13px] font-medium rounded-lg hover:bg-navy-800 hover:shadow-lg hover:shadow-navy-900/20 transition-all duration-300 hover:-translate-y-0.5"
            >
              Conhecer os módulos <ChevronRight size={15} />
            </a>
          </div>
          <ArrowDown size={18} className="mx-auto text-navy-200 mt-20 animate-bounce" />
        </W>
      </section>


      {/* ═══ NÚMEROS ═══ */}
      <section className="bg-navy-950 py-20">
        <W>
          <div ref={refNums} className="grid grid-cols-2 md:grid-cols-4 gap-y-10 gap-x-8 text-center reveal-children">
            {[
              { val: "~700 mil", lab: "Empresas mapeáveis", sub: "Região Metropolitana de Curitiba" },
              { val: "24/7", lab: "Atendimento automático", sub: "Chatbot IA no WhatsApp" },
              { val: "0,8s", lab: "Tempo de resposta", sub: "Sem fila de espera" },
              { val: "~312h", lab: "Economizadas por mês", sub: "Em trabalho manual repetitivo" },
            ].map((n) => (
              <div key={n.lab}>
                <p className="font-display text-[34px] font-medium text-white leading-none">{n.val}</p>
                <p className="text-[12px] text-navy-300 mt-3 font-medium">{n.lab}</p>
                <p className="text-[11px] text-navy-500 mt-1">{n.sub}</p>
              </div>
            ))}
          </div>
        </W>
      </section>


      {/* ═══ CHATBOT ═══ */}
      <section id="chatbot" className="scroll-mt-20 py-28">
        <W>
          <SectionHead
            refProp={refChat}
            label="Módulo 01 — Chatbot IA"
            title="Atendimento e qualificação automática de clientes"
            desc="Um agente de IA que conversa naturalmente via WhatsApp e no site — qualifica leads, tira dúvidas e agenda reuniões sem intervenção humana."
          />

          <div ref={refChatGrid} className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start reveal">
            {/* Features */}
            <div className="space-y-5">
              {[
                { icon: ShieldCheck, t: "WhatsApp Business API Oficial", d: "Selo verde verificado. Zero risco de bloqueio. Conversas receptivas gratuitas." },
                { icon: Globe, t: "Widget de chat no website", d: "Mesmo agente integrado ao site. Visitante tira dúvida e já vira lead." },
                { icon: BookOpen, t: "Base de conhecimento própria (RAG)", d: "IA treinada com tabelas de preço, manuais e políticas do escritório." },
                { icon: Users, t: "Qualificação automática", d: "Filtra leads por regime tributário, porte e necessidade antes de encaminhar." },
              ].map((f) => (
                <div key={f.t} className="flex gap-4 group cursor-default">
                  <div className="w-10 h-10 rounded-xl bg-navy-50 border border-navy-100 flex items-center justify-center shrink-0 transition-all duration-300 group-hover:bg-navy-100 group-hover:scale-110">
                    <f.icon size={18} className="text-navy-400 transition-colors duration-300 group-hover:text-navy-600" strokeWidth={1.6} />
                  </div>
                  <div>
                    <p className="text-[14px] font-semibold text-navy-800">{f.t}</p>
                    <p className="text-[13px] text-navy-400 mt-0.5 leading-relaxed">{f.d}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Chat mockup */}
            <div className="rounded-2xl bg-navy-50/60 border border-navy-100 p-2 card-hover">
              <div className="rounded-xl overflow-hidden bg-white border border-navy-100/60 shadow-sm">
                <div className="px-5 py-3.5 bg-navy-900 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                    <MessageCircle size={14} className="text-white/80" />
                  </div>
                  <div>
                    <p className="text-[12px] font-medium text-white">Assistente — Escritório Contábil</p>
                    <p className="text-[10px] text-white/40 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />Online agora
                    </p>
                  </div>
                </div>
                <div className="p-5 space-y-3 bg-[#f8f9fb] min-h-[300px]">
                  {[
                    { r: "b", t: "Olá! Sou a assistente virtual do escritório. Como posso ajudá-lo?" },
                    { r: "u", t: "Tenho uma empresa de logística e preciso trocar de contador." },
                    { r: "b", t: "Ótimo! Qual o regime tributário e quantos funcionários vocês têm?" },
                    { r: "u", t: "Lucro presumido, 23 funcionários." },
                    { r: "b", t: "Perfil ideal para nosso BPO Financeiro. Posso agendar uma reunião com nosso sócio responsável?" },
                  ].map((m, i) => (
                    <div key={i} className={`flex ${m.r === "u" ? "justify-end" : "justify-start"}`}
                      style={{ animation: `hero-fade-up 0.5s cubic-bezier(0.16,1,0.3,1) ${0.2 + i * 0.15}s both` }}>
                      <div className={`max-w-[78%] px-4 py-2.5 text-[12.5px] leading-relaxed transition-shadow duration-300 hover:shadow-md ${
                        m.r === "u"
                          ? "bg-navy-900 text-white rounded-2xl rounded-br-sm shadow-sm"
                          : "bg-white text-navy-700 rounded-2xl rounded-bl-sm border border-navy-100/60 shadow-sm"
                      }`}>{m.t}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </W>
      </section>

      <Hr />


      {/* ═══ PROSPECÇÃO ═══ */}
      <section id="prospeccao" className="scroll-mt-20 py-28">
        <W>
          <SectionHead
            refProp={refPipe}
            label="Módulo 02 — Prospecção B2B"
            title="Captura automatizada de empresas em toda a região de Curitiba"
            desc="Um motor que mapeia centenas de milhares de empresas usando dados oficiais e gratuitos da Receita Federal, filtra pelo perfil ideal e alimenta o chatbot."
          />

          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 text-center">
            {[
              { icon: Database, n: "01", t: "Extração", d: "Base da Receita Federal — ~700 mil empresas na RMC. Gratuito." },
              { icon: Filter, n: "02", t: "Filtragem", d: "CNAE, capital social, cidade e situação cadastral." },
              { icon: Target, n: "03", t: "Qualificação", d: "Seleciona empresas que encaixam no perfil ideal." },
              { icon: Zap, n: "04", t: "Abordagem", d: "Chatbot aborda via WhatsApp com mensagem personalizada." },
              { icon: Users, n: "05", t: "Conversão", d: "Lead qualificado vai pra reunião com os sócios." },
            ].map((s) => (
              <div key={s.n} className="group">
                <div className="w-12 h-12 mx-auto rounded-xl bg-navy-50 border border-navy-100 flex items-center justify-center mb-4 transition-all duration-300 group-hover:bg-navy-900 group-hover:border-navy-800 group-hover:shadow-lg group-hover:shadow-navy-900/15 group-hover:-translate-y-1">
                  <s.icon size={20} className="text-navy-500 transition-colors duration-300 group-hover:text-white" strokeWidth={1.5} />
                </div>
                <p className="text-[10px] font-semibold tracking-[0.15em] text-navy-300 mb-1">{s.n}</p>
                <p className="text-[14px] font-semibold text-navy-800">{s.t}</p>
                <p className="text-[12px] text-navy-400 mt-1.5 leading-relaxed">{s.d}</p>
              </div>
            ))}
          </div>

          {/* Cidades */}
          <div ref={refCidades} className="mt-16 p-8 rounded-2xl bg-navy-50/60 border border-navy-100 reveal text-center">
            <p className="text-[13px] font-semibold text-navy-700 mb-5">
              Cobertura — Região Metropolitana de Curitiba
            </p>
            <div className="flex flex-wrap justify-center gap-2.5">
              {["Curitiba","São José dos Pinhais","Colombo","Araucária","Pinhais","Campo Largo","Fazenda Rio Grande","Almirante Tamandaré","Piraquara","Campina Grande do Sul"].map((c) => (
                <span key={c} className="px-4 py-2 rounded-lg bg-white text-[12px] text-navy-600 border border-navy-100 shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 hover:border-navy-200 cursor-default">{c}</span>
              ))}
              <span className="px-4 py-2 rounded-lg bg-white text-[12px] text-navy-300 border border-navy-100">+ 19 municípios</span>
            </div>
          </div>
        </W>
      </section>

      <Hr />


      {/* ═══ BPO FINANCEIRO ═══ */}
      <section id="bpo" className="scroll-mt-20 py-28">
        <W>
          <SectionHead
            refProp={refBpo}
            label="Módulo 03 — BPO Financeiro"
            title="O dono da empresa foca em vendas.<br/>A IA cuida do financeiro."
            desc="Automação completa da rotina financeira — extração de documentos, categorização contábil, aprovações e conciliação bancária."
          />

          {/* Flow */}
          <div className="p-8 rounded-2xl bg-navy-50/60 border border-navy-100">
            <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-navy-400 mb-8 text-center">
              Fluxo de processamento
            </p>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-center">
              {[
                { icon: Receipt, t: "Documento recebido", d: "Email ou WhatsApp" },
                { icon: FileSearch, t: "Triagem automática", d: "IA filtra relevantes" },
                { icon: ScanLine, t: "Leitura inteligente", d: "OCR extrai os dados" },
                { icon: BadgeCheck, t: "Classificação contábil", d: "Categoriza na conta certa" },
                { icon: Landmark, t: "Lançamento", d: "Integra com o ERP" },
              ].map((s, i) => (
                <div key={s.t} className="relative group">
                  <div className="w-12 h-12 mx-auto rounded-xl bg-white border border-navy-100 flex items-center justify-center mb-3 shadow-sm transition-all duration-300 group-hover:shadow-md group-hover:-translate-y-1 group-hover:border-navy-200">
                    <s.icon size={20} className="text-navy-500" strokeWidth={1.5} />
                  </div>
                  <p className="text-[12px] font-semibold text-navy-700">{s.t}</p>
                  <p className="text-[11px] text-navy-400 mt-0.5">{s.d}</p>
                  {i < 4 && <ArrowRight size={14} className="absolute top-6 -right-3 text-navy-200 hidden md:block" />}
                </div>
              ))}
            </div>
          </div>

          {/* Features */}
          <div ref={refBpoCards} className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-5 reveal-children">
            {[
              { t: "Extração automática de documentos", d: "A IA lê qualquer PDF — nota fiscal, boleto, fatura — e extrai dados estruturados. Sem digitação manual." },
              { t: "Categorização contábil inteligente", d: "Classifica cada lançamento na conta correta do plano contábil. Regras 100% personalizáveis." },
              { t: "Aprovação por alçada financeira", d: "Valores menores são aprovados automaticamente. Acima do limite, o gestor aprova pelo WhatsApp." },
              { t: "Conciliação bancária em tempo real", d: "Integração com Open Finance do Banco Central. Extrato cruzado automaticamente com lançamentos." },
            ].map((f) => (
              <div key={f.t} className="p-6 rounded-xl bg-navy-50/50 border border-navy-100 card-hover cursor-default">
                <p className="text-[14px] font-semibold text-navy-800">{f.t}</p>
                <p className="text-[13px] text-navy-400 mt-2 leading-relaxed">{f.d}</p>
              </div>
            ))}
          </div>
        </W>
      </section>

      <Hr />


      {/* ═══ WEBSITE ═══ */}
      <section id="website" className="scroll-mt-20 py-28">
        <W>
          <div ref={refWebsite} className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center reveal">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-navy-400 mb-4">Módulo 04 — Website</p>
              <h2 className="font-display text-[28px] md:text-[32px] font-medium tracking-tight leading-snug">
                Presença digital profissional para o escritório
              </h2>
              <p className="text-[15px] text-navy-400 mt-4 leading-relaxed font-light">
                Site institucional moderno com o chatbot IA integrado. O primeiro ponto de contato de novos clientes.
              </p>
              <div className="mt-8 space-y-3.5">
                {[
                  "Design responsivo e otimizado para mobile",
                  "Apresentação dos serviços de contabilidade e BPO",
                  "Chat com IA integrado — visitante vira lead",
                  "SEO otimizado para buscas locais em Curitiba",
                ].map((t) => (
                  <div key={t} className="flex items-center gap-3 group cursor-default">
                    <div className="w-6 h-6 rounded-full bg-navy-50 border border-navy-100 flex items-center justify-center shrink-0 transition-all duration-300 group-hover:bg-navy-900 group-hover:border-navy-800">
                      <Check size={13} className="text-navy-400 transition-colors duration-300 group-hover:text-white" />
                    </div>
                    <p className="text-[14px] text-navy-600">{t}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Browser mockup */}
            <div className="rounded-2xl bg-navy-50/60 border border-navy-100 p-2.5 card-hover">
              <div className="rounded-xl overflow-hidden bg-white border border-navy-100/60 shadow-sm">
                <div className="h-9 bg-navy-50 flex items-center gap-1.5 px-4 border-b border-navy-100/60">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-300/60" />
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-300/60" />
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-300/60" />
                  <span className="ml-4 text-[10px] text-navy-300 font-mono">seuescritorio.com.br</span>
                </div>
                <div className="px-8 py-10 text-center">
                  <p className="font-display text-[20px] font-medium text-navy-900">Seu Escritório Contábil</p>
                  <p className="text-[12px] text-navy-400 mt-3 max-w-[260px] mx-auto leading-relaxed">
                    Contabilidade, BPO Financeiro e consultoria para empresas que querem crescer.
                  </p>
                  <div className="mt-6 inline-block px-5 py-2.5 bg-navy-900 text-white text-[11px] font-medium rounded-md transition-all duration-300 hover:bg-navy-800 hover:shadow-md cursor-pointer">
                    Fale conosco
                  </div>
                  <div className="mt-8 grid grid-cols-3 gap-3">
                    {["Contabilidade", "BPO Financeiro", "Consultoria"].map((s) => (
                      <div key={s} className="p-4 rounded-lg bg-navy-50 border border-navy-100/60 text-[10px] text-navy-500 font-medium transition-all duration-300 hover:bg-navy-100 hover:shadow-sm">{s}</div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </W>
      </section>

      <Hr />


      {/* ═══ PLANOS ═══ */}
      <section id="planos" className="scroll-mt-20 py-28">
        <W>
          <div className="text-center mb-16">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-navy-400 mb-4">Níveis de implementação</p>
            <h2 className="font-display text-[28px] md:text-[32px] font-medium tracking-tight">Escolha o escopo ideal</h2>
            <p className="text-[15px] text-navy-400 mt-3 font-light">Cada módulo pode ser contratado separadamente ou em conjunto</p>
          </div>

          <div ref={refPlanos} className="grid grid-cols-1 lg:grid-cols-3 gap-6 reveal-children">
            {[
              { nome: "Essencial", sub: "Chatbot + Prospecção", dark: false, items: [
                ["Chatbot IA no WhatsApp", true],["Widget de chat no site", true],["Prospecção B2B automatizada", true],
                ["Pipeline de leads (CRM)", true],["Disparo automático de mensagens", true],
                ["BPO Financeiro automatizado", false],["Conciliação bancária", false],["Website institucional", false],
              ]},
              { nome: "Completo", sub: "Chatbot + Prospecção + BPO", dark: true, items: [
                ["Chatbot IA no WhatsApp", true],["Widget de chat no site", true],["Prospecção B2B automatizada", true],
                ["Pipeline de leads (CRM)", true],["Disparo automático de mensagens", true],
                ["BPO Financeiro automatizado", true],["Conciliação bancária (Open Finance)", true],["Website institucional", false],
              ]},
              { nome: "Premium", sub: "Solução completa + Website", dark: false, items: [
                ["Chatbot IA no WhatsApp", true],["Widget de chat no site", true],["Prospecção B2B automatizada", true],
                ["Pipeline de leads (CRM)", true],["Disparo automático de mensagens", true],
                ["BPO Financeiro automatizado", true],["Conciliação bancária (Open Finance)", true],["Website institucional profissional", true],
              ]},
            ].map((p) => (
              <div key={p.nome} className={`relative rounded-2xl p-8 border card-hover ${
                p.dark ? "bg-navy-950 border-navy-800 shadow-xl shadow-navy-950/20" : "bg-white border-navy-100"
              }`}>
                {p.dark && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-navy-700 text-white text-[9px] font-semibold uppercase tracking-[0.18em] px-4 py-1 rounded-full whitespace-nowrap">
                    Recomendado
                  </span>
                )}
                <h3 className={`font-display text-[22px] font-medium ${p.dark ? "text-white" : "text-navy-900"}`}>{p.nome}</h3>
                <p className="text-[12px] mt-1 mb-8 text-navy-400">{p.sub}</p>
                <div className="space-y-3">
                  {p.items.map(([text, on]) => (
                    <div key={text as string} className={`flex items-center gap-3 ${on ? "" : "opacity-25"}`}>
                      {on
                        ? <Check size={15} className={`shrink-0 ${p.dark ? "text-emerald-400" : "text-navy-500"}`} />
                        : <span className="w-[15px] shrink-0 flex justify-center"><span className={`block w-2.5 h-px ${p.dark ? "bg-navy-600" : "bg-navy-300"}`} /></span>
                      }
                      <span className={`text-[13px] ${p.dark ? (on ? "text-navy-200" : "text-navy-600") : (on ? "text-navy-600" : "text-navy-300")}`}>
                        {text as string}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </W>
      </section>


      {/* ═══ CRONOGRAMA ═══ */}
      <section className="bg-navy-50/50 py-28">
        <W>
          <div className="text-center mb-14">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-navy-400 mb-4">Implementação</p>
            <h2 className="font-display text-[28px] md:text-[32px] font-medium tracking-tight">6 semanas até o lançamento</h2>
            <p className="text-[15px] text-navy-400 mt-3 max-w-[460px] mx-auto font-light leading-relaxed">
              Entregas semanais com validação a cada etapa. Operação completa no ar em abril.
            </p>
          </div>

          <div ref={refCrono} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 reveal-children">
            {[
              { s: 1, t: "Infraestrutura", d: "Servidores, WhatsApp API Oficial, ambiente de desenvolvimento" },
              { s: 2, t: "Prospecção", d: "Extração CNPJ, filtragem por perfil, montagem do CRM" },
              { s: 3, t: "Chatbot IA", d: "Treinamento do agente, base de conhecimento, integração WhatsApp" },
              { s: 4, t: "BPO Financeiro", d: "Automação OCR, categorização contábil, regras de aprovação" },
              { s: 5, t: "Open Finance", d: "Integração bancária, conciliação automática, testes de estresse" },
              { s: 6, t: "Lançamento", d: "Treinamento da equipe, contrato de manutenção, go-live" },
            ].map((w) => (
              <div key={w.s} className="flex gap-4 p-5 bg-white rounded-xl border border-navy-100 shadow-sm card-hover cursor-default text-left">
                <span className="font-display text-[28px] font-medium text-navy-200 leading-none w-8 shrink-0">{w.s}</span>
                <div>
                  <p className="text-[14px] font-semibold text-navy-800">{w.t}</p>
                  <p className="text-[12px] text-navy-400 mt-1 leading-relaxed">{w.d}</p>
                </div>
              </div>
            ))}
          </div>
        </W>
      </section>


      {/* ═══ DIFERENCIAIS ═══ */}
      <section className="py-28">
        <W>
          <div ref={refDifs} className="grid grid-cols-1 md:grid-cols-3 gap-10 text-center reveal-children">
            {[
              { icon: ShieldCheck, t: "Segurança total", d: "API Oficial do WhatsApp com selo verde. Conformidade LGPD. Sem risco de bloqueio." },
              { icon: TrendingUp, t: "Retorno rápido", d: "Com 2 clientes de BPO o investimento se paga e já gera lucro recorrente." },
              { icon: Clock, t: "Economia real", d: "Automação equivalente a 2 funcionários em tempo integral dedicado." },
            ].map((d) => (
              <div key={d.t} className="group cursor-default">
                <div className="w-14 h-14 rounded-2xl bg-navy-50 border border-navy-100 flex items-center justify-center mx-auto mb-5 transition-all duration-300 group-hover:bg-navy-900 group-hover:border-navy-800 group-hover:shadow-lg group-hover:shadow-navy-900/15 group-hover:-translate-y-1">
                  <d.icon size={24} className="text-navy-400 transition-colors duration-300 group-hover:text-white" strokeWidth={1.4} />
                </div>
                <p className="text-[15px] font-semibold text-navy-800">{d.t}</p>
                <p className="text-[13px] text-navy-400 mt-2 leading-relaxed max-w-[260px] mx-auto">{d.d}</p>
              </div>
            ))}
          </div>
        </W>
      </section>


      {/* ═══ FOOTER ═══ */}
      <footer className="py-14 border-t border-navy-100 text-center">
        <p className="font-display text-[17px] font-medium text-navy-800">Contabia</p>
        <p className="text-[12px] text-navy-300 mt-2">Proposta técnica — valores e prazos sob consulta</p>
      </footer>

    </div>
  );
}
