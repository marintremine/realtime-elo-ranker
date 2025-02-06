import { MatchService } from './match.service';
export declare class MatchController {
    private readonly matchService;
    constructor(matchService: MatchService);
    publishMatchResult(winner: string, loser: string, draw: boolean): Promise<void>;
}
