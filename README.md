# ACM-W QuizVerse

> **AI & Computing · Knowledge Arena**  
> A minimal, elegant, production-ready recruitment quiz platform built for ACM-W Student Chapters. Designed with an editorial academic aesthetic, cloud database synchronization, comprehensive review analytics, and keyboard accessibility.

---

## 🌟 Key Features

### 1. 🗄️ Supabase Cloud Database & Graceful Offline Fallback
- **Cloud Database Support**: Dynamic question loading and real-time leaderboard persistence via Supabase PostgreSQL.
- **Zero-Config Offline Resilience**: If Supabase environment variables are omitted or offline, the app automatically and seamlessly falls back to `LocalStorage` with pre-seeded mock candidate records.
- **Visual DB Status Indicator**: Real-time header pill indicates whether the system is running in `● Supabase Connected` or `● Demo Mode (Local)` with an interactive popover explaining the active architecture.
- **Ready-to-Use Schema**: Includes [`supabase-schema.sql`](./supabase-schema.sql) with full tables, Row Level Security (RLS) policies, indexes, and seed questions.

### 2. ⏱️ Precision Countdown Timer & Auto-Submission
- **Configurable Timer**: Default 5:00 countdown for Round 1.
- **Adaptive Visual Warning**: Subtle visual amber badge at `< 60s` and pulsing crimson alert at `< 20s`.
- **Auto-Submission**: When the countdown reaches `00:00`, candidate answers are automatically evaluated and submitted safely.

### 3. 🎯 Navigation, Flagging & Accidental Submission Prevention
- **Bidirectional Navigation**: Candidates can freely navigate back (`← Previous`) and forward (`Next Question →`) to review and modify answers prior to submission.
- **Interactive Question Palette**: Visual 1–10 matrix displaying answered, unanswered, and flagged states with single-click jump capability.
- **Question Flagging**: Candidates can bookmark/flag questions for later review (`F` key or `⚑ Flag for review` button).
- **Submission Confirmation Modal**: Prevents accidental clicks by presenting a summary of answered vs. unanswered questions, flagging warnings, and quick jump buttons to missed questions.

### 4. 📊 Detailed Review Mode & Academic Explanations
- **Per-Question Explanations**: Review mode displays both the candidate's selection and the correct answer, along with an in-depth **academic explanation** covering the underlying CS/AI concept.
- **Review Filters**: Instant filtering by `All`, `Correct`, `Incorrect`, and `Flagged` questions.
- **Category Mastery Breakdown**: Visual competency analysis across ACM-W Initiatives, Artificial Intelligence, Computing History, and Ethics.

### 5. 🏆 Candidate Hall of Fame Leaderboard
- **High-Score Tracking**: Ranks candidates by highest score, lowest time taken, and accuracy percentage.
- **Interactive Submission**: Candidates can enter their name and choose custom initials avatars directly on the results screen.
- **Search & Filter**: Live candidate search filter in the Hall of Fame modal.
- **Local Reset**: Offline reset button to restore default demo records at any time.

### 6. ♿ Accessibility & Full Keyboard Navigation
- **Screen Reader Support**: Semantic HTML5, `role="radiogroup"`, `role="radio"`, `aria-checked`, and accessible progress indicators.
- **Focus Rings**: High-contrast `focus-visible:ring-2 focus-visible:ring-navy` on all interactive controls.
- **Keyboard Shortcuts**:
  - `1`, `2`, `3`, `4` or `A`, `B`, `C`, `D`: Select answer option
  - `←` or `P`: Navigate to previous question
  - `→` or `N`: Navigate to next question
  - `F`: Toggle flag for review
  - `Ctrl` + `Enter`: Open submission confirmation dialog
  - `?`: Open keyboard shortcuts helper modal

---

## 🎨 Design System & Philosophy

Inspired by prestigious academic institutions and high-end editorial technology platforms:
- **Palette**: Warm Cream (`#f8f7f5`), Crisp White (`#ffffff`), and Deep Navy Blue (`#1a2332`).
- **Typography**: Editorial serif headings (**Playfair Display**) combined with a clean modern sans-serif UI (**Inter**).
- **Restraint**: Zero distracting gamer neon, glowing badges, or glassmorphism. Refined micro-interactions, subtle borders (`#e5e5e5`), and soft elevation shadows.
- **Background**: Faint technical geometric arcs and engineering grid lines.

---

## 📂 Project Architecture

