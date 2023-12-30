import { Home } from './Home';
export interface Community {
    id: string;
    name: string;
    imgUrl: string;
    group: string;
    avgPrice?: string;
    homes?: Home[];
    showDetails?: boolean;
  }