const handler = async (m, { conn, args }) => {
    if (args.length < 2) {
        return conn.reply(m.chat, 'Debes proporcionar la hora (HH:MM) y el país (MX, CO, CL, AR).', m);
    }

    const horaRegex = /^([01]?\d|2[0-3]):([0-5]\d)$/;
    if (!horaRegex.test(args[0])) {
        return conn.reply(m.chat, 'Formato de hora incorrecto. Usa HH:MM en formato de 24 horas.', m);
    }

    const [horaStr, minutoStr] = args[0].split(':');
    const hora = parseInt(horaStr, 10);
    const minutos = parseInt(minutoStr, 10);
    const pais = args[1].toUpperCase();

    // Zonas horarias por país
    const zonasHorarias = {
        MX: 'America/Mexico_City',
        CO: 'America/Bogota',
        CL: 'America/Santiago',
        AR: 'America/Argentina/Buenos_Aires'
    };

    if (!(pais in zonasHorarias)) {
        return conn.reply(m.chat, 'País no válido. Usa MX, CO, CL o AR.', m);
    }

    // Obtener la fecha base en UTC
    const now = new Date();
    const baseUTC = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), hora, minutos));

    // Calcular la hora local para cada país usando Intl.DateTimeFormat
    const obtenerHoraLocal = (timezone, offset = 0) => {
        const fecha = new Date(baseUTC.getTime() + offset * 60 * 60 * 1000);
        return new Intl.DateTimeFormat('es-MX', {
            timeZone: timezone,
            hour: '2-digit',
            minute: '2-digit',
            hour12: false
        }).format(fecha);
    };

    // Generar 4 horarios consecutivos en la zona base
    const horariosPorPais = {};
    Object.entries(zonasHorarias).forEach(([codigo, zona]) => {
        horariosPorPais[codigo] = [];
        for (let i = 0; i < 4; i++) {
            const offsetFecha = new Date(baseUTC.getTime() + i * 60 * 60 * 1000);
            const horaLocal = new Intl.DateTimeFormat('es-MX', {
                timeZone: zona,
                hour: '2-digit',
                minute: '2-digit',
                hour12: false
            }).format(offsetFecha);
            horariosPorPais[codigo].push(horaLocal);
        }
    });

    // Hora actual en México
    const horaActualMX = new Intl.DateTimeFormat('es-MX', {
        timeZone: 'America/Mexico_City',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
    }).format(new Date());

    const mensaje = `
*4 𝐕𝐒 4*

🇲🇽 𝐌𝐄𝐗𝐈𝐂𝐎 : ${horariosPorPais.MX.join(' | ')}
🇨🇴 𝐂𝐎𝐋𝐎𝐌𝐁𝐈𝐀 : ${horariosPorPais.CO.join(' | ')}
🇨🇱 𝐂𝐇𝐈𝐋𝐄 : ${horariosPorPais.CL.join(' | ')}
🇦🇷 𝐀𝐑𝐆𝐄𝐍𝐓𝐈𝐍𝐀 : ${horariosPorPais.AR.join(' | ')}

🕒 𝐇𝐎𝐑𝐀 𝐀𝐂𝐓𝐔𝐀𝐋 𝐄𝐍 🇲🇽 𝐌𝐄𝐗𝐈𝐂𝐎: ${horaActualMX}

𝗘𝗦𝗖𝗨𝗔𝗗𝗥𝗔

👑 ┇ 
🥷🏻 ┇  
🥷🏻 ┇ 
🥷🏻 ┇ 

ㅤʚ 𝐒𝐔𝐏𝐋𝐄𝐍𝐓𝐄:
🥷🏻 ┇ 
🥷🏻 ┇
`.trim();

    conn.sendMessage(m.chat, { text: mensaje }, { quoted: m });
};

handler.help = ['4vs4'];
handler.tags = ['freefire'];
handler.command = /^(4vs4|vs4)$/i;
export default handler;