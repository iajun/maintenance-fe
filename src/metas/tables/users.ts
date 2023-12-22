import { NoNameFieldMetaMap } from '../types'

export const UserFieldMeta: NoNameFieldMetaMap = {
  displayName: {
    display_name: '姓名',
    value_type: 'text',
    rules: {
      required: true,
      maxLength: 255,
    },
    can_edit: true,
    can_search: true,
    display_in_table: true,
    display_in_option: true,
  },
  email: {
    display_name: '邮箱',
    value_type: 'email',
    rules: {
      required: true,
      maxLength: 255,
    },
    can_edit: true,
    can_search: true,
    display_in_table: true,
    display_in_option: false,
  },
}
