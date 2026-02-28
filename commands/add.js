import { sheetsService } from "../utils/sheets.js";

export default {
    name: "add",
    description: "Add a new expense or income",
    usage: "/add <amount> <category> <description>",
    example: "/add 50 Food Lunch at Office",
    category: "Finance",
    handler: async (ctx) => {
        const { text } = ctx.message;
        const args = text.split(" ").slice(1);

        if (args.length < 3) {
            await ctx.reply("Usage: /add <amount> <category> <description>\nExample: /add 50 Food Lunch");
            return;
        }

        const amount = parseFloat(args[0]);
        const category = args[1];
        const description = args.slice(2).join(" ");

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
    },
};
