# LeadGen AI ⚡️

**LeadGen AI** is a high-conversion, AI-native lead generation engine designed for modern sales teams. It transforms raw company URLs into deep strategic dossiers and personalized, ready-to-send outreach in under 20 seconds.

![Theme](https://img.shields.io/badge/Theme-Amber%20%26%20Charcoal-amber)
![Next.js](https://img.shields.io/badge/Next.js-15-black)
![Tailwind v4](https://img.shields.io/badge/Tailwind-v4-blue)
![Framer Motion](https://img.shields.io/badge/Animations-Framer%20Motion-indigo)

---

### 1. Prerequisites
Ensure you have Node.js 18+ installed.

### 2. Environment Variables
Create a `.env.local` file in the root directory:
```env
# AI & LLM
OPENAI_API_KEY=your_openai_or_openrouter_key
OPENAI_BASE_URL=https://openrouter.ai/api/v1 # If using OpenRouter
OPENAI_MODEL_NAME=openrouter/elephant-alpha

# Search Engine
TAVILY_API_KEY=your_tavily_api_key
```

### 3. Installation
```bash
npm install
```

### 4. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to see the platform in action.

## 🏗 Modular Architecture

The project is structured into modular, reusable components for easy scaling:
- `components/layout/`: Global branding and navigation.
- `components/landing/`: High-conversion marketing components.
- `components/demo/`: Specialized sandbox and terminal logic.
- `app/api/`: Optimized serverless routes for Search, Analysis, and Drafting.

## 📄 License
Custom Portfolio License. Designed for high-end freelance showcases.

---
*Results and workflows are custom-engineered for specific client needs.*
