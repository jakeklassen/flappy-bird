export const config = {
  /**
   * In pixels
   */
  gameWidth: 352,

  /**
   * In pixels
   */
  gameHeight: 576,

  debug: false,

  pipe: {
    collider: {
      offsetX: 4,
      width: 56,
    },
  },
};

export type Config = typeof config;
