import { AuthBindings } from '@refinedev/core'
import { nhost } from '../nhost'
import { RoutePath } from '@consts'

export const TOKEN_KEY = 'refine-auth'

export const authProvider: AuthBindings = {
  login: async ({ email, password }) => {
    const { error } = await nhost.auth.signIn({
      email,
      password,
    })

    if (error && error?.error !== 'already-signed-in') {
      return {
        success: false,
        error: {
          message: error.message,
          name: 'Login Error',
        },
      }
    }

    return {
      success: true,
      redirectTo: '/',
    }
  },
  logout: async () => {
    const { error } = await nhost.auth.signOut()
    if (error) {
      return {
        success: false,
        error: {
          message: error.message,
          name: 'Login Error',
        },
      }
    }

    return {
      success: true,
      redirectTo: RoutePath.LOGIN,
    }
  },
  onError: async (error) => {
    if (error.status === 401) {
      nhost.auth.refreshSession()
    }

    return {}
  },
  check: async () => {
    const isAuthenticated = await nhost.auth.isAuthenticatedAsync()
    if (isAuthenticated) {
      return {
        authenticated: true,
      }
    }

    return {
      authenticated: false,
      error: {
        message: 'Check failed',
        name: 'Not authenticated',
      },
      logout: true,
      redirectTo: RoutePath.LOGIN,
    }
  },
  getPermissions: async () => {
    const user = nhost.auth.getUser()
    if (user) {
      return user.roles
    }

    return []
  },
  getIdentity: async () => {
    const user = nhost.auth.getUser()
    if (user) {
      return {
        ...user,
        name: user.displayName,
        avatar: user.avatarUrl,
      }
    }

    return null
  },
  register: async (data) => {
    return nhost.auth
      .signUp({
        email: data.email,
        password: data.password,
      })
      .then(() => {
        return {
          success: true,
        }
      })
  },
}
