import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function GlassCard({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={cn(
        "bg-slate-900/60 backdrop-blur-xl border border-white/10 rounded-xl shadow-2xl",
        className
      )}
    >
      {children}
    </div>
  );
}
