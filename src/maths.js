'use strict'

const Deck = size => {

  const draw = () => size--;

  return {
    size,
    draw

  };
}

/*const ProbabilityMaths = () => {
  return {
    count: deck => deck.size
  }; 
}*/
const ProbabilityMaths = {}
ProbabilityMaths.count = deck => deck.size;

const d = Deck(40);

console.log( ProbabilityMaths.count(d) );
// js objects - these guys only need to be functions if I want a constructor
// probability maths can probably just be a namespace; deck will need a constructor so make it a function




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
    targetsPlayed: x.desires
  })
 
  const pDrawTarget = calculateMultipleProbability(x)

  const pDrawTargetPlus2 =  calculateMultipleProbability({
    cardsDrawn: x.cardsDrawn + 2,
    deckSize: x.deckSize,
    targetsPlayed: x.targetsPlayed
  })

  const pKill = calculateMultipleProbability({
    cardsDrawn: 10,
    deckSize: x.deckSize - x.cardsDrawn,
    targetsPlayed: Array(x.targetsPlayed[0]).fill(1)
  })

  return (
    pDrawTarget +
    (1 - pDrawTarget) * pDrawDesires * pDrawTargetPlus2 -
    pKill
  )
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



