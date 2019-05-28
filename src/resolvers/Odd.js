function game(root, args, context){
    console.log("game");

    return context.prisma.odd({id: root.id}).game();
    
}

module.exports = {
    game,
    
}