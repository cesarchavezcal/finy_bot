---
description: Steps to set up and manage the Finy Bot finance tracking system using Google Sheets.
---

// turbo-all
1. **Configure Environment Variables**
   Ensure `GOOGLE_SHEETS_CLIENT_ID`, `GOOGLE_SHEETS_CLIENT_SECRET`, and `GOOGLE_SHEETS_REFRESH_TOKEN` are set in `.env` (or Railway).
   Also ensure `SPREADSHEET_ID` is defined.

2. **Initialize Access Token**
   Use the `google-sheets` skill to obtain a fresh access token:
   ```bash
   bash -c 'curl -s -X POST "https://oauth2.googleapis.com/token" -d "client_id=$GOOGLE_SHEETS_CLIENT_ID" -d "client_secret=$GOOGLE_SHEETS_CLIENT_SECRET" -d "refresh_token=$GOOGLE_SHEETS_REFRESH_TOKEN" -d "grant_type=refresh_token"' | jq -r '.access_token' > /tmp/sheets_token.txt
   ```

3. **Verify Spreadsheet Access**
   Test connectivity to the spreadsheet:
   ```bash
   bash -c 'curl -s "https://sheets.googleapis.com/v4/spreadsheets/$SPREADSHEET_ID" -H "Authorization: Bearer $(cat /tmp/sheets_token.txt)"' | jq '.properties.title'
   ```

4. **Add Finance Logging Command**
   If not already present, ensure `commands/add.js` is implemented to log data to the sheet using the `sheetsService`.

5. **Deploy Changes**
   Commit the latest changes and push to GitHub:
   ```bash
   git add .
   git commit -m "feat: enhance finance tracking and documentation"
   git push origin main
   ```

6. **Monitor Railway**
   Check the Railway dashboard to ensure the build and deployment are successful.
