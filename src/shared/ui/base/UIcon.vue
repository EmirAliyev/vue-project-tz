<script setup>
import { defineAsyncComponent } from 'vue';

const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  classStyleSvg: String,
  title: String, 
});

const icon = defineAsyncComponent(() =>
  import(`../../../assets/svg/${props.name}.svg`)
);
</script>

<template>
  <div class="icon-wrapper" :title="title">
    <component
      :is="icon"
      :class="classStyleSvg"
    />
  </div>
</template>

<style scoped>
.icon-wrapper {
  display: inline-flex;
  align-items: center; 
  justify-content: center; 
  padding: 0; 
  margin: 0;
  width: fit-content;
  height: fit-content; 
}

.icon-wrapper svg {
  width: 100%;
  height: 100%; 
}
</style>
