import { Body, Controller, Post } from '@nestjs/common';
import { PlayerService } from './player.service';

@Controller('player')
export class PlayerController {
    constructor(private readonly playerService: PlayerService) {
        
    }

    @Post()
    async addPlayer(@Body('id') id: string) {
        await this.playerService.addPlayer(id, 1000);
    }
}
