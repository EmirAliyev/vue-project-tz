<script setup>
import UIcon from './UIcon.vue'
import UButton from './UButton.vue'
import { computed } from 'vue'

const props = defineProps({
  size: {
    type: String,
    default: 'md',
    validator: (value) => ['xs', 'sm', 'md', 'lg'].includes(value),
  },
  loading: {
    type: Boolean,
    default: false,
  },
  isFooterHidden: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['confirm', 'cancel'])
const modelValue = defineModel({
  name: 'show',
  type: Boolean,
  default: false,
})

const dialogWidth = computed(() => {
  switch (props.size) {
    case 'xs':
      return '300px'
    case 'sm':
      return '420px'
    case 'md':
      return '560px'
    case 'lg':
      return '800px'
    default:
      return '560px'
  }
})

const handleConfirm = () => {
  emit('confirm')
}

const handleCancel = () => {
  emit('cancel')
  modelValue.value = false
}
</script>

<template>
  <div v-if="modelValue" class="dialog">
    <div class="dialog-content" :style="{ width: dialogWidth }">
      <div class="dialog-content-header">
        <slot name="header"></slot>
        <UIcon class="close-button" name="ic_x" @click="handleCancel" />
      </div>
      <div class="dialog-content-block"><slot></slot></div>

      <div v-if="!props.isFooterHidden" class="dialog-content-footer">
        <slot name="footer">
          <div class="default-footer">
            <UButton :disabled="loading" style-class="white" @click="handleCancel"
              >Отменить</UButton
            >
            <UButton :disabled="loading" @click="handleConfirm">Подтвердить</UButton>
          </div>
        </slot>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.dialog {
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.3);
  position: fixed;
  display: flex;

  &-content {
    margin: auto;
    background: white;
    border-radius: 8px;
    min-height: 80px;
    position: relative;

    &-header {
      padding: 12px;
      font-size: 18px;
      font-weight: bold;
      border-bottom: 1px solid #ddd;
      position: relative;
    }

    &-footer {
      padding: 12px;
      border-top: 1px solid #ddd;
      display: flex;
      justify-content: flex-end;
      gap: 8px;
    }

    &-block {
      padding: 16px;
      font-size: 18px;
      line-height: 24px;
      font-weight: 500;
      color: $lightBlack;
    }
  }
}

.close-button {
  position: absolute;
  top: 8px;
  right: 8px;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 4px;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    opacity: 0.8;
  }

  svg {
    width: 16px;
    height: 16px;
  }
}

.default-footer {
  display: flex;
  gap: 8px;
}
</style>
