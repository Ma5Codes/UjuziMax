import { DarkModeToggle, SearchInput } from "@/components/shared/";
import { Button } from "@/components/ui/button";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { BookMarkedIcon, BookOpen } from "lucide-react";
import Link from "next/link";

const Header = () => {
  return (
    <header className="sticky top-0  z-50 bg-background/80 backdrop-blur-sm border-b border-border">
      <section className="container mx-auto px-4">
        <article className="flex h-16 items-center justify-between gap-4">
          {/**Left */}
          <div className="flex items-center gap-4">
            <Link
              href="/"
              prefetch={false}
              className="flex items-center space-x-2 hover:opacity-90 transition-opacity"
            >
              <BookOpen className="size-6 text-primary" />
              <span className="text-xl font-bold bg-gradient-to-r from-primary/90 to-primary bg-clip-text text-transparent">
                Courselly
              </span>
            </Link>
            <SearchInput />
          </div>
          {/**Right */}
          <div className="flex items-center space-x-2 md:space-x-4">
            <nav>
              <SignedIn>
                <Link
                  href="/my-courses"
                  prefetch={false}
                  className="flex space-x-2 items-center text-sm font-medium text-muted-foreground hover:text-foreground transition-colors md:border md:border-border md:rounded-md md:px-4 md:py-2"
                >
                  <BookMarkedIcon className="size-4" />
                  <span className="hidden md:block">My Courses</span>
                </Link>
              </SignedIn>
            </nav>
            <DarkModeToggle />
            <SignedIn>
              <UserButton />
            </SignedIn>
            <SignedOut>
              <SignInButton mode="modal">
                <Button variant={"outline"}>Sign In</Button>
              </SignInButton>
            </SignedOut>
          </div>
        </article>
      </section>
    </header>
  );
};

export default Header;
