import "./style.css";

const Btn = ({ children, style }) => {
  return (
    <button className={`${style} btn`}>
      <div className="wrapper">
        <p className="text">{children}</p>

        <div className="flower flower1">
          <div className="petal one"></div>
          <div className="petal two"></div>
          <div className="petal three"></div>
          <div className="petal four"></div>
        </div>
        <div className="flower flower2">
          <div className="petal one"></div>
          <div className="petal two"></div>
          <div className="petal three"></div>
          <div className="petal four"></div>
        </div>
        <div className="flower flower3">
          <div className="petal one"></div>
          <div className="petal two"></div>
          <div className="petal three"></div>
          <div className="petal four"></div>
        </div>
        <div className="flower flower4">
          <div className="petal one"></div>
          <div className="petal two"></div>
          <div className="petal three"></div>
          <div className="petal four"></div>
        </div>
        <div className="flower flower5">
          <div className="petal one"></div>
          <div className="petal two"></div>
          <div className="petal three"></div>
          <div className="petal four"></div>
        </div>
        <div className="flower flower6">
          <div className="petal one"></div>
          <div className="petal two"></div>
          <div className="petal three"></div>
          <div className="petal four"></div>
        </div>
      </div>
    </button>
  );
};

export default Btn;
