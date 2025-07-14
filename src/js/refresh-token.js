export async function refreshToken() {
  
  try {
    const response = await fetch("/api/Auth/Refresh", {
      method: "GET",
      credentials: "include"   // ← ensures your HttpOnly cookie is sent
    });

    const result = await response.json();
    console.log("refresh result:", result);

    if (result.succeeded) {
      // store the new access token from the body
      localStorage.setItem("token", result.data.token);
      return result.data.token;
    } else {
      console.error("Token refresh failed:", result.message);
      return null;
    }
  } catch (err) {
    console.error("Token refresh error:", err);
    return null;
  }
}
