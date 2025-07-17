import { useMemo } from "react";
import Building1 from "../../assets/buildings/b1.png";
import Building2 from "../../assets/buildings/b2.png";
import Building3 from "../../assets/buildings/b3.png";
import Building4 from "../../assets/buildings/b4.png";
import Building5 from "../../assets/buildings/b5.png";
import Building6 from "../../assets/buildings/b6.png";

const buildings = [Building1, Building2, Building3, Building4, Building5, Building6];
const animations = ["animate-floatSlow", "animate-floatMedium", "animate-floatFast"];

interface Position {
  left: number;
  top: number;
  size: number;
}

interface FloatingItem {
  id: number;
  building: string;
  animation: string;
  style: {
    left: string;
    top: string;
    width: string;
    height: string;
  };
}

const checkOverlap = (newItem: Position, existingItems: Position[]): boolean => {
  const buffer = 10; // 10px buffer between items
  
  return existingItems.some(existing => {
    const newLeft = newItem.left;
    const newRight = newItem.left + newItem.size;
    const newTop = newItem.top;
    const newBottom = newItem.top + newItem.size;
    
    const existingLeft = existing.left;
    const existingRight = existing.left + existing.size;
    const existingTop = existing.top;
    const existingBottom = existing.top + existing.size;
    
    return !(newRight + buffer < existingLeft || 
             newLeft - buffer > existingRight || 
             newBottom + buffer < existingTop || 
             newTop - buffer > existingBottom);
  });
};

const generateNonOverlappingPositions = (count: number, screenWidth: number = 1920, screenHeight: number = 1080): Position[] => {
  const positions: Position[] = [];
  const maxAttempts: number = 100;
  
  for (let i = 0; i < count; i++) {
    let attempts: number = 0;
    let validPosition: boolean = false;
    let newPosition: Position | null = null;
    
    while (!validPosition && attempts < maxAttempts) {
      const size: number = 40 + Math.floor(Math.random() * 40); // Between 40px and 80px
      const left: number = Math.floor(Math.random() * (screenWidth - size));
      const top: number = Math.floor(Math.random() * (screenHeight - size));
      
      newPosition = { left, top, size };
      
      if (!checkOverlap(newPosition, positions)) {
        validPosition = true;
      }
      attempts++;
    }
    
    if (validPosition && newPosition) {
      positions.push(newPosition);
    }
  }
  
  return positions;
};

const FloatingShapes: React.FC = () => {
  const floatingItems = useMemo((): FloatingItem[] => {
    // Use viewport dimensions or fallback values
    const screenWidth: number = typeof window !== 'undefined' ? window.innerWidth : 1920;
    const screenHeight: number = typeof window !== 'undefined' ? window.innerHeight : 1080;
    
    // Generate more items to cover the screen better
    const itemCount: number = Math.floor((screenWidth * screenHeight) / 15000); // Roughly 1 item per 15000px²
    const minItems: number = 30;
    const maxItems: number = 100;
    const finalCount: number = Math.min(Math.max(itemCount, minItems), maxItems);
    
    const positions: Position[] = generateNonOverlappingPositions(finalCount, screenWidth, screenHeight);
    
    return positions.map((position, index): FloatingItem => {
      const building: string = buildings[index % buildings.length];
      const animation: string = animations[index % animations.length];
      const style = {
        left: `${position.left}px`,
        top: `${position.top}px`,
        width: `${position.size}px`,
        height: `${position.size}px`,
      };

      return { id: index, building, animation, style };
    });
  }, []);

  return (
    <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden">
      {floatingItems.map(({ id, building, animation, style }) => (
        <div
          key={id}
          className={`absolute ${animation}`}
          style={style}
        >
          <img
            src={building}
            alt={`Floating building ${id}`}
            className="w-full h-full object-contain opacity-70"
          />
        </div>
      ))}
    </div>
  );
};

export default FloatingShapes;