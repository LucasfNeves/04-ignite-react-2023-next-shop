import type { AppProps } from 'next/app'
import { globalStyles } from '../styles/global'

import LogoImage from '../assets/Logo.svg'
import { Container, Header } from '../styles/pages/app'

globalStyles()

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Container>
      <Header>
        <img src={LogoImage.src}  />
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
