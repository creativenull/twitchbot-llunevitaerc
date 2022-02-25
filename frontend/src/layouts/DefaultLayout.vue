<template>
  <div class="default-layout w-full dark:bg-gray-900 dark:text-gray-100 text-gray-700">
    <div class="container mx-auto">
      <div class="grid md:grid-cols-4 grid-rows-4">
        <div class="col-span-1 p-2 border-r min-h-screen">
          <!-- Sidebar Content -->
          <slot name="sidebar"></slot>
        </div>

        <div class="col-span-3 p-8">
          <!-- Main Router Content -->
          <slot></slot>
        </div>
      </div>
    </div>
  </div>
</template>
