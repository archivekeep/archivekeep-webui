import { useAPI } from './fetcher'
import { ArchiveDTO } from 'src/services/types'

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const useArchives = () => {
  const { data: archives, error: archivesError } = useAPI<ArchiveDTO[]>('/archives')

  return { archives, archivesError }
}
