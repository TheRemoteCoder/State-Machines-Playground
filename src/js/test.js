/**
 * @todo - Guard condition does not work here
 */

import { 
  createMachine, 
  guard, 
  immediate, 
  interpret, 
  invoke, 
  reduce,
  state, 
  transition
  } from '/node_modules/robot3/machine.js';


// ------------------------------------------------------------------------------------------------------------------------------- Constants

// 0|1 = 0|100%
const context = () => ({
  charged: 0,
});


// ------------------------------------------------------------------------------------------------------------------------------- Functions

function canWork (ctx) {
  console.log('> GUARD: canWork');
  console.log(ctx.charged, ctx.charged === 1);

  return ctx.charged === 1;
}


function updateContext (ctx, ev) {
  console.log('> REDUCE: updateContext');
  console.log({...ctx, charged: ctx.charged++});

  return {
    ...ctx, 
    charged: ctx.charged++ 
  };
}


function view () {
  const currentState = service.machine.state;

  console.log('> RUN: view', currentState);
}


// --------------------------------------------------------------------------------------------------------------------------------- Machine

const machine = createMachine({
  idle: state(
    transition('start', 'warmup')
  ),
  warmup: state(
    /* * /
    transition('start', 'working', 
      guard(canWork), 
      reduce(updateContext),
    ),
    /* */
    transition('stop', 'cooldown')
  ),
  working: state(
    transition('stop', 'cooldown')
  ),
  cooldown: state(
    transition('stop', 'idle')
  ),
}, context);


// --------------------------------------------------------------------------------------------------------------------------------- Service

const service = interpret(machine, () => {
  console.log('> interpret');
  console.log(context.toString());

  view();
}, context);


// ------------------------------------------------------------------------------------------------------------------------------------- Run

view();                // idle

service.send('start'); // warmup
service.send('start'); // warmup (ignored)
service.send('stop');  // cooldown
service.send('stop');  // idle !

