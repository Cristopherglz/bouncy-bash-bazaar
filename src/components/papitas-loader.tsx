import papitas from "/images/papitas-logo.png?url";

export function PapitasLoader() {
  return (
    <div className="papitas-loader">
      <div className="logo-wrap">
        <img className="logo-img" src={papitas} alt="Papita's" />
      </div>
      <div className="shadow" />
      <div className="loading-text">
        CARGANDO<span>.</span>
        <span>.</span>
        <span>.</span>
      </div>
    </div>
  );
}