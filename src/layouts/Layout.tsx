
import { Outlet } from "react-router-dom";
import { Header } from "../components/Header";
import Notification from '../components/Notification'
import Modal from "../components/Modal";
import { useEffect } from "react";
import { useAppStore } from "../stores/useAppStore";

export const Layout = () => {
  const {loadFromStorage} = useAppStore()

  useEffect(() => { 
    loadFromStorage()
  }, [])
  
  return (
    <>
      <Header />
      <main className="container mx-auto py-16">
        <Outlet />
      </main>
      <Modal/>
      <Notification />
    </>
  );
};

/*
<Outlet/> es un componente especial que se utiliza para renderizar las rutas hijas de un componente padre. (En este caso, FavoritesPage o IndexPage ya que en router.tsx vemos que el componente <Layout/> es el que tiene agrupado a <FavoritesPage/> y <IndexPage/>)y a <IndexPage/>)
*/
