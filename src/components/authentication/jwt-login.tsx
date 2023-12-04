import type { FC } from 'react';
import { useRouter } from 'next/router';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { Alert, Box, Button, FormHelperText, Link, TextField } from '@mui/material';
import { useAuth } from '../../hooks/use-auth';
import { useMounted } from '../../hooks/use-mounted';

export const JWTLogin: FC = (props) => {
  const isMounted = useMounted();
  const router = useRouter();
  const { login } = useAuth();
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      submit: null
    },
    validationSchema: Yup.object({
      email: Yup
        .string()
        .email('Debe ser un correo electrónico válido')
        .max(255)
        .required('Correo es requerido'),
      password: Yup
        .string()
        .max(255)
        .required('Password es requerido')
    }),
    onSubmit: async (values, helpers): Promise<void> => {
      try {
        await login(values.email, values.password);

        if (isMounted()) {
          const returnUrl = (router.query.returnUrl as string | undefined) || '/dashboard';
          router.push(returnUrl).catch(console.error);
        }
      } catch (err) {
        console.error(err);

        if (isMounted()) {
          helpers.setStatus({ success: false });
          helpers.setErrors({ submit: err.message });
          helpers.setSubmitting(false);
        }
      }
    }
  });

  return (
    <form
      noValidate
      onSubmit={formik.handleSubmit}
      {...props}
    >
      <TextField
        autoFocus
        error={Boolean(formik.touched.email && formik.errors.email)}
        fullWidth
        helperText={formik.touched.email && formik.errors.email}
        label="Dirección Correo Electrónico"
        margin="normal"
        name="email"
        onBlur={formik.handleBlur}
        onChange={formik.handleChange}
        type="email"
        value={formik.values.email}
      />
      <TextField
        error={Boolean(formik.touched.password && formik.errors.password)}
        fullWidth
        helperText={formik.touched.password && formik.errors.password}
        label="Password"
        margin="normal"
        name="password"
        onBlur={formik.handleBlur}
        onChange={formik.handleChange}
        type="password"
        value={formik.values.password}
      />
      {formik.errors.submit && (
        <Box sx={{ mt: 3 }}>
          <FormHelperText error>
            {formik.errors.submit}
          </FormHelperText>
        </Box>
      )}
      <Box sx={{ mt: 2 }}>
        <Button
          disabled={formik.isSubmitting}
          fullWidth
          size="large"
          type="submit"
          variant="contained"
        >
          Iniciar sesion
        </Button>
      </Box>

      {/* <Box sx={{ mt: 2 }}>
        <Link
          href="/dashboard/proveedores/crearProveedor"
       
        
          
        >
          Registro Proveedor nuevo...
        </Link>
      </Box> */}
    </form>
  );
};
