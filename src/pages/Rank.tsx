
import { useNavigate } from 'react-router-dom'
import { SidebarProvider, SidebarTrigger } from "../components/ui/sidebar";
import { AppSidebar } from "../components/AppSidebar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Progress } from "../components/ui/progress";
import { Trophy, Medal, Shield, Crown, Star, Zap } from "lucide-react";
import DarkModeToggle from '../components/DarkModeToggle';

// Mock data - in a real app this would come from an API
const userData = {
  name: "Alex Johnson",
  rating: 1350,
  overallRank: 142,
  totalUsers: 2847,
  tasksCompleted: 89,
  streak: 7
};

const rankTiers = [
  { name: "Citizen", minRating: 0, maxRating: 999, icon: Star, color: "citizen", description: "Just getting started" },
  { name: "Community Leader", minRating: 1000, maxRating: 1199, icon: Shield, color: "community-leader", description: "Building momentum" },
  { name: "Council Member", minRating: 1200, maxRating: 1399, icon: Medal, color: "council-member", description: "Consistent achiever" },
  { name: "Deputy Mayor", minRating: 1400, maxRating: 1599, icon: Trophy, color: "deputy-mayor", description: "Peak performance" },
  { name: "Mayor", minRating: 1600, maxRating: 2000, icon: Crown, color: "mayor", description: "Ultimate productivity" },
]
const getCurrentRank = (rating: number) => {
  for (let i = rankTiers.length - 1; i >= 0; i--) {
    if (rating >= rankTiers[i].minRating) {
      return { ...rankTiers[i], index: i };
    }
  }
  return { ...rankTiers[0], index: 0 };
};

const getNextRank = (currentRankIndex: number) => {
  return currentRankIndex < rankTiers.length - 1 ? rankTiers[currentRankIndex + 1] : null;
};

const Rank = () => {
  const currentRank = getCurrentRank(userData.rating);
  const nextRank = getNextRank(currentRank.index);
  
  const progressToNext = nextRank 
    ? ((userData.rating - currentRank.minRating) / (nextRank.minRating - currentRank.minRating)) * 100
    : 100;

  const CurrentRankIcon = currentRank.icon;

  return (
    <>
          <SidebarProvider>
        <div className="flex min-h-screen w-full">
          <AppSidebar />
          <div className="flex-1 flex flex-col">
          <header className="h-12 flex items-center  backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <SidebarTrigger className="text-white hover:bg-oxford_blue-500 ml-4" />
          <div className="ml-4">
                <h1 className="text-2xl font-semibold text-white">Rank</h1>
              </div>
              <div className="flex absolute right-9"><DarkModeToggle/></div>
            </header>
            <div className="min-h-screen bg-background p-6 animate-fade-in">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="text-center space-y-2">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Zap className="h-8 w-8 text-accent animate-pulse-glow" />
          </div>
          <p className="text-muted-foreground text-lg font-bold">Your productivity journey and achievements</p>
        </div>

        {/* Main Rank Card */}
        <Card className="relative overflow-hidden animate-scale-in">
          <div className="absolute inset-0 bg-gradient-task opacity-10" />
          <CardHeader className="relative">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-2xl">{userData.name}</CardTitle>
                <CardDescription >Your productivity profile</CardDescription>
              </div>
              <div className={`p-4 rounded-full bg-${currentRank.color}/10 transition-all duration-300 hover:scale-110`}>
                <CurrentRankIcon className={`h-8 w-8 text-${currentRank.color}`} />
              </div>
            </div>
          </CardHeader>
          <CardContent className="relative space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {/* Current Rating */}
              <div className="text-center space-y-2">
                <p className="text-sm font-medium text-muted-foreground">Current Rating</p>
                <p className="text-3xl font-bold text-primary">{userData.rating}</p>
                <Badge variant="secondary" className="text-xs">
                  {currentRank.name}
                </Badge>
              </div>

              {/* Overall Rank */}
              <div className="text-center space-y-2">
                <p className="text-sm font-medium text-muted-foreground">Overall Rank</p>
                <p className="text-3xl font-bold text-accent">#{userData.overallRank}</p>
                <p className="text-xs text-muted-foreground">of {userData.totalUsers.toLocaleString()} users</p>
              </div>

              {/* Tasks Completed */}
              <div className="text-center space-y-2">
                <p className="text-sm font-medium text-muted-foreground">Tasks Completed</p>
                <p className="text-3xl font-bold text-success">{userData.tasksCompleted}</p>
                <p className="text-xs text-muted-foreground">{userData.streak} day streak</p>
              </div>

              {/* Progress to Next */}
              <div className="text-center space-y-2">
                <p className="text-sm font-medium text-muted-foreground">
                  {nextRank ? `Progress to ${nextRank.name}` : "Max Rank Achieved"}
                </p>
                <div className="space-y-2">
                  <Progress value={progressToNext} className="h-2" />
                  <p className="text-xs text-muted-foreground">
                    {nextRank 
                      ? `${nextRank.minRating - userData.rating} points needed`
                      : "Congratulations!"
                    }
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Rank Tiers Overview */}
        <Card className="animate-fade-in">
          <CardHeader>
            <CardTitle>Productivity Rank Tiers</CardTitle>
            <CardDescription>Complete tasks to advance through the productivity ranks</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {rankTiers.map((tier, index) => {
                const TierIcon = tier.icon;
                const isCurrentRank = tier.name === currentRank.name;
                const isAchieved = userData.rating >= tier.minRating;
                
                return (
                  <div 
                    key={tier.name}
                    className={`flex items-center space-x-4 p-4 rounded-lg border-2 transition-all duration-300 hover:scale-[1.02] ${
                      isCurrentRank 
                        ? 'border-primary bg-primary/5 animate-pulse-glow' 
                        : isAchieved 
                          ? 'border-success/30 bg-success/5'
                          : 'border-border bg-card hover:bg-muted/50'
                    }`}
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className={`p-2 rounded-full transition-all duration-300 ${
                      isCurrentRank 
                        ? 'bg-primary/10 animate-pulse-glow' 
                        : isAchieved 
                          ? 'bg-success/10'
                          : 'bg-muted'
                    }`}>
                      <TierIcon className={`h-6 w-6 transition-colors duration-300 ${
                        isCurrentRank 
                          ? 'text-primary' 
                          : isAchieved 
                            ? 'text-success'
                            : 'text-muted-foreground'
                      }`} />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold">{tier.name}</h3>
                      <p className="text-sm text-muted-foreground">{tier.description}</p>
                      <p className="text-xs text-muted-foreground">
                        {tier.minRating} - {tier.maxRating} points
                      </p>
                    </div>
                    {isCurrentRank && (
                      <Badge variant="default" className="animate-pulse">Current Rank</Badge>
                    )}
                    {isAchieved && !isCurrentRank && (
                      <Badge variant="outline" className="border-success text-success">Achieved</Badge>
                    )}
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>

          </div>
        </div>
      </SidebarProvider>
        
    </>

  );
};

export default Rank;
