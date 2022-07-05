import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter, useNavigate } from "react-router-dom";
import { SearchPage } from "../../../src/heroes/pages/SearchPage";

const mockedUseNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUseNavigate
}));

describe('Pruebas en <SearchPages />', () => {

  beforeEach( () => jest.clearAllMocks() );

  test('Debe de mostrarse correctamente con valores por defecto', () => { 

    const { container } = render(
      <MemoryRouter>
        <SearchPage />
      </MemoryRouter>
    )
    expect( container ).toMatchSnapshot();

  });

  test('Debe de mostrar a Batman y el input con el valor del queryString', () => { 

    render(
      <MemoryRouter initialEntries={['/search?q=batman']}>
        <SearchPage />
      </MemoryRouter>
    )
    const input = screen.getByRole('textbox');
    expect( input.value ).toBe('batman');
    const image = screen.getByRole('img');
    expect( image.src ).toContain('dc-batman.jpg');
    const alert = screen.getByLabelText('alert-danger');
    expect( alert.style.display ).toBe('none');

  });

  test('Debe de mostrar un error si no se encuentra el héroe (batman123)', () => { 

    render(
      <MemoryRouter initialEntries={['/search?q=batman123']}>
        <SearchPage />
      </MemoryRouter>
    )
    const alert = screen.getByLabelText('alert-danger');
    expect( alert.style.display ).toBe('block');

  });

  test('Debe de llamar el navigate a la pantalla nueva', () => { 

    render(
      <MemoryRouter>
        <SearchPage />
      </MemoryRouter>
    )
    const input = screen.getByRole('textbox'); 
    const form = screen.getByRole('form'); 
    fireEvent.change( input, { name: 'searchText', target: { value: 'batman'} } );
    fireEvent.submit( form );
    expect( mockedUseNavigate ).toHaveBeenCalledWith('?q=batman');

  });

});