
export interface CommunicationQuestion {
  question: string
  options: string[]
  correctAnswer: string
  explanation: string
}

export interface CommunicationActivity {
  id: string
  title: string
  description: string
  instruction: string
  type: 'scenario' | 'listening' | 'reflection' | 'sequence'
  passage?: string
  questions?: CommunicationQuestion[]
  steps?: string[]
  correctSequence?: string[]
  prompts?: string[]
  feedback: string
}

export const communicationActivities: CommunicationActivity[] = [
  {
    id: 'my-voice',
    title: 'My voice matters',
    description: 'Discover why your ideas are important.',
    instruction:
      'Read the situation and choose a helpful way to express yourself.',
    type: 'scenario',

    questions: [
      {
        question:
          'Your group is planning a school project. You have an idea, but you are nervous about sharing it. What could you say?',
        options: [
          'I have an idea. Can I share it?',
          'My ideas are not important.',
          'Everyone must agree with me.',
        ],
        correctAnswer:
          'I have an idea. Can I share it?',
        explanation:
          'You can share your ideas respectfully without needing everyone to agree.',
      },
      {
        question:
          'Someone has a different opinion from yours. How could you respond?',
        options: [
          'You are wrong.',
          'I understand your point. I see it differently.',
          'I will never share my ideas again.',
        ],
        correctAnswer:
          'I understand your point. I see it differently.',
        explanation:
          'People can disagree while treating each other with respect.',
      },
    ],

    feedback:
      'Your ideas are valuable. You can express yourself while respecting the ideas of others.',
  },

  {
    id: 'my-feelings',
    title: 'Expressing my feelings',
    description: 'Find the words to express how you feel.',
    instruction:
      'Explore different ways to communicate emotions respectfully.',
    type: 'scenario',

    questions: [
      {
        question:
          'A learner is struggling to understand an activity and feels frustrated. What could they say?',
        options: [
          'I am finding this difficult. Can we try another way?',
          'I am never going to learn anything.',
          'Everyone else must stop working.',
        ],
        correctAnswer:
          'I am finding this difficult. Can we try another way?',
        explanation:
          'Naming a difficulty and asking for support can help others understand what you need.',
      },
      {
        question:
          'A learner feels overwhelmed by a noisy classroom. What could they say?',
        options: [
          'I need a quiet moment to concentrate.',
          'Nobody is allowed to talk.',
          'I must pretend everything is fine.',
        ],
        correctAnswer:
          'I need a quiet moment to concentrate.',
        explanation:
          'Communicating your needs is a useful way to ask for support.',
      },
    ],

    feedback:
      'Learning to express emotions and needs can help people understand and support one another.',
  },

  {
    id: 'active-listening',
    title: 'Listen and understand',
    description: 'Practise listening and finding important information.',
    instruction:
      'Listen to the short story or read it at your own pace. Then answer the questions.',
    type: 'listening',

    passage:
      'Litha noticed that many learners struggled to find a quiet place to study after school. She spoke to her classmates and suggested creating a study group in the school library. The group decided to meet every Wednesday. Learners would help one another understand difficult subjects and share learning resources.',

    questions: [
      {
        question:
          'What problem did Litha notice?',
        options: [
          'Learners needed a quiet place to study.',
          'The school needed a sports team.',
          'Learners had too many books.',
        ],
        correctAnswer:
          'Learners needed a quiet place to study.',
        explanation:
          'The story begins by introducing the difficulty learners experienced.',
      },
      {
        question:
          'Where would the study group meet?',
        options: [
          'The school library',
          'The sports field',
          'The school entrance',
        ],
        correctAnswer: 'The school library',
        explanation:
          'Litha suggested using the school library as a quiet study space.',
      },
      {
        question:
          'What was the main purpose of the group?',
        options: [
          'To compete against each other',
          'To support one another with learning',
          'To avoid schoolwork',
        ],
        correctAnswer:
          'To support one another with learning',
        explanation:
          'The group was created to encourage cooperation and shared learning.',
      },
    ],

    feedback:
      'Listening carefully helps us identify important information and understand the main idea.',
  },

  {
    id: 'conversations',
    title: "Let's have a conversation",
    description: 'Practise respectful everyday communication.',
    instruction:
      'Choose a helpful response in each conversation.',
    type: 'scenario',

    questions: [
      {
        question:
          'Classmate: I do not understand this question. Can you help me?',
        options: [
          'Let us read the question together.',
          'You should already know the answer.',
          'That is not my problem.',
        ],
        correctAnswer:
          'Let us read the question together.',
        explanation:
          'A supportive response encourages cooperation.',
      },
      {
        question:
          'Teacher: Can you explain how you reached your answer?',
        options: [
          'I can explain the steps I followed.',
          'My answer is the only thing that matters.',
          'There is nothing to explain.',
        ],
        correctAnswer:
          'I can explain the steps I followed.',
        explanation:
          'Explaining your thinking helps others understand your learning process.',
      },
      {
        question:
          'Classmate: I would like to finish explaining my idea.',
        options: [
          'Of course. I am listening.',
          'My idea is more important.',
          'You have spoken enough.',
        ],
        correctAnswer:
          'Of course. I am listening.',
        explanation:
          'Giving others time to speak is part of respectful communication.',
      },
    ],

    feedback:
      'Good communication includes listening, responding thoughtfully and respecting different perspectives.',
  },

  {
    id: 'storytelling',
    title: 'Tell me a story',
    description: 'Organise ideas into a meaningful sequence.',
    instruction:
      'Select the sentences in the order that makes the story easy to understand.',
    type: 'sequence',

    steps: [
      'Finally, the group presented their solution to the class.',
      'The group worked together to develop a solution.',
      'First, the learners identified a problem at school.',
      'Next, they discussed possible ideas.',
    ],

    correctSequence: [
      'First, the learners identified a problem at school.',
      'Next, they discussed possible ideas.',
      'The group worked together to develop a solution.',
      'Finally, the group presented their solution to the class.',
    ],

    feedback:
      'Organising your ideas into a beginning, middle and ending makes your message easier to follow.',
  },

  {
    id: 'speaking-confidence',
    title: 'Speaking with confidence',
    description: 'Practise expressing your ideas in your own way.',
    instruction:
      'Imagine you are introducing an idea to your class. Use the prompts to prepare what you would like to say.',
    type: 'reflection',

    prompts: [
      'My idea is...',
      'I think this idea is important because...',
      'One way we could make it happen is...',
      'I would like others to consider...',
    ],

    feedback:
      'Communication takes practice. Clear ideas are more important than speaking perfectly.',
  },

  {
    id: 'asking-for-help',
    title: 'Asking for help',
    description: 'Learn to communicate your learning needs.',
    instruction:
      'Explore different ways to ask for support when learning becomes difficult.',
    type: 'scenario',

    questions: [
      {
        question:
          'You understand the topic but need more time to finish an activity. What could you say?',
        options: [
          'May I have a little more time to complete this?',
          'I should stop trying.',
          'I must finish before everyone else.',
        ],
        correctAnswer:
          'May I have a little more time to complete this?',
        explanation:
          'Asking for additional time can help you demonstrate what you understand.',
      },
      {
        question:
          'Written instructions are difficult to understand. What could you ask?',
        options: [
          'Could you explain the instructions aloud?',
          'I cannot learn this subject.',
          'I should just guess what to do.',
        ],
        correctAnswer:
          'Could you explain the instructions aloud?',
        explanation:
          'Receiving information in a different format can make learning more accessible.',
      },
      {
        question:
          'You still do not understand after the first explanation. What could you say?',
        options: [
          'Could we try another example?',
          'I must pretend I understand.',
          'There is no point in asking again.',
        ],
        correctAnswer:
          'Could we try another example?',
        explanation:
          'Different explanations can help us understand the same concept.',
      },
    ],

    feedback:
      'Asking for help is a valuable learning skill. Everyone deserves appropriate learning support.',
  },
]
