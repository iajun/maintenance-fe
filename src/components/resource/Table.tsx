import { Resource } from '@meta'
import { useResourceTable } from '@lib/resource'
import { Table } from 'antd'

export type ResourceTableProps = {
  resource: Resource
}

export function ResourceTable(props: ResourceTableProps) {
  const { resource } = props

  const {
    columns,
    rowKey,
    queryCore: { isFetching: loading, data },
  } = useResourceTable({
    resource,
  })

  return (
    <Table
      {...{
        rowKey,
        dataSource: data?.data,
        loading,
        pagination: {
          total: data?.total,
        },
        columns,
      }}
    />
  )
}
