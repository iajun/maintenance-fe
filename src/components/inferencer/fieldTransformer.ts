import { InferencerComponentProps } from '@refinedev/inferencer/antd'

export const fieldTransformer: InferencerComponentProps['fieldTransformer'] = (field) => {
  const removeRelation = ['contact_phone']
  if (field.key === 'user_id') {
    field.relationInfer = {
      accessor: 'displayName',
      key: 'id',
      type: 'text',
    }
  }
  if (removeRelation.includes(field.key)) {
    field.relation = false
    field.canRelation = false
  }
  return field
}
