"use server";
import {config} from '@/lib/config'
import { stripe } from "@/lib/utils";
import { createEnrollment, getCourseById } from '@/sanity/lib/courses/queries';
import { urlFor } from '@/sanity/lib/image';
import { createUserIfNotExists } from '@/sanity/lib/student/queries';
import { clerkClient } from '@clerk/nextjs/server';
export const createStripeCheckout = async (
  courseId: string,
  clerkId: string
) => {

try{

  const course = await getCourseById(courseId);
  const clerkUser = await (await clerkClient()).users.getUser(clerkId);
   const { emailAddresses, firstName, lastName, imageUrl } = clerkUser;
  const email = emailAddresses[0]?.emailAddress;

  if (!emailAddresses || !email) {
    throw new Error("User details not found");
  }
  if (!course) {
    throw new Error("Course not found");
  }
  const user = await createUserIfNotExists({
    clerkId,
    email: email || "",
    firstName: firstName || email,
    lastName: lastName || "",
    imageUrl: imageUrl || "",
  });
  if (!user) {
    throw new Error("User not found");
  }
  if (!course.price && course.price !== 0) {
    throw new Error("Course Price is not set");
  }
  const priceInCents = Math.round(course.price * 100);
  if (priceInCents === 0) {
    await createEnrollment({
      studentId: user._id,
      courseId: course._id,
      paymentId: "free",
      amount: 0,
    });
    return { url: `/courses/${course.slug?.current}` };
  }
  const { title, description, image, slug } = course;
  if (!title || !description || !image || !slug) {
    throw new Error("Course data is incomplete");
  }
  //create Stripe Checkout Session
  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        quantity: 1,
        price_data: {
          currency: "usd",
          product_data: {
            name: title,
            description: description,
            images: [urlFor(image).url() || ""],
          },
          unit_amount: priceInCents,
        },
      },
    ],
    mode: "payment",
    success_url: `${config.stripe.baseUrl}/courses/${slug?.current}`,
    cancel_url: `${config.stripe.baseUrl}/courses/${slug?.current}?canceled=true`,
    metadata: {
      courseId: course._id,
      userId: clerkId,
    },
  });
  return { url: session.url };
}catch(error){
  console.log("Error in createStripeCheckout:", error);
  throw new Error("Failed to create checkout session");
}
};
