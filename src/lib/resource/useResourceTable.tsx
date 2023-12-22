import { useResource } from './useResource'
import { useMemo } from 'react'
import { ColumnProps } from 'antd/es/table'
import { ResourceItemType } from '@typings'
import { UseInferFetchProps } from './types'
import { BaseRecord, HttpError, useList } from '@refinedev/core'
import { useRelationQueries } from './useRelationQueries'
import { BooleanField, DateField, EmailField, ImageField, NumberField, TextField, UrlField } from '@refinedev/antd'
import { useMemoizedFn } from 'ahooks'
import { FieldMetaInfo } from '@meta'

export function useResourceTable<
  TQueryFnData extends BaseRecord = BaseRecord,
  TError extends HttpError = HttpError,
  TData extends BaseRecord = TQueryFnData,
>(props: UseInferFetchProps<TQueryFnData, TError, TData>) {
  const { resource, ...listProps } = props

  const { meta } = useResource(resource)

  const query = useList(listProps)

  const { queries: relationQueries } = useRelationQueries({
    resource,
    initialData: query.data?.data,
  })

  const renderCell = useMemoizedFn((meta: FieldMetaInfo, value: any) => {
    if (!value || value === null) return
    console.log(relationQueries)

    if (meta.relation) {
      return <TextField {...{ value: relationQueries[meta.name]?.getDisplayName(value) }} />
    }

    switch (meta.value_type) {
      case 'text':
        return <TextField {...{ value }} />
      case 'email':
        return <EmailField {...{ value }} />
      case 'number':
        return <NumberField {...{ value }} />
      case 'url':
        return <UrlField {...{ value }} />
      case 'richtext':
        // TODO
        return null
      case 'object':
        // TODO
        return JSON.stringify(value)
      case 'boolean':
        return <BooleanField {...{ value }} />
      case 'date':
        return <DateField {...{ value }} />
      case 'image':
        return <ImageField {...{ value }} />
    }
  })

  const columns: ColumnProps<ResourceItemType>[] = useMemo(() => {
    const columnMetas = meta.getMetas('column')
    return columnMetas.map(
      (meta): ColumnProps<ResourceItemType> => ({
        dataIndex: meta.name,
        key: meta.name,
        title: meta.display_name,
        render: (value) => renderCell(meta, value),
      }),
    )
  }, [meta, renderCell])

  return {
    columns,
    query,
    data: query.data,
  }
}
