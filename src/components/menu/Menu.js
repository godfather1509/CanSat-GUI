import { Link } from "react-router-dom"
import { menu } from "../../data";
import homeicon from "../../assets/homeicon.png"
import "./menu.scss"

const Menu = () => {
  return (
    <div className="menu">
      {menu.map((item) => (
        <button className="menubutton">
          <div className="item" key={item.id}>
            <Link className="listItem" to={item.url} key={item.id}>
                <img src={item.icon} alt="" className="listitemimg"/>
                <span className="listItemTitle">{item.title}</span>
              </Link>
          </div>
        </button>
      ))}
    </div>
  )
}

export default Menu