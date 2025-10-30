import React, { useCallback, useEffect, useMemo, useState } from 'react'
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  addEdge,
  useEdgesState,
  useNodesState,
  MarkerType,
  ConnectionMode,
  type Node
} from '@xyflow/react'
import '@xyflow/react/dist/style.css'


import { initialFlowConfig, type FlowConfig, type StepData } from './config/flow-config'
import { nodeTypes } from './config/nodeTypes'
import Sidebar from './components/Sidebar'

function toNodes(config: FlowConfig) {
  return config.steps.map((s) => ({
    id: s.key,
    type: 'step',
    data: { ...s },
    position: { x: s.x, y: s.y },
    draggable: true,
  }))
}


function toEdges(config: FlowConfig) {
  return config.edges.map((e, i) => ({
    id: e.id ?? `e-${i}`,
    source: e.source,
    target: e.target,
    label: e.label,
    type: 'smoothstep' as const,
    markerEnd: { type: MarkerType.ArrowClosed, width: 20, height: 20 },
    style: { strokeWidth: 2 },
  }))
}

export default function App() {

  const [config, setConfig] = useState<FlowConfig>(() => initialFlowConfig)
  const [nodes, setNodes, onNodesChange] = useNodesState(toNodes(config))
  const [edges, setEdges, onEdgesChange] = useEdgesState(toEdges(config))
  const [selectedId, setSelectedId] = useState<string | null>(null)


  useEffect(() => {
    setNodes(toNodes(config))
    setEdges(toEdges(config))
  }, [config, setNodes, setEdges])


  const onConnect = useCallback((params: any) => {
    setEdges((eds) => addEdge({ ...params, markerEnd: { type: MarkerType.ArrowClosed } }, eds))
  }, [setEdges])


  const onNodeClick = useCallback((_e: any, node: Node<StepData>) => setSelectedId(node?.id ?? null), [])


  const selectedNode = useMemo(() => nodes.find((n) => n.id === selectedId) as Node<StepData> | undefined, [nodes, selectedId]) ?? null

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const key = e.key.toUpperCase()
      const target = nodes.find((n) => (n.data?.hotkey ?? '').toUpperCase() === key)
      if (target) {
        setSelectedId(target.id)
        const url = (target.data as StepData)?.url
        if (url) window.open(url, '_blank', 'noopener,noreferrer')
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [nodes])


  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', gap: 12, padding: 16 }}>
      <div className="card" style={{ padding: 12 }}>
        <div className="header">
          <div>
            <div style={{ fontSize: 16, fontWeight: 600 }}>Production Investigation Flow</div>
            <div style={{ fontSize: 13, color: '#64748b' }}>Interactive, linkable steps for triage → mitigation → postmortem</div>
          </div>
          {selectedNode ? (
            <div style={{ maxWidth: '40%', textAlign: 'right', fontSize: 13, color: '#475569' }}>
              <span style={{ fontWeight: 600, color: '#0f172a' }}>Selected:</span> {selectedNode.data.title}
            </div>
          ) : (
            <div style={{ fontSize: 13, color: '#64748b' }}>Tip: click a node or press its hotkey badge</div>
          )}
        </div>
      </div>


      <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: 16, minHeight: 0, flex: 1 }}>
        <div className="card" style={{ position: 'relative' }}>
          <div className="toolbar">
            <button className="button" title="Reload config" onClick={() => setConfig((c) => ({ ...c }))}>Reload</button>
            <button className="button" title="Copy JSON" onClick={() => navigator.clipboard.writeText(JSON.stringify(config, null, 2))}>Copy JSON</button>
          </div>


          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            nodeTypes={nodeTypes}
            onNodeClick={onNodeClick}
            connectionMode={ConnectionMode.Loose}
            fitView
            fitViewOptions={{ padding: 0.2 }}
            defaultEdgeOptions={{ type: 'smoothstep' }}
          >
            <MiniMap pannable zoomable />
            <Controls position="bottom-left" />
            <Background gap={16} size={1} />
          </ReactFlow>
        </div>


        <div className="sidebar">
          <Sidebar selected={selectedNode} />
        </div>
      </div>


      <div style={{ textAlign: 'center', fontSize: 12, color: '#94a3b8' }}>@xyflow/react • Incident Flow • {new Date().getFullYear()}</div>
    </div>
  )
}