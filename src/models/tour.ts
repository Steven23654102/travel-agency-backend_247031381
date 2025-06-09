// models/tour.ts
export interface Tour {
  id: string;
  name: string;
  location: string;
  price: number;
  description?: string;
}

export const tours: Tour[] = []; // 暫時用記憶體模擬資料庫
