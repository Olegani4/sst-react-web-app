import unknownPlanetImageSrc from '../../assets/icons/planets/ico-unknown-planet.svg';
import mercuryImageSrc from '../../assets/icons/planets/ico-mercury.svg';
import venusImageSrc from '../../assets/icons/planets/ico-venus.svg';
import marsImageSrc from '../../assets/icons/planets/ico-mars.svg';
import jupiterImageSrc from '../../assets/icons/planets/ico-jupiter.svg';
import saturnImageSrc from '../../assets/icons/planets/ico-saturn.svg';
import uranusImageSrc from '../../assets/icons/planets/ico-uranus.svg';
import neptuneImageSrc from '../../assets/icons/planets/ico-neptune.svg';

export const planets = [
    {
        planetId: 'unknown', 
        name: 'Destination Unknown', 
        imageSrc: unknownPlanetImageSrc,
        temperature: '????????',
        dimensions: '????????',
        weather: '????????',
        atmosphere: '????????',
        gravity: '????????',
        funFact: null,
        planetSize: 0,
        distance: '????????',
        travelTime: '????????'
    },
    {
        planetId: 'mercury', 
        name: 'Mercury', 
        imageSrc: mercuryImageSrc,
        temperature: '-180°C to 430°C',
        dimensions: '4,879 km diameter',
        weather: 'No atmosphere, extreme temperature swings',
        atmosphere: 'Practically none',
        gravity: '0.38g (38% of Earth)',
        funFact: 'Mercury is the speed demon of the solar system! It orbits the Sun so fast that a year on Mercury is just 88 Earth days. Talk about living life in the fast lane!',
        planetSize: 50,
        distance: '0.77 b km',
        travelTime: '6 months'
    },
    {
        planetId: 'venus', 
        name: 'Venus', 
        imageSrc: venusImageSrc,
        temperature: '462°C (average)',
        dimensions: '12,104 km diameter',
        weather: 'Thick clouds, sulfuric acid rain',
        atmosphere: '96% CO2, very dense',
        gravity: '0.91g (91% of Earth)',
        funFact: 'Venus is the diva of the solar system! It rotates backwards and takes longer to rotate on its axis than to orbit the Sun. Plus, it\'s so hot that lead would melt on its surface!',
        planetSize: 80,
        distance: '0.38 b km',
        travelTime: '4 months'
    },
    {
        planetId: 'mars', 
        name: 'Mars', 
        imageSrc: marsImageSrc,
        temperature: '-140°C to 20°C',
        dimensions: '6,792 km diameter',
        weather: 'Dust storms, thin atmosphere',
        atmosphere: '95% CO2, very thin',
        gravity: '0.38g (38% of Earth)',
        funFact: 'Mars has the largest volcano in the solar system - Olympus Mons is so big that if you stood on top, you wouldn\'t even know you were on a mountain! It\'s like the planet\'s own personal skyscraper!',
        planetSize: 60,
        distance: '0.78 b km',
        travelTime: '7 months'
    },
    {
        planetId: 'jupiter', 
        name: 'Jupiter', 
        imageSrc: jupiterImageSrc,
        temperature: '-110°C (cloud tops)',
        dimensions: '139,820 km diameter',
        weather: 'Violent storms, Great Red Spot',
        atmosphere: 'Hydrogen and helium',
        gravity: '2.34g (234% of Earth)',
        funFact: 'Jupiter is the solar system\'s vacuum cleaner! Its massive gravity sucks in asteroids and comets that might otherwise hit Earth. Thanks, big buddy! Also, if you could stand on Jupiter (which you can\'t), you\'d weigh over twice as much!',
        planetSize: 120,
        distance: '4.2 b km',
        travelTime: '1.5 years'
    },
    {
        planetId: 'saturn', 
        name: 'Saturn', 
        imageSrc: saturnImageSrc,
        temperature: '-140°C (cloud tops)',
        dimensions: '116,460 km diameter',
        weather: 'Wind speeds up to 1,800 km/h',
        atmosphere: 'Hydrogen and helium',
        gravity: '0.93g (93% of Earth)',
        funFact: 'Saturn is the fashionista of the solar system with its stunning rings! But here\'s the kicker - those beautiful rings are mostly made of ice and rock, and they\'re so thin that if you scaled Saturn down to the size of a basketball, the rings would be thinner than a sheet of paper!',
        planetSize: 130,
        distance: '1.43 b km',
        travelTime: '2 years'
    },
    {
        planetId: 'uranus', 
        name: 'Uranus', 
        imageSrc: uranusImageSrc,
        temperature: '-195°C (cloud tops)',
        dimensions: '50,724 km diameter',
        weather: 'Extreme winds, methane clouds',
        atmosphere: 'Hydrogen, helium, methane',
        gravity: '0.89g (89% of Earth)',
        funFact: 'Uranus is the solar system\'s rebel - it rotates on its side! While other planets spin like tops, Uranus rolls around the Sun like a barrel. Scientists think it got knocked over by a massive collision billions of years ago. Talk about a cosmic bowling accident!',
        planetSize: 100,
        distance: '2.57 b km',
        travelTime: '3 years'
    },
    {
        planetId: 'neptune', 
        name: 'Neptune', 
        imageSrc: neptuneImageSrc,
        temperature: '-200°C (cloud tops)',
        dimensions: '49,244 km diameter',
        weather: 'Fastest winds in solar system',
        atmosphere: 'Hydrogen, helium, methane',
        gravity: '1.12g (112% of Earth)',
        funFact: 'Neptune has the fastest winds in the solar system, reaching speeds of 2,100 km/h! That\'s faster than the speed of sound on Earth. It\'s like the planet is constantly having a cosmic tantrum! Also, it takes 165 Earth years to orbit the Sun - that\'s one long year!',
        planetSize: 90,
        distance: '4.3 b km',
        travelTime: '4 years'
    }
];
