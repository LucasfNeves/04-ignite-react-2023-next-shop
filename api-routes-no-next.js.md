# API Routes no Next.js

## Introdução

No Next por ele rodar um servidor Node.js isso nos permite a ter Rotas assim como em um backend.

Por exemplo: rotas que retornam que retornam dados de um banco de dados, rotas que fazem ações que um backend tradicional faria, como autenticação, lidar com banco de dados, envio de email, etc...

Por mais que não seja aconselhado para todos tipos de projetos, para alguns projetos e funcionalidades, faz sentidoa  gente ter rotas backend dentro do nosso frontend, isso se dá principalmente em casos que a gentye não tem a camada backend, não temos uma API extrena, e&#x20;

1. podemos criar algumas funcionalidades simples, como acesso ao banco, envio de email e até autenticação.
2. Ou quando temos alguma funcionalidade na nossa palicação que ela precisa executar na nosso servidor, mas ela é algo específico da web da nossa aplicação, por exemplo : autenticação com o Google, etc... Pois isso não é feito da mesma forma em outros clientes como IOS, Android, etc ...

## Criar Rotas

Na pasta <mark style="background-color:yellow;">pages</mark> criamos uma pasta chamada <mark style="background-color:yellow;">api</mark> e dentro da pasta podemos criar arquivos aonde ficarão nossas rotas como <mark style="background-color:yellow;">arquivoName.t</mark>

Então basta devolvemos uma função que recebe <mark style="background-color:yellow;">req (require) e res (response)</mark>

Exemplo :

```typescript
export default function handler (req, res) {
    return res.json( {message: 'Hello wold'} )
}
```



agora se acessamos nossa rota como por exemplo: localhost:3000/api/hello

irá ser devolvido&#x20;

```json
{
    "message" : "Hello word"
}
```

E todo código que roda dentro dessa função é um código server-side, ou seja não preciso me preocupar com dados sensíveis, posso fazer acesso ao banco, posso usar uma secret key, etc..



Por usar o TypeScript precisamos importar a tipagem do Next&#x20;

```typescript
import { NextApiRequest, NextApiResponse } from "next";

export default function handle( req: NextApiRequest, res: NextApiResponse) {
    return res.json({messahe: 'Hello World'})
}
```



Vimos nas páginas da aplicação podemos usar  getServerSideProps  para códigos que vão rodar no lado servidor na camada do node do Next, e podemos usar para dados sensíveis, api, etc..

Só que eles executam apenas no carregamento da página, no primeiro load da página, então se eu precisar executar alguma ação pelo server-side, que venha pela ação do usuário, algum click no botão ou algo do tipo eu preciso criar essa API Routes
