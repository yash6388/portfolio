/**
 * Hero figure: the general shape of the AI systems I build (guard → route → retrieve or act),
 * with evaluation and tracing underneath everything.
 * Pure SVG — packets travel along the edges (SMIL animateMotion), hidden for reduced motion.
 */

type NodeProps = { x: number; y: number; w: number; label: string; sub: string; accent?: boolean };

const H = 42;

function Node({ x, y, w, label, sub, accent }: NodeProps) {
  return (
    <g>
      <rect
        x={x}
        y={y}
        width={w}
        height={H}
        rx={8}
        className={accent ? "fill-surface stroke-accent" : "fill-surface stroke-line"}
        strokeWidth={accent ? 1.5 : 1}
      />
      <text x={x + w / 2} y={y + 18} textAnchor="middle" className="fill-foreground font-mono" fontSize={11}>
        {label}
      </text>
      <text x={x + w / 2} y={y + 32} textAnchor="middle" className="fill-muted font-mono" fontSize={8.5}>
        {sub}
      </text>
    </g>
  );
}

// Journeys through node centres: customer → router → agent → resource.
const TO_KNOWLEDGE = "M45 150 H162 C222 150 222 67 286 67 H399";
const TO_BOOKING = "M45 150 H162 C222 150 222 233 286 233 H399";

export function SystemDiagram() {
  return (
    <figure className="w-full">
      <div className="rounded-2xl border border-line bg-surface/60 p-3 sm:p-5">
        <svg viewBox="0 36 440 276" className="h-auto w-full" role="img" aria-labelledby="fig-title">
          <title id="fig-title">
            Diagram: a request passes guardrails and an LLM router, then either retrieves context to produce a
            grounded answer, or goes to an agent that calls tools after human approval; evaluation, tracing and
            failover run underneath.
          </title>

          {/* edges */}
          <g className="stroke-line" fill="none" strokeWidth={1.25}>
            <path d="M86 150 H118" />
            <path d="M206 150 C222 150 222 67 238 67" />
            <path d="M206 150 C222 150 222 233 238 233" />
            <path d="M334 67 H360" />
            <path d="M334 233 H360" strokeDasharray="3 3" />
          </g>

          {/* packets travel underneath the nodes, so they "enter" and "leave" each box */}
          {[0, 1.6].map((begin) => (
            <circle key={`k${begin}`} r={3.5} className="packet fill-accent">
              <animateMotion dur="3.2s" begin={`${begin}s`} repeatCount="indefinite" path={TO_KNOWLEDGE} />
            </circle>
          ))}
          <circle r={3.5} className="packet fill-accent">
            <animateMotion dur="3.2s" begin="0.8s" repeatCount="indefinite" path={TO_BOOKING} />
          </circle>

          {/* nodes */}
          <Node x={4} y={129} w={82} label="request" sub="chat · voice" />
          <Node x={118} y={129} w={88} label="LLM router" sub="guard + route" accent />
          <Node x={238} y={46} w={96} label="retrieval" sub="vector + graph" />
          <Node x={238} y={212} w={96} label="agent" sub="plan · tool calls" />
          <Node x={360} y={46} w={76} label="answer" sub="grounded" />
          <Node x={360} y={212} w={76} label="tools" sub="MCP · APIs" />

          <text x={398} y={268} textAnchor="middle" className="fill-accent font-mono" fontSize={8.5}>
            ✓ human approval
          </text>

          {/* the layer under everything */}
          <rect x={4} y={282} width={432} height={24} rx={6} className="fill-accent-soft stroke-accent" strokeWidth={0.75} strokeDasharray="3 3" />
          <text x={220} y={297.5} textAnchor="middle" className="fill-accent font-mono" fontSize={9}>
            evals · tracing · failover · tests
          </text>
        </svg>
      </div>
      <figcaption className="mt-3 font-mono text-[11px] leading-relaxed text-muted">
        <span className="text-foreground">Fig. 1</span> — The shape of the systems I build: requests are guarded and
        routed, answers are grounded in retrieval, actions go through tools with human approval — and all of it is
        evaluated and traced.
      </figcaption>
    </figure>
  );
}
