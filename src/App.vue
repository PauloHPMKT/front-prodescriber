<script setup lang="ts">
import { onMounted } from "vue";
import { useOnMounted } from "./composables/useOnMounted";
import { useRouter } from "vue-router";
import Toast from "./components/Popup/Toast.vue";

const router = useRouter();
const { checkBrowserConnection } = useOnMounted(router);

onMounted(() => {
  checkBrowserConnection();
});
</script>

<template>
  <div>
    <toast />
    <router-view></router-view>
  </div>
</template>

<style scoped lang="scss">
/* .fade-enter-active,
.fade-leave-active {
  transition: 400ms ease all;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateX(-100px);
  max-width: 100%;
} */
</style>
