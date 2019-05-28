function games(root, args, context){
    console.log('Inside of sport');
    return context.prisma.sport({id: root.id}).games();
}

module.exports = {
    games
}