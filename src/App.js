import { BrowserRouter, Route, Routes } from 'react-router-dom';
import {
  RecoilRoot
} from 'recoil';
import './App.css';
import LoginContainer from './Components/LoginContainer';
import TopPageContainer from './Components/TopPageContainer';
import HomePage from './Pages/HomePage';


function App() {

  return (
    <RecoilRoot>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />}>
            <Route index element={<LoginContainer />} />
            <Route path='/top' element={<TopPageContainer />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </RecoilRoot>
  );
}

export default App;
