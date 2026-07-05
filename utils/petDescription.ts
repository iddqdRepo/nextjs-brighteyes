//Writes a first-draft animal description from the form fields plus a few
//ticked personality traits. Deliberately template-based rather than an AI
//API: it costs nothing, works offline, and can never invent facts about an
//animal. `variant` cycles the phrasing so "Write it differently" gives a
//fresh draft each click.

export const TRAIT_OPTIONS = [
  "Playful",
  "Gentle",
  "Energetic",
  "Cuddly",
  "Shy at first",
  "Loves walks",
  "Good on the lead",
  "House-trained",
  "Quiet",
  "Curious",
  "Loves toys",
  "Loyal",
] as const;

//Every phrase must read naturally after "He is ..." / "They are ...".
const TRAIT_PHRASES: Record<string, string> = {
  Playful: "always ready for a game",
  Gentle: "gentle and easy-going",
  Energetic: "full of energy",
  Cuddly: "a real cuddle-bug",
  "Shy at first": "a little shy at first, but warms up quickly",
  "Loves walks": "happiest out on a walk",
  "Good on the lead": "lovely to walk on the lead",
  "House-trained": "house-trained",
  Quiet: "calm and quiet around the house",
  Curious: "curious about everything",
  "Loves toys": "mad about toys",
  Loyal: "devoted to the people they trust",
};

type DescriptionFields = {
  name?: string;
  type?: string;
  sex?: string;
  age?: string;
  yearsOrMonths?: string;
  breed?: string;
  suitableForChildren?: string;
  suitableForAnimals?: string;
};

const joinNaturally = (parts: string[]) => {
  if (parts.length <= 1) {
    return parts.join("");
  }
  return `${parts.slice(0, -1).join(", ")} and ${parts[parts.length - 1]}`;
};

export const writePetDescription = (
  fields: DescriptionFields,
  traits: string[],
  variant: number
) => {
  const pick = (pool: string[], offset: number) =>
    pool[(variant + offset) % pool.length];

  const name = (fields.name || "").trim() || "This little one";
  const typeNoun = (fields.type || "").toLowerCase() === "cat" ? "cat" : "dog";
  const isFemale = fields.sex === "Female";
  const isMale = fields.sex === "Male";
  const subject = isMale ? "He" : isFemale ? "She" : "They";
  const object = isMale ? "him" : isFemale ? "her" : "them";
  const verb = isMale || isFemale ? "is" : "are";

  //"an 8-month-old", "an 11-year-old", otherwise "a ..."
  const age = (fields.age || "").trim();
  const unit = fields.yearsOrMonths === "Months" ? "month" : "year";
  const agePhrase = age ? `${age}-${unit}-old ` : "";
  const article = /^(8|11|18)/.test(age) ? "an" : "a";

  const breedNoun = (fields.breed || "").trim() || typeNoun;

  const openers = [
    `${name} is ${article} ${agePhrase}${breedNoun} looking for ${
      isMale ? "his" : isFemale ? "her" : "their"
    } forever home.`,
    `Meet ${name} — ${article} ${agePhrase}${breedNoun} with plenty of love to give.`,
    `${name} is ${article} ${agePhrase}${breedNoun} who came to Bright Eyes hoping for a second chance.`,
  ];

  const sentences = [pick(openers, 0)];

  const traitPhrases = traits
    .map((trait) => TRAIT_PHRASES[trait])
    .filter(Boolean);
  if (traitPhrases.length > 0) {
    sentences.push(`${subject} ${verb} ${joinNaturally(traitPhrases)}.`);
  }

  const goodWithKids = fields.suitableForChildren === "Yes";
  const goodWithPets = fields.suitableForAnimals === "Yes";
  if (fields.suitableForChildren || fields.suitableForAnimals) {
    if (goodWithKids && goodWithPets) {
      sentences.push(
        `${subject}'d fit right into a busy home — good with children and other pets alike.`
      );
    } else if (goodWithKids) {
      sentences.push(
        `${subject} ${verb} good with children, but would prefer to be the only pet in the house.`
      );
    } else if (goodWithPets) {
      sentences.push(
        `${subject} ${verb} fine with other animals, and would suit a home without young children.`
      );
    } else {
      sentences.push(
        `${subject}'d be happiest as the only pet in a calm, adult home.`
      );
    }
  }

  const closers = [
    `Could ${
      name === "This little one" ? "this little one" : name
    } be the one for you? Come and say hello at the sanctuary.`,
    `If that sounds like your kind of ${typeNoun}, we'd love to hear from you.`,
    `Pop in to meet ${object}, or send us an adoption form to get started.`,
  ];
  sentences.push(pick(closers, 1));

  return sentences.join(" ");
};
