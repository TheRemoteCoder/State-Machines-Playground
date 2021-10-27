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
  idle: state(
    transition('toggle', 'finished',
      reduce((ctx, ev) => {
        console.warn('> innerMachine: transition() - reduce()')
        return ctx
      })
    )
  ),
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
        console.warn('> outerMachine: transition() - reduce()')
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

// Might not be needed, but seems better for debugging
const innerService = interpret(innerMachine, () => {
  console.warn('> innerMachine: interpret()')
  console.log('innerMachine', innerMachine)

  view()
})

const service = interpret(outerMachine, (innerService) => {
  console.warn('> outerMachine: interpret()')
  console.log('service', service)
  console.log('innerService', innerService)

  // ???
  // if(service === innerService) {}

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

console.log('service.child', service.child) // {machine ...}
// service.child.send('toggle') // On -> Finished (dynamic, but might be less obvious)
innerService.send('toggle')     // On -> Finished (static/hardcoded, but more clear)
console.log('service.child', service.child) // undefined

command('toggle') // On
command('toggle') // Off
