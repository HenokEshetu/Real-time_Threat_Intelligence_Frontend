import React, { useEffect, useState } from 'react';
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
  FingerprintIcon,
  Telescope,
  BinocularsIcon,
  Database,
  DatabaseIcon,
  GitBranchIcon,
  Sun,
  Moon,
  TargetIcon,
  MapPinIcon,
  GlobeIcon,
  BellIcon,
  Wrench,
  TriangleAlert,
  TrendingUp,
  SwordIcon,
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
import { useTheme } from 'next-themes';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { SearchBar } from '@/components/common/SearchBar';
import { Breadcrumb } from '@/components/ui/breadcrumb';
import { TopContainer } from '@/components/common/TopContainer';
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
import { useAuth } from '@/auth/AuthContext';
import { Loading } from '../common/Loading/Loading';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  AlertDialogPortal,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '../ui/alert-dialog';
import { Toaster } from 'sonner';

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
    icon: <Telescope className="h-5 w-5" />,
    subItems: [
      {
        text: 'Observables',
        icon: <BinocularsIcon className="h-5 w-5" />,
        path: '/observables',
      },
      {
        text: 'Indicators',
        icon: <FingerprintIcon className="h-5 w-5" />,
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
    text: 'Vulnerabilities',
    icon: <TriangleAlert className="h-5 w-5" />,
    path: '/vulnerabilities',
  },
  {
    text: 'Attack Patterns',
    icon: <TargetIcon className="h-5 w-5" />,
    path: '/attack-patterns',
  },
  // {
  //   text: 'Threat Actors',
  //   icon: <LockIcon className="h-5 w-5" />,
  //   path: '/threat-actors',
  // },
  { text: 'Malware', icon: <BugIcon className="h-5 w-5" />, path: '/malware' },
  {
    text: 'Reports',
    icon: <FileTextIcon className="h-5 w-5" />,
    path: '/reports',
  },
  {
    text: 'Campaigns',
    icon: <ShieldAlertIcon className="h-5 w-5" />,
    path: '/campaigns',
  },
  {
    text: 'Courses of Action',
    icon: <TrendingUp className="h-5 w-5" />,
    path: '/courseofaction',
  },
  {
    text: 'Intrusion Sets',
    icon: <SwordIcon className="h-5 w-5" />,
    path: '/intrusionsets',
  },
  {
    text: 'Identity',
    icon: <UserIcon className="h-5 w-5" />,
    path: '/identities',
  },
  {
    text: 'Tools',
    icon: <Wrench className="h-5 w-5" />,
    path: '/tools',
  },
  {
    text: 'Data',
    icon: <DatabaseIcon />,
    subItems: [
      {
        text: 'Relationships',
        icon: <GitBranchIcon />,
        path: '/relationships',
      },
    ],
  },
  {
    text: 'Location',
    icon: <GlobeIcon className="h-5 w-5" />,
    subItems: [
      {
        text: 'Regions',
        icon: <GlobeIcon className="h-5 w-5" />,
        path: '/locations/regions',
      },
      {
        text: 'Countries',
        icon: <GlobeIcon className="h-5 w-5" />,
        path: '/locations/countries',
      },
      {
        text: 'Cities',
        icon: <MapPinIcon className="h-5 w-5" />,
        path: '/locations/cities',
      },
    ],
  },
];

