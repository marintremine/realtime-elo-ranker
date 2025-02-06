import { Body, Controller, Post } from '@nestjs/common';
import { MatchService } from './match.service';

@Controller('match')
export class MatchController {
    constructor(private readonly matchService: MatchService) {
    }

    @Post()
    publishMatchResult(@Body('winner') winner: string, @Body('loser') loser: string, @Body('draw') draw: boolean) {
        console.log('winner', winner);
        console.log('loser', loser);
        console.log('draw', draw);
        if (draw) {
            return this.matchService.recordDraw(winner, loser);
        } else {
            return this.matchService.recordMatchResult(winner, loser);
        }
    }
}
