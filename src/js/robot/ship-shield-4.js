/**
 * Showcase
 * - Context + Reduce
 * - Commands + Data (empty)
 *
 * @see https://thisrobot.life/api/interpret.html
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

const initialContext = {
  shieldUses: 1, // ^= Uses possible
}


// ----------------------------------------------------------------------------------------- Machine

const machineContext = (initialContext) => {
  shieldUses: initialContext.shieldUses
}

const machine = createMachine({
  off: state(
    transition('toggle', 'on',
      reduce((ctx, ev) => {})
    ),
    //transition('dissolve', 'finished'),
  ),
  on: state(
    transition('toggle', 'off'),
  ),
  //finished: final()
})
// }, machineContext)


// ----------------------------------------------------------------------------------------- Service

const service = interpret(machine, () => {
  console.warn('> interpret()')
  console.log('initialContext', initialContext)
  console.log('machineContext', machineContext)
  
  initialContext.shieldUses = 100;
  machineContext.shieldUses = 50;
  
  view()
}, initialContext)


// --------------------------------------------------------------------------------------- Functions

/* * /
transition('start', 'working', 
  guard(canWork), 
  reduce(updateContext),
),

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

function command (action, data) {
  console.warn('## command()')
  console.log(action, data)
  service.send(action, data)
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

