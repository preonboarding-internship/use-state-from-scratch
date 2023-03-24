export function makeMyHooks() {
  const hooks = [];
  let hookIndex = 0;

  function useState(initialValue) {
    const state =
      hooks[hookIndex] === undefined ? initialValue : hooks[hookIndex];

    hooks[hookIndex] = state;

    const setState = function () {};

    hookIndex++;

    return [state, setState];
  }

  function useEffect() {}

  return { useState, useEffect };
}
