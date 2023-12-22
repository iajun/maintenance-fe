import { FieldMetaInfo, FieldMetaMap, NoNameFieldMetaMap, Resource } from './types'
import {
  UserFieldMeta,
  DictsFieldMeta,
  DictItemsFieldMeta,
  ProjectsFieldMeta,
  ClientsFieldMeta,
  DepartmentsFieldMeta,
  UserDepartmentsFieldMeta,
} from './tables'
import { withReservedFields } from './tables/_reserved'

const mapNameToMeta = (meta: NoNameFieldMetaMap) => {
  return Object.entries(meta).reduce(
    (acc, [key, value]) => {
      acc[key] = {
        ...value,
        name: key,
      }
      return acc
    },
    {} as Record<string, FieldMetaInfo>,
  )
}

export const ResourceMetaMap: Record<Resource, FieldMetaMap> = {
  [Resource.Clients]: mapNameToMeta(withReservedFields(Resource.Clients, ClientsFieldMeta)),
  [Resource.Dicts]: mapNameToMeta(withReservedFields(Resource.Dicts, DictsFieldMeta)),
  [Resource.DictItems]: mapNameToMeta(withReservedFields(Resource.DictItems, DictItemsFieldMeta)),
  [Resource.Departments]: mapNameToMeta(withReservedFields(Resource.Departments, DepartmentsFieldMeta)),
  [Resource.Projects]: mapNameToMeta(withReservedFields(Resource.Projects, ProjectsFieldMeta)),
  [Resource.Users]: mapNameToMeta(withReservedFields(Resource.Users, UserFieldMeta)),
  [Resource.UserDepartments]: mapNameToMeta(withReservedFields(Resource.UserDepartments, UserDepartmentsFieldMeta)),
}

export * from './resource'
export * from './types'
