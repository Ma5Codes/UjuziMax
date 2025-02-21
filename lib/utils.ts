import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import Stripe from "stripe";
import { config } from "@/lib/config";
import { Module, GetCompletionsQueryResult } from "@/sanity.types";
const {
  stripe: { stripeSecretKey },
} = config;
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
if (!stripeSecretKey) {
  throw new Error("STRIPE_SECRET_KEY is not set");
}
export const stripe = new Stripe(stripeSecretKey, {
  apiVersion: "2025-01-27.acacia",
});
export const calculateTotalLessons = (modules: Module[] | null) => {
  if (!modules) return 0;
  return modules.reduce(
    (acc, module) => acc + (module.lessons?.length || 0),
    0
  );
};
export const calculateCourseProgress = (
  modules: Module[] | null,
  completedLessons: GetCompletionsQueryResult["completedLessons"]
): number => {
  const totalLessons = calculateTotalLessons(modules);
  const totalCompleted = completedLessons.length;
  return Math.round(
    totalLessons > 0 ? (totalCompleted / totalLessons) * 100 : 0
  );
};