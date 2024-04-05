// svg
import strut from "../assets/svg/strut.svg";
// scss
import "../scss/not-found.scss";
const FaraRezultate = () => {
  return (
    <div className="fara-rezultate">
      <div className="text">
        <h1>
          Ups! <br />
          Cautarea nu are <br /> rezultat
        </h1>
        <h4>Elimina din filtre sau incepe o cautare noua</h4>
      </div>
      <img src={strut} alt="not-found" />
    </div>
  );
};
export default FaraRezultate;
