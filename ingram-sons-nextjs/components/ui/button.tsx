import Link from "next/link";
import { cn } from "@/lib/utils";

type ButtonProps = {
  href: string;
  variant?: "primary" | "ghost" | "light";
  size?: "default" | "sm";
  className?: string;
  children: React.ReactNode;
};

const variants = {
  primary:
    "bg-navy-gradient text-white shadow-card hover:shadow-card-hover hover:-translate-y-0.5",
  light:
    "bg-white text-navy shadow-card hover:shadow-card-hover hover:-translate-y-0.5",
  ghost:
    "bg-transparent text-white border border-white/40 hover:bg-white/10",
};

const sizes = {
  default: "px-7 py-3.5 text-sm",
  sm: "px-6 py-3 text-sm",
};

export function Button({
  href,
  variant = "primary",
  size = "default",
  className,
  children,
}: ButtonProps) {
  return (
    <Link
      href={href}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-xl font-semibold tracking-wide transition-all duration-200 ease-out",
        variants[variant],
        sizes[size],
        className
      )}
    >
      {children}
    </Link>
  );
}
