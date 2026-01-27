import { LucideIcon, Inbox } from "lucide-react";

interface EmptyStateProps {
  message?: string;
  icon?: LucideIcon;
  className?: string;
}

export default function EmptyState({
  message = "No data found",
  icon: Icon = Inbox,
  className = "",
}: EmptyStateProps) {
  return (
    <div
      className={`flex flex-col items-center justify-center py-12 text-center h-full ${className}`}
    >
      <Icon className="mb-4 size-10 text-muted-foreground/50" />
      <p className="text-sm text-muted-foreground">{message}</p>
    </div>
  );
}
