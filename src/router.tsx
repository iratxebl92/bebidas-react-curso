import {lazy, Suspense} from "react"
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import { Layout } from './layouts/Layout'
import { LoadingSpinner } from "./components/LoadingSpinner"



const FavoritesPageLazy = lazy(() => import('./views/FavoritesPage') ) // para que esto no de error el componeten <FavoritesPage/> es imprescindible que sea export default function, NO export const
const IndexPageLazy = lazy(() => import('./views/IndexPage') )
const GenerateAILazy = lazy(() => import('./views/GenerateAI'))
export default function AppRouter() {
  return (
    <BrowserRouter>
        <Routes>
            <Route element={<Layout/>} > 
                <Route path='/' element={
                  <Suspense fallback={<LoadingSpinner/>}>
                  {/* fallback es lo que se mostrará mientras carga el componente */}
                  <IndexPageLazy/>
                </Suspense>
                } index />

                <Route path='/favoritos' element={
                  <Suspense fallback={<LoadingSpinner/>}>
                    <FavoritesPageLazy/>
                  </Suspense>
                } />
                
                <Route path='/generate' element={
                  <Suspense fallback={<LoadingSpinner/>}>
                    <GenerateAILazy/>
                  </Suspense>
                } />
              </Route>
         
                
        </Routes>
    </BrowserRouter>
  )
}
