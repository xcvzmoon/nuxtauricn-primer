<script setup lang="ts">
const colorMode = useColorMode();

const isDark = computed({
  get: () => colorMode.value === 'dark',
  set: (_isDark) => (colorMode.preference = _isDark ? 'dark' : 'light'),
});
</script>

<template>
  <Button
    size="icon"
    @click="isDark = !isDark"
  >
    <IconMoon v-if="isDark" />
    <IconSun v-else />
  </Button>
</template>
