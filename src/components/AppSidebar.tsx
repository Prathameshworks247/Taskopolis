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
      className={`${collapsed ? "w-32" : "w-64"} border-r border-border/50 bg-gradient-to-b from-background to-muted/20 transition-all duration-300`}
      collapsible="icon"
    >
      <SidebarContent className="p-2">
        <div className="mb-6 px-4 py-3">
        {!collapsed && (
            <img
                src={image}
                alt="Taskopolis Logo"
                className="h-14 w-auto mx-auto"
                onClick={()=>{navigator("/")}}
            />
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
                      <item.icon className={`${collapsed ? 'h-10 w-10 ' : 'h-10 w-10'}  flex-shrink`} />
                      {!collapsed && (
                        <span className="font-bold text-black hover:bg-slate-300 rounded-md p-1">{item.title}</span>
                      )}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {!collapsed && (
          <div className="mt-auto p-4 bg-gradient-to-r from-primary/10 to-accent/10 rounded-lg border border-primary/20">
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