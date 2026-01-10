-- Create bookings table
CREATE TABLE public.bookings (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    cruise_type TEXT NOT NULL CHECK (cruise_type IN ('luxor-aswan', 'aswan-luxor')),
    cabin_type TEXT NOT NULL CHECK (cabin_type IN ('double', 'single', 'triple')),
    check_in_date DATE NOT NULL,
    adults INTEGER NOT NULL DEFAULT 2 CHECK (adults >= 1 AND adults <= 10),
    children INTEGER NOT NULL DEFAULT 0 CHECK (children >= 0 AND children <= 10),
    guest_name TEXT NOT NULL,
    guest_email TEXT NOT NULL,
    guest_phone TEXT NOT NULL,
    guest_country TEXT,
    special_requests TEXT,
    total_price DECIMAL(10,2),
    status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'cancelled')),
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;

-- Allow public to insert bookings (for guest bookings)
CREATE POLICY "Allow public to create bookings" 
ON public.bookings 
FOR INSERT 
WITH CHECK (true);

-- Only authenticated users can view all bookings (admin)
CREATE POLICY "Authenticated users can view all bookings" 
ON public.bookings 
FOR SELECT 
TO authenticated
USING (true);

-- Only authenticated users can update bookings (admin)
CREATE POLICY "Authenticated users can update bookings" 
ON public.bookings 
FOR UPDATE 
TO authenticated
USING (true);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_bookings_updated_at
BEFORE UPDATE ON public.bookings
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();