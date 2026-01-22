import { Task } from "@shared/schema";
import { format } from "date-fns";
import { motion } from "framer-motion";
import { Check, Clock, MoreVertical, Trash2, Calendar } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

interface TaskCardProps {
  task: Task;
  onToggleStatus: (task: Task) => void;
  onDelete: (id: number) => void;
}

const priorityColors = {
  high: "text-red-400 border-red-400/30 bg-red-400/10",
  medium: "text-amber-400 border-amber-400/30 bg-amber-400/10",
  low: "text-blue-400 border-blue-400/30 bg-blue-400/10",
};

export function TaskCard({ task, onToggleStatus, onDelete }: TaskCardProps) {
  const isCompleted = task.status === "done";
  const isOverdue = task.dueDate && new Date(task.dueDate) < new Date() && !isCompleted;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      whileHover={{ scale: 1.02, translateY: -2 }}
      className={cn(
        "group relative p-4 rounded-2xl border transition-all duration-300",
        "glass-panel hover:bg-card/60 hover:border-primary/20",
        isCompleted && "opacity-60"
      )}
    >
      <div className="flex items-start gap-4">
        {/* Checkbox Button */}
        <button
          onClick={() => onToggleStatus(task)}
          className={cn(
            "mt-1 flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-300",
            isCompleted
              ? "bg-primary border-primary text-primary-foreground"
              : "border-white/20 hover:border-primary/50"
          )}
        >
          {isCompleted && <Check className="w-3.5 h-3.5" strokeWidth={3} />}
        </button>

        <div className="flex-1 min-w-0 space-y-1">
          <div className="flex items-start justify-between gap-2">
            <h3 className={cn(
              "font-medium truncate text-lg transition-all",
              isCompleted && "line-through text-muted-foreground"
            )}>
              {task.title}
            </h3>
            
            <DropdownMenu>
              <DropdownMenuTrigger className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-white/5 rounded-lg">
                <MoreVertical className="w-4 h-4 text-muted-foreground" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="glass-panel border-white/10">
                <DropdownMenuItem 
                  onClick={() => onDelete(task.id)}
                  className="text-red-400 hover:text-red-300 hover:bg-red-400/10 focus:bg-red-400/10"
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {task.description && (
            <p className="text-sm text-muted-foreground line-clamp-2">
              {task.description}
            </p>
          )}

          <div className="flex flex-wrap items-center gap-2 mt-3 pt-2">
            {/* Priority Badge */}
            <span className={cn(
              "px-2 py-0.5 rounded-full text-xs font-medium border",
              priorityColors[task.priority as keyof typeof priorityColors] || priorityColors.medium
            )}>
              {task.priority}
            </span>

            {/* Category Badge */}
            <span className="px-2 py-0.5 rounded-full text-xs font-medium border border-white/10 bg-white/5 text-muted-foreground">
              {task.category}
            </span>

            {/* Date Badge */}
            {task.dueDate && (
              <span className={cn(
                "flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full border",
                isOverdue 
                  ? "text-red-400 border-red-400/20 bg-red-400/5" 
                  : "text-muted-foreground border-transparent"
              )}>
                <Calendar className="w-3 h-3" />
                {format(new Date(task.dueDate), "MMM d")}
              </span>
            )}
          </div>
        </div>
      </div>
      
      {/* Decorative Glow */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
    </motion.div>
  );
}
