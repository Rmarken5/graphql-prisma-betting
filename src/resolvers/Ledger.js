function user(root, args, context){
    console.log("user");
    return context.prisma.ledger({id: root.id}).user();
}

function wagerType(root, args, context){
    console.log("wagerType");
    return context.prisma.ledger({id: root.id}).wagerType();
}

function outcome(root, args, context){
    console.log("outcome");
    return context.prisma.ledger({id: root.id}).wagerType();
}


module.exports = {
    user,
    wagerType,
    outcome,
}