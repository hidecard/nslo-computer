# NSLO Computer Learning Roadmap

This project is a computer learning application built with React and Vite, featuring AI-powered lessons, quizzes, and typing practice.

## Using Puter.js for Free Gemini Access

This tutorial will show you how to use Puter.js to access Gemini's powerful language models for free, without any API keys or usage restrictions.

### What is Puter.js?

Puter.js is a JavaScript library that allows you to run AI models directly in the browser using WebAssembly. It provides free access to powerful language models like Gemini without requiring API keys or dealing with usage limits.

### Installation

First, install the Puter.js library:

```bash
npm install puter
```

### Setup

1. Import Puter.js in your service file:

```typescript
import * as puter from 'puter';
```

2. Initialize the AI service:

```typescript
const geminiAI = puter.ai('gemini-pro');
```

### Usage

Replace your existing Google GenAI calls with Puter.js:

```typescript
// Instead of:
// import { GoogleGenAI } from "@google/genai";
// const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

// Use:
import * as puter from 'puter';
const geminiAI = puter.ai('gemini-pro');

// Generate content
const response = await geminiAI.generate({
  prompt: "Your prompt here",
  systemInstruction: "You are a helpful AI assistant"
});
```

### Benefits

- **Free**: No API keys required
- **No limits**: No usage restrictions
- **Browser-based**: Runs directly in the user's browser
- **Secure**: No sensitive API keys exposed

### Example Implementation

Here's how to modify your geminiService.ts:

```typescript
import * as puter from 'puter';
import { AIMode, QuizQuestion, ChatMessage } from "../types";

// Initialize Puter.js AI service for free Gemini access
const geminiAI = puter.ai('gemini-pro');

export const generateLessonContent = async (level: string, topic: string, mode: AIMode) => {
  // ... your existing logic ...

  const response = await geminiAI.generate({
    prompt,
    systemInstruction
  });

  return response.text;
};
```

### Running the Application

```bash
npm run dev
```

The application will now use Puter.js for all AI interactions, providing free access to Gemini models without any API key configuration.

