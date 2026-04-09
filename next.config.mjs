/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/cannabis',
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
}

export default nextConfig
