/* Default letter shown immediately. Published changes are loaded from letter.json. */
const DEFAULT_LETTER = {
  "greeting": "To the girl I still love,",
  "paragraphs": [
    "I don't know where to begin, but one thing I know for sure is that my love for you was real, and it still is.",
    "For four years, you were my favorite person, my comfort, and the person I wanted to share every little moment of my life with. I miss our random conversations, our laughter, our excitement to talk to each other, and the way we loved each other during our first few years together.",
    "If only I could turn back time, I would do so many things differently. I would be less demanding, understand you better, respect your time and freedom, and give you the happiness you deserved.",
    "Despite everything that happened, I can't bring myself to hate you. Yes, you hurt me in ways I never imagined, but that doesn't erase the beautiful memories we shared or the love I have for you.",
    "A part of me still wishes we could start over, fall in love again, and make things right. But I also know that love cannot be forced, and I respect whatever your heart chooses.",
    "Even if I'm no longer the person you want beside you, I hope life treats you kindly. I hope you achieve your dreams, find your happiness, and experience the peace you've always wanted.",
    "I'm not writing this to make you feel guilty or to ask you to come back. I just want you to know how much you meant to me and how grateful I am for the years we shared.",
    "Perhaps someday, I'll learn to live without missing you this much. But for now, I'm still learning how to let go of the girl I once imagined spending the rest of my life with.",
    "I love you, Tina. And a part of me will always cherish what we once had."
  ],
  "signature": "Always, with love."
};
let currentLetter = structuredClone(DEFAULT_LETTER);
const $ = (selector) => document.querySelector(selector);

function validLetter(data) {
  return Boolean(data && typeof data.greeting === 'string' && data.greeting.trim()
    && Array.isArray(data.paragraphs) && data.paragraphs.length > 0
    && data.paragraphs.every(p => typeof p === 'string' && p.trim())
    && typeof data.signature === 'string' && data.signature.trim());
}
function renderLetter(data) {
  $('#greeting').textContent = data.greeting;
  $('#signature').textContent = data.signature;
  $('#message').replaceChildren();
  data.paragraphs.forEach(text => {
    const p = document.createElement('p');
    p.textContent = text;
    $('#message').append(p);
  });
  if (typeof opened !== 'undefined' && opened && !$('#letter').hidden) {
    sizeSceneToLetter();
  }
}

// Local SVG artwork: each flower has individually animated petals.
const NS = 'http://www.w3.org/2000/svg';
function svgElement(tag, attrs, parent) {
  const node = document.createElementNS(NS, tag);
  Object.entries(attrs).forEach(([key, value]) => node.setAttribute(key, value));
  parent.append(node); return node;
}
const flowerPositions = [
  [115,225,31,'rose'],[165,145,37,'peach'],[230,95,29,'rose'],
  [300,72,38,'peach'],[373,102,32,'lilac'],[438,155,37,'rose'],
  [486,238,29,'peach'],[92,305,25,'lilac'],[510,315,25,'rose'],
  [144,350,22,'peach'],[455,361,22,'lilac']
];
flowerPositions.forEach(([x,y,r,color], index) => {
  const branch = svgElement('g', {class:'branch'}, $('#stems'));
  svgElement('path', {class:'stem',d:`M 300 425 Q ${x + (300-x)*.25} 335 ${x} ${y}`},branch);
  const lx = x+(300-x)*.3, ly=y+(425-y)*.55;
  svgElement('path',{class:'leaf',d:`M ${lx} ${ly} Q ${lx-61} ${ly-65} ${lx-57} ${ly-12} Q ${lx-29} ${ly+9} ${lx} ${ly}`},branch);
  svgElement('path',{class:'leaf',d:`M ${lx} ${ly+22} Q ${lx+65} ${ly-37} ${lx+54} ${ly+6} Q ${lx+29} ${ly+31} ${lx} ${ly+22}`},branch);
  const anchor = svgElement('g',{transform:`translate(${x} ${y})`},$('#flowers'));
  const head = svgElement('g',{class:'flower-head'},anchor);
  for(let layer=0;layer<2;layer++) {
    for(let p=0;p<7;p++) {
      const rotate=svgElement('g',{transform:`rotate(${p*360/7+layer*26+index*13})`},head);
      svgElement('ellipse',{class:'petal',cx:0,cy:-r*(layer ? .31:.46),rx:r*(layer ? .29:.4),ry:r*(layer ? .52:.68),fill:`url(#${color})`,stroke:'#fff5','stroke-width':.65},rotate);
    }
  }
  svgElement('circle',{r:r*.19,fill:'#e4b47b',stroke:'#fce3bb','stroke-width':2},head);
  for(let j=0;j<5;j++) svgElement('circle',{cx:Math.cos(j*1.26)*r*.11,cy:Math.sin(j*1.26)*r*.11,r:1.4,fill:'#fff0cc'},head);
});

