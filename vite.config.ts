import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
// import { visualizer } from 'rollup-plugin-visualizer'
// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    // visualizer({
    //   open: true, // esto abre el navegador automáticamente
    //   filename: 'stats.html', // nombre del archivo que genera
    //   gzipSize: true, // mostrar tamaño gzip
    //   brotliSize: true // mostrar tamaño brotli
    // })
  ]
})
// Se puede usar Rollup para ver en el navegador los archivos del build