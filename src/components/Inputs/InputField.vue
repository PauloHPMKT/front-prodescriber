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
const inputType = ref("password");
const isFocused = ref(false);

const isPasswordVisible = computed(() => inputType.value === "text");

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
    <div class="relative w-full h-14 flex">
      <input
        v-model="inputValue"
        @focus="isFocused = true"
        @blur="handleBlur($event.target.value)"
        class="border border-gray-300 text-[#121212] rounded-md px-4 py-2 w-full h-full"
        :type="isPassword ? inputType : 'text'"
        placeholder=" "
      />
      <label
        :class="{ active: isFocused || inputValue }"
        class="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white text-gray-500 text-sm pointer-events-none transition-all duration-300"
      >
        {{ placeholder }}
      </label>
    </div>
    <div
      v-if="isPassword"
      @click="togglePassword"
      class="text-black flex items-center justify-end cursor-pointer"
    >
      <ReveallerPassword
        @toggleRevealer.stop
        :is_password="isPasswordVisible"
        class="mr-3"
      />
      {{ inputType === "text" ? "Ocultar" : "Mostrar" }}
    </div>
  </div>
</template>

<style scoped lang="scss">
input:focus + label,
input:not(:placeholder-shown) + label {
  top: 0;
  padding: 4px;
  font-size: 0.75rem;
  color: #01000c;
}
</style>
