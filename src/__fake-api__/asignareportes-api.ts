import { RestoreOutlined } from '@mui/icons-material';
import { asignaciones,AsignacionesResponse,getAsignaResponse,asignacionesExt } from 'src/types/APIAsignaciones';

import API from './API';



class AsignaApi {
 
  async newReporte (ASIGNACION_ID:number,UserId:number,REPORTE_ID:number,NOTAS:string ): Promise<boolean> {
    await API.post<asignaciones>('sitek/editAsigAnalytics', { ASIGNACION_ID,UserId,REPORTE_ID,NOTAS });
    return Promise.resolve(true);
  }

  async delReporte (ASIGNA_ID: number): Promise<boolean> {
    //alert(userId )
    const count = await API.delete<asignaciones>('sitek/delAsigAnalytics',{ params: { ASIGNACION_ID: ASIGNA_ID } });
    return Promise.resolve(true);
  }

  async getReportes(): Promise<asignacionesExt[]> {
    
    const result = await API.get<AsignacionesResponse>('sitek/getAsigAnalytics');
    console.log('REPORTES:::::::',result)
    return Promise.resolve(result.data.reportes);
  }

  

  async GetReporte(ASIGNA_ID: number): Promise<asignaciones> {
    console.log('Parametro a la api',ASIGNA_ID)
    const result = await API.get<getAsignaResponse>('sitek/getAsigAnalytic', { params: {ASIGNACION_ID : ASIGNA_ID } });
    console.log('Resultado de la api:',result.data.reporte)
  
    return Promise.resolve(result.data.reporte);
  }


}

export const asignaApi = new AsignaApi();
