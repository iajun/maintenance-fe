import { NoNameFieldMetaMap } from '../types'

export const ClientsFieldMeta: NoNameFieldMetaMap = {
  name: {
    display_name: '客户',
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
  address: {
    display_name: '地址',
    value_type: 'text',
    rules: {
      required: false,
    },
    can_edit: true,
    can_search: true,
    display_in_table: false,
    display_in_option: false,
  },
  contact_person: {
    display_name: '联系人',
    value_type: 'text',
    rules: {
      required: false,
      maxLength: 255,
    },
    can_edit: true,
    can_search: true,
    display_in_table: true,
    display_in_option: false,
  },
  contact_phone: {
    display_name: '联系人电话',
    value_type: 'text',
    rules: {
      required: false,
      maxLength: 20,
    },
    can_edit: true,
    can_search: true,
    display_in_table: true,
    display_in_option: false,
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
