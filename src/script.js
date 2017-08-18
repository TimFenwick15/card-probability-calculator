'use strict'

/*
 * Write any results requested
 */
function resolve(x) {
  // Handle errors
  if (x.targetsPlayed.constructor !== Array)
    x.targetsPlayed = [x.targetsPlayed]
  const targets = x.targetsPlayed.reduce((total, num) => total + num)
  x.targetsPlayed = x.targetsPlayed.filter(_ => !!_)
  let err = ''
  if (!x.deckSize || !x.cardsDrawn || !x.targetsPlayed.length)
    err += 'Complete the form :('
  if (targets + x.cardsDrawn > x.deckSize)
    err += (err !== '' ? '<br>' : '') + 'Logical fallacy detected. Git gud'
  if (err.length)
    return err

  // temp initial modifiers code
  x.upstart = Number(document.getElementById('upstart').value)
  x.desires = Number(document.getElementById('desires').value)
  
  return (Math.round(calculateMultipleProbability(x) * 10000) / 100) + '%' +
    '<br>With modifiers :' + (Math.round(modifiers(x) * 10000) / 100) + '%'
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
      .innerHTML = resolve(params)
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


