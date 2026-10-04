import { MercadoPagoConfig, Preference } from 'mercadopago';

export default async function handler(req, res) {
  // CORS Headers
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const { plan } = req.body;

    // A chave de acesso DEVE estar cadastrada nas variÃ¡veis de ambiente da Vercel
    const MP_ACCESS_TOKEN = process.env.MP_ACCESS_TOKEN;
    if (!MP_ACCESS_TOKEN) {
      console.warn("Mercado Pago Access Token nao configurado.");
      return res.status(500).json({ error: 'Gateway nao configurado.' });
    }

    const client = new MercadoPagoConfig({ accessToken: MP_ACCESS_TOKEN });
    const preference = new Preference(client);

    let itemTitle = '';
    let itemPrice = 0;

    if (plan === 'pro') {
      itemTitle = 'AGRA Pro - Mensal';
      itemPrice = 147.00;
    } else if (plan === 'vitalicio') {
      itemTitle = 'AGRA Vitalicio - Acesso Completo';
      itemPrice = 1497.00;
    } else {
      throw new Error('Plano invÃ¡lido');
    }

    const body = {
      items: [
        {
          id: plan,
          title: itemTitle,
          quantity: 1,
          unit_price: itemPrice,
          currency_id: 'BRL',
        }
      ],
      back_urls: {
        success: 'https://jhemym.github.io/AMA?status=success',
        failure: 'https://jhemym.github.io/AMA?status=failure',
        pending: 'https://jhemym.github.io/AMA?status=pending'
      },
      auto_return: 'approved'
    };

    const response = await preference.create({ body });
    // Retorna a URL (init_point) real do Checkout do Mercado Pago
    return res.status(200).json({ url: response.init_point });

  } catch (error) {
    console.error('Erro na Cloud Function Mercado Pago:', error);
    return res.status(500).json({ error: 'Falha ao processar checkout do MP.' });
  }
}
