import { createContext, useState, useEffect } from "react";

const AuthContext = createContext({ uid: "", isAdmin: false });

export function UserAuthContext(props) {
  const [user, setUser] = useState(null);
  const [refresh, setRefresh] = useState(0);

  async function logout() {
    await fetch("http://localhost:5000/users/logout", {
      headers: {
        accept: "*/*",
      },
      method: "GET",
      mode: "cors",
      credentials: "include",
    });
    setRefresh((prevV) => prevV + 1);
  }

  useEffect(() => {
    async function getAuth() {
      try {
        const res = await fetch("http://localhost:5000/users/isAuth", {
          headers: {
            accept: "*/*",
          },
          method: "GET",
          mode: "cors",
          credentials: "include",
        });

        if (res.ok) {
          const data = await res.json();

          if (data.message) return;
          setUser(data);

          return;
        }
      } catch (error) {
        console.log(error.message);
      }
    }
    getAuth();
  }, [refresh]);
  let context;
  if (user) {
    context = {
      uid: user.id,
      isAdmin: user.isAdmin,
      setUser,
      logout: logout,
      refresh: refresh,
    };
  } else {
    context = { uid: "", isAdmin: false, setUser, refresh: refresh };
  }

  return (
    <AuthContext.Provider value={context}>
      {props.children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
