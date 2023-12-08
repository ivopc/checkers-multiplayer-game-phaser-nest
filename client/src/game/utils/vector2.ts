export default class Vector2 {
  public x: number;
  public y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  public add(other: Vector2): Vector2 {
    return new Vector2(this.x + other.x, this.y + other.y);
  }

  public toString(): string {
    return `${this.x}:${this.y}`;
  }

  public static toVector(string: string): Vector2 {
    const [x, y] = string.split(':').map(Number);
    return new Vector2(x, y);
  }
}
