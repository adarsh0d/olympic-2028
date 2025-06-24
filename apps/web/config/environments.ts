export interface EnvironmentConfig {
  name: string;
  medalsAppUrl: string;
  features: {
    enableLanguageSwitcher: boolean;
    enableAnalytics: boolean;
    enableCache: boolean;
  };
  analytics: {
    enabled: boolean;
    trackingId?: string;
  };
}

export const environments: Record<string, EnvironmentConfig> = {
  development: {
    name: 'Development',
    medalsAppUrl: process.env.NEXT_PUBLIC_MEDALS_APP_URL || 'http://localhost:3001/medals/table',
    features: {
      enableLanguageSwitcher: true,
      enableAnalytics: false,
      enableCache: false,
    },
    analytics: {
      enabled: false,
    },
  },
  staging: {
    name: 'Staging',
    medalsAppUrl: process.env.NEXT_PUBLIC_MEDALS_APP_URL || 'https://staging-medals.olympic2028.com',
    features: {
      enableLanguageSwitcher: true,
      enableAnalytics: true,
      enableCache: true,
    },
    analytics: {
      enabled: true,
      trackingId: 'staging-analytics-id',
    },
  },
  production: {
    name: 'Production',
    medalsAppUrl: process.env.NEXT_PUBLIC_MEDALS_APP_URL || 'https://medals.olympic2028.com',
    features: {
      enableLanguageSwitcher: true,
      enableAnalytics: true,
      enableCache: true,
    },
    analytics: {
      enabled: true,
      trackingId: 'production-analytics-id',
    },
  },
  test: {
    name: 'Test',
    medalsAppUrl: process.env.NEXT_PUBLIC_MEDALS_APP_URL || 'http://localhost:3001',
    features: {
      enableLanguageSwitcher: false,
      enableAnalytics: false,
      enableCache: false,
    },
    analytics: {
      enabled: false,
    },
  },
};

export function getCurrentEnvironment(): EnvironmentConfig {
  const env = process.env.NEXT_PUBLIC_ENV || process.env.NODE_ENV || 'development';
  return environments[env] || environments.development;
}

export function getEnvironmentConfig(env?: string): EnvironmentConfig {
  const environment = env || process.env.NEXT_PUBLIC_ENV || process.env.NODE_ENV || 'development';
  return environments[environment] || environments.development;
}

export function getMedalsAppUrl(): string {
  const env = getCurrentEnvironment();
  return env.medalsAppUrl;
} 