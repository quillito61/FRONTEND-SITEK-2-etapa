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
import { Provider } from 'src/types/getProvider';
import { authApi } from 'src/__fake-api__/auth-api';
import { APIUser } from 'src/types/APIUser';

export const UserCreateForm: FC = (props) => {
  const router = useRouter();
  const [providers, setProviders] = useState<Provider[]>([]);
  const [userList, setUserList] = useState<APIUser[]>([]);
  const [selectedUserType, setselectedUserType] = useState<string | null>(null);
  const [provider, setProvider] = useState<string | null>(null);
  const [adcode, setAdcode] = useState<string | null>(null);
  const userTypes = [{ value: "0", text: "ADMIN" }, { value: "1", text: "INTERNO" }, { value: "2", text: "EXTERNO" }]
  
  useEffect(() => {
    const getUsers = async () => {
      const users = await authApi.getUsers();
      setUserList(users);
    }


    async function fetchProviders() {
      const result = await authApi.getProviders();
      setProviders(result);
    }
    fetchProviders();
    getUsers();

  }, [])
  const formik = useFormik({
    initialValues: {
      name: '',
      username: '',
      password: '',
      submit: null
    },
    validationSchema: Yup.object({
      name: Yup.string().max(255).required(),
      password: Yup.string().max(255).required(),
      username: Yup.string().max(255).required().email(),
    }),
    onSubmit: async (values, helpers): Promise<void> => {
      try {
        await authApi.newUser(values.username, values.password, values.name, provider, adcode, selectedUserType);
        // NOTE: Make API request
        toast.success('Usuario creado con exito!');
        await(1000)
        router.push(`/dashboard/users`).catch(console.error);
      } catch (err) {
        toast.error('Something went wrong!');
        helpers.setStatus({ success: false });
        helpers.setErrors({ submit: err.message });
        helpers.setSubmitting(false);
      }
    }
  });
  const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const userTypeSplit = (event.target.value).split('-');
    setselectedUserType(userTypeSplit[0]);
  };
  const handleProviderChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const providerSplit = (event.target.value).split('#');
    setProvider(event.target.value);
  }
  const handleADCChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const providerSplit = (event.target.value).split('-');
    setAdcode(providerSplit[0]);
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
              <TextField
                error={Boolean(formik.touched.name && formik.errors.name)}
                fullWidth
                helperText={formik.touched.name && formik.errors.name}
                label="Nombre"
                name="name"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.name}
              />
              <TextField
                sx={{
                  mb: 2,
                  mt: 3
                }}
                error={Boolean(formik.touched.username && formik.errors.username)}
                fullWidth
                helperText={formik.touched.username && formik.errors.username}
                label="Usuario (Email)"
                name="username"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.username}
              />
              <TextField
                sx={{
                  mb: 2,
                  mt: 3
                }}
                error={Boolean(formik.touched.password && formik.errors.password)}
                fullWidth
                helperText={formik.touched.password && formik.errors.password}
                label="Password"
                name="password" 
                type={'password'}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.password}
              />
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
                  label="Tipo"
                  select
                >
                  {userTypes.map((option) => (
                    <MenuItem
                      key={option.value}
                      value={`${option.value}-${option.text}`}
                    >
                      {`${option.value}-${option.text}`}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              {(selectedUserType?.startsWith('2')  || selectedUserType?.startsWith('6')) && <Grid
                item
                md={12}
                xs={12}
              >
                <TextField
                  onChange={handleProviderChange}
                  fullWidth
                  label="Proveedor"
                  select
                >
                  
                  {providers && providers.sort((a,b)=>a.proveedor_dsc.localeCompare(b.proveedor_dsc)).map((option) => (
                    <MenuItem
                      key={option.proveedor_id}
                      value={`${option.proveedor_id}`}
                    >
                      {`${option.proveedor_dsc}`}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>}

              {/* {selectedUserType?.startsWith('2') && <Grid
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
                  label="ADC"
                  select
                >
                  {userList && userList.sort((a,b)=> a.Username.localeCompare(b.Username)).filter(q => q.UserTypeId === "1") && userList.filter(q => q.UserTypeId === "1").map((option) => (
                    <MenuItem
                      key={option.UserId}
                      value={`${option.UserId}-${option.Username}`}
                    >
                      {`${option.UserId}-${option.Username}`}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>} */}
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
