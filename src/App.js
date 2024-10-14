import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import AppLayout from './AppLayout';
import Homepage from './Pages/Homepage/Homepage';
import Movie from './Pages/Movie/Movie';
import MovieDetail from './Pages/MovieDetail/MovieDetail';
import { Route, Routes } from 'react-router-dom';
import Banner from './Component/Banner/Banner';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<Homepage />}/>
          <Route path="Movie">
            <Route index element={<Movie />}/>
            <Route path=":movieId" element={<MovieDetail />}/>
          </Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
