import { Html, Head, Main, NextScript } from "next/document"
import { getCssText } from "../styles"

export default function Document () {
    return (
        <Html> 
            <Head>
                <link rel="preconnect" href="https://fonts.googleapis.com"/>
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin = "anonymous"/>
                <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap" rel="stylesheet"/>
                < style id="stitches" dangerouslySetInnerHTML={{__html: getCssText()}}/> 
                {/* getCssText vai pegar o css gerado pelo stitches e injetar no html assim a aplicação vai ter acesso ao css gerado pelo stitches mesmo que o javascript esteja desabilitado. */}
            </Head>
            <body> 
                <Main/> {/* Onde vai ser renderizado o conteúdo da página */}
                <NextScript/> {/* Onde vai ser renderizado os scripts da página */}
            </body>
        </Html>
    )
}

/* 
    * Toda vez que eu modifico o _document.tsx, eu preciso reiniciar o servidor para que as modificações sejam aplicadas.
    * Pois o _document.tsx é carregado apenas uma vez, quando a aplicação é iniciada.
    * No document qualquer código e importação de biblioteca que eu colocar aqui, vai ser carregado em toda a aplicação.
    * Por isso devemos mater ele o mais simples possível.
*/ 