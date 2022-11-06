/** @type {import('next').NextConfig} */

const FLOWS_MICROSERVICE_URL = process.env.FLOWS_MICROSERVICE_URL;

module.exports = () => {
  const rewrites = () => {
    return [
      {
        source: "/api/flows",
        destination: `${FLOWS_MICROSERVICE_URL}/flows`,
      },
      {
        source: "/api/flows/:id",
        destination: `${FLOWS_MICROSERVICE_URL}/flows/:id`,
      },
    ];
  };
  return {
    reactStrictMode: false,
    swcMinify: true,
    rewrites
  };
};
