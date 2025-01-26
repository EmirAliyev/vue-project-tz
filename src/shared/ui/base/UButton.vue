<script setup>
defineProps({
  styleClass: {
    type: String,
    default: '',
  },
  nativeType: {
    type: String,
    default: 'button',
  },
  disabled: {
    type: Boolean,
    default: false,
  },
})
</script>

<template>
  <button
    @click.stop="handleClick"
    :disabled="disabled"
    :type="nativeType"
    :class="['base-button', `base-button-${styleClass}`]"
  >
    <template v-if="$slots.default"><slot></slot></template>
  </button>
</template>

<style scoped lang="scss">
.base-button {
  padding: 10px 18px;
  background: $blue;
  border-radius: 8px;
  font-family: Inter;
  cursor: pointer;
  height: 44px;
  line-height: 24px;
  font-size: 16px;
  font-weight: 500;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;

  &-rounded {
    border-radius: 50%;
    padding: 0;
    height: 44px;
    width: 44px;
  }

  &-white {
    background: white;
    color: $blue;
    border: 1px solid $blue;
  }
}
</style>
