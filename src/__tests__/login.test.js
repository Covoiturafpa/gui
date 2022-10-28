import React from 'react';
import { render, screen } from "@testing-library/react";
import renderer from 'react-test-renderer';
import userEvent from "@testing-library/user-event"
import AuthService from "../services/AuthService";
import { LoginForm } from "../component/LoginForm";

// Cas ok
// { userId: "username", token: "eazezaeza33213azezajkjj", role: "[...]"}

// Cas problème
// { userId: "username", token: "eazezaeza33213azezajkjj" }
// { banana: "username", token: "eazezaeza33213azezajkjj" }

// Cas erreur
// { errorMessage: "error message" }

const userLogin = {
    username: "MohammadGreenfelder@mail.fr",
    password: "MohammadGreenfelder@mail.fr"
};

// TODO à changer, faire tableau 1D
const testCount = 4;
const serverResponseOk = { userId: "username", token: "eazezaeza33213azezajkjj", role: "[...]" };
const serverResponseNotOk = { userId: "username", token: "eazezaeza33213azezajkjj" };
const serverResponseNotOk2 = { banana: "username", token: "eazezaeza33213azezajkjj" };
const serverResponseNotOk3 = { errorMessage: "error message" };

const fetchResponse = (value) => ({ json: async () => value })   // mock fetch().json()

// Permet de simuler les prochaines requêtes
// dès qu'un "fetch" sera appelé, il retourne les résultats déclarées ci-dessus
const mockFetch = jest.fn()
    .mockReturnValueOnce(fetchResponse(serverResponseOk)) // 1er fetch
    .mockReturnValueOnce(fetchResponse(serverResponseNotOk)) // 2
    .mockReturnValueOnce(fetchResponse(serverResponseNotOk2)) // 3
    .mockReturnValueOnce(fetchResponse(serverResponseNotOk3)); // 4

// rend le faux fetch global -> permet son utilisation partout dès qu'il sera utilisé
global.fetch = mockFetch();

// Structure de donnée utilisée pour le test de <FooterAfpaInformations> -> obsolète (ici pour tests futurs)
// const centre = {
//     centre: {
//         name: "Afpa Rochefort",
//         daysTimeTable: [
//             {
//                 "id": 2,
//                 "day": "TUESDAY",
//                 "startMorning": "08:00:00",
//                 "endMorning": "12:00:00",
//                 "startAfternoon": "13:00:00",
//                 "endAfternoon": "18:00:00"
//             },
//             {
//                 "id": 3,
//                 "day": "WEDNESDAY",
//                 "startMorning": "08:00:00",
//                 "endMorning": "12:00:00",
//                 "startAfternoon": "13:00:00",
//                 "endAfternoon": "18:00:00"
//             },
//             {
//                 "id": 4,
//                 "day": "THURSDAY",
//                 "startMorning": "08:00:00",
//                 "endMorning": "12:00:00",
//                 "startAfternoon": "13:00:00",
//                 "endAfternoon": "18:00:00"
//             },
//             {
//                 "id": 5,
//                 "day": "FRIDAY",
//                 "startMorning": "08:00:00",
//                 "endMorning": "12:00:00",
//                 "startAfternoon": "13:00:00",
//                 "endAfternoon": "18:00:00"
//             },
//             {
//                 "id": 6,
//                 "day": "SATURDAY",
//                 "startMorning": null,
//                 "endMorning": null,
//                 "startAfternoon": null,
//                 "endAfternoon": null
//             },
//             {
//                 "id": 7,
//                 "day": "SUNDAY",
//                 "startMorning": null,
//                 "endMorning": null,
//                 "startAfternoon": null,
//                 "endAfternoon": null
//             },
//             {
//                 "id": 1,
//                 "day": "MONDAY",
//                 "startMorning": "09:00:00",
//                 "endMorning": "12:00:00",
//                 "startAfternoon": "13:00:00",
//                 "endAfternoon": "18:00:00"
//             }
//         ]
//     }
// };

test('Login en utilisant le composant "LoginForm"', async () => {
    // TODO
    // à tester :
    // 1 - chargement d'un composant avec "props" ?!
    // 2 - possiblité de faire une requête mockée

    // Problèmes ;
    // - difficile de "render()" un composant utilisant un SchemaType. Il manque un "Provider" -> on ne peut pas render LoginForm
    // - difficile de faire une requête, fetch indéfini (raison : environnement de test NodeJS et non pas navigateur) -> piste de recherche : remplacer fetch par node-fetch (attention : ne fonctionnera pas en navigateur...)
});

test('basic', () => {
    expect(1).toBe(1);
});

