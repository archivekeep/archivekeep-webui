<template>
  <div>
    <template v-if="isValidating">
      Loading...
    </template>
  </div>
  <router-view />
</template>

<script lang="ts">
import { computed, defineComponent, watch } from 'vue'
import { useCurrentUser } from 'src/services/useCurrentUser'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'App',
  setup () {
    const { currentUser, isValidating } = useCurrentUser()

    const router = useRouter()
    const layout = computed(() => router.currentRoute.value.meta.layout)

    const pageRequiresLogin = computed(() => !currentUser.value?.id && !isValidating.value && !router.currentRoute.value.meta.allowedWithoutLogin)

    watch(pageRequiresLogin, (pageRequiresLogin) => {
      if (pageRequiresLogin) {
        router.push({
          path: '/auth/login'
        })
      }
    })

    return {
      layout,
      isValidating
    }
  }
})
</script>
