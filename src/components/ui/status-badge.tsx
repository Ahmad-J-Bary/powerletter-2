import { cn } from "@/lib/utils";

interface StatusBadgeProps {
  status: "scheduled" | "completed" | "cancelled" | "pending";
  className?: string;
}

const statusConfig = {
  scheduled: {
    label: "Scheduled",
    className: "status-scheduled"
  },
  completed: {
    label: "Completed", 
    className: "status-completed"
  },
  cancelled: {
    label: "Cancelled",
    className: "status-cancelled"
  },
  pending: {
    label: "Pending",
    className: "status-pending"
  }
};

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const config = statusConfig[status];
  
  return (
    <span className={cn(
      "inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium",
      config.className,
      className
    )}>
      {config.label}
    </span>
  );
}