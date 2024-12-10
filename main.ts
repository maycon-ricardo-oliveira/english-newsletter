import * as dotenv from "dotenv";

import { GoogleGenerativeAI } from "@google/generative-ai";

import themes from './themes';
import students from './students';
import nodemailer from "nodemailer";
import { emailTemplate } from './emailTemplate';

dotenv.config();

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

async function sendEmail(to: string, subject: string, htmlContent: string) {
    try {
        const info = await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to,
            subject,
            html: htmlContent,
        });
        console.log(`E-mail enviado para ${to}: ${info.response}`);
    } catch (error) {
        console.error(`Erro ao enviar e-mail para ${to}:`, error);
    }
}

async function createText(prompt: string) : Promise<string> {

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const result = await model.generateContent(prompt);
    return result.response.text();
}

async function translateText(prompt: string) : Promise<string> {

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const result = await model.generateContent(prompt);
    return result.response.text();
}


async function sendStoryToStudents() {
    for (let student of students) {
        const selectedTheme = themes[Math.floor(Math.random() * themes.length)];
        const prompt = `Create a short story with 3 paragrafs based on English books for students, prefering use common words, for an ${student.englishLevel} English student, with this theme ${selectedTheme.toLowerCase()}.`;
        
        const story = await createText(prompt);
        const translation = await translateText("translate this history to portuguese brazilian: " + story);
        
        const emailContent = emailTemplate(student.name, student.englishLevel, story, translation);
        
        console.log(`Student: ${student.name} (${student.englishLevel})`);
        console.log("Email:", student.email);
        console.log("Theme:", selectedTheme);
        console.log("Story:", story);
        console.log("Translation:", translation);
        await sendEmail(student.email, "Your English Story", emailContent);
        console.log("-----------------------------");
    }
}


sendStoryToStudents();