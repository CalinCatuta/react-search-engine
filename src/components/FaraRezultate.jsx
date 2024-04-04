// svg
import strut from "../assets/svg/strut.svg";

const FaraRezultate = () => {
  return (
    <div className="fara-rezultate">
      <div className="text">
        <h1>
          Ups! <br />
          Cautarea nu are rezultat
        </h1>
        <p>Elimina din filtre sau incepe o cautare noua</p>
      </div>
      <img src={strut} alt="not-found" />
    </div>
  );
};
export default FaraRezultate;
