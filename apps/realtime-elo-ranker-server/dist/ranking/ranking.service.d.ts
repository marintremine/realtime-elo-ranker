import { PlayerService } from 'src/player/player.service';
export declare class RankingService {
    readonly playerService: PlayerService;
    constructor(playerService: PlayerService);
    getRanking(): Promise<import("../player/player.entity").Player[]>;
}
