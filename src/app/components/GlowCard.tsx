import { ReactNode, HTMLAttributes } from "react";

interface GlowCardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  className?: string;
  glow?: boolean;
}

export function GlowCard({
  children,
  className = "",
  glow = false,
  ...props
}: GlowCardProps) {
  return (
    <div
      {...props}
      className={`rounded-2xl bg-card/50 backdrop-blur-sm border border-border/50 p-4 ${
        glow ? "glow-pink-sm" : ""
      } ${className}`}
    >
      {children}
    </div>
  );
}
