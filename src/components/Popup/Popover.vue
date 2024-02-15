<script setup lang="ts">
interface PopoverProps {
  message: string;
}

defineProps<PopoverProps>();
</script>

<template>
  <div class="bg-slate-800 p-2 rounded-[6px] shadow-lg min-w-56 text-slate-400">
    {{ message }}
  </div>
</template>

<style scoped lang="scss">
.jumping {
  animation: jumpAnimation 0.5s ease-in-out;
}

@keyframes jumpAnimation {
  0% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-20px);
  }
  100% {
    transform: translateY(0);
  }
}

.hidden {
  display: none;
}
</style>
