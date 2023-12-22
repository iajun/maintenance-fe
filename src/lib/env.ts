export type EnvKey =
  | 'VITE_API_URL'
  | 'VITE_API_HASURA_URL'
  | 'VITE_API_GRAPHQL_URL'
  | 'VITE_API_AUTH_URL'
  | 'VITE_API_STORAGE_URL'
  | 'VITE_API_FUNCTIONS_URL'
  | 'VITE_API_DASHBOARD_URL'
  | 'VITE_API_MAILHOG_URL'
  | 'NODE_ENV'

export const getEnv = (key: EnvKey) => {
  return import.meta.env[key]
}

export const isProd = () => {
  return import.meta.env.PROD || true
}
