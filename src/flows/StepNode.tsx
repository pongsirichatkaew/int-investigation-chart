import React, { useCallback } from 'react'
import { Handle, Position } from '@xyflow/react'
import type { StepData, StepStatus } from '../config/flow-config'


function Badge({ status }: { status?: StepStatus }) {
    if (!status) return null
    const cls =
        status === 'ok' ? 'badge badge-ok' :
            status === 'warn' ? 'badge badge-warn' :
                status === 'fail' ? 'badge badge-fail' : 'badge badge-idle'
    return <span className={cls}>{status.toUpperCase()}</span>
}


export default function StepNode({ data }: { data: StepData }) {
    const onOpen = useCallback((e: React.MouseEvent) => {
        e.stopPropagation()
        if (data.url) window.open(data.url, '_blank', 'noopener,noreferrer')
    }, [data.url])


    return (
        <div className="card" style={{ width: 288 }}>
            <div style={{ padding: 12, display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 8 }}>
                <div style={{ minWidth: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <h3 style={{ margin: 0, fontSize: 14, fontWeight: 600, color: '#0f172a' }}>{data.title}</h3>
                        <Badge status={data.status} />
                    </div>
                    {data.owner && <p style={{ margin: '4px 0 0 0', fontSize: 12, color: '#64748b' }}>Owner: {data.owner}</p>}
                </div>
                {data.url && (
                    <button className="button" title="Open link" onClick={onOpen}>Link↗</button>
                )}
            </div>
            {data.description && (
                <p style={{ margin: '0 12px 12px 12px', fontSize: 13, color: '#334155' }}>{data.description}</p>
            )}


            <Handle type="target" position={Position.Top} style={{ width: 8, height: 8, background: '#94a3b8' }} />
            <Handle type="source" position={Position.Bottom} style={{ width: 8, height: 8, background: '#94a3b8' }} />


            {data.hotkey && (
                <div style={{ position: 'absolute', right: -8, top: -8, background: '#0f172a', color: 'white', borderRadius: 6, fontSize: 10, padding: '2px 6px', boxShadow: '0 2px 8px rgba(0,0,0,0.2)' }}>
                    {data.hotkey}
                </div>
            )}
        </div>
    )
}