export const Layout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const { theme, setTheme } = useTheme();
  const { isAuthenticated, user, loading, logout } = useAuth();

  const [page, setPage] = useState(1);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [toogleDropdown, setToggleDropdown] = useState(true);
  const [isDashboard, setIsDashboard] = useState(false);
  // const {}

  useEffect(() => {
    setIsDashboard(location.pathname === '/');
  }, [location]);

  const handleDropdown = () => {
    setToggleDropdown(!toogleDropdown);
  };

  const handlePageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (!isNaN(Number(value))) {
      setPage(Number(value));
    } else {
      setPage(1);
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen flex flex-col">
      {isAuthenticated && (
        <>
          <header className="sticky top-0 z-1000 w-full h-17 border-b bg-background px-4 py-2 flex items-center justify-between">
            <Toaster position="top-right" richColors expand={true} />
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(true)}
            >
              <MenuIcon className="h-5 w-5" />
            </Button>
            <div className="flex items-center w-[33.3%]">
              {/* <div className="flex"> */}
              <img
                src="/src/static/images/favicon-2.png"
                alt=""
                className="w-13 h-13 rounded-full"
              />
              <h1 className="text-5xl font-semibold hidden md:block ml-2">
                ዳጉ
              </h1>
            </div>
            <div className="flex justify-center items-center w-[33.3%]">
              <SearchBar className="ml-18" />
            </div>
            <div className="flex justify-end items-center gap-2 w-[33.3%]">
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <BellIcon />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="!z-2000">
                  <DropdownMenuItem>
                    <div className="flex flex-col">
                      <span className="text-sm font-medium">Notifications</span>
                      <span className="text-xs text-muted-foreground">
                        No new notifications
                      </span>
                    </div>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link to="/notifications" className="w-full">
                      View All Notifications
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Link to="/settings" className="w-full">
                      Settings
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Link to="/help" className="w-full">
                      Help
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <Button variant="outline" size="icon">
                    <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                    <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                    <span className="sr-only">Toggle theme</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="z-2000">
                  <DropdownMenuItem onClick={() => setTheme('light')}>
                    Light
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setTheme('dark')}>
                    Dark
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setTheme('system')}>
                    System
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Profile dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="p-0 rounded-full focus-visible:ring-offset-0"
                  >
                    <Avatar className="h-8 w-8">
                      <AvatarImage alt={user?.email} />
                      <AvatarFallback>
                        {user?.email?.[0]?.toUpperCase() || 'U'}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent
                  className="w-56 z-2000"
                  align="end"
                  onCloseAutoFocus={(e) => e.preventDefault()}
                >
                  <DropdownMenuLabel>
                    <div className="flex flex-col">
                      <span className="text-sm font-medium">
                        {user?.email.split('@')[0] || 'Unknown User'}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {user?.email}
                      </span>
                    </div>
                  </DropdownMenuLabel>

                  <DropdownMenuSeparator />

                  <DropdownMenuItem asChild>
                    <Link to="/profile" className="w-full cursor-pointer">
                      Profile
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/settings" className="w-full cursor-pointer">
                      Settings
                    </Link>
                  </DropdownMenuItem>

                  <DropdownMenuSeparator />
                  {isAuthenticated && (
                    <AlertDialog>
                      <AlertDialogTrigger className="w-full">
                        <DropdownMenuItem
                          className="text-destructive focus:bg-destructive/10 cursor-pointer"
                          onSelect={(e) => e.preventDefault()}
                        >
                          Logout
                        </DropdownMenuItem>
                      </AlertDialogTrigger>

                      <AlertDialogPortal>
                        <AlertDialogOverlay className="z-[9999] bg-black/50" />
                        <AlertDialogContent className="z-[10000]">
                          <AlertDialogHeader>
                            <AlertDialogTitle>Confirm Logout</AlertDialogTitle>
                            <AlertDialogDescription>
                              Are you sure you want to log out? You'll need to
                              sign in again to access your account.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={() => logout()}>
                              Yes, log me out
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialogPortal>
                    </AlertDialog>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </header>

          {!isDashboard && (
            <TopContainer className="h-8">
              <TopBreadcrumb />
            </TopContainer>
          )}
        </>
      )}

      <div className="flex flex-1">
        {/* Desktop Sidebar */}
        {isAuthenticated && (
          <aside className="hidden md:flex md:flex-col md:w-[var(--sidebar-width)] h-full fixed top-17 border-r bg-background pt-4">
            <SidebarProvider>
              <SidebarMenu>
                {menuItems.map((item) =>
                  item.subItems ? (
                    <Collapsible key={item.text} className="group">
                      <SidebarMenuItem>
                        <CollapsibleTrigger asChild>
                          <SidebarMenuButton className="flex items-center w-full px-3 py-2 text-sm font-medium rounded-md text-muted-foreground hover:text-primary">
                            <span className="mr-3">{item.icon}</span>
                            {item.text}
                            <ChevronDown
                              className="ml-auto h-4 w-4 transition-transform 
                         group-data-[state=open]:rotate-180"
                            />
                          </SidebarMenuButton>
                        </CollapsibleTrigger>
                        <CollapsibleContent>
                          <SidebarMenuSub className="!p-0">
                            {item.subItems.map((sub) => (
                              <SidebarMenuSubItem
                                key={sub.text}
                                className="data-[state=open]:bg-transparent"
                              >
                                <Link
                                  to={sub.path!}
                                  className={cn(
                                    'flex items-center w-full px-3 py-2 text-sm font-medium rounded-md pl-5 data-[state=active]:text-gray-950',
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
                      </SidebarMenuItem>
                    </Collapsible>
                  ) : (
                    <SidebarMenuItem key={item.text}>
                      <Link
                        to={item.path!}
                        className={cn(
                          'flex items-center w-full px-3 py-2 text-sm font-medium rounded-md',
                          location.pathname === item.path
                            ? 'bg-primary/10 text-primary'
                            : 'text-muted-foreground hover:text-primary',
                        )}
                      >
                        <span className="mr-3">{item.icon}</span>
                        {item.text}
                      </Link>
                    </SidebarMenuItem>
                  ),
                )}
              </SidebarMenu>
            </SidebarProvider>
          </aside>
        )}

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
        <main
          className={`flex justify-center w-full h-full ${
            isAuthenticated ? 'md:pl-[var(--sidebar-width)]' : ''
          }`}
        >
          {children}
        </main>
      </div>
    </div>
  );
};
