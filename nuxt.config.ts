// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  vite: {
    plugins: [tailwindcss()]
  },
  app: {
    head: {
      htmlAttrs: { lang: 'pt-BR' },
      title: 'NodeVueNux',
      meta: [
        { name: 'description', content: 'Aplicação de estudo com Node.js, Vue 3 e Nuxt, estilizada com Tailwind CSS e daisyUI.' }
      ]
    }
  }
})
