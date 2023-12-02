import { stripe } from "../../lib/stripe"
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler( req: NextApiRequest, res: NextApiResponse) {
    // estamos puxando o priceId passado no body da requisição axios
    const { priceId, name } = req.body
    // Checa se o método da requisição é POST, para evitar que a rota seja acessada por outros métodos como pela URL
    if (req.method !== 'POST') {
        res.status(405).json('Method not allowed')
    }

    if (!priceId) {
        res.status(400).json({ error: 'Missing priceId' })
    }

    const successUrl = `${process.env.NEXT_URL}/success`
    const cancelUrl = `${process.env.NEXT_URL}/`
    const checkoutMode = name === 'Explorer 2.0' ? 'subscription' : 'payment'

    const checkoutSession = await stripe.checkout.sessions.create({
        success_url: successUrl,
        cancel_url: cancelUrl,
        mode: checkoutMode,
        line_items: [
            {
                price: priceId, // ou use price_data se necessário
                quantity: 1
            }
        ],
    })

    return res.status(201).json({
        checkoutUrl: checkoutSession.url,
    })
}