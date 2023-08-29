export enum Tone {
  Professional = 'Professional Tone',
  Friendly = 'Friendly Tone',
  Encouraging = 'Encouraging Tone',
  Empathetic = 'Empathetic Tone',
  Neutral = 'Neutral Tone',
  Assertive = 'Assertive Tone',
  Instructive = 'Instructive Tone',
  Persuasive = 'Persuasive Tone',
  Sarcastic = 'Sarcastic/Ironic Tone',
  Poetic = 'Poetic Tone',
  Unchanged = 'Unchanged',
}

export const toneToString = (tone: Tone): string => {
  return tone;
};

export const stringToTone = (toneStr: string): Tone | undefined => {
  return Tone[toneStr as keyof typeof Tone];
};
