export default class Player {
  public readonly name: string;
  public readonly color: PlayerColor;
  public readonly turnIndexOrder: number;
  constructor(name: string, color: PlayerColor, index: number) {
    this.name = name;
    this.color = color;
    this.turnIndexOrder = index;
  }
}

export enum PlayerColor {
  Yellow = 'Yellow',
  Blue = 'Blue',
}
