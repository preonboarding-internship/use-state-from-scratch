import { render } from ".";

export function makeMyHooks() {
  const hooks = [];
  let hookIndex = 0;

  function useState(initialValue) {
    let state;

    if (hooks[hookIndex] === undefined) {
      state = initialValue;
      hooks[hookIndex] = initialValue;
    } else {
      state = hooks[hookIndex];
    }

    const setState = (() => {
      const currentHookIndex = hookIndex;
      return (newState) => {
        hooks[currentHookIndex] = newState;
        hookIndex = 0;

        render();
      };
    })();

    hookIndex = hookIndex + 1;

    return [state, setState];
  }

  function useEffect(effect, deps) {
    const prevDeps = hooks[hookIndex];

    if (isFirstRender() || hasDepsChanged() || isDepsNotProvided()) {
      effect();
    }

    hooks[hookIndex] = deps;

    hookIndex++;

    function isFirstRender() {
      return prevDeps === undefined;
    }

    function hasDepsChanged() {
      return deps.some((dependancy, index) => dependancy !== prevDeps[index]);
    }

    function isDepsNotProvided() {
      return deps === undefined;
    }
  }

  return { useState, useEffect };
}
