/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
}

module.exports = {
  ...nextConfig, // Incorporando a configuração do Next.js

  // Configuração para o Next.js entender que as imagens estão em um servidor externo
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'files.stripe.com',
        port: '', // Porta vazia indica porta padrão
      },
    ],
  },
};

