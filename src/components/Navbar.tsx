import { Link, useLocation } from "react-router-dom";
<<<<<<< HEAD
import { Home, BookOpen, Calendar, Info, LayoutDashboard, LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

const Navbar = () => {
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  useEffect(() => {
    const checkAuth = () => {
      const adminData = localStorage.getItem("adminData");
      setIsLoggedIn(!!adminData);
    };
    
    checkAuth();
    // Check auth on location change
    window.addEventListener("storage", checkAuth);
    
    return () => window.removeEventListener("storage", checkAuth);
  }, [location]);
=======
import { Home, BookOpen, Calendar, Info } from "lucide-react";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const location = useLocation();
>>>>>>> 27426c0ea16f5b1e5737c5e8b79a0fd5bcd19b96
  
  const isActive = (path: string) => location.pathname === path;
  
  const navItems = [
    { path: "/", label: "Home", icon: Home },
    { path: "/articles", label: "Articles", icon: BookOpen },
    { path: "/schedule", label: "Counseling Schedule", icon: Calendar },
    { path: "/about", label: "About", icon: Info },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-card/95 backdrop-blur-sm border-b shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-lg">
              BK
            </div>
            <span className="text-xl font-semibold text-foreground">Sahabat BK</span>
          </Link>
          
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <Link key={item.path} to={item.path}>
                <Button
                  variant={isActive(item.path) ? "default" : "ghost"}
                  className="gap-2"
                >
                  <item.icon className="h-4 w-4" />
                  {item.label}
                </Button>
              </Link>
            ))}
<<<<<<< HEAD
            {isLoggedIn ? (
              <Link to="/dashboard">
                <Button
                  variant={isActive("/dashboard") ? "default" : "ghost"}
                  className="gap-2"
                >
                  <LayoutDashboard className="h-4 w-4" />
                  Dashboard
                </Button>
              </Link>
            ) : (
              <Link to="/login">
                <Button
                  variant={isActive("/login") ? "default" : "ghost"}
                  className="gap-2"
                >
                  <LogIn className="h-4 w-4" />
                  Login
                </Button>
              </Link>
            )}
=======
>>>>>>> 27426c0ea16f5b1e5737c5e8b79a0fd5bcd19b96
          </div>
          
          <div className="md:hidden flex items-center space-x-1">
            {navItems.map((item) => (
              <Link key={item.path} to={item.path}>
                <Button
                  variant={isActive(item.path) ? "default" : "ghost"}
                  size="icon"
                >
                  <item.icon className="h-5 w-5" />
                </Button>
              </Link>
            ))}
<<<<<<< HEAD
            {isLoggedIn ? (
              <Link to="/dashboard">
                <Button
                  variant={isActive("/dashboard") ? "default" : "ghost"}
                  size="icon"
                >
                  <LayoutDashboard className="h-5 w-5" />
                </Button>
              </Link>
            ) : (
              <Link to="/login">
                <Button
                  variant={isActive("/login") ? "default" : "ghost"}
                  size="icon"
                >
                  <LogIn className="h-5 w-5" />
                </Button>
              </Link>
            )}
=======
>>>>>>> 27426c0ea16f5b1e5737c5e8b79a0fd5bcd19b96
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
