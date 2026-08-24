/**
 * High-quality, academically curated questions for the ACM-W Recruitment Challenge.
 * Covers ACM-W initiatives, AI/ML fundamentals, computing history, and ethics.
 */

/** @type {import('../types/quiz').Question[]} */
export const questions = [
  {
    id: 1,
    category: 'ACM-W',
    question: 'What does ACM-W primarily focus on within the global computing community?',
    options: [
      'Supporting, celebrating, and advocating for women in computing',
      'Selling discounted hardware to engineering students',
      'Certifying proprietary programming language compilers',
      'Managing intercollegiate sports tournaments',
    ],
    correctIndex: 0,
    difficulty: 'Easy',
    explanation:
      'ACM-W supports, celebrates, and advocates internationally for the full engagement of women in all aspects of the computing field, providing a wide range of programs and services to members.',
    tags: ['ACM-W', 'Community', 'Mission'],
  },
  {
    id: 2,
    category: 'ARTIFICIAL INTELLIGENCE',
    question: 'What is the Turing Test designed to evaluate?',
    options: [
      'The raw computational clock speed of a processor',
      "A machine's ability to exhibit intelligent behavior indistinguishable from a human",
      'The time complexity and memory overhead of sorting algorithms',
      'Network bandwidth throughput across distributed clusters',
    ],
    correctIndex: 1,
    difficulty: 'Easy',
    explanation:
      'Introduced by Alan Turing in 1950, the Turing Test assesses whether a machine can converse and demonstrate natural language intelligence such that a human evaluator cannot reliably tell it apart from another human.',
    tags: ['AI Fundamentals', 'Alan Turing', 'Evaluation'],
  },
  {
    id: 3,
    category: 'COMPUTING HISTORY',
    question: 'Which prestigious annual honor is widely referred to as the "Nobel Prize of Computing"?',
    options: [
      'The Fields Medal',
      'The Pulitzer Award for Technology',
      'The ACM A.M. Turing Award',
      'The Von Neumann Pioneer Medal',
    ],
    correctIndex: 2,
    difficulty: 'Easy',
    explanation:
      'The ACM A.M. Turing Award is recognized as computing’s highest honor, accompanied by a $1 million prize with financial support provided by Google.',
    tags: ['ACM', 'Awards', 'History'],
  },
  {
    id: 4,
    category: 'ARTIFICIAL INTELLIGENCE',
    question: 'Which machine learning paradigm relies on labeled training pairs (input and ground truth target)?',
    options: [
      'Unsupervised Learning',
      'Reinforcement Learning through environment feedback',
      'Self-Organizing Clustering',
      'Supervised Learning',
    ],
    correctIndex: 3,
    difficulty: 'Medium',
    explanation:
      'Supervised learning algorithms are trained using datasets that include both input features and the corresponding target labels, enabling the model to learn mapping functions for classification or regression.',
    tags: ['Machine Learning', 'Supervised Learning'],
  },
  {
    id: 5,
    category: 'ACM-W',
    question: 'What is the primary objective of the ACM-W Scholarship program for student members?',
    options: [
      'Enabling female students to attend premier computing research conferences',
      'Financing campus mainframe server hardware purchases',
      'Subsidizing undergraduate dorm housing fees',
      'Purchasing general-purpose software licenses for universities',
    ],
    correctIndex: 0,
    difficulty: 'Medium',
    explanation:
      'The ACM-W Scholarship Fund awards scholarships for female undergraduate and graduate students in computer science and related programs to attend research conferences.',
    tags: ['ACM-W', 'Scholarships', 'Research'],
  },
  {
    id: 6,
    category: 'ARTIFICIAL INTELLIGENCE',
    question: 'Modern Artificial Neural Networks (ANNs) were conceptually inspired by which biological system?',
    options: [
      'Fluid dynamics in circulatory cardiovascular systems',
      'Interconnected biological neurons and synaptic firing in the human brain',
      'Photosynthetic chloroplast electron transport chains',
      'Geological tectonic plate stress distributions',
    ],
    correctIndex: 1,
    difficulty: 'Easy',
    explanation:
      'ANNs were initially conceptualized as mathematical models mimicking how biological neurons connect via synapses, activate based on weighted inputs, and learn via plasticity (backpropagation).',
    tags: ['Deep Learning', 'Neural Networks'],
  },
  {
    id: 7,
    category: 'ARTIFICIAL INTELLIGENCE',
    question: 'What does the abbreviation "NLP" stand for in modern AI research?',
    options: [
      'Non-Linear Programming',
      'Network Layer Protocol',
      'Natural Language Processing',
      'Neural Logical Parsing',
    ],
    correctIndex: 2,
    difficulty: 'Easy',
    explanation:
      'Natural Language Processing (NLP) is the interdisciplinary subfield of computer science, artificial intelligence, and linguistics concerned with the interactions between computers and human language.',
    tags: ['NLP', 'AI Terminology'],
  },
  {
    id: 8,
    category: 'ARTIFICIAL INTELLIGENCE',
    question: 'Which neural network architecture is the foundational standard for spatial pattern and image recognition?',
    options: [
      'Recurrent Feedback Automata',
      'Binary Decision Forests',
      'K-Nearest Neighbor Arrays',
      'Convolutional Neural Networks (CNNs)',
    ],
    correctIndex: 3,
    difficulty: 'Medium',
    explanation:
      'Convolutional Neural Networks (CNNs) employ convolutional filter kernels that preserve spatial hierarchies in 2D/3D grids, making them exceptionally suited for computer vision and image classification.',
    tags: ['Computer Vision', 'CNN', 'Deep Learning'],
  },
  {
    id: 9,
    category: 'ACM-W',
    question: 'What is the primary role of an ACM-W Student Chapter within an academic institution?',
    options: [
      'Fostering peer mentorship, professional development, and technical growth for women in computing',
      'Auditing departmental course grades and student attendance',
      'Managing campus bookstore retail operations',
      'Providing proprietary tech support for university administrative staff',
    ],
    correctIndex: 0,
    difficulty: 'Easy',
    explanation:
      'ACM-W Student Chapters serve as on-campus communities that connect students, organize hackathons and tech talks, provide mentorship, and build supportive networks for underrepresented technologists.',
    tags: ['ACM-W', 'Student Chapters', 'Mentorship'],
  },
  {
    id: 10,
    category: 'ARTIFICIAL INTELLIGENCE',
    question: 'In machine learning, what does the term "overfitting" describe?',
    options: [
      'When a model is too simplistic to capture underlying data relationships (high bias)',
      'When a model memorizes noise in training data and fails to generalize to unseen test data',
      'When model weights overflow system memory during distributed tensor gradient descent',
      'When training convergence occurs too rapidly in fewer than two epochs',
    ],
    correctIndex: 1,
    difficulty: 'Medium',
    explanation:
      'Overfitting occurs when a statistical model or neural network aligns too closely with the specific training data points, capturing spurious noise rather than general patterns, which leads to poor test performance.',
    tags: ['Machine Learning', 'Model Evaluation', 'Overfitting'],
  },
  {
    id: 11,
    category: 'COMPUTING HISTORY',
    question: 'Why is Ada Lovelace celebrated as the world’s first computer programmer?',
    options: [
      'She constructed the physical ENIAC vacuum-tube electronic calculator',
      'She authored the first published algorithm intended for implementation on Babbage’s Analytical Engine',
      'She created the original Fortran compiler for IBM in the 1950s',
      'She proved the theoretical Halting Problem undecidability theorem',
    ],
    correctIndex: 1,
    difficulty: 'Medium',
    explanation:
      'In 1843, Ada Lovelace published notes on Charles Babbage’s Analytical Engine that included an algorithm for calculating Bernoulli numbers, recognized today as the first computer algorithm.',
    tags: ['Computing History', 'Ada Lovelace', 'Pioneers'],
  },
  {
    id: 12,
    category: 'ETHICS & SOCIETY',
    question: 'Which core principle is explicitly highlighted in the ACM Code of Ethics and Professional Conduct?',
    options: [
      'Contributing to society and human well-being while acknowledging all people are stakeholders',
      'Prioritizing corporate patent monetization over open security vulnerability disclosures',
      'Restricting technical documentation access strictly to licensed executives',
      'Maximizing algorithmic compute consumption without environmental regard',
    ],
    correctIndex: 0,
    difficulty: 'Medium',
    explanation:
      'Section 1.1 of the ACM Code of Ethics states that computing professionals must contribute to society and human well-being, acknowledging that all people are stakeholders in computing systems.',
    tags: ['ACM', 'Ethics', 'Professional Conduct'],
  },
];

export default questions;
