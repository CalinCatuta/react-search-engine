// images
import logo from "../assets/svg/logo.svg";
//scss
import "../scss/landing.scss";
// components
import Search from "../components/Search";
import Footer from "../components/Footer";
// redux
import { useSelector } from "react-redux";
const Landing = () => {
  // redux state
  const { totalJobs } = useSelector((state) => state.jobs);
  return (
    <div>
      <nav>
        <a href="/" className="logo">
          <img src={logo} alt="peviitor" />
        </a>
      </nav>
      <main>
        <h1>Locul de munca visat, la un clic distanta </h1>
        <h4>
          Peste <strong>{totalJobs}</strong> de locuri de munca din România
          actualizate zilnic
        </h4>
        <Search />
      </main>
      <Footer />
    </div>
  );
};

export default Landing;
