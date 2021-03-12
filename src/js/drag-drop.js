import { interpret, Machine } from 'xstate';
import { JSDOM } from 'jsdom';

const { document } = (new JSDOM('<!DOCTYPE html><div id="box">BOX</div>')).window;

const window = document.defaultView;
const body   = document.body;


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
    //console.log(state);

    // Visual
    body.dataset.state = state.toStrings().join(' ');
  })
  .start();


// -------------------------------------------------------------------- UI

const box = document.getElementById('box');

box.addEventListener('mousedown', event => {
  dragDropService.send('mousedown');
});

body.addEventListener('mouseup', event => {
  dragDropService.send('mouseup');
});


// --------------------------------------------------------- Demo triggers

const eventMousedown = new window.MouseEvent('mousedown', {
  view: window, bubbles: true, cancelable: true,
});

const eventMouseup = new window.MouseEvent('mouseup', {
  view: window, bubbles: true, cancelable: true,
});

box.dispatchEvent(eventMousedown);
box.dispatchEvent(eventMousedown);
box.dispatchEvent(eventMouseup);
box.dispatchEvent(eventMouseup);

