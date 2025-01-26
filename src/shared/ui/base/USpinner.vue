<script setup>
defineProps({
  size: {
    type: String,
    default: '40px',
  },
  color: {
    type: String,
    default: 'blue',
    validator(value) {
      if (
        ![
          'blue',
          'black',
          'darkred',
          'grey',
          'grey500',
          'grey700',
          'lightBlack',
          'border',
          'purple',
        ].includes(value)
      ) {
        return false
      }
      return true
    },
  },
})

function getColorHex(color) {
  switch (color) {
    case 'blue':
      return '#1570EF'
    case 'black':
      return '#161616'
    case 'darkred':
      return '#B42318'
    case 'grey':
      return '#344054'
    case 'grey500':
      return '#667085'
    case 'grey700':
      return '#344054'
    case 'lightBlack':
      return '#2E2E2E'
    case 'border':
      return '#E4E7EC'
    case 'purple':
      return '#4E5BA6'
    default:
      return ''
  }
}
</script>

<template>
  <div class="spinner" :style="{ width: size, height: size }">
    <div
      class="spinner-circle"
      :style="{ borderTopColor: getColorHex(color), borderRightColor: getColorHex(color) }"
    ></div>
  </div>
</template>

<style scoped lang="scss">
.spinner {
  display: inline-block;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1000;
}

.spinner-circle {
  width: 100%;
  height: 100%;
  border: 4px solid transparent;
  border-radius: 50%;
  animation: spin-circle 1.5s ease-in-out infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

@keyframes spin-circle {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(180deg);
  }
}
</style>
