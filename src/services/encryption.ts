import * as bcrypt from "bcryptjs";

async function hashPassword(password: string): Promise<string> {
  // Hash a password using bcrypt
  const hashedPassword = await bcrypt.hash(password, 10); // 10 is the number of salt rounds
  return hashedPassword;
}

async function verifyPassword(
  password: string,
  hashedPassword: string
): Promise<boolean> {
  // Verify a password against a hashed password
  const isMatch = await bcrypt.compare(password, hashedPassword);
  return isMatch;
}

// Example usage:
const plaintextPassword: string = "user_password";
// const hashedPassword: string = await hashPassword(plaintextPassword);

// Store `hashedPassword` in your database

// Verify a login attempt
// const loginAttemptPassword: string = "user_password";
// const isPasswordCorrect: boolean = await verifyPassword(
//   loginAttemptPassword,
//   hashedPassword
// );

// if (isPasswordCorrect) {
//   console.log("Password is correct. Allow login.");
// } else {
//   console.log("Password is incorrect. Deny login.");
// }
