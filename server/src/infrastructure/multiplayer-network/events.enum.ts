export enum GameNetworkEvents {
    Ping = "0",
    GameBoot = "1",
    MatchBoot = "2",
    MatchMaking = "3",
    LeftMatch = "4",
    ChatMessage = "5",
    TimerTick = "6"
};

export enum CheckersEvents {
    RequestPieceMovement = "1.0",
    TurnResults = "1.1",
    
};