/**
 * Showcase
 * - Final state (Idea: Remove feature fully on command)
 *
 * @todo Add final() state
 */

const { createMachine, actions, interpret } = window.XState;


// ----------------------------------------------------------------------------------------- Machine

const machine = createMachine({
  // id : 'machine',
  initial : 'off',
  states: {
    off: { on: { TOGGLE: 'on' } },
    on: { on: { TOGGLE: 'off' } }
  }
})


// ----------------------------------------------------------------------------------------- Service

const service = interpret(machine)
  .onTransition((state) => {
  console.warn('# onTransition()')
    console.log(state.value)
  })
  .start()


// --------------------------------------------------------------------------------------------- Run

service.send('TOGGLE') // Off -> On
service.send('TOGGLE') // On -> Off
service.send('TOGGLE') // Off -> On
