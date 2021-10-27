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

// Promise returns will automatically trigger 'done' or 'error' state transitions
// from the service
const loadTodos = () =>
  /** / Promise.reject({ exampleData: true }) /**/
  /**/ Promise.resolve({ exampleData: true }) /**/


// ----------------------------------------------------------------------------------------- Machine

const machine = createMachine({
  off: state(
    transition('toggle', 'loading',
      action(sideEffect)
    ),
  ),
  loading: invoke(
    loadTodos,
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

const service = interpret(machine, () => {
  console.warn('> interpret()')

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
