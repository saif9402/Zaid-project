const passwordInput = document.getElementById("password");
const togglePassword = document.getElementById("togglePassword");
const eyeIcon = document.getElementById("eyeIcon");
const eyeOffIcon = document.getElementById("eyeOffIcon");

togglePassword.addEventListener("click", () => {
  const isPassword = passwordInput.getAttribute("type") === "password";
  passwordInput.setAttribute("type", isPassword ? "text" : "password");

  eyeIcon.classList.toggle("hidden", !isPassword);
  eyeOffIcon.classList.toggle("hidden", isPassword);
});

const form = document.getElementById("loginForm");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  try {
    const response = await fetch("https://zaidrealstate.tryasp.net/api/Auth", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const result = await response.json();

    if (result.succeeded) {
      // Store token in localStorage
      localStorage.setItem("token", result.data.token);

      // Redirect to dashboard page
      window.location.href = "pages/home.html";
    } else {
      alert("Login failed: " + (result.message || "Invalid credentials."));
    }
  } catch (error) {
    console.error("Login error:", error);
    alert("An error occurred during login.");
  }
});
