export interface CustomerStruc {
    Name: string;
    City: string;
    Country: string;
  }
  
  export interface ApiResponse {
    records: CustomerStruc[];
  }