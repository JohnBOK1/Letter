BLOOM LETTER — ADMIN EDITOR (GitHub Pages)
===========================================

The full letter to Tina, envelope, blooms, falling hearts and animation are included.
This version also includes a top-right "Admin login" button and an online letter editor.

IMPORTANT: GitHub Pages is static, so a normal username/password login cannot be made secure using HTML/JS alone. This project uses GitHub authentication with a fine-grained personal access token. The token is typed manually into the editor and held only in the tab's memory: never committed or saved in a file/localStorage/cookie.

SET UP (ONCE):
1. Extract this ZIP. It contains index.html, script.js, style.css, letter.json,
   favicon.svg, README.txt at the root. No extra folder needs to go in the repo.
2. Copy the files into your LOCAL Letter repository folder in VS Code,
   replacing the existing website files. Keep your existing vendor folder if any.
3. In the VS Code terminal inside that repository folder:
      git add .
      git commit -m "Add admin letter editor"
      git push
4. Keep GitHub Pages configured to main / (root).
   Website URL: https://johnbok1.github.io/Letter/

CREATE A GITHUB TOKEN (ONCE PER TOKEN):
1. Visit https://github.com/settings/personal-access-tokens/new
2. Token name: Bloom Letter Editor
3. Resource owner: JohnBOK1
4. Repository access: Only select repositories > Letter
5. Repository permissions > Contents > Read and write
6. Choose an expiration date (short-lived is safer), then generate token.
7. Copy the token and KEEP IT PRIVATE. Do not commit it to GitHub or share it.

EDIT THE LETTER (ANY TIME):
1. Visit your published website on a device you trust.
2. Click "Admin login" in the top bar, paste the token, click Unlock editor.
3. Edit greeting / body / signature.
4. Click Preview on page if you want, then Save & Publish.
5. A GitHub commit is created updating only letter.json. GitHub Pages will
   publish it automatically after deployment completes.
6. Click "Log out" to forget the token from this tab, or close/reload the tab.

BEHAVIOR:
- Visitors do not need a login; everyone sees letter.json loaded from the site.
- Other devices see the latest published version after GitHub Pages deploys.
- A preview is only visible in your current tab until it is saved.
- If you edit letter.json somewhere else during an editor session, sign in
  again to avoid overwriting a newer version.
- The repository is public, so the letter itself is PUBLIC. The login button
  only prevents unauthorized editing; it does not make the letter private.
- If you view the site offline, it still displays the original letter.

FILES:
- index.html: website and admin login/editor dialogs
- script.js: animations, letter rendering and GitHub editor
- style.css: entire page and dialogs
- letter.json: editable content; GitHub editor saves changes here
- favicon.svg: icon
- README.txt: these instructions

No Node.js, npm, database or external JS libraries required.
