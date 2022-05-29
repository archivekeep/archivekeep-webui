<template>
  <a class="file-item" v-bind:href="fileInfo.downloadURL" target="_blank">
    <div class="content-preview">
      <img v-if="fileInfo.previewURL" v-show="isLoaded" v-bind:src="fileInfo.previewURL" @load="onImgLoad" />
      <span v-show="!isLoaded" class="material-icons">{{ fileInfo.materialIcon }}</span>
    </div>
    <div class="file-name">
      <span class="material-icons">{{ fileInfo.materialIcon }}</span>
      <span>{{ item.Path.includes('/') ? item.Path.substr(item.Path.lastIndexOf('/') + 1) : item.Path }}</span>
    </div>
  </a>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from 'vue'
import { ArchiveFileDTO } from 'src/services/useArchiveDirectory'
import { getAPIURL } from 'src/services/fetcher'

function previewEnabled (itemPath: string) {
  return itemPath.endsWith('.jpg') || itemPath.endsWith('.jpeg') || itemPath.endsWith('.png')
}

interface FileItemViewModel {
  materialIcon: string,
  downloadURL: string | null,
  previewURL: string | null,
}

export default defineComponent({
  name: 'FileItem',
  props: {
    archiveName: {
      type: String,
      required: true
    },
    item: {
      type: Object as PropType<ArchiveFileDTO>,
      required: true
    }
  },
  data () {
    return {
      isLoaded: false
    }
  },
  methods: {
    onImgLoad () {
      this.isLoaded = true
    }
  },
  setup (props) {
    const fileInfo = computed((): FileItemViewModel => {
      const unknown = 'description'

      if (!props.item.Path) {
        return {
          materialIcon: unknown,
          downloadURL: null,
          previewURL: null
        }
      }

      const itemPath = props.item.Path.toLowerCase()
      const link = getAPIURL(`/archives/${props.archiveName}/files/${props.item.Path}`)

      if (previewEnabled(itemPath)) {
        return {
          materialIcon: 'image',
          downloadURL: link,
          previewURL: getAPIURL(`/archives/${props.archiveName}/thumbnails/${props.item.Path}`)
        }
      } else {
        return {
          materialIcon: unknown,
          downloadURL: link,
          previewURL: null
        }
      }
    })

    return {
      fileInfo
    }
  }
})
</script>

<style>
a.file-item {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;

  background: white;
  border: 1px solid rgba(0, 0, 0, 0.20);
  border-radius: 6px;

  display: flex;
  align-items: stretch;
  justify-content: stretch;
  flex-direction: column;
  overflow: hidden;

  font-size: 0.8125rem;
  color: rgba(0, 0, 0, 0.720);
  font-weight: bold;

  text-decoration: none;
}

.file-item .content-preview {
  flex: 1 1 0;
  color: #FCAC1C;

  display: flex;
  align-items: center;
  justify-content: space-around;

  flex-direction: column;
}

.file-item .content-preview img {
  max-width: 100%;
  max-height: 100%;
  object-fit: cover;
  flex-grow: 1;
}

.file-item .content-preview span {
  font-size: 6.5rem;
}

.file-item .file-name {
  padding: 6px;

  display: flex;
  flex-direction: row;
  align-items: center;
}

.file-item .file-name * {
  flex: 1 1 0;
}

.file-item .file-name *:first-child {
  flex: 0 0 auto;
  color: #FCAC1C;
  margin-right: 4px;

  font-size: 1rem;
}

.file-item .file-name *:last-child {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
</style>
