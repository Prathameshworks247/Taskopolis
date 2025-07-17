
import { TodoApp } from '../components/TodoApp'
import { AppSidebar } from '../components/AppSidebar'
import { SidebarProvider, SidebarTrigger } from '../components/ui/sidebar'
import DarkModeToggle from '../components/DarkModeToggle';
import FloatingShapes from '../components/ui/floatingItems';


function Tasks() {

  return (
    <>
      <SidebarProvider>
        <div className="flex min-h-screen w-full">
          <AppSidebar />
          <div className="flex-1 flex flex-col">
          <header className="h-12 flex items-center  backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <SidebarTrigger className="text-white hover:bg-oxford_blue-500 ml-4" />
          <div className="ml-4">
                <h1 className="text-2xl font-semibold text-white">Tasks</h1>
              </div>
              <div className="flex absolute right-9 z-10"><DarkModeToggle/></div>
            </header>
            <FloatingShapes/>
            <TodoApp/>
          </div>
        </div>
      </SidebarProvider>
      
    </>
  )
}

export default Tasks;