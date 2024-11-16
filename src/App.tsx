import { RouterProvider } from "react-router-dom";
import { ThemeProvider } from "./provider/theme-provider/theme-provider";
import router from "./router";
import checkFirebaseEnvVar from "./lib/firebase/firebase-env-validation";
import checkClerkEnvVar from "./lib/clerk/clerk-env-validation";
import Clerk_Provider from "./lib/clerk/clerk-provider";

// Ensure environment variables are valid
checkFirebaseEnvVar();
checkClerkEnvVar();

function App() {
  return (
    <>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <Clerk_Provider>
          <RouterProvider router={router} />
        </Clerk_Provider>
      </ThemeProvider>
    </>
  );
}

export default App;
