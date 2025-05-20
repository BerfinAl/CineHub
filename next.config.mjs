/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "plus.unsplash.com",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "image.tmdb.org",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "randomuser.me",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "media-ist1-1.cdn.whatsapp.net",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "static.wikia.nocookie.net",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "upload.wikimedia.org",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "m.media-amazon.com",
        pathname: "**",
      },
    ],
  },
  experimental: {
    esmExternals: "loose", // <-- add this
    serverComponentsExternalPackages: ["mongoose"], // <-- and this
  },
};

export default nextConfig;
