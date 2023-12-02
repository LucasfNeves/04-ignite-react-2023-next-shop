import { stripe } from "@/src/lib/stripe";
import { DetailsFallback, ImageContainer, ImageFallback, ProductContainer, ProductDetails } from "@/src/styles/pages/product";
import axios from "axios";
import { GetStaticPaths, GetStaticProps } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import Stripe from "stripe";

interface ProductProps {
    product: {
        id: string;
        name: string;
        imageUrl: string;
        description: string;
        price: string;
        defaultPriceId: string;
    }
}

export default function Product({product}: ProductProps) {
    const {isFallback} = useRouter()
    const [isCreatingCheckoutSesion, setIsCreatingCheckoutSesion] = useState(false)

    async function handleBuyProduct() {
        console.log(product.defaultPriceId)
        try {
            setIsCreatingCheckoutSesion(true)
            const response = await axios.post('/api/checkout', {
                priceId: product.defaultPriceId,
                name: product.name,
            })
            const { checkoutUrl } = response.data

            // redirecionando o usuário para a página de checkout externa
            window.location.href = checkoutUrl

        } catch (error) {
            // Conectar com alguma ferramenta de observabilidade (DataDog, Sentry, etc)
            alert('Erro ao processar o pagamento')
        } finally {
            setIsCreatingCheckoutSesion(false)
        }
      }

    if(isFallback) {
        return (
        <ProductContainer>
            <ImageFallback>
            </ImageFallback>
            <DetailsFallback>
                <h1></h1>
                <span></span>

                <p></p>
                <button></button>
            </DetailsFallback>
        </ProductContainer>
        )
    }

    return (
        <ProductContainer>
            <ImageContainer>
            <Image src={product.imageUrl} width={520} height={480} alt={product.name}/>
            </ImageContainer>
            <ProductDetails>
                <h1>{product.name}</h1>
                <span>{product.price}</span>

                <p>{product.description}</p>
                <button disabled={isCreatingCheckoutSesion} onClick={handleBuyProduct}>Comprar agora</button>
            </ProductDetails>
        </ProductContainer>
    )
}

// getStaticPaths é um método que permite que a gente defina quais páginas queremos gerar de forma estática
export const getStaticPaths: GetStaticPaths = async () => {
    return {
        paths: [
            {params: {id: 'prod_P5zzsuYncdTQA3'}}
        ],
        fallback: true,
    }
}

// 
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
                }).format(price.unit_amount ? price.unit_amount / 100 : 0 ),
                defaultPriceId: price.id,
            },
        },
        revalidate: 60 * 60 * 1 // 1 hora
    }
}