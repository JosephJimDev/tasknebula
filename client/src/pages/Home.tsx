import { useState } from "react";
import { useTasks, useUpdateTask, useDeleteTask } from "@/hooks/use-tasks";
import { Task } from "@shared/schema";
import { TaskCard } from "@/components/TaskCard";
import { TaskForm } from "@/components/TaskForm";
import { StatsDashboard } from "@/components/StatsDashboard";
import { BackgroundOrbs } from "@/components/BackgroundOrbs";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Plus, Search, Filter } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

export default function Home() {
  const { data: tasks, isLoading } = useTasks();
  const updateTask = useUpdateTask();
  const deleteTask = useDeleteTask();
  
  const [search, setSearch] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("all");

  const filteredTasks = tasks?.filter((task) => {
    if (task.isNote) return false; // Filter out notes for this view
    const matchesSearch = task.title.toLowerCase().includes(search.toLowerCase());
    const matchesTab = 
      activeTab === "all" ? true :
      activeTab === "active" ? task.status !== "done" :
      activeTab === "completed" ? task.status === "done" : true;
    
    return matchesSearch && matchesTab;
  }) || [];

  const handleToggleStatus = (task: Task) => {
    const newStatus = task.status === "done" ? "todo" : "done";
    updateTask.mutate({ id: task.id, status: newStatus });
  };

  const handleDelete = (id: number) => {
    deleteTask.mutate(id);
  };

  return (
    <div className="min-h-screen text-foreground p-4 md:p-8 lg:p-12">
      <BackgroundOrbs />
      
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* Header */}
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1">
            <h1 className="text-4xl md:text-5xl font-bold font-display bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60">
              My Tasks
            </h1>
            <p className="text-muted-foreground text-lg">
              Stay organized and productive
            </p>
          </div>

          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="glass-button h-12 px-6 rounded-xl text-base font-semibold shadow-lg shadow-primary/20 hover:shadow-primary/40 group">
                <Plus className="w-5 h-5 mr-2 group-hover:rotate-90 transition-transform" />
                New Task
              </Button>
            </DialogTrigger>
            <DialogContent className="glass-panel border-white/10 sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle className="text-2xl font-display">Create Task</DialogTitle>
                <DialogDescription>Add a new item to your list.</DialogDescription>
              </DialogHeader>
              <TaskForm onSuccess={() => setIsDialogOpen(false)} />
            </DialogContent>
          </Dialog>
        </header>

        {/* Dashboard */}
        {!isLoading && tasks && (
          <StatsDashboard tasks={tasks.filter(t => !t.isNote)} />
        )}

        {/* Filters & Search */}
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between glass-panel p-2 rounded-2xl">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full sm:w-auto">
            <TabsList className="bg-transparent border-none p-0 h-10 w-full sm:w-auto">
              <TabsTrigger 
                value="all" 
                className="rounded-xl data-[state=active]:bg-primary/20 data-[state=active]:text-primary px-6"
              >
                All
              </TabsTrigger>
              <TabsTrigger 
                value="active"
                className="rounded-xl data-[state=active]:bg-primary/20 data-[state=active]:text-primary px-6"
              >
                Active
              </TabsTrigger>
              <TabsTrigger 
                value="completed"
                className="rounded-xl data-[state=active]:bg-primary/20 data-[state=active]:text-primary px-6"
              >
                Done
              </TabsTrigger>
            </TabsList>
          </Tabs>

          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input 
              placeholder="Search tasks..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 glass-input h-10 rounded-xl bg-black/10 border-transparent focus:bg-black/20"
            />
          </div>
        </div>

        {/* Task List */}
        <div className="space-y-4 min-h-[300px]">
          {isLoading ? (
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-24 rounded-2xl bg-card/20 animate-pulse" />
              ))}
            </div>
          ) : filteredTasks.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center">
                <Filter className="w-8 h-8 text-muted-foreground opacity-50" />
              </div>
              <div>
                <h3 className="text-xl font-medium text-muted-foreground">No tasks found</h3>
                <p className="text-sm text-muted-foreground/60">Adjust your filters or create a new task</p>
              </div>
            </div>
          ) : (
            <AnimatePresence mode="popLayout">
              {filteredTasks.map((task) => (
                <TaskCard 
                  key={task.id} 
                  task={task} 
                  onToggleStatus={handleToggleStatus}
                  onDelete={handleDelete}
                />
              ))}
            </AnimatePresence>
          )}
        </div>
      </div>
    </div>
  );
}
