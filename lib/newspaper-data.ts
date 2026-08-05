import type { TimePeriodGroupId } from "./time-periods";

export type MarginNote = {
  symbol: string;
  label?: string;
  text: string;
};

export type ArticleParagraph = {
  text: string;
  footnote?: string;
};

export type ArticleContent = {
  accuracy: number;
  kickerCategory: string;
  location: string;
  year: string;
  subLocation: string;
  paragraphs: ArticleParagraph[];
  marginNotes: MarginNote[];
};

export type Story = {
  id: string;
  isLead?: boolean;
  kicker: string;
  headline: string;
  blurb: string;
  byline: string;
  imageCaption?: string;
  // When absent, the lead story falls back to the captioned placeholder box. Width/height are
  // the source file's actual intrinsic pixel dimensions — used to size the box by aspect ratio
  // so the image is never cropped, rather than forcing a fixed height and cover-cropping it.
  imageSrc?: string;
  imageWidth?: number;
  imageHeight?: number;
  article?: ArticleContent;
};

export type NewspaperFixture = {
  key: string;
  year: number;
  destination: string;
  groupId: TimePeriodGroupId;
  masthead: {
    eyebrow: string;
    title: string;
    subtitle: string;
  };
  categories: string[];
  activeCategory: string;
  stories: Story[];
  footer: string;
  articleFooter: string;
  shareLabel: string;
};

const rome100Bce: NewspaperFixture = {
  key: "rome|-100",
  year: -100,
  destination: "Rome",
  groupId: "antiquity",
  masthead: {
    eyebrow: "SPQR · VOL. DCLIV",
    title: "The Republic Register",
    subtitle: "ROME · 100 BCE · ONE AS",
  },
  categories: ["Senate", "Forum", "Provinces", "Games", "Religion", "Markets"],
  activeCategory: "Senate",
  footer: "END OF DISPATCH · NEXT EDITION AT DAWN",
  articleFooter: "END OF DISPATCH",
  shareLabel: "SHARE THIS DISPATCH",
  stories: [
    {
      id: "marius-sixth-consulship",
      isLead: true,
      kicker: "LEAD STORY",
      headline: "Marius Secures Sixth Consulship as Populares Grip Tightens",
      blurb:
        "Veterans of the Cimbrian war throng the Campus Martius; optimates warn the Republic bends toward one man's ambition.",
      byline: "ROME, THE FORUM — 100 BCE",
      imageCaption: "ENGRAVING · MARIUS AT THE ROSTRA",
      imageSrc: "/newspaper/marius.png",
      imageWidth: 1408,
      imageHeight: 768,
      article: {
        accuracy: 73,
        kickerCategory: "THE ASSEMBLY",
        location: "ROME",
        year: "100 BCE",
        subLocation: "THE FORUM",
        paragraphs: [
          {
            text: "In the ninth year since the Cimbri were broken at Vercellae, Gaius Marius was returned to the consulship for the sixth time, an honor no citizen of the Republic has held before him.",
            footnote: "†",
          },
          {
            text: "The vote came amid crowds of discharged legionaries, many still awaiting the land grants promised them upon their release from the eagles.",
          },
          {
            text: "Lucius Appuleius Saturninus, tribune of the plebs, again pressed the assembly toward measures the Senate has twice refused, distributing grain below the customary price.",
            footnote: "‡",
          },
          {
            text: "Optimate senators, gathered on the steps of the Curia, spoke openly of a single man's ambition eclipsing the collective governance the Republic was built to preserve.",
          },
          {
            text: "Whether this alliance of soldier and tribune holds through the year remains, as ever, a matter the gods alone have settled.",
            footnote: "§",
          },
        ],
        marginNotes: [
          { symbol: "†", text: "Unprecedented: no consul before Marius has held the office six times." },
          { symbol: "‡", text: "Saturninus's grain law undercuts market price by roughly five-sixths of an as per modius." },
          { symbol: "§", text: "Contemporary annalists disagree sharply on Marius's intentions here." },
        ],
      },
    },
    {
      id: "saturninus-rallies-plebs",
      kicker: "THE ASSEMBLY",
      headline: "Saturninus Rallies the Plebs Against the Senate's Grain Delay",
      blurb: "The tribune's allies mass at the Rostra; senators mutter of violence to come before the harvest festivals.",
      byline: "ROME, THE FORUM — 100 BCE",
    },
    {
      id: "legions-return",
      kicker: "THE FRONTIER",
      headline: "Legions Return From the Cimbrian War, Bearing Spoils and Rumor",
      blurb: "Soldiers speak of a northern people broken at Vercellae; veterans now petition for land long promised.",
      byline: "PORTA CAPENA — 100 BCE",
    },
    {
      id: "grain-dole-expanded",
      kicker: "THE MARKETS",
      headline: "Grain Dole Expanded as Prices Ease in the Subura",
      blurb: "Merchants from Sicily report a fuller harvest this season, though the aediles insist supply remains fragile.",
      byline: "THE SUBURA — 100 BCE",
    },
  ],
};

