'use client';

import { useTheme } from 'next-themes';
import { Button } from '../ui/button';
import { Moon, Sun } from 'lucide-react';
import { useSyncExternalStore } from 'react';

const Header = () => {
  const { theme, setTheme } = useTheme();
  const isMounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );

  return (
    <header className="flex p-4">
      <Button
        className="ml-auto"
        variant="ghost"
        size="icon"
        onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
      >
        {isMounted && theme === 'light' ? (
          <Sun className="w-4 h-4" />
        ) : (
          <Moon className="w-4 h-4" />
        )}
      </Button>
    </header>
  );
};

export default Header;
