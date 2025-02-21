import { cn } from "@/lib/utils";

interface LoaderProps {
    className?:string;
    size?:"sm"|"md"|"lg";
}
const sizeClasses = {
    sm: "size-4 border-2",
    md: 'size-5 border-2',
    lg: 'size-8 border-3'
}
const Loader = ({className,size="md"}:LoaderProps) => {
  return (
    <div
      className={cn(
        "border-gray-400 border-t-gray-600 rounded-full animate-spin",
        sizeClasses[size],
        className
      )}
    ></div>
  );
}
export default Loader