/**
 * Showcase
 * - Parallel states - invoke()
 */

import {
  createMachine,
  interpret,
  invoke,
  state,
  state as final,
  transition
  } from '/node_modules/robot3/machine.js'


// ----------------------------------------------------------------------------------------- Machine

const machine = createMachine({
  off: state(
    transition('toggle', 'on'),
  ),
  on: state(
    transition('toggle', 'off'),
  ),
})


// ----------------------------------------------------------------------------------------- Service

const service = interpret(machine, () => {
  console.warn('> interpret()')

  view()
})


// --------------------------------------------------------------------------------------- Functions

function command (action) {
  console.warn('## command()')
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

command('toggle') // On
command('toggle') // Off
