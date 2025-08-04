import Social from "../components/Social";
import LoginCard from "../components/LoginCard";
import DarkModeToggle from "../components/DarkModeToggle";
import FloatingShapes from "../components/ui/floatingItems";

function Login() {
    return (
      <div className=" relative min-h-screen flex flex-col">
        <iframe src="https://lottie.host/embed/c554a34d-e313-41df-945e-2ed614f305ef/uGIYa86j1V.lottie" className="absolute w-full h-full object-fit dark:invert"/>
        <header className="h-16 flex items-center justify-end px-8 relative z-10">
          <DarkModeToggle />
        </header>   
        <FloatingShapes />
        <div className="flex-1 flex items-center justify-center px-4">
          <LoginCard />
        </div>

      </div>
    );
}

export default Login;