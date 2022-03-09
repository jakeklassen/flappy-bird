/**
 * The sprite map contains positional data used to sample images and
 * animations from the sprite sheet.
 */
export const spriteMap = {
  text: {
    zero: {
      sourceX: 271,
      sourceY: 924,
      width: 24,
      height: 36,
    },
    one: {
      sourceX: 296,
      sourceY: 924,
      width: 16,
      height: 36,
    },
    two: {
      sourceX: 313,
      sourceY: 924,
      width: 24,
      height: 36,
    },
    three: {
      sourceX: 338,
      sourceY: 924,
      width: 24,
      height: 36,
    },
    four: {
      sourceX: 363,
      sourceY: 924,
      width: 24,
      height: 36,
    },
    five: {
      sourceX: 388,
      sourceY: 924,
      width: 24,
      height: 36,
    },
    six: {
      sourceX: 413,
      sourceY: 924,
      width: 24,
      height: 36,
    },
    seven: {
      sourceX: 438,
      sourceY: 924,
      width: 24,
      height: 36,
    },
    eight: {
      sourceX: 463,
      sourceY: 924,
      width: 24,
      height: 36,
    },
    nine: {
      sourceX: 488,
      sourceY: 924,
      width: 24,
      height: 36,
    },
  },

  background: {
    sourceX: 512,
    sourceY: 0,
    width: 512,
    height: 512,
  },

  ground: {
    sourceX: 0,
    sourceY: 960,
    width: 352,
    height: 64,
  },

  pipes: {
    green: {
      top: {
        sourceX: 0,
        sourceY: 512,
        width: 64,
        height: 38,
      },
      bottom: {
        sourceX: 0,
        sourceY: 634,
        width: 64,
        height: 38,
      },
      slice: {
        sourceX: 0,
        sourceY: 550,
        width: 64,
        height: 1,
      },
    },
  },

  bird: {
    idle: {
      sourceX: 0,
      sourceY: 864,
      width: 32,
      height: 32,
    },

    animations: {
      flap: {
        sourceX: 0,
        sourceY: 864,
        width: 128,
        height: 32,
        frameWidth: 32,
        frameHeight: 32,
      },
    },
  },

  getReady: {
    sourceX: 512,
    sourceY: 672,
    width: 352,
    height: 288,
  },
};

export type SpriteMap = typeof spriteMap;
