"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
class LWUArmyCapital {
    getDomimnant(xCoord, yCoord) {
        return __awaiter(this, void 0, void 0, function* () {
            const Unit = Elkaisar.World.getUnit(xCoord, yCoord);
            if (!ELip.LWorldUnit.isArmyCapital(Unit.ut))
                return -1;
            let LastDominant = yield Elkaisar.DB.ASelectFrom("id_dominant", "world_unit_rank", "x = ? AND y = ? ORDER BY id_round DESC LIMIT 1", [xCoord, yCoord]);
            if (!LastDominant.length)
                return LastDominant[0].id_dominant;
            return 0;
        });
    }
    canDefend(idPlayer, xCoord, yCoord) {
        return __awaiter(this, void 0, void 0, function* () {
            const idDomin = this.getDomimnant(xCoord, yCoord);
            if (idDomin != idPlayer)
                return false;
            if (idDomin < 0)
                return false;
            return true;
        });
    }
    canAttack(idPlayer, xCoord, yCoord) {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
}
module.exports = LWUArmyCapital;
