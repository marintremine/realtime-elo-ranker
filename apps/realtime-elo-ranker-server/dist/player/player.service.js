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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlayerService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const player_entity_1 = require("./player.entity");
const event_emitter_1 = require("@nestjs/event-emitter");
let PlayerService = class PlayerService {
    constructor(playersRepository, eventEmitter) {
        this.playersRepository = playersRepository;
        this.eventEmitter = eventEmitter;
    }
    findAll() {
        return this.playersRepository.find();
    }
    findOne(playerId) {
        return this.playersRepository.findOneBy({ playerId });
    }
    findOneById(id) {
        return this.playersRepository.findOneBy({ id });
    }
    async remove(playerId) {
        await this.playersRepository.delete(playerId);
    }
    async addPlayer(id, rank) {
        const player = this.playersRepository.create({ id, rank });
        await this.playersRepository.save(player);
        this.emitRankingUpdate(player);
        return player;
    }
    async updatePlayer(playerId, rank) {
        const player = await this.findOne(playerId);
        if (!player) {
            throw new Error('Player not found');
        }
        player.rank = rank;
        await this.playersRepository.save(player);
        this.emitRankingUpdate(player);
        return player;
    }
    async getPlayers() {
        return this.playersRepository.find();
    }
    getEmitter() {
        return this.eventEmitter;
    }
    emitRankingUpdate(player) {
        this.eventEmitter.emit('ranking.update', player);
    }
};
exports.PlayerService = PlayerService;
exports.PlayerService = PlayerService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(player_entity_1.Player)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        event_emitter_1.EventEmitter2])
], PlayerService);
//# sourceMappingURL=player.service.js.map