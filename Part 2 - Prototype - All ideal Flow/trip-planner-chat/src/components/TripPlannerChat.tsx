"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AirbnbLogo } from "./AirbnbLogo";
import { ThinkingDots } from "./ThinkingDots";
import { CardSkeletons } from "./CardSkeletons";
import { TripSummary } from "./TripSummary";
import { StayCard } from "./cards/StayCard";
import { ExperienceCard } from "./cards/ExperienceCard";
import { FoodCard } from "./cards/FoodCard";
import { SCENARIOS, SUGGESTED_PROMPT, type Scenario } from "@/lib/mockReply";
import { planTrip } from "@/lib/planner";

type Msg =
  | { id: number; role: "user"; text: string }
  | { id: number; role: "agent"; kind: "text"; text: string }
  | { id: number; role: "agent"; kind: "thinking" }
  | { id: number; role: "agent"; kind: "loading" }
  | { id: number; role: "agent"; kind: "reply"; scenario: Scenario; budget: number; intro: string }
  | { id: number; role: "agent"; kind: "error"; retryPrompt: string }
  | { id: number; role: "agent"; kind: "suggestion"; text: string; label: string; prompt: string };

export const THINKING_MS = 3300; // one full dots → logo loop (3.2s)
export const LOADING_MS = 1800;

const CITIES = ["tokyo", "kyoto", "osaka", "seoul", "busan"];
const COUNTRIES = ["japan", "korea", "china", "thailand"];
const KYOTO_PROMPT = "find me a weekend trip in kyoto for 2 people under 600 dollars";

function countMatches(text: string, words: string[]) {
  return words.filter((w) => text.includes(w)).length;
}


function AgentAvatar() {
  return (
    <span className="mt-0.5 grid size-7 shrink-0 place-items-center rounded-full bg-rausch text-white" aria-hidden>
      <AirbnbLogo size={16} title="" />
    </span>
  );
}

function AgentBubble({ children, tone = "default" }: { children: React.ReactNode; tone?: "default" | "error" }) {
  return (
    <div
      className={`max-w-[88%] rounded-2xl rounded-tl-md border px-3.5 py-2.5 text-[14px] leading-relaxed text-ink ${
        tone === "error" ? "border-[#C13515] bg-[#FFF4F0]" : "border-rausch bg-rausch-tint"
      }`}
    >
      {children}
    </div>
  );
}

