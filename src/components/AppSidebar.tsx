import { CheckSquare, Trophy, Building, Zap } from "lucide-react"
import { NavLink, useLocation } from "react-router-dom"
import image from "../assets/icons/image.png"
import { useNavigate } from "react-router-dom"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "../components/ui/sidebar"

const items = [
  { title: "Tasks", url: "/tasks", icon: CheckSquare },
  { title: "Rank", url: "/rank", icon: Trophy },
  { title: "Cityscape", url: "/cityscape", icon: Building },
  { title: "Streak", url: "/streak", icon: Zap },
]

export function AppSidebar() {
  const { state } = useSidebar()
  const location = useLocation()
  const currentPath = location.pathname
  const collapsed = state === "collapsed"
  const navigator = useNavigate()

  const isActive = (path: string) => currentPath === path
  const getNavCls = ({ isActive }: { isActive: boolean }) =>
    isActive 
      ? "bg-gradient-to-r from-primary/20 to-accent/20 text-primary border-r-2 border-primary font-medium" 
      : "text-gray-800 hover:text-gray-900 hover:bg-gradient-to-r hover:from-muted/50 hover:to-accent/10 transition-all duration-300"

  return (
    <Sidebar
      className={`${collapsed ? "w-10" : "w-64"} dark:bg-oxford_blue-400 dark:border-oxford_blue-400 bg-gradient-to-b from-background to-muted/20 transition-all duration-300`}
      collapsible="icon"
    >
      <SidebarContent className="p-2">
        <div className=" flex align-middle justify-center mb-6 px-2 py-2">
        {!collapsed && (
            <><img
              src={image}
              alt="Taskopolis Logo"
              className="flex h-12 w-auto mx-auto"
              onClick={() => { navigator("/") } } /><h1 className="flex mt-2 align-middle text-2xl font-semibold text-white">Taskopolis</h1></>
            )}

          {collapsed && (
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
              <span className="text-black font-bold text-sm">
              <img
                src={image}
                alt="Taskopolis Logo"
                className="h-7 w-auto mx-auto"
                onClick={()=>{navigator("/")}}
            />
              </span>
            </div>
          )}
        </div>

        <SidebarGroup>

          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild className="rounded-lg">
                  <NavLink 
                      to={item.url} 
                      end 
                      className={({ isActive }) => `no-underline text-black
                        flex items-center gap-2 px-1 py-1 rounded-lg transition-all duration-300
                        ${collapsed ? 'justify-center' : ''}
                        ${getNavCls({ isActive })}
                      `}>
                      <item.icon className={`${collapsed ? 'h-10 w-10 ' : 'h-20 w-20'}  flex-shrink dark:invert`} />
                      {!collapsed && (
                          <span className="inline-block font-bold text-lg dark:text-mikado_yellow-300  dark:hover:text-mikado_yellow-500  py-4 px-3 transition-all">
                          {item.title}
                        </span>
                      )}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {!collapsed && (
          <div className="mt-auto p-4 bg-gradient-to-r from-primary/10 to-accent/10 rounded-lg dark:bg-yale_blue-500 border-primary/20">
            <div className="text-center">
              <div className="text-sm text-muted-foreground mb-1">Daily Progress</div>
              <div className="w-full bg-muted rounded-full h-2 mb-2">
                <div className="bg-gradient-to-r from-primary to-accent h-2 rounded-full" style={{ width: "65%" }}></div>
              </div>
              <div className="text-xs text-primary font-medium">65% Complete</div>
            </div>
          </div>
        )}
      </SidebarContent>
    </Sidebar>
  )
}