import { Building, Building2, Home, Zap } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
import { Badge } from "../components/ui/badge"
import Buildings from "../components/Buildings"
import { SidebarProvider, SidebarTrigger } from "../components/ui/sidebar";
import { AppSidebar } from "../components/AppSidebar";



const Cityscape = () => {
  const tasks = [
    { id: 1, completed: 5, date: new Date('2023-10-01') },
    { id: 2, completed: 2, date: new Date('2023-10-02') },
    { id: 3, completed: 1, date: new Date('2023-10-03') },
    { id: 4, completed: 3, date: new Date('2023-10-04') },
  ];
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
      <div className='d-flex flex-column justify-content-center align-items-center' style={{ marginBottom: '20px', marginTop: '10px' }}>
      </div>
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Your Cityscape
          </h1>
          <p className="text-muted-foreground font-bold mt-2">Every task you finish fuels a city that never sleeps—your city, your reign, your momentum.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <Card className="lg:col-span-2 bg-gradient-to-br from-primary/5 to-accent/5 border border-primary/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building className="h-5 w-5" />
                City Overview
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative h-64 bg-gradient-to-b from-sky-200/20 to-green-200/20 rounded-lg overflow-hidden">
                <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-green-300/30 to-transparent"></div>
                    <Buildings tasks={tasks} />
                <div className="absolute top-4 right-4 text-yellow-400">
                  <div className="w-8 h-8 bg-yellow-300 rounded-full animate-pulse"></div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5" />
                City Stats
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Buildings</span>
                <Badge variant="secondary">12</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Population</span>
                <Badge variant="secondary">2,450</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Energy Level</span>
                <Badge className="bg-gradient-to-r from-primary to-accent">85%</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Happiness</span>
                <Badge className="bg-gradient-to-r from-accent to-primary">High</Badge>
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
            <Card key={index} className="hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <district.icon className="h-5 w-5" />
                  {district.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Level</span>
                    <Badge>{district.level}</Badge>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-muted-foreground">Progress</span>
                      <span>{district.progress}%</span>
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