// ForestGuard content. Edit text here; no build step needed.

const threats = [
  {
    id: 'logging', icon: 'axe', title: 'Illegal logging and tree cutting',
    summary: 'Felling or transporting timber without the required permit or outside an approved working plan.',
    definition: 'Cutting, removing or transporting trees from forest land in violation of forest laws, permits or an approved working plan.',
    causes: ['Demand for timber and firewood', 'Weak monitoring in remote areas', 'Organised timber trade', 'Poverty and lack of alternative income'],
    consequences: ['Loss of canopy and wildlife habitat', 'Soil erosion and landslide risk', 'Lost carbon storage', 'Lost revenue and livelihoods for communities'],
    signs: ['Fresh stumps or sawdust in protected areas', 'Vehicles carrying timber at night', 'Freshly cut tracks into the forest', 'Timber stacked without transit documents'],
    mitigation: ['Regular patrolling and satellite alerts', 'Timber transit checks and traceability', 'Alternative fuel such as LPG and biogas', 'Community forest protection groups'],
    lawful: 'Lawful: felling under an approved working plan, or tree-cutting on private land with permission where the state requires it. Collection of minor forest produce by communities with recognised rights is also lawful.'
  },
  {
    id: 'encroachment', icon: 'shovel', title: 'Forest encroachment and land clearing',
    summary: 'Occupying or clearing forest land for farming, housing or commercial use without legal approval.',
    definition: 'Unauthorised occupation or clearing of forest land, including for cultivation, construction or plantations.',
    causes: ['Land hunger and population pressure', 'Unclear or disputed boundaries', 'Speculation and illegal land sales', 'Weak records of forest land'],
    consequences: ['Fragmented habitat that blocks wildlife corridors', 'More human-wildlife conflict', 'Permanent loss of forest cover', 'Disputes with people whose claims are genuine'],
    signs: ['New fencing or boundary markers inside forest land', 'Fresh clearing or burning at the forest edge', 'New huts or structures with no approvals', 'Crops appearing where forest stood'],
    mitigation: ['Demarcate and digitise boundaries', 'Satellite change monitoring', 'Settle genuine claims under the Forest Rights Act', 'Prompt legal action on new encroachment'],
    lawful: 'Lawful: rights recognised under the Forest Rights Act, 2006, and diversion of forest land approved under the forest conservation law. Not every dweller on forest land is an encroacher.'
  },
  {
    id: 'poaching', icon: 'paw-print', title: 'Wildlife poaching and illegal trade',
    summary: 'Hunting, trapping or trading protected animals and their parts.',
    definition: 'Killing, capturing or trading wild animals, or their parts, in violation of the Wild Life (Protection) Act, 1972.',
    causes: ['Demand for skins, bones, horns, ivory and pets', 'Organised criminal networks', 'Bushmeat demand', 'Low income of local hunters recruited by traders'],
    consequences: ['Decline of endangered species', 'Broken food webs', 'Loss of the ecological roles predators and grazers play', 'Threats to tourism and local economies'],
    signs: ['Snares, traps or wire loops on trails', 'Gunshots or spotlights at night', 'Animal parts for sale', 'Unusual online listings of live wild animals'],
    mitigation: ['Anti-poaching patrols and camera traps', 'Intelligence sharing between agencies', 'Awareness against buying wildlife products', 'Support for informants and livelihood programmes'],
    lawful: 'Lawful: scientific work, translocation and capture carried out under permits from the competent authority. Everyone else must treat protected species as off-limits.'
  },
  {
    id: 'mining', icon: 'pickaxe', title: 'Illegal mining and quarrying',
    summary: 'Extracting sand, stone or minerals without a lease, clearance or within protected areas.',
    definition: 'Mining or quarrying without a valid lease and environmental and forest clearances, or beyond approved limits.',
    causes: ['High demand for sand, stone and minerals', 'Weak oversight of leases', 'Profit from unregulated extraction', 'Local collusion and corruption'],
    consequences: ['Destroyed habitat and altered river courses', 'Polluted and depleted water sources', 'Dust and noise harming wildlife', 'Landscape scars that take decades to heal'],
    signs: ['Heavy trucks on forest tracks at odd hours', 'Fresh pits or excavation in forest land', 'Sand extraction from riverbeds without signage', 'Muddy, silted streams downstream'],
    mitigation: ['Drone and satellite monitoring of lease areas', 'Transport tracking and e-permits', 'Restoration bonds from lease holders', 'Strict penalties for violations'],
    lawful: 'Lawful: mining under a valid lease with all clearances, within the approved boundary and conditions.'
  },
  {
    id: 'dumping', icon: 'trash-2', title: 'Illegal dumping and pollution',
    summary: 'Discarding waste, plastics or chemicals in or near forest areas.',
    definition: 'Disposing of solid, plastic, construction or hazardous waste in forest land or watercourses outside approved sites.',
    causes: ['Lack of waste services near forest roads', 'Tourism litter', 'Cheap, unregulated disposal by contractors', 'Low awareness'],
    consequences: ['Wildlife ingesting plastic or getting entangled', 'Contaminated soil and streams', 'Fire risk from dumped waste', 'Spread of invasive plants and pests'],
    signs: ['Waste piles beside forest roads', 'Tippers unloading at night', 'Chemical smell or discoloured water', 'Burnt waste patches'],
    mitigation: ['Designated disposal points and bins', 'Carry-in, carry-out rules for visitors', 'Fines and CCTV at hotspots', 'Local clean-up drives'],
    lawful: 'Lawful: disposal only at authorised sites, and managed waste handling by approved agencies.'
  }
]

