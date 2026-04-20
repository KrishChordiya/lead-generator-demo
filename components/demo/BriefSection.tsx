import { ReactNode } from "react";

interface BriefSectionProps {
  label: string;
  content: ReactNode;
}

export function BriefSection({ label, content }: BriefSectionProps) {
  return (
    <div className="space-y-1">
      <span className="text-[10px] font-black text-muted uppercase tracking-[0.2em]">{label}</span>
      <div className="text-secondary font-bold text-lg">{content}</div>
    </div>
  );
}
