import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { DiarioProvider } from './context/DiarioContext';
import { PageShell } from './components/layout/PageShell';
import { HojeScreen } from './screens/HojeScreen';
import { AlbumScreen } from './screens/AlbumScreen';
import { FlorDetalheScreen } from './screens/FlorDetalheScreen';
import { BilheteDetalheScreen } from './screens/BilheteDetalheScreen';
import { DiaDetalheScreen } from './screens/DiaDetalheScreen';
import { PolaroidDetalheScreen } from './screens/PolaroidDetalheScreen';
import { ProximaParadaDetalheScreen } from './screens/ProximaParadaDetalheScreen';

function App() {
  return (
    <DiarioProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<PageShell />}>
            <Route path="/" element={<HojeScreen />} />
            <Route path="/album" element={<AlbumScreen />} />
          </Route>
          <Route path="/flor/:data" element={<FlorDetalheScreen />} />
          <Route path="/bilhete/:data" element={<BilheteDetalheScreen />} />
          <Route path="/polaroid/:data" element={<PolaroidDetalheScreen />} />
          <Route path="/proxima-parada" element={<ProximaParadaDetalheScreen />} />
          <Route path="/album/:data" element={<DiaDetalheScreen />} />
        </Routes>
      </BrowserRouter>
    </DiarioProvider>
  );
}

export default App;
