export const config = {
  /**
   * In pixels
   */
  gameWidth: 352,

  /**
   * In pixels
   */
  gameHeight: 576,

  pipe: {
    collider: {
      offsetX: 4,
      width: 56,
    },
  },

  pipeManager: {
    pipeSpawnBuffer: 50,
    pipeScrollSpeed: 240,
    spawnIntervalInSeconds: 1.5,
  },
};

export type Config = typeof config;
