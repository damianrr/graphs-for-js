import { GraphType } from '../../types/GraphType'
import { GraphJson } from './GraphJson'
import { ReadonlyGraph } from '../../types/GraphSystem'

export const stringify = <V, E> (
  graph: ReadonlyGraph<V, E>
): string => {
  const nodes = graph.nodes()
  const edges = graph.edges()

  const {
    NonWeightedUndirected,
    WeightedDirected,
    WeightedUndirected
  } = GraphType

  const gType = graph.getGraphType()
  const isUndirected = gType === NonWeightedUndirected || gType === WeightedUndirected
  const isWeighted = gType === WeightedDirected || gType === WeightedUndirected
  const json: GraphJson = {
    undirected: isUndirected,
    weighted: isWeighted,
    edges: edges.map(({ source, value, target }) => {
      return { source, value, target }
    }),
    nodes: nodes
  }
  return JSON.stringify(json, undefined, 2)
}
