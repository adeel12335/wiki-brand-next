"use client";

import { useState } from "react";
import { Button } from "@/components/module/Button";
import { Icon } from "@/components/ui/Icon";
import { checkerContent, type CheckerQuestion, type Stage } from "@/content/checker";
import { cn } from "@/lib/cn";

const { tool, stages } = checkerContent;
const QUESTIONS: CheckerQuestion[] = tool.questions;
const ORDER: Stage[] = ["building", "possible", "strong"];

/** Sum of option positions (0 to 3) across scored questions (Q1 to Q7, max 21); Q8 is context only. */
function scoreAnswers(answers: Array<number | null>) {
  let score = 0;
  let scoredAnswered = 0;
  let status: string | null = null;
  QUESTIONS.forEach((q, i) => {
    const choice = answers[i];
    if (choice == null) return;
    if (q.scored) {
      score += choice;
      scoredAnswered += 1;
    } else {
      status = q.options[choice];
    }
  });
  const stage = [...ORDER].reverse().find((s) => score >= stages[s].min) ?? "building";
  return { stage: scoredAnswered ? stage : null, status: status as string | null };
}

/** Checker tool - quiz card (progress, question, options, back / next) + live result panel. */
export function NotabilityChecker() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Array<number | null>>(() => QUESTIONS.map(() => null));
  const [done, setDone] = useState(false);

  const q = QUESTIONS[step];
  const selected = answers[step];
  const isLast = step === QUESTIONS.length - 1;
  const { stage, status } = scoreAnswers(answers);
  const live = stage ? stages[stage] : null;

  function choose(index: number) {
    setAnswers((prev) => prev.map((a, i) => (i === step ? index : a)));
  }

  function next() {
    if (selected == null) return;
    if (isLast) setDone(true);
    else setStep(step + 1);
  }

  function restart() {
    setAnswers(QUESTIONS.map(() => null));
    setStep(0);
    setDone(false);
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_380px] lg:gap-8">
      {/* Quiz card */}
      <div className="flex flex-col gap-7 rounded-[28px] border border-heading/10 bg-white p-6 shadow-card md:px-12 md:py-11" data-aos="fade-up">
        {done && stage ? (
          <div className="flex flex-col gap-6" role="status" aria-live="polite">
            <p className="text-xs font-bold tracking-[0.14em] text-gold-dark uppercase">
              {tool.resultKicker}: {stages[stage].kicker}
            </p>
            <h3 className="text-2xl leading-tight font-bold text-heading md:text-[28px]">{stages[stage].title}</h3>
            <p className="text-base leading-relaxed text-body">{stages[stage].copy}</p>
            {status ? (
              <div className="flex gap-3 rounded-2xl bg-mist p-5 md:p-6">
                <Icon name="info" size={20} className="mt-0.5 shrink-0 text-gold" />
                <p className="text-[15px] leading-relaxed text-body">
                  <span className="font-bold text-heading">{tool.statusLabel}:</span> {status}
                </p>
              </div>
            ) : null}
            <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:items-center sm:justify-between">
              <button
                type="button"
                onClick={restart}
                className="inline-flex items-center gap-2 self-start text-[15px] font-semibold text-body transition-colors hover:text-gold-dark"
              >
                <Icon name="chevron-left" size={16} />
                {tool.restart}
              </button>
              <Button href={tool.cta.href} variant="navy" arrow>
                {tool.cta.label}
              </Button>
            </div>
          </div>
        ) : (
          <>
            <p className="text-xs font-bold tracking-[0.14em] text-gold-dark uppercase">
              {tool.questionLabel} {step + 1} {tool.of} {QUESTIONS.length}
            </p>
            <div className="flex gap-2" aria-hidden="true">
              {QUESTIONS.map((item, i) => (
                <span key={item.id} className={cn("h-1.5 flex-1 rounded-full transition-colors", i <= step ? "bg-gold" : "bg-heading/10")} />
              ))}
            </div>
            <fieldset className="flex flex-col gap-7">
              <legend className="contents">
                <span className="block text-[22px] leading-snug font-bold text-heading md:text-[28px]">{q.question}</span>
              </legend>
              <div className="flex flex-col gap-3">
                {q.options.map((o, i) => {
                  const active = selected === i;
                  return (
                    <label
                      key={o}
                      className={cn(
                        "flex cursor-pointer items-center gap-4 rounded-[14px] border px-5 py-[18px] transition-colors",
                        active ? "border-gold bg-gold/12" : "border-heading/10 bg-white hover:border-gold",
                      )}
                    >
                      <input type="radio" name={q.id} checked={active} onChange={() => choose(i)} className="peer sr-only" />
                      <span
                        className={cn(
                          "grid size-[22px] shrink-0 place-items-center rounded-full border-2 bg-white peer-focus-visible:ring-3 peer-focus-visible:ring-gold/30",
                          active ? "border-gold" : "border-heading/20",
                        )}
                      >
                        {active ? <span className="size-2.5 rounded-full bg-gold" /> : null}
                      </span>
                      <span className={cn("text-base font-bold", active ? "text-gold-dark" : "text-heading")}>{o}</span>
                    </label>
                  );
                })}
              </div>
            </fieldset>
            <div className="flex items-center justify-between gap-4 pt-2">
              <button
                type="button"
                onClick={() => setStep(Math.max(0, step - 1))}
                disabled={step === 0}
                className="inline-flex items-center gap-2 text-[15px] font-semibold text-body transition-colors hover:text-gold-dark disabled:invisible"
              >
                <Icon name="chevron-left" size={16} />
                {tool.back}
              </button>
              <button
                type="button"
                onClick={next}
                disabled={selected == null}
                className="group inline-flex h-[50px] items-center gap-2 rounded-lg bg-ink px-6 text-[15px] font-semibold text-white transition-colors hover:bg-heading disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isLast ? tool.finish : tool.next}
                <Icon name="arrow" size={14} className="transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </>
        )}
      </div>

      {/* Live result */}
      <div className="flex flex-col gap-5 self-start" data-aos="fade-up" data-aos-delay="100">
        <div className="flex flex-col gap-4 rounded-3xl bg-ink p-7 md:p-8" aria-live="polite">
          <p className="text-[11px] font-bold tracking-[0.14em] text-gold-light uppercase">{tool.liveKicker}</p>
          <div className="grid grid-cols-3 gap-1.5">
            {ORDER.map((v) => {
              const active = v === stage;
              return (
                <div key={v} className="flex flex-col gap-2">
                  <span className={cn("h-2 rounded-full transition-colors", active ? "bg-gold" : "bg-gold/35")} />
                  <span className={cn("text-xs", active ? "font-bold text-gold-light" : "text-on-dark-muted")}>{stages[v].kicker}</span>
                </div>
              );
            })}
          </div>
          <p className="text-[26px] leading-tight font-bold text-white">{live ? live.title : tool.notScored.title}</p>
          <p className="text-[15px] leading-relaxed text-on-dark-muted">{live ? live.copy : tool.notScored.copy}</p>
          <Button href={tool.cta.href} variant="gold" arrow className="mt-1 w-full">
            {tool.cta.label}
          </Button>
        </div>
        <div className="flex gap-3 rounded-2xl bg-cream px-5 py-[18px]">
          <Icon name="info" size={18} className="mt-0.5 shrink-0 text-gold-dark" />
          <p className="text-sm leading-relaxed text-heading">{tool.disclaimer}</p>
        </div>
      </div>
    </div>
  );
}