const impacts = [
  { id: 'bio', icon: 'bird', title: 'Biodiversity and endangered species',
    text: 'Forests hold most of the world\'s land-based species. Poaching removes animals directly, while logging and clearing remove their food, shelter and breeding sites.',
    chain: ['Habitat cleared or poached', 'Populations shrink', 'Gene pools narrow', 'Species risk extinction'] },
  { id: 'habitat', icon: 'mountain', title: 'Wildlife habitats and ecological balance',
    text: 'Roads, mines and farms cut forests into fragments. Animals lose corridors to move, feed and breed, and conflict with people rises when they enter villages.',
    chain: ['Forest fragmented', 'Corridors blocked', 'Animals enter settlements', 'Conflict and losses rise'] },
  { id: 'climate', icon: 'cloud', title: 'Climate change and carbon storage',
    text: 'Trees and forest soils store carbon. Cutting or burning forest releases it as carbon dioxide and removes the trees that would have absorbed more.',
    chain: ['Trees felled or burnt', 'Stored carbon released', 'Less absorption capacity', 'Local and global warming'] },
  { id: 'soil', icon: 'droplets', title: 'Soil erosion and water resources',
    text: 'Roots hold soil and leaf litter slows rain. Without them, rain washes soil into rivers, which silt up reservoirs and weaken groundwater recharge.',
    chain: ['Cover removed', 'Topsoil washes away', 'Rivers silt up', 'Floods, drought and poor water quality'] },
  { id: 'people', icon: 'users', title: 'Indigenous and forest-dependent communities',
    text: 'Millions of people rely on forests for food, fuel, medicine and income. Illegal activity can strip these resources and pushes out the very communities who protect forests.',
    chain: ['Resources depleted', 'Income and food security fall', 'Traditional knowledge at risk', 'Displacement and conflict'] }
]

const WHO = ['Government', 'Communities', 'Citizens and students', 'NGOs and researchers']