const shapes = [
  '<path d="M16 29C11 24 1 17 2 10 3 2 13 1 16 8 20 1 29 2 30 10 31 17 21 25 16 29Z" fill="#c97698"/>',
  '<path d="M5 28C-5 6 11-4 28 4 33 20 18 34 5 28Z" fill="#d89ab6"/><path d="M5 28Q12 15 25 7" fill="none" stroke="#f9d9e5"/>',
  '<g fill="#d3a0be"><ellipse cx="16" cy="9" rx="5" ry="8"/><ellipse cx="16" cy="23" rx="5" ry="8"/><ellipse cx="9" cy="16" rx="8" ry="5"/><ellipse cx="23" cy="16" rx="8" ry="5"/></g><circle cx="16" cy="16" r="4" fill="#f6d3ac"/>'
];
for(let i=0;i<26;i++) {
  const el=document.createElement('span'); el.className='particle';
  el.style.cssText=`--x:${Math.random()*100}%;--size:${12+Math.random()*17}px;--duration:${18+Math.random()*22}s;--delay:${-Math.random()*40}s;--alpha:${.2+Math.random()*.23}`;
  el.innerHTML=`<svg viewBox="0 0 32 32">${shapes[i%3]}</svg>`; $('#falling').append(el);
}

// No external libraries required: Web Animations API powers all choreography.
const reduced = matchMedia('(prefers-reduced-motion: reduce)');
const openButton = $('#open');
const replayButton = $('#replay');
const motionButton = $('#motion');
const animatedElements = [
  '#world', '#envelope', '#flap', '#seal', '#prompt', '#bouquet', '#letter',
  '.branch', '.flower-head', '.petal'
];
let calm = reduced.matches;
let opened = false;
let finished = false;
let activeAnimations = [];

function animatePart(target, frames, duration, delay = 0, easing = 'ease-in-out') {
  const element = typeof target === 'string' ? $(target) : target;
  const animation = element.animate(frames, {duration, delay, easing, fill: 'both'});
  activeAnimations.push(animation);
  return animation;
}

function sizeSceneToLetter() {
  $('#scene').style.height = `${Math.max(440, $('#letter').offsetHeight + 85)}px`;
}

function finish() {
  if (finished) return;
  finished = true;
  $('#after').hidden = false;
  $('#status').textContent = 'Your flowers have bloomed. Your letter is open.';
  sizeSceneToLetter();
  $('#letter').focus({preventScroll: true});
}

function revealInstantly() {
  activeAnimations.forEach(animation => animation.cancel());
  activeAnimations = [];
  $('#envelope').style.opacity = '0';
  $('#envelope').style.transform = 'translateY(80px) rotate(0deg)';
  $('#prompt').style.opacity = '0';
  $('#seal').style.opacity = '0';
  $('#flap').style.transform = 'rotateX(180deg)';
  $('#world').style.transform = 'scale(1)';
  $('#bouquet').style.visibility = 'visible';
  $('#bouquet').style.opacity = '1';
  $('#letter').style.opacity = '1';
  $('#letter').style.transform = 'translateX(-50%) translateY(0) scale(1)';
  document.querySelectorAll('.branch').forEach(el => { el.style.transform = 'scaleY(1)'; });
  document.querySelectorAll('.flower-head, .petal').forEach(el => { el.style.transform = 'scale(1)'; });
  finish();
}

function updateMotion() {
  document.body.classList.toggle('paused', calm);
  motionButton.setAttribute('aria-pressed', String(calm));
  motionButton.innerHTML = calm
    ? 'Motion off <span aria-hidden="true">▷</span>'
    : 'Pause motion <span aria-hidden="true">Ⅱ</span>';
  if (calm && opened && !finished) revealInstantly();
}

