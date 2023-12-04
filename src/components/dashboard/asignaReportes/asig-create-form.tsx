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

import { authApi } from 'src/__fake-api__/auth-api';
import {repApi} from 'src/__fake-api__/reportes-api'
import {asignaApi} from 'src/__fake-api__/asignareportes-api'


import { APIUser } from 'src/types/APIUser';
import { reportes} from 'src/types/APIReportes'
import { number } from 'yup';

export const AsignaCreateForm: FC = (props) => {
  const router = useRouter();
 
  const [userList, setUserList] = useState<APIUser[]>([]);
  const [reportes,setReportes] = useState<reportes[]>([]);

  const [selectedUser, setselectedUser] = useState(0);
  
  const [adcode, setAdcode] = useState(0);
  
  
  useEffect(() => {
    const getUsers = async () => {
      const users = await authApi.getUsers();
      setUserList(users);
    }

   const getReportes = async () => {
   const reportes = await repApi.getReportes();
   setReportes(reportes);

   }
   
    getUsers();
   // getReportes();

  }, [])
  const formik = useFormik({
    initialValues: {
      NOTAS: '',
     
      submit: null
    },
    validationSchema: Yup.object({
      NOTAS: Yup.string().max(255),
      
    }),
    onSubmit: async (values, helpers): Promise<void> => {
     
      if (adcode>0 && selectedUser> 0) {
      try {
         console.log('VALORES')
       
        await asignaApi.newReporte(0,adcode,selectedUser,values.NOTAS);
        
        toast.success('Asignacion creada con exito!');
        await(1000)
        router.push(`/dashboard/asignareportes`).catch(console.error);
      } catch (err) {
        toast.error('Something went wrong!');
        helpers.setStatus({ success: false });
        helpers.setErrors({ submit: err.message });
        helpers.setSubmitting(false);
      }
    
    }  else {alert('Se deben ingresar todos los campos!')}}
  });
  const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const userTypeSplit = Number(event.target.value);
    setselectedUser(userTypeSplit);

  
    
  };
  
  const handleADCChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const providerSplit = Number(event.target.value);
    setAdcode(providerSplit);
    console.log('UserId ',selectedUser)
      const reportes = await repApi.getReportesDispo(Number(event.target.value));
      console.log('reporticos',reportes)
      setReportes(reportes);
      if (reportes.length ==0) {alert('Usuario tiene todos los reportes asociados!')}
  }

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
             
             <Grid
                item
                md={12}
                xs={12}
                sx={{
                  mb: 2,
                  mt: 3
                }}
              >
                <TextField
                  onChange={handleADCChange}
                  fullWidth
                  label="Usuario a asociar"
                  select
                >
                  {userList.map((option) => (
                    <MenuItem
                      key={option.UserId}
                      value={`${option.UserId}`}
                    >
                      {`${option.Username}`}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              {(reportes.length > 0)  &&
            
              <Grid
                item
                md={12}
                xs={12}
                sx={{
                  mb: 2,
                  mt: 3
                }}
              >
                <TextField
                  onChange={handleChange}
                  fullWidth
                  label="Reporte a asociar"
                  select
                >
                  {reportes.map((option) => (
                    <MenuItem
                      key={option.REPORTE_ID}
                      value={`${option.REPORTE_ID}`}
                    >
                      {`${option.REPORTE_DSC}`}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>}
             


              <TextField
                error={Boolean(formik.touched.NOTAS && formik.errors.NOTAS)}
                fullWidth
                helperText={formik.touched.NOTAS && formik.errors.NOTAS}
                label="Notas"
                name="NOTAS"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.NOTAS}
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
        onClick={()=> router.push(`/dashboard/users`)}
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
