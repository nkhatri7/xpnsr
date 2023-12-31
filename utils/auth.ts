import { auth } from "../firebase/config";
import {
  User,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateCurrentUser,
  updateProfile,
} from "firebase/auth";

/**
 * Creates a user account in the firebase project with the given email and
 * password.
 * @param email The user's email.
 * @param password The user password.
 * @returns A {@link User} object if the account creation was successful.
 */
export const registerUser = async (
  name: string,
  email: string,
  password: string
): Promise<User> => {
  const userCredentials = await createUserWithEmailAndPassword(
    auth,
    email,
    password,
  );
  await updateProfile(userCredentials.user, {
    displayName: name,
  });
  await updateCurrentUser(auth, userCredentials.user);
  return userCredentials.user;
};

/**
 * Signs in the user with the given email and password. If the sign in is
 * successful then a user object will be returned.
 * @param email The user email.
 * @param password The user password.
 * @returns A {@link User} object if the sign in was successful. Otherwise the
 * error message from the sign in.
 */
export const signInUser = async (
  email: string,
  password: string,
): Promise<User> => {
  const userCredentials = await signInWithEmailAndPassword(
    auth,
    email,
    password,
  );
  await updateCurrentUser(auth, userCredentials.user);
  return userCredentials.user;
};
