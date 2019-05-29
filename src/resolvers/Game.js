function awayTeam(root, args, context) {
    console.log('away')
    return context.prisma.game({
        id: root.id
    }).awayTeam();
}

function homeTeam(root, args, context) {
    console.log('home')
    return context.prisma.game({
        id: root.id
    }).homeTeam();
}

function odds(root, args, context) {
    console.log('odds');
    return context.prisma.game({
        id: root.id
    }).odds();
}

function sport(root, args, context){
    return context.prisma.game({
        id: root.id
    }).sport();
}

module.exports = {
    awayTeam,
    homeTeam,
    odds,
    sport,
}