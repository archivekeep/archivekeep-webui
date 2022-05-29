<template>
  <q-layout view="hHh lpR fFf">
    <q-page-container class="absolute-full flex">
      <div class="login-container">
        <q-form
          @submit="doLogin"
          class="login-box q-gutter-lg q-pr-lg q-pb-lg q-pt-lg"
        >
          <h1>Welcome to ArchiveKeep</h1>

          <q-input v-model="username" type="text" label="Email or username" stack-label />
          <q-input v-model="password" type="password" label="Password" stack-label />

          <div class="q-mt-lg">
            <q-btn :loading="submitting" label="Login" type="submit" color="primary"/>
          </div>
        </q-form>
      </div>
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import { useRouter } from 'vue-router'
import { defineComponent, ref, watch } from 'vue'
import { useCurrentUser } from 'src/services/useCurrentUser'
import { getAPIURL } from 'src/services/fetcher'

export default defineComponent({
  name: 'LoginPage',
  setup () {
    const { currentUser, mutate } = useCurrentUser()
    const router = useRouter()

    const username = ref('')
    const password = ref('')
    const submitting = ref(false)

    const doLogin = async function () {
      try {
        submitting.value = true

        const response = await fetch(getAPIURL('/auth/session/login'), {
          method: 'POST',
          body: JSON.stringify({
            username: username.value,
            password: password.value
          })
        })

        if (response.ok) {
          mutate()
        }
      } finally {
        submitting.value = false
      }
    }

    watch(currentUser, (currentUser) => {
      if (currentUser?.email) {
        console.log('redirect to home')
        router.push({
          path: '/'
        })
      }
    })

    return {
      doLogin,
      username,
      password,
      submitting
    }
  }
})
</script>

<style scoped>
.login-container {
  flex: 1 0 auto;
  display: flex;
  justify-content: space-around;
  flex-direction: row;
  align-items: center
}

.login-box {
  flex: 1 1 400px;
  min-width: 0;
  max-width: 400px;
  background: rgba(255, 255, 255, 0.95);
  border-radius: 0.25rem;
  box-shadow: 1px 1px 1.25rem -2px rgba(0, 0, 0, 0.15);
}

h1 {
  text-align: center;
  font-size: 1.25rem;
  line-height: 3;
  margin-block-end: 0;
}

form input,
form input:-webkit-autofill {
  background: white;
  background-color: white;
}
</style>
