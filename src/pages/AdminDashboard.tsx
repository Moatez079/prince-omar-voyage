import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { 
  Users, 
  Globe, 
  Eye, 
  LogOut, 
  Ship, 
  TrendingUp,
  Calendar,
  MapPin,
  CreditCard,
  CheckCircle,
  XCircle,
  Clock
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

interface Booking {
  id: string;
  cruise_type: string;
  cabin_type: string;
  check_in_date: string;
  adults: number;
  children: number;
  guest_name: string;
  guest_email: string;
  guest_phone: string;
  guest_country: string | null;
  special_requests: string | null;
  total_price: number;
  status: 'pending' | 'confirmed' | 'cancelled';
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
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    checkAuth();
    fetchData();
  }, []);

  const checkAuth = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      navigate('/admin');
      return;
    }
    setUser(user);
  };

  const fetchData = async () => {
    try {
      const [visitsRes, bookingsRes] = await Promise.all([
        supabase.from('visits').select('*').order('created_at', { ascending: false }),
        supabase.from('bookings').select('*').order('created_at', { ascending: false }),
      ]);

      if (visitsRes.error) throw visitsRes.error;
      if (bookingsRes.error) throw bookingsRes.error;

      setVisits(visitsRes.data || []);
      setBookings((bookingsRes.data || []) as Booking[]);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateBookingStatus = async (id: string, status: 'confirmed' | 'cancelled') => {
    try {
      const { error } = await supabase
        .from('bookings')
        .update({ status })
        .eq('id', id);

      if (error) throw error;

      setBookings(bookings.map(b => b.id === id ? { ...b, status } : b));
    } catch (error) {
      console.error('Error updating booking:', error);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/admin');
  };

  // Analytics calculations
  const totalVisits = visits.length;
  const totalBookings = bookings.length;
  const pendingBookings = bookings.filter(b => b.status === 'pending').length;
  const confirmedBookings = bookings.filter(b => b.status === 'confirmed').length;
  const totalRevenue = bookings.filter(b => b.status === 'confirmed').reduce((sum, b) => sum + (b.total_price || 0), 0);
  
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

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'confirmed':
        return <Badge className="bg-green-500">Confirmed</Badge>;
      case 'cancelled':
        return <Badge variant="destructive">Cancelled</Badge>;
      default:
        return <Badge variant="secondary">Pending</Badge>;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-muted flex items-center justify-center">
        <div className="text-center">
          <Ship className="w-12 h-12 text-accent animate-pulse mx-auto mb-4" />
          <p className="text-muted-foreground">Loading dashboard...</p>
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
              Prince Omar <span className="text-accent">Admin</span>
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
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-xs font-medium text-muted-foreground">Total Visits</CardTitle>
              <Eye className="w-4 h-4 text-accent" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{totalVisits}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-xs font-medium text-muted-foreground">Countries</CardTitle>
              <Globe className="w-4 h-4 text-accent" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{uniqueCountries}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-xs font-medium text-muted-foreground">Bookings</CardTitle>
              <Ship className="w-4 h-4 text-accent" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{totalBookings}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-xs font-medium text-muted-foreground">Pending</CardTitle>
              <Clock className="w-4 h-4 text-yellow-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-500">{pendingBookings}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-xs font-medium text-muted-foreground">Confirmed</CardTitle>
              <CheckCircle className="w-4 h-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-500">{confirmedBookings}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-xs font-medium text-muted-foreground">Revenue</CardTitle>
              <CreditCard className="w-4 h-4 text-accent" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-accent">${totalRevenue}</div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="bookings" className="space-y-6">
          <TabsList>
            <TabsTrigger value="bookings">Bookings</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          {/* Bookings Tab */}
          <TabsContent value="bookings">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-display flex items-center gap-2">
                  <Ship className="w-5 h-5 text-accent" />
                  All Bookings
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left py-3 px-2 text-xs font-medium text-muted-foreground">Date</th>
                        <th className="text-left py-3 px-2 text-xs font-medium text-muted-foreground">Guest</th>
                        <th className="text-left py-3 px-2 text-xs font-medium text-muted-foreground">Cruise</th>
                        <th className="text-left py-3 px-2 text-xs font-medium text-muted-foreground">Check-in</th>
                        <th className="text-left py-3 px-2 text-xs font-medium text-muted-foreground">Cabin</th>
                        <th className="text-left py-3 px-2 text-xs font-medium text-muted-foreground">Guests</th>
                        <th className="text-left py-3 px-2 text-xs font-medium text-muted-foreground">Total</th>
                        <th className="text-left py-3 px-2 text-xs font-medium text-muted-foreground">Status</th>
                        <th className="text-left py-3 px-2 text-xs font-medium text-muted-foreground">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {bookings.map((booking) => (
                        <tr key={booking.id} className="border-b border-border hover:bg-muted/50">
                          <td className="py-3 px-2 text-xs">
                            {new Date(booking.created_at).toLocaleDateString()}
                          </td>
                          <td className="py-3 px-2">
                            <div className="text-sm font-medium">{booking.guest_name}</div>
                            <div className="text-xs text-muted-foreground">{booking.guest_email}</div>
                            <div className="text-xs text-muted-foreground">{booking.guest_phone}</div>
                          </td>
                          <td className="py-3 px-2 text-sm">
                            {booking.cruise_type === 'luxor-aswan' ? 'Luxor → Aswan' : 'Aswan → Luxor'}
                          </td>
                          <td className="py-3 px-2 text-sm">
                            {new Date(booking.check_in_date).toLocaleDateString()}
                          </td>
                          <td className="py-3 px-2 text-sm capitalize">{booking.cabin_type}</td>
                          <td className="py-3 px-2 text-sm">
                            {booking.adults}A + {booking.children}C
                          </td>
                          <td className="py-3 px-2 text-sm font-bold text-accent">
                            ${booking.total_price}
                          </td>
                          <td className="py-3 px-2">
                            {getStatusBadge(booking.status)}
                          </td>
                          <td className="py-3 px-2">
                            {booking.status === 'pending' && (
                              <div className="flex gap-1">
                                <Button
                                  size="sm"
                                  variant="outline"
                                  className="h-7 px-2 text-xs text-green-600 border-green-600"
                                  onClick={() => updateBookingStatus(booking.id, 'confirmed')}
                                >
                                  <CheckCircle className="w-3 h-3" />
                                </Button>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  className="h-7 px-2 text-xs text-red-600 border-red-600"
                                  onClick={() => updateBookingStatus(booking.id, 'cancelled')}
                                >
                                  <XCircle className="w-3 h-3" />
                                </Button>
                              </div>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {bookings.length === 0 && (
                    <p className="text-muted-foreground text-center py-8">No bookings yet</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            {/* Charts */}
            <div className="grid lg:grid-cols-2 gap-6">
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

              {/* Recent Visits */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg font-display flex items-center gap-2">
                    <Users className="w-5 h-5 text-accent" />
                    Recent Visits
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 max-h-80 overflow-y-auto">
                    {visits.slice(0, 15).map((visit) => (
                      <div key={visit.id} className="flex items-center justify-between py-2 border-b border-border">
                        <div>
                          <div className="text-sm font-medium">{visit.page_path === '/' ? 'Home' : visit.page_path}</div>
                          <div className="text-xs text-muted-foreground">
                            {visit.country || 'Unknown'} • {visit.city || '-'}
                          </div>
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {new Date(visit.created_at).toLocaleString()}
                        </div>
                      </div>
                    ))}
                    {visits.length === 0 && (
                      <p className="text-muted-foreground text-center py-8">No visits recorded yet</p>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default AdminDashboard;