export function TripPlannerChat({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [messages, setMessages] = useState<Msg[]>([
    { id: 0, role: "agent", kind: "text", text: "Hi! Tell me where, who and your budget. I'll put together a stay, an experience and a place to eat." },
  ]);
  const [draft, setDraft] = useState(SUGGESTED_PROMPT);
  const [locked, setLocked] = useState(false);
  const nextId = useRef(1);
  const failOnce = useRef(false);
  const timers = useRef<number[]>([]);
  const threadRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    failOnce.current = new URLSearchParams(window.location.search).get("fail") === "once";
    const t = timers.current;
    return () => t.forEach((id) => window.clearTimeout(id));
  }, []);

  // keep the newest message in view; a finished reply scrolls to its first line
  useEffect(() => {
    const el = threadRef.current;
    if (!el) return;
    const last = messages[messages.length - 1];
    const node = el.querySelector<HTMLElement>(`[data-msg="${last.id}"]`);
    if (last.role === "agent" && last.kind === "reply" && node) {
      el.scrollTo({ top: node.offsetTop - 12, behavior: "smooth" });
    } else {
      el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
    }
  }, [messages]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  useEffect(() => {
    if (!locked && open) inputRef.current?.focus({ preventScroll: true });
  }, [locked, open]);

  const send = useCallback(
    (raw: string) => {
      const text = raw.trim();
      if (!text || locked) return;
      const userId = nextId.current++;
      const agentId = nextId.current++;
      setDraft("");
      setLocked(true);
      setMessages((m) => [...m, { id: userId, role: "user", text }, { id: agentId, role: "agent", kind: "thinking" }]);

      const replace = (msg: Msg) => setMessages((m) => m.map((x) => (x.id === agentId ? msg : x)));
      const lower = text.toLowerCase();
      const tooMany = countMatches(lower, CITIES) >= 2 || countMatches(lower, COUNTRIES) >= 2;

      timers.current.push(
        window.setTimeout(() => {
          if (tooMany) {
            replace({
              id: agentId,
              role: "agent",
              kind: "suggestion",
              text: "I can only plan one place at a time. Want me to build a weekend in Kyoto?",
              label: "Go with Kyoto",
              prompt: KYOTO_PROMPT,
            });
            setLocked(false);
            return;
          }
          replace({ id: agentId, role: "agent", kind: "loading" });
          timers.current.push(
            window.setTimeout(() => {
              if (failOnce.current) {
                failOnce.current = false;
                replace({ id: agentId, role: "agent", kind: "error", retryPrompt: text });
              } else {
                const plan = planTrip(text);
                replace({ id: agentId, role: "agent", kind: "reply", scenario: plan.scenario, budget: plan.budget, intro: plan.intro });
              }
              setLocked(false);
            }, LOADING_MS),
          );
        }, THINKING_MS),
      );
    },
    [locked],
  );


  return (
    <div
      className={`absolute inset-0 z-20 transition-[visibility] ${open ? "visible" : "invisible delay-300"}`}
      aria-hidden={!open}
    >
      <div
        className={`absolute inset-0 bg-black/40 transition-opacity duration-300 ${open ? "opacity-100" : "opacity-0"}`}
        onClick={onClose}
      />
      <section
        role="dialog"
        aria-modal="true"
        aria-label="Trip-planner chat"
        className={`absolute inset-x-0 bottom-0 top-8 flex flex-col overflow-hidden rounded-t-[28px] bg-white shadow-[0_-10px_40px_rgba(0,0,0,0.25)] transition-transform duration-300 ease-[cubic-bezier(0.2,0.8,0.2,1)] ${
          open ? "translate-y-0" : "translate-y-full"
        }`}
      >
        {/* navbar */}
        <header className="flex h-14 shrink-0 items-center justify-between border-b border-hairline px-4">
          <span className="text-rausch">
            <AirbnbLogo size={26} />
          </span>
          <div className="flex items-center gap-3">
            <h2 className="text-[16px] font-bold tracking-[-0.01em] text-ink">Trip-planner</h2>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close trip-planner"
              className="grid size-9 place-items-center rounded-full bg-[#F2F2F2] text-ink hover:bg-[#E6E6E6]"
            >
              <svg viewBox="0 0 16 16" className="size-3.5" aria-hidden>
                <path d="M3 3l10 10M13 3L3 13" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
              </svg>
            </button>
          </div>
        </header>

        {/* thread */}
        <div ref={threadRef} className="relative flex-1 overflow-y-auto bg-[#FCFCFC] px-4 py-4" aria-live="polite" data-testid="thread">
          <div className="flex flex-col gap-3">
            {messages.map((m) => {
              if (m.role === "user") {
                return (
                  <div key={m.id} className="flex justify-end">
                    <p className="max-w-[80%] rounded-2xl rounded-tr-md bg-[#EBEBEB] px-3.5 py-2.5 text-[14px] leading-relaxed text-ink">
                      {m.text}
                    </p>
                  </div>
                );
              }
              return (
                <div key={m.id} data-msg={m.id} className="flex gap-2">
                  <AgentAvatar />
                  <div className="flex min-w-0 flex-1 flex-col gap-3">
                    {m.kind === "text" && <AgentBubble>{m.text}</AgentBubble>}
                    {m.kind === "thinking" && (
                      <div className="w-fit rounded-2xl rounded-tl-md border border-rausch bg-rausch-tint px-3 py-1.5">
                        <ThinkingDots />
                      </div>
                    )}
                    {m.kind === "loading" && (
                      <>
                        <div className="skeleton h-9 w-3/4 rounded-2xl rounded-tl-md" />
                        <CardSkeletons />
                      </>
                    )}
                    {m.kind === "reply" && (
                      <>
                        <AgentBubble>{m.intro}</AgentBubble>
                        <div className="flex flex-col gap-3" data-testid="cards" data-scenario={m.scenario.id}>
                          {m.scenario.items.map((item) => {
                            if (item.cardType === "stay") return <StayCard key="stay" details={item.details} />;
                            if (item.cardType === "experience") return <ExperienceCard key="exp" details={item.details} />;
                            return <FoodCard key="food" details={item.details} />;
                          })}
                        </div>
                        <AgentBubble>
                          <TripSummary scenario={m.scenario} budget={m.budget} />
                        </AgentBubble>
                      </>
                    )}
                    {m.kind === "error" && (
                      <AgentBubble tone="error">
                        <p role="alert">
                          <span aria-hidden className="mr-1 font-bold text-[#C13515]">!</span>
                          Sorry, I couldn&apos;t put your Kyoto weekend together just now. Let&apos;s try again.
                        </p>
                        <div className="mt-2 flex justify-end">
                          <button
                            type="button"
                            disabled={locked}
                            onClick={() => send(m.retryPrompt)}
                            className="rounded-lg bg-ink px-3.5 py-2 text-[13px] font-semibold text-white disabled:opacity-40"
                          >
                            Try again
                          </button>
                        </div>
                      </AgentBubble>
                    )}
                    {m.kind === "suggestion" && (
                      <AgentBubble>
                        <p>{m.text}</p>
                        <div className="mt-2 flex justify-end">
                          <button
                            type="button"
                            disabled={locked}
                            onClick={() => send(m.prompt)}
                            className="rounded-lg bg-rausch-dark px-3.5 py-2 text-[13px] font-semibold text-white hover:bg-[#C1083A] disabled:opacity-40"
                          >
                            {m.label}
                          </button>
                        </div>
                      </AgentBubble>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* composer */}
        <div className="shrink-0 border-t border-hairline bg-white px-3 pb-[max(12px,env(safe-area-inset-bottom))] pt-2.5">
          {!locked && (
            <div className="-mx-3 mb-2 flex gap-1.5 overflow-x-auto px-3 [scrollbar-width:none]" role="group" aria-label="Try a trip">
              {SCENARIOS.map((s) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => send(s.samplePrompt)}
                  title={s.samplePrompt}
                  className="shrink-0 rounded-full border border-hairline bg-white px-3 py-1.5 text-[12px] font-medium text-ink hover:border-ink"
                >
                  {s.name}
                </button>
              ))}
            </div>
          )}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              send(draft);
            }}
            className={`flex items-center gap-2 rounded-full border pl-4 pr-1.5 transition-colors ${
              locked ? "border-hairline bg-[#F7F7F7]" : "border-[#B0B0B0] bg-white focus-within:border-ink"
            }`}
          >
            <label htmlFor="chat-input" className="sr-only">
              Message Trip-planner
            </label>
            <input
              id="chat-input"
              ref={inputRef}
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              disabled={locked}
              placeholder={locked ? "Planning your trip…" : "Something else…"}
              autoComplete="off"
              className="h-12 min-w-0 flex-1 bg-transparent text-[14px] text-ink outline-none placeholder:text-muted disabled:cursor-not-allowed"
            />
            <button
              type="submit"
              disabled={locked || !draft.trim()}
              aria-label="Send"
              className="grid size-9 shrink-0 place-items-center rounded-full bg-rausch text-white transition-opacity hover:bg-rausch-dark disabled:opacity-35"
            >
              <svg viewBox="0 0 16 16" className="size-4" aria-hidden>
                <path d="M8 13V3M3.5 7.5L8 3l4.5 4.5" stroke="currentColor" strokeWidth="2.2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
