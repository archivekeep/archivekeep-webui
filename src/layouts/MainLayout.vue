<template>
  <q-layout view="hHh lpR fFf">
    <q-header bordered class="bg-white text-grey-8 q-py-none" height-hint="58">
      <q-linear-progress v-if="!currentUser" indeterminate color="warning" class="q-mb-sm" />
      <q-toolbar class="q-pt-xs q-my-sm">
        <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" />
        <q-toolbar-title>
          Archive Keep
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer show-if-above v-model="leftDrawerOpen" side="left" bordered @toggle="toggleLeftDrawer">
      <LeftNavigation />
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import LeftNavigation from 'components/LeftNavigation.vue'
import { useCurrentUser } from 'src/services/useCurrentUser'

export default defineComponent({
  name: 'MainLayout',

  components: {
    LeftNavigation
  },

  setup () {
    const { currentUser } = useCurrentUser()
    const leftDrawerOpen = ref(false)

    return {
      currentUser,
      leftDrawerOpen,
      toggleLeftDrawer () {
        leftDrawerOpen.value = !leftDrawerOpen.value
      }
    }
  }
})
</script>
