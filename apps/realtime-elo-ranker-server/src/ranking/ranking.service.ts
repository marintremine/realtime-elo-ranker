import { Injectable } from '@nestjs/common';
import { PlayerService } from 'src/player/player.service';

@Injectable()
export class RankingService {
    constructor(public readonly playerService: PlayerService) {
        
    }

    getRanking() {
        return this.playerService.getPlayers();
    }


}
