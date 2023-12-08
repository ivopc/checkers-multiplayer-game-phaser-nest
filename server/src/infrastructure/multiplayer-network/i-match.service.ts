export default abstract class IMatchService {
    abstract matches: Map<string, any>;

    abstract create(player: any);

    abstract findWaitingMatch();
    
    abstract matchMaking(playerId: string);
};