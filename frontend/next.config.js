/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
};

module.exports = () => {
  const rewrites = () => {
    return [
      {
        source: "/api/flows",
        destination: "http://localhost:5000/flows",
      },
      {
        source: "/api/flows/:id",
        destination: "http://localhost:5000/flows/:id",
      },
    ];
  };
  return {
    rewrites
  };
};
