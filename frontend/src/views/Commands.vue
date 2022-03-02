<script setup lang="ts">
import { onMounted, ref } from "vue";
import { getCommands } from "../api";
import type { Command } from "../api";

const commands = ref<Command[]>([])
onMounted(async () => {
  commands.value = await getCommands();
});
</script>

<template>
  <div class="flex flex-col space-y-5">
    <h1 class="text-5xl">Commands</h1>
    <div class="w-full">
      <table class="table-auto w-full">
        <thead>
          <tr class="text-left text-xl">
            <th>Name</th>
            <th>Type</th>
            <th>Response</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-solid">
          <tr v-for="command in commands" :key="command.name">
            <td class="py-2">
              <pre>{{ command.name }}</pre>
            </td>
            <td class="py-2">{{ command.type }}</td>
            <td class="py-2">{{ command.response }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
