import express from "express";
import fetch from "node-fetch";

const app = express();
app.use(express.json());

const JIRA_BASE = process.env.JIRA_BASE;


const JIRA_SESSION = process.env.JIRA_SESSION;


app.post("/tools/jira/get_ticket", async (req, res) => {
  try {
    const { ticketId } = req.body;

    if (!ticketId) {
      return res.status(400).json({ error: "ticketId is required" });
    }

    const response = await fetch(
      `${JIRA_BASE}/rest/api/2/issue/${ticketId}?fields=summary,description`,
      {
        headers: {
          Cookie: `JSESSIONID=${JIRA_SESSION}`,
          Accept: "application/json",
        },
      }
    );

    if (!response.ok) {
      const text = await response.text();
      return res.status(response.status).json({ error: text });
    }

    const data = await response.json();

    res.json({
      title: data.fields.summary,
      requirements: data.fields.description,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

app.listen(3000, () => {
  console.log("Jira MCP running on port 3000");
});