export const formatFileSize = (size: number) => {
  const units = ['B', 'kB', 'MB', 'GB', 'TB'];
  const currentUnitIndex = Math.floor(Math.log(size) / Math.log(1024));

  return `${Math.round(size / 1024 ** currentUnitIndex)} ${
    units[currentUnitIndex]
  }`;
};
