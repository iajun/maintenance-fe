import { NoNameFieldMetaMap, Resource } from '../types'

export const DictItemsFieldMeta: NoNameFieldMetaMap = {
  label: {
    display_name: '展示名',
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
  value: {
    display_name: '值',
    value_type: 'number',
    rules: {
      required: true,
      maxLength: 255,
    },
    can_edit: true,
    can_search: false,
    display_in_table: true,
    display_in_option: true,
  },
  sort_order: {
    display_name: '顺序',
    value_type: 'number',
    rules: {
      required: false,
    },
    can_edit: true,
    can_search: true,
    display_in_table: true,
    display_in_option: false,
  },
  dict_key: {
    display_name: '字典',
    value_type: 'uuid',
    relation: {
      resource: Resource.Dicts,
      type: 'ForeignKey',
      field: 'key',
      display_field: 'name',
    },
    rules: {
      required: true,
    },
    can_edit: false,
    can_search: true,
    display_in_table: false,
    display_in_option: false,
  },
  parent_id: {
    display_name: '父类',
    value_type: 'uuid',
    relation: {
      resource: Resource.DictItems,
      type: 'ForeignKey',
      field: 'id',
      display_field: 'label',
    },
    rules: {
      required: false,
    },
    can_edit: false,
    can_search: true,
    display_in_table: false,
    display_in_option: false,
  },
  meta: {
    display_name: '元数据',
    value_type: 'unknown',
    rules: {
      required: false,
    },
    can_edit: true,
    can_search: false,
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
