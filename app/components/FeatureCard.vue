<script setup lang="ts">
defineProps<{
  title: string
  description: string
  badge: string
}>()
</script>

<template>
  <div class="card bg-base-100 shadow-md transition hover:-translate-y-1 hover:shadow-xl">
    <div class="card-body">
      <h2 class="card-title">
        {{ title }}
        <span class="badge badge-primary badge-sm">{{ badge }}</span>
      </h2>
      <p>{{ description }}</p>
    </div>
  </div>
</template>
