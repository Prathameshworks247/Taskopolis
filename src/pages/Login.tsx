import Social from "../components/Social";
import LoginCard from "../components/LoginCard";
import DarkModeToggle from "../components/DarkModeToggle";
import FloatingShapes from "../components/ui/floatingItems";

function Login() {
    return (
      <div className="min-h-screen flex flex-col">
        <header className="h-16 flex items-center justify-end px-8 relative z-10">
          <DarkModeToggle />
        </header>   
        <FloatingShapes />
        <div className="flex-1 flex items-center justify-center px-4">
          <LoginCard />
        </div>
        <div>
        <Social />
      </div>
      </div>
    );
}

export default Login;