// export enum Tone {
//   Professional = 'Professional Tone',
//   Friendly = 'Friendly Tone',
//   Encouraging = 'Encouraging Tone',
//   Empathetic = 'Empathetic Tone',
//   Neutral = 'Neutral Tone',
//   Assertive = 'Assertive Tone',
//   Instructive = 'Instructive Tone',
//   Persuasive = 'Persuasive Tone',
//   Sarcastic = 'Sarcastic/Ironic Tone',
//   Poetic = 'Poetic Tone',
//   Unchanged = 'Unchanged',
// }

export interface Tone {
  name: string;
  description: string;
  iconEmoji: string;
}

export const toneToString = (tone: Tone): string => {
  return tone.name;
};

export const stringToTone = (
  toneStr: string,
  description?: string,
  emoji?: string,
): Tone | undefined => {
  return {
    name: toneStr,
    description: description || '',
    iconEmoji: emoji || '',
  };
};
