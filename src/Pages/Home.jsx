import { useEffect, useState } from 'react';
import About from '../Components/HomeComponents/About';
import Experiences from '../Components/HomeComponents/Experiences';
import HeroSection from '../Components/HomeComponents/HeroSection';
import Projects from '../Components/HomeComponents/Projects';
import axios from 'axios';
import Loader from '../Components/CommonComponents/Loader';

const Home = () => {
  const[info, setInfo]=useState([]);
  const[loading, setLoading]=useState(true);
  
  useEffect(() => {
    const fetchInfo = async () => {
      try {
        const response = await axios.get("http://localhost:5000/info"); // Use correct endpoint
        setInfo(response.data[0]);
        setLoading(false);
        console.log(response.data[0])
      } catch (error) {
        // setLoading(false);
        console.error("Error fetching info:", error);
      }
    };

    fetchInfo();
  }, []);



  return (
    <>
    {loading ?(<Loader/>):(
      <div className='pb-52 home'>
      <HeroSection data={info}/>
      <About data={info}/>
      <Experiences data={info}/>
      <Projects data={info} />
    </div>
    )}
    
    </>
  );
};

export default Home;