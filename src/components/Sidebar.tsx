import type { Node } from '@xyflow/react'
import type { StepData } from '../config/flow-config'


export default function Sidebar({ selected }: { selected: Node<StepData> | null }) {
    if (!selected) {
        return (
            <div className="card" style={{ padding: 16 }}>
                <p style={{ margin: 0, fontSize: 14, color: '#334155' }}>Select a node to view details, owner, and open its link.</p>
            </div>
        )
    }


    const data = selected.data
    return (
        <div className="card" style={{ padding: 16 }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                <div>
                    <h2 style={{ margin: 0, fontSize: 16, fontWeight: 600, color: '#0f172a' }}>{data.title}</h2>
                    {data.description && <p style={{ margin: '6px 0 0 0', fontSize: 13, color: '#334155' }}>{data.description}</p>}
                </div>
            </div>
            <dl style={{ marginTop: 12, fontSize: 13, color: '#334155' }}>
                <div style={{ display: 'flex', gap: 8 }}>
                    <dt style={{ width: 72, color: '#64748b' }}>Key</dt>
                    <dd>{selected.id}</dd>
                </div>
                {data.owner && (
                    <div style={{ display: 'flex', gap: 8 }}>
                        <dt style={{ width: 72, color: '#64748b' }}>Owner</dt>
                        <dd>{data.owner}</dd>
                    </div>
                )}
                {data.hotkey && (
                    <div style={{ display: 'flex', gap: 8 }}>
                        <dt style={{ width: 72, color: '#64748b' }}>Hotkey</dt>
                        <dd>{data.hotkey}</dd>
                    </div>
                )}
            </dl>
            {data.url && (
                <a href={data.url} target="_blank" rel="noreferrer" className="button" style={{ display: 'inline-flex', marginTop: 12, textDecoration: 'none', color: '#0f172a' }}>
                    Open Link ↗
                </a>
            )}
            <div style={{ marginTop: 16 }}>
                <h3 style={{ margin: 0, fontSize: 11, color: '#64748b', letterSpacing: 0.6, textTransform: 'uppercase' }}>Guidance</h3>
                <ul style={{ margin: '8px 0 0 16px', padding: 0, color: '#334155' }}>
                    <li>Use the link to jump to Kibana/Grafana/Runbooks.</li>
                    <li>Drag nodes to re-arrange. Copy JSON to persist layout.</li>
                    <li>Press a node's hotkey (badge) to open its link.</li>
                </ul>
            </div>
        </div>
    )
}