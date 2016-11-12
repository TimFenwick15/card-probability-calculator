function resolve(x) {
  if (x.constructor !== Array)
    x = [x]

  let err = new Set
  x.forEach(_ => {
    if (!_.deckSize || !_.targetsPlayed || !_.cardsDrawn)
      err.add('Complete the form :(')
    if (_.targetsPlayed > _.deckSize || _.cardsDrawn > _.deckSize)
      err.add('Logical fallacy detected. Git gud')
  })
  if (err.size)
    return [...err.values()]

  return (Math.round(calculateMultipleProbability(x) * 10000) /100) + '%'
}



(function () {
  document.getElementById('calc').addEventListener('click', event => {
    const params = {
      /* Will be added later
      upstart: document.getElementById('upstart').value === 'yes',
      */
      cardsDrawn: Number(document.getElementById('draws').value),
      targetsPlayed: Number(document.getElementById('played').value),
      deckSize: Number(document.getElementById('deckSize').value)
    }

    document.getElementById('results')
      .getElementsByTagName('p')[0]
      .textContent = resolve(params)
  })
})()

