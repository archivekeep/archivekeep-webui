<template>
  <div class="page-content-container q-py-lg">
    <h1>Welcome to ArchiveKeep!</h1>
    <h2 class="q-mt-lg">My archives</h2>
    <div class="archives-grid" v-if="archives">
      <DirectoryItem
        v-for="archive in archives"
        :key="archive.ID"
        :archive="archive"
        directory-name=""
        :label="archive.Name"
      />
    </div>
    <q-linear-progress v-else indeterminate color="warning" class="q-mb-sm" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useArchives } from 'src/services/useArchives'
import { archiveRoute } from 'src/router/paths'
import DirectoryItem from 'components/DirectoryItem.vue'

export default defineComponent({
  name: 'HomePage',
  components: {
    DirectoryItem
  },
  setup () {
    const { archives, archivesError } = useArchives()

    return {
      archives,
      archivesError,
      archiveRoute
    }
  }
})
</script>

<style scoped>
.archives-grid {
  display: grid;
  grid-gap: 0;
  grid-template-columns: repeat(auto-fill, minmax(14rem, 1fr));

  margin: -4px;
}
</style>
