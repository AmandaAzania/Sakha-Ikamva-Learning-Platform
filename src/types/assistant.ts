export type Mode = 'simple' | 'hint' | 'example' | 'steps' | 'practice' | 'xhosa'
export type Subject = 'General' | 'Reading' | 'Writing' | 'Mathematics' | 'Coding'
export interface Message { id: number; role: 'learner' | 'assistant'; text: string }
