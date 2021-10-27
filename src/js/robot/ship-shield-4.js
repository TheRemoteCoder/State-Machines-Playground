/**
 * Showcase
 * - Context + Reduce
 * - Commands + Data (empty)
 *
 * @see https://thisrobot.life/api/interpret.html
 */

import {
  createMachine,
  interpret,
  reduce,
  state,
  state as final,
  transition
  } from '/node_modules/robot3/machine.js'


// --------------------------------------------------------------------------------------- Constants

const initialContext = {
  shieldUses: 1, // ^= Uses possible
}


// ----------------------------------------------------------------------------------------- Context

function getUpdatedContext (ctx) {
  const newContext = {
    ...ctx,
    shieldUses: ctx.shieldUses - 1
  }

  console.warn('> updateContext()')

  return newContext
}


// ----------------------------------------------------------------------------------------- Machine

// Shorthand notation to return object
const machineContext = (initialContext) => ({
  shieldUses: initialContext.shieldUses
})

const machine = createMachine({
  off: state(
    transition('toggle', 'on',
      // Shorthand notation to return object
      // reduce((ctx, action) => ({ ...ctx, users: ev.data })))
      reduce((ctx, action) => {
        const newContext = getUpdatedContext(ctx)

        console.warn('> transition() - reduce()')
        console.log(action, ctx, newContext)

        return newContext
      })
    )
    //transition('dissolve', 'finished'),
  ),
  on: state(
    transition('toggle', 'off'),
  ),
  //finished: final()
}, machineContext)


// ----------------------------------------------------------------------------------------- Service

const service = interpret(machine, () => {
  console.warn('> interpret()')
  console.log('initialContext', initialContext)
  console.log('machineContext', machineContext)

  initialContext.shieldUses = 100
  machineContext.shieldUses = 50

  view()
}, initialContext)


// --------------------------------------------------------------------------------------- Functions

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
