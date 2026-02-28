import { JWT } from "google-auth-library";
import { GoogleSpreadsheet } from "google-spreadsheet";
import { config } from "dotenv";
import fs from "fs";

if (fs.existsSync(".env")) {
    config();
}

const SCOPES = [
    "https://www.googleapis.com/auth/spreadsheets",
    "https://www.googleapis.com/auth/drive.file",
];

export class SheetsService {
    constructor() {
        this.spreadsheetId = process.env.SPREADSHEET_ID;
        this.clientEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
        this.privateKey = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n");

        if (!this.spreadsheetId || !this.clientEmail || !this.privateKey) {
            throw new Error("Missing Google Sheets environment variables!");
        }

        this.auth = new JWT({
            email: this.clientEmail,
            key: this.privateKey,
            scopes: SCOPES,
        });

        this.doc = new GoogleSpreadsheet(this.spreadsheetId, this.auth);
    }

    async init() {
        await this.doc.loadInfo();
    }

    async addRow(sheetTitle, rowData) {
        const sheet = this.doc.sheetsByTitle[sheetTitle];
        if (!sheet) {
            throw new Error(`Sheet with title "${sheetTitle}" not found!`);
        }
        return await sheet.addRow(rowData);
    }

    async getRows(sheetTitle) {
        const sheet = this.doc.sheetsByTitle[sheetTitle];
        if (!sheet) {
            throw new Error(`Sheet with title "${sheetTitle}" not found!`);
        }
        return await sheet.getRows();
    }
}

export const sheetsService = new SheetsService();
