const axios = require('axios');

const getAuthUrl = () => {
  const base = "https://accounts.zoho.com/oauth/v2/auth";
  const params = new URLSearchParams({
    scope: "ZohoCRM.modules.Contacts.READ",
    client_id: process.env.ZOHO_CLIENT_ID,
    response_type: "code",
    access_type: "offline",
    redirect_uri: process.env.ZOHO_REDIRECT_URI
  });
  return `${base}?${params.toString()}`;
};

const getTokens = async (code) => {
  const url = "https://accounts.zoho.com/oauth/v2/token";
  const params = new URLSearchParams({
    grant_type: "authorization_code",
    client_id: process.env.ZOHO_CLIENT_ID,
    client_secret: process.env.ZOHO_CLIENT_SECRET,
    redirect_uri: process.env.ZOHO_REDIRECT_URI,
    code
  });
  const response = await axios.post(url, params.toString(), {
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
  });
  return response.data; // { access_token, refresh_token, expires_in }
};

module.exports = { getAuthUrl, getTokens };
