import { Component } from 'react';

export class MyClass extends Component<
  { externalState: number },
  { state: number }
> {
  //#region This is going to be execute on every render
  // componentDidMount(): void {
  //   this.setState({ state: (this.state?.state || 0) + 1 });
  // }

  // componentDidUpdate(): void {
  //   console.log('running');
  //   this.setState({ state: (this.state?.state || 0) + 1 });
  // }
  //#endregion

  // This is going to be execute only once
  componentDidMount(): void {
    this.setState({ state: (this.state?.state || 0) + 2 });
  }

  // This is going to be execute only when externalState changes
  componentDidUpdate(prevProps: Readonly<{ externalState: number }>): void {
    if (prevProps.externalState !== this.props.externalState) {
      this.setState({ state: this.props.externalState });
    }
  }

  // This is going to be execute when the component is unmounted
  componentWillUnmount(): void {
    // Cleanup logic if needed
    console.log('Component class unmounted');
    this.setState({ state: 0 }); // Reset state or perform cleanup
  }

  // This method controls when the component should update - when props or state change
  shouldComponentUpdate(
    nextProps: Readonly<{ externalState: number }>,
    nextState: Readonly<{ state: number }>
  ): boolean {
    // Control when the component should update
    console.log('MyClass shouldComponentUpdate', nextProps, nextState);
    return (
      nextProps.externalState !== this.props.externalState ||
      nextState.state !== this.state?.state
    );
  }

  static getDerivedStateFromProps(
    nextProps: Readonly<{ externalState: number }>,
    prevState: Readonly<{ state: number }>
  ): { state: number } | null {
    // This method is called before rendering, both on the initial mount and on subsequent updates.
    console.log('MyClass getDerivedStateFromProps', nextProps, prevState);
    if (nextProps?.externalState !== prevState?.state) {
      return { state: nextProps?.externalState };
    }
    return null; // No state change
  }

  render() {
    return (
      <div>
        My Class Component {JSON.stringify(this.state?.state)}
        <button
          onClick={() =>
            this.setState({ state: (this?.state?.state || 0) + 1 })
          }
        >
          Update class
        </button>
      </div>
    );
  }
}
