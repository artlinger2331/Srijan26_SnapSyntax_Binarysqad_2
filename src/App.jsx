import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ReactLenis } from 'lenis/react';
import Home from './pages/Home';
import DynamicPricing from './pages/DynamicPricing';
import GutHealth from './pages/GutHealth';
import DietPlan from './pages/DietPlan';
import MidnightMap from './pages/MidnightMap';

function App() {
  return (
    <Router>
      <ReactLenis root options={{ lerp: 0.08, duration: 1.4, smoothWheel: true }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dynamic-pricing" element={<DynamicPricing />} />
          <Route path="/gut-health" element={<GutHealth />} />
          <Route path="/diet-plan" element={<DietPlan />} />
          <Route path="/midnight-map" element={<MidnightMap />} />
        </Routes>
      </ReactLenis>
    </Router>
  );
}

export default App;
