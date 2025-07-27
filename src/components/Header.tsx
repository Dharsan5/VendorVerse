import React, { useState } from 'react';
import { Menu, Bell, Mic, Globe, User, Wifi, WifiOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface HeaderProps {
  language: string;
  setLanguage: (lang: string) => void;
  isOnline: boolean;
  hasNotifications: boolean;
}

const languages = {
  en: 'English',
  hi: 'हिंदी',
  ta: 'தமிழ்',
  te: 'తెలుగు',
  kn: 'ಕನ್ನಡ',
  mr: 'मराठी'
};

export default function Header({ language, setLanguage, isOnline, hasNotifications }: HeaderProps) {
  const [showLanguageMenu, setShowLanguageMenu] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-5 w-5" />
          </Button>
          <div className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center">
              <span className="text-white font-bold text-sm">V</span>
            </div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-green-600 to-green-700 bg-clip-text text-transparent">
              VendorConnect
            </h1>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          {/* Online/Offline Status */}
          <div className="hidden sm:flex items-center space-x-2">
            {isOnline ? (
              <Wifi className="h-4 w-4 text-green-500" />
            ) : (
              <WifiOff className="h-4 w-4 text-destructive" />
            )}
            <Badge variant={isOnline ? "default" : "destructive"} className="text-xs">
              {isOnline ? 'Online' : 'Offline'}
            </Badge>
          </div>

          {/* Notifications */}
          <Button variant="ghost" size="icon" className="relative">
            <Bell className={`h-5 w-5 ${hasNotifications ? 'text-orange-500' : 'text-muted-foreground'}`} />
            {hasNotifications && (
              <div className="absolute -top-1 -right-1 h-3 w-3 bg-destructive rounded-full animate-pulse"></div>
            )}
          </Button>

          {/* Language Selector */}
          <div className="relative">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowLanguageMenu(!showLanguageMenu)}
              className="gap-2"
            >
              <Globe className="h-4 w-4" />
              <span className="hidden sm:inline">
                {languages[language as keyof typeof languages]}
              </span>
            </Button>

            {showLanguageMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-popover rounded-lg shadow-lg border z-50 py-1">
                {Object.entries(languages).map(([code, name]) => (
                  <button
                    key={code}
                    onClick={() => {
                      setLanguage(code);
                      setShowLanguageMenu(false);
                    }}
                    className={`w-full text-left px-4 py-2 text-sm hover:bg-accent transition-colors ${
                      language === code ? 'bg-accent text-accent-foreground font-medium' : ''
                    }`}
                  >
                    {name}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Profile */}
          <Button variant="ghost" size="icon" className="rounded-full">
            <div className="h-8 w-8 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center">
              <User className="h-4 w-4 text-white" />
            </div>
          </Button>
        </div>
      </div>
    </header>
  );
}