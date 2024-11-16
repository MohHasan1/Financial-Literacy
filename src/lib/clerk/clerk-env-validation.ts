export function checkClerkEnvVar() {
  const publishableKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

  if (!publishableKey) {
    throw new Error(
      "Missing Publishable Key. Please set VITE_CLERK_PUBLISHABLE_KEY in your .env file."
    );
  }
}

export default checkClerkEnvVar;
