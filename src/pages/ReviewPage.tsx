import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { askAi } from "../api/client";
import { aiRequestSchema, type AiFormValues } from "../schemas/aiSchema";
import type { AiReply, AiRating } from "../types";

const RATING_CONFIG: Record<
  AiRating,
  { label: string; bg: string; text: string; border: string }
> = {
  excellent: {
    label: "Excellent",
    bg: "bg-emerald-50 dark:bg-emerald-950/40",
    text: "text-emerald-700 dark:text-emerald-300",
    border: "border-emerald-300 dark:border-emerald-800",
  },
  good: {
    label: "Good",
    bg: "bg-blue-50 dark:bg-blue-950/40",
    text: "text-blue-700 dark:text-blue-300",
    border: "border-blue-300 dark:border-blue-800",
  },
  satisfactory: {
    label: "Satisfactory",
    bg: "bg-amber-50 dark:bg-amber-950/40",
    text: "text-amber-700 dark:text-amber-300",
    border: "border-amber-300 dark:border-amber-800",
  },
  needs_improvement: {
    label: "Needs Improvement",
    bg: "bg-orange-50 dark:bg-orange-950/40",
    text: "text-orange-700 dark:text-orange-300",
    border: "border-orange-300 dark:border-orange-800",
  },
  poor: {
    label: "Poor",
    bg: "bg-rose-50 dark:bg-rose-950/40",
    text: "text-rose-700 dark:text-rose-300",
    border: "border-rose-300 dark:border-rose-800",
  },
};

export default function ReviewPage() {
  const [review, setReview] = useState<AiReply | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<AiFormValues>({
    resolver: zodResolver(aiRequestSchema),
    defaultValues: { prompt: "" },
    mode: "onChange",
  });

  const promptValue = watch("prompt") || "";
  const charCount = promptValue.trim().length;

  const mutation = useMutation({
    mutationFn: (values: AiFormValues) => askAi(values.prompt.trim()),
    onSuccess: (data) => {
      setReview(data);
    },
  });

  const onSubmit = (values: AiFormValues) => {
    mutation.mutate(values);
  };

  const ratingStyle = review?.rating
    ? RATING_CONFIG[review.rating] || RATING_CONFIG.satisfactory
    : null;

  return (
    <div className="mx-auto max-w-4xl space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
          AI Project Review
        </h1>
        <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
          Submit your project description to receive structured feedback powered by Gemini AI.
        </p>
      </div>

      {/* Review Request Form */}
      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-800">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label
              htmlFor="prompt"
              className="block text-sm font-medium text-gray-700 dark:text-gray-200"
            >
              Project Description
            </label>
            <div className="mt-1">
              <textarea
                id="prompt"
                rows={5}
                {...register("prompt")}
                disabled={mutation.isPending}
                placeholder="Describe your project, technologies used, main features, architecture, and deployment strategy (minimum 20 characters)..."
                className="w-full rounded-lg border border-gray-300 p-3 text-sm text-gray-900 shadow-sm placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 disabled:cursor-not-allowed disabled:bg-gray-100 dark:border-gray-700 dark:bg-gray-900 dark:text-white dark:placeholder:text-gray-500 dark:disabled:bg-gray-800"
              />
            </div>
            <div className="mt-1 flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
              <span>{charCount} / 2000 characters (min. 20)</span>
              {errors.prompt && (
                <span className="text-rose-600 dark:text-rose-400">
                  {errors.prompt.message}
                </span>
              )}
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="submit"
              disabled={mutation.isPending}
              className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {mutation.isPending ? (
                <>
                  <svg
                    className="mr-2 h-4 w-4 animate-spin text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v8H4z"
                    />
                  </svg>
                  Analyzing with Gemini...
                </>
              ) : (
                "Get AI Review"
              )}
            </button>
          </div>
        </form>

        {mutation.isError && (
          <div className="mt-4 rounded-lg border border-rose-200 bg-rose-50 p-4 text-sm text-rose-800 dark:border-rose-900 dark:bg-rose-950/50 dark:text-rose-300">
            <strong>Error:</strong> {mutation.error.message || "Failed to generate AI review."}
          </div>
        )}
      </div>

      {/* Structured AI Reply Display */}
      {review && (
        <div className="space-y-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-800">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-gray-100 pb-4 dark:border-gray-700">
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                Review Results
              </h2>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Evaluation generated by Gemini AI
              </p>
            </div>
            {ratingStyle && (
              <span
                className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-sm font-semibold uppercase tracking-wider ${ratingStyle.bg} ${ratingStyle.text} ${ratingStyle.border}`}
              >
                ● Rating: {ratingStyle.label}
              </span>
            )}
          </div>

          {/* 1. Summary */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
              Executive Summary
            </h3>
            <p className="mt-2 text-base leading-relaxed text-gray-800 dark:text-gray-200">
              {review.summary}
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {/* 2. Strengths Array */}
            <div className="rounded-lg border border-emerald-100 bg-emerald-50/50 p-4 dark:border-emerald-950 dark:bg-emerald-950/20">
              <h3 className="flex items-center gap-2 text-sm font-semibold text-emerald-900 dark:text-emerald-300">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-200 text-xs font-bold text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200">
                  ✓
                </span>
                Strengths
              </h3>
              <ul className="mt-3 space-y-2">
                {review.strengths.map((item, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300"
                  >
                    <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-emerald-500" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* 3. Suggestions Array */}
            <div className="rounded-lg border border-blue-100 bg-blue-50/50 p-4 dark:border-blue-950 dark:bg-blue-950/20">
              <h3 className="flex items-center gap-2 text-sm font-semibold text-blue-900 dark:text-blue-300">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-200 text-xs font-bold text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                  💡
                </span>
                Suggestions for Improvement
              </h3>
              <ul className="mt-3 space-y-2">
                {review.suggestions.map((item, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300"
                  >
                    <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-blue-500" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

