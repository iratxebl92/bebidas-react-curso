import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react-swc'
// import { visualizer } from 'rollup-plugin-visualizer'
// https://vite.dev/config/
export default defineConfig({
  test:{
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/setupTest.ts'],
    coverage: {
        exclude: [
            '**/*.config.ts',
            '**/*.config.js',
            '**/*.types.ts',
            '**/*.d.ts',
            '**/types',
            '**/App.tsx',
            '**/main.tsx',
        ], //excluyes de los test
        thresholds: {
         functions: 80,
        }
    }
},
  plugins: [
    react(),
    // visualizer({
    //   open: true, // esto abre el navegador automáticamente
    //   filename: 'stats.html', // nombre del archivo que genera
    //   gzipSize: true, // mostrar tamaño gzip
    //   brotliSize: true // mostrar tamaño brotli
    // })
  ],
  
})
// Se puede usar Rollup para ver en el navegador los archivos del build