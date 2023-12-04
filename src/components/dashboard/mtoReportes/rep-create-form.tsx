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


import {repApi} from 'src/__fake-api__/reportes-api'
import {reportes} from 'src/types/APIReportes'



export const ReporteCreateForm: FC = (props) => {
  const router = useRouter();
 
 
  
  

  const formik = useFormik({
    initialValues: {
      ReporteDsc: '',
      ReporteLink: '',
    
      submit: null
    },
    validationSchema: Yup.object({
      ReporteDsc: Yup.string().max(255).required(),

      ReporteLink: Yup.string().max(255).required(),
    }),
    onSubmit: async (values, helpers): Promise<void> => {
      try {
        await repApi.newReporte(0,values.ReporteDsc, values.ReporteLink);
        // NOTE: Make API request
        toast.success('Usuario creado con exito!');
        await(1000)
        router.push(`/dashboard/mtoreportes`).catch(console.error);
      } catch (err) {
        toast.error('Something went wrong!');
        helpers.setStatus({ success: false });
        helpers.setErrors({ submit: err.message });
        helpers.setSubmitting(false);
      }
    }
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
                error={Boolean(formik.touched.ReporteDsc && formik.errors.ReporteDsc)}
                fullWidth
                helperText={formik.touched.ReporteDsc && formik.errors.ReporteDsc}
                label="Descripcion Reporte"
                name="ReporteDsc"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.ReporteDsc}
              />
              <TextField
                sx={{
                  mb: 2,
                  mt: 3
                }}
                error={Boolean(formik.touched.ReporteLink && formik.errors.ReporteLink)}
                fullWidth
                helperText={formik.touched.ReporteLink && formik.errors.ReporteLink}
                label="Enlace Reporte"
                name="ReporteLink"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.ReporteLink}
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
          Crear
        </Button>
      </Box>
    </form>
  );
};
