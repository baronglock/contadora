interface PlanBadgeProps {
  plan: "essencial" | "completo" | "premium";
  size?: "sm" | "md";
}

const planStyles = {
  essencial: "bg-brand-600/15 text-brand-400 border-brand-500/30",
  completo: "bg-emerald-600/15 text-emerald-400 border-emerald-500/30",
  premium: "bg-violet-500/15 text-violet-400 border-violet-500/30",
};

const planLabels = {
  essencial: "Essencial",
  completo: "Completo",
  premium: "Premium",
};

export default function PlanBadge({ plan, size = "sm" }: PlanBadgeProps) {
  return (
    <span
      className={`inline-flex items-center border rounded-full font-semibold uppercase tracking-wider ${
        planStyles[plan]
      } ${size === "sm" ? "px-2 py-0.5 text-[9px]" : "px-3 py-1 text-[10px]"}`}
    >
      {planLabels[plan]}
    </span>
  );
}
