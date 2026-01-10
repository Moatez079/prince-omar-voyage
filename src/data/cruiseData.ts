export const cruiseData = {
  'luxor-aswan': {
    id: 'luxor-aswan',
    title: 'Luxor to Aswan',
    titleAr: 'الأقصر إلى أسوان',
    duration: { nights: 4, days: 5 },
    departure: 'Every Monday',
    departureAr: 'كل يوم اثنين',
    pricing: {
      double: 480,
      single: 720,
      triple: 460,
      child: 240,
    },
    itinerary: [
      {
        day: 1,
        title: 'Arrival & Check-in',
        location: 'Luxor',
        dayName: 'Monday',
        activities: [
          { time: 'Arrival', title: 'Check-in on the Boat', description: 'Airport pickup and assistance with check-in procedures', icon: 'ship' },
          { time: '12:30', title: 'Lunch on Board', description: 'Buffet with Egyptian and international cuisine', icon: 'utensils' },
          { time: '14:00', title: 'West Bank Tour', description: 'Visit Valley of the Kings and Hatshepsut Temple with expert guide', icon: 'landmark' },
          { time: '19:00', title: 'Dinner on Board', description: 'Gourmet dinner with live music', icon: 'music' },
        ],
      },
      {
        day: 2,
        title: 'East Bank & Sailing',
        location: 'Esna',
        dayName: 'Tuesday',
        activities: [
          { time: '08:00', title: 'East Bank Tour', description: 'Explore Karnak Temple and Luxor Temple on the Nile', icon: 'landmark' },
          { time: '14:00', title: 'Sail to Edfu', description: 'Depart at 2 PM, pass through Esna Lock, head to Edfu', icon: 'ship' },
          { time: '13:00 & 19:00', title: 'Lunch & Dinner on Board', description: 'Enjoy meals during peaceful sailing', icon: 'utensils' },
        ],
      },
      {
        day: 3,
        title: 'Edfu & Kom Ombo',
        location: 'Edfu & Kom Ombo',
        dayName: 'Wednesday',
        activities: [
          { time: '07:00', title: 'Breakfast on Board', description: 'Full breakfast before tours', icon: 'coffee' },
          { time: '08:00', title: 'Edfu Temple Tour', description: 'Visit the magnificent Temple of Horus in excellent condition', icon: 'landmark' },
          { time: '12:00', title: 'Sail to Kom Ombo', description: 'Lunch on board, then sail to Kom Ombo', icon: 'ship' },
          { time: '16:00', title: 'Kom Ombo Temple', description: 'Explore the dual temple of Sobek and Horus', icon: 'landmark' },
          { time: '20:00', title: 'Egyptian Party', description: 'Evening celebration with traditional music, dance, and costumes', icon: 'music' },
        ],
      },
      {
        day: 4,
        title: 'Aswan & Nubian Show',
        location: 'Aswan',
        dayName: 'Thursday',
        activities: [
          { time: '08:00', title: 'Aswan Tours', description: 'Visit Philae Temple and Botanical Gardens', icon: 'landmark' },
          { time: '20:00', title: 'Nubian Show', description: 'Traditional Nubian performance with music, dance, and refreshments', icon: 'music' },
        ],
      },
      {
        day: 5,
        title: 'Check-out & Departure',
        location: 'Aswan',
        dayName: 'Friday',
        activities: [
          { time: '07:00', title: 'Breakfast on Board', description: 'Final breakfast before departure', icon: 'coffee' },
          { time: '08:00', title: 'Check-out & Transfer', description: 'Boat checkout and airport transfer', icon: 'ship' },
        ],
      },
    ],
  },
  'aswan-luxor': {
    id: 'aswan-luxor',
    title: 'Aswan to Luxor',
    titleAr: 'أسوان إلى الأقصر',
    duration: { nights: 3, days: 4 },
    departure: 'Every Friday',
    departureAr: 'كل يوم جمعة',
    pricing: {
      double: 360,
      single: 540,
      triple: 345,
      child: 180,
    },
    itinerary: [
      {
        day: 1,
        title: 'Arrival & Check-in',
        location: 'Aswan',
        dayName: 'Friday',
        activities: [
          { time: 'Arrival', title: 'Check-in on the Boat', description: 'Airport pickup and assistance with check-in procedures', icon: 'ship' },
          { time: '12:30', title: 'Lunch on Board', description: 'Buffet with Egyptian and international cuisine', icon: 'utensils' },
          { time: '14:00', title: 'Aswan Tours', description: 'Visit Philae Temple and Botanical Gardens', icon: 'landmark' },
          { time: '19:00', title: 'Dinner on Board', description: 'Gourmet dinner with live music', icon: 'music' },
        ],
      },
      {
        day: 2,
        title: 'Aswan & Kom Ombo',
        location: 'Aswan',
        dayName: 'Saturday',
        activities: [
          { time: '08:00', title: 'Lunch on Board', description: 'Buffet before sailing', icon: 'utensils' },
          { time: '09:00', title: 'Additional Aswan Tours', description: 'Visit Unfinished Obelisk & High Dam', icon: 'landmark' },
          { time: '14:00', title: 'Sail to Kom Ombo', description: 'Depart at 2 PM, navigate to Kom Ombo', icon: 'ship' },
          { time: '17:00', title: 'Kom Ombo Temple', description: 'Explore the dual temple of Sobek and Horus', icon: 'landmark' },
          { time: '20:00', title: 'Egyptian Party', description: 'Evening celebration with traditional music, dance, and costumes', icon: 'music' },
        ],
      },
      {
        day: 3,
        title: 'Edfu & Luxor',
        location: 'Esna',
        dayName: 'Sunday',
        activities: [
          { time: '07:00', title: 'Breakfast on Board', description: 'Full breakfast before tours', icon: 'coffee' },
          { time: '08:00', title: 'Edfu Temple Tour', description: 'Visit the magnificent Temple of Horus in excellent condition', icon: 'landmark' },
          { time: '12:00', title: 'Sail to Luxor', description: 'Lunch on board, sail to Luxor, pass through Esna Lock', icon: 'ship' },
          { time: '20:00', title: 'Oriental Dance Show', description: 'Traditional belly dance performance after dinner', icon: 'music' },
        ],
      },
      {
        day: 4,
        title: 'Check-out & Departure',
        location: 'Luxor',
        dayName: 'Monday',
        activities: [
          { time: '07:00', title: 'Breakfast on Board', description: 'Final breakfast before departure', icon: 'coffee' },
          { time: '08:00', title: 'Check-out & Transfer', description: 'Boat checkout and airport transfer', icon: 'ship' },
        ],
      },
    ],
  },
};

export const whatsIncludedItems = [
  { icon: 'bed', title: 'Accommodation', description: 'Luxury cabin with Nile view' },
  { icon: 'utensils', title: 'Meals', description: 'Breakfast, lunch, dinner buffet daily' },
  { icon: 'map', title: 'Tours', description: 'All temple visits with expert guide' },
  { icon: 'car', title: 'Transfers', description: 'Airport pickup and return' },
  { icon: 'music', title: 'Entertainment', description: 'Egyptian party & oriental show' },
  { icon: 'camera', title: 'Videography', description: 'Professional videos & photos' },
];
