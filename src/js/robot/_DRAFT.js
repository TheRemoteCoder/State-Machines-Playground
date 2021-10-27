/**
 * Showcase
 * -
 */

import {
  createMachine,
  // guard,
  // immediate,
  interpret,
  // invoke,
  // reduce,
  state,
  state as final,
  transition
  } from '/node_modules/robot3/machine.js'


// --------------------------------------------------------------------------------------- Constants

/* * /
const initialContext = () => ({
  shieldUses: 2, // ^= Uses possible
})
/* */


// ----------------------------------------------------------------------------------------- Machine

/* * /
const machineContext = (initialContext) => ({
  shieldUses: initialContext.shieldUses
})
/* */

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
// }, machineContext)


// ----------------------------------------------------------------------------------------- Service

const service = interpret(machine, () => {
  console.warn('> interpret()')
  //console.log(initialContext)
  view()
})
// }, initialContext)


// --------------------------------------------------------------------------------------- Functions

/* * /
function updateContext (ctx, event) {
  const newContext = {
    ...ctx,
    shieldUses: ctx.shieldUses--
  }

  console.warn('> updateContext()')
  console.log(newContext, event)

  return newContext
}
/* */

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

command('toggle')   // On
command('toggle')   // Off
//command('dissolve') // Finished
//command('toggle')   // Finished (ignored)
