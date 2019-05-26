function createUser(root, args, context) {

    let user = context.prisma.createUser({
        userName: args.userName,
        firstName: args.firstName,
        lastName: args.lastName,
        email: args.email,
        phoneNumber: args.phoneNumber,
        password: args.password,
        balance: 0.0,
        userVerified: false,
    });
    return user;
}

function createOverUnder(root, args, context) {

    return context.prisma.createOverUnder({
        value: args.value,
        overUnder: args.overUnder,
    });
}

function createTeam(root, args, context) {

    return context.prisma.createTeam({
        teamName: args.teamName,
        city: args.city,
    });
}

function createWagerType(root, args, context) {

    return context.prisma.createWagerType({
        wagerType: args.wagerType,
    });
}

function createSport(root, args, context) {

    return context.prisma.createSport({
        sportName: args.sportName,
    });
}

function createOddsType(root, args, context) {

    return context.prisma.createOddsType({
        oddsType: args.oddsType,
    });
}

function createOutcome(root, args, context) {

    return context.prisma.createOutcome({
        outcome: args.outcome
    });
}

function createGame(root, args, context) {

    return context.prisma.createGame({
        homeTeam: {
            connect: context.prisma.teams({
                where: {
                    teamName: args.homeTeamName
                }
            })[0].id
        },
        awayTeam: {
            connect: context.prisma.teams({
                where: {
                    teamName: args.awayTeamName
                }
            })[0].id
        },
        gameTime: new Date(args.gameTime).getTime(),
        sport: {
            connect: args.sportName
        },

    });
}

function createOdd(root, args, context) {
    return context.prisma.createOdd({
        game: getGameId(args.homeTeamName, args.awayTeamName, args.gameTime, context),
        moneyLine: args.moneyLine,
        runLineOdds: args.runLineOdds,
        runLineRuns: args.runLineRuns,
        overUnderOdds: args.overUnderOdds,
        overUnderRuns: args.overUnderRuns,
        timeOfOdds: new Date().getTime(),
    })
}

function getTeamId(teamName, context) {

    return context.prisma.teams({
        where: {
            teamName: teamName
        }
    })[0].id;

}

function getGameId(homeTeamName, awayTeamName, gameTime, context) {
    return context.prisma.games({ //Refactor this to use query.
        where: {
            homeTeam: {
                connect: getTeamId(homeTeamName)
            },
            awayTeam: {
                connect: getTeamId(awayTeamName)
            },
            gameTime: new Date(gameTime).getTime(),
        }
    }).id;
}

function createWager(root, args, context) {

    return context.prisma.createWager({
        ledger: args.ledgerId,
        odds: getOddsId(getGameId(args.homeTeamName, args.awayTeamName, args.gameTime), args.timeOfOdds, context);
        oddsType: {
            connect: getOddsTypeId(args.oddsType)
        },
        //TODO: Finish This....
    })

}

function getOddsId(gameId, timeOfOdds, context) {
    return context.prisma.odds({
        where: {
            game: gameId,
            timeOfOdds: timeOfOdds
        }
    })[0].id;
}

function getOddsTypeId(oddsType, context) {
    return context.prisma.oddsType({
        where: {
            oddsType
        }
    });
}

module.exports = {
    createUser,
    createOverUnder,
}