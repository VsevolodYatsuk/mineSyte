import { Link, Route, Routes } from 'react-router-dom';
import Contacts from './pages/Contacts';
import LatestImage from './pages/LatestImage';

export default function App() {
  return (
    <div>
      <nav style={{ display: 'flex', gap: 12, padding: 16, borderBottom: '1px solid #eee' }}>
        <Link to="/">Контакты</Link>
        <Link to="/image">Картинка</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Contacts />} />
        <Route path="/image" element={<LatestImage />} />
      </Routes>
    </div>
  );
}
