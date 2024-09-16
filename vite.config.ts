import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    outDir: 'dist', // Diretório de saída para o build
  },
  resolve: {
    extensions: ['.ts', '.js'],
  }
});