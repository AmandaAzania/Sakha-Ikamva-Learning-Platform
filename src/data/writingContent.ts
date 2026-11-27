export interface WritingActivity {
  id: string
  title: string
  description: string
  instruction: string
  question?: { options: string[]; answer: string; explanation: string }
  prompts?: string[]
  starters?: string[]
}
export const writingActivities: WritingActivity[] = [
  { id: 'ideas', title: 'From thoughts to words', description: 'Explore and organise your ideas.', instruction: 'Imagine a new school club. Plan your ideas before writing.', prompts: ['What is the club about?', 'Who could join?', 'How would it help learners?'], starters: ['My idea is', 'Learners could', 'This would help because'] },
  { id: 'sentences', title: 'Build better sentences', description: 'Create clear sentences.', instruction: 'Choose the complete sentence, then practise writing your own.', question: { options: ['The learners in the library.', 'The learners read books in the library.', 'Because the library.'], answer: 'The learners read books in the library.', explanation: 'A complete sentence expresses a complete thought.' }, prompts: ['Who is doing something?', 'What are they doing?'], starters: ['The learners', 'Our class'] },
  { id: 'spelling', title: 'Explore spelling', description: 'Discover spelling patterns.', instruction: 'Choose the correct spelling of the word meaning needed or required.', question: { options: ['neccessary', 'necesary', 'necessary'], answer: 'necessary', explanation: 'Necessary has one c and two s letters.' }, prompts: ['Use necessary in a sentence.'], starters: ['It is necessary to'] },
  { id: 'connections', title: 'Connect your ideas', description: 'Use connecting words.', instruction: 'Choose a word that explains why: We stayed inside ___ it was raining.', question: { options: ['because', 'but', 'or'], answer: 'because', explanation: 'Because introduces a reason.' }, prompts: ['Write two connected ideas.'], starters: ['I enjoy', 'However,', 'Because'] },
  { id: 'paragraph', title: 'Build a paragraph', description: 'Organise ideas into paragraphs.', instruction: 'Write a paragraph about improving your school using the three planning sections.', prompts: ['Opening: introduce your main idea.', 'Details: explain your idea with examples.', 'Closing: sum up your idea.'], starters: ['One way to improve our school is', 'For example,', 'In conclusion,'] },
  { id: 'creative', title: 'Creative writing', description: 'Bring your imagination to life.', instruction: 'Imagine a learner invents something useful for their community. Create a short fictional story.', prompts: ['Who is the character?', 'What challenge do they face?', 'How does the story end?'], starters: ['One day,', 'Suddenly,', 'Finally,'] },
  { id: 'everyday', title: 'Writing for everyday life', description: 'Practise messages and emails.', instruction: 'Draft a fictional email asking a teacher for help with a school project. Do not include real contact details.', prompts: ['Greeting', 'Explain your request', 'Thank the teacher and close'], starters: ['Dear Teacher,', 'Could you please', 'Thank you for your time.'] },
  { id: 'reflection', title: 'My writing reflection', description: 'Discover your writing strategies.', instruction: 'Think about which strategies helped you. Writing a reflection is optional.', prompts: ['What helped you get started?', 'What would you like to practise?'], starters: ['Writing is easier when', 'Next time I will'] },
]
