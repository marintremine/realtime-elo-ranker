import { RankingService } from './ranking.service';
import { Observable } from 'rxjs';
export declare class RankingController {
    private readonly rankingService;
    constructor(rankingService: RankingService);
    getRanking(): Promise<import("../player/player.entity").Player[]>;
    getRankingEvents(): Observable<MessageEvent>;
}
