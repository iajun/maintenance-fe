import { Resource } from '@meta'
import { fromPairs } from 'lodash'
import { useResource } from '../core/useResource'
import { RelationMetaFieldInfo } from '../types'
import { useRelationQuery } from './useRelationQuery'
import { useRef } from 'react'

export function useRelationQueries<RecordType extends Record<string, unknown>>(props: {
  resource: Resource
  initialData?: RecordType[]
}) {
  const { resource, initialData } = props
  const { meta } = useResource(resource)

  // relationMetas should not be changed cuz of hook cycles
  const relationMetas = useRef(
    meta
      .getMetas('relation')
      .filter(
        (meta): meta is RelationMetaFieldInfo => !!meta.relation?.resource && meta.relation?.resource !== resource,
      ),
  ).current

  const queries = fromPairs(
    relationMetas
      // eslint-disable-next-line react-hooks/rules-of-hooks
      .map((meta) => [meta.name, useRelationQuery({ resource, meta, initialData })]),
  )

  return {
    queries,
  }
}
