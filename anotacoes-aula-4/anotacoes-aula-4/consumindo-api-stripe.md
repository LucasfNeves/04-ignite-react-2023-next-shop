---
description: >-
  Consumo de API, getServerSideProps, getStaticProps, getStaticPaths, useRouter,
  Formatando o Preço
---

# Consumindo API STRIPE

## <mark style="color:blue;">Chamada HTTP</mark> <mark style="color:blue;"></mark><mark style="color:blue;">`getServerSideProps`</mark> <mark style="color:blue;"></mark><mark style="color:blue;">no Next.js</mark>

> Ao contrário do Vite, o Next.js, mesmo quando o JavaScript está desabilitado, continua exibindo na tela os itens que foram salvos no servidor do Next. Isso é diferente do Vite, que apresentaria a tela completamente em branco nessa situação.

Quando acessamos uma página pela primeira vez, o Next.js cria uma versão da página com todo o HTML e CSS na camada de Server Next. No entanto, qualquer lógica executada apenas no lado do cliente, como `useEffect` e bibliotecas específicas de JavaScript, essa lógica não entra nessa versão criada pela o next, e quando desabilitamos o JavaScript funções de requisição de uma API externa por exemplo não é executado.

Existe uma maneira de instruir o Next.js a realizar chamadas à API, por exemplo, também do lado do servidor.

Quando implementamos um código no lado do servidor, o Next.js aguarda a execução completa desse código antes de enviar qualquer resposta para o frontend. Ou seja, com o `getServerSideProps`, nunca teremos um estado de "load" na lista, garantindo que todas as informações essenciais estejam prontas.

{% hint style="info" %}
Somente nos arquivos na pasta `pages` podemos exportar uma função chamada `getServerSideProps` (camada do servidor) para alcançar esse objetivo.
{% endhint %}

{% hint style="info" %}
É importante notar que o código executado no servidor não chega ao navegador. Por exemplo, se adicionarmos um log, esse log será exibido no terminal do servidor Node, não no console do navegador.
{% endhint %}

***

## <mark style="color:blue;">Usando</mark> <mark style="color:blue;"></mark><mark style="color:blue;">`getServerSideProps`</mark> <mark style="color:blue;"></mark><mark style="color:blue;">e STRIPE</mark>

`getServerSideProps` roda em um server side em Node.js (backend em node), todo código que roda ali dentro não é vizísel para o usuário final, então quando temos que fazer um, chamada API que não pode ser vizísel ao usuário final podemos usar ele.

<mark style="background-color:yellow;">Então a gente pode colocar códigos sensíveis, como código de autenticação, código de banco de dados, pois o usuário não tem acesso</mark>

***

## <mark style="color:blue;">Configurando o Stripe</mark>

instalar o sdk javascript da biblioteca stripe :

```bash
npm i stripe
```

Crio uma pasta em `src` chamada `lib` (para bibliotecas usa lib) e dentro dela um arquivo chamado `stripe.ts`

Nesse terá as seguintes informações :

```ts
import Stripe from "stripe";

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: '2023-10-16',
    appInfo: {
        name : 'Ignite Shop',
    }
})
```

* Uso o appInfo pois assim todas as requisições feitas pelo stripe terão um log de onde foi feita
* A const stripe é uma instância do stripe, que é uma biblioteca que permite fazer requisições para o stri`p`e
* Eu import o stripe e crio uma instância dele, passando a chave secreta do stripe
* O que é uma instâmcia : É uma cópia de um objeto que já existe, mas que pode ser alterada sem alterar o objeto original

***

## <mark style="color:blue;">Requisição SSR</mark>

Recomenda-se utilizar `getServerSideProps` apenas para informações cruciais que devem estar disponíveis para indexadores, rastreadores da web, bots ou funções semelhantes.

Essa requisição é feita so servidor node do Next.js, e esse método executa em toda requisição que fazemos na página dele.

```tsx
(1) export const getServerSideProps: GetServerSideProps = async () => {
  (1.1)const response = await stripe.products.list({
    expand: ['data.default_price']
  }) 
  
  (2) const products = response.data.map(product => {
    (2.1) const price = product.default_price as Stripe.Price
    return {
      id: product.id,
      name: product.name,
      imageUrl: product.images[0],
      price: price.unit_amount ?  price.unit_amount / 100 :  null,
    }
  })
  // retornando os produtos para a página
  (3) return { 
    props: {
      products,
    }
  }
}
```

**Explicação**



