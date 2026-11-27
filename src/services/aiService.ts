import type { Mode, Subject } from '../types/assistant'
export function getDemoResponse(question: string, mode: Mode, subject: Subject): string {
 const q = question.toLowerCase().trim()
 if (mode === 'xhosa') return 'Molo! Masifunde inyathelo ngenyathelo. (Hello! Let us learn step by step.) Full isiXhosa explanations are not available in this demo yet.'
 if (!/^(what is a fraction\??|explain fractions\.?|help me with fractions\.?|what is a variable\??|what is a paragraph\??|what is inference\??)$/.test(q)) return 'This demonstration cannot answer that question yet. Try one of the sample questions below, or ask your educator for help. Please do not share personal information.'
 const topic = q.includes('fraction') ? 'fraction' : q.includes('variable') ? 'variable' : q.includes('paragraph') ? 'paragraph' : 'inference'
 const examples = {
 fraction: ['A fraction describes part of a whole divided into equal parts.', 'Imagine a pizza cut into four equal slices. One slice is 1/4.', 'If you have eight equal slices and choose two, what fraction is that?'],
 variable: ['A variable is a named place for a value in a program.', 'In Java, int score = 5; stores the number 5 under the name score.', 'What value does int points = 3; store?'],
 paragraph: ['A paragraph groups sentences around one main idea.', 'Start with a main idea about a school garden, then add details about its plants.', 'Write a topic sentence about a favourite school activity.'],
 inference: ['An inference is a conclusion based on clues and what you already know.', 'If someone arrives with a wet umbrella, you might infer it was raining.', 'A learner carries a library book and a reading journal. What might they be planning?']
 }
 const [definition, example, practice] = examples[topic]
 const responses: Record<Mode,string> = {simple:definition, hint:`Think about the main idea: ${definition} What clue helps you?`, example, steps:`1. ${definition}\n2. ${example}\n3. ${practice}`, practice, xhosa:''}
 return `Prepared ${subject.toLowerCase()} learning example:\n${responses[mode]}`
}
