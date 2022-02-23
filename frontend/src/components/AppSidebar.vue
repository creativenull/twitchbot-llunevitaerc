<script setup lang="ts">
const sidebarRoutes = [
  {
    text: "Home",
    to: "/",
  },
  {
    text: "Commands",
    to: "/commands/all",
  },
  {
    text: "Timers Commands",
    to: "/commands/timers",
  },
  {
    text: "Add a Command",
    to: "/commands/add",
  },
];
</script>

<template>
  <ul class="text-2xl">
    <li v-for="route in sidebarRoutes" :key="route.text" class="py-4">
      <RouterLink :to="route.to" class="hover:text-purple-500 hover:underline">
        {{ route.text }}
      </RouterLink>
    </li>
  </ul>
</template>
