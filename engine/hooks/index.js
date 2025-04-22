const actions = {};
const filters = {};

const addHook = (collection, hookName, namespace, callback, priority) => {
  if (!Object.keys(collection).includes(hookName)) {
    collection[hookName] = [];
  }

  if (!Array.isArray(collection[hookName][priority])) {
    collection[hookName][priority] = [];
  }

  collection[hookName][priority].push({ namespace, callback });
}

const removeHook = (collection, hookName, namespace) => {
  if (!Array.isArray(collection[hookName])) {
    return;
  }

  if (!namespace) {
    delete collection[hookName];
    return;
  }

  const hook = collection[hookName];
  hook.forEach((callbacks, priority) => {
    hook[priority] = callbacks.filter((C) => C.namespace !== namespace);
  });

}

const removeAllHooks = (collection, hookName) => {
  delete collection[hookName];
}

export const addAction = (hookName, namespace, callback, priority = 10) => addHook(actions, hookName, namespace, callback, priority);
export const removeAction = (hookName, namespace = null) => removeHook(actions, hookName, namespace);
export const removeAllActions = (hookName) => removeAllHooks(actions, hookName);
export const addSceneAction = (hookName, namespace, callback, priority = 10) => {
  addAction(hookName, namespace, callback, priority);
  document.addEventListener('scene.afterUnload', () => removeAction(hookName, namespace));
}

export const doAction = (hookName, ...args) => {
  if (!Array.isArray(actions[hookName])) {
    return;
  }

  actions[hookName].forEach((callbackList) => {
    callbackList.forEach(pAction => pAction.callback(...args));
  });

  document.dispatchEvent(new CustomEvent(hookName, {
    detail: args
  }));
}

export const addFilter = (hookName, namespace, callback, priority = 10) => addHook(filters, hookName, namespace, callback, priority)
export const removeFilter = (hookName, namespace) => removeHook(filters, hookName, namespace);
export const removeAllFilters = (hookName) => removeAllHooks(filters, hookName);

export const applyFilters = (hookName, content, ...args) => {
  if (!Array.isArray(filters[hookName])) {
    return;
  }

  return filters[hookName].reduce((output, priorityCallbacks) => {
    return priorityCallbacks.reduce((priorityOutput, pFilter) => pFilter.callback(priorityOutput, ...args), output);
  }, content);
}

window.getHooks = () => ({ actions, filters });
