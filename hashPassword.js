import bcrypt from 'bcrypt';

const generar = async () => {
    const hash = await bcrypt.hash('Pass.123', 10);
    console.log("copiar codigo de pass hasheada y cargarlo:");
    console.log(hash);
};

generar();