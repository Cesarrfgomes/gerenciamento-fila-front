<script setup>
</script>

<template>
  <main class="layouts">
    <RouterView class="layouts--sidebar" name="LeftSidebar" />
    <RouterView class="layouts--main" />
  </main>
</template>

<style lang="scss" scoped>
.layouts {
  display: flex;
  justify-content: space-between;

  &--main {
    width: 100%;
  }

  &--sidebar {
    width: 300px;
  }
}
</style>