> 1.
>
>
>
> * Aqui vamos fazer a chamada a API do stripe para buscar os produtos
> * O stripe trabalha com o conceito de expansão, ou seja, quando buscamos um produto ele não retorna o preço, então precisamos expandir o preço para que ele seja retornado
> * o expand é um array de strings, onde cada string é o nome do campo que queremos expandir
>
>
>
> 1.1
>
> &#x20;
>
> * **`stripe.products.list`**: Esta parte da função faz uma chamada à API da Stripe para listar produtos. A função `list` é um método da API da Stripe que recupera uma lista de produtos.
> * **`expand: ['data.default_price']`**: Este é um parâmetro opcional que está sendo passado à função. Ele indica que a resposta da API deve incluir informações adicionais sobre o preço padrão (`default_price`) de cada produto. Isso é útil quando você quer mais detalhes sobre os produtos, como os preços associados a eles.



> 2.
>
>
>
> * Aqui estamos mapeando os produtos que vem da API do stripe e retornando apenas os dados que precisamos
> * 2.1 -  A const price está recebendo o preço padrão do produto que está sendo mapeado e convertendo para o tipo Stripe.Price que é o tipo que o stripe usa para representar o preço de um produto, precisamos fazer essa conversão pois o stripe retorna o preço padrão do produto como um objeto e não como um tipo Stripe.Price
> * &#x20;price: price.unit\_amount / 100 estamos dividindo por 100 pois o stripe trabalha com centavos
> * &#x20;  Images: product.images\[0] estamos pegando o primeiro item do array pois o stripe permite que tenha mais de uma imagem
> * Sempre que for salvar o preço salvar o valor em centavos, o stripe trabalha com centavos automaticamente

> 3. Retornando os produtos para a página



**Após isso basta mapear os elmentos (As imagens de fontes externas precisa de um tratamento feito no arquivonext.config.js)**

```tsx
export default function Home ({products} : HomeProps) {
  const [sliderRef] = useKeenSlider({
    slides: {
      perView: 2,
      spacing: 48,
    }
  })
  return (
    <HomeContainer ref={sliderRef} className="keen-slider">
      {products.map(product => {
        return (
          <Product key={product.id} className="keen-slider__slide">
            <Image src={product.imageUrl} width={520} height={480} alt={product.name} />
            <footer>
              <strong>{product.name}</strong>
              <span>R$ {product.price}</span>
            </footer>
          </Product >
        )
      } )}
    </HomeContainer>
  )
}
```



***

## <mark style="color:blue;">Requisição SSG</mark>

Quando temos uma página que não mud com tanta frequência e podemos ter um cache dessa página que será mostrado em todos os usuários podemos usar esse conceito basta mudarmos a função `getServerSideProps` para `getStaticProps`.

Em ambiente de desenvolvimento não veremos mudaças pois o next trata as duas funções exatamente iguais, porém para testarmos funcionando podemos testar nosso projeto como se estivesse em produção :

```bash
npm run build
```

```bash
npm run start
```

Quando eu uso o `getStaticProps` eu não tenho mais acesso aos paramêtros especifícos do contexto daquela requisição (req, res, query, etc), pois ele esse método não roda a cada requisição feita pela página ele só no momento que o Next estiver criando uma versão estátic, uma versão de cache daquela página, e quando isso acontece ?

1. Quando rodamos um build da nossa aplicação (quando colocamos ela em produção) `npm run build`
2. Quando criamos esse método podemos retornar uma informação chamada `revalidate` que é um número em segundos que queremos que essa página vai ser recriada, e depois após esse tempo determinado que as pessoas acessarem a página o Next vai recarregar ela e criar outro cache por de baixo dos após, o tdoas as pessoas que acessarem nesse meio tempo vão consumir um cache estático dessa página que já foi criado pelo acesso de outro usuário

Exemplo da função completa

```ts
export const getStaticProps: GetStaticProps = async () => {
  const response = await stripe.products.list({
    expand: ['data.default_price']
  })
  const products = response.data.map(product => {
    const price = product.default_price as Stripe.Price
    return {
      id: product.id,
      name: product.name,
      imageUrl: product.images[0],
      price: price.unit_amount ?  price.unit_amount / 100 :  null,
    }
  })

  // retornando os produtos para a página
  return {
    props: {
      products,
    },
    revalidate: 60 * 60 * 2, // 2 horas
  }
}
```

{% hint style="info" %}
Quando usamos esse método não temos acesso ao contetxo da requisição, então não podemos ter acesso ali dentro aos dados dos usuários logados, cockies entre outros, pois ele é executado quando do a build da aplicação e nesse momento eu não tenho acesso a nenhum dado dos usuários, então se precisar desses dados não podemos usar esse método.

Pois páginas estáticas tem que ser iguiais para todos os usuários estão acessando ela, então se a minha página contém alguma informação dinâmica que necessita do ID do usuário por exemplo, não posso usar esse método.
{% endhint %}

***

## <mark style="color:blue;">Carregando dados do produto em outra página</mark>

Se a nossa página não depende de dados do conteúdo atual e pode ficar em cache por um tempo,  e não depende de dados do contexto da aplicação em tempo real podemos usar o getStaticProps.

