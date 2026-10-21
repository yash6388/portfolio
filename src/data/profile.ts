// All portfolio content lives here — edit this file to update the site.

export const profile = {
  name: "Yash Kumar Singh",
  role: "AI & Backend Engineer",
  location: "Pune, India",
  // Put your photo at public/avatar.jpg (square, ≥ 400×400). Until then initials are shown.
  avatar: "/avatar.jpg",
  // Put your resume PDF at public/resume.pdf to enable the download button.
  resume: "/resume.pdf",
  tagline:
    "I build production GenAI systems — LLM microservices, RAG and multi-agent workflows — on solid, well-tested Python backends.",
  about: [
    "I'm an AI engineer who has been shipping LLM-powered software for international clients since 2025. Most of my work sits where AI meets backend engineering: turning messy business data into reliable, structured LLM output, designing retrieval that actually finds the right passage, and wrapping it all in APIs that are secure, observable and fast.",
    "I care about AI that works in production, not just in demos — which means evaluation sets, guardrails, failover between model providers, tracing, and tests. In my own time I build agent systems end to end, like VoxDesk, a multi-agent voice AI platform.",
  ],
  openTo: "Open to AI & Backend roles",
  links: {
    email: "yashsingh71133@gmail.com",
    github: "https://github.com/yash6388",
    linkedin: "https://www.linkedin.com/in/yash-kumarsingh/",
  },
  stats: [
    { value: "2025", label: "building production GenAI since" },
    { value: "8", label: "LLM report pipelines built" },
    { value: "4", label: "LLM providers integrated" },
    { value: "86%", label: "top-1 retrieval accuracy (VoxDesk eval)" },
  ],
};

export type Experience = {
  title: string;
  org: string;
  period: string;
  location: string;
  points: string[];
  stack: string[];
};

export const experience: Experience[] = [
  {
    title: "Software Engineer — GenAI & Backend",
    org: "Hospitality & insurance platforms (US and German clients)",
    period: "May 2025 — Present",
    location: "Pune, India",
    points: [
      "Built LLM-powered microservices with FastAPI, Azure OpenAI (GPT-4o) and Anthropic Claude that turn hotel operational reports into prioritized, structured tasks across 8 report types for 7 properties, driven by 56 prompt templates.",
      "Enforced strict JSON-schema outputs across 4 LLM providers, with input sanitization, step-wise prompt checks and per-run token, latency and payload logging; contributed to code-side guardrails that filter hallucinated findings.",
      "Engineered asynchronous AI pipelines with FastAPI, Celery and Redis for LLM orchestration and background processing.",
      "Contributed to hybrid retrieval combining vector search and knowledge graphs (Qdrant, Neo4j) for a GraphRAG-based institutional-memory system; prototyped LangGraph agentic workflows in internal POCs.",
      "Implemented OAuth2/JWT authentication with multi-tenant, role-based access control, built Microsoft Graph webhook pipelines ingesting reports into Azure Data Lake, and added rate limiting on LLM endpoints to cap API costs.",
      "Contributed to a Spring Boot insurance-aggregation platform, building REST APIs across 5+ external providers and cutting end-to-end API latency by 98%; built routing and e-mail dispatch features for a multi-tenant insurance-switching platform.",
    ],
    stack: ["Python", "FastAPI", "Azure OpenAI", "Claude", "Celery", "Redis", "Qdrant", "Neo4j", "PostgreSQL", "Spring Boot"],
  },
];

export type Project = {
  name: string;
  tagline: string;
  description: string;
  highlights: string[];
  metrics?: { value: string; label: string }[];
  stack: string[];
  github?: string;
  demo?: string;
  image?: string;
  featured?: boolean;
};

export const projects: Project[] = [
  {
    name: "VoxDesk",
    tagline: "Multi-agent voice AI platform for businesses",
    description:
      "Customers talk to a business's AI agent by voice or chat. It answers from the business's own documents and books appointments against real availability — always asking before it changes anything.",
    highlights: [
      "LangGraph supervisor delegating over the A2A protocol to a RAG knowledge agent and a booking agent",
      "Custom MCP server for booking tools, with human-in-the-loop approval before every write",
      "Real-time voice: Whisper speech-to-text, streaming LLM, sentence-by-sentence TTS over WebSockets, barge-in",
      "Eval suite with LLM-as-a-judge, prompt-injection guardrails, Gemini→Groq failover with a circuit breaker, Langfuse tracing",
    ],
    metrics: [
      { value: "86%", label: "Hit@1 retrieval" },
      { value: "100%", label: "intent routing" },
      { value: "5/5", label: "faithfulness" },
    ],
    stack: ["LangGraph", "A2A", "MCP", "FastAPI", "pgvector", "Gemini", "Whisper", "Next.js", "Docker"],
    github: "https://github.com/yash6388/voxdesk",
    image: "/projects/voxdesk.png",
    featured: true,
  },
  {
    name: "FilingLens",
    tagline: "RAG over SEC 10-K filings with cited answers",
    description:
      "Ask financial questions about real annual reports and get answers grounded in the filing, with citations — and an honest refusal when the company isn't indexed.",
    highlights: [
      "Table-aware chunking that keeps financial tables intact, repeating headers when large tables are split",
      "Hybrid retrieval (dense + BM25 fused with RRF) plus a cross-encoder reranker",
      "LangGraph pipeline with a zero-LLM-cost scope guardrail and grounded generation with Gemini 2.5",
    ],
    metrics: [
      { value: "70→80%", label: "Hit Rate@5" },
      { value: "4", label: "retrieval strategies compared" },
    ],
    stack: ["LangGraph", "Qdrant", "BM25", "Cross-encoder", "FastAPI", "Gemini", "React"],
    github: "https://github.com/yash6388/FilingLens",
  },
];

export const skills: { group: string; items: string[] }[] = [
  {
    group: "GenAI & Agents",
    items: ["LLMs", "RAG", "GraphRAG", "LangGraph", "LangChain", "MCP", "A2A", "Multi-agent systems", "Prompt engineering", "Structured outputs"],
  },
  {
    group: "Quality & Ops for AI",
    items: ["LLM evaluation", "LLM-as-a-judge", "Guardrails", "Langfuse", "Failover & circuit breakers", "Rate limiting"],
  },
  {
    group: "Models & Retrieval",
    items: ["Azure OpenAI", "Anthropic Claude", "Gemini", "Embeddings", "Hybrid search", "Rerankers", "Speech (STT/TTS)"],
  },
  {
    group: "Backend",
    items: ["Python", "FastAPI", "Java", "Spring Boot", "REST APIs", "WebSockets", "Celery", "SQLAlchemy", "OAuth2 / JWT"],
  },
  {
    group: "Data",
    items: ["PostgreSQL", "pgvector", "Qdrant", "Neo4j", "Redis", "MySQL", "MongoDB"],
  },
  {
    group: "Cloud & Tooling",
    items: ["Docker", "Azure", "AWS", "CI/CD", "GitHub Actions", "Pytest", "Next.js", "TypeScript"],
  },
];

export const education = [
  {
    school: "Centre for Development of Advanced Computing (CDAC ACTS)",
    degree: "Post Graduate Diploma in Advanced Computing",
    period: "2024 — 2025",
  },
  {
    school: "KIET Group of Institutions (AKTU)",
    degree: "B.Tech, Information Technology",
    period: "2020 — 2024",
  },
];
