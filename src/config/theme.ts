import { ConfigProviderProps } from 'antd/es/config-provider'
import { RefineThemes } from '@refinedev/antd'

export const theme: ConfigProviderProps['theme'] = {
  ...RefineThemes.Blue,
  components: {
    Button: {
      borderRadius: 0,
    },
  },
}
