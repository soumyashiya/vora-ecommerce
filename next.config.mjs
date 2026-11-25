/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  devIndicators: false,
  async redirects() {
    return [
      // The catalogue moved from /shop to /products so it sits above the
      // /products/[slug] detail pages. Keep the old path working for any
      // existing inbound links.
      { source: "/shop", destination: "/products", permanent: true },
    ];
  },
  images: {
    // WebP only: AVIF encoding is many times slower, so every first view of
    // an image size waited on the encoder. WebP is nearly as small.
    formats: ["image/webp"],
    // Optimised files are reused for 30 days instead of being re-encoded.
    minimumCacheTTL: 2592000,
    // Next 16 requires every `quality` passed to <Image> to be declared here.
    // 40 is for images that ship blurred as decoration and are never read.
    qualities: [40, 75, 90, 95],
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "plus.unsplash.com" },
      { protocol: "https", hostname: "alluvi.bz" },
    ],
  },
};

export default nextConfig;
