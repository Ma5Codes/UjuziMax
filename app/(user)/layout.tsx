import { ReactNode } from "react";
import { ClerkProvider } from "@clerk/nextjs";
import Header from "@/components/user/layout/Header";
import { SanityLive } from "@/sanity/lib/live";

const UserLayout = ({
  children,
}: Readonly<{
  children: ReactNode;
}>) => {
  return (
    <ClerkProvider>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
      </div>
      <SanityLive />
    </ClerkProvider>
  );
};
export default UserLayout;
