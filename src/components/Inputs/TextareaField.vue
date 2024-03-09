<script setup lang="ts">
import { ref, computed } from "vue";
import ReveallerPassword from "../Icons/ReveallerPassword.vue";

interface InputFieldProps {
  placeholder: string;
  isPassword?: boolean;
}

defineProps<InputFieldProps>();
const emit = defineEmits(["update:modelValue"]);

const inputValue = ref("");
const isFocused = ref(false);

const handleBlur = (newValue: string) => {
  inputValue.value = newValue;
  emit("update:modelValue", newValue);
};

const togglePassword = () => {
  inputType.value = inputType.value === "password" ? "text" : "password";
};
</script>

<template>
  <div class="w-full">
    <div class="relative w-full h-32 flex">
      <textarea
        v-model="inputValue"
        @focus="isFocused = true"
        @blur="handleBlur($event.target.value)"
        class="border border-gray-300 text-[#121212] rounded-md px-4 py-2 w-full h-full"
        id="textarea"
        placeholder=" "
      ></textarea>
      <label
        :class="{ active: isFocused || inputValue }"
        class="absolute top-5 left-4 transform -translate-y-1/2 bg-white text-gray-500 text-sm pointer-events-none transition-all duration-300"
      >
        {{ placeholder }}
      </label>
    </div>
  </div>
</template>

<style scoped lang="scss">
textarea:focus + label,
textarea:not(:placeholder-shown) + label {
  top: 0;
  padding: 4px 4px 0;
  font-size: 0.75rem;
  color: #01000c;
}
</style>
