<template>
  <BreadCrumbs
    v-bind:items="breadcrumbItems"
  />
  <DirectoryView
    v-if="archive"
    v-bind:archive="archive"
    v-bind:current-directory="currentDirectory"
    v-bind:directories="directories"
    v-bind:files="files"
  />
</template>

<script lang="ts">
import { computed, defineComponent, PropType, toRef } from 'vue'

import { useArchiveDirectory } from 'src/services/useArchiveDirectory'

import BreadCrumbs, { BreadcrumbItem } from 'src/components/BreadCrumbs.vue'
import DirectoryView from 'src/components/DirectoryView.vue'

import { archiveRoute, archiveSubDirectoryRoute } from 'src/router/paths'
import { useArchive } from 'src/services/useArchive'

export default defineComponent({
  name: 'DirectoryPage',
  props: {
    archiveName: {
      type: String,
      required: true
    },
    currentDirectory: {
      type: Array as PropType<string[]>
    }
  },
  components: {
    BreadCrumbs,
    DirectoryView
  },
  setup (props) {
    const { archive } = useArchive(toRef(props, 'archiveName'))

    const { files, directories, error } = useArchiveDirectory({
      archiveName: toRef(props, 'archiveName'),
      currentDirectory: toRef(props, 'currentDirectory')
    })

    const breadcrumbItems = computed((): BreadcrumbItem[] => {
      const items: BreadcrumbItem[] = [{
        To: archiveRoute(props.archiveName),
        Label: archive.value?.Name ?? props.archiveName
      }]

      if (props.currentDirectory) {
        for (let i = 0; i < props.currentDirectory.length; i++) {
          items.push({
            To: archiveSubDirectoryRoute(props.archiveName, props.currentDirectory.slice(0, i + 1)),
            Label: props.currentDirectory[i]
          })
        }
      }

      return items
    })

    return {
      files,
      error,
      breadcrumbItems,
      directories,
      archive
    }
  }
})
</script>

<style scoped>
</style>
