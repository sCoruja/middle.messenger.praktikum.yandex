import { resolve } from 'path';
import { defineConfig } from 'vite';
import handlebars from 'vite-plugin-handlebars';

export default defineConfig({
  root: resolve(__dirname, 'src'),
  build: {
    outDir: resolve(__dirname, 'dist'),
    rollupOptions: {
      input: {
        index: resolve(__dirname, 'src/index.html'),
        signin: resolve(__dirname, 'src/pages/signin.html'),
        signup: resolve(__dirname, 'src/pages/signup.html'),
        error: resolve(__dirname, 'src/pages/error.html'),
        main: resolve(__dirname, 'src/pages/main.html'),
        profile: resolve(__dirname, 'src/pages/profile.html'),
      },
    },
  },
  plugins: [handlebars(),
  ],

});
