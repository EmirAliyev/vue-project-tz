<script setup>
defineProps({
  label: {
    type: [String, Number, Date],
    default: '',
  },
  placeholder: {
    type: [String, Number, Date],
    default: 'Заполните поле',
  },
  styleClass: {
    type: String,
    default: '',
  },
  wrapperClass: {
    type: String,
    default: '',
  },
  disabled: {
    type: Boolean,
    default: () => false,
  },
  type: {
    type: String,
    default: () => 'text',
  },
  modelValue: {
    type: [String, Number, File],
    default: '',
  },
})
const emit = defineEmits(['update:modelValue'])

const inputId = `input-${Math.random().toString(36).substr(2, 9)}`

const handleFileChange = (event) => {
  const file = event.target.files[0]
  if (file) {
    emit('update:modelValue', file)
  }
}
</script>

<template>
  <div :class="['base-input__wrapper', `base-input__wrapper-${wrapperClass}`]">
    <label v-if="label" :for="inputId" class="base-input__label">
      {{ label }}
    </label>

    <span class="base-input__suffix" v-if="$slots.suffix">
      <slot name="suffix"></slot>
    </span>

    <input
      v-if="type !== 'file'"
      :id="inputId"
      :class="['base-input', `base-input_${styleClass}`]"
      :disabled="disabled"
      :placeholder="placeholder"
      :value="modelValue"
      :type="type"
      @input="$emit('update:modelValue', $event.target.value)"
    />

    <input
      v-if="type === 'file'"
      :id="inputId"
      :class="['base-input', `base-input_${styleClass}`]"
      :disabled="disabled"
      :placeholder="placeholder"
      type="file"
      @change="handleFileChange"
    />

    <span class="base-input__prefix" v-if="$slots.prefix">
      <slot name="prefix"></slot>
    </span>
  </div>
</template>

<style scoped lang="scss">
.base-input__wrapper {
  display: flex;
  flex-direction: column;
  gap: 8px;
  position: relative;
}

.base-input__label {
  font-size: 14px;
  width: max-content;
  padding-left: 3px;
  color: #6b7280;
}

.base-input {
  border-radius: 8px;
  padding: 10px 14px;
  border: 1px solid #d0d5dd;
  height: 44px;
  width: 100%;
  font-family: Inter;
  font-size: 16px;
  line-height: 24px;
  color: #6b7280;

  &::placeholder {
    color: #6b7280;
    opacity: 60%;
    font-size: 16px;
    line-height: 24px;
  }
  &__suffix {
    position: absolute;
    right: 16.5px;
    bottom: 8px;
  }

  &__prefix {
    position: absolute;
    left: 16.5px;
    bottom: 8px;
  }
}
</style>
