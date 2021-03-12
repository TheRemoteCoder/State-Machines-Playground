// global variable: window.XState
const { assign, interpret, Machine } = XState; 

// 27ff : https://www.youtube.com/watch?v=uRfQJJArZEg
// Potential issue (with JS): Listen on html, not box, else it might not always fire (?) -> 
// Also for mouse events: Cursor can sometimes be faster than the element moves, which breaks events!
const box  = document.getElementById('box');
const html = document.querySelector('html');


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
  context : {
    x  : 0, // Box position
    y  : 0,
    dx : 0, // Distance (far from click)
    dy : 0,
    pointerX : 0, // Click position
    pointerY : 0,
  },
  states: {
    idle: {
      on: {
        mousedown: {
          target: 'dragging',
          
          // Side effects
          // Don't mutate state directly but return new state (Redux style)
          actions: assign((context, mouseEvent) => {
            return {
              ...context,
              pointerX : mouseEvent.clientX,
              pointerY : mouseEvent.clientY,
            };
          }),
        },
      },
    },
    dragging: {
      on: {
        // State stays same here
        mousemove: {
          target: 'dragging',
          actions: assign((context, mouseEvent) => {
            return {
              ...context,
              dx : mouseEvent.clientX - context.pointerX,
              dy : mouseEvent.clientY - context.pointerY,
            };
          }),
        },

        // Change to next state
        // Shorthand version of {target:...}
        //mouseup: 'idle',
        mouseup: {
          target: 'idle',
          actions: assign((context, mouseEvent) => {
            return {
              ...context,
              x : context.x + context.dx,
              y : context.y + context.dy,
              dx : 0,
              dy : 0,
            };
          }),
        },
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
    if (!state.changed) {
      return;
    }

    console.log(state.value, state.changed, state.context);

    // Box position + How far it moved
    box.style.left = state.context.x + state.context.dx + 'px';
    box.style.top  = state.context.y + state.context.dy + 'px';

    document.body.dataset.state = state.toStrings().join(' ');
  })
  .start();


// -------------------------------------------------------------------- UI

box.addEventListener('mousedown', event => {
  dragDropService.send(event);
});

html.addEventListener('mousemove', event => {
  dragDropService.send(event);
});

html.addEventListener('mouseup', event => {
  dragDropService.send(event);
});

html.addEventListener('dragend', event => {
  dragDropService.send(event);
});

