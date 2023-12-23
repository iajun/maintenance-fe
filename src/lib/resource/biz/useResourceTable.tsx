import { useResource } from '../core/useResource'
import { useMemo } from 'react'
import { ColumnProps } from 'antd/es/table'
import { ResourceItemType } from '@typings'
import { UseInferFetchProps } from '../types'
import { BaseRecord, HttpError } from '@refinedev/core'
import { useResourceList } from './useResourceList'
import { FieldMetaInfo } from '@meta'

export interface UseResourceTableProps<TQueryFnData, TError, TData>
  extends UseInferFetchProps<TQueryFnData, TError, TData> {
  fields?: {
    column?: string[]
    editable?: string[]
  }
}

export function useResourceTable<
  TQueryFnData extends BaseRecord = BaseRecord,
  TError extends HttpError = HttpError,
  TData extends BaseRecord = TQueryFnData,
>(props: UseResourceTableProps<TQueryFnData, TError, TData>) {
  const { resource, fields } = props

  const { meta } = useResource(resource)

  const { renderField, query } = useResourceList(props)

  const columnMetas = useMemo(() => {
    return fields?.column
      ? fields.column.map((name) => meta.findMeta(name)).filter((item): item is FieldMetaInfo => !!item)
      : meta.getMetas('column')
  }, [meta, fields?.column])

  const columns: ColumnProps<ResourceItemType>[] = useMemo(() => {
    return columnMetas.map(
      (meta): ColumnProps<ResourceItemType> => ({
        dataIndex: meta.name,
        key: meta.name,
        title: meta.display_name,
        render: (value) => renderField(meta, value),
      }),
    )
  }, [columnMetas, renderField])

  const rowKey = meta.findMeta((meta) => !!meta.primary_key)?.name ?? 'id'

  return {
    columns,
    rowKey,
    queryCore: query,
  }
}
