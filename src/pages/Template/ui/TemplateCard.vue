<script setup>
import { useRouter } from 'vue-router'
import Icon from '@/shared/ui/base/UIcon.vue'

defineProps({
  card: {
    type: Object,
    default: () => ({}),
  },
})

const emit = defineEmits(['remove'])
const router = useRouter()

const handleDeleteTemplate = () => emit('remove')
</script>

<template>
  <div class="card">
    <div class="card-content">
      <img class="card-content-img" :src="card.preview_image" alt="Card preview" />
      <h2 class="card-content-title">{{ card.name }}</h2>
    </div>
    <div class="card-actions">
      <Icon
        class="card-actions-icon"
        name="ic_edit"
        title="Редактировать"
        @click="router.push({ name: 'template-edit', params: { id: card.id } })"
      />
      <Icon
        class="card-actions-icon"
        name="ic_delete"
        title="Удалить"
        @click="handleDeleteTemplate(card.id)"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
.card {
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  width: 350px;
  height: 100%;
  display: flex;
  flex-direction: column;

  &-content {
    padding: 15px;
    display: flex;
    flex-direction: column;
    height: 100%;

    &-img {
      width: 100%;
      height: 100%;
      max-height: 180px;
      border-radius: 8px;
      object-fit: contain;
    }

    &-title {
      margin-top: 10px;
      font-size: 1.2rem;
      font-weight: bold;
      text-align: center;
    }
  }

  &-actions {
    display: flex;
    justify-content: space-around;
    padding: 10px 0;
    align-items: center;
    background-color: #f7f7f7;
    border-top: 1px solid #ddd;

    &-icon {
      cursor: pointer;
    }
  }
}
</style>
