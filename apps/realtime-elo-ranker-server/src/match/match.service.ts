import { Injectable } from '@nestjs/common';
import { PlayerService } from 'src/player/player.service';

@Injectable()
export class MatchService {

    constructor(private readonly playerService: PlayerService) {}

    private calculateWinProbability(ratingA: number, ratingB: number): number {
        return 1 / (1 + Math.pow(10, (ratingB - ratingA) / 400));
    }

    private calculateNewRating(oldRating: number, kFactor: number, actualScore: number, expectedScore: number): number {
        return Math.round(oldRating + kFactor * (actualScore - expectedScore));
    }

    async recordDraw(playerA: string, playerB: string) {

        
        const kFactor = 32;
        const playerAData = await this.playerService.findOneById(playerA);
        const playerBData = await this.playerService.findOneById(playerB);

        if (playerAData && playerBData) {
            const expectedScoreA = this.calculateWinProbability(playerAData.rank, playerBData.rank);
            const expectedScoreB = this.calculateWinProbability(playerBData.rank, playerAData.rank);

            const newRatingPlayerA = this.calculateNewRating(playerAData.rank, kFactor, 0.5, expectedScoreA);
            const newRatingPlayerB = this.calculateNewRating(playerBData.rank, kFactor, 0.5, expectedScoreB);

            this.playerService.updatePlayer(playerAData.playerId, newRatingPlayerA);
            this.playerService.updatePlayer(playerBData.playerId, newRatingPlayerB);
        }
    }

    async recordMatchResult(winner: string, loser: string) {

        console.log('ok');
        const kFactor = 32;

        const winnerData = await this.playerService.findOneById(winner);
        const loserData = await this.playerService.findOneById(loser);

        if (winnerData && loserData) {
            const expectedScoreWinner = this.calculateWinProbability(winnerData.rank, loserData.rank);
            const expectedScoreLoser = this.calculateWinProbability(loserData.rank, winnerData.rank);

            const newWinnerrank = this.calculateNewRating(winnerData.rank, kFactor, 1, expectedScoreWinner);
            const newLoserrank = this.calculateNewRating(loserData.rank, kFactor, 0, expectedScoreLoser);

            this.playerService.updatePlayer(winnerData.playerId, newWinnerrank);
            this.playerService.updatePlayer(loserData.playerId, newLoserrank);
        }
    }
    
}
