import { FieldMetaInfo } from '@meta'
import { FilterFn, InferType } from './types'

export const Filters: Record<InferType, FilterFn> = {
  list: (item) => item.relation?.type !== 'ManyToMany',
  one: (item) => item.relation?.type !== 'ManyToMany',
  many: (item) => item.relation?.type !== 'ManyToMany',

  editable: () => true,
  column: (item: FieldMetaInfo) => item.display_in_table,
  relation: (item: FieldMetaInfo) => !!item.relation?.resource,
}
