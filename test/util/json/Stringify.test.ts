import { describe, it } from 'mocha'
import { expect } from 'chai'
import { GraphUtil } from '../../../index'
import { IGeneralNodeGraph } from '../../../src/types/GraphInterface'
import { UndirectedGraph, WeightedUndirectedGraph } from '../../../src/mutable/UndirectedGraphs'
import { DirectedGraph, WeightedDirectedGraph } from '../../../src/mutable/DirectedGraphs'

const { stringify } = GraphUtil.json

describe('Test stringify', function () {
  it('should stringify empty graph', function () {
    let graph: IGeneralNodeGraph<number> = new DirectedGraph<number>()
    let json = stringify(graph).replace(/ /g, '')
    expect(json.includes('"nodes":[]')).is.true
    expect(json.includes('"edges":[]')).is.true
    expect(json.includes('"undirected":false')).is.true
    expect(json.includes('"weighted":false')).is.true

    graph = new UndirectedGraph<number>()
    json = stringify(graph).replace(/ /g, '')
    expect(json.includes('"nodes":[]')).is.true
    expect(json.includes('"edges":[]')).is.true
    expect(json.includes('"undirected":true')).is.true
    expect(json.includes('"weighted":false')).is.true

    graph = new WeightedDirectedGraph<number, number>()
    json = stringify(graph).replace(/ /g, '')
    expect(json.includes('"nodes":[]')).is.true
    expect(json.includes('"edges":[]')).is.true
    expect(json.includes('"undirected":false')).is.true
    expect(json.includes('"weighted":true')).is.true

    graph = new WeightedUndirectedGraph<number, number>()
    json = stringify(graph).replace(/ /g, '')
    expect(json.includes('"nodes":[]')).is.true
    expect(json.includes('"edges":[]')).is.true
    expect(json.includes('"undirected":true')).is.true
    expect(json.includes('"weighted":true')).is.true
  })

  it('should stringify into readable graph json', function () {
    const graph = new DirectedGraph<number>()
    graph.insert(0, 1, 2)
    graph.connect(1, 2)
    const json = stringify(graph).replace(/\s/g, '')
    expect(json.includes('"nodes":[0,1,2]')).is.true
    expect(json.includes('"edges":[{"source":1,"target":2}]')).is.true
  })

  it('should emit each edge once for undirected graph', function () {
    const graph = new UndirectedGraph<number>()
    graph.insert(0, 1)
    graph.connect(0, 1)
    const json = stringify(graph).replace(/\s/g, '')
    expect(json.includes('"nodes":[0,1]'))
    expect((json.includes('"edges":[{"source":0,"target":1}]') ? 1 : 0) ^
      (json.includes('"edges":[{"source":1,"target":0}]') ? 1 : 0)).equals(1)
  })
})
