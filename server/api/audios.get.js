import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default defineEventHandler((event) => {
  const { category } = getQuery(event);
  const { price } = getQuery(event);
  const { processing } = getQuery(event);

  let filters = {};

  switch (category) {
    case "sound-effects":
      filters.category = "sound-effects";
      break;
    case "environmental-sounds":
      filters.category = "environmental-sounds";
      break;
    case "ui-sounds":
      filters.category = "ui-sounds";
      break;
    case "foley-sounds":
      filters.category = "foley-sounds";
      break;
    case "dialogue":
      filters.category = "dialogue";
      break;
    case "soundscapes":
      filters.category = "soundscapes";
      break;
  }

  switch (processing) {
    case "raw":
      filters.processing = "raw";
      break;
    case "edited":
      filters.processing = "edited";
      break;
    case "mastered":
      filters.processing = "mastered";
      break;
  }

  switch (price) {
    case "0-3":
      filters.price = {
        gte: 0,
        lte: 3,
      };
      break;
    case "4-10":
      filters.price = {
        gte: 4,
        lte: 10,
      };
      break;
    case "11-20":
      filters.price = {
        gte: 11,
        lte: 20,
      };
      break;
    case "21>":
      filters.price = {
        gte: 21,
        lte: 5000,
      };
      break;
  }

  //database event
  return prisma.AudioListings.findMany({
    take: 6,
    where: filters,
  });
});
