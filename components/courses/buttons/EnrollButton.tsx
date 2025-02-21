"use client";

import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { useTransition } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { CheckCircle } from "lucide-react";
import { createStripeCheckout } from "@/actions/stripe.actions";

interface EnrollButtonProps {
  courseId: string;
  isEnrolled: boolean;
}
const EnrollButton = ({ courseId, isEnrolled }: EnrollButtonProps) => {
  const {user,isLoaded:isUserLoaded} = useUser();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const handleEnroll = async(courseId:string)=>{
    startTransition(async()=>{
      try {
          const userId = user?.id;
          if (!userId) return;
          const {url} = await createStripeCheckout(courseId,userId);
          if (url){
            router.push(url);
          }
      } catch (error) {
        console.error("Error in handleEnroll",error)
        throw new Error("Failed to create checkout session")
        
      }
    })
  }
  if (!isUserLoaded || isPending){
    return (
      <div className="w-full h-12 rounded-lg bg-gray-100 flex items-center justify-center">
        <div className="size-5 border-2 border-gray-400 border-t-gray-600 rounded-full animate-spin" />
      </div>
    );
  }
  if (isEnrolled) {
    <Link
      prefetch={false}
      href={`/dashboard/coures/${courseId}`}
      className="w-full rounded-lg px-6 py-3 font-medium bg-gradient-to-r from-green-500 to-emerald-500 text-white hover:from-green-600 hover:to-emerald-600 transition-all duration-300 h-12 flex items-center justify-center gap-2 group"
    >
      <span>Access Course</span>
      <CheckCircle className="size-5 group-hover:scale-110 transition-transform" />
    </Link>;
  }
  return (
    <Button
      onClick={() => handleEnroll(courseId)}
      className={cn(
        "w-full rounded-lg px-6 py-3 font-medium transition-all duration-300 ease-in-out relative h-12",
        isPending || user?.id
          ? "bg-gray-100 cursor-not-allowed hover:scale-100"
          : "bg-white text-black hover:scale-105 hover:shadow-lg hover:shadow-black/10"
      )}
    >
      {!user?.id ? (
        <span className={`${isPending ? "opacity-0" : "opacity-100"}`}>
          Sign In to Enroll
        </span>
      ) : (
        <span className={`${isPending ? "opacity-0" : "opacity-100"}`}>
          Enroll Now
        </span>
      )}
      {isPending && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="size-5 border-2 border-gray-400 border-t-gray-600 rounded-full animate-spin" />
        </div>
      )}
    </Button>
  );
};

export default EnrollButton;
