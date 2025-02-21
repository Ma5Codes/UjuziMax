"use client"
import { Progress } from "../ui/progress"
import { cn } from "@/lib/utils"
interface CourseProgressProps {
    progress:number;
    variant?:'default'|'success';
    size?:"default"|"sm";
    showPercentage?:boolean;
    label?:string;
    className?:string
}
const CourseProgess = ({
  progress,
  variant,
  size,
  showPercentage,
  label,
  className,
}: CourseProgressProps) => {
  return (
    <div className={cn("space-y-2", className)}>
      <div className="flex items-center justify-between gap-2 text-sm">
        {label && <span className="text-muted-foreground">{label}</span>}
        {showPercentage && (
          <span className="text-muted-foreground font-medium">{progress}%</span>
        )}
      </div>
      <Progress
        value={progress}
        className={cn(
          "h-2 transition-all",
          size === "sm" && "h-1",
          variant === "success" && "[&>div]:bg-emerald-600"
        )}
      />
    </div>
  );
};
export default CourseProgess