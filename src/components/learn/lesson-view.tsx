"use client";

import * as React from "react";
import Link from "next/link";
import { CheckCircle2, XCircle, ArrowRight, Trophy } from "lucide-react";
import { Lesson } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export function LessonView({
  lesson,
  onComplete,
}: {
  lesson: Lesson;
  onComplete: (xp: number) => void;
}) {
  const [step, setStep] = React.useState<"learn" | "practice" | "quiz">(
    "learn",
  );
  const [answers, setAnswers] = React.useState<number[]>(
    lesson.quiz.map(() => -1),
  );
  const [submitted, setSubmitted] = React.useState(false);
  const [done, setDone] = React.useState(false);

  const correctCount = lesson.quiz.filter(
    (q, i) => answers[i] === q.correct,
  ).length;
  const passed = correctCount === lesson.quiz.length;

  function finish() {
    setDone(true);
    onComplete(lesson.xp);
  }

  if (done) {
    return (
      <Card>
        <CardContent className="p-10 text-center">
          <Trophy className="mx-auto text-emerald-400 mb-4" size={48} />
          <h2 className="text-2xl font-bold">Урок пройден!</h2>
          <p className="mt-2 text-muted-foreground">
            +{lesson.xp} XP начислено за прогресс.
          </p>
          <Link href="/learn">
            <Button variant="gradient" className="mt-6">
              К списку уроков <ArrowRight size={16} />
            </Button>
          </Link>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        {(["learn", "practice", "quiz"] as const).map((s, i) => (
          <React.Fragment key={s}>
            <div
              className={`flex items-center gap-2 text-sm ${
                step === s ? "text-emerald-400 font-medium" : "text-muted-foreground"
              }`}
            >
              <span
                className={`grid h-6 w-6 place-items-center rounded-full text-xs ${
                  step === s ? "bg-emerald-500 text-black" : "bg-white/[0.06]"
                }`}
              >
                {i + 1}
              </span>
              {s === "learn" ? "Теория" : s === "practice" ? "Практика" : "Тест"}
            </div>
            {i < 2 && <div className="h-px w-8 bg-white/[0.08]" />}
          </React.Fragment>
        ))}
      </div>

      {step === "learn" && (
        <Card>
          <CardHeader>
            <CardTitle>{lesson.title}</CardTitle>
            <div className="flex gap-2">
              <Badge variant="outline">{lesson.durationMin} мин</Badge>
              <Badge variant="accent">{lesson.xp} XP</Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {lesson.content.split("\n\n").map((p, i) => (
              <p key={i} className="leading-relaxed whitespace-pre-wrap">
                {p}
              </p>
            ))}
            <Button
              variant="gradient"
              className="w-full"
              onClick={() => setStep("practice")}
            >
              К практике <ArrowRight size={16} />
            </Button>
          </CardContent>
        </Card>
      )}

      {step === "practice" && (
        <Card>
          <CardHeader>
            <CardTitle>Практика</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="rounded-lg border border-white/[0.06] bg-white/[0.03] p-4">
              <p className="text-sm leading-relaxed">{lesson.practice}</p>
            </div>
            <p className="text-sm text-muted-foreground">
              Выполните задание в выбранном инструменте, затем перейдите к тесту.
            </p>
            <Button
              variant="gradient"
              className="w-full"
              onClick={() => setStep("quiz")}
            >
              К тесту <ArrowRight size={16} />
            </Button>
          </CardContent>
        </Card>
      )}

      {step === "quiz" && (
        <Card>
          <CardHeader>
            <CardTitle>Проверь себя</CardTitle>
            <p className="text-sm text-muted-foreground">
              Нужно ответить верно на все вопросы.
            </p>
          </CardHeader>
          <CardContent className="space-y-6">
            {lesson.quiz.map((q, qi) => (
              <div key={qi} className="space-y-2">
                <p className="font-medium">
                  {qi + 1}. {q.question}
                </p>
                <div className="space-y-2">
                  {q.options.map((opt, oi) => {
                    const selected = answers[qi] === oi;
                    const isCorrect = q.correct === oi;
                    const showWrong = submitted && selected && !isCorrect;
                    const showRight = submitted && isCorrect;
                    return (
                      <button
                        key={oi}
                        disabled={submitted}
                        onClick={() => {
                          const next = [...answers];
                          next[qi] = oi;
                          setAnswers(next);
                        }}
                        className={`flex w-full items-center gap-2 rounded-lg border p-3 text-left text-sm transition-colors ${
                          showWrong
                            ? "border-red-500 bg-red-500/10"
                            : showRight
                              ? "border-emerald-500 bg-emerald-500/10"
                              : selected
                                ? "border-emerald-500"
                                : "border-white/[0.08] hover:border-emerald-500/30"
                        }`}
                      >
                        {submitted && isCorrect && (
                          <CheckCircle2 size={16} className="text-emerald-400" />
                        )}
                        {showWrong && <XCircle size={16} className="text-red-400" />}
                        {opt}
                      </button>
                    );
                  })}
                </div>
                {submitted && q.explanation && (
                  <p className="text-xs text-muted-foreground">
                    {q.explanation}
                  </p>
                )}
              </div>
            ))}

            {!submitted ? (
              <Button
                variant="gradient"
                className="w-full"
                disabled={answers.some((a) => a === -1)}
                onClick={() => setSubmitted(true)}
              >
                Проверить
              </Button>
            ) : passed ? (
              <Button variant="gradient" className="w-full" onClick={finish}>
                Завершить урок <Trophy size={16} />
              </Button>
            ) : (
              <div className="space-y-3">
                <p className="text-center text-sm text-muted-foreground">
                  Верно {correctCount} из {lesson.quiz.length}. Попробуйте ещё
                  раз.
                </p>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => {
                    setSubmitted(false);
                    setAnswers(lesson.quiz.map(() => -1));
                  }}
                >
                  Сбросить ответы
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