```
acm-w-quiz/
├── public/
│   └── favicon.svg              # ACM-W brand SVG favicon
├── src/
│   ├── components/              # Reusable, accessible UI components
│   │   ├── BackgroundDecoration.jsx # Subtle engineering geometric arcs
│   │   ├── Footer.jsx           # Chapter recruitment footer
│   │   ├── Header.jsx           # Branding, DB status badge, shortcuts & leaderboard triggers
│   │   ├── Hero.jsx             # Serif challenge headline & eyebrow
│   │   ├── LeaderboardModal.jsx # Candidate Hall of Fame popup with search
│   │   ├── OptionButton.jsx     # Lettered option button with radio ARIA
│   │   ├── OptionGrid.jsx       # Responsive 2x2 answer grid
│   │   ├── ProgressBar.jsx      # Progress track with interactive jump dots
│   │   ├── QuestionPalette.jsx  # Question overview matrix (answered/flagged)
│   │   ├── QuizCard.jsx         # Main white card container
│   │   ├── QuizFooter.jsx       # Previous/Next/Submit navigation footer
│   │   ├── QuizTimer.jsx        # Countdown pill with warning animations
│   │   ├── ScoreScreen.jsx      # Result metrics, review mode, leaderboard submit
│   │   ├── ShortcutsModal.jsx   # Keyboard shortcut helper dialog
│   │   └── SubmitConfirmModal.jsx # Accidental submit guard with unanswered chips
│   ├── data/
│   │   └── questions.js         # Curated 12-question dataset with explanations
│   ├── hooks/
│   │   ├── useKeyboardShortcuts.js # Keyboard listener with input guards
│   │   ├── useLeaderboard.js    # Leaderboard fetching, submitting & caching
│   │   ├── useQuiz.js           # Comprehensive quiz state machine
│   │   └── useTimer.js          # Precision countdown timer hook
│   ├── services/
│   │   ├── storage.js           # LocalStorage offline persistence & mock seeds
│   │   └── supabase.js          # Supabase client with seamless fallback
│   ├── test/
│   │   └── setup.js             # Vitest test environment configuration
│   ├── types/
│   │   └── quiz.js              # JSDoc domain type definitions & defaults
│   ├── utils/
│   │   └── quizUtils.js         # Pure algorithms for scoring, streak, shuffle, tiering
│   ├── App.jsx                  # Main application orchestrator
│   ├── index.css                # Tailwind directives & typography layers
│   └── main.jsx                 # React 18 DOM mount point
├── supabase-schema.sql          # Production SQL script for Supabase
├── .env.example                 # Safe environment variables template
├── .gitignore                   # Standard production git ignore
├── index.html                   # HTML5 entry with Google Fonts preconnect
├── package.json                 # Dependencies and npm scripts
├── tailwind.config.js           # Custom color tokens, radii, shadows
└── vite.config.js               # Vite 6 + Vitest configuration
```

---

## 🚀 Quick Start (Local Setup)

### Prerequisites
- Node.js 18+ installed on your machine.

### 1. Clone & Install Dependencies
```bash
cd acm-w-quiz
npm install
```

### 2. Start Development Server
```bash
npm run dev
```
Open **`http://localhost:5173/`** in your browser. The app runs immediately with full functionality in LocalStorage Demo Mode!

### 3. Run Automated Tests
```bash
npm test
```

### 4. Production Build
```bash
npm run build
npm run preview
```

---

## 🗄️ Supabase Cloud Database Setup (Optional)

If you would like to connect a live Supabase PostgreSQL database:

1. Create a free project at [supabase.com](https://supabase.com).
2. Open the **SQL Editor** in your Supabase Dashboard.
3. Paste the entire content of [`supabase-schema.sql`](./supabase-schema.sql) and click **Run**.
4. In your Supabase Project Settings, navigate to **API** and copy your **Project URL** and **anon public key**.
5. Create a `.env` file in the root directory:
   ```env
   VITE_SUPABASE_URL=https://your-project-id.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-public-key-here
   ```
6. Restart the dev server (`npm run dev`). The header indicator will turn green: `● Supabase Connected`.

---

## 🧪 Automated Testing Suite

The project includes unit and integration tests powered by **Vitest** and **Testing Library**:

| Test Suite | File | Coverage Areas |
|---|---|---|
| **Quiz Utilities** | `src/__tests__/quizUtils.test.js` | Scoring logic, streak calculations, accuracy rounding, MM:SS time formatters, Fisher-Yates array shuffling, option remapping, performance tiers, category breakdown, name validation. |
| **Storage & Persistence** | `src/__tests__/storage.test.js` | Seed data loading, LocalStorage read/write, leaderboard sorting (`score DESC`, `time ASC`), reset functionality. |

Run tests anytime with:
```bash
npm test
```

---

## ⌨️ Keyboard Shortcuts Reference

| Key | Action |
|---|---|
| `1` / `2` / `3` / `4` | Select Option A, B, C, or D |
| `A` / `B` / `C` / `D` | Select Option A, B, C, or D |
| `←` / `P` | Go to Previous Question |
| `→` / `N` | Go to Next Question |
| `F` | Toggle Flag for Review on active question |
| `Ctrl` + `Enter` | Trigger Submit Confirmation Modal |
| `?` | Open / Close Keyboard Shortcuts Dialog |

---

## 📜 Chapter & Licensing Note
Created for the **ACM-W Student Chapter Recruitment Challenge**. Built with academic integrity, accessible engineering standards, and clean modular code.
