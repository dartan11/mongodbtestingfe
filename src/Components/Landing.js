import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { BACKEND_URL } from "../constants";
import axios from "axios";

function Landing() {
  const { isAuthenticated, user, loginWithRedirect, getAccessTokenSilently } =
    useAuth0();
  const navigate = useNavigate();

  const handleLogin = async () => {
    loginWithRedirect();
  };

  const userInfo = async (user) => {
    const accessToken = await getAccessTokenSilently({
      audience: process.env.REACT_APP_AUDIENCE,
      scope: process.env.REACT_APP_SCOPE,
    });
    const response = await axios.post(
      `${BACKEND_URL}/users`,
      {
        name: user.nickname,
        email: user.email,
      },
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );
    console.log(response);
    navigate("/users");
  };

  useEffect(() => {
    if (isAuthenticated) {
      userInfo(user);
      console.log(user);
      console.log("authenticated!");
    } else {
      console.log("not authenticated");
    }
  }, [isAuthenticated]);

  return (
    <div>
      <button onClick={handleLogin}>Get Started!</button>
    </div>
  );
}

export default Landing;
