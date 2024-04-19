
import React from 'react'; import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import FilesList from './components/fileList/FilesList';
import AddFile from './components/AddFile';
import EditFile from './components/EditFile';
import Header from './components/Header';
import Footer from './components/Footer';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/login/LoginScreen'
import RegisterScreen from './screens/RegisterScreen'
import ProfileScreen from './screens/ProfileScreen'
import UserListScreen from './screens/usersList/UserListScreen'
import UserEditScreen from './screens/UserEditScreen'
import DownloadFile from './components/DownloadFile';
import PersonalFiles from "./components/table/UserFiles";

function App() {
  return (
    <div className="App">
      <BrowserRouter >
        <Header />
        <main className="py-3">
          <Routes>
            <Route path='/' element={<HomeScreen />} exact />
            <Route path='/login' element={<LoginScreen />} />
            <Route path='/register' element={<RegisterScreen />} />
            <Route path='/profile' element={<ProfileScreen />} />

            <Route path='/admin/userlist' element={<UserListScreen />} />
            <Route path='/admin/user/:id/edit' element={<UserEditScreen />} />

            <Route path='files/' element={<FilesList />} />
            <Route path='files/table' element={<PersonalFiles />} />
            <Route path='/files/download/:id' element={<DownloadFile />} />
            <Route path='/add-file' element={<AddFile />} />
            <Route path='/update/:id' element={<EditFile />} />
          </Routes>
        </main>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
