<script setup lang="ts">
import { Icon } from "@iconify/vue";
import { Breadcrumb } from "@/types/interfaces";

const props = defineProps<{
  icons: Breadcrumb.Icons[];
}>();

const emit = defineEmits(["actions"]);

const actions = (prop: string) => {
  emit("actions", prop);
};
</script>

<template>
  <div class="flex justify-end pr-6 gap-4">
    <div 
      v-for="(icon, index) in props.icons" 
      :key="index" 
      @click="actions(icon.action)"
    >
      <Icon :icon="`${icon.icon}`" class="text-[25px]" />
    </div>
  </div>
</template>import { log } from "console";

