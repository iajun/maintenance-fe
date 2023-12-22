import { useResources } from '@lib/resource'
import { chain } from 'lodash'
import { AntdInferencer, InferencerComponentProps } from '@refinedev/inferencer/antd'
import { fieldTransformer } from './fieldTransformer'

export const Inferencer = (props: InferencerComponentProps) => {
  const { resources } = useResources()

  const defaultProps: InferencerComponentProps = {
    ...props,
    meta: chain(resources)
      .map(({ name, meta }) => [name, meta])
      .fromPairs()
      .value(),
    fieldTransformer,
  }
  return <AntdInferencer {...defaultProps} />
}
