import { useCallback, useEffect, useState } from 'react';
import type { NextPage } from 'next';
import NextLink from 'next/link';
import Head from 'next/head';
import { Box, Breadcrumbs, Container, Link, Typography } from '@mui/material';
import { AuthGuard } from '../../../../components/authentication/auth-guard';
import { DashboardLayout } from '../../../../components/dashboard/dashboard-layout';

import { gtm } from '../../../../lib/gtm';
import { RepEditForm } from 'src/components/dashboard/mtoReportes/rep-edit-form';
import { useRouter } from 'next/router';
import { useMounted } from '../../../../hooks/use-mounted';
import { repApi } from 'src/__fake-api__/reportes-api';
import { reportes } from 'src/types/APIReportes';


const UsuarioEdit: NextPage = () => {
  const router = useRouter();
  const {REPORTE_ID} = router.query;
 
  //alert(UserId)
  const isMounted = useMounted();
  const [reporteload, setReporteload] = useState<reportes | null>(null);

  useEffect(() => {
    gtm.push({ event: 'page_view' });
  }, []);


  const getUsuario = useCallback(async () => {
    try {
      
      const data = await repApi.GetReporte(Number(REPORTE_ID));     // PONER EL PARAMETRO AQUI!              <------------------------------------
       
        //console.log('data --------------->>>>>',data)
       
        setReporteload(data);
        
        
        if (isMounted()) {
          setReporteload(data);
       
      }
    } catch (err) {
      console.error('EL ERROR ES:',err);
    }
  }, [isMounted]);

  useEffect(
    () => {
      getUsuario();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );
  

  if (!reporteload) {
    return null
  }

  return (
    <>
      <Head>
        <title>
          Edit Reporte | Cia
        </title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8
        }}
      >
        <Container maxWidth="md">
          <Box sx={{ mb: 3 }}>
            <Typography variant="h4">
              Editar Reporte 
            </Typography>
            <Breadcrumbs
              separator="/"
              sx={{ mt: 1 }}
            >
              <NextLink
                href="/dashboard"
                passHref
              >
                <Link variant="subtitle2">
                  Dashboard
                </Link>
              </NextLink>
              <NextLink
                href="/dashboard"
                passHref
              >
                <Link
                  color="primary"
                  variant="subtitle2"
                >
                  Reportes
                </Link>
              </NextLink>
              <Typography
                color="textSecondary"
                variant="subtitle2"
              >
                Usuario
              </Typography>
            </Breadcrumbs>
          </Box>
          <RepEditForm 
           
           
           reporte={reporteload!}
          
          />
        </Container>
      </Box>
    </>
  );
};

UsuarioEdit.getLayout = (page) => (
  <AuthGuard>
    <DashboardLayout>
      {page}
    </DashboardLayout>
  </AuthGuard>
);

export default UsuarioEdit;
