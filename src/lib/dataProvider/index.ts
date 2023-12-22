import { nhost } from '../nhost'
import dataProvider from './dataProvider'
export default dataProvider

export * from './dataProvider'
export * from './liveProvider'

export * as qqlQueryBuilder from 'gql-query-builder'
export * as graphqlWS from 'graphql-ws'

export const nhostDataProvider = dataProvider(nhost)
