<script setup lang="ts">
import { RouterView } from "vue-router";
import DefaultLayout from "./layouts/DefaultLayout.vue";
import AppSidebar from "./components/AppSidebar.vue";
</script>

<template>
  <DefaultLayout>
    <template #sidebar>
      <AppSidebar />
    </template>

    <template #default>
      <RouterView v-slot="{ Component }">
        <Transition name="fade" mode="out-in" appear>
          <component :is="Component" />
        </Transition>
      </RouterView>
    </template>
  </DefaultLayout>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
