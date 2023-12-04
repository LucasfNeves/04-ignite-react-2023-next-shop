# Configurando o HTML no Next

O Next não possibilita o acesso direto ao arquivo index.html, para configuramos esse arquivo dentro da pasta pages devemos criar um arquivvo que será um componente chamado `_document.tsx` e dentro desse arquivo vamos importar tags html de dentro `next/document` e fazer nossa configuração, segue o exemplo abaixo :

```tsx
import { Html, Head, Main, NextScript } from "next/document"
export default function Document () {
    return (
        <Html>
            <Head>
                <link rel="preconnect" href="https://fonts.googleapis.com"/>
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin = "anonymous"/>
                <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap" rel="stylesheet"/>
            </Head>
            <body>
                <Main/> {/* Onde vai ser renderizado o conteúdo da página */}
                <NextScript/> {/* Onde vai ser renderizado os scripts da página */}
            </body>
        </Html>

    )

}

```

&#x20;&#x20;

{% hint style="info" %}
Toda vez que eu modifico o \_document.tsx, eu preciso reiniciar o servidor para que as modificações sejam aplicadas. Pois o \_document.tsx é carregado apenas uma vez, quando a aplicação é iniciada.
{% endhint %}

{% hint style="info" %}
No document qualquer código e importação de biblioteca que eu colocar aqui, vai ser carregado em toda a aplicação. Por isso devemos mater ele o mais simples possível.
{% endhint %}
