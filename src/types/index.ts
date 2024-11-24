
/* Declaration des interface de typage */
export interface Sale {
    product: string;
    quantity: number;
    revenue: number;
    month: string;
  }
  
  export interface Users {
    active: number;
    total: number;
  }
  
  export interface Data {
    sales: Sale[];
    users: Users;
  }
  