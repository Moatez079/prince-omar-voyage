import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Ship, Lock } from 'lucide-react';

const AdminLogin = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Check if already logged in
    const checkSession = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        // Check if user is admin
        const { data: roleData } = await supabase
          .from('user_roles')
          .select('role')
          .eq('user_id', user.id)
          .eq('role', 'admin')
          .maybeSingle();
        
        if (roleData) {
          navigate('/admin/dashboard');
        }
      }
    };
    checkSession();
  }, [navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      // Check if user has admin role
      const { data: roleData, error: roleError } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', data.user.id)
        .eq('role', 'admin')
        .maybeSingle();

      if (roleError) throw roleError;

      if (!roleData) {
        await supabase.auth.signOut();
        throw new Error('Access denied. Admin privileges required.');
      }

      toast({
        title: "Welcome back!",
        description: "You've successfully logged in.",
      });
      navigate('/admin/dashboard');
    } catch (error: any) {
      toast({
        title: "Login failed",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = async () => {
    if (!email || !password) {
      toast({
        title: "Missing fields",
        description: "Please enter email and password",
        variant: "destructive",
      });
      return;
    }

    if (password.length < 6) {
      toast({
        title: "Password too short",
        description: "Password must be at least 6 characters",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: window.location.origin,
        }
      });

      if (error) throw error;

      // Auto-assign admin role to first user
      if (data.user) {
        const { error: roleError } = await supabase
          .from('user_roles')
          .insert({ user_id: data.user.id, role: 'admin' });

        if (roleError) {
          console.error('Error assigning admin role:', roleError);
        }
      }

      toast({
        title: "Account created!",
        description: "You can now log in with your credentials.",
      });
    } catch (error: any) {
      toast({
        title: "Sign up failed",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-primary flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Ship className="w-10 h-10 text-accent" />
            <span className="font-display text-3xl font-bold text-primary-foreground">
              Prince <span className="text-accent">Omar</span>
            </span>
          </div>
          <h1 className="font-display text-2xl font-bold text-primary-foreground">Admin Dashboard</h1>
          <p className="text-primary-foreground/70 mt-2">Sign in to access analytics</p>
        </div>

        <form onSubmit={handleLogin} className="bg-card p-8 rounded-2xl shadow-luxury">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Email</label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@princeomarcruise.com"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Password</label>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                minLength={6}
              />
            </div>
          </div>

          <div className="mt-6 space-y-3">
            <Button type="submit" className="w-full bg-accent hover:bg-accent/90" disabled={loading}>
              <Lock className="w-4 h-4 mr-2" />
              {loading ? 'Signing in...' : 'Sign In'}
            </Button>
            <Button 
              type="button" 
              variant="outline" 
              className="w-full"
              onClick={handleSignUp}
              disabled={loading}
            >
              Create Admin Account
            </Button>
          </div>
        </form>

        <p className="text-center text-primary-foreground/50 text-sm mt-4">
          Only authorized administrators can access this dashboard
        </p>
      </div>
    </div>
  );
};

export default AdminLogin;
