import { ReactNode, useEffect, useMemo, useRef, useState } from 'react';
import type { FC } from 'react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import type { TFunction } from 'react-i18next';
import { Box, Button, Chip, Divider, Drawer, Typography, useMediaQuery } from '@mui/material';
import type { Theme } from '@mui/material';
import { Calendar as CalendarIcon } from '../../icons/calendar';
import { Cash as CashIcon } from '../../icons/cash';
import { ChartBar as ChartBarIcon } from '../../icons/chart-bar';
import { ChartPie as ChartPieIcon } from '../../icons/chart-pie';
import { ChatAlt2 as ChatAlt2Icon } from '../../icons/chat-alt2';
import { ClipboardList as ClipboardListIcon } from '../../icons/clipboard-list';
import { CreditCard as CreditCardIcon } from '../../icons/credit-card';
import { Home as HomeIcon } from '../../icons/home';
import { LockClosed as LockClosedIcon } from '../../icons/lock-closed';
import { Mail as MailIcon } from '../../icons/mail';
import { MailOpen, MailOpen as MailOpenIcon } from '../../icons/mail-open';
import { Newspaper, Newspaper as NewspaperIcon } from '../../icons/newspaper';
import { OfficeBuilding as OfficeBuildingIcon } from '../../icons/office-building';
import { ReceiptTax as ReceiptTaxIcon } from '../../icons/receipt-tax';
import { Selector as SelectorIcon } from '../../icons/selector';
import { Share as ShareIcon } from '../../icons/share';
import { ShoppingBag as ShoppingBagIcon } from '../../icons/shopping-bag';
import { Cog as CogIcon } from '../../icons/cog';
import { User as UserIcon } from '../../icons/user';
import { ChatAlt, ChatAlt as ChatAltIcon } from '../../icons/chat-alt';
import { ShoppingCart as ShoppingCartIcon } from '../../icons/shopping-cart';
import { Truck as TruckIcon } from '../../icons/truck';
import { UserCircle as UserCircleIcon } from '../../icons/user-circle';
import { Users as UsersIcon } from '../../icons/users';
import { XCircle as XCircleIcon } from '../../icons/x-circle';
import { Logo } from '../logo';
import { Scrollbar } from '../scrollbar';
import { DashboardSidebarSection } from './dashboard-sidebar-section';
import { OrganizationPopover } from './organization-popover';
import { useAuth } from 'src/hooks/use-auth';
import PersonAddSharpIcon from '@mui/icons-material/PersonAddSharp';

interface DashboardSidebarProps {
  onClose?: () => void;
  open?: boolean;
}

interface Item {
  title: string;
  children?: Item[];
  chip?: ReactNode;
  icon?: ReactNode;
  path?: string;
}

interface Section {
  title: string;
  items: Item[];
}

const getSections = (t: TFunction, user: any): Section[] => {


let UserType = (user ? user.UserType : '')

  if(UserType == '0'){
    return [
      {
        title: t('General'),
        items: [
          {
            title: 'Usuarios',
            
            path: '/dashboard/users',
            icon: <UsersIcon fontSize="small" />,
            children: [
              {
                title: 'Lista de usuarios',
                path: '/dashboard/users'
                
              },
            
            ]
            
          },
          {
            title: 'Reportes',
            path: '/dashboard/mtoreportes',
            icon: <Newspaper fontSize="small" />,
            children: [
              {
                title: 'Lista de Reportes',
                path: '/dashboard/mtoreportes'
              }
            ]
          },

          {
            title: 'Asignar Reportes...',
            path: '/dashboard/asignareportes',
            icon: <PersonAddSharpIcon fontSize="large" />,
            children: [
              {
                title: 'Lista de Asignaciones',
                path: '/dashboard/asignareportes'
              }
            ]
          },



        ]
      }
    ]
  }
  else 
  
  
  if(UserType == '1'){
    return [
      {
        title: t('General'),
        items: [
         
          {
            title: 'Reportes',
            path: '/dashboard/Reportes',
            icon: <Newspaper fontSize="small" />,
            children: [
              {
                title: 'Menu de Reportes',
                path: '/dashboard/Reportes'
              }
            ]
          },
         
        ]
      }
    ]
  }
  else if(UserType == '2' ){
    return [
      {
        title: t('General'),
        items: [
         
          {
            title: 'Reportes',
            path: '/dashboard/Reportes',
            icon: <Newspaper fontSize="small" />,
            children: [
              {
                title: 'Menu de Reportes',
                path: '/dashboard/Reportes'
              }
            ]
          },
         
        ]
      }
    ]
  }
  
  
    else {
    return [
      {
        title: t('General'),
        items: [
          {
            title: 'Productos',
            path: '/dashboard/products',
            icon: <ShoppingBagIcon fontSize="small" />,
            children: [
              {
                title: 'Productos a Aprobar',
                path: '/dashboard/products'
              }
            ]
          },

          // {
          //   title: 'Reportes',
          //   path: '/dashboard/Reportes',
          //   icon: <ShoppingBagIcon fontSize="small" />,
          //   children: [
          //     {
          //       title: 'Menu de Reportes',
          //       path: '/dashboard/Reportes'
          //     }
          //   ]
          // },
          {
            title: 'Mensajes',
            path: '/dashboard/citasmensajenew/new',
            icon: <MailOpen fontSize="small" />,
            children: [
              {
                title: 'Crear Cita/Mensaje',
                path: '/dashboard/citasmensajes/'
              }
            ]
           }
        ]
      }
    ]
  }
    
  
  
} 

