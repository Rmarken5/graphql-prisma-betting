function ledgerEntries(root, args, context){
    console.log('ledgers');
    return context.prisma.user({ id: root.id}).ledgers();
}

module.exports = {
    ledgerEntries,
}