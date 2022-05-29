import { useAPI } from './fetcher'
import { ArchiveDTO } from 'src/services/types'
import { Ref } from 'vue'

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const useArchive = (id: Ref<string>) => {
  const { data: archive, error: archiveError } = useAPI<ArchiveDTO>(() => `/archives/${id.value}`)

  return { archive, archiveError }
}
