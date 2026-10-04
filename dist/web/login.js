const loginForm = document.querySelector('#loginForm');
const registerForm = document.querySelector('#registerForm');
const showRegisterBtn = document.querySelector('#showRegisterBtn');
const showLoginBtn = document.querySelector('#showLoginBtn');
const loginError = document.querySelector('#loginError');
const registerError = document.querySelector('#registerError');
const toast = document.querySelector('#toast');

function showToast(message) {
  toast.textContent = message;
  toast.classList.add('show');
  window.setTimeout(() => toast.classList.remove('show'), 2600);
}

// Redirect if already logged in
if (localStorage.getItem('agra_current_user')) {
  window.location.href = 'index.html';
}

showRegisterBtn?.addEventListener('click', () => {
  loginForm.hidden = true;
  registerForm.hidden = false;
  loginError.hidden = true;
});

showLoginBtn?.addEventListener('click', () => {
  registerForm.hidden = true;
  loginForm.hidden = false;
  registerError.hidden = true;
});

// Mock Local Storage Registration
registerForm?.addEventListener('submit', (e) => {
  e.preventDefault();
  
  const name = document.querySelector('#regName').value;
  const email = document.querySelector('#regEmail').value;
  const password = document.querySelector('#regPassword').value;

  const users = JSON.parse(localStorage.getItem('agra_users') || '{}');

  if (users[email]) {
    registerError.hidden = false;
    return;
  }

  users[email] = { name, email, password };
  localStorage.setItem('agra_users', JSON.stringify(users));
  localStorage.setItem('agra_current_user', JSON.stringify({ email, name }));
  
  showToast('Conta criada com sucesso!');
  setTimeout(() => {
    window.location.href = 'index.html';
  }, 1000);
});

// Mock Local Storage Login
loginForm?.addEventListener('submit', (e) => {
  e.preventDefault();
  
  const email = document.querySelector('#loginEmail').value;
  const password = document.querySelector('#loginPassword').value;

  const users = JSON.parse(localStorage.getItem('agra_users') || '{}');
  let user = users[email];

  if (!user) {
    // Seamlessly register if user doesn't exist
    const name = email.split('@')[0];
    user = { name: name.charAt(0).toUpperCase() + name.slice(1), email, password };
    users[email] = user;
    localStorage.setItem('agra_users', JSON.stringify(users));
  }

  if (user.password === password) {
    localStorage.setItem('agra_current_user', JSON.stringify({ email, name: user.name }));
    showToast('Login realizado com sucesso!');
    setTimeout(() => {
      window.location.href = 'index.html';
    }, 1000);
  } else {
    loginError.hidden = false;
  }
});
