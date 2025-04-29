
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import { NavLink } from 'react-router-dom';

// Import Icons
import {
  ChevronLeft,
  ChevronRight,
  Car,
  FileText,
  User,
  DollarSign,
  ChartBar,
  Settings,
  LogOut,
  Menu,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import LanguageSwitcher from '@/components/LanguageSwitcher';

interface NavItemProps {
  to: string;
  icon: React.ReactNode;
  label: string;
  isCollapsed: boolean;
}

const NavItem = ({ to, icon, label, isCollapsed }: NavItemProps) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) => cn(
        "flex items-center gap-2 px-3 py-2 rounded-md transition-colors",
        "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
        isActive ? "bg-sidebar-accent text-sidebar-accent-foreground" : "text-sidebar-foreground",
        isCollapsed ? "justify-center" : ""
      )}
    >
      <div className="flex-shrink-0 w-5 h-5">{icon}</div>
      {!isCollapsed && <span>{label}</span>}
    </NavLink>
  );
};

export default function Sidebar() {
  const { t, direction } = useLanguage();
  const { user, logout } = useAuth();
  const isMobile = useIsMobile();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  // Handle sidebar toggle
  const toggleSidebar = () => {
    if (isMobile) {
      setIsMobileOpen(!isMobileOpen);
    } else {
      setIsCollapsed(!isCollapsed);
    }
  };

  // Handle sidebar close on mobile
  const closeMobileSidebar = () => {
    if (isMobile && isMobileOpen) {
      setIsMobileOpen(false);
    }
  };

  // Determine if sidebar should be visible
  const isVisible = !isMobile || isMobileOpen;

  return (
    <>
      {/* Mobile overlay */}
      {isMobile && isMobileOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40" 
          onClick={closeMobileSidebar}
        />
      )}

      {/* Mobile toggle button */}
      {isMobile && (
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleSidebar}
          className="fixed top-4 left-4 z-50 md:hidden"
        >
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      )}

      {/* Sidebar */}
      <aside 
        className={cn(
          "bg-sidebar fixed top-0 bottom-0 border-r border-border flex flex-col z-40 transition-all duration-300",
          isCollapsed ? "w-16" : "w-64",
          isMobile ? (isMobileOpen ? "left-0" : "-left-full") : "left-0",
          direction === 'rtl' ? (isMobile ? (isMobileOpen ? "right-0" : "-right-full") : "right-0") : ""
        )}
      >
        {/* Logo and collapse button */}
        <div className="flex items-center justify-between p-4 border-b border-border h-16">
          {!isCollapsed && (
            <div className="font-bold text-lg text-sidebar-foreground">RentSmart</div>
          )}
          {!isMobile && (
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleSidebar}
              className={cn(!isCollapsed && "ml-auto")}
            >
              {direction === 'rtl' ? (
                isCollapsed ? <ChevronLeft className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />
              ) : (
                isCollapsed ? <ChevronRight className="h-5 w-5" /> : <ChevronLeft className="h-5 w-5" />
              )}
            </Button>
          )}
        </div>

        {/* User profile */}
        {user && (
          <div className={cn(
            "flex items-center px-4 py-3 border-b border-border",
            isCollapsed ? "justify-center" : "gap-3"
          )}>
            <Avatar className="h-10 w-10">
              <AvatarImage src={user.avatar} alt={user.name} />
              <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
            </Avatar>
            {!isCollapsed && (
              <div className="flex flex-col">
                <span className="font-medium text-sm text-sidebar-foreground">{user.name}</span>
                <span className="text-xs text-sidebar-foreground/70 capitalize">{user.role}</span>
              </div>
            )}
          </div>
        )}

        {/* Navigation */}
        <nav className="flex-1 py-4 overflow-y-auto">
          <div className="space-y-1 px-2">
            <NavItem to="/" icon={<ChartBar className="w-5 h-5" />} label={t('dashboard')} isCollapsed={isCollapsed} />
            <NavItem to="/vehicles" icon={<Car className="w-5 h-5" />} label={t('vehicles')} isCollapsed={isCollapsed} />
            <NavItem to="/contracts" icon={<FileText className="w-5 h-5" />} label={t('contracts')} isCollapsed={isCollapsed} />
            <NavItem to="/customers" icon={<User className="w-5 h-5" />} label={t('customers')} isCollapsed={isCollapsed} />
            <NavItem to="/finances" icon={<DollarSign className="w-5 h-5" />} label={t('finances')} isCollapsed={isCollapsed} />
            <NavItem to="/reports" icon={<ChartBar className="w-5 h-5" />} label={t('reports')} isCollapsed={isCollapsed} />
            <NavItem to="/settings" icon={<Settings className="w-5 h-5" />} label={t('settings')} isCollapsed={isCollapsed} />
          </div>
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-border">
          <div className={cn("flex items-center", isCollapsed ? "justify-center" : "justify-between")}>
            {!isCollapsed && <LanguageSwitcher />}
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={logout}
              title={t('logout')}
            >
              <LogOut className="h-5 w-5" />
              <span className="sr-only">{t('logout')}</span>
            </Button>
          </div>
        </div>
      </aside>
    </>
  );
}
