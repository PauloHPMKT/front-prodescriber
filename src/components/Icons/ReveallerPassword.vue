<script setup lang="ts">
import defaultIcon from "./defaultIcon.vue";
import type { ReveallerPasswordProps } from "../../types/interfaces";

defineProps<ReveallerPasswordProps>();

const emit = defineEmits(["toggleRevealer"]);

const toggleRevealer = () => {
  emit("toggleRevealer");
};
</script>

<template>
  <span @click="toggleRevealer" style="cursor: pointer">
    <default-icon :name="'tabler:eye'" v-if="is_password" class="centralize" />
    <default-icon :name="'tabler:eye-off'" v-else class="centralize" />
  </span>
</template>

<style scoped lang="scss">
.centralize {
  display: flex;
  align-items: center;
}
</style>
