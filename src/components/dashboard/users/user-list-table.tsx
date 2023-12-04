import { ChangeEvent, Fragment, MouseEvent, useRef, useState } from 'react';
import type { FC } from 'react';
import PropTypes from 'prop-types';
import { PencilAlt as PencilAltIcon } from '../../../icons/pencil-alt';
import {RejectPassPopover} from '../../../components/changePass-dialog'
import { UserCircle as UserCircleIcon } from '../../../icons/user-circle';
import KeySharpIcon from '@mui/icons-material/KeySharp';
import {
  Avatar,
  Button,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Tooltip,
} from '@mui/material';
import { Scrollbar } from '../../scrollbar';
import { APIUser } from 'src/types/APIUser';
import NextLink from 'next/link';

interface UserListTableProps {
  onPageChange: (event: MouseEvent<HTMLButtonElement> | null, newPage: number) => void;
  onRowsPerPageChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  page: number;
  users: APIUser[];
  usersCount: number;
  rowsPerPage: number;
  
}

const ResetPassword = ({ usuario }: { usuario: string }) => {


  // Error: Invalid hook call. Hooks can only be called inside of the body of a function component

  const anchorRef = useRef<HTMLButtonElement | null>(null);
  const [openPopover, setOpenPopover] = useState<boolean>(false);

  const handleOpenPopover = (): void => {
    setOpenPopover(true);
  };

  const handleClosePopover = (): void => {
    setOpenPopover(false);
  };
  console.log('El user://',usuario)
  return (
    <>
      <Tooltip title="Contacts">
        <IconButton
          onClick={handleOpenPopover}
          sx={{ ml: 1 }}
          ref={anchorRef}
        >
          <KeySharpIcon fontSize="large" />
        </IconButton>
      </Tooltip>
      <RejectPassPopover
        anchorEl={anchorRef.current}
        onClose={handleClosePopover}
        open={openPopover}
        usuario={usuario}
        
      />
    </>
  );



  
 }

export const UserListTable: FC<UserListTableProps> = (props) => {
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
                Proveedor (si es externo)
              </TableCell>
              <TableCell>
                Tipo
              </TableCell>
              <TableCell>
                Editar
              </TableCell>
              <TableCell>
                Reset Password
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => {
              return (
                <Fragment key={user.UserId}>
                  <TableRow
                    hover
                    key={user.UserId}
                  >
                     <Avatar
                        
                        src={''}
                        sx={{
                          height: 42,
                          width: 42
                        }}
                      >
                       {user.UserId}
              </Avatar>
                    
                    <TableCell>
                      {user.Name}
                    </TableCell>
                    <TableCell>
                      {user.Username}
                    </TableCell>
                    <TableCell>
                      
                      {user.proveedor_dsc} 
                    </TableCell>
                    <TableCell>
                      {user.Description}
                    </TableCell>
                    <TableCell align="center">
                    <NextLink
                          href={`/dashboard/users/${user.UserId}/edit`}
                   
                      passHref
                    >
                      <IconButton component="a">
                        <PencilAltIcon fontSize="small" />
                      </IconButton>
                    </NextLink>
                   
                  </TableCell>
                  <TableCell align="center">
                    {/* <Button        
                          
                          onClick={() => resetPassword(user.UserId)}
                          variant="contained"
                          //disabled
                          color="error" 
                          // startIcon={<TrashIcon />}
                    >
                     Reset
                    </Button> */}
                  
                    <ResetPassword usuario={user.Username}  />
                   
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

UserListTable.propTypes = {
  users: PropTypes.array.isRequired,
  usersCount: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  onRowsPerPageChange: PropTypes.func,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired
};
