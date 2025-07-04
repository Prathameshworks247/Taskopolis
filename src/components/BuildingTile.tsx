import { useState } from 'react';

interface BuildingTileProps {
  tasks: number;
  isToday: boolean;
  isWeekend: boolean;
  dayIndex: number;
}

const BuildingTile = ({ tasks, isToday, isWeekend, dayIndex }: BuildingTileProps) => {
  const [isHovered, setIsHovered] = useState(false);

  const getBuildingStyle = () => {
    if (tasks === 0) {
      return {
        height: '20px',
        background: 'linear-gradient(135deg, #e5e7eb 0%, #d1d5db 100%)',
        shadow: '0 2px 4px rgba(0,0,0,0.1)'
      };
    } else if (tasks <= 2) {
      return {
        height: '35px',
        background: 'linear-gradient(135deg, #60a5fa 0%, #3b82f6 100%)',
        shadow: '0 4px 8px rgba(59,130,246,0.3)'
      };
    } else if (tasks <= 4) {
      return {
        height: '50px',
        background: 'linear-gradient(135deg, #34d399 0%, #10b981 100%)',
        shadow: '0 6px 12px rgba(16,185,129,0.3)'
      };
    } else {
      return {
        height: '65px',
        background: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)',
        shadow: '0 8px 16px rgba(245,158,11,0.3)'
      };
    }
  };

  const buildingStyle = getBuildingStyle();

  return (
    <div 
      className="relative flex items-end justify-center h-20 cursor-pointer transition-all duration-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={`
          w-full rounded-t-lg transition-all duration-300 relative overflow-hidden
          ${isHovered ? 'transform -translate-y-1' : ''}
          ${isToday ? 'ring-2 ring-blue-400 ring-opacity-60' : ''}
        `}
        style={{
          height: buildingStyle.height,
          background: buildingStyle.background,
          boxShadow: isHovered 
            ? `${buildingStyle.shadow}, 0 4px 20px rgba(0,0,0,0.15)` 
            : buildingStyle.shadow,
        }}
      >
        {tasks > 0 && (
          <div className="absolute inset-0 opacity-30">
            <div className="grid grid-cols-2 gap-px p-1 h-full">
              {Array.from({ length: Math.min(tasks * 2, 8) }).map((_, i) => (
                <div key={i} className="bg-white/40 rounded-sm"></div>
              ))}
            </div>
          </div>
        )}
        
        {/* Shine effect */}
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/20 to-transparent"></div>
      </div>

      {/* Tooltip */}
      {isHovered && (
        <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs py-1 px-2 rounded whitespace-nowrap z-10">
          {tasks === 0 ? 'No tasks completed' : `${tasks} task${tasks > 1 ? 's' : ''} completed`}
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-2 border-transparent border-t-gray-800"></div>
        </div>
      )}
      {/* Today indicator */}
      {isToday && (
        <div className="absolute -top-2 left-1/2 transform -translate-x-1/2">
          <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
        </div>
      )}
    </div>
  );
};

export default BuildingTile;