
import { TodoApp } from '../components/TodoApp'
import { AppSidebar } from '../components/AppSidebar'
import { SidebarProvider, SidebarTrigger } from '../components/ui/sidebar'


function Tasks() {

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
            <TodoApp/>
          </div>
        </div>
      </SidebarProvider>
      
    </>
  )
}

export default Tasks;