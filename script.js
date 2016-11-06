function calculate (x) {
  if (!x.numberOfCards || ! x.cardsToDraw)
    return 'Complete the form :('
 
  x.deckSize -= Number(x.upstart)
  x.cardsToDraw += Number(x.goingSecond)

  let sumP = 0
  for (let i = 0; i < x.cardsToDraw; i++) {
    let multipleP = 1
    for (let j = 0; j < i; j++) {
      multipleP *= (x.deckSize - x.numberOfCards) / x.deckSize
      x.deckSize--
    }
    multipleP *= x.numberOfCards / x.deckSize
    sumP += multipleP
  }

  return (Math.round(sumP * 10000) / 100) + '%'
}

(function () {
  document.getElementById('calc').addEventListener('click', event => {
    const params = {
      upstart: document.getElementById('upstart').value === 'yes',
      goingSecond: document.getElementById('second').value === 'yes',
      numberOfCards: Number(document.getElementById('played').value),
      cardsToDraw: 5,
      deckSize: Number(document.getElementById('deck').value)
    }

    document.getElementById('yugioh').textContent = calculate(params)
  })
})()

