import { CrudFilters, useList } from '@refinedev/core'
import { RelationMetaFieldInfo, UseRelationQueryProps } from '../types'
import { uniq } from 'lodash'
import { useCallback, useMemo } from 'react'

export function useRelationQuery(props: UseRelationQueryProps & { meta: RelationMetaFieldInfo }) {
  const { meta, initialData } = props
  const { resource, type, field, fieldValue, display_field } = meta.relation

  const isForeignKey = type === 'ForeignKey'
  const isDict = type === 'Dict'
  const isManyToMany = type === 'ManyToMany'

  const accessorKey = isForeignKey || isDict ? meta.name : isManyToMany ? 'id' : ''

  const value = uniq(initialData?.map((item) => item[accessorKey]).filter((v) => !!v))

  const filters: CrudFilters = []

  if (isForeignKey || isManyToMany) {
    filters.push({
      field,
      operator: 'in',
      value,
    })
  }

  if (isDict && fieldValue) {
    filters.push({
      field: isDict ? 'dict_key' : field,
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

  const options = useMemo(() => {
    return query?.data?.data.map((item) => ({
      label: item[meta.relation?.display_field ?? ''],
      value: item[meta.relation?.field ?? ''],
    }))
  }, [query.data?.data, meta.relation])

  const getDisplayName = useCallback(
    (value: string) => {
      if (meta.relation) {
        if (query.isFetching) return 'loading...'
        return query.data?.data.find((item) => item[meta.relation?.field || 'id'] === value)?.[
          meta.relation.display_field
        ]
      }
      return value
    },
    [meta.relation, query.data?.data, query.isFetching],
  )

  return { query, options, getDisplayName }
}
