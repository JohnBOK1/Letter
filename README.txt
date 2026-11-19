BLOOM LETTER — FIXED LOGIN EDITOR
=================================
Website: https://johnbok1.github.io/Letter/

LOGIN
Username: Johnlie
Password: tina123

This is a CLIENT-SIDE convenience login, not real security. Your GitHub Pages
repository is public, and a visitor can inspect source code or bypass the
login. Do not reuse this password for real accounts.

This version removes GitHub access-token login completely. You can edit the
letter after login, preview it, and save a draft in that browser's local
storage. Your original animated envelope, flowers, pink theme and complete
letter to Tina are preserved.

IMPORTANT: A static website cannot use only a hard-coded username/password
to update the GitHub repository. Saving here does NOT publish the letter to
other devices. To update the public website, you must commit letter.json.

SET UP THE NEW WEBSITE
1. Extract this ZIP. The files are at the ZIP root.
2. Replace index.html, script.js, style.css, letter.json, favicon.svg in
   your local Letter repository. You can keep the existing vendor folder.
3. Open VS Code terminal in that repo and run:
      git add .
      git commit -m "Add fixed login and letter editor"
      git push
4. GitHub Pages must use main / (root).

EDIT & SAVE YOUR DRAFT
1. Open https://johnbok1.github.io/Letter/
2. Click Admin login; sign in with the username and password above.
3. Edit the greeting, letter and signature. Leave a blank line between
   paragraphs. Preview if you like.
4. Click Save on this device. It persists ONLY in this browser/device.
   Logging out hides the editor, not the saved draft.

PUBLISH TO ALL DEVICES (NO TOKEN)
1. In the editor, click Copy for GitHub.
2. Click Open letter.json on GitHub (sign in to your GitHub account if needed).
3. Select all the contents of that file, paste the copied JSON and click
   Commit changes. GitHub Pages will update after deploying.
Alternatively, click Download letter.json, replace the local file and run:
      git add letter.json
      git commit -m "Update letter message"
      git push

FILES
- index.html: pink website, login/editor dialogs
- script.js: flower/envelope animation and fixed-login editor
- style.css: presentation and mobile styling
- letter.json: the publicly published editable letter
- favicon.svg: website icon
- README.txt: setup and publishing instructions

No token, Node.js, npm, database or external JS libraries are required.
