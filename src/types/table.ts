import { FieldMetaInfo, Resource } from '@meta'

export type ResourceItemType = Record<string, any>

export type Action = {
  resourceName: Resource
} & (
  | {
      type: 'edit' | 'clone' | 'show'
      id: string
    }
  | {
      type: 'create'
    }
)

export type ParentRelation = {
  id: string
  resource: Resource
}

export type OptionType<Value> = {
  label: string
  value: Value
}

export type FieldMode = 'edit' | 'readOnly'

export type FieldRendererProps<Value = any> = {
  mode: FieldMode
  context: {
    // cell?: CellContext<any, any>,
    meta?: FieldMetaInfo
    loading?: boolean
    options?: OptionType<Value>[]
    value?: Value
    itemTitle?: string
    onChange?: (value: Value) => void
    [key: string]: any
  }
}
