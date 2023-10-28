import common from "../../images/delivery/burgers/common.png";
import rare from "../../images/delivery/burgers/rare.png";
import legendary from "../../images/delivery/burgers/legendary.png";
import uncommon from "../../images/delivery/burgers/uncommon.png";
import logo from "../../images/Navbar.png";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { LOADING, USER_DATA } from "../../redux/constanst";
import Swal from "sweetalert2";

const apiKey = process.env.REACT_APP_HOST;

const items = [
  {
    name: "Classic Burger",
    score: 5.1,
    progressBar: 56,
    progressBarMAx: 56,
    price: 50,
    image: common,
    rarity: 1,
    state:"temporal"
  },
  {
    name: "Triple Cheese Burger",
    score: 7.5,
    progressBar: 56,
    progressBarMAx: 56,
    price: 60,
    image: uncommon,
    rarity: 2,
    state:"temporal"
  },
  {
    name: "Mega McBurger",
    score: 11,
    progressBar: 0,
    progressBarMAx: 49,
    price: 70,
    image: rare,
    rarity: 3,
    state:"temporal"
  },
  {
    name: "HomeMade Burger",
    score: 30,
    progressBar: 0,
    progressBarMAx: 42,
    price: 80,
    image: legendary,
    rarity: 4,
    state:"temporal"
  },
];

export const actualizarUser = async (userData, dispatch) =>{
  const usuario = await axios.post(`${apiKey}/api/user/login`, {
    wallet: userData.wallet,
  });

  dispatch({ type: USER_DATA, userData: usuario.data.usuario });
}
export const enviarCompra = async (item, dispatch, userData) => {
  dispatch({ type: LOADING, loading: true });
  try{
    const respuesta = await axios.post(
      `${apiKey}/api/user/createNftTemporal`,
      item
    );
      console.log(respuesta)
    if (respuesta.data.error) {
      
    }
    await actualizarUser(userData, dispatch)
    dispatch({ type: LOADING, loading: false });
  }catch(e){
    dispatch({ type: LOADING, loading: false });
    Swal.fire("", e.response.data.error, "error");
  }
  
};

export default function ShopBurgers() {
  const { userData } = useSelector((state) => state.userState);
  /* const [cantidad, setCantidad] = useState([]); */
  const dispatch = useDispatch();
  const common =
    "linear-gradient(59deg, rgba(73,73,73,1) 0%, rgba(37,37,37,1) 100%)";
  const uncommon =
    "linear-gradient(59deg, rgba(0,7,93,1) 0%, rgba(0,4,57,1) 100%)";
  const rare =
    "linear-gradient(59deg, rgba(76,1,134,1) 0%, rgba(41,0,70,1) 100%)";
  const legendary =
    "linear-gradient(59deg, rgba(149,123,4,1) 0%, rgba(70,64,0,1) 100%)";

  /* const sumarElemento = (item) => {
    setCantidad([...cantidad, item]);
  };
  const restarElemento = (item) => {
    const index = cantidad.findIndex(
      (element) => element.rarity === item.rarity
    );
    if (index >= 0) {
      const cantidadPrev = cantidad;
      cantidadPrev.splice(index, 1);
      setCantidad([...cantidadPrev]);
    }
  }; */
  return (
    <>
      {items.map((item, index) => {
        item.type = "burger";
        item.wallet = userData.wallet
        console.log(item)
        return (
          <div
            
            className="shop-body-item"
            style={{
              background: {
                1: common,
                2: uncommon,
                3: rare,
                4: legendary,
              }[item.rarity],
            }}
            key={index}
          >
            <div className="item-body-tittle">
              <p>{item.name}</p>
              <div className="score-shop">
                <img src={logo} alt="logo" />
                <p>{item.score}</p>
              </div>
            </div>
            <div className="item-body-image">
              <img src={item.image} alt="burger" />
            </div>
            <div className="item-body-info">
              <p>
                {item.progressBarMAx}/{item.progressBarMAx}
              </p>
              <div className="progress-box">
                <div className="inventory-item-progressBar">
                  <div
                    className="inventory-item-progressBar-fill"
                    style={{
                      width: `${
                        (item.progressBarMAx / item.progressBarMAx) * 100
                      }%`,
                    }}
                  ></div>
                </div>
              </div>
              <div className="item-body-footer" style={{ display:"flex", justifyContent:"center"}}>
                {/* <div className="item-body-counter">
                  <div
                    onClick={() => restarElemento(item)}
                    className="item-body-sign"
                  >
                    <p>-</p>
                  </div>
                  <div className="item-body-number">
                    <p>
                      {
                        cantidad.filter(
                          (element) => element.rarity === item.rarity
                        )?.length
                      }
                    </p>
                  </div>
                  <div
                    onClick={() => sumarElemento(item)}
                    className="item-body-sign"
                  >
                    <p>+</p>
                  </div>
                </div> */}
                <div className="item-body-price" onClick={() => enviarCompra(item, dispatch, userData)} style={{display:"flex", justifyContent:"center"}}>
                  <p>{item.price}$ CMC</p>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
}
