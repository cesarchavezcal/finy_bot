import { sheetsService } from "../utils/sheets.js";

export default {
    name: "balance",
    description: "Show current balance and summary",
    usage: "/balance",
    example: "/balance",
    category: "Finance",
    handler: async (ctx) => {
        try {
            await ctx.reply("📊 Fetching balance data...");
            await sheetsService.init();
            const rows = await sheetsService.getRows("Sheet1");

            let total = 0;
            const categories = {};

            for (const row of rows) {
                const amount = parseFloat(row.get("Amount"));
                if (!isNaN(amount)) {
                    total += amount;
                    const cat = row.get("Category") || "Uncategorized";
                    categories[cat] = (categories[cat] || 0) + amount;
                }
            }

            let response = `💰 *Total Expenses:* ${total.toFixed(2)}\n\n`;
            response += "*ByCategory:*\n";
            for (const [cat, amt] of Object.entries(categories)) {
                response += `• ${cat}: ${amt.toFixed(2)}\n`;
            }

            await ctx.reply(response, { parse_mode: "Markdown" });
        } catch (error) {
            console.error(error);
            await ctx.reply("❌ Error fetching balance. Please check your configuration.");
        }
    },
};
