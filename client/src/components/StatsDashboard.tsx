import { Task } from "@shared/schema";
import { motion } from "framer-motion";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

interface StatsDashboardProps {
  tasks: Task[];
}

export function StatsDashboard({ tasks }: StatsDashboardProps) {
  const total = tasks.length;
  const completed = tasks.filter((t) => t.status === "done").length;
  const progress = total === 0 ? 0 : Math.round((completed / total) * 100);
  
  const active = tasks.filter((t) => t.status === "todo").length;
  const inProgress = tasks.filter((t) => t.status === "in-progress").length;

  const data = [
    { name: "Completed", value: completed, color: "#22d3ee" }, // cyan-400
    { name: "In Progress", value: inProgress, color: "#f59e0b" }, // amber-500
    { name: "To Do", value: active, color: "#334155" }, // slate-700
  ];

  // Don't show chart if no tasks
  if (total === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-panel rounded-3xl p-6 mb-8 relative overflow-hidden"
    >
      <div className="flex flex-col md:flex-row items-center justify-between gap-8">
        
        {/* Progress Ring */}
        <div className="relative w-40 h-40 flex-shrink-0">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                innerRadius={60}
                outerRadius={75}
                paddingAngle={5}
                dataKey="value"
                stroke="none"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'rgba(15, 23, 42, 0.9)', 
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '12px',
                  color: 'white'
                }}
                itemStyle={{ color: 'white' }}
              />
            </PieChart>
          </ResponsiveContainer>
          
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <span className="text-3xl font-bold font-display text-white">{progress}%</span>
            <span className="text-xs text-muted-foreground uppercase tracking-wider">Done</span>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 w-full">
          <StatCard label="Total Tasks" value={total} delay={0.1} />
          <StatCard label="In Progress" value={inProgress} delay={0.2} />
          <StatCard label="Completed" value={completed} delay={0.3} />
          <StatCard label="Remaining" value={active} delay={0.4} />
        </div>
      </div>
    </motion.div>
  );
}

function StatCard({ label, value, delay }: { label: string; value: number; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay }}
      className="bg-white/5 rounded-2xl p-4 text-center border border-white/5 hover:bg-white/10 transition-colors"
    >
      <div className="text-2xl font-bold font-display text-white mb-1">{value}</div>
      <div className="text-xs text-muted-foreground font-medium">{label}</div>
    </motion.div>
  );
}
