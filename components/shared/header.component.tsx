'use client';

import { useTheme } from 'next-themes';
import { Button } from '../ui/button';
import { Moon, Sun } from 'lucide-react';

const Header = () => {
  const { theme, setTheme } = useTheme();

  return (
    <header className="flex p-4">
      <Button
        className="ml-auto"
        variant="ghost"
        size="icon"
        onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
        suppressHydrationWarning
      >
        {theme === 'light' ? (
          <Sun className="w-4 h-4" />
        ) : (
          <Moon className="w-4 h-4" />
        )}
      </Button>
    </header>
  );
};

export default Header;
