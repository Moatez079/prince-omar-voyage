-- Create table for tracking website visits
CREATE TABLE public.visits (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    page_path TEXT NOT NULL DEFAULT '/',
    country TEXT,
    country_code TEXT,
    city TEXT,
    user_agent TEXT,
    referrer TEXT,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS but allow public inserts (for anonymous tracking)
ALTER TABLE public.visits ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert visits (anonymous tracking)
CREATE POLICY "Allow anonymous visit tracking" 
ON public.visits 
FOR INSERT 
WITH CHECK (true);

-- Only authenticated admins can view visits (we'll add admin role later)
CREATE POLICY "Only authenticated users can view visits" 
ON public.visits 
FOR SELECT 
TO authenticated
USING (true);