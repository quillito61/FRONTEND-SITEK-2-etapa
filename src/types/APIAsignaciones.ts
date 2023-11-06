export interface AsignacionesResponse {
    ok:         boolean;
    reportes: asignacionesExt[];
    msg:        string;
  }
  
  export interface getAsignaResponse {
  ok:         boolean;
  reporte: asignaciones;
  msg:        string;
  }
  
  export interface asignaciones{
  

  ASIGNACION_ID : string;
  UserId: number;
  REPORTE_ID: number;
  NOTAS: string;
  ESTADO: boolean
  
  }

  export interface asignacionesExt{
  

    ASIGNACION_ID : string;
    UserId: number;
    REPORTE_ID: number;
    Name: string;
    Username: string;
    REPORTE_DSC:string;
    NOTAS: string;
    ESTADO: boolean;
    LINK:string;
    
    }