import React from 'react';
import { ThrowingComponent } from './ThrowingComponent'; // Import the component that throws the error

export class CountClass extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentValue: props.initValue ?? 0,
      hasError: false, // Add a state to handle if an error has been caught
    };
  }

  // We could use getDerivedStateFromProps if we don't have side effects. This happens before the render method
  // static getDerivedStateFromProps(nextProps, prevState) {
  //   if (nextProps.initValue !== prevState.initValue) { // if the props changed, then we should sync the state
  //     return {
  //       currentValue: nextProps.initValue, // Sync the state
  //       initValue: nextProps.initValue, // Save the prop for future comparisons
  //     };
  //   }
  //   return null;
  // }

  // Simulates memo
  shouldComponentUpdate(nextProps, nextState) {
    if (
      nextProps.initValue !== this.props.initValue ||
      nextState.currentValue !== this.state.currentValue ||
      nextState.hasError !== this.state.hasError // Include hasError in the comparison
    ) {
      return true;
    }
    return false;
  }

  componentDidUpdate(prevProps) {
    if (prevProps.initValue !== this.props.initValue) {
      this.setState({ currentValue: this.props.initValue + 2 });
    }

    setTimeout(() => {
      // simulates useEffect with sideEffects
      console.log('currentValue class - timeout:', this.state.currentValue);
    }, 1000);
  }

  componentDidMount() {
    this.incrementTwo(); // Simulates componentDidMount: increment value by 2 when mounted
  }

  componentWillUnmount() {
    console.log('Unmounting class'); // Cleanup: log when component is unmounted
    this.setState({ currentValue: this.props.initValue });
  }

  incrementTwo() {
    this.setState({ currentValue: this.state.currentValue + 2 });
  }

  // This static method is called when a descendant component throws an error
  static getDerivedStateFromError(error) {
    console.error('oops! getDerivedStateFromError:', error);
    // Update the state to indicate that an error has occurred and render a fallback UI
    return { hasError: true };
  }

  // This method is called after a descendant component throws an error
  componentDidCatch(error, errorInfo) {
    console.error('oops! componentDidCatch:', error, errorInfo);
    // You can send the error to an error reporting service here
  }

  render() {
    // If hasError is true, render an error message
    if (this.state.hasError) {
      return <h1>Something went wrong!</h1>;
    }

    // If the shouldThrow prop is true, render the component that throws the error
    if (this.props.shouldThrow) {
      return <ThrowingComponent />;
    }

    return (
      <>
        <span> Init Value Class: {this.state.currentValue} </span>
        <button onClick={this.incrementTwo.bind(this)}>Increment Class</button>
      </>
    );
  }
}
