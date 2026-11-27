import type { Mode } from '../types/assistant'
export const modes: {id: Mode; label: string}[] = [
{id:'simple',label:'Explain it simply'}, {id:'hint',label:'Give me a hint'}, {id:'example',label:'Show me an example'}, {id:'steps',label:'Break it into steps'}, {id:'practice',label:'Help me practise'}, {id:'xhosa',label:'Explain in isiXhosa'}]
export const welcome = 'Welcome! Choose a learning mode and try a sample question. This demonstration uses prepared responses, not live AI.'
