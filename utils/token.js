function base64UrlDecode(base64Url) {
  // Replace non-url compatible chars with base64 standard chars
  base64Url = base64Url.replace(/-/g, "+").replace(/_/g, "/");

  // Pad out with standard base64 required padding characters
  const pad = base64Url.length % 4;
  if (pad) {
    if (pad === 1) {
      throw new Error(
        "InvalidLengthError: Input base64url string is the wrong length to determine padding"
      );
    }
    base64Url += new Array(5 - pad).join("=");
  }

  return atob(base64Url);
}

export function isExpired(token) {
  // Split the token into its parts
  const parts = token.split(".");
  if (parts.length !== 3) {
    throw new Error("Invalid JWT token");
  }

  // Decode the payload part (second part)
  const payload = parts[1];
  const decodedPayload = base64UrlDecode(payload);
  // Parse the JSON string
  return (
    JSON.parse(decodedPayload).exp < Math.floor(new Date().getTime() / 1000)
  );
}
