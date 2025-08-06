# React Hooks Usage Table

| Hook                | Usage Example                       | Dependency Array  | Description                                                           | Purpose                                           |
| ------------------- | ----------------------------------- | ----------------- | --------------------------------------------------------------------- | ------------------------------------------------- |
| **useEffect**       | `useEffect(fn)`                     | None              | Runs after every render.                                              | Side effects after every render.                  |
| **useEffect**       | `useEffect(fn, [])`                 | Empty array       | Runs only once after initial mount.                                   | Side effects on mount (componentDidMount).        |
| **useEffect**       | `useEffect(fn, [dep1, dep2])`       | With dependencies | Runs after mount and whenever any dependency changes.                 | Respond to specific state/prop changes.           |
| **useLayoutEffect** | `useLayoutEffect(fn)`               | None              | Runs synchronously after every render, before painting.               | DOM measurements or mutations after every render. |
| **useLayoutEffect** | `useLayoutEffect(fn, [])`           | Empty array       | Runs once after initial mount, before painting.                       | DOM setup on mount (before browser paint).        |
| **useLayoutEffect** | `useLayoutEffect(fn, [dep1, dep2])` | With dependencies | Runs after mount and when dependencies change, before painting.       | DOM updates on specific changes.                  |
| **useCallback**     | `useCallback(fn)`                   | None              | Returns a new memoized callback after every render.                   | Rarely useful; usually use with dependencies.     |
| **useCallback**     | `useCallback(fn, [])`               | Empty array       | Returns the same memoized callback for the component's lifetime.      | Stable callback reference (e.g., for children).   |
| **useCallback**     | `useCallback(fn, [dep1, dep2])`     | With dependencies | Returns a memoized callback that updates when dependencies change.    | Prevent unnecessary re-renders or effects.        |
| **useMemo**         | `useMemo(fn)`                       | None              | Recomputes the value on every render.                                 | Not recommended; defeats memoization purpose.     |
| **useMemo**         | `useMemo(fn, [])`                   | Empty array       | Computes the value once and memoizes it for the component's lifetime. | Expensive calculations on mount only.             |
| **useMemo**         | `useMemo(fn, [dep1, dep2])`         | With dependencies | Recomputes the value when dependencies change.                        | Memoize derived data based on dependencies.       |
