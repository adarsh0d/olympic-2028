const { getCurrentEnvironment, getMedalsAppUrl, getEnvironmentConfig } = require('../config/environments');

describe('Environment Configuration', () => {
  const originalEnv = process.env;

  beforeEach(() => {
    jest.resetModules();
    process.env = { ...originalEnv };
  });

  afterAll(() => {
    process.env = originalEnv;
  });

  test('should return development environment by default', () => {
    delete process.env.NODE_ENV;
    delete process.env.NEXT_PUBLIC_ENV;
    
    const env = getCurrentEnvironment();
    expect(env.name).toBe('Development');
    expect(env.medalsAppUrl).toBe('http://localhost:3001');
  });

  test('should use NEXT_PUBLIC_ENV when available', () => {
    process.env.NEXT_PUBLIC_ENV = 'staging';
    
    const env = getCurrentEnvironment();
    expect(env.name).toBe('Staging');
    expect(env.medalsAppUrl).toBe('https://staging-medals.olympic2028.com');
  });

  test('should use NEXT_PUBLIC_MEDALS_APP_URL when available', () => {
    process.env.NEXT_PUBLIC_ENV = 'production';
    process.env.NEXT_PUBLIC_MEDALS_APP_URL = 'https://custom-medals-url.com';
    
    const env = getCurrentEnvironment();
    expect(env.name).toBe('Production');
    expect(env.medalsAppUrl).toBe('https://custom-medals-url.com');
  });

  test('should return correct medals app URL', () => {
    process.env.NEXT_PUBLIC_ENV = 'staging';
    
    const url = getMedalsAppUrl();
    expect(url).toBe('https://staging-medals.olympic2028.com');
  });

  test('should get specific environment config', () => {
    const env = getEnvironmentConfig('production');
    expect(env.name).toBe('Production');
    expect(env.features.enableAnalytics).toBe(true);
  });
}); 