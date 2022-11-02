/**
 * @jest-environment jsdom
 */
import React from 'react';
import { render, screen, cleanup, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event"
import renderer, { act } from 'react-test-renderer';
import { Router, Route, Routes, BrowserRouter, MemoryRouter } from 'react-router-dom';

import LoginForm from "../component/LoginForm";
import Accueil from "../scenes/Accueil";
import { Provider } from '../services/UserLogin';

import { mockFetchOkLogin, mockFetchNotOkLogin } from '../__mocks__/mockFetchLogin';

// const userLogin = {
//     username: "MohammadGreenfelder@mail.fr",
//     password: "MohammadGreenfelder@mail.fr"
// };

afterEach(() => {
    global.fetch.mockClear()
    delete global.fetch;
});


// Cas problème de traitement de la donnée
// { userId: "username", token: "eazezaeza33213azezajkjj" }
// { banana: "username", token: "eazezaeza33213azezajkjj" }

// Cas erreur
// { errorMessage: "error message" }
test('Login pas ok - ne doit pas rediriger vers la page d\'accueil', async () => {

    global.fetch = jest.fn().mockImplementation(mockFetchNotOkLogin);

    render(
        <MemoryRouter initialEntries={["/login"]} >
            <Provider>
                <Routes>
                    <Route path="/login" element={<LoginForm />} />
                    <Route path="/accueil" element={<Accueil />} />
                </Routes>
            </Provider>
        </MemoryRouter>
    );

    let element = await screen.getByRole('button', { name: /Connexion/i });
    await act(async () => {
        userEvent.click(element);
    });

    expect(screen.queryByTestId('test-welcome-page')).toBeNull();
});

test('Login ok - doit rediriger vers la page d\'accueil', async () => {

    global.fetch = jest.fn().mockImplementation(mockFetchOkLogin);

    render(
        <MemoryRouter initialEntries={["/login"]} >
            <Provider>
                <Routes>
                    <Route path="/login" element={<LoginForm />} />
                    <Route path="/accueil" element={<Accueil />} />
                </Routes>
            </Provider>
        </MemoryRouter>
    );

    let element = await screen.getByRole('button', { name: /Connexion/i });
    await act(async () => {
        userEvent.click(element);
    });

    expect(screen.queryByTestId('test-welcome-page')).not.toBeNull();
});
