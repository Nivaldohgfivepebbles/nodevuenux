<script setup lang="ts">
useSeoMeta({
  title: 'Sobre · NodeVueNux',
  description: 'Como a aplicação foi construída e como a estrutura de diretórios do Nuxt está organizada.'
})

const structure = [
  { path: 'app/pages/', info: 'Cada arquivo vira uma rota automaticamente.' },
  { path: 'app/components/', info: 'Componentes Vue importados automaticamente.' },
  { path: 'app/layouts/', info: 'Estrutura compartilhada entre páginas (navbar e rodapé).' },
  { path: 'app/assets/', info: 'CSS processado pelo Vite (Tailwind + daisyUI).' },
  { path: 'public/', info: 'Arquivos estáticos servidos como estão.' }
]
</script>

<template>
  <div class="mx-auto max-w-3xl px-4 py-12">
    <h1 class="mb-4 text-3xl font-bold">Sobre o projeto</h1>
    <p class="mb-8">
      Este projeto foi criado com <code class="badge badge-ghost">npx nuxi init</code> e usa o
      roteamento baseado em arquivos do Nuxt. A navegação entre as páginas acontece no cliente (SPA),
      enquanto o primeiro carregamento é renderizado no servidor (SSR).
    </p>

    <div class="overflow-x-auto rounded-box bg-base-100 shadow">
      <table class="table">
        <thead>
          <tr>
            <th>Diretório</th>
            <th>Função</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in structure" :key="item.path">
            <td><code>{{ item.path }}</code></td>
            <td>{{ item.info }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
