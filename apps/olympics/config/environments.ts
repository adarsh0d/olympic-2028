export interface EnvironmentConfig {
  name: string;
  apiBaseUrl: string;
  medalsApiUrl: string;
  flagsApiUrl: string;
  features: {
    enableSorting: boolean;
    enableFiltering: boolean;
    enablePagination: boolean;
    enableSearch: boolean;
    enableExport: boolean;
  };
  analytics: {
    enabled: boolean;
    trackingId?: string;
  };
  cache: {
    enabled: boolean;
    ttl: number; // Time to live in seconds
  };
}

export const environments: Record<string, EnvironmentConfig> = {
  development: {
    name: 'Development',
    apiBaseUrl: 'http://localhost:3001',
    medalsApiUrl: '/medals/api',
    flagsApiUrl: '/medals/api/flags',
    features: {
      enableSorting: true,
      enableFiltering: true,
      enablePagination: false,
      enableSearch: true,
      enableExport: true,
    },
    analytics: {
      enabled: false,
    },
    cache: {
      enabled: false,
      ttl: 0,
    },
  },
  staging: {
    name: 'Staging',
    apiBaseUrl: 'https://staging.olympic2028.com',
    medalsApiUrl: 'https://staging.olympic2028.com/api/medals',
    flagsApiUrl: 'https://staging.olympic2028.com/api/flags',
    features: {
      enableSorting: true,
      enableFiltering: true,
      enablePagination: true,
      enableSearch: true,
      enableExport: true,
    },
    analytics: {
      enabled: true,
      trackingId: 'staging-analytics-id',
    },
    cache: {
      enabled: true,
      ttl: 300, // 5 minutes
    },
  },
  production: {
    name: 'Production',
    apiBaseUrl: 'https://olympic2028.com',
    medalsApiUrl: 'https://olympic2028.com/api/medals',
    flagsApiUrl: 'https://olympic2028.com/api/flags',
    features: {
      enableSorting: true,
      enableFiltering: true,
      enablePagination: true,
      enableSearch: true,
      enableExport: true,
    },
    analytics: {
      enabled: true,
      trackingId: 'production-analytics-id',
    },
    cache: {
      enabled: true,
      ttl: 600, // 10 minutes
    },
  },
  test: {
    name: 'Test',
    apiBaseUrl: 'http://localhost:3001',
    medalsApiUrl: '/medals/api',
    flagsApiUrl: '/medals/api/flags',
    features: {
      enableSorting: true,
      enableFiltering: false,
      enablePagination: false,
      enableSearch: false,
      enableExport: false,
    },
    analytics: {
      enabled: false,
    },
    cache: {
      enabled: false,
      ttl: 0,
    },
  },
};

export function getCurrentEnvironment(): EnvironmentConfig {
  const env = process.env.NODE_ENV || 'development';
  return environments[env] || environments.development;
}

export function getEnvironmentConfig(env?: string): EnvironmentConfig {
  const environment = env || process.env.NODE_ENV || 'development';
  return environments[environment] || environments.development;
} 