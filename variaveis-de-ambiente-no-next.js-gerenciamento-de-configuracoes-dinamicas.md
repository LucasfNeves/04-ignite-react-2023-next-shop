---
description: Como configurar variáveis de hambiente
---

# Variáveis de Ambiente no Next.js - Gerenciamento de Configurações Dinâmicas

> No desenvolvimento de aplicações Next.js, as variáveis de ambiente desempenham um papel crucial ao permitir que valores se ajustem conforme o ambiente de execução. Em outras palavras, essas variáveis possibilitam que certos parâmetros, como chaves de API ou URLs, sejam adaptados automaticamente dependendo se a aplicação está em ambiente de desenvolvimento ou produção.

## <mark style="color:blue;">Por que Variáveis de Ambiente?</mark>

Ao desenvolver, é comum definir configurações específicas para o ambiente local. Por exemplo, uma URL de API durante o desenvolvimento pode ser diferente da URL utilizada em produção. As variáveis de ambiente oferecem uma maneira flexível de lidar com essas distinções, simplificando a transição entre diferentes cenários.

## <mark style="color:blue;">Segurança e Confidencialidade:</mark>

É vital manter certas informações, como chaves de API, confidenciais. Para garantir isso, evitamos incluir essas variáveis diretamente no código-fonte e, especialmente, evitamos enviá-las para repositórios públicos, como o GitHub. Em vez disso, armazenamos essas configurações em arquivos dedicados, como o `.env`, que permanecem fora do controle de versão.

#### Como Definir Variáveis de Ambiente:

1.  <mark style="background-color:blue;">**Criação do Arquivo  .env:**</mark>

    No diretório raiz do projeto, criamos um arquivo chamado `.env`.

Exemplo de configuração:

```typescript
NEXT_PUBLIC_API_URL=https://api.exemplo.com
NEXT_PUBLIC_API_KEY=sua_chave_api
```

2. <mark style="background-color:blue;">**Acesso no Código:**</mark>

As variáveis de ambiente são acessadas no código usando `process.env`.

Por exemplo:

```typescript
const apiUrl = process.env.NEXT_PUBLIC_API_URL;
const apiKey = process.env.NEXT_PUBLIC_API_KEY;
```

3. <mark style="background-color:blue;">**Proteção no GitHub:**</mark>

Para evitar expor informações sensíveis, adicionamos o arquivo `.env` ao arquivo `.gitignore`, impedindo que ele seja enviado para o GitHub.



***

## <mark style="color:blue;">Utilização em Diferentes Ambientes:</mark>

Ao implantar a aplicação, garantimos que as variáveis de ambiente estejam configuradas adequadamente para cada ambiente (desenvolvimento, produção, etc.). Plataformas de hospedagem geralmente oferecem meios para gerenciar essas configurações de maneira segura.

Em resumo, o uso cuidadoso de variáveis de ambiente no Next.js não apenas melhora a segurança, mas também simplifica a manutenção, permitindo que sua aplicação se adapte dinamicamente aos requisitos específicos de cada ambiente.
