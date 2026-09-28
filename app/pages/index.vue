<script setup lang="ts">
useSeoMeta({
  title: 'Início · NodeVueNux',
  description: 'Página inicial da aplicação de estudo com Node.js, Vue 3 e Nuxt.'
})

const features = [
  {
    title: 'Node.js',
    badge: 'Runtime',
    description: 'Ambiente de execução JavaScript fora do navegador, com o npm gerenciando as dependências do projeto.'
  },
  {
    title: 'Vue 3',
    badge: 'UI',
    description: 'Componentes reativos com a Composition API: ref, reactive, computed e hooks de ciclo de vida.'
  },
  {
    title: 'Nuxt',
    badge: 'Framework',
    description: 'Roteamento baseado em arquivos na pasta pages/, renderização no servidor (SSR) e auto-imports.'
  }
]
</script>

<template>
  <div>
    <section class="hero bg-base-100 py-16">
      <div class="hero-content text-center">
        <div class="max-w-2xl">
          <h1 class="text-4xl font-bold md:text-5xl">Ecossistema JavaScript moderno</h1>
          <p class="py-6 text-lg">
            Uma aplicação Nuxt construída com Vue 3, estilizada com Tailwind CSS e daisyUI,
            rodando sobre Node.js.
          </p>
          <div class="flex flex-wrap justify-center gap-3">
            <NuxtLink to="/cadastro" class="btn btn-primary">Fazer cadastro</NuxtLink>
            <NuxtLink to="/sobre" class="btn btn-outline">Saiba mais</NuxtLink>
          </div>
        </div>
      </div>
    </section>

    <section class="mx-auto grid max-w-5xl gap-6 px-4 py-12 md:grid-cols-3">
      <FeatureCard v-for="feature in features" :key="feature.title" v-bind="feature" />
    </section>
  </div>
</template>
