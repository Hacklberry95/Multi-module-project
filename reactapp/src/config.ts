// src/config/config.ts
interface Config {
  apiBaseUrl: string;
}

const config: Config = {
  apiBaseUrl: 'http://localhost:8081/api', // Replace with your actual API base URL
};

export default config;
