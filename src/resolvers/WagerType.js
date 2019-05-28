function ledgers(root, args, context){
    console.log('Ledgers');
    return context.prisma.wagerType({id: root.id}).ledgers();
}

module.exports = {
    ledgers,
}