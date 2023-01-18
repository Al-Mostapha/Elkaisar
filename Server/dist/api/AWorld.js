"use strict";
class AWorld {
    constructor(idPlayer, Url) {
        this.Parm = Url;
        this.idPlayer = idPlayer;
    }
    getWorldCity() {
        return Elkaisar.AllWorldCity;
    }
}
module.exports = AWorld;
