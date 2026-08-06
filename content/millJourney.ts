export interface MillStageFact {
  k: string;
  v: string;
}

export interface MillStage {
  n: string;
  label: string;
  where: string;
  title: string;
  body: string;
  src: string;
  pos: string;
  facts: MillStageFact[];
}

export const MILL_STAGES: MillStage[] = [
  {
    n: '01', label: 'The gate', where: 'Weighbridge, main gate',
    title: 'A truck arrives and is weighed before anything else',
    body: "Paddy comes in from farmers in the surrounding mandals and from mandi purchases. Nothing enters the yard unweighed — gross weight is recorded at the cabin, and the same bridge weighs the truck out empty so the net is beyond dispute.",
    src: 'images/mill/weighbridge.webp', pos: 'center 60%',
    facts: [{ k: 'Recorded at', v: 'Gate cabin' }, { k: 'Weighed', v: 'In and out' }],
  },
  {
    n: '02', label: 'The sample', where: 'Intake bay',
    title: 'A probe is pushed through the load, top to bottom',
    body: 'A sampling spear draws grain from several depths of the stack, not just the surface. That composite sample is what the lab reads — so a load cannot pass by having good paddy on top.',
    src: 'images/mill/intake_sampling.webp', pos: 'center',
    facts: [{ k: 'Drawn from', v: 'Multiple depths' }, { k: 'Before', v: 'Unloading' }],
  },
  {
    n: '03', label: 'The lab', where: 'Quality control room',
    title: 'Moisture, immature grain and foreign matter, on the spot',
    body: 'The sample is weighed and read while the truck waits. Loads outside our moisture band are turned back at the gate rather than argued about later. It is the least popular room in the mill and the most important one.',
    src: 'images/mill/quality_lab.webp', pos: 'center 30%',
    facts: [{ k: 'Moisture band', v: '13–13.5%' }, { k: 'Decision', v: 'Accept / return' }],
  },
  {
    n: '04', label: 'Unloading', where: 'Intake pit',
    title: 'Gunny by gunny into the intake pit',
    body: 'Accepted loads are emptied by hand into the pit, where an elevator lifts the paddy into the plant. The lot number is assigned here and it stays with that grain until it leaves as a stitched bag.',
    src: 'images/mill/unloading.webp', pos: 'center',
    facts: [{ k: 'Lot number', v: 'Assigned here' }, { k: 'Handling', v: 'Manual tip' }],
  },
  {
    n: '05', label: 'Drying & silos', where: 'Dryers and steel silos',
    title: 'Held at a stable moisture through the whole season',
    body: 'Mechanical dryers bring paddy down to storage moisture, and MYSILO steel silos hold it there. This is why rice bought from us in April behaves like rice bought in November — the grain has not been sitting in a damp godown.',
    src: 'images/mill/mysilo.webp', pos: 'center',
    facts: [{ k: 'Storage', v: 'Steel silos' }, { k: 'Drying', v: 'Mechanical' }],
  },
  {
    n: '06', label: 'Milling', where: 'Milling house',
    title: 'Hulled, then whitened on SATAKE lines',
    body: 'The husk comes off first, then the bran, in stages rather than all at once — gentler on the grain and the reason our broken percentage stays low. Husk goes to the boiler; bran goes out for oil extraction.',
    src: 'images/mill/satake_polishers.webp', pos: 'center',
    facts: [{ k: 'Whiteners', v: 'SATAKE' }, { k: 'Stages', v: 'Multi-pass' }],
  },
  {
    n: '07', label: 'Polish & sort', where: 'Grading floor',
    title: 'Silky polished, graded, then colour sorted',
    body: 'Water-polished for finish, sieved to size, and passed through colour sorters that eject discoloured and immature grains. What comes off the end of the belt is what goes in the bag.',
    src: 'images/mill/rice_belt.webp', pos: 'center',
    facts: [{ k: 'Sorting', v: 'Optical' }, { k: 'Grading', v: 'By length' }],
  },
  {
    n: '08', label: 'Bag & dispatch', where: 'Warehouse and loading yard',
    title: 'Stitched, stacked, loaded, gone the same day',
    body: 'Filled into 10, 26, 30 or 50 kg bags — ours or your printed artwork — stitched, stacked by lot, and loaded in the yard. Paperwork is issued the same day the truck leaves.',
    src: 'images/mill/stitching_bags.webp', pos: 'center',
    facts: [{ k: 'Pack sizes', v: '10–50 kg' }, { k: 'Dispatch', v: 'Same day' }],
  },
];

