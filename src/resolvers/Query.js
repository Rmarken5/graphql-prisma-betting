

function ledgers(root, args, context) {
    return context.prisma.ledgers();
}

function ledgersAfterDateTime(root, args, context) {
    return context.prisma.ledgers({
        where: {
            entryTime_gte: args.dateTime
        }
    });
}

function ledgersBeforeDateTime(root, args, context) {
    return context.prisma.ledgers({
        where: {
            entryTime_lte: args.dateTime
        }
    });
}

function ledgersBetweenDateTime(root, args, context) {
    return context.prisma.ledgers({
        where: {
            AND: [{
                    entryTime_lte: args.endTime
                },
                {
                    entryTime_gte: args.beginTime
                }
            ]
        }
    });
}

function allUsers(root, args, context) {

    return context.prisma.users();
}

module.exports = {

    ledgers,
    ledgersAfterDateTime,
    ledgersBeforeDateTime,
    ledgersBetweenDateTime,
    allUsers,


}