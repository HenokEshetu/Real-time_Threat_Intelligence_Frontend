import {
  LayoutDashboard,
  ShieldAlertIcon,
  BugIcon,
  FileTextIcon,
  LockIcon,
  SunIcon,
  MoonIcon,
  MenuIcon,
  XIcon,
  UserIcon, // Use UserIcon instead of PersonIcon
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { TopBreadcrumb } from '@/components/common/Breadcrumb';
import { useTheme } from '@/components/ui/theme-provider';
import { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import React from 'react';
import { SearchBar } from '@/components/common/SearchBar';
import { Breadcrumb } from '@/components/ui/breadcrumb';
import { TopContainer } from '@/components/common/TopContainer';
import logo from '@/static/images/favicon.png';

const menuItems = [
  {
    text: 'Dashboard',
    icon: <LayoutDashboard className="h-5 w-5" />,
    path: '/',
  },
  {
    text: 'Threat Actors',
    icon: <LockIcon className="h-5 w-5" />,
    path: '/threat-actors',
  },
  {
    text: 'Indicators',
    icon: <ShieldAlertIcon className="h-5 w-5" />,
    path: '/indicators',
  },
  { text: 'Malware', icon: <BugIcon className="h-5 w-5" />, path: '/malware' },
  {
    text: 'Reports',
    icon: <FileTextIcon className="h-5 w-5" />,
    path: '/reports',
  },
  {
    text: 'Artifacts',
    icon: <LockIcon className="h-5 w-5" />,
    path: '/artifacts',
  },
  {
    text: 'Identity',
    icon: <UserIcon className="h-5 w-5" />, // Use UserIcon here
    path: '/identity',
  },
];

export const Layout = ({ children }: { children: React.ReactNode }) => {
  const { theme, setTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const toggleTheme = () => setTheme(theme === 'dark' ? 'light' : 'dark');

  return (
    <div className="min-h-screen flex flex-col">
      {/* Top Navbar */}
      <header className="sticky top-0 z-40 w-full h-17 border-b bg-background px-4 py-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileMenuOpen(true)}
          >
            <MenuIcon className="h-5 w-5" />
          </Button>
          <div className="flex justify-between items-center w-180">
            <div className="flex justify-between items-center w-37">
              <img src={logo} className="w-13 h-13 rounded-full" />
              <h1 className="text-3xl font-semibold hidden md:block p-0">
                RtCTI
              </h1>
            </div>
            <SearchBar />
          </div>
          <Breadcrumb className="hidden md:flex ml-4" />
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={toggleTheme}>
            {theme === 'dark' ? (
              <SunIcon className="h-5 w-5" />
            ) : (
              <MoonIcon className="h-5 w-5" />
            )}
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="rounded-full h-8 w-8 p-0">
                <Avatar>
                  <AvatarImage src="" alt="user" />
                  <AvatarFallback>U</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end">
              <DropdownMenuLabel>
                <div className="flex flex-col">
                  <span className="text-sm font-medium">User Name</span>
                  <span className="text-xs text-muted-foreground">
                    user@example.com
                  </span>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link to="/profile">Profile</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/settings">Settings</Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-destructive">
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>
      <TopContainer className="h-12">
        <TopBreadcrumb />
      </TopContainer>

      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="hidden md:flex md:flex-col md:w-50 h-full fixed top-17 border-r bg-background pt-4">
          <nav className="space-y-1 px-2">
            {menuItems.map((item) => (
              <Link
                key={item.text}
                to={item.path}
                className={cn(
                  'flex items-center px-3 py-2 text-sm font-medium rounded-md',
                  'hover:bg-accent hover:text-accent-foreground transition-colors',
                  location.pathname === item.path
                    ? 'bg-primary/10 text-primary'
                    : 'text-muted-foreground hover:text-primary',
                )}
              >
                <span className="mr-3">{item.icon}</span>
                {item.text}
              </Link>
            ))}
          </nav>
        </aside>

        {/* Mobile Sidebar */}
        <div
          className={cn(
            'md:hidden fixed inset-0 z-50 transition-transform bg-background w-64',
            mobileMenuOpen ? 'translate-x-0' : '-translate-x-full',
          )}
        >
          <div className="flex items-center justify-between h-16 px-4 border-b">
            <h1 className="text-lg font-semibold">CTI Platform</h1>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMobileMenuOpen(false)}
            >
              <XIcon className="h-5 w-5" />
            </Button>
          </div>
          <nav className="space-y-1 px-2 py-4">
            {menuItems.map((item) => (
              <Link
                key={item.text}
                to={item.path}
                className={cn(
                  'flex items-center px-3 py-2 text-sm font-medium rounded-md',
                  'hover:bg-accent hover:text-accent-foreground transition-colors',
                  location.pathname === item.path
                    ? 'bg-primary/10 text-primary'
                    : 'text-muted-foreground hover:text-primary',
                )}
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="mr-3">{item.icon}</span>
                {item.text}
              </Link>
            ))}
          </nav>
        </div>

        {/* Page Content */}
        <main className="flex justify-center w-full h-full md:pl-50">
          {children}
        </main>
      </div>
    </div>
  );
};
