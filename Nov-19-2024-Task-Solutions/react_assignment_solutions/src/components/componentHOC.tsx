import React from 'react';
import { DataProperties, User } from '../types';

interface HOCGridProps {
  url: string;
  dataProperties: DataProperties;
}

interface HOCGridState {
  data: User[];
  loading: boolean;
  error: string | null;
}

export function componentHOC(WrappedComponent: React.ComponentType<{ data: User[] }>) {
  return class WithGrid extends React.Component<HOCGridProps, HOCGridState> {
    state: HOCGridState = {
      data: [],
      loading: true,
      error: null
    };

    async componentDidMount() {
      try {
        const response = await fetch(this.props.url);
        const data = await response.json();
        this.setState({ data, loading: false });
      } catch (error) {
        this.setState({ error: 'Failed to fetch data', loading: false });
      }
    }

    renderGrid() {
      const { dataProperties } = this.props;
      const { data, loading, error } = this.state;

      if (loading) return <div>Loading...</div>;
      if (error) return <div>{error}</div>;

      return (
        <table className="grid-table">
          <thead>
            <tr>
              {dataProperties.headers.map((header, index) => (
                <th key={index}>{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((item, rowIndex) => (
              <tr key={rowIndex}>
                {dataProperties.dataKeys.map((key, colIndex) => (
                  <td key={colIndex}>{item[key]}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      );
    }

    render() {
      return (
        <div className="grid-container">
          {this.renderGrid()}
          <WrappedComponent data={this.state.data} />
        </div>
      );
    }
  };
}