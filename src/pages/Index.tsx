import React, { useMemo } from 'react';
import StreakCalendar from "../components/StreakCalender";
import { generateMockStreakData } from '../utils/MockData';
import { differenceInDays, isSameDay, addDays } from 'date-fns';

const Index = () => {
  const streakData = useMemo(() => generateMockStreakData(), []);
  
  // Calculate stats
  const stats = useMemo(() => {
    const totalContributions = streakData.reduce((sum, item) => sum + item.count, 0);
    
    // Calculate current streak
    let currentStreak = 0;
    const today = new Date();
    const sortedData = [...streakData].sort((a, b) => b.date.getTime() - a.date.getTime());
    
    for (let i = 0; i < sortedData.length; i++) {
      const daysDiff = differenceInDays(today, sortedData[i].date);
      if (daysDiff === currentStreak) {
        currentStreak++;
      } else {
        break;
      }
    }
    
    // Calculate longest streak
    let longestStreak = 0;
    let currentLength = 0;
    const dataByDate = new Map(streakData.map(item => [item.date.toDateString(), item.count]));
    
    // Check each day in the year for consecutive streaks
    const yearStart = new Date(new Date().getFullYear(), 0, 1);
    for (let i = 0; i < 365; i++) {
      const currentDate = addDays(yearStart, i);
      if (dataByDate.has(currentDate.toDateString())) {
        currentLength++;
        longestStreak = Math.max(longestStreak, currentLength);
      } else {
        currentLength = 0;
      }
    }
    
    return {
      totalContributions,
      currentStreak,
      longestStreak
    };
  }, [streakData]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Streak Calendar
          </h1>
          <p className="text-xl text-gray-600">
            Track your daily progress with a beautiful GitHub-style activity calendar
          </p>
        </div>
        
        <div className="flex justify-center">
          <StreakCalendar data={streakData} />
        </div>
        
        <div className="mt-8 text-center text-gray-500 text-sm">
          <p>Hover over squares to see activity details</p>
        </div>
      </div>
    </div>
  );
};

export default Index;
