import { useState, useEffect } from 'react';
import { format } from 'date-fns';

interface Task {
  id: string;
  name: string;
  date: string;
  timestamp: number;
}

export const useCityData = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [cityData, setCityData] = useState<Record<string, number>>({});

  // Load tasks from localStorage on mount
  useEffect(() => {
    const savedTasks = localStorage.getItem('cityTasks');
    if (savedTasks) {
      try {
        const parsedTasks = JSON.parse(savedTasks);
        setTasks(parsedTasks);
      } catch (error) {
        console.error('Error loading tasks:', error);
      }
    }
  }, []);

  // Update cityData whenever tasks change
  useEffect(() => {
    const newCityData: Record<string, number> = {};
    
    tasks.forEach(task => {
      const date = task.date;
      newCityData[date] = (newCityData[date] || 0) + 1;
    });

    setCityData(newCityData);
  }, [tasks]);

  // Save tasks to localStorage whenever tasks change
  useEffect(() => {
    localStorage.setItem('cityTasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (taskName: string) => {
    const today = format(new Date(), 'yyyy-MM-dd');
    const newTask: Task = {
      id: `${Date.now()}-${Math.random()}`,
      name: taskName,
      date: today,
      timestamp: Date.now()
    };

    setTasks(prevTasks => [...prevTasks, newTask]);
    
    console.log('Task added:', newTask);
    console.log('Building constructed in the city!');
  };

  const getTodaysTasks = () => {
    const today = format(new Date(), 'yyyy-MM-dd');
    return cityData[today] || 0;
  };

  const getTasksForDate = (date: string) => {
    return tasks.filter(task => task.date === date);
  };

  return {
    tasks,
    cityData,
    addTask,
    getTodaysTasks,
    getTasksForDate
  };
};