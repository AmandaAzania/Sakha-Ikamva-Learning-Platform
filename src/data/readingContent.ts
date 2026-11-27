
export interface ReadingQuestion {
  question: string
  options: string[]
  answer: string
  explanation: string
}

export interface ReadingActivity {
  id: string
  title: string
  description: string
  instruction: string
  type: 'quiz' | 'reading' | 'sequence' | 'reflection'
  passage?: string
  questions?: ReadingQuestion[]
  words?: string[]
  correctSequence?: string[]
  prompts?: string[]
  feedback: string
}

const gardenStory =
  'One afternoon, a group of learners noticed that their school garden was no longer being used. They decided to work together to bring the garden back to life. Some learners planted seeds, while others collected water and prepared the soil. Over time, the garden became a place where learners could share ideas, develop new skills and support one another.'

export const readingActivities: ReadingActivity[] = [
  {
    id: 'vocabulary',
    title: 'Discover new words',
    description: 'Explore vocabulary and meanings.',
    instruction: 'Read each question and explore the meaning of the highlighted word.',
    type: 'quiz',
    questions: [
      {
        question: 'What does the word "collaborate" mean?',
        options: [
          'To work alone',
          'To work together',
          'To avoid a task',
        ],
        answer: 'To work together',
        explanation: 'Collaborate means working with others towards a shared goal.',
      },
      {
        question: 'What does the word "resourceful" mean?',
        options: [
          'Finding creative ways to solve problems',
          'Giving up when something is difficult',
          'Refusing to learn something new',
        ],
        answer: 'Finding creative ways to solve problems',
        explanation: 'A resourceful person finds useful ways to deal with challenges.',
      },
      {
        question: 'What does "perseverance" mean?',
        options: [
          'Finishing before everyone else',
          'Avoiding difficult activities',
          'Continuing to try when something is difficult',
        ],
        answer: 'Continuing to try when something is difficult',
        explanation: 'Perseverance means continuing your efforts even when progress takes time.',
      },
    ],
    feedback: 'Every new word gives you another way to understand and express ideas.',
  },

  {
    id: 'word-patterns',
    title: 'Break it down',
    description: 'Explore syllables and word patterns.',
    instruction: 'Listen to each word if you need to. Choose how it can be divided into syllables.',
    type: 'quiz',
    questions: [
      {
        question: 'How can we break the word "computer" into syllables?',
        options: ['com-pu-ter', 'comp-uter', 'computer'],
        answer: 'com-pu-ter',
        explanation: 'Computer has three syllables. Breaking words into smaller parts can help with reading.',
      },
      {
        question: 'How can we break the word "community" into syllables?',
        options: ['comm-unity', 'com-mu-ni-ty', 'community'],
        answer: 'com-mu-ni-ty',
        explanation: 'Community has four syllables.',
      },
      {
        question: 'How can we break the word "education" into syllables?',
        options: ['edu-cation', 'educa-tion', 'ed-u-ca-tion'],
        answer: 'ed-u-ca-tion',
        explanation: 'Education has four syllables. You can practise saying each part slowly.',
      },
    ],
    feedback: 'Breaking unfamiliar words into smaller parts is a useful reading strategy.',
  },

  {
    id: 'sentence-building',
    title: 'Build a sentence',
    description: 'Explore how words work together.',
    instruction: 'Select the words in the correct order to create a meaningful sentence.',
    type: 'sequence',
    words: [
      'together',
      'garden.',
      'The learners',
      'the',
      'to improve',
      'worked',
    ],
    correctSequence: [
      'The learners',
      'worked',
      'together',
      'to improve',
      'the',
      'garden.',
    ],
    feedback: 'The order of words helps us communicate clear and meaningful ideas.',
  },

  {
    id: 'supported-reading',
    title: 'Read with me',
    description: 'Explore a passage with reading support.',
    instruction: 'Read or listen to the story. Adjust your reading settings to make yourself comfortable.',
    type: 'reading',
    passage: gardenStory,
    feedback: 'Reading at a comfortable pace gives you time to understand new ideas.',
  },

  {
    id: 'comprehension',
    title: 'Understand the story',
    description: 'Discover the meaning behind a passage.',
    instruction: 'Read or listen to the passage and answer the questions. You can revisit the story whenever you need to.',
    type: 'quiz',
    passage: gardenStory,
    questions: [
      {
        question: 'What problem did the learners notice?',
        options: [
          'The school library was closed.',
          'The school garden was no longer being used.',
          'The school had too many plants.',
        ],
        answer: 'The school garden was no longer being used.',
        explanation: 'The first sentence introduces the problem.',
      },
      {
        question: 'How did the learners solve the problem?',
        options: [
          'They waited for someone else.',
          'They removed the garden.',
          'They worked together to restore the garden.',
        ],
        answer: 'They worked together to restore the garden.',
        explanation: 'The learners shared responsibilities and worked towards a common goal.',
      },
      {
        question: 'What is the main idea of the story?',
        options: [
          'Working together can create positive change.',
          'Gardening is the only useful school activity.',
          'Learners should always work alone.',
        ],
        answer: 'Working together can create positive change.',
        explanation: 'The story demonstrates cooperation, creativity and shared learning.',
      },
    ],
    feedback: 'Understanding a story means connecting its details with its main message.',
  },

  {
    id: 'inference',
    title: 'Read between the lines',
    description: 'Explore clues and make inferences.',
    instruction: 'Use clues in the passage to work out information that is not directly stated.',
    type: 'quiz',
    passage:
      'Aphiwe arrived at school carrying a carefully prepared project. Before presenting, Aphiwe read through the notes several times and took a moment to prepare. After the presentation, Aphiwe smiled when classmates asked questions about the project.',
    questions: [
      {
        question: 'How might Aphiwe have felt before presenting?',
        options: [
          'Possibly nervous and wanting to prepare',
          'Completely uninterested in the project',
          'Certain that nobody would listen',
        ],
        answer: 'Possibly nervous and wanting to prepare',
        explanation: 'Reading the notes repeatedly suggests that Aphiwe wanted to feel prepared.',
      },
      {
        question: 'What does the smile after the presentation suggest?',
        options: [
          'Aphiwe wanted to leave school.',
          'Aphiwe may have felt pleased by the interest.',
          'Aphiwe disliked the questions.',
        ],
        answer: 'Aphiwe may have felt pleased by the interest.',
        explanation: 'The smile provides a clue, although we cannot know exactly what Aphiwe felt.',
      },
    ],
    feedback: 'Making inferences means using evidence and clues to develop a reasonable interpretation.',
  },

  {
    id: 'everyday-reading',
    title: 'Reading for everyday life',
    description: 'Understand notices and instructions.',
    instruction: 'Read the school notice and identify the important information.',
    type: 'quiz',
    passage:
      'SCHOOL NOTICE. A creative learning workshop will take place on Thursday in the school library from 14:30 to 15:30. Learners should bring a notebook and pen. Participation is free. Interested learners should register with their class teacher by Wednesday.',
    questions: [
      {
        question: 'Where will the workshop take place?',
        options: [
          'The school library',
          'The sports field',
          'The school hall',
        ],
        answer: 'The school library',
        explanation: 'The notice identifies the library as the workshop venue.',
      },
      {
        question: 'When must learners register?',
        options: ['Friday', 'Thursday', 'By Wednesday'],
        answer: 'By Wednesday',
        explanation: 'Registration must take place before the workshop.',
      },
      {
        question: 'What should learners bring?',
        options: [
          'Money and a laptop',
          'A notebook and pen',
          'Sports equipment',
        ],
        answer: 'A notebook and pen',
        explanation: 'The notice lists the materials learners need.',
      },
    ],
    feedback: 'Reading notices carefully helps you find information and make everyday decisions.',
  },

  {
    id: 'reading-reflection',
    title: 'My reading reflection',
    description: 'Discover which reading strategies help you.',
    instruction: 'Think about the reading activities you have explored. Choose how you would like to reflect.',
    type: 'reflection',
    prompts: [
      'Reading is easier for me when...',
      'A new word I discovered is...',
      'A reading strategy I would like to practise is...',
      'When I need reading support, I can...',
    ],
    feedback: 'Understanding how you learn can help you develop reading strategies that work for you.',
  },
]
