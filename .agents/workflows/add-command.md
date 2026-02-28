---
description: Standard steps to add a new command to Finy Bot.
---

1. **Create Command File**
   Create a new `.js` file in the `commands/` directory.
   
2. **Implement Logic**
   Follow the template from `gemini.md`:
   ```javascript
   export default {
     name: "newcommand",
     description: "Description",
     handler: async (ctx) => {
       // logic here
     }
   };
   ```

3. **Local Testing**
   Run the bot locally (if `BOT_TOKEN` is set) to verify the command works.

4. **Document Command**
   Update `gemini.md` if the command is a major feature.

5. **Commit and Push**
   ```bash
   git add commands/newcommand.js
   git commit -m "feat: add /newcommand"
   git push origin main
   ```
