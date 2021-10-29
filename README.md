# State machines

- [About](#about)
- [Use](#use)
- [Technologies](#technologies)
- [Knowledge](#knowledge)
- [Sources](#sources)

---

## About

Comparison of Robot and XState for basic concepts and API features.

The basic test scenario for both is a state machine imaginable for a Sci-Fi game, 
where players have a space ship which can activate a shield (limited times).

Besides that, some arbitrary advanced concepts are tested and experimented on.

---

## Use

- Run via Browser -or- NPM (see script commands)

---

## Technologies

- Robot: https://thisrobot.life
- XState: https://xstate.js.org

---

## Knowledge

### Robot

- Order of functions in transitions matter, e.g. with a guard in the first,
  if this fails the second will be called (for the same command)
- Nested machines with a single service seem hard to debug/test
  - There is probably a better way ...?

### XState

- Nested machine states can propagate to parents, if unhandled by the current state

---

## Sources

- https://xstate.js.org/docs/guides/introduction-to-state-machines-and-statecharts

