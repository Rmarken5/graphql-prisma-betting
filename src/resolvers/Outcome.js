function ledgers(root, args, context) {
    console.log('ledgers - outcome ');
    return context.prisma.outcome({id: root.id}).ledgers();
}