const loginForm = document.getElementById("login-form");
const registerForm = document.getElementById("register-form");
const welcomeMessage = document.getElementById("welcome-message");
const logoutBtn = document.getElementById("logout-btn");
const popupMessage = document.getElementById("popup-message");

function showMessage(message, isSuccess = true) {
  popupMessage.textContent = message;
  popupMessage.style.color = isSuccess ? "green" : "red";
  popupMessage.style.display = "block";
  popupMessage.style.opacity = 1;

  setTimeout(() => {
    clearMessage();
  }, 2000);
}

function clearMessage() {
  popupMessage.style.opacity = 0;

  setTimeout(() => {
    popupMessage.style.display = "none";
    popupMessage.textContent = "";
  }, 500);
}

function isValidEmail(email) {
  return /\S+@\S+\.\S+/.test(email) && email.endsWith("gmail.com");
}

function isValidPassword(password) {
  return password.length >= 8;
}

function login() {
  const username = document.getElementById("login-username").value;
  const password = document.getElementById("login-password").value;

  if (!isValidEmail(username)) {
    showMessage("Введите корректный адрес Gmail.", false);
  } else if (checkCredentials(username, password)) {
    showWelcome(username);
  } else {
    showMessage("Неверное имя пользователя или пароль.", false);
  }
}

function register() {
  const username = document.getElementById("register-username").value;
  const password = document.getElementById("register-password").value;

  if (!isValidEmail(username)) {
    showMessage("Введите корректный адрес Gmail.", false);
  } else if (!isValidPassword(password)) {
    showMessage("Пароль должен содержать минимум 8 символов.", false);
  } else if (users.some(user => user.username === username)) {
    showMessage("Пользователь с таким именем уже существует.", false);
  } else {
    users.push({ username, password });
    showMessage("Регистрация успешно завершена!", true);
  }
}

// Остальной код остаётся без изменений
function authorizeWithGoogle() {
  // Здесь добавьте код для редиректа на страницу авторизации Google.
  // Вам также потребуется обработать токен после успешной авторизации.
  // Этот код зависит от выбранного способа интеграции с Google OAuth.
}


function checkCredentials(username, password) {
  const user = users.find(user => user.username === username && user.password === password);
  return user !== undefined;
}

function showWelcome(username) {
  loginForm.style.display = "none";
  registerForm.style.display = "none";
  welcomeMessage.style.display = "block";
  logoutBtn.style.display = "block";
  welcomeMessage.textContent = `Добро пожаловать, ${username}!`;
}

function logout() {
  loginForm.style.display = "block";
  registerForm.style.display = "block";
  welcomeMessage.style.display = "none";
  logoutBtn.style.display = "none";
}

// Проверяем, если пользователь уже вошёл
if (localStorage.getItem("loggedIn") === "true") {
  showWelcome(localStorage.getItem("username"));
} else {
  loginForm.style.display = "block";
  registerForm.style.display = "block";
}

const users = [];

// Остальной код остаётся без изменений
