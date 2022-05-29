<template>
  <div class="page-content-container">
    <h1>{{ directoryName }}</h1>
    <template v-if="directories && directories.length > 0">
      <h2 class="q-mt-md q-mb-sm">Directories</h2>
      <div class="directory-grid">
        <DirectoryItem
          v-for="directory in directories"
          :key="directory"
          :archive="archive"
          :directory-name="directory"
        />
      </div>
    </template>
    <template v-if="files && files.length > 0">
      <h2 class="q-mt-md q-mb-sm">Files</h2>
      <div class="files-grid">
        <div v-for="item in files" :key="item.Path">
          <FileItem v-bind:item="item" v-bind:archive-name="archive.ID" :key="item.Path" />
        </div>
      </div>
    </template>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from 'vue'
import FileItem from 'src/components/FileItem.vue'
import { ArchiveDTO } from 'src/services/types'
import { ArchiveFileDTO } from 'src/services/useArchiveDirectory'
import DirectoryItem from 'components/DirectoryItem.vue'

export default defineComponent({
  name: 'DirectoryView',
  components: {
    DirectoryItem,
    FileItem
  },
  props: {
    archive: {
      type: Object as PropType<ArchiveDTO>,
      required: true
    },
    currentDirectory: {
      type: Array as PropType<string[]>
    },
    directories: Array as PropType<string[]>,
    files: Array as PropType<ArchiveFileDTO[]>
  },
  setup (props) {
    const directoryName = computed((): string => {
      if (props.currentDirectory) {
        return props.currentDirectory[props.currentDirectory.length - 1]
      } else {
        return props.archive.Name
      }
    })

    return {
      directoryName
    }
  }
})
</script>

<style scoped>
h2 {
  font-size: 0.8rem !important;
  color: rgba(0, 0, 0, 0.6);
}

.directory-grid {
  display: grid;
  grid-gap: 0;
  grid-template-columns: repeat(auto-fill, minmax(14rem, 1fr));

  margin: -4px;
}

.files-grid {
  display: grid;
  grid-gap: 0;
  grid-template-columns: repeat(auto-fill, minmax(10rem, 1fr));

  margin: -4px;
}

.files-grid > div:before {
  content: '';
  display: block;
  padding-top: 100%;
}

.files-grid > div {
  margin: 4px;
  position: relative;
}
</style>
