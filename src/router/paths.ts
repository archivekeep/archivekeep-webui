export const archiveRoute = (archiveName: string): string => {
  return '/archives/' + archiveName
}
export const archiveSubDirectoryRoute = (archiveName: string, directoryElements: string[]): string => {
  return '/archives/' + archiveName + '/' + directoryElements.join('/')
}
