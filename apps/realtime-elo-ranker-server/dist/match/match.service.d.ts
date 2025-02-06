import { PlayerService } from 'src/player/player.service';
export declare class MatchService {
    private readonly playerService;
    constructor(playerService: PlayerService);
    private calculateWinProbability;
    private calculateNewRating;
    recordDraw(playerA: string, playerB: string): Promise<void>;
    recordMatchResult(winner: string, loser: string): Promise<void>;
}