const theMoon2150: NewspaperFixture = {
  key: "the moon|2150",
  year: 2150,
  destination: "The Moon",
  groupId: "near-future",
  masthead: {
    eyebrow: "SIGNAL RELAY · LUNA NET",
    title: "The Tranquility Wire",
    subtitle: "LUNA COLONY · 2150",
  },
  categories: ["Domes", "Orbit", "Mining", "Transit", "Comms"],
  activeCategory: "Domes",
  footer: "SIGNAL END · NEXT RELAY IN 06:00",
  articleFooter: "SIGNAL END",
  shareLabel: "SHARE THIS TRANSMISSION",
  stories: [
    {
      id: "dome-7-charter",
      isLead: true,
      kicker: "LEAD TRANSMISSION",
      headline: "Dome 7 Ratifies Independent Life-Support Charter",
      blurb:
        "Colony assembly votes to sever atmospheric governance from the Earthside consortium, citing three cycles of delayed reserve shipments.",
      byline: "TRANQUILITY BASE — 2150",
      imageCaption: "VISUAL FEED · DOME 7 ATRIUM",
      imageSrc: "/newspaper/moon-charter.png",
      imageWidth: 1408,
      imageHeight: 768,
      article: {
        accuracy: 41,
        kickerCategory: "DOMES",
        location: "LUNA COLONY",
        year: "2150",
        subLocation: "TRANQUILITY BASE",
        paragraphs: [
          {
            text: "The Dome 7 colony assembly voted 61 to 14 to assume direct control of atmospheric and water reclamation systems, ending a dependency arrangement with the Earthside consortium that has governed the dome since its sealing in 2103.",
            footnote: "†",
          },
          {
            text: "The measure follows three consecutive cycles in which promised reserve shipments of scrubber media arrived late, forcing rationing of recycled air across the outer residential rings.",
          },
          {
            text: "Consortium representatives, addressing the assembly by relay from High Anchor Station, warned that independent operation carries risks the colony has not yet modeled at full scale.",
            footnote: "‡",
          },
          {
            text: "Supporters of the charter point to Dome 3's successful transition four years prior as evidence the systems can be run locally without consortium oversight.",
          },
          {
            text: "The charter takes effect at the next supply cycle, pending ratification by the Lunar Compact council on Earthside.",
            footnote: "§",
          },
        ],
        marginNotes: [
          { symbol: "†", label: "DATA NOTE", text: "Dome 7 was the fourth permanent settlement sealed on the Sea of Tranquility." },
          { symbol: "‡", label: "DATA NOTE", text: "Consortium models estimate independent life-support failure risk at 4% over ten years." },
          { symbol: "§", label: "DATA NOTE", text: "The Lunar Compact council last overturned a dome charter in 2141." },
        ],
      },
    },
    {
      id: "helium-3-delays",
      kicker: "ORBIT",
      headline: "Helium-3 Freight Delays Strain Earthside Contracts",
      blurb: "Consortium haulers cite a third consecutive missed window; colony reserves reportedly at eleven cycles.",
      byline: "HIGH ANCHOR STATION — 2150",
    },
    {
      id: "lunar-suffrage-debate",
      kicker: "ASSEMBLY",
      headline: "Colony Assembly Debates Full Lunar Suffrage",
      blurb: "A generation born under the domes asks why Earthside still holds a vote on matters of the regolith.",
      byline: "TRANQUILITY BASE — 2150",
    },
    {
      id: "transit-line-extension",
      kicker: "TRANSIT",
      headline: "Transit Line Extension Reaches Shackleton Rim",
      blurb: "The new maglev spur cuts the polar ice run from nine hours to just under two.",
      byline: "SHACKLETON RIM — 2150",
    },
  ],
};

const fixtures: NewspaperFixture[] = [rome100Bce, theMoon2150];

function fixtureKey(destination: string, year: number): string {
  return `${destination.trim().toLowerCase()}|${Math.round(year)}`;
}

export function getNewspaperFixture(destination: string, year: number): NewspaperFixture | null {
  const key = fixtureKey(destination, year);
  return fixtures.find((fixture) => fixture.key === key) ?? null;
}
