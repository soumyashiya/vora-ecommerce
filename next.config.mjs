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
    // Without this Next only ever emits WebP. AVIF is offered first and the
    // browser falls back to WebP on its own via content negotiation, so older
    // clients are unaffected.
    formats: ["image/avif", "image/webp"],
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
