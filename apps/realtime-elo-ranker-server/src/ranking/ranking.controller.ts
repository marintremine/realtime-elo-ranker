import { Controller, Get, Sse } from '@nestjs/common';
import { RankingService } from './ranking.service';
import { fromEvent, map, Observable } from 'rxjs';
import { Player } from 'src/interface/Player';

@Controller('ranking')
export class RankingController {
    constructor(private readonly rankingService: RankingService) {
    }
    @Get()
    getRanking() {
        return this.rankingService.getRanking();
    }

    @Sse('events')
    getRankingEvents(): Observable<MessageEvent> {
        return fromEvent(this.rankingService.playerService.getEmitter(), 'ranking.update').pipe(
            map((player: Player) => {
            return <MessageEvent>{
                data: {
                type: 'RankingUpdate',
                player: player,
                },
            };
            })
        );
    }

    
}
