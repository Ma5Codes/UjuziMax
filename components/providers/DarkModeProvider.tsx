"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import { ComponentProps } from "react";
const DarkModeProvider = ({
  children,
  ...props
}: ComponentProps<typeof NextThemesProvider>) => {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
};
export default DarkModeProvider;
