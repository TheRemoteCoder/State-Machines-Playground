import { 
  createMachine, 
  guard, 
  immediate, 
  interpret, 
  invoke, 
  reduce,
  state, 
  transition
  } from '/node_modules/robot3/machine.js'


// --------------------------------------------------------------------------------------- Constants

const initialContext = () => ({
  shieldEnergy: 5, // ^= 5 uses possible
})


// ----------------------------------------------------------------------------------------- Machine

const machineContext = (initialContext) => ({
  shieldEnergy: initialContext.shieldEnergy
})

// 1st listed state = Initial/Default state
const machine = createMachine({
  off: state(
    transition('toggle', 'on')
  ),
  on: state(
    transition('toggle', 'off')
  )
}, )
// }, machineContext)


// ----------------------------------------------------------------------------------------- Service

const service = interpret(machine, () => {
  console.warn('> interpret()')
  console.log(initialContext)

  view()
}, initialContext)


// --------------------------------------------------------------------------------------- Functions

function updateContext (ctx, event) {
  const newContext = {
    ...ctx, 
    charged: ctx.charged++ 
  }

  console.warn('> updateContext()')
  console.log(newContext, event)

  return newContext
}

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
command('toggle')
command('toggle')

