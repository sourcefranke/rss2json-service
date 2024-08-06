const { XMLParser } = require('fast-xml-parser');

const express = require('express');
const app = express();

app.get('/api/2json', async (req, res) => {
    const rssUrl = req.query.rssUrl;
    const result = await convertRssToJson(rssUrl);
    res.json(result);
});

app.listen(80);

async function convertRssToJson(rssUrl) {
    try {
        // Fetch the RSS feed
        const response = await fetch(rssUrl);
        const rssText = await response.text();

        // Parse the RSS XML
        const jsonObj  = new XMLParser().parse(rssText);

        // Output the JSON result
        return jsonObj;
    } catch (error) {
        console.error("Error fetching or parsing the RSS feed:", error);
    }
}
