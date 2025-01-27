<script setup>
import { inject, ref } from 'vue'
import { CanvasAPI } from '@/shared/api/CanvasAPI'
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'
import UInput from '@/shared/ui/base/UInput.vue'
import UIcon from '@/shared/ui/base/UIcon.vue'
import UButton from '@/shared/ui/base/UButton.vue'
import { useGlobalStore } from '@/shared/stores/global.store'
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

const store = useGlobalStore()
const router = useRouter()
const toast = useToast()

const formData = inject('template_form_data')
const preview_image = ref()
const local_img = ref(props.originalPreview)

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

const isSubmitDisabled = ref(false)

const handleCreate = async () => {
  let templateId = null

  try {
    isSubmitDisabled.value = true
    store.setAppLoading(true)
    
    const payload = new FormData()
    const { name, tags, height, width } = formData.value
    const tagsArr = tags.split(',')

    payload.append('name', name)
    payload.append('height', height)
    payload.append('width', width)
    tagsArr.forEach((tag) => payload.append('tags[]', tag))

    payload.append('_method', 'POST')

    const response = await CanvasAPI.createTemplate({ data: payload })
    const { data } = response
    templateId = data.id

    toast.success('Успешно создано')
  } catch (e) {
    console.error('Error creating template:', e)
    toast.error('Ошибка при создании')
  } finally {
    if (templateId) {
      router.push({ name: 'template-edit', params: { id: templateId } })
    }
  }
}

const handleUpdate = async () => {
  isSubmitDisabled.value = true
  const { name, tags, height, width } = formData.value
  const tagsArr = tags.split(',')

  const payload = new FormData()
  payload.append('name', name)
  payload.append('height', height)
  payload.append('width', width)
  tagsArr.forEach((tag) => payload.append('tags[]', tag))

  if (preview_image.value) {
    payload.append('preview_image', preview_image.value)
  }

  payload.append('_method', 'PATCH')

  try {
    await CanvasAPI.updateTemplate({ id: props.id, data: payload })
    toast.success('Успешно обновлено')
  } catch (e) {
    toast.error('Ошибка при обновлении')
  } finally {
    isSubmitDisabled.value = false
    router.push({ name: 'templates' })
  }
}

const handleSubmit = () => {
  if (props.id) {
    handleUpdate()
    return
  }
  console.log('create')
  handleCreate()
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
      <UInput v-if="props.id" label="Загрузить изображение" type="file" @change="handlePreview">
        <template #suffix>
          <UIcon name="ic_x" @click="clearPreview" />
        </template>
      </UInput>

      <UButton :disabled="isSubmitDisabled" type="submit">Сохранить</UButton>
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
