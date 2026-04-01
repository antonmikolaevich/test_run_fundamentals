#!/usr/bin/env node
import fetch from "node-fetch";

const ticketId = process.argv[2];

if (!ticketId) {
  console.error("Usage: jira-cli.js <ticketId>");
  process.exit(1);
}

(async () => {
  try {
    const res = await fetch("http://localhost:3000/tools/jira/get_ticket", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ticketId }),
    });

    if (!res.ok) {
      const text = await res.text();
      console.error("Error:", text);
      process.exit(1);
    }

    const data = await res.json();

    console.log(`
=== JIRA TICKET ===
ID: ${ticketId}

TITLE:
${data.title}

REQUIREMENTS:
${data.requirements}
`);
  } catch (err) {
    console.error("Error:", err.message);
    process.exit(1);
  }
})();