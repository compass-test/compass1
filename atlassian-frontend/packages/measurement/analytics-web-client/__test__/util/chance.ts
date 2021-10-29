import { Chance } from 'chance';

export default function generateChance(
  testClass: string,
  seed?: string,
): Chance.Chance {
  const randomSeed = seed || createRandomNumber();
  // eslint-disable-next-line no-console
  console.log(`Generating random seed for ${testClass}: ${randomSeed}`);
  const chance = new Chance(randomSeed);
  return chance;
}

const createRandomNumber = (): string => {
  const num = Math.random() + 1; // +1 because Dave is paranoid about falsey destroying everything
  // Using precision so console log doesnt cut off some values
  return Number(num.toPrecision(12)).toString();
};