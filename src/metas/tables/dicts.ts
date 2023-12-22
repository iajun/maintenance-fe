import { NoNameFieldMetaMap } from '../types'

export const DictsFieldMeta: NoNameFieldMetaMap = {
  key: {
    display_name: '字典键',
    value_type: 'text',
    primary_key: true,
    rules: {
      required: true,
      maxLength: 20,
    },
    can_edit: false,
    can_search: true,
    display_in_table: true,
    display_in_option: true,
  },
  name: {
    display_name: '字典名称',
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
  description: {
    display_name: '描述',
    value_type: 'text',
    rules: {
      required: false,
    },
    can_edit: true,
    can_search: false,
    display_in_table: false,
    display_in_option: false,
  },
}
