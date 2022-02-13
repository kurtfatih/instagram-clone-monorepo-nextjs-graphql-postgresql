import { localeServerBaseUri } from "../config"
const getServerLink = (isDevMode: boolean) => {
  if (isDevMode) return localeServerBaseUri
  return ""
}
export { getServerLink }
