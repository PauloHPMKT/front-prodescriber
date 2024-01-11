<script setup lang="ts">
import { Icon } from "@iconify/vue";
import type { IconParams } from "../../types/interfaces";

defineProps<IconParams>();
</script>

<template>
  <div :title="title">
    <Icon :icon="`${name}`" />
  </div>
</template>
