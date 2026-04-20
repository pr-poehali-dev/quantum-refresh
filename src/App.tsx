import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Results from "./pages/Results";
import Olympiads from "./pages/Olympiads";
import Courses from "./pages/Courses";
import ProfileStudent from "./pages/ProfileStudent";
import ProfileTeacher from "./pages/ProfileTeacher";
import ProfileParent from "./pages/ProfileParent";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/results" element={<Results />} />
          <Route path="/olympiads" element={<Olympiads />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/profile/student" element={<ProfileStudent />} />
          <Route path="/profile/teacher" element={<ProfileTeacher />} />
          <Route path="/profile/parent" element={<ProfileParent />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
