import { FC, useEffect } from 'react';
import { useState } from 'react';
import { useRouter } from 'next/router';
import toast from 'react-hot-toast';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  MenuItem,
  TextField,
  Typography
} from '@mui/material';
import { Trash as TrashIcon } from '../../../icons/trash';
import { Provider } from 'src/types/getProvider';
import { authApi } from 'src/__fake-api__/auth-api';
import {reportes } from 'src/types/APIReportes';
import UsuarioEdit from 'src/pages/dashboard/users/[UserId]/edit';
import { User } from 'src/icons/user';
import { repApi } from 'src/__fake-api__/reportes-api';

interface ReporteEditFormProps {
  reporte: reportes;
}


export const RepEditForm: FC<ReporteEditFormProps> = (props) => {
  
  const router = useRouter();
  const {reporte, ...other} = props;
  
  
  
  
  
  const userTypes = [{ value: "0", text: "ADMIN" }, { value: "1", text: "INTERNO" }, { value: "2", text: "EXTERNO" } ]
  //console.log('VALORES INICIALES:',reporte.REPORTE_ID)
 // console.log(usuario.Name,usuario.Username,usuario.adc,usuario.gln,usuario.UserTypeId)
 
  


  
     
      
  
  

  
  const eliminarReporte = async (): Promise<void> => {
   //alert(usuario.UserId)
    if (confirm("Desea eliminar el reporte:? " + String(reporte.REPORTE_DSC) ) == true) 
    {

      try {
        await repApi.delReporte(Number(reporte.REPORTE_ID));
        // NOTE: Make API request
        toast.success('Reporte eliminado con exito!');
        await(1000)
        router.push(`/dashboard/mtoreportes`).catch(console.error);
      } catch (err) {
        toast.error('Something went wrong!');
       
      }

      
    }
  
  }
  

  const formik = useFormik({
    
    initialValues: {
      reporteId: reporte.REPORTE_ID,
      reporteDSC: reporte.REPORTE_DSC,
      link: reporte.LINK,
      
      
      submit: null
    },
    validationSchema: Yup.object({
      reporteDSC: Yup.string().max(255).required(),
      
      link: Yup.string().max(255).required(),
    }),
    onSubmit: async (values, helpers): Promise<void> => {
      console.log(values.reporteDSC, values.link)

      if (confirm("Desea actualizar el reporte:? " + String(reporte.REPORTE_DSC) ) == true) 
      {

     
      try {

        await repApi.newReporte(Number(values.reporteId), values.reporteDSC,values.link);
        // NOTE: Make API request
        toast.success('Reporte actualizado con exito!');
        await(1000)
        router.push(`/dashboard/mtoreportes`).catch(console.error);
      } catch (err) {
        toast.error('Something went wrong!');
        helpers.setStatus({ success: false });
        helpers.setErrors({ submit: err.message });
        helpers.setSubmitting(false);
      }
    }}
  });


  

 

  return (
    <form
      onSubmit={formik.handleSubmit}
      {...props}
    >
      <Card>
        <CardContent>
          <Grid
            container
            spacing={3}
          >
            <Grid
              item
              md={4}
              xs={12}
            >
              <Typography variant="h6">
                Detalle
              </Typography>
            </Grid>
            <Grid
              item
              md={8}
              xs={12}
            >
              <TextField
                error={Boolean(formik.touched.reporteDSC && formik.errors.reporteDSC)}
                fullWidth
                helperText={formik.touched.reporteDSC && formik.errors.reporteDSC}
                label="Descripcion Reporte"
                name="reporteDSC"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.reporteDSC}
              />
              <TextField
                sx={{
                  mb: 2,
                  mt: 3
                }}
                error={Boolean(formik.touched.link && formik.errors.link)}
                fullWidth
                helperText={formik.touched.link && formik.errors.link}
                label="Enlace"
                name="link"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.link}
              />
       
            
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          mx: -1,
          mb: -1,
          mt: 3
        }}
      >
        <Button
        onClick={()=> router.push(`/dashboard/mtoreportes`)}
          sx={{ m: 1 }}
          variant="outlined"
        >
          Cancelar
        </Button>
        <Button
          sx={{ m: 1 }}
          type="submit"
          variant="contained"
        >
          Actualizar...
        </Button>
        <Button
          sx={{ m: 1 }}
          onClick={eliminarReporte}
          variant="contained"
          //disabled
          color="error" 
          startIcon={<TrashIcon />}
        >
          Eliminar...
        </Button>
      </Box>
    </form>
  );
};
