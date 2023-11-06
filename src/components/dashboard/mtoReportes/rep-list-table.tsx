import { ChangeEvent, Fragment, MouseEvent } from 'react';
import type { FC } from 'react';
import PropTypes from 'prop-types';
import { PencilAlt as PencilAltIcon } from '../../../icons/pencil-alt';
import {
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
} from '@mui/material';
import { Scrollbar } from '../../scrollbar';
import { reportes } from 'src/types/APIReportes';
import NextLink from 'next/link';

interface UserListTableProps {
  onPageChange: (event: MouseEvent<HTMLButtonElement> | null, newPage: number) => void;
  onRowsPerPageChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  page: number;
  reportes: reportes[];
  usersCount: number;
  rowsPerPage: number;
}



export const RepListTable: FC<UserListTableProps> = (props) => {
  const {
    onPageChange,
    onRowsPerPageChange,
    page,
    reportes,
    usersCount,
    rowsPerPage,
    ...other
  } = props;

  return (
    <div {...other}>
      <Scrollbar>
        <Table sx={{ minWidth: 1200 }}>
          <TableHead>
            <TableRow>
              
              <TableCell>
                Descripcion Reporte
              </TableCell>
              <TableCell>
                Enlace
              </TableCell>
             
              <TableCell>
                Editar
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {reportes.map((reporte) => {
              return (
                <Fragment key={reporte.REPORTE_ID}>
                  <TableRow
                    hover
                    key={reporte.REPORTE_ID}
                  >
                    <TableCell>
                      {reporte.REPORTE_DSC}
                    </TableCell>
                    <TableCell>
                      {reporte.LINK}
                    </TableCell>
                    
                    <TableCell align="center">
                    <NextLink
                          href={`/dashboard/mtoreportes/${reporte.REPORTE_ID}/edit`}
                   
                      passHref
                    >
                      <IconButton component="a">
                        <PencilAltIcon fontSize="small" />
                      </IconButton>
                    </NextLink>
                   
                  </TableCell>
                  </TableRow>
                </Fragment>
              );
            })}
          </TableBody>
        </Table>
      </Scrollbar>
      <TablePagination
        component="div"
        count={usersCount}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
        page={page}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </div>
  );
};

RepListTable.propTypes = {
  reportes: PropTypes.array.isRequired,
  usersCount: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  onRowsPerPageChange: PropTypes.func,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired
};
