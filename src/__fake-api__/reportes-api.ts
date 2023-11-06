import { RestoreOutlined } from '@mui/icons-material';
import { reportes, ReportesResponse,getReporteResponse} from 'src/types/APIReportes';

import API from './API';



class ReporteApi {
 
  async newReporte (REPORTE_ID: number,REPORTE_DSC:string,LINK:string ): Promise<boolean> {
    await API.post<reportes>('sitek/editAnalytics', { REPORTE_ID,REPORTE_DSC,LINK });
    return Promise.resolve(true);
  }

  async delReporte (REPORTE_ID: number): Promise<boolean> {
    //alert(userId )
    const count = await API.delete<reportes>('sitek/delAnalytics',{ params: { REPORTE_ID: REPORTE_ID } });
    return Promise.resolve(true);
  }

  async getReportes(): Promise<reportes[]> {
    
    const result = await API.get<ReportesResponse>('sitek/getAnalytics');
    console.log('REPORTES:::::::',result)
    return Promise.resolve(result.data.reportes);
  }


  async getReportesDispo(UserId:number): Promise<reportes[]> {
    
    const result = await API.get<ReportesResponse>('sitek/getAnalyticDispo',{ params: { UserId: UserId } });
    console.log('REPORTES filtrados:::::::',result)
    return Promise.resolve(result.data.reportes);
  }

  

  async GetReporte(REPORTE_ID: number): Promise<reportes> {
    console.log('Parametro a la api',REPORTE_ID)
    const result = await API.get<getReporteResponse>('sitek/getAnalytic', { params: { REPORTE_ID: REPORTE_ID } });
    console.log('Resultado de la api:',result.data.reporte)
  
    return Promise.resolve(result.data.reporte);
  }


}

export const repApi = new ReporteApi();
