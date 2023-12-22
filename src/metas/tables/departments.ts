import { NoNameFieldMetaMap, Resource } from '../types'

export const DepartmentsFieldMeta: NoNameFieldMetaMap = {
  parent_id: {
    display_name: '上级部门',
    value_type: 'uuid',
    relation: {
      resource: Resource.Departments,
      type: 'ForeignKey',
      field: 'id',
      display_field: 'name',
    },
    rules: {
      required: false,
    },
    can_edit: true,
    can_search: true,
    display_in_table: false,
    display_in_option: false,
  },
  name: {
    display_name: '部门',
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
