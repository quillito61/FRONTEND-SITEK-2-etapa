import { useEffect, useState } from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Chip,
  Container,
  Divider,
  Grid,
  MenuItem,
  Stack,
  TextField,
  Typography
} from '@mui/material';
import { AuthGuard } from '../../components/authentication/auth-guard';
import { DashboardLayout } from '../../components/dashboard/dashboard-layout';
import { OverviewBanner } from '../../components/dashboard/overview/overview-banner';
import { OverviewCryptoWallet } from '../../components/dashboard/overview/overview-crypto-wallet';
import { OverviewInbox } from '../../components/dashboard/overview/overview-inbox';
import { OverviewLatestTransactions } from '../../components/dashboard/overview/overview-latest-transactions';
import { OverviewPrivateWallet } from '../../components/dashboard/overview/overview-private-wallet';
import { OverviewTotalBalance } from '../../components/dashboard/overview/overview-total-balance';
import { OverviewTotalTransactions } from '../../components/dashboard/overview/overview-total-transactions';
import { ArrowRight as ArrowRightIcon } from '../../icons/arrow-right';
import { Briefcase as BriefcaseIcon } from '../../icons/briefcase';
import { Download as DownloadIcon } from '../../icons/download';
import { ExternalLink as ExternalLinkIcon } from '../../icons/external-link';
import { InformationCircleOutlined as InformationCircleOutlinedIcon } from '../../icons/information-circle-outlined';
import { Reports as ReportsIcon } from '../../icons/reports';
import { Users as UsersIcon } from '../../icons/users';
import { gtm } from '../../lib/gtm';
import { useAuth } from 'src/hooks/use-auth';

const Overview: NextPage = () => {
  const [displayBanner, setDisplayBanner] = useState<boolean>(true);
  const { user } = useAuth();
  useEffect(() => {
    gtm.push({ event: 'page_view' });
  }, []);

  useEffect(() => {
    // Restore the persistent state from local/session storage
    const value = globalThis.sessionStorage.getItem('dismiss-banner');

    if (value === 'true') {
       //setDisplayBanner(true);
    }
  }, []);

  const handleDismissBanner = () => {
    // Update the persistent state
    // globalThis.sessionStorage.setItem('dismiss-banner', 'true');
    setDisplayBanner(false);
  };

  let UserType = (user ? user.UserType : '')

  return (
    <>
      <Head>
        <title>
          Dashboard: Overview | BM Supermercados
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
   

        <Card
      sx={{
        width:1129,
        
        alignItems: 'center',
        backgroundColor: '#1C3B8D',
        color: 'primary.contrastText',
        display: 'flex',
        flexDirection: {
          xs: 'column',
          md: 'row'
        },
        p: 4
      }}
      
    >
      <Box
        sx={{
          mr: 4,
          width: 200,
          height: 200,
          '& img': {
            height: 200,
            width: 'auto'
          }
        }}
      >
        <img
          alt=""
          src="/Static/bmLogin.jpg"
        />
      </Box>
      <div>
        <div>
       
        </div>
        <Typography
          color="inherit"
          sx={{ mt: 2 }}
          variant="h3"
        >
          Hola, {user ? user.name : ''}
        </Typography>
        <Typography
          color="inherit"
          sx={{ mt: 2 }}
          variant="h5"
        >
          A continuacion puede elegir la opcion del programa a realizar...
        </Typography>
        <Box sx={{ mt: 2 }}>
        
        </Box>
      </div>
    </Card>


<Card
sx={{
        
        
        alignItems: 'center',
        backgroundColor: '#fbb504',
        color: 'primary.contrastText',
        display: 'flex',
        flexDirection: {
          xs: 'column',
          md: 'row'
        },
        p: 1
      }}>
</Card>



{(UserType == 0 ) && 

    <Stack direction="row" spacing={6}>
        <Card sx={{ maxWidth: 345 }}>
      <CardActionArea href="/dashboard/users">
        <CardMedia
          component="img"
          height="380"
          image="/static/cards/user_group.png"
          alt="usuarios"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            USUARIOS
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Aqui se podran ingresar, modificar y eliminar usuarios del 
            sistema, asi como se podra resetear el password respectivo.
          </Typography>
        </CardContent>
      </CardActionArea>
     
    </Card>

    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea href="/dashboard/mtoreportes">
        <CardMedia
          component="img"
          height="380"
          image="/static/cards/reportes.png"
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            REPORTES
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Aqui se registraran todos los reportes, su descripcion asi como
            el enlace que seguiran a la hora de invocarlos...
          </Typography>
        </CardContent>
      </CardActionArea>
      
    </Card>
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea href="/dashboard/asignareportes">
        <CardMedia
          component="img"
          height="380"
          image="/static/cards/asignar.png"
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            ASIGNACIONES
          </Typography>
          <Typography variant="body2" color="text.secondary">
            En esta parte se podra asignar a cada usuario los reportes
            que casa uno de ellos pueda ejecutar...
          </Typography>
        </CardContent>
      </CardActionArea>
     
    </Card>

    

</Stack> }




        </Container>
      </Box>
    </>
  );
};

Overview.getLayout = (page) => (
  <AuthGuard>
    <DashboardLayout>
      {page}
    </DashboardLayout>
  </AuthGuard>
);

export default Overview;
