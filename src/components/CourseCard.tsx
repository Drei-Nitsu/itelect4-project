import type { Course } from "../types";
import { FC } from "react";

interface CourseCardProps {
  course: Course;
  variant?: "default" | "compact";
}

const CourseCard: FC<CourseCardProps> = ({ course, variant = "default" }) => {
  return (
    <div
      className={`
        my-2 rounded-lg border border-slate-200 bg-white shadow-sm 
        dark:border-slate-800 dark:bg-slate-900
        ${variant === "default" ? "p-4" : "p-2"}
      `}
    >
      {variant === "default" && (
        <h3 className="text-lg font-medium text-slate-900 dark:text-white">
          {course.title}
        </h3>
      )}
      <p className={`text-slate-600 dark:text-slate-400 ${variant === 'default' ? 'text-sm' : 'text-xs'}`}>{course.description}</p>
      <p className={`text-xs text-slate-500 dark:text-slate-500 ${variant === 'default' ? 'mt-2' : 'mt-1'}`}>Credits: {course.credits}</p>
    </div>
  );
};

export default CourseCard;