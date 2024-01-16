<script setup lang="ts">
import ReveallerPassword from "../Icons/ReveallerPassword.vue";
import type { BaseInputProps } from "../../types/interfaces";
import { computed, ref } from "vue";

const props = defineProps<BaseInputProps>();
const emit = defineEmits(["update:modelValue"]);

const inputType = ref("password");
const inputValue = ref("");

const isPasswordVisible = computed(() => inputType.value === "text");
const hideReveallerIcons = computed(() => {
  return !props.hidePasswordRevealler ? (inputType.value = "text") : "password";
});

const togglePassword = () => {
  inputType.value = isPasswordVisible.value ? "password" : "text";
};

const handleBlur = () => {
  emit("update:modelValue", inputValue.value);
};
</script>

<template>
  <label :for="inputType">{{ props.label }}</label>
  <div class="input_layer">
    <input
      :id="inputType"
      v-bind="$attrs"
      :type="inputType"
      :placeholder="props.placeholder"
      v-if="hideReveallerIcons"
      v-model="inputValue"
      @blur="handleBlur"
    />
    <revealler-password
      @toggleRevealer="togglePassword"
      v-if="props.hidePasswordRevealler"
      :is_password="isPasswordVisible"
    />
  </div>
</template>

<style scoped lang="scss">
.input_layer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #fff;
  height: 40px;
  border-radius: 6px;
  padding: 5px 10px;
  box-shadow: -2px 2px 5px rgba(0, 0, 0, 0.1);

  input {
    width: 95%;
    height: 100%;
    border: none;
    outline: none;
    font-size: 1rem;
  }
}
</style>
