import { FieldMetaInfo, Resource } from '@meta'
import { UseListProps } from '@refinedev/core/dist/hooks/data/useList'
import { UseManyProps } from '@refinedev/core/dist/hooks/data/useMany'
import { ResourceItemType } from '@typings'
import { Required } from 'utility-types'

export type InferType = 'list' | 'one' | 'many' | 'editable' | 'column' | 'relation'

export type FilterFn = (meta: FieldMetaInfo) => boolean

export type RelationMetaFieldInfo = Required<FieldMetaInfo, 'relation'>

export interface UseRelationFetchProps<TQueryFnData, TError, TData> extends UseManyProps<TQueryFnData, TError, TData> {
  resource: Resource
}

export interface UseInferFetchProps<TQueryFnData, TError, TData>
  extends Omit<UseListProps<TQueryFnData, TError, TData>, 'resource'> {
  resource: Resource
  relation?: UseRelationFetchProps<TQueryFnData, TError, TData>
}

export interface UseRelationQueryProps {
  resource: Resource
  recursive?: boolean
  initialData?: ResourceItemType[]
}