function reset() {
  activeAnimations.forEach(animation => animation.cancel());
  activeAnimations = [];
  opened = false;
  finished = false;
  $('#letter').hidden = true;
  $('#after').hidden = true;
  openButton.hidden = false;
  openButton.disabled = false;
  openButton.setAttribute('aria-expanded', 'false');
  $('#scene').style.height = '';
  $('#status').textContent = '';
  document.querySelectorAll(animatedElements.join(',')).forEach(el => {
    el.removeAttribute('style');
  });
  $('#envelope').classList.add('floating');
  updateMotion();
}

function openLetter() {
  if (opened) return;
  opened = true;
  $('#envelope').classList.remove('floating');
  openButton.disabled = true;
  openButton.hidden = true;
  openButton.setAttribute('aria-expanded', 'true');
  $('#letter').hidden = false;
  sizeSceneToLetter();

  if (calm || !Element.prototype.animate) {
    revealInstantly();
    return;
  }

  // The envelope opens, the garden blooms, then the letter zooms into view.
  animatePart('#prompt', [{opacity: 1}, {opacity: 0}], 300);
  animatePart('#envelope', [
    {offset: 0,   transform: 'translateY(0) rotate(-5deg)', opacity: 1},
    {offset: .13, transform: 'translateY(0) rotate(0deg)', opacity: 1},
    {offset: .61, transform: 'translateY(0) rotate(0deg)', opacity: 1},
    {offset: .85, transform: 'translateY(80px) rotate(0deg)', opacity: 0},
    {offset: 1,   transform: 'translateY(80px) rotate(0deg)', opacity: 0}
  ], 4700);
  animatePart('#seal', [
    {transform: 'scale(1)', opacity: 1},
    {transform: 'scale(.8)', opacity: 0}
  ], 350, 150);
  animatePart('#flap', [
    {transform: 'rotateX(0deg)'},
    {transform: 'rotateX(180deg)'}
  ], 1000, 350);

  $('#bouquet').style.visibility = 'visible';
  animatePart('#bouquet', [{opacity: 0}, {opacity: 1}], 700, 1000);
  document.querySelectorAll('.branch').forEach((branch, i) => {
    branch.style.transformBox = 'fill-box';
    branch.style.transformOrigin = '50% 100%';
    animatePart(branch, [{transform: 'scaleY(0)'}, {transform: 'scaleY(1)'}], 1250, 1000 + i * 55);
  });
  document.querySelectorAll('.flower-head').forEach((flower, i) => {
    flower.style.transformBox = 'fill-box';
    flower.style.transformOrigin = '50% 50%';
    animatePart(flower, [{transform: 'scale(.05)'}, {transform: 'scale(1)'}], 1250, 1450 + i * 90, 'cubic-bezier(.18,.89,.32,1.28)');
  });
  document.querySelectorAll('.petal').forEach((petal, i) => {
    petal.style.transformBox = 'fill-box';
    petal.style.transformOrigin = '50% 80%';
    animatePart(petal, [{transform: 'scale(.15)'}, {transform: 'scale(1)'}], 1100, 1550 + i * 7, 'ease-out');
  });
  animatePart('#letter', [
    {opacity: 0, transform: 'translateX(-50%) translateY(135px) scale(.68) rotate(-3deg)'},
    {opacity: 1, transform: 'translateX(-50%) translateY(0) scale(1) rotate(0deg)'}
  ], 1600, 3100, 'cubic-bezier(.22,1,.36,1)');
  const finalAnimation = animatePart('#world', [
    {offset: 0,   transform: 'scale(1)'},
    {offset: .44, transform: 'scale(1.06)'},
    {offset: .66, transform: 'scale(1.06)'},
    {offset: 1,   transform: 'scale(1)'}
  ], 4800, 550);
  finalAnimation.onfinish = finish;
}

openButton.addEventListener('click', openLetter);
replayButton.addEventListener('click', () => {
  reset();
  openButton.focus({preventScroll: true});
});
motionButton.addEventListener('click', () => { calm = !calm; updateMotion(); });
if (typeof reduced.addEventListener === 'function') {
  reduced.addEventListener('change', e => { calm = e.matches; updateMotion(); });
}
reset();


