async function newUserFeed(root,args, context){

   const sub = await context.prisma.$subscribe.user({mutation_in: ['CREATED']}).node();

   const count = await context.prisma.usersConnection().aggregate().count();

   return {
       sub,
       count,
   }


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