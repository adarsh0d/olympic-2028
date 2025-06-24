import nextConfig from '../next.config.mjs';

describe('Next.js Configuration', () => {
  it('should have transpilePackages configured', () => {
    expect(nextConfig.transpilePackages).toContain('@workspace/ui');
  });

  it('should have rewrites function', () => {
    expect(typeof nextConfig.rewrites).toBe('function');
  });

  it('should return correct rewrite rules', async () => {
    const rewrites = await nextConfig.rewrites();
    
    expect(Array.isArray(rewrites)).toBe(true);
    expect(rewrites).toHaveLength(2);
    
    // Check static assets rewrite
    const staticAssetsRewrite = rewrites.find(rewrite => 
      rewrite.source === '/medals/_next/:path*'
    );
    expect(staticAssetsRewrite).toBeDefined();
    expect(staticAssetsRewrite.destination).toBe('http://localhost:3001/medals/_next/:path*');
    
    // Check general medals routes rewrite
    const medalsRewrite = rewrites.find(rewrite => 
      rewrite.source === '/medals/:path*'
    );
    expect(medalsRewrite).toBeDefined();
    expect(medalsRewrite.destination).toBe('http://localhost:3001/medals/:path*');
  });

  it('should handle static assets correctly', async () => {
    const rewrites = await nextConfig.rewrites();
    const staticAssetsRewrite = rewrites.find(rewrite => 
      rewrite.source === '/medals/_next/:path*'
    );
    
    expect(staticAssetsRewrite).toBeDefined();
    expect(staticAssetsRewrite.destination).toContain('localhost:3001');
    expect(staticAssetsRewrite.destination).toContain('/medals/_next/:path*');
  });

  it('should handle all medals routes', async () => {
    const rewrites = await nextConfig.rewrites();
    const medalsRewrite = rewrites.find(rewrite => 
      rewrite.source === '/medals/:path*'
    );
    
    expect(medalsRewrite).toBeDefined();
    expect(medalsRewrite.destination).toContain('localhost:3001');
    expect(medalsRewrite.destination).toContain('/medals/:path*');
  });
}); 