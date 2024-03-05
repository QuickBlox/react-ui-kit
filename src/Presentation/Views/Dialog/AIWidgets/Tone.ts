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
