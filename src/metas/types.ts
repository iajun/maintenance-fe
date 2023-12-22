export type FieldMetaMap = Record<string, FieldMetaInfo>
export type NoNameFieldMetaMap = Record<string, Omit<FieldMetaInfo, 'name'>>

export interface FieldMetaInfo {
  name: string
  description?: string
  display_name: string
  value_type: ValueType
  component_type?: string
  enum?: Enum
  relation?: Relation
  primary_key?: boolean
  multiple?: boolean
  rules: Rules
  can_edit: boolean
  can_search: boolean
  display_in_table: boolean
  display_in_option: boolean
  default_value?: any
}

export type ValueType =
  | 'uuid'
  | 'object'
  | 'date'
  | 'email'
  | 'image'
  | 'url'
  | 'richtext'
  | 'text'
  | 'number'
  | 'boolean'
  | 'unknown'

export interface Enum {
  table: string
  type: string
  hierarchy: boolean
}

export type RelationType = 'ForeignKey' | 'ManyToMany' | 'Dict'

export interface Relation {
  resource: Resource
  type: RelationType
  field: string
  fieldValue?: any
  display_field: string
}

export interface Rules {
  required: boolean
  maxLength?: number
  minLength?: number
  regex?: string | null
}

export enum Resource {
  Users = 'users',
  Departments = 'departments',
  Clients = 'clients',
  Dicts = 'dicts',
  DictItems = 'dict_items',
  UserDepartments = 'user_departments',
  Projects = 'projects',
}

export type ResourceMetaInfo = {
  displayName: string
  name: Resource
  hasDetail?: boolean
  detailTables?: Resource[]
}

export type ResourceMetaMap = Record<Resource, ResourceMetaInfo>

export type DictItemMetaForeign = {
  name: string
  foreign_key: Relation
}
