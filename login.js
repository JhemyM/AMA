const loginForm = document.querySelector('#loginForm');
const registerForm = document.querySelector('#registerForm');
const recoveryForm = document.querySelector('#recoveryForm');
const resetPasswordForm = document.querySelector('#resetPasswordForm');

const showRegisterBtn = document.querySelector('#showRegisterBtn');
const showLoginBtn = document.querySelector('#showLoginBtn');
const showRecoveryBtn = document.querySelector('#showRecoveryBtn');
const backToLoginBtn = document.querySelector('#backToLoginBtn');

const loginError = document.querySelector('#loginError');
const registerError = document.querySelector('#registerError');
const recoveryError = document.querySelector('#recoveryError');
const resetError = document.querySelector('#resetError');

const toast = document.querySelector('#toast');

function showToast(message) {
  toast.textContent = message;
  toast.classList.add('show');
  window.setTimeout(() => toast.classList.remove('show'), 2600);
}

function checkHashAndRedirect() {
  const hash = window.location.hash;
  if (hash && hash.includes('type=recovery')) {
    // User clicked the password recovery link in their email
    loginForm.hidden = true;
    if(registerForm) registerForm.hidden = true;
    if(recoveryForm) recoveryForm.hidden = true;
    if(resetPasswordForm) resetPasswordForm.hidden = false;
  } else {
    // Normal load, redirect to dashboard if logged in
    if (localStorage.getItem('agra_current_user')) {
      window.location.href = 'index.html?v=0.7.11';
    }
  }
}

// Execute check immediately
checkHashAndRedirect();
window.addEventListener('hashchange', checkHashAndRedirect);

showRegisterBtn?.addEventListener('click', () => {
  loginForm.hidden = true;
  registerForm.hidden = false;
  if(recoveryForm) recoveryForm.hidden = true;
  loginError.hidden = true;
});

showLoginBtn?.addEventListener('click', () => {
  registerForm.hidden = true;
  loginForm.hidden = false;
  if(recoveryForm) recoveryForm.hidden = true;
  registerError.hidden = true;
});

showRecoveryBtn?.addEventListener('click', () => {
  loginForm.hidden = true;
  if(registerForm) registerForm.hidden = true;
  recoveryForm.hidden = false;
  loginError.hidden = true;
  recoveryError.hidden = true;
});

backToLoginBtn?.addEventListener('click', () => {
  recoveryForm.hidden = true;
  loginForm.hidden = false;
  recoveryError.hidden = true;
});

const demoLoginBtn = document.querySelector('#demoLoginBtn');
demoLoginBtn?.addEventListener('click', () => {
  demoLoginBtn.textContent = 'Entrando...';
  demoLoginBtn.disabled = true;

  // Set demo timer and mock user
  localStorage.setItem('agra_demo_start', Date.now().toString());
  localStorage.setItem('agra_current_user', JSON.stringify({
    id: 'demo-user-id',
    name: 'Visitante Demo',
    email: 'demo@agra.com',
    role: 'demo',
    plan: 'demo'
  }));
  
  window.location.href = 'index.html?v=0.7.11';
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
        plan: 'free'
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
    window.location.href = 'index.html?v=0.7.11';
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

  if (email === 'admin@agra.com.br' && password === 'AgraAdmin2026!') {
    const user = { email: email, name: 'Super Administrador', id: 'admin-123', plan: 'vitalicio' };
    localStorage.setItem('agra_current_user', JSON.stringify(user));
    showToast('Login de administrador bem-sucedido!');
    setTimeout(() => {
      window.location.href = 'index.html?v=0.7.11';
    }, 1000);
    return;
  }


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
      window.location.href = 'index.html?v=0.7.11';
    }, 1000);
  }
});

// Request Recovery Link
recoveryForm?.addEventListener('submit', async (e) => {
  e.preventDefault();
  const email = document.querySelector('#recoveryEmail').value;
  const submitBtn = recoveryForm.querySelector('button[type="submit"]');
  const originalText = submitBtn.textContent;
  submitBtn.textContent = 'Enviando...';
  submitBtn.disabled = true;

  const { error } = await window.supabaseClient.auth.resetPasswordForEmail(email, {
    redirectTo: window.location.href // Redirects back to this page
  });

  submitBtn.textContent = originalText;
  submitBtn.disabled = false;

  if (error) {
    recoveryError.textContent = 'Erro: ' + error.message;
    recoveryError.hidden = false;
  } else {
    showToast('Link de recuperação enviado para o seu e-mail!');
    recoveryForm.reset();
    setTimeout(() => {
      backToLoginBtn.click();
    }, 3000);
  }
});

// Set new password
resetPasswordForm?.addEventListener('submit', async (e) => {
  e.preventDefault();
  const newPassword = document.querySelector('#newPassword').value;
  const submitBtn = resetPasswordForm.querySelector('button[type="submit"]');
  const originalText = submitBtn.textContent;
  submitBtn.textContent = 'Atualizando...';
  submitBtn.disabled = true;

  const { error } = await window.supabaseClient.auth.updateUser({
    password: newPassword
  });

  submitBtn.textContent = originalText;
  submitBtn.disabled = false;

  if (error) {
    resetError.textContent = 'Erro ao atualizar senha: ' + error.message;
    resetError.hidden = false;
  } else {
    showToast('Senha atualizada com sucesso!');
    setTimeout(() => {
      window.location.hash = ''; // Clear hash
      window.location.href = 'index.html?v=0.7.11';
    }, 1500);
  }
});
