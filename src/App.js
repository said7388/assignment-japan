import "react-datepicker/dist/react-datepicker.css";
import { IntlProvider } from 'react-intl';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import {
  RecoilRoot
} from 'recoil';
import Confirmation from "./Components/Confirmation";
import DateTimeSelect from './Components/DateTimeSelect';
import DestinationSelect from './Components/DestinationSelect';
import EnterAmount from "./Components/EnterAmount";
import EnterNote from "./Components/EnterNote";
import LoginContainer from './Components/LoginContainer';
import PersonalInfo from './Components/PersonalInfo';
import TopPageContainer from './Components/TopPageContainer';
import HomePage from './Pages/HomePage';




function App() {

  return (
    <RecoilRoot>
      <IntlProvider locale="jp" defaultLocale="en">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />}>
              <Route index element={<LoginContainer />} />
              <Route path='/top' element={<TopPageContainer />} />
              <Route path='/personal-info' element={<PersonalInfo />} />
              <Route path='/destination-select' element={<DestinationSelect />} />
              <Route path='/date-time-select' element={<DateTimeSelect />} />
              <Route path='/enter-amount' element={<EnterAmount />} />
              <Route path='/enter-note' element={<EnterNote />} />
              <Route path='/final-confirm' element={<Confirmation />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </IntlProvider>
    </RecoilRoot>
  );
}

export default App;
