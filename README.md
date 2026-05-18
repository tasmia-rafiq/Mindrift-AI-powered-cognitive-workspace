# Mindrift — AI-Powered Cognitive Workspace

Mindrift is an AI-powered cognitive workspace built to help people manage mental overload, burnout, and productivity paralysis in a more human and adaptive way. Traditional productivity tools expect users to already be organized, emotionally regulated, and capable of manually planning their tasks. In reality, many people experience cognitive overload where thoughts become scattered, priorities become unclear, and even small tasks start feeling overwhelming. Mindrift was created to solve this problem by transforming chaotic thoughts into structured, manageable action plans using AI.

The core idea behind Mindrift is simple: instead of forcing users to organize themselves before becoming productive, the platform organizes their thoughts for them. Users can freely unload everything on their mind through a “Mind Unload” session. The AI then analyzes the emotional tone, stress level, urgency, and context of the input to generate structured tasks, tiny actionable steps, adaptive planner blocks, and burnout-aware recommendations.

Unlike traditional task managers, Mindrift does not treat productivity as a static checklist. The platform continuously adapts based on the user’s mental state and unfinished work history. Previous unfinished tasks are intelligently blended into future planning sessions without creating duplicates or increasing overwhelm. If the user appears mentally exhausted, the system prioritizes smaller and easier tasks first while delaying cognitively heavier work until later. This creates a more realistic and emotionally aware productivity flow.

The platform architecture was designed with scalability and maintainability in mind. Mindrift uses a structured AI-processing pipeline where user thoughts are analyzed, transformed into normalized task objects, linked with planner blocks, and persisted into Supabase with relational consistency. The system includes separate persistence layers for brain dumps, tasks, guided sessions, planner blocks, and burnout reports. This allows the platform to maintain long-term contextual memory and adaptive behavior across sessions.

Mindrift also includes guided productivity sessions to help users focus on one manageable task at a time. Instead of overwhelming users with large productivity boards, the system narrows attention toward the next easiest actionable step. Tiny-step decomposition is used heavily throughout the platform to reduce mental friction and improve task initiation.

To make the system modular and enterprise-ready, the AI provider layer was abstracted into separate provider integrations. This allows Mindrift to switch between Groq and Gemini models without affecting the rest of the application architecture. The provider abstraction layer improves experimentation, scalability, and production safety while supporting future multi-model workflows.

The project was built using:
- Next.js
- TypeScript
- Supabase
- Gemini AI / Groq API
- Tailwind CSS

## Core Features

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

## Demo Video

[Link](https://drive.google.com/file/d/10A1oU6N-yaLA9_8MTar9LStukVlVkRgW/view?usp=sharing)

## Presentation Deck

[Link](https://canva.link/pjbe3pd3d7iik9j)