async function newUserFeed(root, args, context) {

    return context.prisma.$subscribe.user({
        mutation_in: ['CREATED']
    }).node();


}

const usersFeed = {
    subscribe: newUserFeed,
    resolve: payload => {
        return payload
    },
}

module.exports = {
    usersFeed
}