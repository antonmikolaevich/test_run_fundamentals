import 'dotenv/config';  // или import dotenv from 'dotenv'; dotenv.config();
import { OpenAI } from "openai";
import fs from "fs-extra";
import { exec } from "child_process";
import path from "path";

console.log("OPENAI_API_KEY =", process.env.OPENAI_API_KEY); // проверка

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

// Читаем user story
async function getUserStory() {
  const file = path.join(process.cwd(), "ai-agent", "user-story.txt");
  return fs.readFile(file, "utf8");
}

// Генерация тестов через LLM
async function generateTests(userStory) {
  const prompt = `
You are a QA automation expert.
Generate WebdriverIO tests using existing page objects from this project.
User story: ${userStory}
Return ONLY JavaScript code (Mocha/WDIO syntax) ready to save as .spec.js.
`;

  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content: prompt }],
    temperature: 0.5
  });

  return response.choices[0].message.content;
}

// Сохраняем тесты в файл
async function saveTests(code) {
  const dir = path.join(process.cwd(), "ai-agent", "generated-tests");
  await fs.ensureDir(dir);
  const filePath = path.join(dir, `test-${Date.now()}.spec.js`);
  await fs.writeFile(filePath, code);
  return filePath;
}

// Запуск тестов WDIO
function runTests(filePath) {
  return new Promise((resolve, reject) => {
    exec(`npx wdio run wdio.conf.js --spec ${filePath}`, (err, stdout, stderr) => {
      if (err) reject(stderr);
      else resolve(stdout);
    });
  });
}

// Orchestrator
async function main() {
  try {
    const userStory = await getUserStory();
    const code = await generateTests(userStory);
    const testFile = await saveTests(code);
    console.log("Generated test file:", testFile);

    console.log("Running tests...");
    const result = await runTests(testFile);
    console.log("Test results:\n", result);

    console.log("Agent completed!");
  } catch (error) {
    console.error("Agent error:", error.message);
  }
}

main();