---
description: Como iniciar um projeto Next
---

# Iniciando no Next

Criar Projeto Next :

```bash
npx create-next-app@latest
```

***

## <mark style="color:blue;">Instruções iniciais</mark>

1. Todo arquivo de página para ser renderizado deve estar dentro da pasta pages.
2. O arquivo index dentro da pasta pages page sempre será a Home, isto é, sempre será a página a ser renderizada quand acessamos o endereço na primeira rota
3. Quando tentamos acessar alguma rota que não foi criada na nossa aplicação o Next retorna o erro 404.

***

## <mark style="color:blue;">Rotas do Next</mark>

<mark style="color:purple;">**File-system-router**</mark> <mark style="color:purple;"></mark><mark style="color:purple;">(Roteamente baseado em aquivos físicos)</mark>

Se eu quiser criar uma página que seja acessada quando o usuário colocar `/nomeArquivo` na URL basta eu criar esse arquivo na pasta pages. Dentro do arquivo devemos criar uma function com `export default` :

Exemplo :

```ts
export default function Product() {
    return (
        <div>
            <h1>Product</h1>
        </div>
    )
}
```

Isso quer dizer que todo arquivo criado dentro da pasta pages ele vira automaticamente uma rota pública



***

## <mark style="color:blue;">**Subpastas**</mark> <mark style="color:blue;"></mark><mark style="color:blue;">:</mark>

Dentro da pasta page eu posso criar subpastas exemplo `products` dentro dessa subpasta o arquivo principal será o arquivo chamado `index` (Arquivo a ser mostrado quando acessarmos `/product` na URL), e os demais arquivo serão acessados passando `/product/nomeAequivo`

Feita isso eu parametizar os nomes dos meus arquivos usando `[]` exemplo `[id].tsx` após isso quando digitarmos qualquer coisas após `/product/qualquerCoisa` o que foi digitado será nosso id e no nossa arquivo podemos captar esse valor, é direcionar para uma página específica

```ts
import {useRouter} from 'next/router'

export default function Product () {

	const { query } = useRouter ()

	return (
		<h1> Product : {JSON.stringify(query)} </h1>
	)
}
```

No código acima estamos usando um hook do Next `useRouter` e captando o valor dizitado na URL com a propriedade `query` após isso estamos tranformando ela em string e imprimindo na tela dentro da tag H1

Eu posso ter quando níveis de pastas dentro de pastas eu quiser, podemos criar estruturas de páginas bem complexas usando o sistema de File-system-router
