import { IntlProvider } from 'react-intl';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import {
  RecoilRoot
} from 'recoil';
import './App.css';
import LoginContainer from './Components/LoginContainer';
import PersonalInfo from './Components/PersonalInfo';
import TopPageContainer from './Components/TopPageContainer';
import HomePage from './Pages/HomePage';



function App() {

  return (
    <RecoilRoot>
      <IntlProvider locale="fr" defaultLocale="en">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />}>
              <Route index element={<LoginContainer />} />
              <Route path='/top' element={<TopPageContainer />} />
              <Route path='/personal-info' element={<PersonalInfo />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </IntlProvider>
    </RecoilRoot>
  );
}

export default App;
