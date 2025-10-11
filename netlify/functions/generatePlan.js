exports.handler = async function (event, context) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'Server API key not configured. Set GEMINI_API_KEY in Netlify UI.' })
    };
  }

  // TODO: implement server-side call to Gemini. For now, return a placeholder.
  return {
    statusCode: 200,
    body: JSON.stringify({ message: 'Function deployed. Implement Gemini call server-side.' })
  };
};
