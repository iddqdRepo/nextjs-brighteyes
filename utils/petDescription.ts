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

export type TraitOption = typeof TRAIT_OPTIONS[number];

// Every phrase must read naturally after:
// "He is ...", "She is ..." or "They are ..."
const TRAIT_PHRASES: Record<TraitOption, string> = {
  Playful: "playful and always ready for a game",
  Gentle: "gentle",
  Energetic: "full of energy",
  Cuddly: "fond of cuddles",
  "Shy at first": "a little shy at first",
  "Loves walks": "happiest when out on a walk",
  "Good on the lead": "comfortable walking on the lead",
  "House-trained": "house-trained",
  Quiet: "quiet around the home",
  Curious: "naturally curious",
  "Loves toys": "very keen on toys",
  Loyal: "a loyal companion",
};

export type DescriptionFields = {
  name?: string;
  type?: string;
  sex?: string;
  age?: string;
  yearsOrMonths?: string;
  breed?: string;
  suitableForChildren?: string;
  suitableForAnimals?: string;
};

const clean = (value?: string): string => value?.trim() ?? "";

const joinNaturally = (parts: readonly string[]): string => {
  if (parts.length === 0) {
    return "";
  }

  if (parts.length === 1) {
    return parts[0];
  }

  return `${parts.slice(0, -1).join(", ")} and ${parts.at(-1)}`;
};

const chunk = <T>(items: readonly T[], size: number): T[][] => {
  const chunks: T[][] = [];

  for (let index = 0; index < items.length; index += size) {
    chunks.push(items.slice(index, index + size));
  }

  return chunks;
};

const isTraitOption = (value: string): value is TraitOption =>
  (TRAIT_OPTIONS as readonly string[]).includes(value);

const pick = <T>(pool: readonly T[], variant: number, offset = 0): T => {
  if (pool.length === 0) {
    throw new Error("Cannot pick from an empty pool.");
  }

  const safeVariant = Number.isFinite(variant) ? Math.trunc(variant) : 0;

  const index =
    (((safeVariant + offset) % pool.length) + pool.length) % pool.length;

  return pool[index];
};

/**
 * Converts common form values into a real three-state answer.
 *
 * Blank, "Unknown", "Not assessed" and any unexpected value remain undefined,
 * so they cannot accidentally become a negative statement.
 */
const parseYesNo = (value?: string): boolean | undefined => {
  const normalised = clean(value).toLowerCase();

  if (["yes", "y", "true", "1"].includes(normalised)) {
    return true;
  }

  if (["no", "n", "false", "0"].includes(normalised)) {
    return false;
  }

  return undefined;
};

/**
 * A practical article chooser for the kinds of descriptions expected here.
 *
 * It handles examples such as:
 * - an 8-month-old Labrador
 * - an 11-year-old cat
 * - an Alsatian
 * - an XL Bully
 * - a one-year-old dog
 *
 * English article rules have exceptions, but this covers ordinary animal
 * breeds, numeric ages and common initialisms.
 */
const getIndefiniteArticle = (phrase: string): "a" | "an" => {
  const firstPart = phrase.trim().match(/^[A-Za-z0-9.]+/)?.[0] ?? "";
  const lower = firstPart.toLowerCase();

  if (/^\d/.test(firstPart)) {
    const number = Number.parseFloat(firstPart);

    if ([8, 11, 18].includes(number)) {
      return "an";
    }

    return "a";
  }

  // Initialisms whose first letter normally starts with a vowel sound:
  // F, H, L, M, N, R, S and X, as well as A, E, I and O.
  if (/^[A-Z]{2,}$/.test(firstPart)) {
    return /^[AEFHILMNORSX]/.test(firstPart) ? "an" : "a";
  }

  if (/^(honest|honour|hour|heir)/.test(lower)) {
    return "an";
  }

  if (
    /^(one|once|ewe|euro|user|use|usual|uni(?:form|corn|que|vers))/.test(lower)
  ) {
    return "a";
  }

  return /^[aeiou]/.test(lower) ? "an" : "a";
};

