// Dependecias
import { Route, BrowserRouter, Routes } from 'react-router-dom'

// Importaciones
import Landing from './views/landing/landing.component'
import Home from './views/home/home.component'
import Detail from './views/detail/detail.component'
import Form from './views/form/form.component'
import ActivitiesList from './views/ativities/activities.component'

// Estilos
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Landing />} />
        <Route path='/home' element={<Home />} />
        <Route path='/home/:id' element={<Detail />} />
        <Route path='/activities' element={<ActivitiesList />} />
        <Route path='/form' element={<Form />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
