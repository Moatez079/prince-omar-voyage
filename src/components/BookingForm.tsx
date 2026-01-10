import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useLanguage } from '@/contexts/LanguageContext';
import { cruiseData } from '@/data/cruiseData';
import { Calendar, Users, Ship, CreditCard } from 'lucide-react';
import { z } from 'zod';

const bookingSchema = z.object({
  guest_name: z.string().trim().min(2, 'Name must be at least 2 characters').max(100),
  guest_email: z.string().trim().email('Invalid email address').max(255),
  guest_phone: z.string().trim().min(8, 'Phone must be at least 8 characters').max(20),
  guest_country: z.string().optional(),
  special_requests: z.string().max(1000).optional(),
});

interface BookingFormProps {
  cruiseType?: 'luxor-aswan' | 'aswan-luxor';
  trigger?: React.ReactNode;
}

const BookingForm = ({ cruiseType: initialCruiseType, trigger }: BookingFormProps) => {
  const { t, language } = useLanguage();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    cruise_type: initialCruiseType || 'luxor-aswan' as 'luxor-aswan' | 'aswan-luxor',
    cabin_type: 'double' as 'double' | 'single' | 'triple',
    check_in_date: '',
    adults: 2,
    children: 0,
    guest_name: '',
    guest_email: '',
    guest_phone: '',
    guest_country: '',
    special_requests: '',
  });

  const selectedCruise = cruiseData[formData.cruise_type];
  const pricing = selectedCruise.pricing;

  const calculateTotal = () => {
    const cabinPrice = pricing[formData.cabin_type];
    const childPrice = pricing.child;
    return (cabinPrice * formData.adults) + (childPrice * formData.children);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const validatedData = bookingSchema.parse({
        guest_name: formData.guest_name,
        guest_email: formData.guest_email,
        guest_phone: formData.guest_phone,
        guest_country: formData.guest_country,
        special_requests: formData.special_requests,
      });

      setLoading(true);

      const { error } = await supabase.from('bookings').insert({
        cruise_type: formData.cruise_type,
        cabin_type: formData.cabin_type,
        check_in_date: formData.check_in_date,
        adults: formData.adults,
        children: formData.children,
        guest_name: validatedData.guest_name,
        guest_email: validatedData.guest_email,
        guest_phone: validatedData.guest_phone,
        guest_country: validatedData.guest_country || null,
        special_requests: validatedData.special_requests || null,
        total_price: calculateTotal(),
      });

      if (error) throw error;

      // Send WhatsApp notification
      const message = `🚢 New Booking Request!
      
Cruise: ${selectedCruise.title}
Cabin: ${formData.cabin_type.charAt(0).toUpperCase() + formData.cabin_type.slice(1)}
Date: ${formData.check_in_date}
Guests: ${formData.adults} Adults, ${formData.children} Children
Total: $${calculateTotal()}

Guest: ${validatedData.guest_name}
Email: ${validatedData.guest_email}
Phone: ${validatedData.guest_phone}
Country: ${validatedData.guest_country || 'Not specified'}

Special Requests: ${validatedData.special_requests || 'None'}`;

      window.open(`https://wa.me/201023723245?text=${encodeURIComponent(message)}`, '_blank');

      toast({
        title: language === 'ar' ? 'تم إرسال الحجز!' : 'Booking Submitted!',
        description: language === 'ar' ? 'سنتواصل معك قريباً' : 'We will contact you soon to confirm.',
      });

      setOpen(false);
      setFormData({
        ...formData,
        guest_name: '',
        guest_email: '',
        guest_phone: '',
        guest_country: '',
        special_requests: '',
      });
    } catch (error: any) {
      if (error instanceof z.ZodError) {
        toast({
          title: 'Validation Error',
          description: error.errors[0].message,
          variant: 'destructive',
        });
      } else {
        toast({
          title: 'Error',
          description: error.message || 'Something went wrong',
          variant: 'destructive',
        });
      }
    } finally {
      setLoading(false);
    }
  };

  // Get next available dates based on cruise type
  const getNextDates = () => {
    const dates = [];
    const today = new Date();
    const targetDay = formData.cruise_type === 'luxor-aswan' ? 1 : 5; // Monday or Friday

    for (let i = 0; i < 12; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + ((targetDay - today.getDay() + 7) % 7) + (i * 7));
      if (date > today) {
        dates.push(date.toISOString().split('T')[0]);
      }
    }
    return dates;
  };

  const availableDates = getNextDates();

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button className="bg-accent hover:bg-accent/90 text-accent-foreground">
            {language === 'ar' ? 'احجز الآن' : 'Book Now'}
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-display text-2xl">
            {language === 'ar' ? 'احجز رحلتك' : 'Book Your Cruise'}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 mt-4">
          {/* Cruise Selection */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                <Ship className="w-4 h-4 inline me-2" />
                {language === 'ar' ? 'اختر الرحلة' : 'Select Cruise'}
              </label>
              <Select
                value={formData.cruise_type}
                onValueChange={(value: 'luxor-aswan' | 'aswan-luxor') => 
                  setFormData({ ...formData, cruise_type: value, check_in_date: '' })
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="luxor-aswan">
                    {language === 'ar' ? 'الأقصر إلى أسوان' : 'Luxor to Aswan'} (4 {language === 'ar' ? 'ليالٍ' : 'Nights'})
                  </SelectItem>
                  <SelectItem value="aswan-luxor">
                    {language === 'ar' ? 'أسوان إلى الأقصر' : 'Aswan to Luxor'} (3 {language === 'ar' ? 'ليالٍ' : 'Nights'})
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                <Calendar className="w-4 h-4 inline me-2" />
                {language === 'ar' ? 'تاريخ المغادرة' : 'Departure Date'}
              </label>
              <Select
                value={formData.check_in_date}
                onValueChange={(value) => setFormData({ ...formData, check_in_date: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder={language === 'ar' ? 'اختر التاريخ' : 'Select date'} />
                </SelectTrigger>
                <SelectContent>
                  {availableDates.map((date) => (
                    <SelectItem key={date} value={date}>
                      {new Date(date).toLocaleDateString('en-US', { 
                        weekday: 'long', 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Cabin & Guests */}
          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                {language === 'ar' ? 'نوع الكابينة' : 'Cabin Type'}
              </label>
              <Select
                value={formData.cabin_type}
                onValueChange={(value: 'double' | 'single' | 'triple') => 
                  setFormData({ ...formData, cabin_type: value })
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="double">
                    {language === 'ar' ? 'مزدوجة' : 'Double'} (${pricing.double})
                  </SelectItem>
                  <SelectItem value="single">
                    {language === 'ar' ? 'فردية' : 'Single'} (${pricing.single})
                  </SelectItem>
                  <SelectItem value="triple">
                    {language === 'ar' ? 'ثلاثية' : 'Triple'} (${pricing.triple})
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                <Users className="w-4 h-4 inline me-2" />
                {language === 'ar' ? 'البالغين' : 'Adults'}
              </label>
              <Select
                value={formData.adults.toString()}
                onValueChange={(value) => setFormData({ ...formData, adults: parseInt(value) })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {[1, 2, 3, 4, 5, 6].map((num) => (
                    <SelectItem key={num} value={num.toString()}>{num}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                {language === 'ar' ? 'الأطفال' : 'Children'} (${pricing.child})
              </label>
              <Select
                value={formData.children.toString()}
                onValueChange={(value) => setFormData({ ...formData, children: parseInt(value) })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {[0, 1, 2, 3, 4].map((num) => (
                    <SelectItem key={num} value={num.toString()}>{num}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Price Display */}
          <div className="bg-muted p-4 rounded-lg">
            <div className="flex items-center justify-between">
              <span className="font-medium flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-accent" />
                {language === 'ar' ? 'السعر الإجمالي' : 'Total Price'}
              </span>
              <span className="text-2xl font-display font-bold text-accent">
                ${calculateTotal()}
              </span>
            </div>
            <p className="text-sm text-muted-foreground mt-1">
              {language === 'ar' 
                ? 'يشمل الإقامة والوجبات والجولات والتحويلات'
                : 'Includes accommodation, meals, tours, and transfers'}
            </p>
          </div>

          {/* Guest Details */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                {language === 'ar' ? 'الاسم الكامل' : 'Full Name'} *
              </label>
              <Input
                required
                value={formData.guest_name}
                onChange={(e) => setFormData({ ...formData, guest_name: e.target.value })}
                placeholder={language === 'ar' ? 'أدخل اسمك' : 'Enter your name'}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                {language === 'ar' ? 'البريد الإلكتروني' : 'Email'} *
              </label>
              <Input
                type="email"
                required
                value={formData.guest_email}
                onChange={(e) => setFormData({ ...formData, guest_email: e.target.value })}
                placeholder="your@email.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                {language === 'ar' ? 'رقم الهاتف' : 'Phone Number'} *
              </label>
              <Input
                type="tel"
                required
                value={formData.guest_phone}
                onChange={(e) => setFormData({ ...formData, guest_phone: e.target.value })}
                placeholder="+1 234 567 8900"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                {language === 'ar' ? 'الدولة' : 'Country'}
              </label>
              <Input
                value={formData.guest_country}
                onChange={(e) => setFormData({ ...formData, guest_country: e.target.value })}
                placeholder={language === 'ar' ? 'دولتك' : 'Your country'}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              {language === 'ar' ? 'طلبات خاصة' : 'Special Requests'}
            </label>
            <Textarea
              value={formData.special_requests}
              onChange={(e) => setFormData({ ...formData, special_requests: e.target.value })}
              placeholder={language === 'ar' ? 'أي طلبات خاصة...' : 'Any special requests...'}
              rows={3}
            />
          </div>

          <Button 
            type="submit" 
            className="w-full bg-accent hover:bg-accent/90 text-accent-foreground text-lg py-6"
            disabled={loading || !formData.check_in_date}
          >
            {loading 
              ? (language === 'ar' ? 'جاري الإرسال...' : 'Submitting...') 
              : (language === 'ar' ? 'تأكيد الحجز' : 'Confirm Booking')}
          </Button>

          <p className="text-center text-sm text-muted-foreground">
            {language === 'ar' 
              ? 'سيتم إرسال تفاصيل الحجز عبر واتساب للتأكيد السريع'
              : 'Booking details will be sent via WhatsApp for quick confirmation'}
          </p>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default BookingForm;
