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

// Supabase Registration
registerForm?.addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const name = document.querySelector('#regName').value;
  const email = document.querySelector('#regEmail').value;
  const password = document.querySelector('#regPassword').value;

  const submitBtn = registerForm.querySelector('button[type="submit"]');
  const originalText = submitBtn.textContent;
  submitBtn.textContent = 'Criando...';
  submitBtn.disabled = true;

  const { data, error } = await window.supabaseClient.auth.signUp({
    email,
    password,
    options: {
      data: {
        name: name,
        plan: 'free' // Default plan
      }
    }
  });

  submitBtn.textContent = originalText;
  submitBtn.disabled = false;

  if (error) {
    registerError.textContent = 'Erro ao criar conta: ' + error.message;
    registerError.hidden = false;
    return;
  }

  showToast('Conta criada com sucesso!');
  setTimeout(() => {
    window.location.href = 'index.html';
  }, 1000);
});

// Supabase Login
loginForm?.addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const email = document.querySelector('#loginEmail').value;
  const password = document.querySelector('#loginPassword').value;

  const submitBtn = loginForm.querySelector('button[type="submit"]');
  const originalText = submitBtn.textContent;
  submitBtn.textContent = 'Entrando...';
  submitBtn.disabled = true;

  const { data, error } = await window.supabaseClient.auth.signInWithPassword({
    email,
    password
  });

  submitBtn.textContent = originalText;
  submitBtn.disabled = false;

  if (error) {
    loginError.textContent = 'Credenciais inválidas.';
    loginError.hidden = false;
  } else {
    showToast('Login realizado com sucesso!');
    setTimeout(() => {
      window.location.href = 'index.html';
    }, 1000);
  }
});
