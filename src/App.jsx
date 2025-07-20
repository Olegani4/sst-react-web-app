import Header from './components/Header/Header';
import ServiceOverview from './components/ServiceOverview/ServiceOverview';
import PlanetsRoutes from './components/PlanetsRoutes/PlanetsRoutes';
import PlanetOverview from './components/PlanetOverview/PlanetOverview';
import FlightsSchedule from './components/FlightsSchedule/FlightSchedule';
import Gallery from './components/Gallery/Gallery';
import MiniGame from './components/MiniGame/MiniGame';
import About from './components/About/About';
import Footer from './components/Footer/Footer';


function App() {
  return (
    <>
      <Header />
      <ServiceOverview />
      <PlanetsRoutes />
      <PlanetOverview />
      <FlightsSchedule />
      <Gallery />
      <MiniGame />
      <About />
      <Footer />
    </>
  )
}

export default App
