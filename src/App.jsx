import Header from './components/layout/Header/Header';
import Footer from './components/layout/Footer/Footer';
import ServiceOverview from './components/sections/ServiceOverview/ServiceOverview';
import PlanetsRoutes from './components/sections/PlanetsRoutes/PlanetsRoutes';
import PlanetOverview from './components/sections/PlanetOverview/PlanetOverview';
import FlightsSchedule from './components/sections/FlightsSchedule/FlightSchedule';
import Gallery from './components/sections/Gallery/Gallery';
import MiniGame from './components/sections/MiniGame/MiniGame';
import About from './components/sections/About/About';
import { useState } from 'react';

function App() {
  const [selectedPlanet, setSelectedPlanet] = useState(null);

  return (
    <>
      <Header />
      <ServiceOverview />
      <PlanetsRoutes setSelectedPlanet={setSelectedPlanet} />
      <PlanetOverview selectedPlanet={selectedPlanet} />
      <FlightsSchedule />
      <Gallery />
      <MiniGame />
      <About />
      <Footer />
    </>
  )
}

export default App
