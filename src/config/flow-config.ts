export type StepStatus = 'idle' | 'ok' | 'warn' | 'fail'


export type StepData = {
    key: string
    title: string
    description?: string
    url?: string
    status?: StepStatus
    owner?: string
    hotkey?: string
}


export type FlowConfig = {
    steps: Array<StepData & { x: number; y: number }>
    edges: Array<{ id?: string; source: string; target: string; label?: string }>
}


const kibana = import.meta.env.VITE_KIBANA_URL ?? 'https://kibana.example.local'

export const initialFlowConfig: FlowConfig = {
    steps: [
        { key: 'alert', title: 'Alert Received', description: 'PagerDuty / CloudWatch Alarm', url: kibana + '/incidents', status: 'warn', owner: 'SRE', hotkey: 'A', x: 0, y: 0 },
        { key: 'triage', title: 'Initial Triage', description: 'Check service health & impact', url: kibana + '/triage', status: 'warn', owner: 'On-call', hotkey: 'T', x: 0, y: 140 },
        { key: 'logs', title: 'Logs', description: 'Kibana query for errors', url: kibana, status: 'warn', owner: 'Backend', hotkey: 'L', x: -280, y: 280 },
        { key: 'metrics', title: 'Metrics', description: 'kibana latency/5xx/RPS', url: kibana, status: 'warn', owner: 'SRE', hotkey: 'M', x: 0, y: 280 },
        { key: 'db', title: 'DB Health', description: 'RDS perf insights', url: 'https://rds.console.aws.amazon.com/', status: 'ok', owner: 'DBA', hotkey: 'D', x: 280, y: 280 },
        { key: 'mitigate', title: 'Mitigate / Rollback', description: 'Feature flag / scale / rollback', url: kibana + '/mitigation', status: 'fail', owner: 'On-call', hotkey: 'R', x: 0, y: 440 },
        { key: 'comm', title: 'Comms & StatusPage', description: 'Customer & stakeholder updates', url: 'https://status.example.com', status: 'warn', owner: 'Incident Lead', x: -280, y: 440 },
        { key: 'verify', title: 'Verify Recovery', description: 'SLOs back in green?', url: kibana + '/slo', status: 'ok', owner: 'SRE', x: 280, y: 440 },
        { key: 'postmortem', title: 'Postmortem', description: '5-whys, AIs, owners & due dates', url: kibana + '/postmortems', status: 'idle', owner: 'All', x: 0, y: 620 }
    ],
    edges: [
        { source: 'alert', target: 'triage' },
        { source: 'triage', target: 'logs', label: 'errors?' },
        { source: 'triage', target: 'metrics', label: 'SLO breach?' },
        { source: 'triage', target: 'db', label: 'DB slow?' },
        { source: 'logs', target: 'mitigate' },
        { source: 'metrics', target: 'mitigate' },
        { source: 'db', target: 'mitigate' },
        { source: 'mitigate', target: 'comm' },
        { source: 'mitigate', target: 'verify' },
        { source: 'verify', target: 'postmortem' }
    ]
}