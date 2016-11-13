/*
 * Write any results requested
 */
function resolve(x) {
  //let err = new Set
  // check this
  //const targets = x.targetsPlayed.reduce((total, num) => total + num)

  /*x.forEach(_ => {
    if (!_.deckSize || !_.targetsPlayed || !_.cardsDrawn)
      err.add('Complete the form :(')
    if (_.targetsPlayed > _.deckSize || _.cardsDrawn > _.deckSize)
      err.add('Logical fallacy detected. Git gud')
  })
  if (err.size)
    return [...err.values()]*/
  if (x.targetsPlayed.constructor !== Array)
    x.targetsPlayed = [x.targetsPlayed]
  return (Math.round(calculateMultipleProbability(x) * 10000) /100) + '%'
}


/*
 * Event Handlers
 */
(function () {
  // Handle the submit button
  document.getElementById('calc').addEventListener('click', event => {
    const params = {
      cardsDrawn: Number(document.getElementById('draws').value),
      deckSize: Number(document.getElementById('deckSize').value),
      targetsPlayed: Array.from(document.querySelectorAll('#targetInputs'))
        .map(_ => Number(_.value))
    }

    document.getElementById('results')
      .getElementsByTagName('p')[0]
      .textContent = resolve(params)
  })

  // Handle the add new target button
  document.getElementById('addTarget').addEventListener('click', event => {
    const newP = document.createElement('p')
    newP.innerHTML = 'Number of Targets Played : '
    const newInput = document.createElement('input')
    newInput.id = 'targetInputs'
    newInput.type = 'number'
    newInput.value = ''
    newP.appendChild(newInput)
    document.getElementById('targetP').appendChild(newP)
  })
})()


