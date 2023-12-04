import { useState, type FC } from 'react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import toast from 'react-hot-toast';
import {
  Avatar,
  Box,
  Button,
  Divider,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Modal,
  Popover,
  TextField,
  Typography
} from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
//import { useAuth } from '../../hooks/use-auth';
import { Cog as CogIcon } from '../icons/cog';
import { UserCircle as UserCircleIcon } from '../icons/user-circle';
import { SwitchHorizontalOutlined as SwitchHorizontalOutlinedIcon } from '../icons/switch-horizontal-outlined';
import { authApi } from 'src/__fake-api__/auth-api';
import { View } from '@react-pdf/renderer';


interface AccountPopoverProps {
  anchorEl: null | Element;
  onClose?: () => void;
  open?: boolean;
  usuario: string;
}

export const RejectPassPopover: FC<AccountPopoverProps> = (props) => {
  const { anchorEl, onClose, open, usuario,...other } = props;
  const router = useRouter();
  
  const [pass1,setPass1] = useState('')
  const [pass2,setPass2] = useState('')

  

  const CambiarPass = async (): Promise<void> => {
    //alert(usuario.UserId)
    console.log('usuario usuario',usuario)
    console.log(pass1,pass2)
    if(pass1 != pass2) {
      alert('Passwords no coinciden!');
       }
        else {
                  if (confirm("Desea resetear el password? "  ) == true) 
                  {
                
                    try {
                      await authApi.newUser(usuario, pass1, 'RESETPASS', '', '', '');
                      // NOTE: Make API request
                      toast.success('Password cambiado con exito!');
                      await(1000)
                      //router.push(`/dashboard/users`).catch(console.error);
                    } catch (err) {
                      toast.error('Something went wrong!');
                     
                    }
                
                    
                  }
                  onClose?.();
   
   }}

  return (
    <Popover
      anchorEl={anchorEl}
      
      anchorOrigin={{
        horizontal: 'center',
        vertical: 'bottom'
      }}
      keepMounted
      onClose={onClose}
      open={!!open}
      
      color='blue'
      PaperProps={{ sx: { width: 400 } }}
      transitionDuration={0}
      {...other}
    >
      
     <TextField
        autoFocus
        //error={Boolean(formik.touched.email && formik.errors.email)}
        fullWidth
       // helperText={formik.touched.email && formik.errors.email}
        label="Nuevo password"
        margin="normal"
        name="pass1"
        color='warning'
     //   onBlur={formik.handleBlur}
        onChange={(e) => setPass1(e.target.value)}
        type="password"
      //  value={formik.values.email}
      />
      <TextField
     //   error={Boolean(formik.touched.password && formik.errors.password)}
        fullWidth
    //    helperText={formik.touched.password && formik.errors.password}
        label="Repita password para verificar"
        margin="normal"
        name="password"
        color='warning'
     //   onBlur={formik.handleBlur}
     onChange={(e) => setPass2(e.target.value)}
        type="password"
     //   value={formik.values.password}
      />

      <Button
        color='success'
        onClick={()=> CambiarPass()}
          sx={{ m: 1 }}
          variant="outlined"
        >
          Cambiar Password
        </Button>
       </Popover>
  );
};

RejectPassPopover.propTypes = {
  anchorEl: PropTypes.any,
  onClose: PropTypes.func,
  open: PropTypes.bool
};
