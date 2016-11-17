'use strict'

function calculateSingleProbability(x) {
  let multipleP
  let sumP = 0
  for (let i = 0; i < x.cardsDrawn; i++) {
    multipleP = x.targetsPlayed / (x.deckSize - i)
    for (let j = 0; j < i; j++)
      multipleP *= (x.deckSize - j - x.targetsPlayed) / (x.deckSize - j)
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
  return P
}



function modifiers(x) {
  x.deckSize -= x.upstart
  if (!x.desires)
    return calculateMultipleProbability(x)

  const pDrawDesires = calculateSingleProbability({
    cardsDrawn: x.cardsDrawn,
    deckSize: x.deckSize,
    targetsPlayed: 3
  })
 
  const pDrawTarget = calculateMultipleProbability(x)

  const pDrawTargetPlus2 =  calculateMultipleProbability({
    cardsDrawn: x.cardsDrawn + 2,
    deckSize: x.deckSize,
    targetsPlayed: x.targetsPlayed
  })

  console.log(x.targetsPlayed, Array(x.targetsPlayed[0]).fill(1))

  const pKill = calculateMultipleProbability({
    cardsDrawn: 10,
    deckSize: x.deckSize - x.cardsDrawn,
    targetsPlayed: Array(x.targetsPlayed[0]).fill(1)
  })

  console.log({pDrawDesires, pDrawTarget, pDrawTargetPlus2, pKill})

  return pDrawTarget +
    pDrawDesires * pDrawTargetPlus2 -
    pKill

}

/*
possible actions:
- draw
- reduce deck - useful
- reduce deck - risk
- add to hand
* requirement before and after
* once or multiple per turn

desires needs to
- prob of drawing depending on number played
- reduce deck 10 - risk
- draw 2 (x.cardsDrawn++)
*/



