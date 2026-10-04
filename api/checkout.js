export default async function handler(req, res) {
  // CORS Headers
  res.setHeader('Access-Control-Allow-Credentials', true)
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT')
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version')

  if (req.method === 'OPTIONS') {
    res.status(200).end()
    return
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' })
  }

  try {
    const { plan } = req.body

    // --- SECRETS HANDLING ---
    // Aqui sua chave do Stripe ou MercadoPago fica 100% segura, 
    // pois este cÃ³digo sÃ³ roda no servidor da Vercel.
    // const STRIPE_SECRET = process.env.STRIPE_SECRET_KEY;
    
    console.log('Recebida solicitacao de checkout para o plano:', plan);

    let checkoutUrl = '';

    // LÃ³gica de criaÃ§Ã£o de SessÃ£o de Checkout (Exemplo Stripe/MercadoPago)
    if (plan === 'pro') {
      // url_de_pagamento = await stripe.checkout.sessions.create({...})
      checkoutUrl = 'https://link-de-pagamento-simulado.com/pro';
    } else if (plan === 'vitalicio') {
      checkoutUrl = 'https://link-de-pagamento-simulado.com/vitalicio';
    } else {
      throw new Error('Plano invÃ¡lido');
    }

    // Retorna a URL de pagamento segura para o Frontend PWA
    return res.status(200).json({ url: checkoutUrl });

  } catch (error) {
    console.error('Erro na Cloud Function:', error);
    return res.status(500).json({ error: 'Falha ao processar checkout.' });
  }
}
