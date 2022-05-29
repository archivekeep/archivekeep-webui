import { computed, Ref } from 'vue'
import { useAPI } from './fetcher'

export type ArchiveFileDTO = {
  Path: string
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const useArchiveDirectory = ({
  archiveName,
  currentDirectory
}: {
  archiveName: Ref<string>,
  currentDirectory: Ref<string[] | undefined>
}) => {
  const { data: index, error } = useAPI<ArchiveFileDTO[]>(() => `/archives/${archiveName.value}/index`)

  const allDirectories = computed(() => {
    const fullDirectories: string[] = (index.value || [])
      .flatMap(file => {
        let filename = file.Path
        let result: string[] = []

        while (filename !== '') {
          const lastSlashPosition = filename.lastIndexOf('/')
          if (lastSlashPosition === -1) {
            break
          }

          filename = filename.substr(0, filename.lastIndexOf('/', lastSlashPosition))
          result = [...result, filename]
        }

        return result
      })

    return Array.from(new Set(fullDirectories))
  })

  const currentDirectoryPath = computed(() => currentDirectory.value ? currentDirectory.value.join('/') + '/' : '')

  const directories = computed(() =>
    allDirectories.value
      .filter(dirname => dirname.startsWith(currentDirectoryPath.value) && !dirname.substr(currentDirectoryPath.value.length).includes('/'))
  )

  const files = computed(() =>
    (index.value || [])
      .filter(({ Path }) => Path.startsWith(currentDirectoryPath.value) && !Path.substr(currentDirectoryPath.value.length).includes('/'))
  )

  return {
    files,
    directories,
    error
  }
}
