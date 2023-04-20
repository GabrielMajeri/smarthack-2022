/** @type {import('next').NextConfig} */

const FLOWS_MICROSERVICE_URL = process.env.FLOWS_MICROSERVICE_URL;
const DOCUMENTS_MICROSERVICE_URL = process.env.DOCUMENTS_MICROSERVICE_URL;

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
      {
        source: "/api/documents",
        destination: `${DOCUMENTS_MICROSERVICE_URL}/documents`,
      },
    ];
  };
  return {
    reactStrictMode: false,
    swcMinify: true,
    rewrites,
  };
};
