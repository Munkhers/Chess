import './App.css';
import Chess from './Components/Chess';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import StartPage from './Components/Start';


function App() {
  return (
    <div className='chess'>
      <BrowserRouter>
        <Routes>
          <Route index element={<StartPage/>}/>
          <Route path='/chessgame' element={<Chess/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  )
}
export default App;
