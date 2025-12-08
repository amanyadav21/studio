
"use client";

import {
  LayoutGrid,
  List,
  Package,
  Search,
  Loader2,
  User,
  LogOut,
} from "lucide-react";
import toast from "react-hot-toast";
import * as React from "react";
import Link from "next/link";
import { usePathname } from 'next/navigation';
import { useAuth } from '@/contexts/auth-context';
import { AuthModal } from '@/components/auth-modal';

import { Input } from "@/components/ui/input";
import { AppLogo } from "@/components/icons";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { ColorPicker } from "@/components/color-picker";
import { Kbd } from "@/components/ui/kbd";
import { cn } from "@/lib/utils";

interface HeaderProps {
  searchTerm?: string;
  onSearchTermChange?: (term: string) => void;
  cardColor?: string | null;
  onCardColorChange?: (color: string) => void;
  onClearCardColor?: () => void;
  viewMode?: 'grid' | 'list';
  onViewModeChange?: (mode: 'grid' | 'list') => void;
  isSearching?: boolean;
}

function Header({
  searchTerm,
  onSearchTermChange,
  cardColor,
  onCardColorChange,
  onClearCardColor,
  viewMode,
  onViewModeChange,
  isSearching,
}: HeaderProps) {
  const searchInputRef = React.useRef<HTMLInputElement>(null);
  const pathname = usePathname();
  const isHomePage = pathname === '/';
  const isPackagesPage = pathname.startsWith('/packages');
  const { user, loading, logout } = useAuth();
  const [authModalOpen, setAuthModalOpen] = React.useState(false);
  const [authMode, setAuthMode] = React.useState<'signin' | 'signup'>('signin');

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const handleViewChange = (newView: 'grid' | 'list') => {
    if (isHomePage) {
      onViewModeChange?.(newView);
    } else {
      // Redirect to home and set the view mode
      const url = new URL(window.location.origin);
      url.searchParams.set('view', newView);
      window.location.href = url.toString();
    }
  };

  const handleSignIn = () => {
    setAuthMode('signin');
    setAuthModalOpen(true);
  };

  const handleSignUp = () => {
    setAuthMode('signup');
    setAuthModalOpen(true);
  };

  const handleLogout = async () => {
    try {
      await logout();
      toast.success('Signed out successfully!');
    } catch (error) {
      toast.error('Failed to sign out');
    }
  };

  const showSearch = onSearchTermChange !== undefined;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/95 backdrop-blur-xl supports-[backdrop-filter]:bg-background/90 shadow-sm">
      {/* Parent Div with Full Width and Space Between */}
      <div className="w-full flex h-16 items-center justify-between px-4 sm:px-6">
        
        {/* Left Child Div - Logo & Name */}
        <div className="flex items-center">
          <Link href="/" className="flex items-center gap-3 transition-all duration-200 hover:opacity-90 rounded-lg p-2 -m-2">
            <img 
              src="/logo/coderkart-black.png" 
              alt="Coderkart" 
              className="h-8 w-8 block dark:hidden" 
            />
            <img 
              src="/logo/coderkart-white.png" 
              alt="Coderkart" 
              className="h-8 w-8 hidden dark:block" 
            />
            <span className="font-semibold text-xl tracking-tight bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              Coderkart
            </span>
          </Link>
        </div>

        {/* Center Child Div - Search & Grid/List */}
        <div className="flex items-center gap-3">
          {/* Search Bar */}
          {showSearch && (
            <div className="relative">
                {isSearching ? (
                  <Loader2 className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-outline animate-spin" />
                ) : (
                  <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-outline" />
                )}
                <Input
                  ref={searchInputRef}
                  type="search"
                  placeholder="Search tools..."
                  className="h-11 w-80 pl-12 pr-16 rounded-full border border-border bg-muted/50 transition-all duration-200 focus:bg-background focus:border-primary hover:bg-muted/70"
                  value={searchTerm || ""}
                  onChange={(e) => onSearchTermChange?.(e.target.value)}
                />
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                  <Kbd className="bg-muted text-muted-foreground text-xs px-1.5 py-0.5 rounded">⌘K</Kbd>
                </div>
            </div>
          )}
          
          {/* Grid & List Buttons */}
          <div className="flex items-center gap-1 rounded-full bg-muted/60 p-1">
            <Button
                variant={isHomePage && viewMode === 'grid' ? 'filled' : 'ghost'}
                size="sm"
                className={cn(
                  "px-4 py-1.5 font-medium transition-all duration-200",
                  isHomePage && viewMode === 'grid' && "bg-background shadow-sm"
                )}
                onClick={() => handleViewChange('grid')}
            >
                <LayoutGrid className="mr-2 h-4 w-4" />
                Grid
            </Button>
            <Button
                variant={isHomePage && viewMode === 'list' ? 'filled' : 'ghost'}
                size="sm"
                className={cn(
                  "px-4 py-1.5 font-medium transition-all duration-200",
                  isHomePage && viewMode === 'list' && "bg-background shadow-sm"
                )}
                onClick={() => handleViewChange('list')}
            >
                <List className="mr-2 h-4 w-4" />
                List
            </Button>
          </div>
        </div>

        {/* Right Child Div - Auth, Color & Theme Controls */}
        <div className="flex items-center gap-3">
          {/* Auth Buttons */}
          {!loading && (
            <div className="flex items-center gap-2">
              {user ? (
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-muted/40">
                    <User className="h-4 w-4" />
                    <span className="text-sm font-medium hidden sm:inline-block">
                      {user.email?.split('@')[0]}
                    </span>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleLogout}
                    className="px-3 py-1.5 h-auto"
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    <span className="hidden sm:inline">Sign Out</span>
                  </Button>
                </div>
              ) : (
                <div className="flex items-center gap-1 rounded-full bg-muted/40 p-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleSignIn}
                    className="px-3 py-1.5 font-medium transition-all duration-200"
                  >
                    Sign In
                  </Button>
                  <Button
                    variant="filled"
                    size="sm"
                    onClick={handleSignUp}
                    className="px-3 py-1.5 font-medium transition-all duration-200"
                  >
                    Sign Up
                  </Button>
                </div>
              )}
            </div>
          )}
          
          <div className="flex items-center gap-1 rounded-full bg-muted/40 p-1">
            <ColorPicker
                selectedColor={cardColor ?? null}
                onColorChange={onCardColorChange}
                onClear={onClearCardColor}
            />
            <ThemeToggle />
          </div>
          
          {/* Mobile Navigation */}
          <div className="flex md:hidden items-center gap-1 ml-2">
            <Button
              variant={isHomePage && viewMode === 'grid' ? 'secondary' : 'ghost'}
              size="sm"
              className="p-2"
              onClick={() => handleViewChange('grid')}
            >
              <LayoutGrid className="h-4 w-4" />
            </Button>
            <Button
              variant={isHomePage && viewMode === 'list' ? 'secondary' : 'ghost'}
              size="sm"
              className="p-2"
              onClick={() => handleViewChange('list')}
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
      
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        initialMode={authMode}
      />
    </header>
  );
}

export default React.memo(Header);
