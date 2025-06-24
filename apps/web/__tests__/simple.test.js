describe('Simple Test', () => {
  test('should work', () => {
    expect(1 + 1).toBe(2);
  });

  test('should handle environment variables', () => {
    const env = process.env.NODE_ENV || 'development';
    expect(env).toBeDefined();
  });
}); 