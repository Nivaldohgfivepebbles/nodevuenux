<script setup lang="ts">
const links = [
  { to: '/', label: 'Início' },
  { to: '/sobre', label: 'Sobre' },
  { to: '/cadastro', label: 'Cadastro' }
]
</script>

<template>
  <header class="navbar sticky top-0 z-10 bg-base-100 px-4 shadow-sm">
    <div class="navbar-start">
      <div class="dropdown">
        <button tabindex="0" class="btn btn-ghost md:hidden" aria-label="Abrir menu">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        <ul tabindex="0" class="menu dropdown-content menu-sm z-20 mt-3 w-48 rounded-box bg-base-100 p-2 shadow">
          <li v-for="link in links" :key="link.to">
            <NuxtLink :to="link.to" active-class="menu-active">{{ link.label }}</NuxtLink>
          </li>
        </ul>
      </div>
      <NuxtLink to="/" class="btn btn-ghost text-xl font-bold">
        <span class="text-primary">Node</span><span class="text-success">Vue</span><span class="text-accent">Nux</span>
      </NuxtLink>
    </div>
    <nav class="navbar-end hidden md:flex">
      <ul class="menu menu-horizontal gap-1 px-1">
        <li v-for="link in links" :key="link.to">
          <NuxtLink :to="link.to" active-class="menu-active">{{ link.label }}</NuxtLink>
        </li>
      </ul>
    </nav>
  </header>
</template>
