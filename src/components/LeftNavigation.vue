<template>
  <div class="navigation full-height column no-wrap justify-between items-stretch">
    <h3>My archives</h3>
    <ul class="vertical menu">
      <li v-for="item in archives" :key="item.ID">
        <router-link v-bind:to="archiveRoute(item.ID)">{{ item.Name }}</router-link>
      </li>
    </ul>
    <h3 class="empty">Shared with me</h3>
    <ul class="vertical menu">
      <li>
        <span class="empty">nothing</span>
      </li>
    </ul>
    <q-space />
    <span class="flex justify-center">
      <span class="material-icons">account_circle</span>
      <span style="margin-left: 0.25rem">{{ currentUser?.email }}</span>
    </span>
    <q-form @submit="doLogout" class="flex justify-around">
      <q-btn label="Logout" type="submit" color="secondary" size="md" flat padding="none" />
    </q-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

import { useArchives } from 'src/services/useArchives'
import { useCurrentUser } from 'src/services/useCurrentUser'
import { getAPIURL } from 'src/services/fetcher'
import { archiveRoute } from 'src/router/paths'

export default defineComponent({
  name: 'LeftNavigation',
  setup () {
    const { archives, archivesError } = useArchives()
    const { currentUser, mutate } = useCurrentUser()
    const loggingOut = ref(false)

    const doLogout = async function () {
      try {
        loggingOut.value = true

        const response = await fetch(getAPIURL('/auth/session/logout'), {
          method: 'POST'
        })

        if (response.ok) {
          mutate()
        } else {
          throw response.status
        }
      } finally {
        loggingOut.value = false
      }
    }

    return {
      archives,
      archivesError,
      archiveRoute,
      currentUser,
      loggingOut,
      doLogout
    }
  }
})
</script>

<style scoped lang="scss">
.navigation {
  padding: 12px;
}

h3 {
  margin: 1.25rem 0 0;
  padding: 0.125rem 0;
  text-align: left;
  font-size: 0.75rem;
  font-weight: bold;
  color: rgba(0, 0, 0, 0.4);
}

ul {
  list-style-type: none;
  margin: 0.175rem 0 1.25rem;
  padding: 0;
}

li {
  margin: 0;
}

.vertical.menu a,
.vertical.menu span {
  display: block;
  padding: 0.125rem 0;
  font-size: 0.875rem;
  text-decoration: none;
  color: rgba(0, 0, 0, 0.8);
}

h3.empty {
  color: rgba(0, 0, 0, 0.3);
}

.vertical.menu span.empty {
  color: rgba(0, 0, 0, 0.48);
}
</style>
