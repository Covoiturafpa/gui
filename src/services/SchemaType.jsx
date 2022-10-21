import { MixedType, SchemaModel, StringType, BooleanType, DateType, ArrayType, NumberType, ObjectType } from 'schema-typed';
import FetchService from './FetchService';
import { isDate, isAfter, isFuture, startOfToday } from 'date-fns'


const loginFormSchema = SchemaModel({
    email: StringType().isEmail('Email invalide').isRequired('Email requis'),
    password: StringType().isRequired('Mot de passe requis'),
});


const frenchPhoneFormSchema = SchemaModel({
    phoneNumber: StringType().pattern(/^(\+33|0|0033)[1-9]([. ]?[0-9]{2}){4}$/, 'Numéro de téléphone invalide')
});

const newEmailFormSchema = SchemaModel({
    email: StringType()
        .isEmail('Email invalide')
        .addRule((value, data) => {
            return asyncCheckIsEmailUnique(value);
        }, 'Cette adresse email est déjà enregistrée')
        .isRequired('Email requis')
});

const newPasswordFormSchema = SchemaModel({
    password: StringType().isRequired("Mot de passe requis")
        .containsLowercaseLetter("Doit contenir : lettre minuscule")
        .containsUppercaseLetter("Doit contenir : lettre majuscule")
        .containsNumber("Doit contenir : nombre")
        .pattern(/\W+/, "Doit contenir : caractère spécial")
        .rangeLength(8, 30, "Minimum 8 caractères, maximum 30"),
});

const updatePasswordFormSchema = SchemaModel({
    password: StringType()
        .containsLowercaseLetter("Doit contenir : lettre minuscule")
        .containsUppercaseLetter("Doit contenir : lettre majuscule")
        .containsNumber("Doit contenir : nombre")
        .pattern(/\W+/, "Doit contenir : caractère spécial")
        .rangeLength(8, 30, "Minimum 8 caractères, maximum 30"),
});

const passwordConfirmFormSchema = SchemaModel({
    passwordConfirm: StringType().addRule((value, data) => {
        if (value !== data.password) {
            return false;
        }
        return true;
    }, 'Les mots de passe ne correspondent pas')
});

const formationConfirmSchema = SchemaModel({
    formation: MixedType().isRequired("Sélectionnez une formation")
});

const cguAgreement = SchemaModel({
    cguAgreement: BooleanType().isRequired("Acceptez les CGU")
});

const rideForm = SchemaModel({
    departure: StringType().isRequired("Vous devez choisir une destination"),
    arrival: StringType().isRequired("Vous devez choisir une destination"),
    rideType: StringType().isOneOf(['O', 'R']).isRequired("Vous devez sélectionner une option"),
    isRoundTrip: BooleanType().isRequired("Vous devez sélectionner une option"),
})

const oneTime = SchemaModel({
    date: DateType().min(new Date(), "Vous ne pouvez pas sélectionner une date passée")
    .isRequired("Vous devez choisir une date")
})

const recurring = SchemaModel({
    dates: MixedType().addRule((dates) => {
        if (dates !== undefined && dates !== null && dates.length === 2) {
            const beginning = dates[0];
            const ending = dates[1];
            if (isDate(beginning) && isDate(ending) && 
                isAfter(beginning, startOfToday()) && isFuture(ending)) {
                return true;
            }
        }
        return false;
    }, "Vous devez choisir une période valide", true),
    days: ArrayType().rangeLength(1, 7, "Vous devez choisir entre 1 et 7 jours")
})

const arrivalTimeInput = SchemaModel({
    arrivalTimeInput: DateType().isRequired("Vous devez choisir une heure")
})

const arrivalTimeReturnInput = SchemaModel({
    arrivalTimeReturnInput: DateType().isRequired("Vous devez choisir une heure")
})


const carInputModel = SchemaModel({
    carInput: ObjectType().shape({
        key: NumberType().isRequired(),
        seats: NumberType().isRequired(),
        label: StringType().isRequired(),
        value: StringType().isRequired(),
        avgFuelConsumption: NumberType().isRequired(),
        idCarType : MixedType().addRule((value) => {
            if (value === undefined) {
                return true;
            }
            return false;
        }),
        idPerson: MixedType().addRule((value) => {
            if (value === undefined) {
                return true;
            }
            return false;
        })
    }, "allo").isRequired("Vous devez choisir une voiture")
})

const seatsInput = SchemaModel({
    seatsInput: NumberType().isRequired("Vous devez indiquer le nombre de place disponible").min(1, "Vous devez proposer au moins une place disponible")
})

const priceInput = SchemaModel({
    priceInput: NumberType().isRequired("Vous devez indiquer un prix")
})

const commentInput = SchemaModel({
    commentInput: StringType().isRequiredOrEmpty("Commentaire invalide")
})

function asyncCheckIsEmailUnique(email) {
    return (FetchService.get("/users/email_validity"));
}

function getCarsFromUser(userId) {
    const fetch = FetchService.get("/users/" + userId);
    const cars = null;
    fetch.then(
        (result) => {
            cars = result.cars.map(
                car => ({ label: car.model, value: car.model, key: car.id, seats: car.seats, avgFuelConsumption: car.avgFuelConsumption, idCarType: car.idCarType, idPerson: car.idPerson })
            );
        }
    )
    return cars;
}

const profilFormSchema = SchemaModel.combine(newEmailFormSchema, frenchPhoneFormSchema, updatePasswordFormSchema, passwordConfirmFormSchema);

const newUserFormSchema = SchemaModel.combine(frenchPhoneFormSchema, formationConfirmSchema, newEmailFormSchema, newPasswordFormSchema, passwordConfirmFormSchema, cguAgreement);

const oneTimeForm = SchemaModel.combine(rideForm, oneTime);

const recurringForm = SchemaModel.combine(rideForm, recurring);

const searchRideForm = SchemaModel.combine(rideForm, recurring, oneTime);

const roundTripTimes = SchemaModel.combine(arrivalTimeInput, arrivalTimeReturnInput);

const addRideForm = SchemaModel.combine(searchRideForm, carInputModel, seatsInput, priceInput, commentInput, roundTripTimes);

const addOneTimeTrip = SchemaModel.combine(oneTimeForm, carInputModel, seatsInput, priceInput, commentInput, arrivalTimeInput)

const addOneTimeRoundTrip = SchemaModel.combine(oneTimeForm, carInputModel, seatsInput, priceInput, commentInput, roundTripTimes);

const addRecurringTrip = SchemaModel.combine(recurringForm, carInputModel, seatsInput, priceInput, commentInput, arrivalTimeInput)

const addRecurringRoundTrip = SchemaModel.combine(recurringForm, carInputModel, seatsInput, priceInput, commentInput, roundTripTimes);


export { loginFormSchema, profilFormSchema, newEmailFormSchema, searchRideForm, oneTimeForm, recurringForm, addRideForm, addOneTimeTrip, addOneTimeRoundTrip, addRecurringTrip, addRecurringRoundTrip, newUserFormSchema, carInputModel };

