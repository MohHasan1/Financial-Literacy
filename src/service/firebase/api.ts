// /* eslint-disable @typescript-eslint/no-explicit-any */
// import { addDocument, getDocumentById } from "@/lib/firebase/db";
// import { logError, logInfo } from "@/utils/log";

// // Function to check if the user exists in Firestore and create if not
// export const checkAndCreateUserInFirestore = async (clerkUserId: string, userData: any) => {
//   try {
//     // Check if the user exists in Firestore
//     const existingUser = await getDocumentById("users", clerkUserId);

//     if (existingUser) {
//       logInfo("User already exists in Firestore.");
//       return existingUser.data(); // Return the existing user data
//     } else {
//       // If the user does not exist, create a new user document
//       const newUser = {
//         clerkUserId: clerkUserId,
//         firstName: userData.firstName,
//         lastName: userData.lastName,
//         email: userData.email,
//         createdAt: new Date().toISOString(),
//         // Add more fields as necessary
//       };

//       // Add the new user to Firestore
//       const docId = await addDocument("users", newUser);

//       logInfo(`New user created in Firestore with Clerk ID: ${clerkUserId}`);
//       return { id: docId, ...newUser }; // Return the new user data with ID
//     }
//   } catch (error) {
//     logError("Error checking or creating user in Firestore:", error);
//     return null;
//   }
// };
