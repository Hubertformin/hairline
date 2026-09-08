import { defineConfig } from 'tsup';

export default defineConfig({
  entry: {
    index: 'src/index.ts',
    'tokens/index': 'src/tokens-entry.ts',
    'native/index': 'src/native/index.ts',
  },
  format: ['esm'],
  dts: true,
  clean: false,
  sourcemap: true,
  treeshake: true,
  external: ['react', 'react/jsx-runtime', 'react-native', '@hairline/tokens'],
});
