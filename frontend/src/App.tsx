import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Navbar from './pages/Navbar'

import Signup from './pages/Signup'
import Home from './pages/Home'
import { Content } from './pages/Content'
import { Create } from './pages/Create'
import Signin from './pages/Signin'
import { useRecoilValue } from 'recoil'
import {  userStateSelector } from './store/atoms/signupAtom';
import { Analytics } from '@vercel/analytics/react';
import Profile from './pages/Profile'
import Qeustions from './pages/Questions'
import { AskQuestion } from './pages/AddQuestion'
import Notifications from './pages/Notifications'
function App() {
  const isUser = useRecoilValue(userStateSelector);

  return (
    <>
    <div className ='bg-black h-screen '>
    <BrowserRouter>
    <Analytics />
    <Navbar/>

    <Routes>
      <Route path='/' element={<Home/>}></Route>
      <Route path='/signup' element={<Signup/>}></Route>
      <Route path='/content/:id' element={<Content/>}></Route>
      <Route path='/signin' element={<Signin/>}></Route>
      <Route path='/profile' element={<Profile/>}></Route>
      <Route path='/questions' element={<Qeustions/>}></Route>
      <Route path='/notifications' element={<Notifications/>}></Route>
      <Route path='/askquestions' element={isUser ? <AskQuestion/> : <Signup/>}></Route>
      <Route path="/create"  element={isUser ? <Create/> : <Signup/>} />

    </Routes>
    </BrowserRouter>
    </div>
    </>
  )
}

export default App
