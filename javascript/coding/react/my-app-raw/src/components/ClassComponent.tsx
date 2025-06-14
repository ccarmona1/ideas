import React from 'react';

// Componente de Clase
class TimerClass extends React.Component<{}, { seconds: number }> {
  private interval!: number;

  constructor(props: { seconds: number }) {
    super(props);
    this.state = { seconds: 0 };
  }

  componentDidMount() {
    this.interval = setInterval(
      () => this.setState((s) => ({ seconds: s.seconds + 1 })),
      1000
    );
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    return <div>Segundos Clase: {this.state.seconds}</div>;
  }
}

export default TimerClass;