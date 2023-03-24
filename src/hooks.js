import { render } from ".";

export const { useState, useEffect } = (function makeMyHook() {
  let hookIndex = 0;
  const hooks = [];

  const useState = (initialValue) => {
    // initialValue로 받은 값을 그대로 리턴해줘야 한다.
    const state = hooks[hookIndex] || initialValue;

    hooks[hookIndex] = state;

    const setState = (function makeSetState() {
      const currnetHookIndex = hookIndex;

      return (value) => {
        hooks[currnetHookIndex] = value;
        hookIndex = 0;
        render();
      };
    })();

    console.log("hookIndex", hookIndex);
    console.log("hooks", JSON.stringify(hooks));

    hookIndex++;

    return [state, setState];
  };

  const useEffect = (effect, deps) => {
    const prevDeps = hooks[hookIndex];

    const isFirstCall = () => prevDeps === undefined;
    const isDepsNotProvided = () => deps === undefined;
    const hasDepsChanged = () =>
      deps.some((dep, index) => dep !== prevDeps[index]);

    if (isFirstCall() || isDepsNotProvided() || hasDepsChanged()) {
      effect();
    }

    hooks[hookIndex] = deps;

    hookIndex++;
  };

  return { useState, useEffect };
})();
