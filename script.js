function calculate (x) {
  if (!x.deckSize || !x.targetsPlayed || !x.cardsDrawn)
    return 'Complete the form :('
  if (x.targetsPlayed > x.deckSize || x.cardsDrawn > x.deckSize)
    return 'Logical fallacy detected. Git gud'
 
  x.deckSize -= Number(x.upstart)

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

  return (Math.round(sumP * 10000) / 100) + '%'
}

(function () {
  document.getElementById('calc').addEventListener('click', event => {
    const params = {
      upstart: document.getElementById('upstart').value === 'yes',
      cardsDrawn: Number(document.getElementById('draws').value),
      targetsPlayed: Number(document.getElementById('played').value),
      deckSize: Number(document.getElementById('deck').value)
    }

    document.getElementById('yugioh').textContent = calculate(params)
  })
})()

