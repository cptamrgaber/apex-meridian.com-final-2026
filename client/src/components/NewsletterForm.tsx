import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Mail, Check, AlertCircle } from 'lucide-react';
import { trpc } from '@/lib/trpc';

interface NewsletterFormProps {
  variant?: 'inline' | 'card';
  interests?: string[];
}

export default function NewsletterForm({ variant = 'inline', interests = [] }: NewsletterFormProps) {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const subscribeMutation = trpc.newsletter.subscribe.useMutation({
    onSuccess: () => {
      setStatus('success');
      setMessage('Successfully subscribed! Check your email for confirmation.');
      setEmail('');
      setName('');
    },
    onError: (error) => {
      setStatus('error');
      setMessage(error.message || 'Failed to subscribe. Please try again.');
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      setStatus('error');
      setMessage('Please enter your email address');
      return;
    }

    subscribeMutation.mutate({
      email,
      name: name || undefined,
      interests: interests.length > 0 ? interests : undefined,
    });
  };

  if (variant === 'card') {
    return (
      <div className="bg-gradient-to-br from-slate-900/90 to-blue-900/50 backdrop-blur-sm rounded-2xl p-8 border border-cyan-500/20">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 bg-cyan-500/20 rounded-lg">
            <Mail className="w-6 h-6 text-cyan-400" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-white">Stay Updated</h3>
            <p className="text-gray-400 text-sm">Get the latest research insights and tech news</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Input
              type="text"
              placeholder="Your name (optional)"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="bg-slate-900/50 border-cyan-500/30 text-white placeholder:text-gray-500"
            />
          </div>
          
          <div>
            <Input
              type="email"
              placeholder="Your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="bg-slate-900/50 border-cyan-500/30 text-white placeholder:text-gray-500"
            />
          </div>

          <Button
            type="submit"
            disabled={subscribeMutation.isPending}
            className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600"
          >
            {subscribeMutation.isPending ? 'Subscribing...' : 'Subscribe'}
          </Button>
        </form>

        {status === 'success' && (
          <div className="mt-4 p-3 bg-green-500/20 border border-green-500/30 rounded-lg flex items-start gap-2">
            <Check className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
            <p className="text-green-400 text-sm">{message}</p>
          </div>
        )}

        {status === 'error' && (
          <div className="mt-4 p-3 bg-red-500/20 border border-red-500/30 rounded-lg flex items-start gap-2">
            <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
            <p className="text-red-400 text-sm">{message}</p>
          </div>
        )}

        <p className="text-gray-500 text-xs mt-4">
          By subscribing, you agree to receive monthly research updates and technology news. Unsubscribe anytime.
        </p>
      </div>
    );
  }

  // Inline variant
  return (
    <div className="w-full">
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
        <Input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="flex-1 bg-slate-900/50 border-cyan-500/30 text-white placeholder:text-gray-500"
        />
        
        <Button
          type="submit"
          disabled={subscribeMutation.isPending}
          className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 whitespace-nowrap"
        >
          {subscribeMutation.isPending ? 'Subscribing...' : 'Subscribe'}
        </Button>
      </form>

      {status === 'success' && (
        <div className="mt-3 p-2 bg-green-500/20 border border-green-500/30 rounded flex items-center gap-2">
          <Check className="w-4 h-4 text-green-400" />
          <p className="text-green-400 text-sm">{message}</p>
        </div>
      )}

      {status === 'error' && (
        <div className="mt-3 p-2 bg-red-500/20 border border-red-500/30 rounded flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-red-400" />
          <p className="text-red-400 text-sm">{message}</p>
        </div>
      )}
    </div>
  );
}
