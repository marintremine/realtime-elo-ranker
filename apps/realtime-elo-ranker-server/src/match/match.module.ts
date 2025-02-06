import { Module } from '@nestjs/common';
import { MatchController } from './match.controller';
import { MatchService } from './match.service';
import { PlayerModule } from 'src/player/player.module';

@Module({
    imports: [PlayerModule],
    controllers: [MatchController],
    providers: [MatchService],
    exports: [MatchService],

})
export class MatchModule { }
