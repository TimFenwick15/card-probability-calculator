const deckSize = 40
const cardsToDraw = 5
const targetsPlayed = 3

const makeRandom = n => Math.floor( Math.random() * 40 )

const runSimulation = () => {

  const randomNumbers = new Set()

  while (randomNumbers.size < cardsToDraw)
    randomNumbers.add(makeRandom(deckSize))

  const setIterator = randomNumbers.values()

  for (let i = 0; i < randomNumbers.size; i++)
    if (setIterator.next().value < targetsPlayed)
      return true
  return false
}

let trues = 0
let falses = 0

console.time("me");
for (let i = 0; i < 100000; i++)
  runSimulation() ? trues++ : falses++
console.timeEnd("me");

console.log( `${trues} / ${trues + falses} = ${trues / (trues + falses)}` )


// desires


const deck = {
  size: 40,
  targets: 3,
  draw: 5
};

const runDesiresSimulation = deck => {

  const randomNumbers = new Set()

  while (randomNumbers.size < cardsToDraw)
    randomNumbers.add(makeRandom(deckSize))

  const setIterator = randomNumbers.values()

  for (let i = 0; i < randomNumbers.size; i++)
    if (setIterator.next().value < targetsPlayed)
      return true
  return false
}
