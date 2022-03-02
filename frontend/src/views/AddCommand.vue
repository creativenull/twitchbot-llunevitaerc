<script setup lang="ts">
import { onMounted, ref, reactive } from "vue";
import { addCommand } from "../api";
import type { Command } from "../api";

const form = ref<HTMLFormElement | null>(null);
onMounted(() => {
  form.value?.reset();
});

const formData = reactive<Command>({
  name: "",
  type: "",
  response: "",
});

function createCommand() {
  addCommand(formData);
}
</script>

<template>
  <div class="flex flex-col space-y-5">
    <h1 class="text-5xl">Add Command</h1>
    <div>
      <form ref="form" @submit.prevent="createCommand">
        <div class="flex flex-col space-y-4 mb-4 w-2/5">
          <div class="flex flex-col">
            <label for="commandName">Command Name</label>
            <input
              v-model="formData.name"
              class="dark:text-gray-700 dark:shadow-none rounded shadow p-2"
              id="commandName"
              type="text"
              required
            />
          </div>

          <div class="flex flex-col">
            <label for="commandType">Command Type</label>
            <select
              v-model="formData.type"
              id="commandType"
              class="dark:text-gray-700 dark:shadow-none rounded shadow p-2"
              required
            >
              <option value="none" selected>None</option>
              <option value="text">Text</option>
            </select>
          </div>

          <div class="flex flex-col">
            <label for="commandResponse">Command Reponse</label>
            <textarea
              v-model="formData.response"
              id="commandResponse"
              class="dark:text-gray-700 dark:shadow-none rounded shadow p-2"
              rows="4"
              required
            ></textarea>
          </div>
        </div>

        <input
          class="border rounded cursor-pointer hover:bg-sky-600 hover:border-sky-600 py-2 px-4"
          type="submit"
          value="Save"
        />
      </form>
    </div>
  </div>
</template>
