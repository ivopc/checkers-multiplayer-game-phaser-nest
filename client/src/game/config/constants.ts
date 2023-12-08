export const PreloadSceneKey: string = '0';
export const MenuSceneKey: string = '1';
export const GameplaySceneKey: string = '2';

export const BOARDCONFIG = {
  BOARDSIZE: 8, // The amount of tiles the board should have.
  TILESIZE: 128, // The tile widht and height in pixels.
  /**
   * These are the movable areas of the game.
   * 1 = Movable, 0 = Not Movable.
   * All the tiles with 1 are black.
   */
  BOARDLAYOUT: [
    [0, 1, 0, 1, 0, 1, 0, 1],
    [1, 0, 1, 0, 1, 0, 1, 0],
    [0, 1, 0, 1, 0, 1, 0, 1],
    [1, 0, 1, 0, 1, 0, 1, 0],
    [0, 1, 0, 1, 0, 1, 0, 1],
    [1, 0, 1, 0, 1, 0, 1, 0],
    [0, 1, 0, 1, 0, 1, 0, 1],
    [1, 0, 1, 0, 1, 0, 1, 0],
  ],
  /**
   * 1 and 2 are the player's initial positions.
   * 1 = Blue
   * 2 = Yellow
   */
  INITIALPOSITION: [
    [0, 2, 0, 2, 0, 2, 0, 2],
    [2, 0, 2, 0, 2, 0, 2, 0],
    [0, 2, 0, 2, 0, 2, 0, 2],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [1, 0, 1, 0, 1, 0, 1, 0],
    [0, 1, 0, 1, 0, 1, 0, 1],
    [1, 0, 1, 0, 1, 0, 1, 0],
  ],
};
