import jwt from "jsonwebtoken";

const secretKey = 'your-256-bit-secret'; // Replace with your actual secret key

/**
 * Function to extract data from a JWT token
 * @param token - The JWT token string
 * @returns The decoded payload or null if the token is invalid
 */
function isExpired(token) {
  try {
    const decoded = jwt.decode(token);
    console.log(decode)
    return decoded.exp < new Date();
  } catch (error) {
    console.error('Invalid token:', error.message);
    return null;
  }
}

