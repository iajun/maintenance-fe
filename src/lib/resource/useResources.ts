import { ResourceProps } from '@refinedev/core'
import { Resource, ResourceMap, ResourceMetaMap } from '@meta'
import chain from 'lodash'
import { useCallback, useMemo } from 'react'
import { processMetaFields } from './processResource'

export function useResources() {
  const getResource = useCallback((resourceName: Resource) => {
    return {
      ...ResourceMap[resourceName],
      meta: processMetaFields(Object.values(ResourceMetaMap[resourceName])),
    }
  }, [])

  const resources = useMemo(() => {
    const parentMap = chain(ResourceMap)
      .map((value, key) => value.detailTables?.map((child) => [child, key]) || [])
      .flatten()
      .fromPairs()
      .value()
    return Object.entries(ResourceMap).map(([, value]) => {
      const { name: resourceName, displayName: label } = value
      const {
        meta: { getMetaNames },
      } = getResource(resourceName)
      return {
        name: resourceName,
        list: `/${resourceName}`,
        create: `/${resourceName}/create`,
        edit: `/${resourceName}/:id/edit`,
        show: `/${resourceName}/:id/detail`,
        meta: {
          hide: parentMap[resourceName],
          label,
          getOne: {
            fields: getMetaNames('one'),
          },
          getList: {
            fields: getMetaNames('list'),
          },
          getMany: {
            fields: getMetaNames('many'),
          },
        } as ResourceProps['meta'],
      }
    })
  }, [getResource])

  return {
    resources,
    getResource,
  }
}
