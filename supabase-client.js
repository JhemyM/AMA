// supabase-client.js
// Insira as credenciais do seu projeto Supabase abaixo. 
// Você encontra isso em Settings > API no painel do Supabase.
const SUPABASE_URL = 'https://mjvsfwebhiqvnrvcwdnj.supabase.co';
const SUPABASE_ANON_KEY = '__INJECT_SUPABASE_ANON_KEY__';

// Inicializa o cliente do Supabase e o expõe globalmente
window.supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Listener para mudanças de autenticação
window.supabaseClient.auth.onAuthStateChange((event, session) => {
  if (session) {
    // Sincroniza com a estrutura existente do AGRA
    const user = {
      email: session.user.email,
      name: session.user.user_metadata?.name || session.user.email.split('@')[0],
      id: session.user.id,
      plan: session.user.user_metadata?.plan || 'free'
    };
    localStorage.setItem('agra_current_user', JSON.stringify(user));
  } else {
    const localUser = JSON.parse(localStorage.getItem('agra_current_user') || '{}');
    // Prevent wiping demo or admin sessions that bypass Supabase
    if (localUser.id !== 'demo-123' && localUser.id !== 'admin-123') {
      localStorage.removeItem('agra_current_user');
    }
  }
});
