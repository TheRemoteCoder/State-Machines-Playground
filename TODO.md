# State machines

- [General](#general)
- [Technologies](#technologies)

---

## General

### Code

- [ ] Best practices - Debugging, Testing
  - Also: With nested machines

### Concepts

- [ ] Non-deterministic random state possibility
  - Light switch: On 'on', 50% chance to break next time (final)
- [ ] Self-transitioning state loop
  - Wait for data, get data, wait again (for more), ... (simple concat output)

### Diagrams

- [ ] Create diagram for ship/shield concept
  - Official notation / UML

## Technologies

### Robot

- [x] Nested/parallel state machines (Robot: via invoke)?
  - Complex to setup, even harder to debug/maintain -> Best practices?
- [x] Timed/Async state machines (Delay in transition, e.g. timeout)
  - Can be done with promises

### XState

- [ ] Re-Build 'Ship + Shield' state machines
- [ ] Test: Compound states
- [ ] Test: Parallel states
- [ ] Test: Final state
- [ ] Test: Delay/Timed/Async


