import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';

export const useVisitorTracking = () => {
  const location = useLocation();

  useEffect(() => {
    const trackVisit = async () => {
      try {
        // Get geolocation data from IP
        let country = null;
        let countryCode = null;
        let city = null;

        try {
          const geoResponse = await fetch('https://ipapi.co/json/');
          if (geoResponse.ok) {
            const geoData = await geoResponse.json();
            country = geoData.country_name;
            countryCode = geoData.country_code;
            city = geoData.city;
          }
        } catch (geoError) {
          console.log('Could not fetch geolocation');
        }

        await supabase.from('visits').insert({
          page_path: location.pathname,
          country,
          country_code: countryCode,
          city,
          user_agent: navigator.userAgent,
          referrer: document.referrer || null,
        });
      } catch (error) {
        console.error('Error tracking visit:', error);
      }
    };

    trackVisit();
  }, [location.pathname]);
};
