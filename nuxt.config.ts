import tailwindcss from '@tailwindcss/vite';

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',

  vite: {
    plugins: [tailwindcss()],
    optimizeDeps: {
      include: ['vue', 'vue-router'],
    },
    experimental: {
      enableNativePlugin: true,
    },
    clearScreen: false,
    envPrefix: ['VITE_', 'TAURI_'],
    server: {
      strictPort: true,
    },
  },

  devtools: {
    enabled: true,
  },

  telemetry: {
    enabled: false,
  },

  ssr: false,

  ignore: ['**/src-tauri/**'],

  css: ['~/assets/css/main.css'],

  modules: [
    '@nuxt/eslint',
    '@nuxt/fonts',
    '@nuxtjs/color-mode',
    '@vueuse/nuxt',
    'shadcn-nuxt',
    'nuxt-lucide-icons',
  ],

  colorMode: {
    classSuffix: '',
    preference: 'dark',
    fallback: 'dark',
  },

  shadcn: {
    /**
     * Prefix for all the imported component
     */
    prefix: '',
    /**
     * Directory that the component lives in.
     * @default "./app/components/ui"
     */
    componentDir: './app/components/ui',
  },

  lucide: {
    namePrefix: 'Icon',
  },
});
