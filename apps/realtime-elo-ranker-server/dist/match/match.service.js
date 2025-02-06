"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MatchService = void 0;
const common_1 = require("@nestjs/common");
const player_service_1 = require("../player/player.service");
let MatchService = class MatchService {
    constructor(playerService) {
        this.playerService = playerService;
    }
    calculateWinProbability(ratingA, ratingB) {
        return 1 / (1 + Math.pow(10, (ratingB - ratingA) / 400));
    }
    calculateNewRating(oldRating, kFactor, actualScore, expectedScore) {
        return Math.round(oldRating + kFactor * (actualScore - expectedScore));
    }
    async recordDraw(playerA, playerB) {
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
    async recordMatchResult(winner, loser) {
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
};
exports.MatchService = MatchService;
exports.MatchService = MatchService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [player_service_1.PlayerService])
], MatchService);
//# sourceMappingURL=match.service.js.map