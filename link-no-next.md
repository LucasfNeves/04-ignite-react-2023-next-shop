---
description: Uso de links para direcionamento de página, useRouter
---

# LINK no Next

## Componente \<Link> Next JS

O component `<Link>` do Next permite que a navegação seja feita de forma dinâmica

* href : rota que será acessada
* key: identificador único para cada produto
* prefetch: funcionalidade do Next que permite que a página seja pré-carregada ao hover

Exemplo:&#x20;

```tsx
<Link href={`/product/${product.id}`} key={product.id} prefetch={false} > </Link>
```

```tsx
import Link from "next/link"

  <HomeContainer ref={sliderRef} className="keen-slider">
      {products.map(product => {
        return (
          <Link href={`/product/${product.id}`} key={product.id} prefetch={false} >
            <Product className="keen-slider__slide">
              <Image src={product.imageUrl} width={520} height={480} alt={product.name} />
              <footer>
                <strong>{product.name}</strong>
                <span>{product.price}</span>
              </footer>
            </Product >
          </Link>
        )
      } )}
    </HomeContainer>
```
