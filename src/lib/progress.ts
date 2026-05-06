import { allLessons, type Course } from "@/data/courses";

const KEY = "tpi-progress-v1";

function read(): Record<string, true> {
  if (typeof window === "undefined") return {};
  try {
    return JSON.parse(localStorage.getItem(KEY) || "{}");
  } catch {
    return {};
  }
}
function write(v: Record<string, true>) {
  if (typeof window === "undefined") return;
  localStorage.setItem(KEY, JSON.stringify(v));
  window.dispatchEvent(new Event("tpi-progress-change"));
}

export function isLessonComplete(lessonId: string) {
  return !!read()[lessonId];
}
export function toggleLesson(lessonId: string) {
  const v = read();
  if (v[lessonId]) delete v[lessonId];
  else v[lessonId] = true;
  write(v);
}
export function setLessonComplete(lessonId: string, complete: boolean) {
  const v = read();
  if (complete) v[lessonId] = true;
  else delete v[lessonId];
  write(v);
}
export function courseProgress(course: Course) {
  const lessons = allLessons(course);
  const v = read();
  const done = lessons.filter((l) => v[l.id]).length;
  return {
    done,
    total: lessons.length,
    percent: lessons.length === 0 ? 0 : Math.round((done / lessons.length) * 100),
  };
}
export function totalCompleted() {
  return Object.keys(read()).length;
}
export function useProgressVersion() {
  // Lightweight subscription hook
  const { useEffect, useState } = require("react") as typeof import("react");
  const [v, setV] = useState(0);
  useEffect(() => {
    const h = () => setV((x) => x + 1);
    window.addEventListener("tpi-progress-change", h);
    window.addEventListener("storage", h);
    return () => {
      window.removeEventListener("tpi-progress-change", h);
      window.removeEventListener("storage", h);
    };
  }, []);
  return v;
}
