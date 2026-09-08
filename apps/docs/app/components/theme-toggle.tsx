'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/registry/hairline/ui/button';

/** Flips `data-theme` on <html>, which is all the token layer needs to swap themes. */
export function ThemeToggle() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    document.documentElement.dataset.theme = dark ? 'dark' : 'light';
  }, [dark]);

  return (
    <Button tone="quiet" size="s" onClick={() => setDark((d) => !d)}>
      {dark ? 'Light' : 'Dark'}
    </Button>
  );
}
