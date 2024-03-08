<script setup lang="ts">
import { ref } from "vue";
import DefaultIcon from "./defaultIcon.vue";

interface BackToProps {
  message: string;
}

defineProps<BackToProps>();
const emit = defineEmits(["navigateAction"]);

const isTextVisible = ref(false);

const showText = () => {
  isTextVisible.value = true;
};

const hideText = () => {
  isTextVisible.value = false;
};

const navigateAction = () => {
  emit("navigateAction");
};
</script>

<template>
  <div
    class="slug"
    @click="navigateAction"
    @mouseover="showText"
    @mouseleave="hideText"
  >
    <DefaultIcon :name="'tabler:arrow-left'" class="icon_container" />
    <p :class="{ hidden_text: isTextVisible }">{{ message }}</p>
  </div>
</template>

<style scoped lang="scss">
.slug {
  position: absolute;
  top: 20px;
  right: 20px;
  display: flex;
  align-items: center;
  border: 1px solid #c5c5c51c;
  background-image: linear-gradient(45deg, #202020, #292727);
  transition: all 0.3s ease-out;
  border-radius: 20px;
  padding: 10px;
  color: #fff;
  cursor: pointer;
  overflow: hidden;
  transition: width 0.3s ease;
  height: 45px;
  width: 45px;

  &:hover {
    width: 200px;
  }

  .icon_container {
    display: flex;
    align-items: center;
    font-size: 1.5rem;
    margin-right: 10px;
  }

  p {
    opacity: 0;
    visibility: hidden;
    transition: opacity 0.3s ease;
    position: absolute;
    top: 20%;
    right: -100%;
    color: #0d0d0d;
  }
  .hidden_text {
    opacity: 1;
    visibility: visible;
    transition: opacity 0.3s ease;
    right: 10%;
    color: #fff;
  }
}
</style>
