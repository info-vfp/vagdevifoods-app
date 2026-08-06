export interface SuryaSku {
  key: 'pink' | 'black';
  tag: string;
  name: string;
  short: string;
  variety: string;
  bg: string;
  ink: string;
  accent: string;
  img: string;
  pitch: string;
  specs: { k: string; v: string }[];
}

export const SURYA_SKUS: SuryaSku[] = [
  {
    key: 'pink', tag: 'Best-seller · North', name: 'Surya Pink', short: 'Pink', variety: 'JSR · Lachkari Kolam',
    bg: 'linear-gradient(158deg,#E4187C 0%,#B00E5C 55%,#7C0740 100%)', ink: '#96094D', accent: '#FFC9E2',
    img: 'images/products/surya/pack_pink_jsr.webp',
    pitch: 'The everyday cooker rice. Cooks fluffy and separate, never gluey — the grain that holds up in pulao, jeera rice and a plain dal-chawal night.',
    specs: [
      { k: 'Grain', v: 'Medium, slender' },
      { k: 'Texture', v: 'Fluffy, separate' },
      { k: 'Best for', v: 'Pulao · daily meals' },
      { k: 'Packs', v: '10 · 26 · 30 kg' },
    ],
  },
  {
    key: 'black', tag: 'Best-seller · South', name: 'Surya Black', short: 'Black', variety: 'HMT · Ponni type, boiled',
    bg: 'linear-gradient(158deg,#3A3A3A 0%,#1E1E1E 55%,#0D0D0D 100%)', ink: '#1A1A1A', accent: '#D8D8D8',
    img: 'images/products/surya/pack_black_hmt.webp',
    pitch: 'Boiled rice for kitchens where rice is the meal, not the side. Soft, light and easy to digest — the one that goes with sambar, rasam and curd rice.',
    specs: [
      { k: 'Grain', v: 'Short, fine' },
      { k: 'Texture', v: 'Soft, light' },
      { k: 'Best for', v: 'Sambar · curd rice' },
      { k: 'Packs', v: '10 · 26 · 30 kg' },
    ],
  },
];

export interface CookMethod {
  key: 'cooker' | 'open' | 'cooker_e' | 'biryani';
  label: string;
  title: string;
  blurb: string;
  dials: { k: string; v: string }[];
  pack: string;
  steps: { n: string; t: string; d: string }[];
}

export const COOK_METHODS: CookMethod[] = [
  {
    key: 'cooker', label: 'Pressure cooker', title: 'Pressure cooker',
    blurb: 'The everyday north-Indian default. Works for both packs; black needs one extra whistle.',
    dials: [{ k: 'Rice : water', v: '1 : 1¾' }, { k: 'Whistles', v: '3' }, { k: 'Rest', v: '5 min' }],
    pack: 'Pink JSR · Black HMT',
    steps: [
      { n: '01', t: 'Rinse twice, not five times', d: 'Two changes of water is enough to clear loose starch. Over-rinsing washes off the surface layer that gives Surya its aroma.' },
      { n: '02', t: 'Soak 20 minutes', d: 'Cuts cooking time and helps every grain swell evenly rather than splitting at the ends.' },
      { n: '03', t: 'Three whistles, medium flame', d: 'Add 1¾ cups water per cup of rice. Switch off at the third whistle — the residual pressure finishes the job.' },
      { n: '04', t: 'Rest before you open', d: 'Five minutes with the lid on. Fluff with a fork, never a spoon, so the grains stay whole.' },
    ],
  },
  {
    key: 'open', label: 'Open pot', title: 'Open pot',
    blurb: 'How boiled rice is cooked across the south — drain the starch and the grains stay separate.',
    dials: [{ k: 'Rice : water', v: '1 : 4' }, { k: 'Boil', v: '12–14 min' }, { k: 'Drain', v: 'Yes' }],
    pack: 'Black HMT · boiled',
    steps: [
      { n: '01', t: 'Bring water to a rolling boil first', d: 'Rice goes into boiling water, not cold. Four parts water per part rice gives it room to move.' },
      { n: '02', t: 'Boil uncovered, 12 to 14 minutes', d: 'Test at twelve: the grain should crush between two fingers with a faint firmness in the middle.' },
      { n: '03', t: 'Drain the starch water', d: 'Tip into a colander. Keep the kanji — it is the best thing to drink with a hot meal.' },
      { n: '04', t: 'Steam-dry for two minutes', d: 'Return to the empty pot off the heat, lid ajar. The surface moisture leaves and the grains separate.' },
    ],
  },
  {
    key: 'cooker_e', label: 'Rice cooker', title: 'Rice cooker',
    blurb: 'For hostel rooms and small kitchens. Set it and forget it — the ratio does the work.',
    dials: [{ k: 'Rice : water', v: '1 : 1½' }, { k: 'Cycle', v: 'Auto' }, { k: 'Rest', v: '10 min' }],
    pack: 'Pink JSR',
    steps: [
      { n: '01', t: 'Rinse in the inner pot itself', d: 'Two rinses, then level the rice with your palm so it cooks evenly across the base.' },
      { n: '02', t: 'One and a half parts water', d: 'Less than a cooker needs — a rice cooker loses almost no steam, so extra water turns it sticky.' },
      { n: '03', t: 'Let it switch to keep-warm', d: 'Do not lift the lid mid-cycle. The cooker knows when the water is gone.' },
      { n: '04', t: 'Ten minutes on keep-warm', d: 'This is the step everyone skips. It finishes the centre of the grain.' },
    ],
  },
  {
    key: 'biryani', label: 'Biryani & pulao', title: 'Biryani & pulao',
    blurb: 'JSR holds its shape under layering and dum better than a long-grain basmati at twice the price.',
    dials: [{ k: 'Cook to', v: '70%' }, { k: 'Soak', v: '30 min' }, { k: 'Dum', v: '15 min' }],
    pack: 'Pink JSR',
    steps: [
      { n: '01', t: 'Soak a full 30 minutes', d: 'Longer soak, shorter boil. The grain elongates instead of breaking when you layer it.' },
      { n: '02', t: 'Par-boil to seventy percent', d: 'In salted water with a bay leaf and cloves. The grain should still resist at the core.' },
      { n: '03', t: 'Layer while hot, seal the pot', d: 'Rice over masala, saffron milk and fried onion on top. Seal with dough or a tight lid and a weight.' },
      { n: '04', t: 'Dum on the lowest flame, 15 minutes', d: 'Use a tawa under the pot. Rest another ten minutes before you open it at the table.' },
    ],
  },
];

