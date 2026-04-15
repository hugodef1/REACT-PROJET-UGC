export const UGC_CINEMAS = [
  {
    id: 1, name: 'UGC Ciné Cité Les Halles', city: 'Paris',
    address: '7 place de la Rotonde, 75001 Paris',
    phone: '0892 700 000', screens: 27, lat: 48.8627, lng: 2.3470,
    services: ['IMAX', '3D', 'Dolby Atmos', 'UGC Illimité'],
  },
  {
    id: 2, name: 'UGC Ciné Cité Bercy', city: 'Paris',
    address: '2 cour Saint-Émilion, 75012 Paris',
    phone: '0892 700 000', screens: 18, lat: 48.8395, lng: 2.3797,
    services: ['IMAX', '3D', 'UGC Illimité'],
  },
  {
    id: 3, name: 'UGC Odéon', city: 'Paris',
    address: '124 boulevard Saint-Germain, 75006 Paris',
    phone: '0892 700 000', screens: 6, lat: 48.8527, lng: 2.3377,
    services: ['3D', 'UGC Illimité'],
  },
  {
    id: 4, name: 'UGC Ciné Cité Rosny', city: 'Rosny-sous-Bois',
    address: 'Centre Commercial Rosny 2, 93110 Rosny-sous-Bois',
    phone: '0892 700 000', screens: 25, lat: 48.8728, lng: 2.4876,
    services: ['IMAX', '3D', 'Dolby Atmos', 'UGC Illimité'],
  },
  {
    id: 5, name: 'UGC Ciné Cité Vélizy', city: 'Vélizy-Villacoublay',
    address: 'CC Vélizy 2, 78140 Vélizy-Villacoublay',
    phone: '0892 700 000', screens: 24, lat: 48.7836, lng: 2.1773,
    services: ['IMAX', '3D', 'UGC Illimité'],
  },
  {
    id: 6, name: 'UGC Ciné Cité Lyon Part-Dieu', city: 'Lyon',
    address: 'Centre Commercial Part-Dieu, 69003 Lyon',
    phone: '0892 700 000', screens: 12, lat: 45.7608, lng: 4.8600,
    services: ['IMAX', '3D', 'UGC Illimité'],
  },
  {
    id: 7, name: 'UGC Ciné Cité Confluence', city: 'Lyon',
    address: 'Centre Commercial Confluence, 69002 Lyon',
    phone: '0892 700 000', screens: 11, lat: 45.7434, lng: 4.8176,
    services: ['3D', 'UGC Illimité'],
  },
  {
    id: 8, name: 'UGC Ciné Cité Marseille', city: 'Marseille',
    address: 'Centre Commercial Grand Littoral, 13015 Marseille',
    phone: '0892 700 000', screens: 16, lat: 43.3624, lng: 5.3400,
    services: ['IMAX', '3D', 'UGC Illimité'],
  },
  {
    id: 9, name: 'UGC Ciné Cité Bordeaux', city: 'Bordeaux',
    address: 'Centre Commercial Mériadeck, 33000 Bordeaux',
    phone: '0892 700 000', screens: 13, lat: 44.8378, lng: -0.5792,
    services: ['3D', 'UGC Illimité'],
  },
  {
    id: 10, name: 'UGC Ciné Cité Strasbourg', city: 'Strasbourg',
    address: 'Place des Halles, 67000 Strasbourg',
    phone: '0892 700 000', screens: 9, lat: 48.5734, lng: 7.7521,
    services: ['3D', 'UGC Illimité'],
  },
  {
    id: 11, name: 'UGC Ciné Cité Lille', city: 'Lille',
    address: 'Euralille, 59777 Lille',
    phone: '0892 700 000', screens: 14, lat: 50.6292, lng: 3.0573,
    services: ['IMAX', '3D', 'UGC Illimité'],
  },
  {
    id: 12, name: 'UGC Ciné Cité Toulouse', city: 'Toulouse',
    address: 'Centre Commercial Labège Innopole, 31670 Labège',
    phone: '0892 700 000', screens: 20, lat: 43.5516, lng: 1.5281,
    services: ['IMAX', '3D', 'UGC Illimité'],
  },
];

export const SNACKS = [
  { id: 's1', name: 'Coca-Cola', category: 'boissons', price: 5.50, emoji: '🥤' },
  { id: 's2', name: 'Eau minérale', category: 'boissons', price: 3.50, emoji: '💧' },
  { id: 's3', name: 'Jus d\'orange', category: 'boissons', price: 4.50, emoji: '🍊' },
  { id: 's4', name: 'Bière', category: 'boissons', price: 6.50, emoji: '🍺' },
  { id: 's5', name: 'Popcorn sucré', category: 'friandises', price: 7.00, emoji: '🍿' },
  { id: 's6', name: 'Popcorn salé', category: 'friandises', price: 7.00, emoji: '🍿' },
  { id: 's7', name: 'Nachos', category: 'friandises', price: 8.00, emoji: '🫔' },
  { id: 's8', name: 'Bonbons Haribo', category: 'friandises', price: 4.00, emoji: '🍬' },
  { id: 's9', name: 'Chocolat M&M\'s', category: 'friandises', price: 4.50, emoji: '🍫' },
  { id: 's10', name: 'Hot-dog', category: 'repas', price: 6.50, emoji: '🌭' },
];

export const TICKET_TYPES = [
  { id: 't1', label: 'Normal', price: 13.90 },
  { id: 't2', label: 'Réduit', price: 11.10 },
  { id: 't3', label: 'UGC Illimité', price: 0 },
  { id: 't4', label: 'Moins de 14 ans', price: 8.90 },
];

export const SHOWTIMES = ['10h00', '12h15', '14h30', '16h45', '19h00', '21h15', '23h30'];

export const generateSeats = () => {
  const rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
  const seats = [];
  rows.forEach((row, ri) => {
    const count = ri < 3 ? 8 : ri < 7 ? 10 : 12;
    for (let i = 1; i <= count; i++) {
      seats.push({
        id: `${row}${i}`,
        row,
        num: i,
        taken: Math.random() < 0.35,
        type: ri < 2 ? 'normal' : ri >= 8 ? 'premium' : 'normal',
      });
    }
  });
  return seats;
};
