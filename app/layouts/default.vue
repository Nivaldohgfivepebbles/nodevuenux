<template>
  <div class="flex min-h-screen flex-col bg-base-200">
    <AppNavbar />
    <main class="flex-1">
      <slot />
    </main>
    <AppFooter />
  </div>
</template>
