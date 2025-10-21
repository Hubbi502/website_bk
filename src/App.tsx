import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Articles from "./pages/Articles";
import ArticleDetail from "./pages/ArticleDetail";
import Schedule from "./pages/Schedule";
import About from "./pages/About";
<<<<<<< HEAD
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
=======
>>>>>>> 27426c0ea16f5b1e5737c5e8b79a0fd5bcd19b96
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
          <Route path="/articles" element={<Articles />} />
          <Route path="/articles/:id" element={<ArticleDetail />} />
          <Route path="/schedule" element={<Schedule />} />
          <Route path="/about" element={<About />} />
<<<<<<< HEAD
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
=======
>>>>>>> 27426c0ea16f5b1e5737c5e8b79a0fd5bcd19b96
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
