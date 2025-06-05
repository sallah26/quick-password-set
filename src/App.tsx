import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ResetPassword from "./pages/ResetPassword";
import AccountSetup from "./pages/AccountSetup";
import NotFound from "./pages/NotFound";
import { AuthProvider } from "./contests/AuthContext";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/account-setup" element={<AccountSetup />} />

          <Route
            path="/"
            element={
              <AuthProvider>
                <Index />
              </AuthProvider>
            }
          />
          <Route
            path="/login"
            element={
              <AuthProvider>
                <Login />
              </AuthProvider>
            }
          />
          <Route
            path="/register"
            element={
              <AuthProvider>
                <Register />
              </AuthProvider>
            }
          />
          <Route
            path="/reset-password"
            element={
              <AuthProvider>
                <ResetPassword />
              </AuthProvider>
            }
          />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
