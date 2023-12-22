import { NO_OPTIONAL_FIELDS_RESOURCES, NO_RESERVED_FIELDS_RESOURCES } from '../config'
import { NoNameFieldMetaMap, Resource } from '../types'

const RESERVED_FIELDS: NoNameFieldMetaMap = {
  id: {
    display_name: 'ID',
    value_type: 'uuid',
    rules: {
      required: true,
    },
    primary_key: true,
    can_edit: false,
    can_search: false,
    display_in_table: false,
    display_in_option: true,
  },
}

const OPTIONAL_FIELDS: NoNameFieldMetaMap = {
  created_at: {
    display_name: '更新时间',
    value_type: 'date',
    can_edit: false,
    rules: {
      required: false,
    },
    can_search: false,
    display_in_table: true,
    display_in_option: false,
  },
  updated_at: {
    display_name: '创建时间',
    value_type: 'date',
    can_edit: false,
    rules: {
      required: false,
    },
    can_search: false,
    display_in_table: true,
    display_in_option: false,
  },
}

export const withReservedFields = (resource: Resource, fieldMap: NoNameFieldMetaMap) => {
  let fieldMapWithReserved = { ...fieldMap }
  if (!NO_RESERVED_FIELDS_RESOURCES.includes(resource)) {
    fieldMapWithReserved = {
      ...fieldMapWithReserved,
      ...RESERVED_FIELDS,
    }
  }
  if (!NO_OPTIONAL_FIELDS_RESOURCES.includes(resource)) {
    fieldMapWithReserved = {
      ...fieldMapWithReserved,
      ...OPTIONAL_FIELDS,
    }
  }

  return fieldMapWithReserved
}
