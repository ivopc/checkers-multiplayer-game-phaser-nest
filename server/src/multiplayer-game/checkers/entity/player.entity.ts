export default class CheckersPlayer {
    public readonly id: string;
    public readonly name: string;
    public color: PlayerColor;
    constructor (id, name) {
        this.id = id;
        this.name = name;
    }

    toJSON () {
        return {
            id: this.id,
            name: this.name,
            color: this.color
        }
    }
};

export enum PlayerColor {
    Yellow = "Yellow",
    Blue = "Blue"
};