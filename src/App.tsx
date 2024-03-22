import './App.css'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { Container } from '@mui/material';
import Layout from './components/layout';
import { Outlet } from 'react-router-dom';
import CartContextProvider from './context/cartContext';
import UserContextProvider from './context/userContext';



function App() {

  return (
    <Container maxWidth='xl'>
      <UserContextProvider>
        <CartContextProvider>
          <Layout >
            <Outlet />
          </Layout>
        </CartContextProvider>
      </UserContextProvider>
    </Container>
  )
}

export default App