// -------- GitHub Pages admin editor --------
// For a static GitHub Pages site we cannot safely embed a password.
// Use a short-lived, repository-scoped GitHub PAT entered only in this tab.
// The token is never written to HTML, localStorage, cookies or the repository.
const GITHUB_OWNER = 'JohnBOK1';
const GITHUB_REPO = 'Letter';
const GITHUB_BRANCH = 'main';
const LETTER_PATH = 'letter.json';
const githubFileUrl = `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${LETTER_PATH}`;
let adminToken = null;
let knownFileSha = null;
let isBusy = false;

async function loadPublishedLetter() {
  try {
    const response = await fetch(`./letter.json?fresh=${Date.now()}`, {cache: 'no-store'});
    if (!response.ok) return;
    const data = await response.json();
    if (!validLetter(data)) return;
    currentLetter = data;
    renderLetter(currentLetter);
  } catch (_) {
    // Opening index.html locally or offline still displays the default letter.
  }
}

function setFeedback(selector, text, kind = '') {
  const node = $(selector);
  node.textContent = text;
  node.className = `form-feedback ${kind}`.trim();
}
function openDialog(id, focusSelector) {
  $(id).hidden = false;
  document.body.classList.add('dialog-open');
  $(focusSelector).focus();
}
function closeDialog(id) {
  if (isBusy) return;
  $(id).hidden = true;
  if ($('#login-overlay').hidden && $('#editor-overlay').hidden) {
    document.body.classList.remove('dialog-open');
  }
}
function showEditor() {
  if (!adminToken) return;
  $('#edit-greeting').value = currentLetter.greeting;
  $('#edit-message').value = currentLetter.paragraphs.join('\n\n');
  $('#edit-signature').value = currentLetter.signature;
  setFeedback('#editor-feedback', '');
  openDialog('#editor-overlay', '#edit-greeting');
}
function readDraft() {
  const draft = {
    greeting: $('#edit-greeting').value.trim(),
    paragraphs: $('#edit-message').value.split(/\n\s*\n/).map(p => p.trim()).filter(Boolean),
    signature: $('#edit-signature').value.trim()
  };
  if (!validLetter(draft)) throw new Error('Please add a greeting, at least one paragraph and a signature.');
  return draft;
}
function setBusy(busy) {
  isBusy = busy;
  $('#login-submit').disabled = busy;
  $('#publish-letter').disabled = busy;
  $('#preview-letter').disabled = busy;
  $('#close-login').disabled = busy;
  $('#close-editor').disabled = busy;
}
async function githubRequest(url, options = {}) {
  if (!adminToken) throw new Error('Please sign in again.');
  const response = await fetch(url, {
    ...options,
    headers: {
      Accept: 'application/vnd.github+json',
      Authorization: `Bearer ${adminToken}`,
      'X-GitHub-Api-Version': '2022-11-28',
      ...(options.headers || {})
    },
    cache: 'no-store'
  });
  if (!response.ok) {
    if (response.status === 404 && options.allowMissing) return null;
    const body = await response.json().catch(() => ({}));
    let message = body.message || `GitHub request failed (${response.status}).`;
    if (response.status === 401) message = 'Invalid or expired token. Create a new token and try again.';
    if (response.status === 403) message = 'Access denied. Check that your token allows Contents: Read and write for the Letter repository.';
    if (response.status === 409) message = 'The repository changed while saving. Reload the editor and try again.';
    throw new Error(message);
  }
  return response.json();
}
async function readGithubFile() {
  return githubRequest(`${githubFileUrl}?ref=${encodeURIComponent(GITHUB_BRANCH)}&nocache=${Date.now()}`, {allowMissing: true});
}
function base64EncodeUnicode(text) {
  const bytes = new TextEncoder().encode(text);
  let binary = '';
  for (let i = 0; i < bytes.length; i += 8192) {
    binary += String.fromCharCode(...bytes.subarray(i, i + 8192));
  }
  return btoa(binary);
}
function base64DecodeUnicode(text) {
  const binary = atob(text.replace(/\s/g, ''));
  const bytes = Uint8Array.from(binary, ch => ch.charCodeAt(0));
  return new TextDecoder().decode(bytes);
}

