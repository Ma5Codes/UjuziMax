export const config = {
  clerk: {
    clerkPublic: process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
    clerkSecret: process.env.CLERK_SECRET_KEY,
  },
  sanity: {
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
    apiToken: process.env.SANITY_API_TOKEN,
    adminApiToken: process.env.SANITY_API_ADMIN_TOKEN
  },
  stripe: {
    baseUrl:
      process.env.NODE_ENV === "production"
        ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
        : process.env.NEXT_PUBLIC_BASE_URL,
    stripeSecretKey: process.env.STRIPE_SECRET_KEY,
    stripePublicKey: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
    webhookSecret: process.env.STRIPE_WEBHOOK_SECRET
  },
};