import { NoNameFieldMetaMap, Resource } from '../types'

export const ProjectsFieldMeta: NoNameFieldMetaMap = {
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
      required: true,
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
      required: true,
      maxLength: 20,
    },
    can_edit: true,
    can_search: true,
    display_in_table: true,
    display_in_option: false,
  },
  maintenance_plan_type: {
    display_name: '维护计划类型',
    value_type: 'number',
    component_type: 'bitcheckbox',
    rules: {
      required: true,
      maxLength: 20,
    },
    relation: {
      resource: Resource.DictItems,
      type: 'Dict',
      field: 'value',
      fieldValue: 'MAINTENANCE_PLAN_TYPE',
      display_field: 'label',
    },
    can_edit: true,
    can_search: true,
    display_in_table: true,
    display_in_option: false,
  },
  remark: {
    display_name: '备注',
    value_type: 'text',
    rules: {
      required: false,
    },
    can_edit: true,
    can_search: false,
    display_in_table: true,
    display_in_option: false,
  },
}
