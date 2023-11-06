import { useState, useEffect, useCallback, MouseEvent, ChangeEvent } from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import NextLink from 'next/link';
import { Box, Button, Card, Container, Grid, Typography } from '@mui/material';
import { asignaApi } from '../../../__fake-api__/asignareportes-api';
import { AuthGuard } from '../../../components/authentication/auth-guard';
import { DashboardLayout } from '../../../components/dashboard/dashboard-layout';
import { ProjectListFilters } from '../../../components/dashboard/product/product-list-filters';
import type { Filters } from '../../../components/dashboard/product/product-list-filters';
import { useMounted } from '../../../hooks/use-mounted';
import { Download as DownloadIcon } from '../../../icons/download';
import { Upload as UploadIcon } from '../../../icons/upload';
import { Plus as PlusIcon } from '../../../icons/plus';
import { gtm } from '../../../lib/gtm';

import {asignacionesExt} from 'src/types/APIAsignaciones'
import { useAuth } from 'src/hooks/use-auth';

import { Tablereportes } from '../../../components/dashboard/Reportes/SelectorReportes';
import { Po } from 'src/types/pos';




// const applyFilters = (
//   productosNew: Articulo[],
//   filters: Filters
// ): Articulo[] => productosNew.filter((productoNuevo) => {
//   if (filters.name) {
//     const nameMatched = productoNuevo.DescripcionProducto.toLowerCase().includes(filters.name.toLowerCase());

//     if (!nameMatched) {
//       return false;
//     }
//   }

  // It is possible to select multiple category options
//   if (filters.category?.length > 0) {
//     return false;
//   }

//   // It is possible to select multiple status options
//   if (filters.status?.length > 0) {

//     return false;

//   }

//   // Present only if filter required
//   if (typeof filters.inStock !== 'undefined') {

//     return false;

//   }

//   return true;
// });

// const applyPagination = (
//   products: Articulo[],
//   page: number,
//   rowsPerPage: number
// ): Articulo[] => products.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

const ReportesTable: NextPage = () => {
  const isMounted = useMounted();
  const { user } = useAuth();
 
 
  const [reportes, setReportes] = useState<asignacionesExt[]>([]);
  const [reportesFilter, setReportesFilter] = useState<asignacionesExt[]>([]);

  //const [pos, setPos] = useState<Po[]>([]);
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(5);
  const [filters, setFilters] = useState<Filters>({
    name: undefined,
    category: [],
    status: [],
    inStock: undefined
  });

  useEffect(() => {
    gtm.push({ event: 'page_view' });
  }, []);
  //const getPOS = useCallback(async () => {
   // const response = await productApi.getPOS();
   // if (isMounted()) {
   //   setPos(response);
   // }
  //}, [isMounted]);
  const getReportes = useCallback(async () => {
    try {
      const data = await  asignaApi.getReportes();

      if (isMounted()) {
        console.log('USUARIO',user.name)
        setReportes(data);
        const filtered = data.filter(asigna => asigna.Name.match(user.name));
        setReportesFilter(filtered);
        //alert(data);
        console.log(filtered)
      }
    } catch (err) {
      console.error(err);
    }
  }, [isMounted]);

  

  useEffect(
    () => {
      getReportes();
      //getPOS();
     // getProductsNew();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const handleFiltersChange = (filters: Filters): void => {
    setFilters(filters);
  };

  const handlePageChange = (event: MouseEvent<HTMLButtonElement> | null, newPage: number): void => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  // Usually query is done on backend with indexing solutions
  //const filteredProductsNew = applyFilters(productsNew, filters);
  //const paginatedProductsNew = applyPagination(filteredProductsNew, page, rowsPerPage);

  return (
    <>
      <Head>
        <title>
            Reportes | cia
        </title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8
        }}
      >
        <Container maxWidth="xl">
          <Box sx={{ mb: 4 }}>
            <Grid
              container
              justifyContent="space-between"
              spacing={3}
            >
              <Grid item>
                <Typography variant="h4">
                  Reportes
                </Typography>
              </Grid>
             
            </Grid>
            <Box
              sx={{
                m: -1,
                mt: 3
              }}
            >
           
            </Box>
          </Box>
          <Card>
            {/* <ProjectListFilters onChange={handleFiltersChange} /> */}
            <Tablereportes  reports={reportesFilter}/>
          </Card>
        </Container>
      </Box>
    </>
  );
};

ReportesTable.getLayout = (page) => (
  <AuthGuard>
    <DashboardLayout>
      {page}
    </DashboardLayout>
  </AuthGuard>
);

export default ReportesTable;
