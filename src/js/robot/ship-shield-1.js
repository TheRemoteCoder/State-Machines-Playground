/**
 * Showcase
 * - Simple boolean on/off machine (infinite)
 */

import { 
  createMachine, 
  interpret, 
  state, 
  transition
  } from '/node_modules/robot3/machine.js'


// ----------------------------------------------------------------------------------------- Machine

// 1st listed state = Initial/Default state
const machine = createMachine({
  off: state(
    transition('toggle', 'on')
  ),
  on: state(
    transition('toggle', 'off')
  )
})


// ----------------------------------------------------------------------------------------- Service

const service = interpret(machine, () => {
  console.warn('> interpret()')

  view()
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
command('toggle') // On

