import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

import type { NextConfig } from 'next';

/* There is an unrelated pnpm-lock.yaml in $HOME, and Next picks the outermost
   lockfile it can find as the workspace root. Left alone it traces files from the
   home directory, which makes the deployed bundle wrong. */
const workspaceRoot = resolve(dirname(fileURLToPath(import.meta.url)), '../..');

const config: NextConfig = {
  outputFileTracingRoot: workspaceRoot,
  async headers() {
    return [
      {
        // The registry is fetched by the shadcn CLI from anywhere, including other
        // people's machines and CI, so it has to be readable cross-origin.
        source: '/r/:path*',
        headers: [
          { key: 'Access-Control-Allow-Origin', value: '*' },
          { key: 'Cache-Control', value: 'public, max-age=0, s-maxage=3600, stale-while-revalidate=86400' },
        ],
      },
    ];
  },
};

export default config;
