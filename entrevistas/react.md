# React Interview Topics

## React Core

### Basic

- React component definition (functional component)
- JSX (embedding expressions, attributes, children)
- React component state (initial state, useState, lazy initialization)
- React component lifecycle (for functional, mounting, updating, unmounting, phases: render, pre-commit, commit, error boundaries)
- Hooks (use cases, rules, types: state hooks, context hooks, ref hooks, effect hooks, performance hooks, custom hooks)
- Components composition (props.children, composition vs inheritance, lifting state up, practical decomposition task)

### Intermediate

- React DOM (APIs: createRoot, hydrateRoot, createRef, createPortal, flushSync; components: Fragment, Suspense, StrictMode, Profiler)
- Forms (controlled/uncontrolled components, SyntheticEvent, useFormStatus, useFormState, useOptimistic)
- Context (when to use, useContext, Context.Provider, Context.Consumer)
- Performance (memo, useMemo, useCallback, keys, profiler)

### Advanced

- React code reuse patterns (custom hooks, higher-order components, render props)
- Virtual DOM (concept, reconciliation algorithm, recursing on children, keys, Fiber Architecture)

## React Ecosystem

### Basic

- Typechecking (TypeScript)
- Redux (three main principles, actions, reducers, store, unidirectional flow, data normalization, Redux vs Context)

### Intermediate

- React Redux (presentational vs container components, Provider, connect, useSelector, useDispatch)
- Redux Async Flow (middleware, Redux Thunk)
- Routing (react-router, jsx/object configuration, history)

### Advanced

- Automated testing (types of rendering, React Testing Library or Enzyme, e2e testing libraries: playwright, cypress, puppeteer, etc.)
- Building (transpilers, bundlers, dev vs production build, code splitting, build optimization)
- Server side rendering (difference with CSR, cases of usage, React server components and server functions, server React DOM APIs)
- Static site generation (Next.js, Gatsby, Astro, Docusaurus, React Static)

## Bonus

- React without JSX (createElement API)
- React component definition (class component)
- React component lifecycle (for class component, lifecycle methods)
- Typechecking (PropTypes, vs TypeScript)
- Redux Toolkit (differences with pure Redux, createSlice, configureStore, Immer, RTK Query)
- MobX (main principles, observable and computed values, actions, reactions)
- Other state managers (zustand, jotai, xstate, etc.). Pros/cons comparing to Redux and/or each other.
- Flux architecture (unidirectional data flow, dispatcher, action, store)
- Security (XSS on React Props, dangerouslySetInnerHTML)
- Animation (react-transition-group, manual animation, transition, translate)
