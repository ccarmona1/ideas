# Interactive Quiz Application - AI Agent Instructions

## Application Overview

**Interactive learning platform** built as a React-based single page application that delivers multiple-choice quiz experiences with intelligent interaction patterns. The application specializes in educational content delivery through an intuitive drag-and-swipe interface optimized for both desktop and mobile experiences.

IMPORTANT: After any code change, always run these VSCode tasks: "Build Frontend" and "Build Backend"

### Core Educational Purpose

The application serves as a **learning assessment tool** where users progress through course-based question sets with immediate feedback mechanisms. Each incorrect answer triggers educational explanations to reinforce learning concepts, creating an iterative knowledge building experience.

### Key Features

- **Course Selection**: Browse available courses in a responsive grid layout
- **AI Course Creation**: Generate new courses using Gemini AI with customizable parameters
- **Interactive Quiz Engine**: Question-by-question progression with multiple choice answers
- **Smart Feedback System**: Immediate validation with visual confirmation
- **Educational Explanations**: Detailed explanations for incorrect answers
- **Progress Tracking**: Real-time statistics (correct/incorrect/skipped counts)
- **Flexible Navigation**: Skip questions and revisit them later
- **Cross-Platform Support**: Touch gestures for mobile, mouse interactions for desktop

## User Journey & Application Flow

### Main Application Routes

1. **Home Page (`/`)** - Course selection hub displaying available courses in a grid layout
2. **Course Quiz (`/course/:courseName`)** - Interactive quiz session for a specific course
3. **New Course (`/new-course`)** - AI-powered course creation form using Gemini

### Quiz Experience Flow

**Question Interaction Pattern:**

- Users select from 4 multiple choice options (A, B, C, D)
- **Correct answers**: Automatically advance to next question with visual feedback
- **Incorrect answers**: Show explanation screen with detailed learning content
- **Skip option**: Available via drag/click gesture - questions are requeued at the end

**Progress Management:**

- Real-time scoreboard showing correct/incorrect/remaining counts
- Questions can be skipped and will reappear later in the queue
- Quiz completion shows comprehensive statistics and accuracy percentage

**Educational Reinforcement:**

- Wrong answers trigger explanation screens showing:
  - User's selected answer marked as incorrect
  - Correct answer highlighted
  - Conceptual explanation of the topic
  - Reasoning why the selected answer was wrong
- Explanations require user interaction to continue, ensuring engagement

## Technical Architecture

### Application Structure

**Frontend (React + TypeScript + Vite):**

- Single Page Application with React Router
- Component-based architecture with reusable UI elements
- Custom hooks for data fetching and state management
- Responsive CSS with mobile-first design approach

**Key Components:**

- `App.tsx` - Main router configuration
- `Courses.tsx` - Course selection grid with loading states
- `Course.tsx` - Main quiz engine managing question flow and state
- `Question.tsx` - Individual question display with option selection
- `Explanation.tsx` - Educational feedback system for incorrect answers
- `NewCourse.tsx` - AI-powered course creation form

**Backend Integration:**

- RESTful API communication through centralized service layer
- Automatic health checks and error handling
- Loading states and offline graceful degradation

### State Management Philosophy

**Quiz Session State:**

- Current question index and progression tracking
- Answer statistics (correct/incorrect/skipped counts)
- Question queue with dynamic reordering for skipped items
- UI transition states and animation coordination

**Interaction State:**

- Selected answer tracking and validation
- Drag gesture recognition and threshold management
- Cross-platform input handling (touch/mouse/keyboard)

### Cross-Platform Interaction Design

**Unified Gesture System:**

- Desktop: Mouse clicks with hover feedback
- Mobile: Touch gestures with swipe-to-advance
- Drag detection with configurable thresholds
- Fallback click handling for accessibility

## Course Creation & Content Management

### AI-Powered Course Generation

**Course Creation Form (`/new-course`):**

- Course name (spaces automatically removed)
- Subject keywords for content generation
- Difficulty level selection (principiante/intermedio/avanzado)
- Number of questions (configurable)
- Real-time form validation with error handling

**Gemini AI Integration:**

- Automated question generation based on provided parameters
- Multiple choice format with 4 options per question
- Includes detailed explanations for educational reinforcement
- Content quality validation and error handling

### Backend Data Management

**Course System:**

- Dynamic course loading from backend repositories
- Course metadata with SHA tracking for updates
- Health check verification before application startup
- Graceful error handling with user-friendly fallbacks

**Question Format:**

- Standardized multiple choice structure (A, B, C, D)
- Single correct answer per question
- Explanation content for conceptual understanding
- Progressive difficulty suitable for educational assessment

## User Experience & Design

### Responsive Design Strategy

**Device Adaptations:**

- **Desktop**: Card-based layouts with hover effects and shadows
- **Mobile**: Touch-optimized flat design with full-width layouts
- **Tablet**: Hybrid scaling between desktop and mobile patterns
- **Accessibility**: Keyboard navigation, screen reader support, high contrast

**Visual Feedback Systems:**

- Immediate response to user interactions with smooth animations
- Color-coded answer validation (correct/incorrect/neutral states)
- Progress indicators showing quiz completion status
- Smooth transitions between application states

### Navigation & Flow Control

**Seamless Progression:**

- Automatic advancement on correct answers with visual confirmation
- Pause-and-explain pattern for incorrect answers
- Back navigation to course selection available from any state
- Completion celebration with detailed performance analytics

**Interaction Management:**

- Automatic scroll-to-top on state transitions
- Touch event optimization for responsive feel
- Gesture area isolation to prevent navigation interference
- Never blocking native scroll functionality

## Development Guidelines

### Code Organization

**Component Architecture:**

- Single responsibility principle for all components
- Clear separation between UI components and business logic
- Reusable component design for consistency
- TypeScript enforcement throughout the application

**State Management:**

- Custom hooks for data fetching (`useGetCourses`, `useGetQuestions`)
- Local component state for UI-specific concerns
- Centralized quiz state management in main Course component
- Immutable state updates to prevent side effects

### Quality Standards

**Performance Requirements:**

- Sub-100ms response to user interactions
- Smooth animations without frame drops
- Efficient memory usage during extended sessions
- Quick loading times for course and question data

**Reliability:**

- Graceful error handling with user-friendly messages
- Automatic recovery from temporary network issues
- Consistent behavior across different devices and browsers
- Comprehensive E2E testing with Playwright

### Testing Strategy

**End-to-End Testing:**

- Complete user journey validation
- Cross-browser compatibility testing
- Drag gesture functionality verification
- Answer selection and progression flow testing
- Explanation system interaction testing

**Development Workflow:**

- Always run "Build Frontend" and "Build Backend" tasks after changes
- TypeScript compilation error checking
- Automated testing pipeline integration

---

## Current Status: Production Ready

This application represents a mature, fully-functional educational platform with sophisticated interaction design, robust error handling, and cross-platform optimization. The architecture supports immediate deployment while maintaining extensibility for future educational feature additions.
