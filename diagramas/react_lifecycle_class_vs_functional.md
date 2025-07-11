# Comparison: Class Components vs Functional Components in React

| Feature / Behavior          | Class Component                                         | Functional Component (with Hooks)             |
| --------------------------- | ------------------------------------------------------- | --------------------------------------------- |
| **Definition**              | `class MyComponent extends React.Component {}`          | `function MyComponent(props) {}`              |
| **Access to props**         | `this.props`                                            | `props` (or destructuring)                    |
| **Local state**             | `this.state` and `this.setState()`                      | `const [state, setState] = useState()`        |
| **Lifecycle: Mount**        | `componentDidMount()`                                   | `useEffect(() => { ... }, [])`                |
| **Lifecycle: Update**       | `componentDidUpdate(prevProps, prevState)`              | `useEffect(() => { ... }, [deps])`            |
| **Lifecycle: Unmount**      | `componentWillUnmount()`                                | `useEffect(() => { return () => {...} }, [])` |
| **Update control**          | `shouldComponentUpdate(nextProps, nextState)`           | `React.memo` + custom comparison              |
| **Derive state from props** | `static getDerivedStateFromProps(nextProps, prevState)` | `useEffect` or logic in the component body    |
| **Error handling**          | `componentDidCatch(error, info)`                        | Class error boundary or external library      |
| **References (refs)**       | `React.createRef()` and `this.myRef`                    | `const ref = useRef()`                        |
| **Context**                 | `static contextType = MyContext` and `this.context`     | `const value = useContext(MyContext)`         |
| **Hooks**                   | Not available                                           | Yes (`useState`, `useEffect`, `useRef`, etc.) |
| **Rendering**               | `render()` method                                       | Direct JSX return                             |
| **TypeScript typing**       | Interfaces for props and state                          | Typing for props and hooks                    |
| **Lifecycle: All renders**  | `componentDidMount()` + `componentDidUpdate()`          | `useEffect(() => { ... })` (sin dependencias) |
