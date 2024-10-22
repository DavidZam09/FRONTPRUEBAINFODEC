// request.model.ts
export interface RequestData {
  id: number;
  pais: string;
  ciudad: string;
  cantidad: number;
  rate: number;
  convert_cantidad: number;
  clima: string;
  temperatura: number;
  created_at: string;
  updated_at: string;
}

export interface RequestResponse {
  message: string;
  data: RequestData[];
}
