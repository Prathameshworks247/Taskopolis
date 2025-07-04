import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Trophy, CheckSquare, BarChart3, Target, Zap, Timer } from "lucide-react";

const Features = () => {
  return (
    <div>
        <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-4xl font-extrabold text-gray-500">How Taskopolis Works</h2>
          <p className="text-muted-foreground font-bold">Turn your daily tasks into an exciting productivity game</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          <Card className="text-center bg-[#C0C9EE] transition-all duration-300 hover:scale-105 animate-fade-in">
            <CardHeader>
              <div className="mx-auto p-3 rounded-full bg-primary/10 w-fit">
                <CheckSquare className="h-6 w-6 text-primary" />
              </div>
              <CardTitle className="text-xl">Complete Tasks</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Add and complete daily tasks, projects, and goals to earn points and build momentum
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="text-center  bg-[#C0C9EE] transition-all duration-300 hover:scale-105 animate-fade-in">
            <CardHeader>
              <div className="mx-auto p-3 rounded-full bg-accent/10 w-fit">
                <BarChart3 className="h-6 w-6 text-accent" />
              </div>
              <CardTitle className="text-xl">Earn Points</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Gain experience points based on task difficulty, completion time, and consistency streaks
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="text-center bg-[#C0C9EE] transition-all duration-300 hover:scale-105 animate-fade-in">
            <CardHeader>
              <div className="mx-auto p-3 rounded-full bg-success/10 w-fit">
                <Target className="h-6 w-6 text-success" />
              </div>
              <CardTitle className="text-xl">Unlock Ranks</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Progress through productivity tiers from Task Rookie to Taskopolis Champion
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="text-center  bg-[#C0C9EE] transition-all duration-300 hover:scale-105 animate-fade-in">
            <CardHeader>
              <div className="mx-auto p-3 rounded-full bg-primary/10 w-fit">
                <Trophy className="h-6 w-6 text-primary" />
              </div>
              <CardTitle className="text-xl">Compete & Win</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Climb the global leaderboard and earn achievements for your productivity milestones
              </CardDescription>
            </CardContent>
          </Card>
        </div>

        {/* Stats Section */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="text-center bg-[#898AC4] animate-fade-in">
            <CardHeader>
              <div className="mx-auto p-3 rounded-full bg-accent/10 w-fit">
                <Timer className="h-8 w-8 text-accent" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl bg-[#898AC4] font-bold text-primary mb-2">2,847</div>
              <p className="text-muted-foreground">Active Taskers</p>
            </CardContent>
          </Card>

          <Card className="text-center bg-[#898AC4] animate-fade-in">
            <CardHeader>
              <div className="mx-auto p-3 rounded-full bg-success/10 w-fit">
                <CheckSquare className="h-8 w-8 text-success" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-primary mb-2">47,392</div>
              <p className="text-muted-foreground">Tasks Completed</p>
            </CardContent>
          </Card>

          <Card className="text-center bg-[#898AC4] animate-fade-in">
            <CardHeader>
              <div className="mx-auto p-3 rounded-full bg-primary/10 w-fit">
                <Trophy className="h-8 w-8 text-primary" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-primary mb-2">892</div>
              <p className="text-muted-foreground">Champions</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default Features