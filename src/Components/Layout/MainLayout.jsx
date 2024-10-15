import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

const MainLayout = () => {
  // const [darkmode, setDarkMode] = useState(false);
  // const toglethemebuttom = () => {
  //   setDarkMode(!darkmode);
  // };
  return (
    <>
      {/*   <div className={`${darkmode && "dark"} dark:bg-gray-900`}>
   <Header data={toglethemebuttom} mode={darkmode} /> 
    
</div> */}
      <div className="lg:px-32 px-4">
        <Navbar />
        <Outlet />
      </div>
    </>
  );
};

export default MainLayout;
