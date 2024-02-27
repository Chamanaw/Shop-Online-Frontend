import './App.css'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { Container} from '@mui/material';
import Layout from './components/layout';
import { Outlet } from 'react-router-dom';

function App() {

  return (
      <Container maxWidth='xl'>
        <Layout>
          <Outlet />
        </Layout>
      </Container>
  )
}

export default App
