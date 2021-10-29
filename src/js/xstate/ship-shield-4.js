/**
 * Showcase
 * - Context + Reduce
 * - Commands + Data (empty)
 */

const { createMachine, actions, interpret } = window.XState;


// ----------------------------------------------------------------------------------------- Machine

const machine = createMachine({
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
      console.log(state)
      console.log(state.matches('off'))
    }
  )
  .start()


// --------------------------------------------------------------------------------------------- Run

service.send('TOGGLE') // Off -> On
service.send('TOGGLE') // On -> Exit

