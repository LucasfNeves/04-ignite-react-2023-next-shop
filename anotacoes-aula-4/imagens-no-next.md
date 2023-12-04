# Imagens no Next

### <mark style="color:blue;">Carregamento Otimizado de Imagens</mark>

O Next.js oferece otimizações automáticas para o carregamento de imagens. Ele ajusta a qualidade e o formato com base no dispositivo do usuário, melhorando o desempenho da página.

### <mark style="color:blue;">Imagens Responsivas</mark>

Com suporte a imagens responsivas, o Next.js permite fornecer várias versões para diferentes tamanhos de tela, garantindo consistência em dispositivos móveis e desktops.

### <mark style="color:blue;">Carregamento Sob Demanda (Lazy Loading)</mark>

Facilitando o carregamento sob demanda, o Next.js carrega imagens quando prestes a aparecer na tela, melhorando a eficiência de carregamento.

### <mark style="color:blue;">Geração Estática e Server-Side Rendering (SSR)</mark>

Suportando geração estática e SSR, o Next.js otimiza imagens durante a construção da aplicação, resultando em tempos de carregamento mais rápidos.

### <mark style="color:blue;">API de Imagens</mark>

O framework oferece uma API de imagens para manipulação no lado do servidor, útil para redimensionamento, recorte e conversão de formatos antes de serem servidas aos clientes.

### <mark style="color:blue;">Tratamento Automático de Formatos de Imagem</mark>

O Next.js converte e otimiza automaticamente imagens para formatos eficientes, como WebP, com base no suporte do navegador do usuário.

Ao aproveitar esses recursos, o Next.js simplifica a implementação e otimização de imagens, proporcionando uma melhor experiência para os usuários em termos de desempenho e eficiência.

***

## <mark style="color:blue;">Usando o componente Image do Next.js</mark>

Para utilizar o componente `Image` do Next.js, é necessário importá-lo. Recomenda-se sempre fornecer altura e largura da imagem. Estilizações CSS podem ser adicionadas ao componente normalmente, pois ele responde como a tag `<img>` do HTML.

Exemplo:

<pre class="language-tsx"><code class="lang-tsx">import Image from "next/image"
<strong>import Camiseta2 from "../assets/2.png"
</strong>
&#x3C;Image src={Camiseta2} width={520} height={480} alt="Camiseta 2" />
</code></pre>
