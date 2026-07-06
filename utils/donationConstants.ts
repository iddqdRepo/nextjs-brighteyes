export const DONATION_PRESET_AMOUNTS = [5, 10, 20, 50];
export const MIN_DONATION_AMOUNT = 2;
//Stripe accepts at most eight minor-unit digits for GBP. Donation amounts are
//whole pounds, so £999,999 remains within that platform limit.
export const MAX_DONATION_AMOUNT = 999999;

export const GIFT_AID_DECLARATION_VERSION = "2026-07";

export const GIFT_AID_DECLARATION_TEXT =
  "I want Bright Eyes Animal Sanctuary to treat this donation as a Gift Aid donation. I confirm I am a UK taxpayer and understand that if I pay less Income Tax and/or Capital Gains Tax than the total amount of Gift Aid claimed by all charities and CASCs on my donations in that tax year, it is my responsibility to pay any difference.";

export const MULTIPLE_DONATIONS_GIFT_AID_DECLARATION_TEXT =
  "I want Bright Eyes Animal Sanctuary to treat the donations selected above as Gift Aid donations. I confirm I am a UK taxpayer and understand that if I pay less Income Tax and/or Capital Gains Tax than the total amount of Gift Aid claimed by all charities and CASCs on my donations in that tax year, it is my responsibility to pay any difference.";
