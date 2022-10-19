import { MixedType, SchemaModel, StringType, BooleanType, DateType, ArrayType, ObjectType, NumberType } from 'schema-typed';
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

const ServiceConfirmSchema = SchemaModel({
    service: MixedType().isRequired()
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

function asyncCheckIsEmailUnique(email) {
    return (FetchService.get("/users/email_validity"));
}

const profilFormSchema = SchemaModel.combine(newEmailFormSchema, frenchPhoneFormSchema, updatePasswordFormSchema, passwordConfirmFormSchema);

const newUserFormSchema = SchemaModel.combine(frenchPhoneFormSchema,);

const oneTimeForm = SchemaModel.combine(rideForm, oneTime);

const recurringForm = SchemaModel.combine(rideForm, recurring);

const allRideForm = SchemaModel.combine(rideForm, recurring, oneTime);

export { loginFormSchema, profilFormSchema, newEmailFormSchema, allRideForm, oneTimeForm, recurringForm };

