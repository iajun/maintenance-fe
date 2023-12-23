import { useSelect } from '@refinedev/core'
import { Resource } from '@meta'
import { FieldMetaInfo } from '@meta'
import { useMemoizedFn } from 'ahooks'
import { fromPairs } from 'lodash'
import { useResource } from '../core/useResource'
import { useRef } from 'react'
import { RelationMetaFieldInfo } from '../types'
import { useRelationSelect } from './useRelationSelect'

export function useRelationSelects(resource: Resource) {
  const { meta } = useResource(resource)

  // relationMetas should not be changed cuz of hook cycles
  const relationMetas = useRef(
    meta
      .getMetas('relation')
      .filter(
        (meta): meta is RelationMetaFieldInfo =>
          !!meta.relation?.resource && meta.relation?.resource !== resource && meta.can_edit,
      ),
  ).current

  const queries: Record<string, ReturnType<typeof useSelect>> = fromPairs(
    relationMetas.map((meta) =>
      // eslint-disable-next-line react-hooks/rules-of-hooks
      useRelationSelect({ meta }),
    ),
  )

  const getSelect = useMemoizedFn((field: FieldMetaInfo) => {
    return queries[field.name]
  })

  return {
    getSelect,
  }
}