$('#admin-login').addEventListener('click', () => openDialog('#login-overlay', '#github-token'));
$('#close-login').addEventListener('click', () => closeDialog('#login-overlay'));
$('#admin-edit').addEventListener('click', showEditor);
$('#close-editor').addEventListener('click', () => closeDialog('#editor-overlay'));
$('#admin-logout').addEventListener('click', () => {
  if (isBusy) return;
  adminToken = null;
  knownFileSha = null;
  $('#github-token').value = '';
  $('#admin-login').hidden = false;
  $('#admin-edit').hidden = true;
  $('#admin-logout').hidden = true;
  closeDialog('#editor-overlay');
  setFeedback('#login-feedback', '');
});
for (const id of ['#login-overlay', '#editor-overlay']) {
  $(id).addEventListener('click', event => {
    if (event.target === $(id)) closeDialog(id);
  });
}
document.addEventListener('keydown', event => {
  if (event.key !== 'Escape') return;
  if (!$('#editor-overlay').hidden) closeDialog('#editor-overlay');
  else if (!$('#login-overlay').hidden) closeDialog('#login-overlay');
});

$('#login-form').addEventListener('submit', async event => {
  event.preventDefault();
  const token = $('#github-token').value.trim();
  if (!token) return;
  adminToken = token;
  setBusy(true);
  setFeedback('#login-feedback', 'Checking GitHub account…');
  try {
    const user = await githubRequest('https://api.github.com/user');
    if (user.login?.toLowerCase() !== GITHUB_OWNER.toLowerCase()) {
      throw new Error('This editor only accepts the GitHub account JohnBOK1.');
    }
    const file = await readGithubFile();
    knownFileSha = file?.sha || null;
    // Use the current repository content, even if Pages has not yet refreshed.
    if (file?.content && file.encoding === 'base64') {
      const data = JSON.parse(base64DecodeUnicode(file.content));
      if (validLetter(data)) {
        currentLetter = data;
        renderLetter(currentLetter);
      }
    }
    $('#github-token').value = '';
    $('#admin-login').hidden = true;
    $('#admin-edit').hidden = false;
    $('#admin-logout').hidden = false;
    setFeedback('#login-feedback', '');
    setBusy(false);
    closeDialog('#login-overlay');
    showEditor();
  } catch (error) {
    adminToken = null;
    knownFileSha = null;
    setFeedback('#login-feedback', error.message || 'Could not sign in.', 'error');
    setBusy(false);
  }
});

$('#preview-letter').addEventListener('click', () => {
  try {
    const draft = readDraft();
    renderLetter(draft);
    setFeedback('#editor-feedback', 'Preview ready! Close the editor to view the letter. It is not published yet.', 'success');
  } catch (error) {
    setFeedback('#editor-feedback', error.message, 'error');
  }
});

$('#editor-form').addEventListener('submit', async event => {
  event.preventDefault();
  let draft;
  try { draft = readDraft(); }
  catch (error) { setFeedback('#editor-feedback', error.message, 'error'); return; }
  setBusy(true);
  setFeedback('#editor-feedback', 'Saving your letter to GitHub…');
  try {
    const latest = await readGithubFile();
    const latestSha = latest?.sha || null;
    if (latestSha !== knownFileSha) {
      throw new Error('The letter changed on GitHub since you signed in. Log out, sign in again, and review the latest version before saving.');
    }
    const payload = {
      message: 'Update Bloom Letter through online editor',
      branch: GITHUB_BRANCH,
      content: base64EncodeUnicode(JSON.stringify(draft, null, 2) + '\n')
    };
    if (latestSha) payload.sha = latestSha;
    const result = await githubRequest(githubFileUrl, {
      method: 'PUT',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(payload)
    });
    knownFileSha = result.content?.sha || null;
    currentLetter = draft;
    renderLetter(currentLetter);
    setFeedback('#editor-feedback', 'Published to GitHub! Your public site will show the new letter after GitHub Pages deploys.', 'success');
  } catch (error) {
    setFeedback('#editor-feedback', error.message || 'Unable to publish the letter.', 'error');
  } finally {
    setBusy(false);
  }
});

// Visitors see the saved copy. The editor is only needed by the owner.
renderLetter(currentLetter);
loadPublishedLetter();
