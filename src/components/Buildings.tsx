import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "../components/ui/tooltip";

const categoryColors: Record<number, string> = {
  1: "from-blue-900 to-blue-400",       // Deep ocean blue
  2: "from-cyan-800 to-cyan-300",       // Teal neon
  3: "from-rose-700 to-pink-400",       // Bold rose pink
  4: "from-fuchsia-700 to-pink-300",    // Intense purple-pink
  5: "from-yellow-600 to-yellow-300",   // Vibrant golden yellow
  6: "from-orange-600 to-orange-300",   // Rich orange blend
};

type Task = {
  id: number;
  completed: number;
  date: Date;
};

export default function Buildings({ tasks }: { tasks: Task[] }) {
  const completedTasks = tasks.filter((task) => task.completed > 0);

  return (
    <div className="relative h-40 w-full">
      {completedTasks.map((task, index) => {
        const height = 40 + task.completed * 10; // Increase height with index or based on task data
        const left = 4 + index * 20;    // Horizontal spacin
        const color =
          categoryColors[task.completed] || "from-gray-400 to-gray-300";

        return (
          <Tooltip key={task.id}>
            <TooltipTrigger asChild>
            <div
            key={task.id}
            style={{
              left: `${left}px`,
              height: `${height}px`
            }} 
            className={`absolute -bottom-24 w-8 bg-gradient-to-t ${color} rounded-t-sm`}
          />

            </TooltipTrigger>
            <TooltipContent side="top">
              <div className="text-center">
                <div className="font-semibold text-sm">
                  ✅ {task.completed} tasks
                </div>
                <div className="text-xs text-muted-foreground">
                  📅 {new Date(task.date).toLocaleDateString()}
                </div>
              </div>
            </TooltipContent>
          </Tooltip>
        );
      })}
    </div>
  );
}
