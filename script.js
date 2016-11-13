/*
 * Write any results requested
 */
function resolve(x) {
  
  // this logic needs fixing.
  // x won't be an array, just targetsPlayed will be an array.
  // Every other property is the same for each run
  // This needs fixing in maths.js too because currently loops over x.length
  
  if (x.constructor !== Array)
    x = [x]

  let err = new Set
  x.forEach(_ => {
    if (!_.deckSize || /*!_.targetsPlayed ||*/ !_.cardsDrawn)
      err.add('Complete the form :(')
    if (/*_.targetsPlayed > _.deckSize ||*/ _.cardsDrawn > _.deckSize)
      err.add('Logical fallacy detected. Git gud')
  })
  if (err.size)
    return [...err.values()]

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


