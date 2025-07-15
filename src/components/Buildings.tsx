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

  // Generate windows for a building based on its height
  const generateWindows = (height: number, taskId: number) => {
    const windows = [];
    const floors = Math.floor(height / 25); // Roughly one floor per 25px
    const windowsPerFloor = 2;

    for (let floor = 0; floor < floors; floor++) {
      for (let windowIndex = 0; windowIndex < windowsPerFloor; windowIndex++) {
        const windowTop = height - (floor + 1) * 20 - 8; // Position from top
        const windowLeft = 4 + windowIndex * 16; // 4px margin, 16px spacing

        const isLit = Math.random() > 0.3;

        windows.push(
          <div
            key={`${taskId}-${floor}-${windowIndex}`}
            style={{
              top: `${windowTop}px`,
              left: `${windowLeft}px`,
            }}
            className={`absolute w-2 h-3 rounded-sm ${
              isLit
                ? "bg-yellow-200 shadow-sm shadow-yellow-300"
                : "bg-gray-700 border border-gray-600"
            }`}
          />
        );
      }
    }

    return windows; // <-- THIS WAS MISSING / MISPLACED
  };

  return (
    <div className="relative h-40 w-full">
      {completedTasks.map((task, index) => {
        const height = 40 + task.completed * 10;
        const left = 4 + index * 20;
        const color =
          categoryColors[task.completed] || "from-gray-400 to-gray-300";

        return (
          <Tooltip key={task.id}>
            <TooltipTrigger asChild>
              <div
                key={task.id}
                style={{
                  left: `${left}px`,
                  height: `${height}px`,
                }}
                className={`absolute -bottom-24 w-8 bg-gradient-to-t ${color} rounded-t-sm`}
              >
                {generateWindows(height, task.id)}
              </div>
            </TooltipTrigger>
            <TooltipContent side="top" className="dark:text-mikado_yellow-400 dark:bg-oxford_blue-400 dark:border-oxford_blue-400">
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


// import React from 'react';
// import {
//   Tooltip,
//   TooltipTrigger,
//   TooltipContent,
// } from "../components/ui/tooltip";

// const categoryColors: Record<number, string> = {
//   1: "from-blue-900 to-blue-400",       // Deep ocean blue
//   2: "from-cyan-800 to-cyan-300",       // Teal neon
//   3: "from-rose-700 to-pink-400",       // Bold rose pink
//   4: "from-fuchsia-700 to-pink-300",    // Intense purple-pink
//   5: "from-yellow-600 to-yellow-300",   // Vibrant golden yellow
//   6: "from-orange-600 to-orange-300",   // Rich orange blend
// };

// type Task = {
//   id: number;
//   completed: number;
//   date: Date;
// };

// export default function Buildings({ tasks }: { tasks: Task[] }) {
//   const completedTasks = tasks.filter((task) => task.completed > 0);

//   // Generate windows for a building based on its height
//   const generateWindows = (height: number, taskId: number) => {
//     const windows = [];
//     const floors = Math.floor(height / 25); // Roughly one floor per 25px
//     const windowsPerFloor = 2;
    
//     for (let floor = 0; floor < floors; floor++) {
//       for (let windowIndex = 0; windowIndex < windowsPerFloor; windowIndex++) {
//         const windowTop = height - (floor + 1) * 20 - 8; // Position from top
//         const windowLeft = 4 + windowIndex * 16; // 4px margin, 16px spacing
        
//         // Randomly determine if window is lit (70% chance)
//         const isLit = Math.random() > 0.3;
        
//         windows.push(
//           <div
//             key={`${taskId}-${floor}-${windowIndex}`}
//             style={{
//               top: `${windowTop}px`,
//               left: `${windowLeft}px`,
//             }}
//             className={`absolute w-2 h-3 rounded-sm ${
//               isLit 
//                 ? 'bg-yellow-200 shadow-sm shadow-yellow-300' 
//                 : 'bg-gray-700 border border-gray-600'
//             }`}
//           />
//         );
//       }
//     }
    
//     return windows;
//   };

//   return (
//     <div className="relative h-40 w-full">
//       {completedTasks.map((task, index) => {
//         const height = 40 + task.completed * 10;
//         const left = 4 + index * 20;
//         const color =
//           categoryColors[task.completed] || "from-gray-400 to-gray-300";

//         return (
//           <Tooltip key={task.id}>
//             <TooltipTrigger asChild>
//               <div
//                 style={{
//                   left: `${left}px`,
//                   height: `${height}px`
//                 }} 
//                 className={`absolute -bottom-24 w-8 bg-gradient-to-t ${color} rounded-t-sm relative overflow-hidden`}
//               >
//                 {/* Windows */}
//                 {generateWindows(height, task.id)}
                
//                 {/* Optional: Add a rooftop detail */}
//                 <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-red-500 rounded-full" />
//               </div>
//             </TooltipTrigger>
//             <TooltipContent side="top">
//               <div className="text-center">
//                 <div className="font-semibold text-sm">
//                   ✅ {task.completed} tasks
//                 </div>
//                 <div className="text-xs text-muted-foreground">
//                   📅 {new Date(task.date).toLocaleDateString()}
//                 </div>
//               </div>
//             </TooltipContent>
//           </Tooltip>
//         );
//       })}
//     </div>
//   );
// }