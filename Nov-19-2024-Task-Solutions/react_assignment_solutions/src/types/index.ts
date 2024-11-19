export interface User {
    id: number;
    name: string;
    email: string;
    [key: string]: string | number;
  }
  
  export interface DataProperties {
    headers: string[];
    dataKeys: string[];
  }