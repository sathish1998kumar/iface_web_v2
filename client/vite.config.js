import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server:{
    port : 3000,
  },
  // resolve: {
  //   alias: {
  //     // Resolve issues with DataTables
  //     'datatables.net-dt/css/jquery.dataTables.css': 'datatables.net-dt/css/jquery.dataTables.min.css',
  //   },
  // },
  // css: {
  //   preprocessorOptions: {
  //     css: {
  //       includePaths: ['node_modules'],
  //     },
  //   },
  // },
})
