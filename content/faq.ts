/**
 * The questions buyers, dealers and farmers actually ask, answered in one place.
 *
 * Rendered on the home page and emitted as FAQPage structured data from the same array, so
 * the markup can never claim an answer the page does not show. Every answer restates facts
 * published elsewhere on the site — nothing here is new information — and the numbers come
 * from constants.ts, so a changed price or phone number cannot leave a stale answer behind.
 *
 * Why it exists: search and AI answer engines quote short, self-contained answers to direct
 * questions. Each answer is written to stand alone — it names the company, the place and the
 * figure, rather than relying on the question for context.
 */
import {
  COMPANY_CONTACT_PHONE, COMPANY_CONTACT_EMAIL, FARMER_PAYMENTS_PHONE_FORMATTED, CERTIFICATIONS,
  IEC_NUMBER, STATES_SERVED, SURYA_PRICES, inr,
} from '../constants';

export interface FaqItem {
  q: string;
  a: string;
}

const [iso, fssai, apeda] = CERTIFICATIONS;

const listStates = (states: string[]) => `${states.slice(0, -1).join(', ')} and ${states[states.length - 1]}`;

export const FAQ_ITEMS: FaqItem[] = [
  {
    q: 'Where is the Vagdevi Food Products rice mill?',
    a: 'The mill is at Sy. Nos. 328–333, Vijayawada Road, Yadgarpally, Miryalaguda, Nalgonda district, Telangana 508207 — inside the Nagarjuna Sagar command area, the rice bowl of Telangana. The registered office is at Jain Sadguru Capital Park, Madhapur, Hyderabad.',
  },
  {
    q: 'Which rice varieties does Vagdevi Food Products mill?',
    a: 'Three varieties, each available as steam rice or double boiled rice: JSR (Lachkari Kolam), HMT (Sona Masoori, Ponni type) and RNR (Telangana Sona). The mill also sells rice bran, broken rice (fine and coarse) and husk.',
  },
  {
    q: 'What pack sizes are available?',
    a: '10 kg, 26 kg and 30 kg packs in woven PP or jute, plus 50 kg bags for bulk consignments on request. Every pack carries a lot number that ties it back to a milling date and a lab report.',
  },
  {
    q: 'Do you pack rice under a private label?',
    a: 'Yes. Vagdevi Food Products prints your artwork on 10, 26, 30 and 50 kg bags, on the same lines that pack its own Surya and Dwaraka brands.',
  },
  {
    q: 'Is the mill certified?',
    a: `Yes. ${iso.name} (certificate ${iso.number}, valid to ${iso.validTo}), ${fssai.name} ${fssai.number} (valid to ${fssai.validTo}) and ${apeda.name} ${apeda.number} as a Manufacturer Exporter of rice (valid to ${apeda.validTo}). The Import Export Code is ${IEC_NUMBER}.`,
  },
  {
    q: 'Does Vagdevi Food Products export rice?',
    a: `Yes. The company is registered with APEDA as a Manufacturer Exporter of rice (RCMC ${apeda.number}) and supplies importers, wholesalers and private-label brands. Moisture, whiteness, broken ratio and grain length are checked in-house, and a signed lab report goes with every lot.`,
  },
  {
    q: 'Which states do you supply?',
    a: `${listStates(STATES_SERVED)}, dispatched from Miryalaguda with the Vijayawada highway and the Miryalaguda railhead at the door.`,
  },
  {
    q: 'How much does Surya rice cost?',
    a: `Surya rice costs ${inr(SURYA_PRICES.bag26)} for a 26 kg bag and ${inr(SURYA_PRICES.bag30)} for a 30 kg bag — about ${inr(SURYA_PRICES.perKg)} per kg. The pink pack is JSR Lachkari Kolam; the black pack is HMT boiled rice.`,
  },
  {
    q: 'How do I get a bulk rice quote?',
    a: `WhatsApp or call the sales desk on ${COMPANY_CONTACT_PHONE}, Monday to Saturday, 9 am to 6 pm IST, with the variety, quantity and delivery city. The reply comes with a price, a lab report and a dispatch date. You can also email ${COMPANY_CONTACT_EMAIL}.`,
  },
  {
    q: 'Can buyers visit the mill?',
    a: 'Yes. Buyers are welcome to walk the plant at Yadgarpally before they order — message the sales desk on WhatsApp with a preferred date and it will be arranged.',
  },
  {
    q: 'How do farmers sell paddy to Vagdevi Food Products?',
    a: `Farmers bring paddy straight to the procurement hall at the mill. Weight, moisture and payment are settled on the same visit, and the money goes directly into the farmer's bank account. Bring your pattadar passbook, bank passbook and Aadhaar. For payment queries call ${FARMER_PAYMENTS_PHONE_FORMATTED}.`,
  },
];