const solutions = [
  { id: 'afforest', icon: 'sprout', title: 'Afforestation and restoration',
    how: 'Degraded land is replanted with native species and given time and protection to regrow, often with natural regeneration assisted by fencing and fire control.',
    who: ['Government', 'Communities', 'NGOs and researchers'],
    benefits: ['Recovers habitat and soil', 'Stores carbon over time', 'Creates local jobs'] },
  { id: 'sfm', icon: 'tree-pine', title: 'Sustainable forest management',
    how: 'Harvesting follows a scientific working plan that limits what is cut, protects key areas and lets the forest renew itself.',
    who: ['Government', 'Communities'],
    benefits: ['Steady timber and non-timber income', 'Keeps ecological functions intact', 'Reduces pressure to cut illegally'] },
  { id: 'law', icon: 'scale', title: 'Stronger enforcement of forest laws',
    how: 'Adequate field staff, clear boundaries, fast investigation, and prosecution that holds traders and financiers accountable, not only labourers.',
    who: ['Government'],
    benefits: ['Deters organised crime', 'Gives legal clarity to genuine users', 'Builds public trust'] },
  { id: 'tech', icon: 'satellite', title: 'Satellite monitoring and responsible technology',
    how: 'Satellite imagery, drones and camera traps flag change in forest cover or wildlife movement. Field staff then verify before any action is taken.',
    who: ['Government', 'NGOs and researchers'],
    benefits: ['Faster detection of clearing and fire', 'Covers remote areas', 'Needs privacy safeguards and human verification'] },
  { id: 'community', icon: 'users', title: 'Community participation and education',
    how: 'Villagers form forest protection committees, share patrol duties and benefit from forest produce. Schools teach why forests matter.',
    who: ['Communities', 'Citizens and students', 'Government'],
    benefits: ['Eyes and ears on the ground', 'Local ownership of forests', 'Long-term behaviour change'] },
  { id: 'wildlife', icon: 'paw-print', title: 'Wildlife habitat protection and restoration',
    how: 'Protected areas are linked by corridors, water sources are restored, and invasive plants are removed so wildlife can move and feed safely.',
    who: ['Government', 'NGOs and researchers', 'Communities'],
    benefits: ['Healthier animal populations', 'Fewer conflicts with villages', 'Supports ecotourism'] },
  { id: 'waste', icon: 'recycle', title: 'Responsible waste disposal and pollution prevention',
    how: 'Waste collection near forest areas, visitor rules on carrying litter out, and strict action on dumping of hazardous and construction waste.',
    who: ['Government', 'Citizens and students', 'Communities'],
    benefits: ['Cleaner soil and streams', 'Safer wildlife', 'Lower fire risk'] }
]
// Official and credible links. Verify they are still live before deployment.
const officialLinks = [
  { name: 'Ministry of Environment, Forest and Climate Change', url: 'https://moef.gov.in', type: 'Government' },
  { name: 'Forest Survey of India (ISFR reports)', url: 'https://fsi.nic.in', type: 'Government' },
  { name: 'India Code (official text of Indian laws)', url: 'https://www.indiacode.nic.in', type: 'Government' },
  { name: 'Wildlife Crime Control Bureau', url: 'https://wccb.gov.in', type: 'Government' },
  { name: 'National Tiger Conservation Authority', url: 'https://ntca.gov.in', type: 'Government' },
  { name: 'Wildlife Institute of India', url: 'https://wii.gov.in', type: 'Government' },
  { name: 'Ministry of Tribal Affairs (Forest Rights Act)', url: 'https://tribal.nic.in', type: 'Government' },
  { name: 'WWF India', url: 'https://www.wwfindia.org', type: 'Organisation' },
  { name: 'Wildlife Trust of India', url: 'https://www.wti.org.in', type: 'Organisation' },
  { name: 'IUCN', url: 'https://www.iucn.org', type: 'Organisation' }
]

const laws = [
  { name: 'Indian Forest Act, 1927', note: 'Governs reserved, protected and village forests, and the regulation of forest produce and transit.' },
  { name: 'Wild Life (Protection) Act, 1972', note: 'Protects listed wild animals and plants, and regulates protected areas and trade.' },
  { name: 'Forest (Conservation) Act, 1980', note: 'Restricts diversion of forest land for non-forest use without central approval. Its name was changed by the 2023 amendment, so check India Code for the current title and text.' },
  { name: 'Environment (Protection) Act, 1986', note: 'Umbrella law for preventing and controlling pollution and environmental harm.' },
  { name: 'Biological Diversity Act, 2002', note: 'Regulates access to biological resources and shares benefits with local communities.' },
  { name: 'Scheduled Tribes and Other Traditional Forest Dwellers (Recognition of Forest Rights) Act, 2006', note: 'Recognises forest rights of eligible communities, including community forest resource rights.' },
  { name: 'Mines and Minerals (Development and Regulation) Act, 1957', note: 'Regulates mining and prescribes penalties for illegal extraction.' }
]

const faqs = [
  ['Is all tree cutting illegal?', 'No. Felling under an approved working plan or with the required permission is lawful. It becomes illegal when done without permits, in protected areas, or outside the approved limits. Rules differ by state, so ask the local forest office.'],
  ['Are forest dwellers encroachers?', 'Not automatically. The Forest Rights Act, 2006 recognises rights of eligible communities. Claims are decided through a legal process.'],
  ['Who should I contact if I see a suspected crime?', 'Contact your local forest range or division office (the Range Forest Officer or Divisional Forest Officer) through your state forest department website. If there is immediate danger, call 112. The Wildlife Crime Control Bureau website lists contacts for wildlife crime.'],
  ['Should I confront people or post photos online?', 'No. Keep a safe distance, note what you saw, and report to the authorities. Posting exact locations of vulnerable wildlife can help poachers.'],
  ['Does this website forward my report?', 'No. The reporting page is an educational prototype. Nothing you enter is sent or saved.']
]

const contribute = [
  'Plant native trees and look after them for at least two years.',
  'Never buy wildlife products, exotic pets, or timber without legal documents.',
  'Carry out all waste when visiting forests and avoid single-use plastic.',
  'Join or start a school or college eco club and organise awareness drives.',
  'Learn your local forest department\'s contact details and keep them handy.',
  'Share verified information, not rumours or exact locations of wildlife.'
]
