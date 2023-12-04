import { useState, useEffect, useCallback, MouseEvent, ChangeEvent } from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import NextLink from 'next/link';
import { Box, Button, Card, Container, Grid, Typography } from '@mui/material';
import { productApi } from '../../../__fake-api__/product-api';
import { AuthGuard } from '../../../components/authentication/auth-guard';
import { DashboardLayout } from '../../../components/dashboard/dashboard-layout';
import { ProjectListFilters } from '../../../components/dashboard/product/product-list-filters';
import type { Filters } from '../../../components/dashboard/product/product-list-filters';
import { useMounted } from '../../../hooks/use-mounted';
import { Download as DownloadIcon } from '../../../icons/download';
import { Upload as UploadIcon } from '../../../icons/upload';
import { Plus as PlusIcon } from '../../../icons/plus';
import { gtm } from '../../../lib/gtm';

import {repApi} from 'src/__fake-api__/reportes-api'
import {reportes} from 'src/types/APIReportes'
import { RepListTable } from 'src/components/dashboard/mtoReportes/rep-list-table';

const applyFilters = (
  reportes: reportes[],
  filters: Filters
): reportes[] => reportes.filter((reporte) => {
  if (filters.name) {
    const nameMatched = reporte.REPORTE_DSC.toLowerCase().includes(filters.name.toLowerCase());

    if (!nameMatched) {
      return false;
    }
  }

  // It is possible to select multiple category options
  if (filters.category?.length > 0) {
    return false;
  }

  // It is possible to select multiple status options
  if (filters.status?.length > 0) {

    return false;

  }

  // Present only if filter required
  if (typeof filters.inStock !== 'undefined') {

    return false;

  }

  return true;
});

const applyPagination = (
  reportes: reportes[],
  page: number,
  rowsPerPage: number
): reportes[] => reportes.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

const ReportesList: NextPage = () => {
  const isMounted = useMounted();
  const [reporteList, setReporteList] = useState<reportes[]>([]);
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


  const getReportes = useCallback(async () => {
    try {
      console.log('ENTRE AL GETREPORTES')
      const data = await repApi.getReportes();
      console.log('CARGA DE DATA>>>>>>>>>>>>>>>>>>>>>>>',data)
      if (isMounted()) {
        setReporteList(data);
      }

    } catch (err) {
      console.error(err);
    }
  }, [isMounted]);


  useEffect(
    () => {
      getReportes();
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
  const filteredUsers = applyFilters(reporteList, filters);
  const paginatedUsers = applyPagination(filteredUsers, page, rowsPerPage);

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
              <Grid item>
                <NextLink
                  href="/dashboard/mtoreportes/new"
                  passHref
                >
                  <Button
                    component="a"
                    startIcon={<PlusIcon fontSize="small" />}
                    variant="contained"
                  >
                    Agregar
                  </Button>
                </NextLink>
              </Grid>
            </Grid>
            <Box
              sx={{
                m: -1,
                mt: 3
              }}
            >
              {/* <Button
                startIcon={<UploadIcon fontSize="small" />}
                sx={{ m: 1 }}
              >
                
              </Button>
              <Button
                startIcon={<DownloadIcon fontSize="small" />}
                sx={{ m: 1 }}
              >
                Exportar
              </Button> */}
            </Box>
          </Box>
          <Card>
            <ProjectListFilters onChange={handleFiltersChange} />
            <RepListTable
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleRowsPerPageChange}
              page={page}
              reportes={paginatedUsers}
              usersCount={filteredUsers.length}
              rowsPerPage={rowsPerPage}
            />
          </Card>
        </Container>
      </Box>
    </>
  );
};

ReportesList.getLayout = (page) => (
  <AuthGuard>
    <DashboardLayout>
      {page}
    </DashboardLayout>
  </AuthGuard>
);

export default ReportesList;
