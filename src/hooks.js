import { render } from ".";

export function makeMyHooks() {
  const hooks = [];
  let hookIndex = 0;

  function useState(initialValue) {
    const state =
      hooks[hookIndex] === undefined ? initialValue : hooks[hookIndex];

    hooks[hookIndex] = state;

    const setState = (function () {
      const currentIndex = hookIndex;

      return (newState) => {
        hooks[currentIndex] = newState;
        hookIndex = 0;
        render();
      };
    })();

    hookIndex++;

    return [state, setState];
  }

  function useEffect(effect, deps) {
    const prevDeps = hooks[hookIndex];

    function isFirstCall() {
      return prevDeps === undefined;
    }

    function depsHasChanged() {
      return deps.some((dependancy, index) => dependancy !== prevDeps[index]);
    }

    if (isFirstCall() || depsHasChanged()) effect();

    hooks[hookIndex] = deps;

    hookIndex++;
  }

  return { useState, useEffect };
}
