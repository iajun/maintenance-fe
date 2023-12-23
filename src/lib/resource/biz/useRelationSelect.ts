import { useSelect } from '@refinedev/core'
import { RelationMetaFieldInfo } from '../types'

export function useRelationSelect(props: { meta: RelationMetaFieldInfo }) {
  const { meta } = props
  const { resource: resource, display_field: labelFieldKey, field: valueFieldKey, type, fieldValue } = meta.relation

  const query = useSelect({
    resource,
    optionLabel: labelFieldKey as any,
    optionValue: valueFieldKey as any,
    meta: {
      fields: [labelFieldKey, valueFieldKey],
    },
    onSearch: (value) => [
      {
        field: labelFieldKey,
        operator: 'contains',
        value: `%${value}%`,
      },
    ],
    filters:
      type === 'Dict'
        ? [
            {
              field: valueFieldKey,
              operator: 'eq',
              value: fieldValue,
            },
          ]
        : void 0,
  })

  return [meta.name, query]
}
