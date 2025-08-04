import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";

import {
  Trophy,
  CheckSquare,
  Target,
  Building,
} from "lucide-react";

import rod from "../assets/patterns/rod.png";
import wings from "../assets/patterns/wings-diamond.png";
const Features = () => {
  return (
    <div>
      <img src={rod} alt="" className="mx-auto w-96 px-6 py-10" />

      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-4xl font-extrabold dark:text-gray-400">
            How Taskopolis Works
          </h2>
          <p className="text-muted-foreground font-bold dark:text-mikado_yellow-200">
            Turn your daily tasks into an exciting productivity game
          </p>
        </div>
        <div className="space-y-16">
          {/* Feature 1: Complete Tasks */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <Card className=" dark:bg-oxford_blue-400 dark:border-oxford_blue-400 transition-all duration-300 hover:scale-105 animate-fade-in">
              <CardHeader>
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-full bg-primary/10 w-fit">
                    <CheckSquare className="h-6 w-6 text-primary dark:text-white" />
                  </div>
                  <CardTitle className="text-2xl dark:text-gray-400">
                  Conquer Your Tasks
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent>
              <CardDescription className="text-lg font-semibold dark:text-mikado_yellow-300">
                Turn your to-do list into a game. Add tasks, complete them, and watch your productivity transform into tangible progress—one checkmark at a time.
              </CardDescription>
              </CardContent>
            </Card>

            <div className="relative">
              <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg shadow-lg overflow-hidden">
              <video
                  className="w-full h-full object-cover"
                  loop
                  autoPlay
                  muted
                  playsInline
                >
                  <source
                    src="src/assets/demovids/tasks.mp4"
                    type="video/mp4"
                  />
                  Your browser does not support the video tag.
                </video>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div className="relative lg:order-1">
              <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg shadow-lg overflow-hidden">
                <video
                  className="w-full h-full object-cover"
                  loop
                  autoPlay
                  muted
                  playsInline
                >
                  <source
                    src="src/assets/demovids/cityscape.mp4"
                    type="video/mp4"
                  />
                  Your browser does not support the video tag.
                </video>
              </div>
            </div>

            <Card className="bg-[#C0C9EE] dark:bg-oxford_blue-400 dark:border-oxford_blue-400 transition-all duration-300 hover:scale-105 animate-fade-in lg:order-2">
              <CardHeader>
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-full bg-accent/10 w-fit">
                    <Building className="h-6 w-6 text-primary dark:text-white" />
                  </div>
                  <CardTitle className="text-2xl  dark:text-gray-400">
                  Build Your City
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent>
              <CardDescription className="text-lg font-semibold dark:text-mikado_yellow-300">
                Every completed task becomes a building in your personal city. Construct a vibrant skyline that reflects your daily effort—one block at a time.
              </CardDescription>
              </CardContent>
            </Card>
          </div>
          

          <div className="grid grid-cols-1  lg:grid-cols-2 gap-8 items-center">
            <Card className="bg-[#C0C9EE]  dark:bg-oxford_blue-400 dark:border-oxford_blue-400 transition-all duration-300 hover:scale-105 animate-fade-in">
              <CardHeader>
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-full bg-success/10 w-fit">
                    <Target className="h-6 w-6 text-primary dark:text-white" />
                  </div>
                  <CardTitle className="text-2xl  dark:text-gray-400">
                  Explore Your 3D City
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent>
              <CardDescription className="text-lg font-semibold dark:text-mikado_yellow-300">
              Watch your progress come to life in a stunning 3D view. Walk through your evolving city, zoom in on buildings built from tasks, and feel your growth visually.
              </CardDescription>
              </CardContent>
            </Card>

            <div className="relative">
              <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg shadow-lg overflow-hidden">
              <video
                  className="w-full h-full object-cover"
                  loop
                  autoPlay
                  muted
                  playsInline
                >
                  <source
                    src="src/assets/demovids/3d.mp4"
                    type="video/mp4"
                  />
                  Your browser does not support the video tag.
                </video>
              </div>
            </div>
          </div>

          {/* Feature 4: Compete & Win */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div className="relative lg:order-1">
              <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg shadow-lg overflow-hidden">
              <video
                  className="w-full h-full object-cover"
                  loop
                  autoPlay
                  muted
                  playsInline
                >
                  <source
                    src="src/assets/demovids/cityscape.mp4"
                    type="video/mp4"
                  />
                  Your browser does not support the video tag.
                </video>
              </div>
            </div>

            <Card className="bg-[#C0C9EE]  dark:bg-oxford_blue-400 dark:border-oxford_blue-400 transition-all duration-300 hover:scale-105 animate-fade-in lg:order-2">
              <CardHeader>
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-full bg-primary/10 w-fit">
                    <Trophy className="h-6 w-6 text-primary dark:text-white" />
                  </div>
                  <CardTitle className="text-2xl  dark:text-gray-400">
                    Stay on Fire with powerful streak tracking.
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent>
              <CardDescription className="text-lg font-semibold dark:text-mikado_yellow-300">
                Build momentum by completing tasks daily—and watch your streak grow. Our sleek streak interface keeps you motivated and makes consistency feel rewarding.
              </CardDescription>
              </CardContent>
            </Card>
          </div>
          <div className="grid grid-cols-1  lg:grid-cols-2 gap-8 items-center">
            <Card className="bg-[#C0C9EE]  dark:bg-oxford_blue-400 dark:border-oxford_blue-400 transition-all duration-300 hover:scale-105 animate-fade-in">
              <CardHeader>
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-full bg-success/10 w-fit">
                    <Target className="h-6 w-6 text-primary dark:text-white" />
                  </div>
                  <CardTitle className="text-2xl  dark:text-gray-400">
                  Climb the Leaderboard and Ranks as you level up your productivity.
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent>
              <CardDescription className="text-lg font-semibold dark:text-mikado_yellow-300">
                Rise through the global leaderboard by staying consistent. Compete with the world or just your friends—and turn productivity into friendly rivalry.
              </CardDescription>
              </CardContent>
            </Card>

            <div className="relative">
              <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg shadow-lg overflow-hidden">
              <video
                  className="w-full h-full object-cover"
                  loop
                  autoPlay
                  muted
                  playsInline
                >
                  <source
                    src="src/assets/demovids/cityscape.mp4"
                    type="video/mp4"
                  />
                  Your browser does not support the video tag.
                </video>
              </div>
            </div>
          </div>
        </div>
      </div>
      <img src={wings} alt="" className="mx-auto w-96 px-6 py-10 mb-10" />
    </div>
  );
};

export default Features;
