
import { Link } from "react-router-dom";
import "../../styles/Register.css"
export default function Login() {

  const users = ['Customer' , 'Provider' , 'Admin']

  return (
    <>
    <h2 style={{textAlign:"center"}}>Register</h2>
      <p style={{ color: "#6b7280" , textAlign:"center"}}>Choose a role to register</p>

    <div className="container login-container" style={{ padding: 24 }}>
      

      {
        users.map((user , index) => {
              const lower = user.toLowerCase();
             return <div key={index}  className="login-users"><Link to={`./${lower}`}>{user}</Link></div>
      })
      }

    </div>
    </>
  );
}