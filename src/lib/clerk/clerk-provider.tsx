import { ReactNode } from "react";
import { dark } from "@clerk/themes";
import { ClerkProvider } from "@clerk/clerk-react";

const Clerk_Provider = ({ children }: { children: ReactNode }) => {
  return (
    <ClerkProvider
      publishableKey={import.meta.env.VITE_CLERK_PUBLISHABLE_KEY}
      afterSignOutUrl="/"
      appearance={{
        baseTheme: [dark],
      }}
    >
      {children}
    </ClerkProvider>
  );
};

export default Clerk_Provider;
