import {
  MyRoutes,
  Sidebar,
  Device,
  Light,
  Dark,
  AuthContextProvider,
  Menuambur,
  useUsuariosStore,
  Login,
  UserAuth,
  SpinnerLoader,
  useCuentaStore,
} from "./index";
import { useLocation } from "react-router-dom";
import { createContext, useState } from "react";
import { ThemeProvider } from "styled-components";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useQuery } from "@tanstack/react-query";
import { styled } from "styled-components";
export const ThemeContext = createContext(null);
function App() {
  const { user } = UserAuth();
  const { mostrarUsuarios, datausuarios } = useUsuariosStore();
  const { mostrarCuentas } = useCuentaStore();
  const { idusuario } = useUsuariosStore();
  const { pathname } = useLocation();
  const theme = datausuarios?.tema === "0" ? "light" : "dark";

  //const [theme, setTheme] = useState("dark");
  const themeStyle = theme === "light" ? Light : Dark;
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { isLoading, error } = useQuery({
    queryKey: ["usuario", user],
    queryFn: mostrarUsuarios,
    enabled: !!user,
    staleTime: Infinity,
  });

  useQuery({
    queryKey: ["cuentas", idusuario],
    queryFn: () => mostrarCuentas({ idusuario }),
    enabled: !!idusuario,
    staleTime: Infinity,
  });
  if (isLoading) {
    return <SpinnerLoader />;
  }
  if (error) {
    return <h1>Error...</h1>;
  }

  return (
    <>
      <ThemeContext.Provider value={{ theme }}>
        <ThemeProvider theme={themeStyle}>
            {pathname != "/login" ? (
              <Container className={sidebarOpen ? "active" : ""}>
                <div className="ContentSidebar">
                  <Sidebar
                    state={sidebarOpen}
                    setState={() => setSidebarOpen(!sidebarOpen)}
                  />
                </div>
                <div className="ContentMenuambur">
                  <Menuambur />
                </div>

                <Containerbody>
                  <MyRoutes />
                </Containerbody>
              </Container>
            ) : (
              <Login />
            )}

            <ReactQueryDevtools initialIsOpen={true} />
        </ThemeProvider>
      </ThemeContext.Provider>
    </>
  );
}
const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  background: ${({ theme }) => theme.bgtotal};
  transition: all 0.2s ease-in-out;

  .ContentSidebar {
    display: none;
  }
  .ContentMenuambur {
    display: block;
    position: absolute;
    left: 20px;
  }
  @media ${Device.tablet} {
    grid-template-columns: 65px 1fr;
    &.active {
      grid-template-columns: 220px 1fr;
    }
    .ContentSidebar {
      display: initial;
    }
    .ContentMenuambur {
      display: none;
    }
  }
`;
const Containerbody = styled.div`
  grid-column: 1;
  width: 100%;
  @media ${Device.tablet} {
    grid-column: 2;
  }
`;
export default App;
