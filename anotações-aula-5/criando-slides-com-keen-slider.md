# Criando Slides com KEEN SLIDER

## <mark style="color:blue;">Carrossel</mark>

Para fazer o carrosel vamos fazer o uso de uma biblioteca chamada **KEEN\_SLIDER**

Instalação :

```bash
npm install keen-slider
```

Após instalar a biblioteca devemos importar o seu hook e seu import de css

exemplo

```tsx
import {useKeenSlider} from "keen-slider/react"
import "keen-slider/keen-slider.min.css"
```



Para configurar o hook, desestruturamos a propriedade que faz ref aos slides

> _refs é uma funcionalidade do React que permite que tenha uma referncia direta a um elemento na DOM._



Chamamos o hook `useKeenSlider` e passamos o objeto de configuração conforme nossa nescessidade

exemplo

```tsx
  const [sliderRef] = useKeenSlider({
    slides: {
      perView: 2,
      spacing: 48,
    }
  })
```



Após isso passamos nossa ref `sliderRef` para o container aonde vai ccontar os itens que estarão como slides, e nesse container também devemos passar a classe css `keen-slider`



Nos itens que ficarão em formato de slides (os produtos) devemos passar a classe css `keen-slider__slide`, no fim o componente configurado fica dessa forma :



exemplo

```tsx
import Image from "next/image"
import { styled } from "../styles"
import { HomeContainer, Product } from "../styles/pages/home"

import {useKeenSlider} from "keen-slider/react"
import "keen-slider/keen-slider.min.css"

import Camiseta1 from "../assets/1.png"
import Camiseta2 from "../assets/2.png"
import Camiseta3 from "../assets/3.png"

export default function MyComponent () {
  const [sliderRef] = useKeenSlider({
    slides: {
      perView: 2,
      spacing: 48,
    }
  })
  return (
    <HomeContainer ref={sliderRef} className="keen-slider">
      <Product className="keen-slider__slide">
        <Image src={Camiseta1} width={520} height={480} alt="Camiseta 1" />
        <footer>
          <strong>Camiseta 1</strong>
          <span>R$ 100,00</span>
        </footer>
      </Product >
      <Product className="keen-slider__slide">
        <Image src={Camiseta2} width={520} height={480} alt="Camiseta 2" />
        <footer>
          <strong>Camiseta 2</strong>
          <span>R$ 100,00</span>
        </footer>
      </Product>
      <Product className="keen-slider__slide">
        <Image src={Camiseta3} width={520} height={480} alt="Camiseta 2" />
        <footer>
          <strong>Camiseta 3</strong>
          <span>R$ 100,00</span>
        </footer>
      </Product>
    </HomeContainer>
  )
}
```

{% embed url="https://keen-slider.io/" %}
Documentação KEEN\_SLIDER
{% endembed %}
