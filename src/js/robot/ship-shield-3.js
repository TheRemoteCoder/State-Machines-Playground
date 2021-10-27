/**
 * Showcase
 * - Immediate state (set default)
 */

import {
  createMachine,
  immediate,
  interpret,
  state,
  state as final,
  transition
  } from '/node_modules/robot3/machine.js'


// ----------------------------------------------------------------------------------------- Machine

// 'idle' is 1st and initial/default, but switches immediately to another state.
// Usually this is used with guards + reducers and context?
const machine = createMachine({
  idle: state(
    immediate('on')
  ),
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

command('toggle') // On
command('toggle') // Off
