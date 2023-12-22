import { CrudFilters, useList } from '@refinedev/core'
import { RelationMetaFieldInfo, UseRelationQueryProps } from './types'
import { useResource } from './useResource'
import { uniq, keyBy, merge } from 'lodash'

export function useRelationQuery(
  props: UseRelationQueryProps & { meta: RelationMetaFieldInfo },
  //TODO
): [string, any] {
  const { meta, initialData, recursive } = props
  const { resource, type, field, fieldValue, display_field } = meta.relation

  const isForeignKey = type === 'ForeignKey'
  const isDict = type === 'Dict'
  const isManyToMany = type === 'ManyToMany'

  const accessorKey = isForeignKey ? meta.name : isManyToMany ? 'id' : ''

  const value = uniq(initialData?.map((item) => item[accessorKey]).filter((v) => !!v))

  const { meta: relationResourceMeta } = useResource(resource)

  const manyToManyField = relationResourceMeta.findMeta(display_field)

  const filters: CrudFilters = []

  if (isForeignKey || isManyToMany) {
    filters.push({
      field,
      operator: 'in',
      value,
    })
  }

  if (isDict) {
    filters.push({
      field,
      operator: 'eq',
      value: fieldValue,
    })
  }

  const query = useList({
    resource,
    meta: {
      fields: [field, display_field],
    },
    pagination: {
      mode: 'off',
    },
    config: {
      filters,
    },
    queryOptions: {
      enabled: !!(filters.length && value?.length),
    },
  })

  const queryData = query.data?.data

  if (manyToManyField?.relation && recursive) {
    const relationManyToManyField = manyToManyField as RelationMetaFieldInfo
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [, childQueryResult] = useRelationQuery({
      ...props,
      meta: relationManyToManyField,
      initialData: queryData,
    })

    const map: Record<string, any> = keyBy(childQueryResult.data?.data ?? [], manyToManyField.relation.field)

    const finalData = queryData?.map((item) => ({
      ...item,
      [relationManyToManyField.relation.resource]: map[item[display_field]],
    }))

    return [meta.name, merge({}, childQueryResult, { data: { data: finalData } })]
  }

  return [meta.name, query]
}
