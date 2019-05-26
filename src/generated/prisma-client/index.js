"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var prisma_lib_1 = require("prisma-client-lib");
var typeDefs = require("./prisma-schema").typeDefs;

var models = [
  {
    name: "User",
    embedded: false
  },
  {
    name: "Ledger",
    embedded: false
  },
  {
    name: "Game",
    embedded: false
  },
  {
    name: "Odd",
    embedded: false
  },
  {
    name: "Wager",
    embedded: false
  },
  {
    name: "Outcome",
    embedded: false
  },
  {
    name: "OddsType",
    embedded: false
  },
  {
    name: "Sport",
    embedded: false
  },
  {
    name: "WagerType",
    embedded: false
  },
  {
    name: "Team",
    embedded: false
  },
  {
    name: "OverUnder",
    embedded: false
  }
];
exports.Prisma = prisma_lib_1.makePrismaClientClass({
  typeDefs,
  models,
  endpoint: `https://eu1.prisma.sh/ryan-marken-bde714/betting-graph-server/dev`
});
exports.prisma = new exports.Prisma();
