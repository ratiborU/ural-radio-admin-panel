import { defineConfig } from 'vite'
// import dns from "dns"
import react from '@vitejs/plugin-react-swc'

// dns.setDefaultResultOrder('vebratim');

// https://vitejs.dev/config/
export default defineConfig({
  // allowedHosts: [".localhost"],
  // server: { https: true },
  // host: 'localhost',
  plugins: [react()],
  server: {
    host: 'localhost',
    port: 5173
  }
})
