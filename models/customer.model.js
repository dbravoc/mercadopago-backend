import supabase from '../config/supabaseClient.js';

export const createCustomer = async (customerData) => {
    const { firstname, lastname, email, nationality, documentType, documentNumber } = customerData;

    const { data, error } = await supabase
        .from('formulario_pago') // Asegúrate de que 'customers' sea el nombre de tu tabla en Supabase
        .insert([
            {
                firstname,
                lastname,
                email,
                nationality,
                document_type: documentType,
                document_number: documentNumber,
            },
        ])
        .select(); // Asegura que se devuelvan todos los campos, incluido el ID


    if (error) {
        throw error;
    }

    return data;
};