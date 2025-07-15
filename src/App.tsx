import { Toaster } from "./components/ui/toaster";
import { Toaster as Sonner } from "./components/ui/sonner";
import { TooltipProvider } from "./components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Tasks from "./pages/Tasks";
import Rank from "./pages/Rank";
import Landing from "./pages/Landing";
import Cityscape from "./pages/Cityscape";
import Streak from "./pages/Streak";
import { useTheme } from "./hooks/useTheme";
import './App.css';


const queryClient = new QueryClient();

export default function App() {
  useTheme(); // ← Apply dark mode at the top level

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="/tasks" element={<Tasks />} />
              <Route path="/rank" element={<Rank />} />
              <Route path="/cityscape" element={<Cityscape />} />
              <Route path="/streak" element={<Streak />} />
            </Routes>
          </main>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
}