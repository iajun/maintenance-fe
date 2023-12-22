import { NoNameFieldMetaMap, Resource } from '../types'

export const UserDepartmentsFieldMeta: NoNameFieldMetaMap = {
  user_id: {
    display_name: '用户',
    value_type: 'uuid',
    relation: {
      resource: Resource.Users,
      type: 'ForeignKey',
      field: 'id',
      display_field: 'displayName',
    },
    rules: {
      required: true,
    },
    can_edit: true,
    can_search: true,
    display_in_table: true,
    display_in_option: false,
  },
  department_id: {
    display_name: '部门',
    value_type: 'uuid',
    relation: {
      resource: Resource.Departments,
      type: 'ForeignKey',
      field: 'id',
      display_field: 'name',
    },
    rules: {
      required: true,
    },
    can_edit: true,
    can_search: true,
    display_in_table: true,
    display_in_option: false,
  },
}
