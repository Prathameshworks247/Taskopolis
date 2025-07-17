import Social from '../components/Social';
import SignupCard from '../components/SignupCard';
import DarkModeToggle from '../components/DarkModeToggle';
import FloatingShapes from '../components/ui/floatingItems';
function Signup() {
  return (
    <div className="min-h-screen flex flex-col">
        <header className="h-16 flex items-center justify-end px-8 relative z-10">
          <DarkModeToggle />
        </header>
        <FloatingShapes />
      <div className="flex-1 flex items-center justify-center px-4">
        <SignupCard />
      </div>
      <div>
        <Social />
      </div>
    </div>
  );
}

export default Signup;
