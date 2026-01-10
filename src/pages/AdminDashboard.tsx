import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Users, 
  Globe, 
  Eye, 
  LogOut, 
  Ship, 
  TrendingUp,
  Calendar,
  MapPin
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

interface Visit {
  id: string;
  page_path: string;
  country: string | null;
  country_code: string | null;
  city: string | null;
  created_at: string;
}

interface CountryData {
  country: string;
  visits: number;
  percentage: number;
}

const COLORS = ['#C9A227', '#1a365d', '#2d4a6e', '#3d5a80', '#5c7a99', '#7b9ab8'];

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [visits, setVisits] = useState<Visit[]>([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    checkAuth();
    fetchVisits();
  }, []);

  const checkAuth = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      navigate('/admin');
      return;
    }
    setUser(user);
  };

  const fetchVisits = async () => {
    try {
      const { data, error } = await supabase
        .from('visits')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setVisits(data || []);
    } catch (error) {
      console.error('Error fetching visits:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/admin');
  };

  // Analytics calculations
  const totalVisits = visits.length;
  
  const countryStats: CountryData[] = Object.entries(
    visits.reduce((acc: Record<string, number>, visit) => {
      const country = visit.country || 'Unknown';
      acc[country] = (acc[country] || 0) + 1;
      return acc;
    }, {})
  )
    .map(([country, visits]) => ({
      country,
      visits: visits as number,
      percentage: Math.round(((visits as number) / totalVisits) * 100),
    }))
    .sort((a, b) => b.visits - a.visits)
    .slice(0, 10);

  const pageStats = Object.entries(
    visits.reduce((acc: Record<string, number>, visit) => {
      acc[visit.page_path] = (acc[visit.page_path] || 0) + 1;
      return acc;
    }, {})
  )
    .map(([page, count]) => ({ page, visits: count as number }))
    .sort((a, b) => b.visits - a.visits);

  // Daily visits for the last 7 days
  const last7Days = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - i);
    return date.toISOString().split('T')[0];
  }).reverse();

  const dailyVisits = last7Days.map(date => ({
    date: new Date(date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }),
    visits: visits.filter(v => v.created_at.split('T')[0] === date).length,
  }));

  const uniqueCountries = new Set(visits.map(v => v.country).filter(Boolean)).size;

  if (loading) {
    return (
      <div className="min-h-screen bg-muted flex items-center justify-center">
        <div className="text-center">
          <Ship className="w-12 h-12 text-accent animate-pulse mx-auto mb-4" />
          <p className="text-muted-foreground">Loading analytics...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted">
      {/* Header */}
      <header className="bg-primary shadow-lg">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Ship className="w-8 h-8 text-accent" />
            <span className="font-display text-xl font-bold text-primary-foreground">
              Prince Omar <span className="text-accent">Analytics</span>
            </span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-primary-foreground/70 text-sm hidden sm:block">
              {user?.email}
            </span>
            <Button 
              variant="outline" 
              size="sm"
              className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10"
              onClick={handleLogout}
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      {/* Dashboard Content */}
      <main className="container mx-auto px-6 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Visits</CardTitle>
              <Eye className="w-5 h-5 text-accent" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-foreground">{totalVisits}</div>
              <p className="text-xs text-muted-foreground mt-1">All time page views</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Countries</CardTitle>
              <Globe className="w-5 h-5 text-accent" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-foreground">{uniqueCountries}</div>
              <p className="text-xs text-muted-foreground mt-1">Unique countries reached</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Today's Visits</CardTitle>
              <TrendingUp className="w-5 h-5 text-accent" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-foreground">
                {visits.filter(v => v.created_at.split('T')[0] === new Date().toISOString().split('T')[0]).length}
              </div>
              <p className="text-xs text-muted-foreground mt-1">Page views today</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">This Week</CardTitle>
              <Calendar className="w-5 h-5 text-accent" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-foreground">
                {dailyVisits.reduce((sum, d) => sum + d.visits, 0)}
              </div>
              <p className="text-xs text-muted-foreground mt-1">Last 7 days visits</p>
            </CardContent>
          </Card>
        </div>

        {/* Charts */}
        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          {/* Daily Visits Chart */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-display">Daily Visits (Last 7 Days)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={dailyVisits}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="date" tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
                    <YAxis tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
                    <Tooltip 
                      contentStyle={{ 
                        background: 'hsl(var(--card))', 
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px'
                      }} 
                    />
                    <Bar dataKey="visits" fill="hsl(var(--accent))" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Country Distribution */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-display">Visitors by Country</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64 flex items-center">
                {countryStats.length > 0 ? (
                  <>
                    <div className="w-1/2 h-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={countryStats.slice(0, 6)}
                            cx="50%"
                            cy="50%"
                            innerRadius={40}
                            outerRadius={80}
                            dataKey="visits"
                            nameKey="country"
                          >
                            {countryStats.slice(0, 6).map((_, index) => (
                              <Cell key={index} fill={COLORS[index % COLORS.length]} />
                            ))}
                          </Pie>
                          <Tooltip />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                    <div className="w-1/2 space-y-2">
                      {countryStats.slice(0, 6).map((country, index) => (
                        <div key={country.country} className="flex items-center gap-2 text-sm">
                          <div 
                            className="w-3 h-3 rounded-full" 
                            style={{ backgroundColor: COLORS[index % COLORS.length] }}
                          />
                          <span className="flex-1 truncate text-foreground">{country.country}</span>
                          <span className="text-muted-foreground">{country.percentage}%</span>
                        </div>
                      ))}
                    </div>
                  </>
                ) : (
                  <div className="w-full text-center text-muted-foreground">
                    No country data available
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tables */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Top Countries */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-display flex items-center gap-2">
                <Globe className="w-5 h-5 text-accent" />
                Top Countries
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {countryStats.slice(0, 10).map((country, index) => (
                  <div key={country.country} className="flex items-center gap-4">
                    <span className="text-muted-foreground text-sm w-6">{index + 1}</span>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-medium text-foreground">{country.country}</span>
                        <span className="text-sm text-muted-foreground">{country.visits} visits</span>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-accent rounded-full transition-all"
                          style={{ width: `${country.percentage}%` }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
                {countryStats.length === 0 && (
                  <p className="text-muted-foreground text-center py-8">No visits recorded yet</p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Page Views */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-display flex items-center gap-2">
                <MapPin className="w-5 h-5 text-accent" />
                Page Views
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {pageStats.map((page, index) => (
                  <div key={page.page} className="flex items-center gap-4">
                    <span className="text-muted-foreground text-sm w-6">{index + 1}</span>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-medium text-foreground">
                          {page.page === '/' ? 'Home' : page.page.replace('/', '').charAt(0).toUpperCase() + page.page.slice(2)}
                        </span>
                        <span className="text-sm text-muted-foreground">{page.visits} views</span>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-primary rounded-full transition-all"
                          style={{ width: `${(page.visits / totalVisits) * 100}%` }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Visits */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="text-lg font-display flex items-center gap-2">
              <Users className="w-5 h-5 text-accent" />
              Recent Visits
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Time</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Page</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Country</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">City</th>
                  </tr>
                </thead>
                <tbody>
                  {visits.slice(0, 20).map((visit) => (
                    <tr key={visit.id} className="border-b border-border hover:bg-muted/50">
                      <td className="py-3 px-4 text-sm text-foreground">
                        {new Date(visit.created_at).toLocaleString()}
                      </td>
                      <td className="py-3 px-4 text-sm text-foreground">
                        {visit.page_path === '/' ? 'Home' : visit.page_path}
                      </td>
                      <td className="py-3 px-4 text-sm text-foreground">
                        {visit.country || 'Unknown'}
                      </td>
                      <td className="py-3 px-4 text-sm text-muted-foreground">
                        {visit.city || '-'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {visits.length === 0 && (
                <p className="text-muted-foreground text-center py-8">No visits recorded yet</p>
              )}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default AdminDashboard;
