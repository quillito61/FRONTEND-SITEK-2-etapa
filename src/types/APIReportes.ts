export interface ReportesResponse {
    ok:         boolean;
    reportes: reportes[];
    msg:        string;
  }
  
  export interface getReporteResponse {
  ok:         boolean;
  reporte: reportes;
  msg:        string;
  }
  
  export interface reportes{
  REPORTE_ID: string;
  REPORTE_DSC: string;
  LINK: string;
  ESTADO: boolean;
  
  }