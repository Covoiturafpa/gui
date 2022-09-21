import React from 'react';
import { SchemaModel, StringType, DateType, NumberType, ObjectType, ArrayType } from 'schema-typed';

const loginFormSchema = SchemaModel({
    email: StringType().isEmail('Email invalide').isRequired('Email requis'),
    password: StringType().isRequired('Mot de passe requis'),
});

export { loginFormSchema };