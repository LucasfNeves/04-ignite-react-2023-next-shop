# Stitches

Biblioteca para estilização, uma alternativa ao Styled Components, tem uma forma de escrever as estilizações um pouco diferente, facilitando o desenvolvimento quando há muitas variações de estilo baseado em propriedades de um componente

Ele funciona muito bem em conjunto com o Next

instalação :

```npm
npm install @stitches/react
```

***

#### Estilização sem JavaScript

Para que nossa estilização com Stitches funcione mesmo com o JS disabilitado temos uma funcionalidade que injeta o CSS em formato de texto no HTML , basta que no arquivo `_document` passamos uma tah `<style>` om as seguintes configurações dentro do `<Header>`

```html
 < style id="stitches" dangerouslySetInnerHTML={{__html: getCssText()}}/>
```

***

#### Diferenças do stitiches para Styled Components

Para definir um tema devemos criar a pasta `styles` e dentro dela um arquivo `index.ts` esse aquivo definiremos o tema e vamos exportar por meio da desestruturação as propriedades que precisaremos usar, e quando necessário usar essas propriedades, importaremos de dentro desse arquivo `index.ts` e não diretamente do `@stitches/react`

Exemplo :

```ts
import { createStitches } from "@stitches/react";  

export const {
    styled,
    css,
    globalCss,
    keyframes,
    getCssText,
    theme,
    createTheme,
    config,
} = createStitches({
    theme: {
        colors : {
            white: '#fff',
            gray900: '#121214',
            gray800: '#202024',
            gray300: '#c4c4cc',
            gray100: '#e1e1e6',
            green500: '#00875f',
            green300: '#00b37e'
        }
    }
})
```

***

#### Estilização Global

Dentro desse arquivo de styles, também iremos criar o arquivo de estilização global `global.ts` que será aonde definiremos nossos estilos globais que posteriormente deverá ser chamado no App, pois o App compartilha informações com todos arquivos

```ts
import { globalCss } from ".";

export const globalStyles = globalCss({

    '*': {
        margin: 0,
        padding: 0,
        boxSizing: 'border-box',

    },

    body: {
        '-webkit-font-smoothing': 'antialiased',
        backgroundColor : '$gray900',
        color : '$gray100'
    },

  

    'body, input, textarea, button': {
        fontFamily: 'Roboto, sans-serif',
        fontSize: '16px',
        fontWeight: 400,
    },
})
```

Chamamos a função globalStyles e no seu paramêtro é passado um objeto de configurações que será o nossos estilos.

Observe que a importação do `globalCss` venho de dentro do nosso arquivo index, Uma difereça direta do Stitches é que ele interpreta código JavaScript então ao invés de usarmos `background-color` devemos usar `backgroundColor` em camel case.

Para aplicar os estilos globais devemos importar essa função criada de `globalStyle` dentro do nosso App, deve ficar acima do componentepara não gerar renderização desnecessária

***

#### Estilizando Components

Para estilizar nossos components das pages devemos criar uma pasta dentro de styles chamada pages e nessa página criamos nossos estilos, por exemplo `app.ts` para fazer a criação do background e do header que será compartilhado em todas as páginas.

Exemplo:

```tsx
import type { AppProps } from 'next/app'
import { globalStyles } from '../styles/global'

import LogoImage from '../assets/Logo.svg'
import { Container, Header } from '../styles/pages/app'

globalStyles()

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Container>
      <Header>
        <img src={LogoImage.src}  />
      </Header>
      <Component {...pageProps} />
    </Container>
  )
}
/*

  * O _app.tsx é o arquivo que vai ser carregado em todas as páginas da aplicação.

  * Por isso devemos colocar aqui tudo que vai ser compartilhado entre todos as páginas, funciona como o default layout.

  * O App funciona como wrapper, ele vai envolver todas as páginas da aplicação.

  * Ele carrega a página através do Component.

  * Para ativar o css global, eu preciso importar o globalStyles e chamar a função globalStyles().

 */
```

***

Para criar nosso components será muito parecido com o `styledComponet`s, mudando o fato das propriedades css serem `camelCase` e o `styled` ser uma função na qual é passado um argumento em string com o nome da tag e um objeto de configurações com as propriedades, e o `styled` deve ser importado de dentro do `styles/index`

Exemplo:

```ts
import { styled } from "..";

export const Container = styled('div', {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    justifyContent: 'center',
})

export const Header = styled('header', {
    padding: '2rem',
    width: '100%',
    maxWidth: 1100,
    margin: '0 auto',
    background: '$green500'
})
```

Para fazer uso das variáveis defina no global devemos colocar `$` antes do seu nome
