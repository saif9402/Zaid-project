const baseUrl = "https://zaidrealstate.tryasp.net";

export async function refreshToken() {
  const oldToken = localStorage.getItem("token");
  console.log(oldToken);

  if (!oldToken) {
    console.warn("No token in localStorage");
    return null;
  }

  try {
    const response = await fetch(`${baseUrl}/api/Auth/Refresh`, {
      method: "GET", // often POST is expected even with no body
      credentials: "include",
    });

    const result = await response.json();
    console.log(result);

    if (result.succeeded) {
      localStorage.setItem("token", result.data.token);
      return result.data.token;
    } else {
      console.error("Token refresh failed:", result.message || result);
      return null;
    }
  } catch (error) {
    console.error("Token refresh error:", error);
    return null;
  }
}
