# Editor Core - Multiple Dispatches Find Tool

The goal of this tool is to find possible multiple dispatches in our codebase. Like this below:

```
function funOne(inputMethod: string): Command {
  return (state, dispatch) => {
    const tr = state.tr;
    dispatch(tr); // <=== multiple dispatchs
    dispatch(tr); // <=== multiple dispatchs
    return true;
  };
}

```

## How to use
Run these commands within this `multiple-dispatch-lint` folder:

Lint a folder

```
bolt lint:multidispatch packages/editor/editor-core/src/plugins/
```

or

```
bolt lint:multidispatch packages/editor/editor-core/src/plugins/selection/gap-cursor/actions.ts
```

or

```
bolt lint:multidispatch packages/editor/editor-core/src/plugins/selection/gap-cursor/actions.ts packages/editor/editor-core/src/plugins/media/pm-plugins/keymap.ts
```

## How to test

### Unit tests
Run these commands within this `multiple-dispatch-lint` folder:

```
bolt test:unit
```

## Errors Definitions

### [ET-0001] The function: "functionCalledName" can not borrow the "dispatchVariableName" variable from the current scope

This error will show up if the **NO_BORROWING** flag is enabled. This is a strict mode. This mode cannot pass down the dispatch callback to another function. For example, this code will throw an error message.

```
function myCommand(inputMethod: string): Command {
  return (state, dispatch) => {
    doAnotherCommandInstead(state, dispatch);
    // [ET-0001] The function: "doAnotherCommandInstead" can not borrow the "dispatch" variable from the current scope
  };
}
```

### [ET-0002] The variable: "dispatch" was lent already. This function: "liftListItems()" can not borrow it anymore.

This error will show up if the **ONLY_ONE_BORROWING_ALLOWED** flag is enabled. You can pass down the dispatch callback to another function only once on this mode. For example, this code below will fail:

```
function myCommand(inputMethod: string): Command {
  return (state, dispatch) => {
    niceCommandInstead(state, dispatch);
    doAnotherCommandInstead(state, dispatch);
    // [ET-0002] The variable: "dispatch" was lent already. This function: "doAnotherCommandInstead()" can not borrow it anymore.
  };
}
```

But, this one won't fail:

```
function myCommand(inputMethod: string): Command {
  return (state, dispatch) => {
    if (inputMethod) {
      niceCommandInstead(state, dispatch);
      return;
    }

    doAnotherCommandInstead(state, dispatch);
  };
}
```

### [ET-0003] The variable: "dispatchVariableName" can not be called multiple times

This error will show up if the **NO_MULTIPLE_CALLS** flag is enabled. This mode checks if the dispatch function is called multiple times in the same scope. For example, the code below will fail:"

```
function funOne(inputMethod: string): Command {
  return (state, dispatch) => {
    const tr = state.tr;
    dispatch(tr);
    // [ET-0003] The variable: "dispatch" can not be called multiple times.
    dispatch(tr); // <=== multiple dispatchs
    // [ET-0003] The variable: "dispatch" can not be called multiple times.
    return true;
  };
}
```

However, this code below won't fail. Because both calls are happening in different scope.

```
function funOne(inputMethod: string): Command {
  return (state, dispatch) => {
    const tr = state.tr;
    if (inputMethod === 'randomString') {
      dispatch(tr);
      return true;
    }

    dispatch(tr);
    return true;
  };
}
```

### [ET-0004] The variable: "dispatchVariableName" was lent before. It can't be called anymore

This error will show up if the **NO_CALL_AFTER_DISPATCH_LENT** flag is enabled. This mode checks if the dispatch function is called after be moved to another function. For example, the code below will fail:"

```
function funOne(inputMethod: string): Command {
  return (state, dispatch) => {
    const tr = state.tr;

    anyComand(dispatch);
    dispatch(tr);
    // [ET-0004] The variable: "dispatch" was lent before. It can't be called anymore
    return true;
  };
}
```

However, this code below won't fail. Because both calls are happening in different scope.

```
function funOne(inputMethod: string): Command {
  return (state, dispatch) => {
    const tr = state.tr;
    if (inputMethod === 'randomString') {
      anyComand(dispatch);
      return true;
    }

    dispatch(tr);
    return true;
  };
}
```

### [ET-0005] The variable: "dispatchVariableName" was called before. It can't be lend anymore

This error will show up if the **NO_BORROW_AFTER_DISPATCH_WAS_USED** flag is enabled. This mode checks if the dispatch function is borrowed after be used (called). For example, the code below will fail:"

```
function funOne(inputMethod: string): Command {
  return (state, dispatch) => {
    const tr = state.tr;

    dispatch(tr);
    anyComand(dispatch);
    // [ET-0005] The variable: "dispatch" was called before. It can't be lend anymore
    return true;
  };
}
```

However, this code below won't fail. Because both calls are happening in different scope.

```
function funOne(inputMethod: string): Command {
  return (state, dispatch) => {
    const tr = state.tr;
    if (inputMethod === 'randomString') {
      dispatch(tr);
      return true;
    }

    anyComand(dispatch);
    return true;
  };
}
```
