// components
import Search from "../components/Search";
// redux
import { useSelector } from "react-redux";
// state
const Landing = () => {
  const { totalJobs, totalCompany } = useSelector((state) => state.jobs);
  return (
    <div>
      <h3>
        Avem {totalJobs} de oportunități în România de la {totalCompany} firme
      </h3>
      <Search />
    </div>
  );
};

export default Landing;
