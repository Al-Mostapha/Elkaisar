class LWUArmyCapital {

    async getDomimnant(xCoord, yCoord) {
        const Unit = Elkaisar.World.getUnit(xCoord, yCoord);

        if (!ELip.LWorldUnit.isArmyCapital(Unit.ut))
            return -1;
        let LastDominant =  await  Elkaisar.DB.ASelectFrom("id_dominant", 
        "world_unit_rank", "x = ? AND y = ? ORDER BY id_round DESC LIMIT 1",
        [xCoord, yCoord]);
        
        if(!LastDominant.length)
            return LastDominant[0].id_dominant;
        
        return 0;
    }
    
    
    async canDefend(idPlayer, xCoord, yCoord){
        
        const idDomin = this.getDomimnant(xCoord, yCoord);
        if(idDomin != idPlayer)
            return false;
        if( idDomin < 0)
            return false;
        return true;
    }
    
    async canAttack(idPlayer, xCoord, yCoord){
        
    }
    
    

}


module.exports = LWUArmyCapital;
