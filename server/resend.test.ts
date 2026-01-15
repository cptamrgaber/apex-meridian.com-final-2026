import { describe, it, expect } from 'vitest';
import { Resend } from 'resend';

describe('Resend API Key Validation', () => {
  it('should have RESEND_API_KEY configured', () => {
    expect(process.env.RESEND_API_KEY).toBeDefined();
    expect(process.env.RESEND_API_KEY).toMatch(/^re_/);
  });

  it('should successfully initialize Resend client', () => {
    const resend = new Resend(process.env.RESEND_API_KEY);
    expect(resend).toBeDefined();
  });

  it('should validate API key by checking domains', async () => {
    const resend = new Resend(process.env.RESEND_API_KEY);
    
    try {
      // Try to list domains - this will fail if API key is invalid
      const { data, error } = await resend.domains.list();
      
      // If there's an error, it should not be about invalid API key
      if (error) {
        expect(error.message).not.toContain('Invalid API key');
        expect(error.message).not.toContain('Unauthorized');
      }
      
      // If successful, data should be an array (even if empty)
      if (data) {
        expect(Array.isArray(data.data)).toBe(true);
      }
    } catch (error: any) {
      // If it throws, make sure it's not an auth error
      expect(error.message).not.toContain('Invalid API key');
      expect(error.message).not.toContain('Unauthorized');
      expect(error.message).not.toContain('401');
    }
  }, 10000); // 10 second timeout for API call
});
