<script setup>
import { inject, ref, reactive } from 'vue'
import { CanvasAPI } from '@/shared/api/CanvasAPI'
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'
import UInput from '@/shared/ui/base/UInput.vue'
import UIcon from '@/shared/ui/base/UIcon.vue'
import UButton from '@/shared/ui/base/UButton.vue'

const props = defineProps({
  id: {
    type: String,
    default: '',
  },
  originalPreview: {
    type: String,
    default: '',
  },
})

const router = useRouter()
const toast = useToast()

const formData = inject('template_form_data')
const preview_image = ref()
const local_img = ref(props.originalPreview)

const errors = reactive({
  title: null,
})

const handlePreview = (event) => {
  const file = event.target.files[0]
  if (file) {
    preview_image.value = file
    local_img.value = URL.createObjectURL(file)
  }
}

const clearPreview = () => {
  local_img.value = props.originalPreview
  preview_image.value = null
}

const validateForm = () => {
  errors.title = formData.value.name.trim() ? null : 'Название обязательно для заполнения.'
  return !errors.title
}

const handleSubmit = async () => {
  if (validateForm()) {
    const { name, tags, height, width } = formData.value
    const payload = {
      name,
      height,
      width,
      tags: tags.split(','),
    }

    if (preview_image.value) {
      payload.preview_image = preview_image.value
    }

    try {
      await CanvasAPI.updateTemplate({ id: props.id, ...payload })
      toast.success('Успешно обновлено')
    } catch (e) {
      toast.error('Ошибка при обновлении')
    } finally {
      router.push({ name: 'templates' })
    }
  }
}
</script>

<template>
  <div class="edit-page">
    <div v-if="local_img" class="image-preview">
      <img :src="local_img" alt="Preview IMG" />
    </div>
    <form class="form" @submit.prevent="handleSubmit">
      <UInput v-model="formData.name" label="Название" />
      <UInput v-model="formData.tags" label="Теги" placeholder="Введите теги через запятую" />
      <UInput v-model="formData.width" label="Ширина" placeholder="Введите ширину" />
      <UInput v-model="formData.height" label="Высота" placeholder="Введите высоту" />
      <UInput label="Загрузить изображение" type="file" @change="handlePreview">
        <template #suffix>
          <UIcon name="ic_x" @click="clearPreview" />
        </template>
      </UInput>

      <UButton v-if="id" type="submit">Сохранить</UButton>
    </form>
  </div>
</template>

<style scoped>
.edit-page {
  width: 560px;
  max-width: 100%;
  margin: 0 auto;
  padding: 20px;
  text-align: center;
}

.image-preview {
  margin-bottom: 20px;
}

.image-preview img {
  max-width: 100%;
  max-height: 160px;
  border: 1px solid #ddd;
  border-radius: 8px;
}

.form {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
</style>
