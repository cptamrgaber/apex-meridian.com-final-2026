import { useState } from 'react';
import { useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { Github, Mail } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useAuth } from '@/_core/hooks/useAuth';
import { getLoginUrl } from '@/const';

// OAuth provider icons
const GoogleIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24">
    <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
    <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
    <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
    <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
  </svg>
);

const MicrosoftIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24">
    <path fill="#f25022" d="M1 1h10v10H1z"/>
    <path fill="#00a4ef" d="M13 1h10v10H13z"/>
    <path fill="#7fba00" d="M1 13h10v10H1z"/>
    <path fill="#ffb900" d="M13 13h10v10H13z"/>
  </svg>
);

export default function Auth() {
  const [, setLocation] = useLocation();
  const { user, loading } = useAuth();
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');

  // Redirect if already logged in
  if (user && !loading) {
    setLocation('/');
    return null;
  }

  const handleOAuthLogin = (provider: 'google' | 'microsoft' | 'github') => {
    // Redirect to OAuth endpoint
    window.location.href = `/api/auth/${provider}`;
  };

  const handleManusLogin = () => {
    window.location.href = getLoginUrl();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900">
      <Header />
      
      <main className="container max-w-md mx-auto px-4 py-20">
        <div className="bg-slate-900/50 backdrop-blur-sm rounded-2xl border border-cyan-500/20 p-8 shadow-2xl">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">
              {authMode === 'login' ? 'Welcome Back' : 'Create Account'}
            </h1>
            <p className="text-gray-400">
              {authMode === 'login' 
                ? 'Sign in to access your account' 
                : 'Join Apex Meridian Research Network'}
            </p>
          </div>

          {/* OAuth Providers */}
          <div className="space-y-3 mb-6">
            <Button
              onClick={() => handleOAuthLogin('google')}
              variant="outline"
              className="w-full bg-white hover:bg-gray-100 text-gray-900 border-gray-300 h-12"
            >
              <GoogleIcon />
              <span className="ml-3">Continue with Google</span>
            </Button>

            <Button
              onClick={() => handleOAuthLogin('microsoft')}
              variant="outline"
              className="w-full bg-white hover:bg-gray-100 text-gray-900 border-gray-300 h-12"
            >
              <MicrosoftIcon />
              <span className="ml-3">Continue with Microsoft</span>
            </Button>

            <Button
              onClick={() => handleOAuthLogin('github')}
              variant="outline"
              className="w-full bg-slate-800 hover:bg-slate-700 text-white border-slate-600 h-12"
            >
              <Github className="w-5 h-5" />
              <span className="ml-3">Continue with GitHub</span>
            </Button>
          </div>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-700"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-slate-900/50 text-gray-400">Or</span>
            </div>
          </div>

          {/* Manus OAuth */}
          <Button
            onClick={handleManusLogin}
            className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 h-12"
          >
            <Mail className="w-5 h-5" />
            <span className="ml-3">Continue with Manus Account</span>
          </Button>

          {/* Toggle Auth Mode */}
          <div className="mt-6 text-center">
            <p className="text-gray-400 text-sm">
              {authMode === 'login' ? "Don't have an account?" : "Already have an account?"}
              {' '}
              <button
                onClick={() => setAuthMode(authMode === 'login' ? 'signup' : 'login')}
                className="text-cyan-400 hover:text-cyan-300 font-medium"
              >
                {authMode === 'login' ? 'Sign up' : 'Sign in'}
              </button>
            </p>
          </div>

          {/* Terms */}
          <p className="mt-6 text-xs text-gray-500 text-center">
            By continuing, you agree to our{' '}
            <a href="/terms" className="text-cyan-400 hover:text-cyan-300">Terms of Service</a>
            {' '}and{' '}
            <a href="/privacy" className="text-cyan-400 hover:text-cyan-300">Privacy Policy</a>
          </p>
        </div>

        {/* Benefits */}
        <div className="mt-8 space-y-3">
          <div className="flex items-start gap-3 text-gray-300">
            <div className="w-6 h-6 rounded-full bg-cyan-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-cyan-400 text-sm">✓</span>
            </div>
            <div>
              <p className="font-medium">Access Research Resources</p>
              <p className="text-sm text-gray-400">Browse publications, library, and collaborate with researchers</p>
            </div>
          </div>

          <div className="flex items-start gap-3 text-gray-300">
            <div className="w-6 h-6 rounded-full bg-cyan-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-cyan-400 text-sm">✓</span>
            </div>
            <div>
              <p className="font-medium">Personalized Experience</p>
              <p className="text-sm text-gray-400">Get recommendations based on your interests and research areas</p>
            </div>
          </div>

          <div className="flex items-start gap-3 text-gray-300">
            <div className="w-6 h-6 rounded-full bg-cyan-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-cyan-400 text-sm">✓</span>
            </div>
            <div>
              <p className="font-medium">Secure & Verified</p>
              <p className="text-sm text-gray-400">Multi-factor authentication with email, phone, and WhatsApp verification</p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
