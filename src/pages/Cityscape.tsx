import { Building, Building2, Home, Zap } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
import { Badge } from "../components/ui/badge"
import Buildings from "../components/Buildings"
import { SidebarProvider, SidebarTrigger } from "../components/ui/sidebar";
import { AppSidebar } from "../components/AppSidebar";
import DarkModeToggle from "../components/DarkModeToggle";


const Cityscape = () => {
  const tasks = [
    { id: 1, completed: 5, date: new Date('2023-10-01') },
    { id: 2, completed: 2, date: new Date('2023-10-02') },
    { id: 3, completed: 1, date: new Date('2023-10-03') },
    { id: 4, completed: 3, date: new Date('2023-10-04') },
    { id: 5, completed: 4, date: new Date('2023-10-05') },
    { id: 6, completed: 6, date: new Date('2023-10-06') },
    { id: 7, completed: 8, date: new Date('2023-10-07') },
    { id: 8, completed: 7, date: new Date('2023-10-08') },
    { id: 9, completed: 9, date: new Date('2023-10-09') },
    { id: 10, completed: 10, date: new Date('2023-10-10') },
    { id: 11, completed: 3, date: new Date('2023-10-11') },
    { id: 12, completed: 5, date: new Date('2023-10-12') },
    { id: 13, completed: 2, date: new Date('2023-10-13') },
    { id: 14, completed: 4, date: new Date('2023-10-14') },
    { id: 15, completed: 6, date: new Date('2023-10-15') }    
    
  ];
  return (
    <>
    <SidebarProvider>
        <div className="flex min-h-screen w-full">
          <AppSidebar />
          <div className="flex-1 flex flex-col">
            <header className="h-12 flex items-center  backdrop-blur supports-[backdrop-filter]:bg-background/60">
              <SidebarTrigger className="text-white hover:bg-oxford_blue-500 ml-4" />
              <div className="ml-4">
                <h1 className="text-2xl font-semibold text-white">Cityscape</h1>
              </div>
              <div className="flex absolute right-9"><DarkModeToggle/></div>
            </header>
            <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-accent/5 p-6">
      <div className='d-flex flex-column justify-content-center align-items-center' style={{ marginBottom: '20px', marginTop: '10px' }}>
      </div>
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-muted-foreground font-bold mt-2 dark:text-mikado_yellow-300">Every task you finish fuels a city that never sleeps—your city, your reign, your momentum.</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <Card className="lg:col-span-2 bg-gradient-to-br from-primary/5 to-accent/5 dark:bg-oxford_blue-400">
            <CardHeader>
              <CardTitle className="dark:text-mikado_yellow-300 flex items-center gap-2">
                <Building className="dark:invert h-5 w-5" />
                City Overview
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative h-64 bg-gradient-to-b from-sky-200/20 to-green-200/20 rounded-lg overflow-hidden">
                <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-green-300/30 to-transparent"></div>
                    <Buildings tasks={tasks} />

                    <div className="absolute top-4 right-4">
  {/* Sun for light mode */}
  <div className="w-8 h-8 bg-yellow-400 rounded-full animate-pulse shadow-lg shadow-yellow-300/50 dark:hidden">
    <div className="absolute inset-0 rounded-full bg-yellow-300 animate-ping opacity-75"></div>
  </div>
  {/* Moon for dark mode */}
  <div className="w-8 h-8 bg-slate-100 rounded-full animate-pulse shadow-lg shadow-slate-300/30 hidden dark:block relative">
    <div className="absolute top-1 right-1 w-6 h-6 bg-slate-300 rounded-full"></div>
    <div className="absolute inset-0 rounded-full bg-slate-200 animate-ping opacity-30"></div>
  </div>
</div>
              </div>
            </CardContent>
          </Card>

          <Card className="dark:bg-oxford_blue-400">
            <CardHeader>
              <CardTitle className="flex  dark:text-mikado_yellow-300 items-center gap-2">
                <Zap className="h-5 w-5 dark:invert" />
                City Stats
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="dark:text-gray-400 font-bold text-sm text-muted-foreground">Buildings</span>
                <Badge variant="secondary">{tasks.length}</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="dark:text-gray-400 font-bold text-sm text-muted-foreground">Population</span>
                <Badge variant="secondary">{tasks.reduce((sum, task) => sum + task.completed, 0) * 50}</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="dark:text-gray-400 font-bold text-sm text-muted-foreground">Energy Level</span>
                <Badge className=" dark:border-oxford_blue-400 bg-gradient-to-r from-primary to-accent ">{(tasks.length/40*100)}%</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className=" dark:text-gray-400 font-bold text-sm text-muted-foreground">Happiness</span>
                <Badge className="bg-gradient-to-r from-accent to-primary">{tasks.length > 20?"HIGH": "LOW"}</Badge>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { title: "Residential District", icon: Home, level: 3, progress: 75 },
            { title: "Business District", icon: Building2, level: 2, progress: 45 },
            { title: "Tech Hub", icon: Zap, level: 1, progress: 20 },
          ].map((district, index) => (
            <Card key={index} className="dark:bg-oxford_blue-400 hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <CardTitle className="dark:text-mikado_yellow-300 flex items-center gap-2 text-lg">
                  <district.icon className="dark:invert h-5 w-5" />
                  {district.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm dark:text-gray-400 font-bold text-muted-foreground">Level</span>
                    <Badge>{district.level}</Badge>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="dark:text-gray-400 font-bold text-muted-foreground">Progress</span>
                      <span className="dark:text-gray-400 font-bold">{district.progress}%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-primary to-accent h-2 rounded-full transition-all duration-500" 
                        style={{ width: `${district.progress}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
          </div>
        </div>
      </SidebarProvider>
    
    </>
    
  )
}

export default Cityscape