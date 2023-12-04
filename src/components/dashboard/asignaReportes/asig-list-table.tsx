import { ChangeEvent, Fragment, MouseEvent } from 'react';
import type { FC } from 'react';
import PropTypes from 'prop-types';
import { PencilAlt as PencilAltIcon } from '../../../icons/pencil-alt';
import { Trash as TrashIcon } from '../../../icons/trash';
import {
  Button,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
} from '@mui/material';
import { Scrollbar } from '../../scrollbar';
import { asignacionesExt } from 'src/types/APIAsignaciones';
import {asignaApi} from 'src/__fake-api__/asignareportes-api'
import NextLink from 'next/link';
import toast from 'react-hot-toast';
import router from 'next/router';
import { User } from 'src/icons/user';

interface UserListTableProps {
  onPageChange: (event: MouseEvent<HTMLButtonElement> | null, newPage: number) => void;
  onRowsPerPageChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  page: number;
  users: asignacionesExt[];
  usersCount: number;
  rowsPerPage: number;
}

const eliminarAsignacion = async (asignadoId:string): Promise<void> => {
  //alert(usuario.UserId)
   if (confirm("Desea eliminar la asignacion:? "  + ' ' + asignadoId ) == true) 
   {

     try {
       await  asignaApi.delReporte(Number(asignadoId));
       // NOTE: Make API request
       toast.success('Asignacion eliminada con exito!');
       await(1000)
       router.reload()   //.catch(console.error);
     } catch (err) {
       toast.error('Something went wrong!');
      
     }

     
   }
 
 }

export const AsignaListTable: FC<UserListTableProps> = (props) => {
  const {
    onPageChange,
    onRowsPerPageChange,
    page,
    users,
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
              <TableCell />
              <TableCell>
                Nombre
              </TableCell>
              <TableCell>
                Usuario
              </TableCell>
              <TableCell>
                Reporte
              </TableCell>
              <TableCell>
                Notas
              </TableCell>
              <TableCell>
                
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => {
              return (
                <Fragment key={user.ASIGNACION_ID}>
                  <TableRow
                    hover
                    key={user.ASIGNACION_ID}
                  >
                    <TableCell>
                      {user.ASIGNACION_ID}
                    </TableCell>
                    <TableCell>
                      {user.Name}
                    </TableCell>
                    <TableCell>
                      {user.Username}
                    </TableCell>
                    <TableCell>
                      {user.REPORTE_DSC}
                    </TableCell>
                    <TableCell>
                      {user.NOTAS}
                    </TableCell>
                    <TableCell align="center">
                    <Button        
                          
                          onClick={() => eliminarAsignacion(user.ASIGNACION_ID)}
                          variant="contained"
                          //disabled
                          color="error" 
                          startIcon={<TrashIcon />}
                    >
                     Eliminar
                    </Button>
                   
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

AsignaListTable.propTypes = {
  users: PropTypes.array.isRequired,
  usersCount: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  onRowsPerPageChange: PropTypes.func,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired
};
