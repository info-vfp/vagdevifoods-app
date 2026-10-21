#!/usr/bin/env node
/**
 * Writes dist/llms.txt and dist/llms-full.txt — the site, as plain Markdown, for language
 * models and AI search (ChatGPT, Perplexity, Gemini, Claude, Copilot).
 *
 * llms.txt follows the llmstxt.org format: a title, a one-paragraph summary, the key facts,
 * and a link list of the pages. llms-full.txt is the complete reference — every product,
 * specification, mill stage, cooking guide and FAQ — in one file an assistant can read in a
 * single fetch instead of crawling seven pages of layout.
 *
 * Both are generated from the same modules the pages render from (re-exported through
 * entry-server.tsx), so a changed price, licence number or phone number reaches them on the
 * next build. They used to be hand-written and had already drifted — llms.txt listed six
 * states while the site said seven.
 *
 * Runs after the SSR build.
 */
import { writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const SSR_ENTRY = path.join(ROOT, 'dist-ssr', 'entry-server.js');

const {
  ROUTES, SITE_URL, SITE_NAME, SITE_FACTS: F, MILL_STAGES, MILL_MACHINERY, SURYA_SKUS, SURYA_COLOURS,
  COOK_METHODS, FAQ_ITEMS,
} = await import(pathToFileURL(SSR_ENTRY).href);

const url = (p) => `${SITE_URL}${p === '/' ? '/' : p}`;
const list = (items) => items.map((i) => `- ${i}`).join('\n');
const and = (xs) => `${xs.slice(0, -1).join(', ')} and ${xs[xs.length - 1]}`;
const [iso, fssai, apeda] = F.CERTIFICATIONS;

const summary =
  `${F.COMPANY_NAME} is a rice miller and exporter at Yadgarpally, Miryalaguda, in the Nalgonda ` +
  `district of Telangana, India. Paddy is bought directly from farmers in the surrounding mandals ` +
  `and dried, milled, graded, colour-sorted and packed on a single ISO 22000:2018 certified site. ` +
  `The company supplies bulk buyers, private-label brands and export customers, and sells under ` +
  `its own Surya and Dwaraka brands.`;

const keyFacts = list([
  `Legal name: ${F.COMPANY_NAME} (trading as ${SITE_NAME} / ${F.SHORT_COMPANY_NAME})`,
  `Incorporated: ${F.INCORPORATION_DATE}`,
  `Mill and works: ${F.MILL_ADDRESS_LINES.join(' ')}, India`,
  `Coordinates: ${F.GEO_COORDINATES.lat}° N, ${F.GEO_COORDINATES.lng}° E — ${F.GOOGLE_MAPS_PLACE_URL}`,
  `Registered office: ${F.REGISTERED_OFFICE_LINES.join(' ')}`,
  `Sales (call or WhatsApp): ${F.COMPANY_CONTACT_PHONE}, Monday–Saturday 09:00–18:00 IST`,
  `Email: ${F.COMPANY_CONTACT_EMAIL}`,
  `Farmer paddy payments: ${F.FARMER_PAYMENTS_PHONE_FORMATTED}`,
  `Products: JSR (Lachkari Kolam), HMT (Sona Masoori / Ponni type) and RNR (Telangana Sona) rice, steam or double boiled; rice bran, broken rice, husk`,
  `Pack sizes: ${F.PACK_SIZES.map((p) => p.kg).join(', ')} (50 kg for bulk on request); private label available`,
  `Certifications: ISO 22000:2018, FSSAI State Licence ${fssai.number}, APEDA RCMC ${apeda.number}, IEC ${F.IEC_NUMBER}`,
  `States supplied: ${and(F.STATES_SERVED)}`,
  `Surya rice price: ${F.inr(F.SURYA_PRICES.bag26)} per 26 kg bag, ${F.inr(F.SURYA_PRICES.bag30)} per 30 kg bag (about ${F.inr(F.SURYA_PRICES.perKg)} per kg)`,
]);

const pages = ROUTES.map((r) => `- [${r.label}](${url(r.path)}): ${r.description}`).join('\n');

const llms = `# ${F.COMPANY_NAME}

> ${summary}

${keyFacts}

## Pages

${pages}

## Full reference

- [Complete site content as Markdown](${SITE_URL}/llms-full.txt): every product, specification, mill stage, cooking guide and FAQ in one file

## Optional

- [Sitemap](${SITE_URL}/sitemap.xml)
`;

const sentence = (s) => (s.endsWith('.') ? s : `${s}.`);
const certs = F.CERTIFICATIONS.map(
  (c) => `- **${c.name}** — ${c.numberLabel.toLowerCase()} ${c.number}, valid to ${c.validTo}, ${sentence(`issued by ${c.issuer}`)} ${c.description}`
).join('\n');

const varieties = F.RICE_VARIETIES_DATA.map(
  (v) => `### ${v.name} (${v.altName})\n\n${v.description}\n\nAvailable as: ${v.types.join(', ')}.`
).join('\n\n');

const specTable = (rows) => ['| Parameter | Value |', '|---|---|', ...rows.map((r) => `| ${r.p} | ${r.v} |`)].join('\n');

const stages = MILL_STAGES.map(
  (s) => `### ${s.n}. ${s.label} — ${s.title}\n\n*${s.where}.* ${s.body}\n\n${list(s.facts.map((f) => `${f.k}: ${f.v}`))}`
).join('\n\n');

const machinery = MILL_MACHINERY.map((m) => `- **${m.t}** (${m.tag}). ${m.d}`).join('\n');

const skus = SURYA_SKUS.map(
  (s) => `### ${s.name} — ${s.variety}\n\n${s.pitch}\n\n${list(s.specs.map((x) => `${x.k}: ${x.v}`))}\n- Price: ${F.inr(F.SURYA_PRICES.bag26)} per 26 kg bag, ${F.inr(F.SURYA_PRICES.bag30)} per 30 kg bag`
).join('\n\n');

const colours = SURYA_COLOURS.map((c) => `- **${c.name}** (${c.variety}, ${c.sizes}): ${c.d}`).join('\n');

const cooking = COOK_METHODS.map(
  (m) =>
    `### ${m.title}\n\n${m.blurb} Best for: ${m.pack}.\n\n${list(m.dials.map((d) => `${d.k}: ${d.v}`))}\n\n` +
    m.steps.map((st, i) => `${i + 1}. **${st.t}.** ${st.d}`).join('\n')
).join('\n\n');

const faq = FAQ_ITEMS.map((f) => `### ${f.q}\n\n${f.a}`).join('\n\n');

const full = `# ${F.COMPANY_NAME} — complete reference

> ${summary}

Source: ${SITE_URL}. Generated from the website's own content on every deploy.

## Key facts

${keyFacts}

## Certifications and registrations

${certs}

## How the business works

${list(F.PILLARS_DATA.map((p) => `**${p.t}.** ${p.d}`))}

## Rice varieties

${varieties}

### Pack sizes

${list(F.PACK_SIZES.map((p) => `${p.kg} — ${p.use}`))}

Woven PP and jute, printed to the buyer's artwork for private label, or in Vagdevi's own Surya and Dwaraka packs. Bulk consignments ship in 50 kg bags on request. Every pack carries a lot number tied to a milling date and a lab report.

### By-products

${list(F.BYPRODUCTS_DATA.map((b) => `**${b.n}.** ${b.d}`))}

## Brands

### Surya — "${F.RICE_BRANDS_DATA[0].tagline}"

${F.RICE_BRANDS_DATA[0].description}

${skus}

#### Surya pack colours

${colours}

### Dwaraka — "${F.RICE_BRANDS_DATA[1].tagline}"

${F.RICE_BRANDS_DATA[1].description}

## Exports

Registered with APEDA as a Manufacturer Exporter of rice (RCMC ${apeda.number}, IEC ${F.IEC_NUMBER}).

${list(F.EXPORT_PROPS.map((p) => `**${p.t}.** ${p.d}`))}

### Export specification — Sona Masoori (premium)

${specTable(F.EXPORT_SPECS.sona)}

### Export specification — steam rice (classic)

${specTable(F.EXPORT_SPECS.steam)}

Indicative parameters. A signed lab report accompanies every shipment; custom specifications are quoted on request.

## Inside the mill: from a farmer's truck to a stitched bag

${stages}

### Plant and machinery

${machinery}

## Cooking Surya rice

${cooking}

## Frequently asked questions

${faq}

## Pages

${pages}
`;

await writeFile(path.join(ROOT, 'dist', 'llms.txt'), llms);
await writeFile(path.join(ROOT, 'dist', 'llms-full.txt'), full);
console.log(`llms.txt (${llms.length} chars) and llms-full.txt (${full.length} chars) written.`);
