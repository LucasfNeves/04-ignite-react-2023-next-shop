import Stripe from "stripe";

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: '2023-10-16',
    // uso o appInfo pois assim todas as requisições feitas pelo stripe terão um log de onde foi feita
    appInfo: {
        name : 'Ignite Shop',
    }
})

/**
 * Criei essa pasta lib para colocar arquivos que não são exatamente componentes, mas que são funções que podem ser usadas em vários lugares
 * A const stripe é uma instância do stripe, que é uma biblioteca que permite fazer requisições para o stripe
 * eu import o stripe e crio uma instância dele, passando a chave secreta do stripe
 * 
 * O que é instância?
 * É uma cópia de um objeto que já existe, mas que pode ser alterada sem alterar o objeto original
 */