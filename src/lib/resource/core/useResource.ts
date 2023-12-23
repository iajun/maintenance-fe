import { Resource } from '@meta'
import { useMemo } from 'react'
import { useResources } from './useResources'

export function useResource(resourceName: Resource) {
  const { getResource } = useResources()

  const resource = useMemo(() => getResource(resourceName), [getResource, resourceName])

  return resource
}
