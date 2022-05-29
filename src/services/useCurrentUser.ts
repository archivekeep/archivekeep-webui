import { useAPI } from './fetcher'

export interface User {
  id?: string,
  email?: string,
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const useCurrentUser = () => {
  const { data: currentUser, error: currentUserError, ...rest } = useAPI<User>('/auth/current-user')

  return { currentUser, currentUserError, ...rest }
}
