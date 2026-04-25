'use client';

import { useTheme } from 'next-themes';
import { Button } from '../ui/button';
import { Moon, Sun } from 'lucide-react';
import { useEffect, useState } from 'react';

const Header = () => {
  const { theme, setTheme } = useTheme();

  const [isClient, setIsClient] = useState<boolean>(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <header className="flex p-4">
      <Button
        className="ml-auto"
        variant="ghost"
        size="icon"
        onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
      >
        {isClient ? (
          theme === 'light' ? (
            <Sun className="w-4 h-4" />
          ) : (
            <Moon className="w-4 h-4" />
          )
        ) : (
          <span className="w-4 h-4"></span>
        )}
      </Button>
    </header>
  );
};

export default Header;
