import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Menu, Sparkles, User, History, LogOut, Info } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navbar = () => {
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    toast({
      title: "Logged out",
      description: "You have been logged out successfully",
    });
    navigate("/");
  };

  const isAuthenticated = !!user;
  const isHomePage = location.pathname === "/";

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white/10 backdrop-blur-md border-b border-white/20 shadow-sm">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        {/* Logo and Mobile Sheet */}
        <div className="flex items-center gap-3">
          <Sheet>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[240px] sm:w-[300px]">
              <div className="flex flex-col gap-4 py-4">
                <a href="/" className="text-lg font-semibold">LexiFlow</a>
                <div className="flex flex-col space-y-2">
                  <a href="/about" className="flex items-center gap-2 text-muted-foreground hover:text-foreground">
                    <Info className="h-4 w-4" /> About Developer
                  </a>
                  {isAuthenticated ? (
                    <>
                      <a href="/dashboard" className="flex items-center gap-2 text-muted-foreground hover:text-foreground">
                        <Sparkles className="h-4 w-4" /> Generate
                      </a>
                      <a href="/history" className="flex items-center gap-2 text-muted-foreground hover:text-foreground">
                        <History className="h-4 w-4" /> History
                      </a>
                      <button onClick={handleLogout} className="flex items-center gap-2 text-muted-foreground hover:text-foreground">
                        <LogOut className="h-4 w-4" /> Logout
                      </button>
                    </>
                  ) : (
                    <>
                      <a href="/login">Login</a>
                      <a href="/signup">Sign Up</a>
                    </>
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>

          {/* Brand for desktop */}
          <a href="/" className="hidden lg:flex items-center gap-2">
            <Sparkles className="h-6 w-6 text-yellow-400 animate-pulse" />
            <span className="text-xl font-bold text-white">LexiFlow</span>
          </a>
        </div>

        {/* Center Nav for Desktop */}
        <div className="hidden gap-6 lg:flex">
          <a
            href="/"
            className={`text-sm font-medium hover:text-primary transition-colors ${
              isHomePage ? "text-white" : "text-white/70"
            }`}
          >
            Home
          </a>
          <a
            href="/about"
            className={`text-sm font-medium hover:text-primary transition-colors ${
              location.pathname === "/about" ? "text-white" : "text-white/70"
            }`}
          >
            About Developer
          </a>
          {isAuthenticated && (
            <>
              <a
                href="/dashboard"
                className={`text-sm font-medium hover:text-primary transition-colors ${
                  location.pathname === "/dashboard" ? "text-white" : "text-white/70"
                }`}
              >
                Generate
              </a>
              <a
                href="/history"
                className={`text-sm font-medium hover:text-primary transition-colors ${
                  location.pathname === "/history" ? "text-white" : "text-white/70"
                }`}
              >
                History
              </a>
            </>
          )}
        </div>

        {/* User Controls */}
        <div className="flex items-center gap-4">
          {isAuthenticated ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <User className="h-5 w-5 text-white" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <a href="/dashboard">Generate</a>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <a href="/history">History</a>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <a href="/about">About Developer</a>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <a href="/login">Login</a>
              </Button>
              <Button size="sm">
                <a href="/signup">Sign Up</a>
              </Button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
