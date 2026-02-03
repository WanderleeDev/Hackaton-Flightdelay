const envs = {
  API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL,
  API_BASE_URL_GITHUB: process.env.NEXT_PUBLIC_GITHUB_API,
  OPEN_ROUTER_API_KEY: process.env.OPEN_ROUTER_API_KEY,
} as const;

type Env = typeof envs;

export const getEnv = (key: keyof Env): string => {
  const value = envs[key];

  if (value === undefined) {
    throw new Error(`Environment variable ${key} is not defined`);
  }

  return value;
};

export const getApiBaseUrl = () => {
  // TODO: change this to production url (process.env.NODE_ENV === "production")
  if (process.env.NODE_ENV !== "production") {
    return getEnv("API_BASE_URL");
  }

  return "http://localhost:8080";
};
