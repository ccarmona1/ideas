import React from 'react';

interface RelojState {
  hora: Date;
}

class Reloj extends React.Component<{}, RelojState> {
  private timerID!: NodeJS.Timeout;

  constructor(props: any) {
    super(props);
    this.state = { hora: new Date() };
  }

  componentDidMount() {
    this.timerID = setInterval(() => this.tick(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    this.setState({ hora: new Date() });
  }

  render() {
    return <h1>{this.state.hora.toLocaleTimeString()}</h1>;
  }
}

export default Reloj;