export interface SuryaColour {
  name: string;
  hex: string;
  variety: string;
  d: string;
  sizes: string;
}

export const SURYA_COLOURS: SuryaColour[] = [
  { name: 'Pink', hex: '#D6197B', variety: 'JSR Lachkari Kolam', d: 'The flagship. Our highest-volume pack, strongest across the northern markets.', sizes: '10 · 26 · 30 kg' },
  { name: 'Black', hex: '#141414', variety: 'HMT boiled', d: 'Equal in volume to pink. The boiled-rice pack that moves through the south.', sizes: '10 · 26 · 30 kg' },
  { name: 'Dark green', hex: '#12603A', variety: 'JSR steam', d: 'A steam-milled JSR for buyers who want the same grain without the boil.', sizes: '26 · 30 kg' },
  { name: 'Parrot green', hex: '#3FA935', variety: 'JSR steam', d: 'A second steam line kept for dealers who run two grades side by side.', sizes: '26 · 30 kg' },
  { name: 'Orange', hex: '#EE7A1E', variety: 'JSR', d: 'A regional favourite with a loyal pocket of kirana shops behind it.', sizes: '26 · 30 kg' },
  { name: 'Red', hex: '#C81E28', variety: 'JSR', d: 'Distinct on a crowded shelf, and easy for a repeat customer to point at.', sizes: '26 · 30 kg' },
  { name: 'Blue', hex: '#1B4F9C', variety: 'JSR', d: 'Runs in specific dealer territories where blue is the known Surya bag.', sizes: '26 · 30 kg' },
  { name: 'Silver', hex: '#B9BEC4', variety: 'JSR premium', d: 'The top of the range — the cleanest mill run of the season.', sizes: '26 · 30 kg' },
];

export interface SuryaBuyer {
  who: string;
  t: string;
  d: string;
  cta: string;
  waMessage: string;
}

export const SURYA_BUYERS: SuryaBuyer[] = [
  {
    who: 'Home kitchens', t: 'A 26 kg bag that lasts the month',
    d: 'The size most families buy. Ask your kirana shop for Surya by colour, or message us and we will name the nearest stockist.',
    cta: 'Find a shop near me',
    waMessage: "Hello, where can I buy Vagdevi's Surya rice?\n• My city / area: \n• Pink or Black: ",
  },
  {
    who: 'Chefs & cloud kitchens', t: 'Consistency across a hundred covers',
    d: 'Same variety, same mill, same lot behaviour — so your rice does not change character between one delivery and the next.',
    cta: 'Request a sample',
    waMessage: "Hello, I run a kitchen and would like a Surya rice sample.\n• Restaurant / kitchen: \n• City: \n• Monthly requirement: ",
  },
  {
    who: 'Dealers & distributors', t: 'Margins on a bag that repeats',
    d: 'Eight colours, three pack sizes, and a mill that answers the phone. Territory-wise supply from Miryalaguda.',
    cta: 'Talk about stocking',
    waMessage: "Hello, I'd like to become a Surya dealer.\n• City / territory: \n• Existing business: \n• Monthly volume: ",
  },
];

export const SURYA_TICKER = [
  'Love in every bite', 'JSR Lachkari Kolam', 'HMT boiled', '₹75 per kg',
  'Milled in Miryalaguda', 'ISO 22000:2018', 'Eight pack colours', 'Six states',
];
