<template>
  <div class="default-layout w-full min-h-screen bg-gray-900 text-gray-100">
    <div class="container mx-auto">
      <div class="grid md:grid-cols-4 grid-rows-4">
        <div class="col-span-1 p-2">
          <!-- Sidebar Content -->
          <slot name="sidebar"></slot>
        </div>

        <div class="col-span-3 p-2">
          <!-- Main Router Content -->
          <slot></slot>
        </div>
      </div>
    </div>
  </div>
</template>
