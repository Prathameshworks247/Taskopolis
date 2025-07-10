import { useMemo } from 'react'
import logo from '../assets/icons/image.png'
import streaking from '../assets/icons/trending-topic.png'
import cityscape from '../assets/icons/cityscape.png'
import tasks from '../assets/icons/add-post.png'
import rank from '../assets/icons/ranking.png'
import { useNavigate } from 'react-router-dom'
import { generateMockStreakData } from '../utils/MockData';
import StreakCalendar from '../components/StreakCalender'
import { AppSidebar } from '../components/AppSidebar'
import { SidebarProvider, SidebarTrigger } from '../components/ui/sidebar'
import { Flame, Calendar, Target, Award } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
import { Badge } from "../components/ui/badge"
function Streak() {
    const streakData = useMemo(() => generateMockStreakData(), []);
    return (
      <>
      <SidebarProvider>
        <div className="flex min-h-screen w-full">
          <AppSidebar />
          <div className="flex-1 flex flex-col">
            <header className="h-12 flex items-center border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
              <SidebarTrigger className="ml-4" />
              <div className="ml-4">
                <h1 className="font-semibold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  Taskopolis
                </h1>
              </div>
            </header>
            <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-accent/5 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Streak Dashboard
          </h1>
          <p className="text-muted-foreground mt-2">Keep the momentum going and build unstoppable habits</p>
        </div>
            <StreakCalendar data={streakData}/>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[
            { title: "Current Streak", value: "15 days", icon: Flame, color: "from-orange-500 to-red-500" },
            { title: "Best Streak", value: "23 days", icon: Award, color: "from-purple-500 to-pink-500" },
            { title: "This Month", value: "18/30", icon: Calendar, color: "from-blue-500 to-cyan-500" },
            { title: "Weekly Target", value: "6/7", icon: Target, color: "from-green-500 to-emerald-500" },
          ].map((stat, index) => (
            <Card key={index} className="hover:shadow-lg transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{stat.title}</p>
                    <p className="text-2xl font-bold mt-1">{stat.value}</p>
                  </div>
                  <div className={`p-3 rounded-full bg-gradient-to-r ${stat.color}`}>
                    <stat.icon className="h-6 w-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Flame className="h-5 w-5 text-orange-500" />
                Streak Calendar
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-7 gap-2 mb-4">
                {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, index) => (
                  <div key={index} className="text-center text-sm font-medium text-muted-foreground p-2">
                    {day}
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-7 gap-2">
                {Array.from({ length: 35 }, (_, i) => {
                  const isActive = i >= 5 && i <= 19
                  const isToday = i === 19
                  return (
                    <div
                      key={i}
                      className={`aspect-square rounded-lg flex items-center justify-center text-sm font-medium transition-all duration-200 ${
                        isToday
                          ? 'bg-gradient-to-r from-primary to-accent text-white ring-2 ring-primary/50'
                          : isActive
                          ? 'bg-gradient-to-r from-primary/20 to-accent/20 text-primary'
                          : 'bg-muted/30 text-muted-foreground'
                      }`}
                    >
                      {i + 1}
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="h-5 w-5 text-purple-500" />
                Streak Milestones
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { milestone: "7 Day Warrior", achieved: true, reward: "50 bonus points" },
                { milestone: "14 Day Champion", achieved: true, reward: "100 bonus points" },
                { milestone: "21 Day Master", achieved: false, reward: "200 bonus points" },
                { milestone: "30 Day Legend", achieved: false, reward: "500 bonus points" },
              ].map((item, index) => (
                <div key={index} className={`flex items-center justify-between p-3 rounded-lg border ${
                  item.achieved ? 'bg-gradient-to-r from-primary/10 to-accent/10 border-primary/20' : 'bg-muted/20 border-border'
                }`}>
                  <div>
                    <p className={`font-medium ${item.achieved ? 'text-primary' : 'text-muted-foreground'}`}>
                      {item.milestone}
                    </p>
                    <p className="text-sm text-muted-foreground">{item.reward}</p>
                  </div>
                  <Badge variant={item.achieved ? 'default' : 'secondary'}>
                    {item.achieved ? 'Unlocked' : 'Locked'}
                  </Badge>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
          </div>
        </div>
      </SidebarProvider>
        
      </>
    )
}

export default Streak
