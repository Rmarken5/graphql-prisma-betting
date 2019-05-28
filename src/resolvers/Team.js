

function homeGames(root, args, context){
    console.log('homeTeam');
    return context.prisma.team({id: root.id}).homeGames();
}

function awayGames(root, args, context){
    console.log('awayTeam')
    return context.prisma.team({id: root.id}).awayGames();
}

module.exports = {
    homeGames,
    awayGames,
}