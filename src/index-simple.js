// global variable: window.XState
const { interpret, Machine } = XState; 


// --------------------------------------------------------------- Machine

/**
 * State maachine 'blueprint' for other code to act upon.
 * Responsible for state handling and transitions only.
 * 
 * Internally
 * - Does not create real events/listeners
 * - Mostly a data structure
 * - Internally stateless
 */
const dragDropMachine = Machine({
  id      : 'dragdrop',
  initial : 'idle',
  context : {},
  states: {
    idle: {
      on: {
        mousedown: {
          target: 'dragging',
        },
      },
    },
    dragging: {
      on: {
        // Shorthand version of above
        mouseup: 'idle',
      },
    },
  },
});


// --------------------------------------------------------------- Service

/**
 * Responsible to make state machine 'alive'
 * with own code (e.g. event handling).
 *
 * Internally
 * - onTransition runs automatically with initial state
 * - State tracker to interact with code/UI
 */
const dragDropService = interpret(dragDropMachine)
  .onTransition(state => {
    console.log(state.value);

    document.body.dataset.state = state.toStrings().join(' ');
  })
  .start();


// -------------------------------------------------------------------- UI

const box  = document.getElementById('box');
const html = document.querySelector('html');

box.addEventListener('mousedown', event => {
  dragDropService.send('mousedown');
});


// 27ff : https://www.youtube.com/watch?v=uRfQJJArZEg
// Potential issue (with JS): Listen on body, not box,
// else it might not always fire (?) -> Also for mouse events:
// the cursor can sometimes be faster than the element moves,
// which breaks events!

html.addEventListener('mouseup', event => {
  dragDropService.send('mouseup');
});

html.addEventListener('dragend', event => {
  dragDropService.send('mouseup');
});

