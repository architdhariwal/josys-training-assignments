import React from 'react';

interface LifecycleProps {
  initialCount: number;
}

interface LifecycleState {
  count: number;
  data: string;
}

class LifecycleDemo extends React.Component<LifecycleProps, LifecycleState> {
  constructor(props: LifecycleProps) {
    super(props);
    console.log('1. Constructor called');
    this.state = {
      count: props.initialCount,
      data: ''
    };
  }

  componentDidMount() {
    console.log('3. componentDidMount called');
    // Simulate some API call here
    setTimeout(() => {
      this.setState({ data: 'Some data from API' });
    }, 1000);
  }

  componentDidUpdate(prevProps: LifecycleProps, prevState: LifecycleState) {
    console.log('4. componentDidUpdate called');
    if (prevState.count !== this.state.count) {
      console.log(`Count changed from ${prevState.count} to ${this.state.count}`);
    }
    if (prevState.data !== this.state.data) {
      console.log(`Data changed from ${prevState.data} to ${this.state.data}`);
    }
  }

  componentWillUnmount() {
    console.log('5. componentWillUnmount called');
  }

  handleIncrement = () => {
    this.setState(prevState => ({
      count: prevState.count + 1
    }));
  };

  render() {
    console.log('2. render called');
    return (
      <div style={{ margin: "10px", border: "2px solid brown", padding: "10px" }}>
        <h3>Lifecycle Methods Demo</h3>
        <p>Count: {this.state.count}</p>
        <p>Data: {this.state.data}</p>
        <button onClick={this.handleIncrement}>Increment</button>
        <p>Check console for lifecycle method logs</p>
      </div>
    );
  }
}

export default LifecycleDemo;