export const DashboardSidebar: FC<DashboardSidebarProps> = (props) => {
  const { onClose, open } = props;
  const { user } = useAuth();
  const router = useRouter();
  
  const { t } = useTranslation();
  const lgUp = useMediaQuery(
    (theme: Theme) => theme.breakpoints.up('lg'),
    {
      noSsr: true
    }
  );
  const sections = useMemo(() => getSections(t, user), [t,user]);
  const organizationsRef = useRef<HTMLButtonElement | null>(null);
  const [openOrganizationsPopover, setOpenOrganizationsPopover] = useState<boolean>(false);

  const ResetForm = () => {

    //user.formActive = false;
    
   router.push('/dashboard')
  }

  const handlePathChange = () => {
    if (!router.isReady) {
      return;
    }

    if (open) {
      onClose?.();
    }
  };

  useEffect(
    handlePathChange,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [router.isReady, router.asPath]
  );

  const handleOpenOrganizationsPopover = (): void => {
    setOpenOrganizationsPopover(true);
  };

  const handleCloseOrganizationsPopover = (): void => {
    setOpenOrganizationsPopover(false);
  };

  const content = (
    <>
      <Scrollbar
        sx={{
          height: '100%',
          '& .simplebar-content': {
            height: '100%'
          }
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column', backgroundColor: '#1C3B8D',
            height: '100%'
          }}
        >
          <div>
            <Box sx={{ p: 3 }}>
              <NextLink
           
                href="/dashboard"
                passHref
              >
                <a>
                <Box
              sx={{
                alignItems: 'center', alignSelf: 'center', alignContent: 'center',
                display: 'flex',
                '& img': {
                  height: 160, backgroundColor: '#1C3B8D', borderRadius: 2, padding: 1,
                  m: 2
                }
              }}>
                
                <img src='/static/bm2.jpeg'  
                onClick={ResetForm}/>
              </Box>
                </a>
              </NextLink>
            </Box>
          </div>
          <Divider
            sx={{
              borderColor: '#2D3748', // dark divider
              my: 3
            }}
          />
          <Box sx={{ flexGrow: 1 }}>
            {sections.map((section) => (
              <DashboardSidebarSection
                key={section.title}
                path={router.asPath}
                sx={{
                  mt: 2,
                  '& + &': {
                    mt: 2
                  }
                }}
                {...section}
              />
            ))}
          </Box>
          <Divider
            sx={{
              borderColor: '#2D3748'  // dark divider
            }}
          />
        </Box>
        
      </Scrollbar>
      <OrganizationPopover
        anchorEl={organizationsRef.current}
        onClose={handleCloseOrganizationsPopover}
        open={openOrganizationsPopover}
      />
    </>
  );

  if (lgUp) {
    return (
      <Drawer
        anchor="left"
        open
        PaperProps={{
          sx: {
            backgroundColor: 'neutral.900',
            borderRightColor: 'divider',
            borderRightStyle: 'solid',
            borderRightWidth: (theme) => theme.palette.mode === 'dark' ? 1 : 0,
            color: '#FFFFFF',
            width: 280
          }
        }}
        variant="permanent"
      >
        {content}
      </Drawer>
    );
  }

  return (
    <Drawer
      anchor="left"
      onClose={onClose}
      open={open}
      PaperProps={{
        sx: {
          backgroundColor: 'neutral.900',
          color: '#FFFFFF',
          width: 280
        }
      }}
      sx={{ zIndex: (theme) => theme.zIndex.appBar + 100 }}
      variant="temporary"
    >
      {content}
    </Drawer>
  );
};

DashboardSidebar.propTypes = {
  onClose: PropTypes.func,
  open: PropTypes.bool
};
