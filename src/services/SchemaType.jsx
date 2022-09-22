import { SchemaModel, StringType } from 'schema-typed';

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
})

function asyncCheckIsEmailUnique(email) {
    console.log("TODO: asyncCheckIsEmailUnique à implémenter")
    return true;
}

const profilFormSchema = SchemaModel.combine(newEmailFormSchema, frenchPhoneFormSchema, updatePasswordFormSchema, passwordConfirmFormSchema);

export { loginFormSchema, profilFormSchema, newEmailFormSchema };

