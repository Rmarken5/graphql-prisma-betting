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

    Promise.all([getTeamId(args.homeTeamName, context), getTeamId(args.awayTeamName, context), getSportIdByValue(args.sportName, context)]).then(values => {

        let [homeTeam, awayTeam, sport] = values;

        console.log(sport[0].id);
        return context.prisma.createGame({
            homeTeam: {
                connect: {
                    id: homeTeam[0].id
                }
            },
            awayTeam: {
                connect: {
                    id: awayTeam[0].id
                }
            },
            gameTime: 15590883,
            sport: {
                connect: {
                    id: sport[0].id
                }
            },

        });

    });


}

async function createOdd(root, args, context) {
    try {
        const gameID = await getGameId(args.homeTeamName, args.awayTeamName, args.gameTime, context);
        console.log('gameID: ', gameID[0].id);
        return context.prisma.createOdd({
            game: {
                connect: {
                    id: gameID[0].id
                }
            },
            moneyLine: args.moneyLine,
            runLineOdds: args.runLineOdds,
            runLineRuns: args.runLineRuns,
            overUnderOdds: args.overUnderOdds,
            overUnderRuns: args.overUnderRuns,
            timeOfOdds: 15590883,
        })
    } catch (Err) {
        console.log('err: ', Err);
    }
}

function getTeamId(teamName, context) {

    let team = context.prisma.teams({
        where: {
            teamName: teamName
        }
    });

    return team;

}

async function getGameId(homeTeamName, awayTeamName, gameTime, context) {
    console.log('Im called');

    let [homeTeam, awayTeam] = await Promise.all([getTeamId(homeTeamName, context), getTeamId(awayTeamName, context)])
    console.log("homeTeam: ", homeTeam);
    console.log('AwayTeam: ', awayTeam);
    return context.prisma.games({ //Refactor this to use query.
        where: {
            homeTeam: {
                id: "cjw5sddkqgh7y0b61ygjetbuz"
            },
            awayTeam: {
                id: "cjw5sf555ravg0b05vjq5kt6p"
            },
            gameTime: 15590883
        }
    });

}

function createWager(root, args, context) {

    return context.prisma.createWager({
        ledger: {
            connect: args.ledgerId
        },
        odds: {
            connect: getOddsId(getGameId(args.homeTeamName, args.awayTeamName, args.gameTime), args.timeOfOdds, context)
        },
        oddsType: {
            connect: getOddsTypeId(args.oddsType)
        },
        pickedOverUnder: {
            connect: getOverUnderIdByValue(args.overUnder)
        },
        pickedTeamId: {
            connect: args.pickedTeamId
        },
    });
}

async function createLedger(root, args, context) {

    return context.prisma.createLedger({
        amountWagered: args.amountWagered,
        entryTime: 15590883,
        wagerType: { connect: { id: await getWagerTypeIdByValue(args.wagerType, context) }} ,
        user: { connect: { id: await getUserIdByUserName(args.userId, context)}},
        outcome: {connect : { id : await getOutcomeIdByOutcome('pending', context)}},
    });

}

function updateLedger(root, args, context) {
    return context.prisma.updateLedger({
        data: {
            collected: args.collected,
            payout: args.payout,
            outcome: {
                connect: getOutcomeTypeIdByValue(args.outcome)
            },
        },
        where: {
            id: args.id
        },
    });
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
            oddsType: oddsType
        }
    })[0].id;
}

function getOverUnderIdByValue(value, context) {
    return context.prisma.overUnders({
        where: {
            overUnder: value
        }
    })[0].id;
}

async function getWagerTypeIdByValue(value, context) {
    let wagerType = await context.prisma.wagerTypes({
        where: {
            wagerType: value,
        }
    });
    return wagerType[0].id;
}

async function getUserIdByUserName(userName, context){
    let userId = await context.prisma.users({
        where: {
            userName: userName
        }
    });
    return userId[0].id;
}

async function getOutcomeIdByOutcome(outcome, context){
    let outcomeId = await context.prisma.outcomes({
        where: {
            outcome: outcome
        }
    });
    return outcomeId[0].id;
}

function getOutcomeTypeIdByValue(value, context) {
    return context.prisma.outcomeTypes({
        where: {
            outcome: value,
        }
    })
}

function getSportIdByValue(value, context) {
    return context.prisma.sports({
        where: {
            sportName: value,
        }
    });
}



module.exports = {
    createUser,
    createOverUnder,
    createGame,
    createLedger,
    createOdd,
    createOddsType,
    createOutcome,
    createSport,
    createTeam,
    createWager,
    createWagerType,
    updateLedger,
}