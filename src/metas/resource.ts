import { Resource, ResourceMetaMap } from './types'

export const ResourceMap: ResourceMetaMap = {
  users: {
    displayName: '用户',
    hasDetail: false,
    name: Resource.Users,
  },
  departments: {
    displayName: '部门',
    hasDetail: false,
    name: Resource.Departments,
  },
  clients: {
    displayName: '客户',
    hasDetail: false,
    name: Resource.Clients,
  },
  dicts: {
    displayName: '字典',
    hasDetail: true,
    name: Resource.Dicts,
    detailTables: [Resource.DictItems],
  },
  dict_items: {
    displayName: '字典项',
    hasDetail: false,
    name: Resource.DictItems,
  },
  user_departments: {
    displayName: '用户与部门',
    hasDetail: false,
    name: Resource.UserDepartments,
  },
  projects: {
    displayName: '项目',
    hasDetail: true,
    name: Resource.Projects,
  },
}
