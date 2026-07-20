# Mindrift — AI-Powered Cognitive Workspace

Mindrift is an AI-powered cognitive workspace built to help people manage mental overload, burnout, and productivity paralysis in a more human and adaptive way.

Traditional productivity tools expect users to already know what to do and how to organize themselves. In reality, many people experience cognitive overload where thoughts become scattered, priorities become unclear, and even small tasks start feeling overwhelming.

Mindrift bridges that gap by acting as an intelligent thinking partner. It was created to solve this problem by transforming chaotic thoughts into structured tasks, adaptive plans, and manageable next steps using AI.

### Why Mindrift?

Most task management applications focus on organizing work.

The core idea behind Mindrift is simple: instead of forcing users to organize themselves before becoming productive, the platform organizes their thoughts for them. Rather than treating productivity as a checklist, it considers the user's mental state, cognitive load, emotional context, and unfinished work to create realistic plans that reduce overwhelm instead of increasing it.

## 🚀 How It Works

### 1. Mind Unload

Users can freely unload everything on their mind through a “Mind Unload” session. The AI analyzes the input and extracts:
- Tasks
- Goals
- Ideas
- Concerns
- Priorities
- Hidden actionable items

### 2. AI Cognitive Analysis
Mindrift uses AI to understand more than just text. It analyzes:
- Emotional tone
- Stress level
- Urgency
- Cognitive load
- Contextual relationships
- Task dependencies

This enables the platform to generate plans that feel natural instead of robotic.

### 3. Intelligent Task Generation

Mindrift converts the brain dump into:

- Structured tasks
- Tiny actionable steps
- Planner blocks
- Burnout-aware recommendations

### 4. Adaptive Planning

Unlike traditional task managers, Mindrift does not treat productivity as a static checklist. The platform continuously adapts based on:

- Previous unfinished work
- Current mental state
- Cognitive difficulty
- Task priority
- User progress

Previous unfinished tasks are intelligently blended into future planning sessions without creating duplicates or increasing overwhelm. If signs of burnout are detected, easier tasks are prioritized while mentally demanding work is postponed to reduce overwhelm.

### 5. Guided Focus Sessions

Rather than overwhelming users with dozens of tasks, Mindrift narrows attention to one meaningful action at a time.
Guided sessions help users build momentum through focused, distraction-free execution. Tiny-step decomposition is used heavily throughout the platform to reduce mental friction and improve task initiation.

---

## ✨Core Features

- AI-powered brain dump analysis
- Burnout-aware adaptive planning
- Tiny actionable step generation
- Emotional tone detection
- Unfinished-task memory system
- Guided focus sessions
- Smart planner generation
- Structured relational data persistence
- Multi-provider AI architecture
- Adaptive cognitive workload balancing

---

## 🏗️ Architecture

Mindrift follows a modular architecture focused on scalability, maintainability, and future extensibility.

### AI Processing Pipeline

```
Brain Dump
      ↓
AI Analysis
      ↓
Task Extraction
      ↓
Task Normalization
      ↓
Planner Generation
      ↓
Supabase Persistence
      ↓
Adaptive Future Planning
```

The platform stores data in separate relational layers for:

- Brain Dumps
- Tasks
- Planner Blocks
- Guided Sessions
- Burnout Reports

This separation enables long-term contextual memory while keeping the application modular and easy to extend.

---

## 🤖 AI Provider Abstraction

The AI layer is completely abstracted from the application logic.

Instead of tightly coupling the project to a single model, Mindrift uses a provider abstraction layer that allows switching between multiple LLM providers with minimal changes.

Current providers include:
- Gemini
- Groq

This architecture makes experimentation, production deployments, and future multi-model workflows significantly easier.

---

## 🛠️ Tech Stack

### Frontend
- Next.js 16
- React.js 19
- TypeScript
- Tailwind CSS
- Recharts
- Shadcn/ui
- Framer motion

### Backend & Database
- Supabase & Supabase Auth
- PostgreSQL

### AI
- Gemini API
- Groq API

---

## 🎯 Design Principles

Mindrift was built around a few core principles:

- **Reduce cognitive friction** rather than increase productivity pressure.
- **Adapt to the user's mental state** instead of enforcing rigid workflows.
- **Break overwhelming work** into achievable steps.
- **Preserve context across sessions** through intelligent memory.
- **Keep the architecture modular** for future scalability.

---

## 🎥 Demo Video

[Link](https://drive.google.com/file/d/10A1oU6N-yaLA9_8MTar9LStukVlVkRgW/view?usp=sharing)

## 📊 Presentation Deck

[Link](https://canva.link/pjbe3pd3d7iik9j)

## 💡 Future Improvements

- Notifications & reminders
- Team collaboration
- Voice-based brain dumps
- Personalized AI coaching
- Multi-agent planning workflows
- Mobile application
