import { sheetsService } from "../utils/sheets.js";
import { InlineKeyboard } from "grammy";

export default {
    name: "add",
    description: "Add a new expense or income",
    usage: "/add <amount> <category> <description>",
    example: "/add 50 Food Lunch",
    category: "Finance",
    handler: async (ctx) => {
        const { text } = ctx.message;
        const args = text.split(" ").slice(1).filter(a => a);

        if (args.length === 0) {
            const keyboard = new InlineKeyboard()
                .text("💰 Income", "add:income")
                .text("💸 Expense", "add:expense");

            await ctx.reply("What type of entry is this?", { reply_markup: keyboard });
            return;
        }

        if (args.length < 3) {
            await ctx.reply("Usage: /add <amount> <category> <description>\nExample: /add 50 Food Lunch");
            return;
        }

        const amount = parseFloat(args[0]);
        const category = args[1];
        const description = args.slice(2).join(" ");
        await processAdd(ctx, amount, category, description);
    },
    callbackQueryHandler: async (ctx, next) => {
        const data = ctx.callbackQuery.data;
        if (!data.startsWith("add:")) return next();

        const type = data.split(":")[1];
        const prompt = type === "income"
            ? "💰 *Income Selected*\n\nPlease send the details in this format:\n`<amount> <category> <description>`\nExample: `100 Salary Monthly`"
            : "💸 *Expense Selected*\n\nPlease send the details in this format:\n`<amount> <category> <description>`\nExample: `50 Food Lunch`";

        await ctx.answerCallbackQuery();
        await ctx.editMessageText(prompt, { parse_mode: "Markdown" });
    }
};

async function processAdd(ctx, amount, category, description) {
    if (isNaN(amount)) {
        await ctx.reply("Please provide a valid number for the amount.");
        return;
    }

    try {
        await sheetsService.init();
        const date = new Date().toISOString().split("T")[0];
        await sheetsService.addRow("Sheet1", {
            Date: date,
            Amount: amount,
            Category: category,
            Description: description,
        });

        await ctx.reply(`✅ Added: ${amount} to ${category} (${description})`);
    } catch (error) {
        console.error(error);
        await ctx.reply("❌ Error adding to sheet. Please check your configuration.");
    }
}
