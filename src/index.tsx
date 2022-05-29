import ReactDOM from 'react-dom';
import Home from 'containers/Home/Home';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import ReaderWrapper from 'containers/Reader';


ReactDOM.render(
<BrowserRouter>
<Routes>
    <Route path='/' element={<Home />} />
    <Route
      path="/books"
      element={<ReaderWrapper/>}
    />
     <Route
      path="*"
      element={<Navigate to="/" />}
    />
   
</Routes>
</BrowserRouter>,  document.getElementById('root'));