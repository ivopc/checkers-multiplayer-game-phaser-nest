class GameConfig {
  public boardSize: number = 8; // The size of the board (8x8 for checkers)
  public startRows: number = 3; // Number of rows for initial piece placement
  public piecesPerTeam: number = 12; // Number of pieces per player

  public playerOneColor: number = 0xff0000; // Player One's piece color (red)
  public playerTwoColor: number = 0x000000; // Player Two's piece color (black)

  public pieceRadius: number = 30; // Radius of each game piece
  public kingMarkerColor: number = 0xffff00; // Color for marking king pieces

  public enableKings: boolean = true; // Allow regular pieces to become kings
  public enableDoubleJumps: boolean = true; // Allow multiple jumps in one turn
  public enableStalemateDraw: boolean = false; // Enable stalemate draws

  public animationSpeed: number = 200; // Animation speed for moves
  public maxMovesWithoutCapture: number = 50; // Maximum moves without a capture before declaring a draw
}

export default new GameConfig();
