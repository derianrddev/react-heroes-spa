import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { AuthContext } from "../../../src/auth";
import { HeroesRoutes } from "../../../src/heroes/routes/HeroesRoutes";
import { PrivateRoute } from "../../../src/router/PrivateRoute";

describe('Pruebas en <HeroesRoutes />', () => {

  test('Debe de mostrar el children si está autenticado', () => { 

    Storage.prototype.setItem = jest.fn();
    const contextValue = {
      logged: true,
      user: 'Derian'
    }
    render(
      <AuthContext.Provider value={ contextValue }>
        <MemoryRouter initialEntries={['/search?q=batman']}>
          <PrivateRoute>
            <HeroesRoutes />
          </PrivateRoute>
        </MemoryRouter>
      </AuthContext.Provider>
    )
    expect( localStorage.setItem ).toHaveBeenCalledWith("lastPath", "/search?q=batman");

  });

});