export interface HomeMiniStep {
  n: string;
  t: string;
  d: string;
  src: string;
  pos: string;
}

// The Home page's condensed 6-step overview (distinct from the full 8-stage Mill Journey page).
export const HOME_MILL_STEPS: HomeMiniStep[] = [
  { n: '01', t: 'Gate sampling', d: 'A probe sample is drawn from every load before it is allowed onto the weighbridge.', src: 'images/mill/intake_sampling.webp', pos: 'center' },
  { n: '02', t: 'Moisture & grain lab', d: 'Moisture, immature grain and foreign matter are read on the spot. Out-of-band loads go back.', src: 'images/mill/quality_lab.webp', pos: 'center 30%' },
  // The source design referenced a dryers.png that was never in the asset set — using the
  // equivalent "Drying & silos" stage photo (mysilo) from the full Mill Journey instead.
  { n: '03', t: 'Drying & storage', d: 'Mechanical dryers and steel silos hold paddy at a stable moisture through the season.', src: 'images/mill/mysilo.webp', pos: 'center' },
  { n: '04', t: 'Milling & polishing', d: 'Hulling, whitening and polishing lines, with bran and husk drawn off for by-product sale.', src: 'images/mill/satake_polishers.webp', pos: 'center' },
  { n: '05', t: 'Grading & packing', d: 'Graded, colour-sorted and filled into 10, 26 and 30 kg packs — or your own printed bag.', src: 'images/mill/rice_belt.webp', pos: 'center' },
  { n: '06', t: 'Loading & dispatch', d: 'Trucks and containers load in the yard, with paperwork issued the same day.', src: 'images/mill/warehouse_yard.webp', pos: 'center 60%' },
];

export interface MachineryItem {
  tag: string;
  t: string;
  d: string;
  src: string;
  pos: string;
}

export const MILL_MACHINERY: MachineryItem[] = [
  { tag: 'Steam generation', t: 'A 14-tonne boiler, fired on our own husk', d: 'The husk taken off the paddy fuels the boiler that par-boils the next batch. Nothing is bought in to run it and nothing is dumped.', src: 'images/mill/boiler_14ton.webp', pos: 'center' },
  { tag: 'Storage', t: 'Paddy held in bulk, not in stacks', d: 'A warehouse floor built to hold season-scale volume, so we buy when the farmer is selling rather than when the market forces us to.', src: 'images/mill/paddy_mountain.webp', pos: 'center' },
  { tag: 'Quality control', t: 'Every stream on one plate', d: 'Paddy, brown rice, polished rice, broken and bran — drawn from the same lot and checked side by side before a consignment is cleared.', src: 'images/mill/grain_samples.webp', pos: 'center' },
];

export interface MosaicItem {
  src: string;
  pos: string;
  cap: string;
}

export const MILL_MOSAIC: MosaicItem[] = [
  { src: 'images/mill/paddy_inspection.webp', pos: 'center', cap: 'Paddy read by hand at the elevator, every shift' },
  { src: 'images/mill/chute_operator.webp', pos: 'center', cap: 'Flow control at the intake chute' },
  { src: 'images/mill/procurement_hall.webp', pos: 'center', cap: 'The farmer counter — weight, moisture and payment in one visit' },
  { src: 'images/mill/shift_change.webp', pos: 'center', cap: 'Shift change at the main gate' },
];
