---
description: Configuração no componente, Criando checkout section
---

# Checkout API Stripe

## <mark style="color:blue;">Configuração no componente</mark>

Sempre usamos o `try` `catch` quando estamos fazendo uma requisição para uma API pois é impotante ter um tratamente de erros para nossas requisições.

{% hint style="info" %}
Eu não preciso criar dentro de lib um arquivo api que seta a base url, porque a backend está rodando no mesmo endereço que o frontende, então posso acessar o axios direto só passando a nova rota
{% endhint %}

Para criarmos a checkoutSection o melhor método é POST (O método POST é usado para enviar dados para um servidor, a fim de atualizar ou criar um novo recurso.) e no objeto de configuração passamos os parametros que queremos enviar&#x20;

```typescript
try {
  const response = await axios.post('/api/checkout', {
    priceId: product.defaultPriceId,
    name: product.name,
})

```

Ela passa uma resposta para a gente chamada checkoutUrl, então pegamos essa resposta dentro de response.data

```typescript
const { checkoutUrl } = response.data
```

E redirecionamos o usuário para essa rota



<mark style="color:purple;">Redirecionando para rota externa :</mark>

```typescript
 window.location.href = checkoutUrl
```

<mark style="color:purple;">Redirecionando para rota interna :</mark>

```typescript
router.push(checkoutUrl)
```



No fim nossa função fica da seguinte forma&#x20;

```tsx
    async function handleBuyProduct() {
        console.log(product.defaultPriceId)
        try {
            setIsCreatingCheckoutSesion(true)
            const response = await axios.post('/api/checkout', {
                priceId: product.defaultPriceId,
                name: product.name,
            })
            const { checkoutUrl } = response.data

            // redirecionando o usuário para a página de checkout externa
            window.location.href = checkoutUrl

        } catch (error) {
            // Conectar com alguma ferramenta de observabilidade (DataDog, Sentry, etc)
            alert('Erro ao processar o pagamento')
        } finally {
            setIsCreatingCheckoutSesion(false)
        }
      }

```

***

## <mark style="color:blue;">Criando checkout section</mark>

Precisamos criar um checkout sectionm, ela será criada como uma rota no nosso frontend.

Exemplo de cração de checkout session do STRIPE.

```tsx
import { stripe } from "../../lib/stripe"
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler( req: NextApiRequest, res: NextApiResponse) {
    // estamos puxando o priceId passado no body da requisição axios
    const { priceId, name } = req.body
    // Checa se o método da requisição é POST, para evitar que a rota seja acessada por outros métodos como pela URL
    if (req.method !== 'POST') {
        res.status(405).json('Method not allowed')
    }

    // Checa se o priceId foi passado no body da requisição
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
```

