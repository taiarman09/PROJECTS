const signUpButton = document.getElementById("signUp");
const signInButton = document.getElementById("signIn");
const container = document.getElementById("container");

// Panel toggle
signUpButton.addEventListener("click", () => {
  container.classList.add("right-panel-active");
});

signInButton.addEventListener("click", () => {
  container.classList.remove("right-panel-active");
});

// Forms
const signUpForm = document.querySelector(".sign-up-container form");
const signInForm = document.querySelector(".sign-in-container form");

// --- SIGN-UP (Register)
signUpForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = signUpForm.querySelector('input[placeholder="Name"]').value.trim();
  const email = signUpForm.querySelector('input[placeholder="Email"]').value.trim().toLowerCase();
  const password = signUpForm.querySelector('input[placeholder="Password"]').value.trim();

  if (!name || !email || !password) {
    alert("⚠️ Please fill all fields!");
    return;
  }

  const userData = { name, email, password };
  localStorage.setItem("userData", JSON.stringify(userData));

  // Switch to sign-in form
  container.classList.remove("right-panel-active");
  signUpForm.reset();
});

// --- SIGN-IN (Login)
signInForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const email = signInForm.querySelector('input[placeholder="Email"]').value.trim().toLowerCase();
  const password = signInForm.querySelector('input[placeholder="Password"]').value.trim();

  const storedUser = JSON.parse(localStorage.getItem("userData"));

  if (!storedUser) {
    alert("⚠️ No user found! Please register first.");
    return;
  }

  if (email === storedUser.email && password === storedUser.password) {
    // ✅ Directly redirect to home.html
    window.location.href = "home.html";
  } else {
    alert("❌ Incorrect email or password!");
  }

  signInForm.reset();
});
const forgotPasswordLink = document.getElementById("forgotPassword");

forgotPasswordLink.addEventListener("click", (e) => {
  e.preventDefault();

  const email = prompt("Enter your registered email to reset password:").trim().toLowerCase();

  if (!email) {
    alert("⚠️ Please enter your email.");
    return;
  }

  const storedUser = JSON.parse(localStorage.getItem("userData"));

  if (!storedUser) {
    alert("⚠️ No user found! Please register first.");
    return;
  }

  if (email === storedUser.email) {
    const newPassword = prompt("Enter your new password:").trim();

    if (!newPassword) {
      alert("⚠️ Password cannot be empty!");
      return;
    }

    // Update password in localStorage
    storedUser.password = newPassword;
    localStorage.setItem("userData", JSON.stringify(storedUser));

    alert("✅ Password reset successful! You can now login with new password.");
  } else {
    alert("❌ Email not found! Please check your email.");
  }
});