const createSuitabilitySentence = (
  suitableForChildren: boolean | undefined,
  suitableForAnimals: boolean | undefined,
  subject: string,
  verb: "is" | "are"
): string | undefined => {
  // Both answers are known.
  if (suitableForChildren !== undefined && suitableForAnimals !== undefined) {
    if (suitableForChildren && suitableForAnimals) {
      return `${subject} ${verb} suitable for a home with children and other pets.`;
    }

    if (suitableForChildren && !suitableForAnimals) {
      return `${subject} ${verb} suitable for a home with children but would need to be the only pet.`;
    }

    if (!suitableForChildren && suitableForAnimals) {
      return `${subject} could live with other pets but would need a home without children.`;
    }

    return `${subject} would need a home without children and would need to be the only pet.`;
  }

  // Only the answer about children is known.
  if (suitableForChildren !== undefined) {
    return suitableForChildren
      ? `${subject} ${verb} suitable for a home with children.`
      : `${subject} would need a home without children.`;
  }

  // Only the answer about other animals is known.
  if (suitableForAnimals !== undefined) {
    return suitableForAnimals
      ? `${subject} ${verb} suitable for a home with other pets.`
      : `${subject} would need to be the only pet in the home.`;
  }

  return undefined;
};

export const writePetDescription = (
  fields: DescriptionFields,
  traits: readonly string[],
  variant: number
): string => {
  const name = clean(fields.name);

  const sex = clean(fields.sex).toLowerCase();
  const isMale = sex === "male";
  const isFemale = sex === "female";

  const subject = isMale ? "He" : isFemale ? "She" : "They";
  const subjectLower = isMale ? "he" : isFemale ? "she" : "they";
  const object = isMale ? "him" : isFemale ? "her" : "them";
  const verb: "is" | "are" = isMale || isFemale ? "is" : "are";

  const suppliedType = clean(fields.type);
  const typeNoun = suppliedType
    ? suppliedType.toLocaleLowerCase("en-GB")
    : "animal";

  const breed = clean(fields.breed);
  const age = clean(fields.age);
  const suppliedUnit = clean(fields.yearsOrMonths).toLowerCase();

  const ageUnit =
    suppliedUnit === "months"
      ? "month"
      : suppliedUnit === "years"
      ? "year"
      : undefined;

  // Do not guess the unit. If an age has been entered without months/years,
  // it is omitted rather than silently being described as years.
  const ageDescription = age && ageUnit ? `${age}-${ageUnit}-old` : "";

  const animalNoun = breed || typeNoun;

  const descriptor = [ageDescription, animalNoun].filter(Boolean).join(" ");

  const hasSpecificDescriptor = Boolean(
    ageDescription || breed || suppliedType
  );

  const describedAnimal = `${getIndefiniteArticle(descriptor)} ${descriptor}`;

  const namedOpeners = hasSpecificDescriptor
    ? [
        `${name} is ${describedAnimal} looking for a new home.`,
        `Meet ${name}, ${describedAnimal} looking for a new home.`,
        `${name}, ${describedAnimal}, is looking for the right home.`,
      ]
    : [
        `${name} is looking for a new home.`,
        `Meet ${name}, who is looking for a new home.`,
        `${name} is looking for the right home.`,
      ];

  const unnamedOpeners = [
    `This ${descriptor} is looking for a new home.`,
    `Meet this ${descriptor}, who is looking for a new home.`,
    `This ${descriptor} is looking for the right home.`,
  ];

  const sentences: string[] = [
    pick(name ? namedOpeners : unnamedOpeners, variant),
  ];

  // Remove duplicate and unrecognised traits before producing any text.
  const traitPhrases = Array.from(new Set(traits))
    .filter(isTraitOption)
    .map((trait) => TRAIT_PHRASES[trait]);

  // Avoid creating one extremely long sentence when many traits are selected.
  const traitGroups = chunk(traitPhrases, 3);

  traitGroups.forEach((group, index) => {
    const also = index === 0 ? "" : " also";

    sentences.push(`${subject} ${verb}${also} ${joinNaturally(group)}.`);
  });

  const suitabilitySentence = createSuitabilitySentence(
    parseYesNo(fields.suitableForChildren),
    parseYesNo(fields.suitableForAnimals),
    subject,
    verb
  );

  if (suitabilitySentence) {
    sentences.push(suitabilitySentence);
  }

  const namedClosers = [
    `Could ${name} be the right match for you? Contact the team to find out more.`,
    `Think ${name} could be a good fit for your home? Get in touch with the team to discuss the next steps.`,
    `To learn more about ${name}, please contact the team.`,
  ];

  const unnamedClosers = [
    `Could ${subjectLower} be the right match for you? Contact the team to find out more.`,
    `Think ${subjectLower} could be a good fit for your home? Get in touch with the team to discuss the next steps.`,
    `To learn more about ${object}, please contact the team.`,
  ];

  sentences.push(pick(name ? namedClosers : unnamedClosers, variant, 1));

  return sentences.join(" ");
};
