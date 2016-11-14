'use strict'

function factorial (x) {
  if (x === 0)
    return 1
  return x * factorial (x - 1)
}



function calculateSingleProbability (x) {
  let sumP = 0
  for (let i = 0; i < x.cardsDrawn; i++) {
    let multipleP = 1
    for (let j = 0; j < i; j++) {
      multipleP *= (x.deckSize - x.targetsPlayed) / x.deckSize
      x.deckSize--
    }
    multipleP *= x.targetsPlayed / x.deckSize
    sumP += multipleP
  }

  return sumP
}



function calculateMultipleProbability (x) {
  let P = 1
  for (let i = 0; i < x.targetsPlayed.length; i++) {
    P *= calculateSingleProbability({
      cardsDrawn: x.cardsDrawn,
      deckSize: x.deckSize,
      targetsPlayed: x.targetsPlayed[i]
    })
  }
  return factorial(x.targetsPlayed.length) * P
}
