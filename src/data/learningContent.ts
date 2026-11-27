
export interface LearningActivity {
  id: string
  title: string
  description: string
  instruction: string
  type: 'multiple' | 'single' | 'reflection'
  options: string[]
  feedback: string
}

export const confidenceActivities: LearningActivity[] = [
  {
    id: 'discover',
    title: 'Discover who I am',
    description: 'Explore the things that make you unique.',
    instruction: 'Choose the things you enjoy doing. You can choose more than one.',
    type: 'multiple',
    options: [
      'Helping other people',
      'Drawing or creating things',
      'Playing sports',
      'Solving problems',
      'Listening to music',
      'Learning about technology',
      'Telling stories',
      'Working with my hands',
      'I am still discovering what I enjoy',
    ],
    feedback:
      'Your interests are part of what makes you unique. You can discover new interests as you grow.',
  },
  {
    id: 'superpowers',
    title: 'My superpowers',
    description: 'Recognise your personal strengths.',
    instruction: 'Which strengths do you recognise in yourself or want to develop?',
    type: 'multiple',
    options: [
      'Kindness',
      'Creativity',
      'Curiosity',
      'Patience',
      'Courage',
      'Teamwork',
      'Listening',
      'Problem-solving',
      'Perseverance',
    ],
    feedback:
      'Strengths come in many forms. You can practise and develop them over time.',
  },
  {
    id: 'superhero',
    title: 'My superhero story',
    description: 'Use your imagination to create a superhero.',
    instruction:
      'Imagine a superhero inspired by your strengths. Give your character a name and describe how they help their community.',
    type: 'reflection',
    options: [],
    feedback:
      'Your imagination can help you explore new ideas and possibilities.',
  },
  {
    id: 'growth',
    title: 'I can learn',
    description: 'Explore ways to overcome learning challenges.',
    instruction:
      'Imagine you are learning something new and find it difficult. What could you try?',
    type: 'multiple',
    options: [
      'Ask someone to explain it differently',
      'Take a short break',
      'Practise one small step at a time',
      'Use pictures to understand the idea',
      'Listen to an explanation',
      'Ask a teacher for support',
    ],
    feedback:
      'There are many ways to learn. Finding the right support and strategy can make a difference.',
  },
  {
    id: 'wins',
    title: 'Small wins',
    description: 'Recognise everyday achievements.',
    instruction: 'Choose something you have done recently.',
    type: 'multiple',
    options: [
      'Tried something new',
      'Helped someone',
      'Asked a question',
      'Practised a skill',
      'Completed a task',
      'Asked for help',
      'Tried again after making a mistake',
    ],
    feedback:
      'Small achievements are worth recognising. Progress looks different for everyone.',
  },
  {
    id: 'future',
    title: 'My future self',
    description: 'Explore your hopes and goals.',
    instruction:
      'Imagine something you would like to learn or achieve in the future. What is one small step you could take?',
    type: 'reflection',
    options: [],
    feedback:
      'Your goals can change as you discover new interests. You can work towards them one step at a time.',
  },
  {
    id: 'reflection',
    title: 'My reflection',
    description: 'Reflect on your discovery journey.',
    instruction:
      'What have you discovered about yourself? You can write a few words, think about your answer or discuss it with your teacher.',
    type: 'reflection',
    options: [],
    feedback:
      'You have taken time to explore your strengths and interests. That is a meaningful step in your learning journey.',
  },
]
