<script setup>
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/shared/stores/user.store'
import { AuthAPI } from '@/shared/api/AuthAPI'
import UButton from '@/shared/ui/base/UButton.vue'
import UInput from '@/shared/ui/base/UInput.vue'

const router = useRouter()
const store = useUserStore()
const formData = reactive({
  email: '',
  password: '',
  remember_me: 1,
})

const handleSend = async () => {
  try {
    const result = await AuthAPI.auth(formData)
    store.setUser(result.user)
    localStorage.setItem('token', result.token)
    router.push({ name: 'templates' })
  } catch (e) {
    console.error(e)
    store.setUser({})
    localStorage.removeItem('token')
  }
}
</script>

<template>
  <div class="form-container">
    <h1 class="form-title">LOGIN</h1>
    <form @submit.prevent="handleSend" class="form">
      <div class="form-inputs">
        <UInput label="Email" id="email" v-model="formData.email" placeholder="Enter your email" />
        <UInput
          v-model="formData.password"
          label="Password"
          id="password"
          type="password"
          placeholder="Enter your password"
        />
      </div>
      <UButton type="submit">Submit</UButton>
    </form>
  </div>
</template>

<style scoped>
.form-container {
  max-width: 400px;
  margin: 15% auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  background-color: #fff;
}

.form-title {
  font-size: 1.5rem;
  margin-bottom: 1rem;
  text-align: center;
}

.form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.form-inputs {
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
}
</style>
