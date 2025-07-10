import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Card, CardContent } from './ui/card';
import { Checkbox } from './ui/checkbox';
import { Plus, Trash2 } from 'lucide-react';

interface Task {
  id: string;
  text: string;
  completed: boolean;
  tags: string[];
}

const AVAILABLE_TAGS = [
  { name: 'school', color: 'tag-school' },
  { name: 'important', color: 'tag-important' },
  { name: 'priority', color: 'tag-priority' },
  { name: 'hobby', color: 'tag-hobby' },
  { name: 'work', color: 'tag-work' },
  { name: 'personal', color: 'tag-personal' },
];

const TagBadge = ({ tag, onRemove }: { tag: string; onRemove?: () => void }) => {
  const tagConfig = AVAILABLE_TAGS.find(t => t.name === tag);
  const colorClass = tagConfig ? `tag-${tagConfig.name}` : 'bg-primary';
  
  return (
    <Badge 
      variant="secondary" 
      className={`${colorClass} text-white border-0 hover:opacity-80 transition-opacity`}
      onClick={onRemove}
    >
      {tag}
      {onRemove && <span className="ml-1 cursor-pointer">×</span>}
    </Badge>
  );
};

export const TodoApp = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const addTask = () => {
    if (newTask.trim()) {
      const task: Task = {
        id: Date.now().toString(),
        text: newTask.trim(),
        completed: false,
        tags: [...selectedTags],
      };
      setTasks([task, ...tasks]);
      setNewTask('');
      setSelectedTags([]);
    }
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const toggleTask = (id: string) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const toggleTag = (tagName: string) => {
    setSelectedTags(prev => 
      prev.includes(tagName) 
        ? prev.filter(t => t !== tagName)
        : [...prev, tagName]
    );
  };

  const completedTasks = tasks.filter(t => t.completed).length;

  return (
    <div className="min-h-screen bg-gradient-secondary px-4 py-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-2">
            Beautiful Todo
          </h1>
          <p className="text-muted-foreground">Stay organized with style</p>
        </div>

        {/* Main Content - Two Column Layout */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Todo Section */}
          <div className="flex-1 max-w-2xl">
            {/* Add Task Card */}
            <Card className="mb-8 shadow-card border-0 bg-card/50 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="space-y-4">
                  {/* Task Input */}
                  <div className="flex gap-2">
                    <Input
                      placeholder="Add a new task..."
                      value={newTask}
                      onChange={(e) => setNewTask(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && addTask()}
                      className="flex-1 border-border/50 bg-background/50 backdrop-blur-sm"
                    />
                    <Button 
                      onClick={addTask}
                      className="bg-gradient-primary hover:opacity-90 border-0 shadow-elegant"
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>

                  {/* Tag Selection */}
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-muted-foreground">Tags:</p>
                    <div className="flex flex-wrap gap-2">
                      {AVAILABLE_TAGS.map((tag) => (
                        <Badge
                          key={tag.name}
                          variant={selectedTags.includes(tag.name) ? "default" : "outline"}
                          className={`cursor-pointer transition-all duration-200 ${
                            selectedTags.includes(tag.name) 
                              ? `tag-${tag.name} text-white border-0 shadow-sm` 
                              : 'hover:border-primary'
                          }`}
                          onClick={() => toggleTag(tag.name)}
                        >
                          {tag.name}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Tasks List */}
            <div className="space-y-3">
              {tasks.length === 0 ? (
                <Card className="border-0 bg-card/30 backdrop-blur-sm">
                  <CardContent className="p-8 text-center">
                    <p className="text-muted-foreground">No tasks yet. Add one above to get started!</p>
                  </CardContent>
                </Card>
              ) : (
                tasks.map((task) => (
                  <Card 
                    key={task.id}
                    className="border-0 bg-card/50 backdrop-blur-sm shadow-card hover:shadow-elegant transition-all duration-300 animate-fade-in"
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <Checkbox
                          checked={task.completed}
                          onCheckedChange={() => toggleTask(task.id)}
                          className="mt-1"
                        />
                        
                        <div className="flex-1 space-y-2">
                          <p className={`${task.completed ? 'line-through text-muted-foreground' : 'text-foreground'} transition-all duration-200`}>
                            {task.text}
                          </p>
                          
                          {task.tags.length > 0 && (
                            <div className="flex flex-wrap gap-1">
                              {task.tags.map((tag) => (
                                <TagBadge key={tag} tag={tag} />
                              ))}
                            </div>
                          )}
                        </div>

                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => deleteTask(task.id)}
                          className="text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>

            {/* Stats */}
            {tasks.length > 0 && (
              <Card className="mt-8 border-0 bg-card/30 backdrop-blur-sm">
                <CardContent className="p-4">
                  <div className="flex justify-center gap-6 text-sm text-muted-foreground">
                    <span>Total: {tasks.length}</span>
                    <span>Completed: {completedTasks}</span>
                    <span>Remaining: {tasks.filter(t => !t.completed).length}</span>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};