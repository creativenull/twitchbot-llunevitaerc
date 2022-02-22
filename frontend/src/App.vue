<script setup lang="ts">
import { RouterView } from "vue-router";
</script>

<template>
  <div class="w-full">
    <div class="flex">
      <div class="sidebar p-2">
        <ul>
          <li>Show questions</li>
          <li>Commands</li>
          <li>Timer Commands</li>
          <li>Add a Command</li>
        </ul>
      </div>

      <div class="main p-2">
        <RouterView />
      </div>
    </div>
  </div>
</template>

<style>
.sidebar {
  width: 20%;
}

.main {
  width: 80%;
}
</style>
