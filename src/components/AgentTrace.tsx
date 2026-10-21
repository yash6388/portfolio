/** A stylised "agent trace" card for the hero — what a VoxDesk turn looks like under the hood. */

const LINES: { t: string; tone: "dim" | "in" | "route" | "tool" | "ok" | "out" }[] = [
  { t: "user › Book a haircut tomorrow at 4pm", tone: "in" },
  { t: "router › intent=booking  (structured output, 412 ms)", tone: "route" },
  { t: "supervisor › delegate → booking-agent  [A2A]", tone: "dim" },
  { t: "mcp › check_availability(service, 2026-10-22)", tone: "tool" },
  { t: "agent › awaiting customer confirmation  [HITL]", tone: "dim" },
  { t: "mcp › book_appointment  ✓ ref DC2A71", tone: "ok" },
  { t: "agent › You're booked for 4:00 pm tomorrow!", tone: "out" },
];

const TONE: Record<(typeof LINES)[number]["tone"], string> = {
  dim: "text-zinc-500",
  in: "text-zinc-200",
  route: "text-indigo-300",
  tool: "text-cyan-300",
  ok: "text-emerald-300",
  out: "text-violet-200",
};

export function AgentTrace() {
  return (
    <div className="relative w-full max-w-md">
      <div className="absolute -inset-px rounded-2xl bg-gradient-to-br from-indigo-500/40 via-violet-500/20 to-cyan-400/40 blur-sm" />
      <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#0c0c13]/95 shadow-2xl shadow-indigo-950/40">
        <div className="flex items-center gap-2 border-b border-white/5 px-4 py-3">
          <span className="size-2.5 rounded-full bg-red-400/70" />
          <span className="size-2.5 rounded-full bg-amber-400/70" />
          <span className="size-2.5 rounded-full bg-emerald-400/70" />
          <span className="ml-2 font-mono text-[11px] text-zinc-500">agent-trace — voxdesk</span>
        </div>
        <ol className="space-y-2 p-4 font-mono text-[11.5px] leading-relaxed sm:text-xs">
          {LINES.map((line, i) => (
            <li
              key={i}
              className={`animate-fade-up break-words ${TONE[line.tone]}`}
              style={{ animationDelay: `${400 + i * 220}ms` }}
            >
              {line.t}
            </li>
          ))}
          <li
            className="animate-fade-up text-zinc-500"
            style={{ animationDelay: `${400 + LINES.length * 220}ms` }}
          >
            <span className="animate-blink">▍</span>
          </li>
        </ol>
      </div>
    </div>
  );
}
