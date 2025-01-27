<script setup>
import { onMounted, provide, ref } from 'vue'
import { CanvasAPI } from '@/shared/api/CanvasAPI'
import { useRoute } from 'vue-router'
import { useGlobalStore } from '@/shared/stores/global.store'
import TemplateForm from './ui/TemplateForm.vue'
import USpinner from '@/shared/ui/base/USpinner.vue'

const store = useGlobalStore()
const route = useRoute()
const { id } = route.params

const formData = ref({
  name: '',
  tags: '',
  height: '',
  width: '',
  preview_image: '',
})
const originalPreview = ref('')
const loadData = async () => {
  try {
    store.setAppLoading(true)
    const result = await CanvasAPI.getTemplate(id)
    const { name, tags, height, width, preview_image } = result
    formData.value = { name, height, width, preview_image, tags: tags ? tags.join(',') : '' }
    originalPreview.value = preview_image
    store.setAppLoading(false)
  } catch (e) {
    console.error(e)
  }
}
provide('template_form_data', formData)

onMounted(() => {
  loadData()
})
</script>

<template>
  <USpinner v-if="store.isAppLoadingState" />
  <TemplateForm
    v-else
    :id="id"
    :original-preview:="originalPreview"
  />
</template>
