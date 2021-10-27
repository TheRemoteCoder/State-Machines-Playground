/**
 * Showcase
 * - Context + Reduce
 * - Commands + Data (empty)
 *
 * Hint: guard() is best good to use with immediate(),
 * to determine which (of multiple) states to apply.
 *
 * @see https://thisrobot.life/api/transition.html - Transition order with guard
 * @see https://thisrobot.life/api/interpret.html
 */

import {
  createMachine,
  interpret,
  guard,
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
  console.log(newContext)

  return newContext
}

// ------------------------------------------------------------------------------------------ Guards

function guardCanUpdate (ctx) {
  const canUpdate = (ctx.shieldUses > 0)

  console.warn('> guardCanUpdate()')
  console.log(ctx, canUpdate)

  return canUpdate
}


// ----------------------------------------------------------------------------------------- Machine

// Shorthand notation to return object
const machineContext = (initialContext) => ({
  shieldUses: initialContext.shieldUses
})

/**
 * - Guards will always be called first (before reduce) - if defined
 * - If Guard fails, the state is kept and won't change
 *
 * example: state(
 *    immediate('state1', guard(canDoX)), immediate('state2')
 *  )
 */
const machine = createMachine({
  off: state(
    transition('toggle', 'on',
      guard(guardCanUpdate),
      // Shorthand notation to return object
      // reduce((ctx, action) => ({ ...ctx, users: ev.data })))
      reduce((ctx, action) => {
        const newContext = getUpdatedContext(ctx)

        console.warn('> transition() - reduce()')
        console.log(action, ctx, newContext)

        return newContext
      }),
    ),
    transition('toggle', 'finished'),
    transition('dissolve', 'finished'),
  ),
  on: state(
    transition('toggle', 'off'),
  ),
  finished: final()
}, machineContext)


// ----------------------------------------------------------------------------------------- Service

const service = interpret(machine, () => {
  console.warn('> interpret()')
  console.log('machineContext', machineContext)

  view()
}, initialContext)


// --------------------------------------------------------------------------------------- Functions

function command (action /* , data */) {
  console.warn('#### command()')
  console.log(action)

  // service.send(action, data)
  service.send(action)
}

function view () {
  const details = {
    current: service.machine.current,
    state: service.machine.state,
  }

  console.warn('### view()')
  console.log(details)
}


// --------------------------------------------------------------------------------------------- Run

view()

command('toggle')    // On
command('xxx')       // Nothing happens
command('dissolve') // Works only under 'Off'
command('toggle')    // Off
command('toggle')   // Finished
command('toggle')   // (Finished)
