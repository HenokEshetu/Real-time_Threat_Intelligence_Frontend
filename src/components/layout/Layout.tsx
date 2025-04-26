import React, { useState } from 'react';
import {
  LayoutDashboard,
  ShieldAlertIcon,
  BugIcon,
  FileTextIcon,
  LockIcon,
  UserIcon,
  SunIcon,
  MoonIcon,
  MenuIcon,
  XIcon,
  ChevronDown,
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
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { SearchBar } from '@/components/common/SearchBar';
import { Breadcrumb } from '@/components/ui/breadcrumb';
import { TopContainer } from '@/components/common/TopContainer';
import logo from '@/static/images/favicon.png';
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarProvider,
} from '../ui/sidebar';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '../ui/collapsible';

interface MenuItem {
  text: string;
  icon: React.ReactNode;
  path?: string;
  subItems?: MenuItem[];
}

const menuItems: MenuItem[] = [
  {
    text: 'Dashboard',
    icon: <LayoutDashboard className="h-5 w-5" />,
    path: '/',
  },
  {
    text: 'Observations',
    icon: <ShieldAlertIcon className="h-5 w-5" />,
    subItems: [
      {
        text: 'Indicators',
        icon: <ShieldAlertIcon className="h-5 w-5" />,
        path: '/indicators',
      },
      {
        text: 'Artifacts',
        icon: <LockIcon className="h-5 w-5" />,
        path: '/artifacts',
      },
    ],
  },
  {
    text: 'Threat Actors',
    icon: <LockIcon className="h-5 w-5" />,
    path: '/threat-actors',
  },
  { text: 'Malware', icon: <BugIcon className="h-5 w-5" />, path: '/malware' },
  {
    text: 'Reports',
    icon: <FileTextIcon className="h-5 w-5" />,
    path: '/reports',
  },
  {
    text: 'Identity',
    icon: <UserIcon className="h-5 w-5" />,
    path: '/identity',
  },
];

export const Layout = ({ children }: { children: React.ReactNode }) => {
  const { theme, setTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const [toogleDropdown, setToggleDropdown] = useState(false);

  const toggleTheme = () => setTheme(theme === 'dark' ? 'light' : 'dark');

  const handleDropdown = () => {
    setToggleDropdown(!toogleDropdown);
  };

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
          <div className="flex items-center w-180">
            <img src={logo} className="w-13 h-13 rounded-full" />
            <h1 className="text-5xl font-semibold hidden md:block ml-2">ዳጉ</h1>
            <SearchBar className="ml-18" />
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
        {/* Desktop Sidebar */}
        <aside className="hidden md:flex md:flex-col md:w-50 h-full fixed top-17 border-r bg-background pt-4">
          <SidebarProvider>
            {' '}
            {/* <-- wrap SidebarMenu with SidebarProvider */}
            <SidebarMenu>
              {menuItems.map((item) => (
                <Collapsible key={item.text} defaultOpen>
                  <SidebarMenuItem>
                    <CollapsibleTrigger asChild>
                      <SidebarMenuButton>
                        {item.path ? (
                          <Link
                            to={item.path}
                            className={cn(
                              'flex items-center w-full px-3 py-2 text-sm font-medium rounded-md text-left',
                              location.pathname === item.path
                                ? 'bg-primary/10 text-primary'
                                : 'text-muted-foreground hover:text-primary',
                            )}
                          >
                            <span className="mr-3">{item.icon}</span>
                            {item.text}
                          </Link>
                        ) : (
                          <button
                            className="flex items-center w-full px-3 py-2 text-sm font-medium rounded-md text-muted-foreground"
                            onClick={handleDropdown}
                          >
                            <span className="mr-3">{item.icon}</span>
                            {item.text}
                            {toogleDropdown ? (
                              <ChevronDown className="ml-auto h-4 w-4" />
                            ) : (
                              <ChevronDown className="ml-auto h-4 w-4 rotate-180" />
                            )}
                          </button>
                        )}
                      </SidebarMenuButton>
                    </CollapsibleTrigger>
                    {item.subItems && (
                      <CollapsibleContent className="transition-transform">
                        <SidebarMenuSub>
                          {item.subItems.map((sub) => (
                            <SidebarMenuSubItem key={sub.text}>
                              <Link
                                to={sub.path!}
                                className={cn(
                                  'flex items-center w-full px-3 py-2 text-sm font-medium rounded-md text-left pl-8',
                                  location.pathname === sub.path
                                    ? 'bg-primary/10 text-primary'
                                    : 'text-muted-foreground hover:text-primary',
                                )}
                              >
                                <span className="mr-3">{sub.icon}</span>
                                {sub.text}
                              </Link>
                            </SidebarMenuSubItem>
                          ))}
                        </SidebarMenuSub>
                      </CollapsibleContent>
                    )}
                  </SidebarMenuItem>
                </Collapsible>
              ))}
            </SidebarMenu>
          </SidebarProvider>
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
              <React.Fragment key={item.text}>
                {item.path && (
                  <Link
                    to={item.path}
                    className={cn(
                      'flex items-center px-3 py-2 text-sm font-medium rounded-md',
                      location.pathname === item.path
                        ? 'bg-primary/10 text-primary'
                        : 'text-muted-foreground hover:text-primary',
                    )}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <span className="mr-3">{item.icon}</span>
                    {item.text}
                  </Link>
                )}
                {item.subItems &&
                  item.subItems.map((sub) => (
                    <Link
                      key={sub.text}
                      to={sub.path!}
                      className={cn(
                        'flex items-center px-3 py-2 text-sm font-medium rounded-md pl-8',
                        location.pathname === sub.path
                          ? 'bg-primary/10 text-primary'
                          : 'text-muted-foreground hover:text-primary',
                      )}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <span className="mr-3">{sub.icon}</span>
                      {sub.text}
                    </Link>
                  ))}
              </React.Fragment>
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
