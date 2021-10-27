/**
 * Showcase
 * - Final state (Idea: Remove feature fully on command)
 */

import {
  createMachine,
  interpret,
  state,
  state as final,
  transition
  } from '/node_modules/robot3/machine.js'



// ----------------------------------------------------------------------------------------- Machine

const machine = createMachine({
  off: state(
    transition('toggle', 'on'),
    transition('dissolve', 'finished'),
  ),
  on: state(
    transition('toggle', 'off'),
  ),
  finished: final()
})


// ----------------------------------------------------------------------------------------- Service

const service = interpret(machine, () => {
  console.warn('> interpret()')
})


// --------------------------------------------------------------------------------------- Functions

function command (action) {
  console.warn('## command()')
  console.log(action)

  service.send(action)
}

function view () {
  const details = {
    current: service.machine.current,
    state: service.machine.state,
  }

  console.warn('## view()')
  console.log(details)
}


// --------------------------------------------------------------------------------------------- Run

view()

command('toggle')   // On
command('toggle')   // Off
command('dissolve') // Finished
command('toggle')   // Finished (ignored)