Exportamos a função `getStaticProps` ou `getServerSideProps`  e dentro da função precisamos buscar os dados do nosso produto, a nossa página será dinâmica, ele muda por produto,&#x20;

então para isso podemos desestruturar e captar o atributo `params`, esse atributo nos da acesso ao id, que podemos capta-ló e uma constante.

```typescript
 const productId = params.id 
```

Então precisamos buscar o produto de dentro do stripe e para isso vamos fazer da seguinte forme&#x20;

```typescript
const product = await stripe.products.retrieve( productId , {
        expand: ['default_price']
    })
```

O uso de `expand: ['data.default_price']` é uma maneira eficiente de obter informações detalhadas sobre os preços dos produtos ao mesmo tempo em que se lista os produtos, evitando a necessidade de fazer chamadas adicionais à API para recuperar esses detalhes separadamente. Isso é particularmente útil quando você precisa de informações específicas e detalhadas sobre os produtos em uma única solicitação.



A função `retrieve` é então utilizada para obter informações detalhadas sobre esse produto específico.



E iremos retornar de dentro das porps nosso produto, os valores necessários e as formatações.

```typescript
export const getStaticProps: GetStaticProps<any, {id: string} > = async ({params}: any) => {
    const productId = params.id 
    const product = await stripe.products.retrieve( productId , {
        expand: ['default_price']
    })

    const price = product.default_price as Stripe.Price
    return {
        props: {
            product: {
                id: product.id,
                name: product.name,
                imageUrl: product.images[0],
                description: product.description,
                price : new Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                }).format(price.unit_amount ? price.unit_amount / 100 : 0 ),
                defaultPriceId: price.id,
            },
        },
        revalidate: 60 * 60 * 1 // 1 hora
    }
}
```

Então devemos configurar nosso `getStaticPaths` se estivermos usando a função statica eapós isso basta passa passarmos nossa props que é retornada no paramêtro do nosso componente por meio de desestruturação e mapear e acessar suas infromações.

***

## <mark style="color:blue;">getStaticPaths</mark>

`getStaticPaths` é um método essencial no Next.js que nos permite definir quais páginas devem ser geradas estaticamente. Esse método torna-se crucial quando lidamos com páginas que dependem de parâmetros dinâmicos. Ele se torna obrigatório quando implementamos a opção `fallback: true`.

Quando temos páginas que precisam ser geradas dinamicamente com base em parâmetros específicos, como IDs, o `getStaticPaths` entra em cena. Este método é responsável por indicar ao Next.js quais valores possíveis esses parâmetros podem ter, permitindo assim a pré-geração dessas páginas estáticas.

A obrigatoriedade do uso de `getStaticPaths` ao empregar `fallback: true` está relacionada ao comportamento de fallback dinâmico. Com essa configuração, o Next.js permite a criação de páginas estáticas para os caminhos especificados, enquanto também oferece a capacidade de gerar páginas sob demanda para caminhos ainda não gerados.

Em resumo, `getStaticPaths` é uma peça-chave para a geração estática de páginas dinâmicas, especialmente quando optamos pelo fallback dinâmico para melhorar o desempenho e a flexibilidade na construção de aplicações com o Next.js.

Exemplo :&#x20;

<pre class="language-tsx"><code class="lang-tsx"><strong>export const getStaticPaths: GetStaticPaths = async () => {
</strong>    return {
        paths: [
            {params: {id: 'prod_P5zzsuYncdTQA3'}}
        ],
        fallback: true,
    }
}

</code></pre>

paths :  Ou Retornamos um array vazio, ou retornamos um array com os parâmetros que queremos gerar de forma estática, geralmente os mais acesados.

fallback: true : se o usuário acessar uma página que não foi gerada no build, o next vai gerar a página no momento do acesso

***

## <mark style="color:blue;">Formatando o Preço</mark>

Tudo que eu colocar dentro dop `getStaticProps` será executa apenas 1 vez dentro do tempo determinado, isso economiza memória para situações que não preciso atualizar a todo momento.

Fromtação de preço dentro do `getStaticProps`&#x20;

```tsx
export const getStaticProps: GetStaticProps<any, {id: string} > = async ({params}: any) => {
    const productId = params.id 

    // retrieve é um método do stripe que retorna um produto, no caso o produto que tem o id passado como parâmetro
    const product = await stripe.products.retrieve( productId , {
        expand: ['default_price']
    })

    const price = product.default_price as Stripe.Price

    // captando os valores do produto e retornando para a página
    return {
        props: {
            product: {
                id: product.id,
                name: product.name,
                imageUrl: product.images[0],
                description: product.description,
                price : new Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                }).format(price.unit_amount ? price.unit_amount / 100 : 0 )
            }
        },
        revalidate: 60 * 60 * 1 // 1 hora
    }
}
```
