import { addDays, subDays } from 'date-fns';

// Generate mock streak data for the past year
export const generateMockStreakData = () => {
  const data = [];
  const today = new Date();
  const yearAgo = subDays(today, 365);
  
  // Generate random activity data
  for (let i = 0; i < 365; i++) {
    const date = addDays(yearAgo, i);
    const random = Math.random();
    
    // Create realistic patterns - more activity on weekdays, some gaps
    let count = 0;
    if (random > 0.3) { // 70% chance of activity
      if (random > 0.8) count = Math.floor(Math.random() * 15) + 5; // High activity
      else if (random > 0.6) count = Math.floor(Math.random() * 8) + 2; // Medium activity
      else count = Math.floor(Math.random() * 3) + 1; // Low activity
    }
    
    if (count > 0) {
      data.push({ date, count });
    }
  }
  
  return data;
};
