<script setup lang="ts">
import { ref, defineExpose } from "vue";
import { StatusProps } from "../../types/interfaces";
import { useNotification } from "../../composables/useNotification";

const { statusNotification } = useNotification();

defineProps<StatusProps>();

const isVisible = ref(false);
const isActive = ref(false);
const isError = ref(false);

const open = () => (isVisible.value = true);
const close = () => (isVisible.value = false);

const success = (message: string) => {
  open();
  statusNotification(isActive, message);
};

const error = (message: string) => {
  open();
  statusNotification(isError, message);
};

defineExpose({
  open,
  close,
  success,
  error,
});
</script>

<template>
  <div
    class="status_popup"
    :class="{ isPopupActive: isActive, hasError: isError }"
    v-show="isVisible"
  >
    <p>{{ status_message }}</p>
    <div id="baseline"></div>
  </div>
</template>

<style scoped lang="scss">
.status_popup {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  font-weight: 500;
  position: fixed;
  bottom: 35px;
  right: -100%;
  z-index: 2020;
  padding: 20px;

  p {
    color: #fff;
  }
}

.isPopupActive {
  right: 0;
  transition: right 0.3s ease-in-out;
  background: rgb(68, 168, 5);
  color: #fff;

  #baseline {
    position: absolute;
    bottom: 0;
    height: 7px;
    width: 100%;
    background-color: green;
    animation: slide 2s ease-in-out;
    transition: right 0.3s ease-in-out;

    @keyframes slide {
      from {
        transform: translateX(0);
      }
      to {
        transform: translateX(100%);
      }
    }
  }
}

.hasError {
  right: 0;
  background-color: red;
  transition: right 0.3s ease-in-out;

  #baseline {
    position: absolute;
    bottom: 0;
    height: 7px;
    width: 100%;
    background-color: rgb(103, 0, 0);
    animation: slide 2s ease-in-out;
    transition: right 0.3s ease-in-out;

    @keyframes slide {
      from {
        transform: translateX(0);
      }
      to {
        transform: translateX(100%);
      }
    }
  }
}
</style>
