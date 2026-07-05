import bcrypt from 'bcrypt';

const generar = async () => {
    const hash = await bcrypt.hash('Pass.123', 10);
    console.log("Copia este código y pégalo en phpMyAdmin:");
    console.log(hash);
};

generar();