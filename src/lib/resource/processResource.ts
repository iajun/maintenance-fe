import { FieldMetaInfo } from '@meta'
import { FilterFn, InferType } from './types'
import { Filters } from './config'

export function processMetaFields(metas: FieldMetaInfo[]) {
  const findMeta = (nameOrFilterFn: FilterFn | string) => {
    if (typeof nameOrFilterFn === 'string') {
      return metas.find((item) => item.name === nameOrFilterFn)
    } else {
      return metas.find(nameOrFilterFn)
    }
  }

  const getMetas = (type: InferType) => {
    return metas.filter(Filters[type])
  }

  const getMetaNames = (type: InferType) => {
    return getMetas(type).map((item) => item.name)
  }

  return {
    metas,
    findMeta,
    getMetas,
    getMetaNames,
  }
}
