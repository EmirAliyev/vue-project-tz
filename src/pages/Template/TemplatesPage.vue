<script setup>
import { ref, computed, onMounted, provide } from 'vue'
import { CanvasAPI } from '@/shared/api/CanvasAPI'
import { useToast } from 'vue-toastification'
import TemplateCard from './ui/TemplateCard.vue'
import UButton from '@/shared/ui/base/UButton.vue'
import Icon from '@/shared/ui/base/UIcon.vue'
import UDialog from '@/shared/ui/base/UDialog.vue'
import { useGlobalStore } from '@/shared/stores/global.store'
import TemplateForm from './ui/TemplateForm.vue'
import USpinner from '@/shared/ui/base/USpinner.vue'

const store = useGlobalStore()
const toast = useToast()

const showDelete = ref(false)
const showCreate = ref(false)
const selectedCardId = ref(null)
const closeDialog = () => {
  selectedCardId.value = null
  showDelete.value = false
  showCreate.value = false
}

const list = ref([])
const filteredList = computed(() => list.value)

const formData = ref({})
const setInitFormData = () => {
  formData.value = {
    name: '',
    tags: '',
    height: '',
    width: '',
    preview_image: '',
  }
}
provide('template_form_data', formData)
const loadData = async () => {
  store.setAppLoading(true)
  list.value = await CanvasAPI.getList()
  setInitFormData()
  store.setAppLoading(false)
}

const openRemoveDialog = (id) => {
  selectedCardId.value = id
  showDelete.value = true
}

const confirmRemove = async () => {
  try {
    store.setAppLoading(true)
    list.value = list.value.filter((card) => card.id !== selectedCardId.value)
    await CanvasAPI.deleteTemplate({ id: selectedCardId.value })
    toast.success('Успешно удалено')
    store.setAppLoading(false)
  } catch (e) {
    console.error('Error removing card:', e)
    toast.success('Ошибка при удалении')
  } finally {
    closeDialog()
  }
}
const confirmCreate = async () => {
  try {
    store.setAppLoading(true)
    const payload = {
      ...formData.value,
      tags: formData.value.tags.split(','),
    }
    await CanvasAPI.createTemplate(payload)
    toast.success('Успешно создано')
    loadData()
  } catch (e) {
    console.error('Error removing card:', e)
    toast.error('Ошибка при создании')
  } finally {
    closeDialog()
    store.setAppLoading(false)
  }
}

onMounted(() => {
  try {
    loadData()
  } catch (e) {
    console.log(e)
  }
})
</script>

<template>
  <USpinner v-if="store.isAppLoadingState" />
  <div v-else class="wrapper">
    <div class="cards">
      <TemplateCard
        v-for="card in filteredList"
        :key="card.id"
        :card="card"
        @remove="openRemoveDialog(card.id)"
      />
    </div>
    <UButton style-class="rounded" class="top-up-button" @click="showCreate = true">
      <Icon name="ic_plus" />
    </UButton>
    <UDialog
      v-model="showCreate"
      :disabled="store.isAppLoadingState"
      @confirm="confirmCreate"
      @cancel="setInitFormData"
    >
      <template #header>Создание шаблона</template>
      <TemplateForm />
    </UDialog>
    <UDialog v-model="showDelete" :disabled="store.isAppLoadingState" @confirm="confirmRemove">
      <template #header>Удаление шаблона</template>
      <p>Вы действительно хотите удалить данный шаблон?</p>
    </UDialog>
  </div>
</template>

<style scoped lang="scss">
.wrapper {
  position: relative;
  padding: 2rem 0;
  display: flex;
  justify-content: center;
}

.cards {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2rem;
}

.top-up-button {
  position: fixed;
  color: white;
  bottom: 25px;
  right: 25px;
}
</style>
