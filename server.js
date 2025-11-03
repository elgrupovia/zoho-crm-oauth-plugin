require('dotenv').config();
const express = require('express');
const { getAuthUrl, getTokens } = require('./zoho/oauth');
const { getContacts } = require('./zoho/crm');

const app = express();
const PORT = 3000;

// Ruta inicial: redirige al usuario a Zoho para autorizar
app.get('/', (req, res) => {
  const url = getAuthUrl();
  res.redirect(url);
});

// Callback que recibe Zoho con ?code=XXXX
app.get('/callback', async (req, res) => {
  const code = req.query.code;
  if (!code) return res.send("No se recibió code");

  try {
    const tokens = await getTokens(code); // access_token y refresh_token
    const contacts = await getContacts(tokens.access_token);
    res.json({ tokens, contacts });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error obteniendo tokens o contactos");
  }
});

app.listen(PORT, () => console.log(`Servidor corriendo en http://localhost:${PORT}`));
