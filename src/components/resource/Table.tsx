import { Resource } from '@meta'
import { useResourceTable } from '@lib/resource'
import { Table } from 'antd'

export type ResourceTableProps = {
  resource: Resource
}

export function ResourceTable(props: ResourceTableProps) {
  const { resource } = props

  const { columns, data, query } = useResourceTable({
    resource,
  })

  return (
    <Table
      {...{
        dataSource: data?.data,
        loading: query.isFetching,
        pagination: {
          total: data?.total,
        },
        columns,
      }}
    />
  )
}
