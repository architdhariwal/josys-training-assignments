import React from "react";

interface User {
  id: number;
  name: string;
}

interface UserListProps {
  searchTerm: string;
}

interface UserListState {
  users: User[];
  filteredUsers: User[];
  mountTime: string;
}

export class UserList extends React.Component<UserListProps, UserListState> {
  constructor(props: UserListProps) {
    super(props);
    console.log("1. Constructor: Component initialized");
    this.state = {
      users: [],
      filteredUsers: [],
      mountTime: ""
    };
  }

  // Called when props or state changes
  static getDerivedStateFromProps(props: UserListProps, state: UserListState) {
    console.log("2. getDerivedStateFromProps: Filtering users based on search");
    
    if (state.users.length > 0) {
      return {
        filteredUsers: state.users.filter(user =>
          user.name.toLowerCase().includes(props.searchTerm.toLowerCase())
        )
      };
    }
    return null;
  }

  // Called after component mounts
  async componentDidMount() {
    console.log("3. componentDidMount: Loading initial data");
    
    // Simulate API call
    const mockUsers: User[] = [
      { id: 1, name: "Alice" },
      { id: 2, name: "Bob" },
      { id: 3, name: "Charlie" }
    ];

    this.setState({
      users: mockUsers,
      filteredUsers: mockUsers,
      mountTime: new Date().toLocaleTimeString()
    });
  }

  // Called before each update
  shouldComponentUpdate(nextProps: UserListProps, nextState: UserListState) {
    console.log("4. shouldComponentUpdate: Checking if update is needed");
    return (
      this.props.searchTerm !== nextProps.searchTerm ||
      this.state.users !== nextState.users
    );
  }

  // Called after each update
  componentDidUpdate(prevProps: UserListProps) {
    if (prevProps.searchTerm !== this.props.searchTerm) {
      console.log("5. componentDidUpdate: Search term changed");
    }
  }

  // Called before unmounting
  componentWillUnmount() {
    console.log("6. componentWillUnmount: Cleaning up");
  }

  render() {
    console.log("7. render: Rendering component");
    
    return (
      <div className="space-y-4">
        <div className="bg-gray-100 p-4 rounded">
          <p className="text-sm">Mounted at: {this.state.mountTime}</p>
        </div>

        <ul className="divide-y divide-gray-200">
          {this.state.filteredUsers.map(user => (
            <li key={user.id} className="py-2">
              {user.name}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}