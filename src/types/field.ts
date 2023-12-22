import { ComponentType } from 'react'
import { FieldMode, FieldRendererProps } from '@typings'
import { ValueType } from '@meta'

export interface IFieldRendererType extends Partial<Record<FieldMode, ComponentType<FieldRendererProps['context']>>> {
  name: ValueType | 'bitcheckbox'
}

export interface IDateFieldProps {
  value?: unknown
}
