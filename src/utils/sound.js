const SOUND_CACHE = {};

const getSoundUrl = (fileName) => {
  const publicBase = process.env.PUBLIC_URL || '';
  const fromPublic = `${publicBase}/assets/Audio/${fileName}`.replace(/\/\//g, '/');

  if (fromPublic.startsWith('/')) {
    return `${window.location.origin}${fromPublic}`;
  }

  return fromPublic;
};

export const preloadSound = (fileName) => {
  if (typeof Audio === 'undefined') return null;

  if (!SOUND_CACHE[fileName]) {
    const audio = new Audio(getSoundUrl(fileName));
    audio.preload = 'auto';
    audio.load();
    SOUND_CACHE[fileName] = audio;
  }

  return SOUND_CACHE[fileName];
};

export const playSound = (fileName, options = {}) => {
  if (typeof Audio === 'undefined') return null;

  const audio = new Audio(getSoundUrl(fileName));
  if (!audio) return null;

  if (options.volume !== undefined) {
    audio.volume = options.volume;
  }

  audio.currentTime = 0;
  audio.play().catch(() => {});
  return audio;
};
