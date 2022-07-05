import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { AuthContext } from "../../src/auth";
import { PrivateRoute } from "../../src/router/PrivateRoute";

describe('Pruebas en <PrivateRoute />', () => {

  test('Debe de mostrar el children si está autenticado', () => { 

    const contextValue = {
      logged: true,
      user: 'Derian'
    }
    render(
      <AuthContext.Provider value={ contextValue }>
        <PrivateRoute>
          <h1>Ruta privada</h1>
        </PrivateRoute>
      </AuthContext.Provider>
    )
    expect( screen.getByText('Ruta privada') ).toBeTruthy();

  });

  test('Debe de navegar si no está autenticado', () => { 

    const contextValue = {
      logged: false
    }
    render(
      <AuthContext.Provider value={ contextValue }>
        <MemoryRouter initialEntries={['/marvel']}>
          <Routes>
            <Route path="marvel" element={
              <PrivateRoute>
                <h1>Ruta privada</h1>
              </PrivateRoute>
            } />
            <Route path="login" element={<h1>Página Login</h1>} />
          </Routes>
        </MemoryRouter>
      </AuthContext.Provider>
    )
    expect( screen.getByText('Página Login') ).toBeTruthy();

  });

});