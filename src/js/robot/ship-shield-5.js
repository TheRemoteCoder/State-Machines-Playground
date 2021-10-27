/**
 * Showcase
 * - Parallel states - invoke()
 * - Side effects - action()
 *
 * @see https://thisrobot.life/api/invoke.html
 * @see https://thisrobot.life/api/action.html
 */

import {
  action,
  createMachine,
  interpret,
  invoke,
  reduce,
  state,
  state as final,
  transition
  } from '/node_modules/robot3/machine.js'


// ------------------------------------------------------------------------------------ Side effects

// Do something with context or completely outside
function sideEffect(ctx) {
  console.warn('> sideEffect()')
  console.log(ctx)
}

// Promise returns will automatically trigger 'done' or 'error' state transitions from the service.
// Alternatively, you can use another machine (from createMachine) here.
const getDataFromPromiseOrOtherMachine = () =>
  /** / Promise.reject({ exampleData: true }) /**/
  /**/ Promise.resolve({ exampleData: true }) /**/


// ---------------------------------------------------------------------------------------- Machines

// Mini demo machine for nested/dependent state
const innerMachine = createMachine({
  off: state(transition('toggle', 'on')),
  on: state(transition('toggle', 'off')),
  finished: final()
})

// Side note: invoke() can use features of state() - e.g. immediate()
const outerMachine = createMachine({
  off: state(
    transition('toggle', 'loading',
      action(sideEffect)
    ),
  ),
  loading: invoke(
    innerMachine,
    //getDataFromPromiseOrOtherMachine,
    transition('done', 'on',
      reduce((ctx, ev) => {
        console.warn('> transition() - reduce()')
        // console.log(ctx)
        return ctx
      })
    ),
    transition('error', 'error'),
  ),
  on: state(
    transition('toggle', 'off'),
  ),
  error: state()
})


// ----------------------------------------------------------------------------------------- Service

const service = interpret(outerMachine, (innerService) => {
  console.warn('> interpret()')
  console.log('innerService', innerService)

  view()
})


// --------------------------------------------------------------------------------------- Functions

function command (action) {
  console.warn('#### command()')
  console.log(action)

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

command('toggle') // On
// command('toggle') // Off
