import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import About from './pages/About'
import Projects from './pages/Projects'
import Profile from './pages/Profile'
import Dashboard from './pages/Dashboard'
import Header from './components/Header'
import FooterCom from './components/FooterCom'

const App = () => {
  return (
    <BrowserRouter>
    <Header/>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/about' element={<About/>}/>
      <Route path='/sign-in' element={<SignIn/>}/>
      <Route path='/sign-up' element={<SignUp/>}/>
      <Route path='/projects' element={<Projects/>}/>
      <Route path='/profile' element={<Profile/>}/>
      <Route path='/dashboard' element={<Dashboard/>}/>
    </Routes>
    <FooterCom/>
    </BrowserRouter>
  )
}

export default App