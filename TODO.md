# State machines

- [General](#general)
- [Technologies](#technologies)

---

## General

### Basics

- [ ] Read: https://github.com/eggheadio-projects/introduction-to-state-machines-using-xstate-notes

### Code

- [ ] Best practices - Debugging, Testing
  - Also: With nested machines

### Concepts

- [ ] Non-deterministic random state possibility
  - Light switch: On 'on', 50% chance to break next time (final)
- [ ] Self-transitioning state loop
  - Wait for data, get data, wait again (for more), ... (simple concat output)

### Design

- [ ] How to create UI from diagrams only?
  - Do they still need 'old fashioned' booleans for display conditions?

### Diagrams

Use basic diagrams from 'XState' tutorial and re-create for own demo project.

- [ ] Design ship/shield concept (Official notation / UML)
  - Add: Timeout (e.g. shield on automatically turns off after given time)
  - Add: Guard (e.g. shield can be used max N times)

## Technologies

### Robot

- [x] Nested/parallel state machines (Robot: via invoke)?
  - Complex to setup, even harder to debug/maintain - Best practices?
- [x] Timed/Async state machines (Delay in transition, e.g. timeout)
  - Can be done with promises

### XState

- [ ] Re-Build 'Ship + Shield' state machines
- [ ] Test: Actions (entry, transition, exit)
- [ ] Test: Compound/Hierarchical/Nested states
  - External triggers (here: Global state switch via target)
  - https://xstate.js.org/docs/guides/hierarchical.html
- [ ] Test: Parallel/Orthogonal states
  - https://xstate.js.org/docs/guides/parallel.html
- [ ] Test: History state
  - https://xstate.js.org/docs/guides/history.html
- [ ] Test: Delay/Timed/Async
  - Automatic trigger?
- [x] Test: Final state
  - Simply move to an empty state that doesn't do anything else

