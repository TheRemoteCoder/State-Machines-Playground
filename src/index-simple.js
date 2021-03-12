// global variable: window.XState
const { interpret, Machine } = XState; 


// --------------------------------------------------------------- Machine

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


html.addEventListener('mouseup', event => {
  dragDropService.send('mouseup');
});

html.addEventListener('dragend', event => {
  dragDropService.send('mouseup');
});

