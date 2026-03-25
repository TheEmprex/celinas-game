/* =====================================================
   CELINA'S PUZZLE GARDEN  —  Made with love by Maxime
   ===================================================== */

// ============== PUSH NOTIFICATIONS (ntfy.sh) ==============
// Two separate topics — Maxime gets gameplay updates, Celina gets new puzzle alerts
const NTFY_MAXIME = 'celinas-puzzle-maxime';
const NTFY_CELINA = 'celinas-puzzle-celina';

function initEmail() { /* no setup needed for ntfy */ }

function sendToMaxime(subject, message) {
  try {
    fetch(`https://ntfy.sh/${NTFY_MAXIME}`, {
      method: 'POST',
      headers: { 'Title': subject, 'Priority': '4', 'Tags': 'heart,puzzle_piece' },
      body: message
    }).catch(() => {});
  } catch (e) {}
}

function sendToCelina(subject, message) {
  try {
    fetch(`https://ntfy.sh/${NTFY_CELINA}`, {
      method: 'POST',
      headers: { 'Title': subject, 'Priority': '4', 'Tags': 'sparkling_heart,jigsaw' },
      body: message
    }).catch(() => {});
  } catch (e) {}
}

// Keep old name as alias for backward compat
function sendNotification(subject, message) { sendToMaxime(subject, message); }

function notifyPuzzleComplete(weekNum, puzzleName, timeStr) {
  sendToMaxime(
    `Celina completed Week ${weekNum}: ${puzzleName}!`,
    `Hey Maxime!\n\nCelina just completed Week ${weekNum} (${puzzleName}) in ${timeStr}.\n\n` +
    `${state.puzzles.filter(p => p.done).length}/4 puzzles completed so far.\n\n` +
    `— Ella the cat`
  );
}

function notifyGiftsChosen() {
  let msg;
  if(state.giftPath==='necklace'){
    msg='\uD83D\uDC8E Diamond Necklace\n\nShe wants you to pick a diamond necklace for her!';
  }else if(state.giftPath==='luxury'){
    const g=GIFTS[state.selectedGifts[0]];
    msg=`\u2728 One Luxury Pick\n\n- ${g.name} (${g.brand}) \u2014 $${g.p}${g.d?'\n  '+g.d:''}`;
  }else{
    const lines=state.selectedGifts.map(i=>`- ${GIFTS[i].name} (${GIFTS[i].brand}) \u2014 $${GIFTS[i].p}`).join('\n');
    const total=state.selectedGifts.reduce((s,i)=>s+GIFTS[i].p,0);
    msg=`\uD83C\uDF81 3 Little Treats\n\n${lines}\n\nTotal: $${total}`;
  }
  sendToMaxime(
    'Celina chose her reward!',
    `Hey Maxime!\n\nCelina finished all 4 puzzles and chose:\n\n${msg}\n\n\u2014 Ella the cat`
  );
}

// ============== PUZZLE DATA ==============
const PUZZLES = [
  { // Week 1 — Killer Sudoku (1 given, 39 cages covering all 81 cells)
    name:"Rose Garden", week:1, type:"Killer + Thermo + Palindrome",
    desc:"Killer cages, thermometers, palindrome lines & renban lines combined!",
    reward:"You bloomed through the first garden, my love!",
    emoji:"\uD83C\uDF39",
    solution:[
      [5,3,4,6,7,8,9,1,2],[6,7,2,1,9,5,3,4,8],[1,9,8,3,4,2,5,6,7],
      [8,5,9,7,6,1,4,2,3],[4,2,6,8,5,3,7,9,1],[7,1,3,9,2,4,8,5,6],
      [9,6,1,5,3,7,2,8,4],[2,8,7,4,1,9,6,3,5],[3,4,5,2,8,6,1,7,9]],
    givens:[
      [0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0],[0,0,0,0,5,0,0,0,0],[0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0]],
    cages:[
      {c:[[0,0],[0,1],[1,0]],s:14},{c:[[0,2],[0,3]],s:10},{c:[[0,4],[0,5]],s:15},
      {c:[[0,6],[0,7]],s:10},{c:[[0,8],[1,8]],s:10},
      {c:[[1,1],[1,2]],s:9},{c:[[1,3],[1,4]],s:10},{c:[[1,5],[1,6]],s:8},
      {c:[[1,7],[2,7]],s:10},
      {c:[[2,0],[2,1]],s:10},{c:[[2,2],[2,3]],s:11},{c:[[2,4],[2,5]],s:6},
      {c:[[2,6],[3,6]],s:9},{c:[[2,8],[3,8]],s:10},
      {c:[[3,0],[3,1]],s:13},{c:[[3,2],[3,3]],s:16},{c:[[3,4],[3,5]],s:7},
      {c:[[3,7],[4,7]],s:11},{c:[[4,0],[4,1]],s:6},{c:[[4,2],[4,3]],s:14},
      {c:[[4,4],[4,5]],s:8},{c:[[4,6],[5,6]],s:15},{c:[[4,8],[5,8]],s:7},
      {c:[[5,0],[5,1]],s:8},{c:[[5,2],[5,3]],s:12},{c:[[5,4],[5,5]],s:6},
      {c:[[5,7],[6,7]],s:13},
      {c:[[6,0],[6,1]],s:15},{c:[[6,2],[6,3]],s:6},{c:[[6,4],[6,5]],s:10},
      {c:[[6,6],[7,6]],s:8},{c:[[6,8],[7,8]],s:9},
      {c:[[7,0],[7,1]],s:10},{c:[[7,2],[7,3]],s:11},{c:[[7,4],[7,5]],s:10},
      {c:[[7,7],[8,7]],s:10},
      {c:[[8,0],[8,1]],s:7},{c:[[8,2],[8,3]],s:7},{c:[[8,4],[8,5]],s:14},
      {c:[[8,6],[8,8]],s:10}],
    thermos:[[[0,1],[0,2],[0,3],[0,4],[0,5]],[[0,7],[1,7],[2,7],[2,8],[1,8]],
      [[6,2],[5,2],[4,2],[3,2]],[[1,3],[2,3],[2,4],[3,4],[3,3]]],
    arrows:[], whispers:[], kropki:[],
    palindromes:[[[1,1],[2,1],[2,2],[3,2],[3,3]],[[5,0],[5,1],[5,2],[6,2],[7,2]]],
    renbans:[[[0,0],[0,1],[0,2],[1,2],[1,3]],[[0,0],[1,0],[1,1],[2,1],[2,2]]]
  },
  { // Week 2 — German Whisper (0 givens, 8 whisper lines + 11 killer cages)
    name:"Pink Sunrise", week:2, type:"Whisper + Anti-Knight/King",
    desc:"German whispers, renban lines, plus anti-knight & anti-king constraints!",
    reward:"The sunrise was even prettier with you solving it!",
    emoji:"\uD83C\uDF05",
    solution:[
      [6,1,8,3,9,2,7,4,5],[3,9,2,7,4,5,6,1,8],[7,4,5,6,1,8,3,9,2],
      [1,8,3,9,2,7,4,5,6],[9,2,7,4,5,6,1,8,3],[4,5,6,1,8,3,9,2,7],
      [8,3,9,2,7,4,5,6,1],[2,7,4,5,6,1,8,3,9],[5,6,1,8,3,9,2,7,4]],
    givens:[
      [0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0]],
    cages:[
      {c:[[0,7],[0,8]],s:9},{c:[[1,0],[1,1],[2,0],[2,1]],s:23},
      {c:[[1,2],[1,3],[2,2]],s:14},{c:[[1,4],[1,5]],s:9},
      {c:[[3,6],[3,7],[3,8]],s:15},{c:[[4,1],[4,2],[5,1]],s:14},
      {c:[[4,3],[4,4]],s:9},{c:[[6,5],[6,6]],s:9},
      {c:[[7,1],[7,2],[7,3]],s:16},{c:[[7,0],[8,0]],s:7},
      {c:[[7,8],[8,8]],s:13}],
    thermos:[], arrows:[],
    whispers:[
      [[0,0],[0,1],[0,2],[0,3],[0,4],[0,5],[0,6]],
      [[1,6],[1,7],[1,8],[2,8],[2,7],[2,6],[2,5],[2,4],[2,3]],
      [[5,0],[4,0],[3,0],[3,1],[3,2],[3,3],[3,4],[3,5]],
      [[5,2],[5,3],[5,4],[5,5],[5,6],[5,7],[5,8]],
      [[7,0],[6,0],[6,1],[6,2],[6,3],[6,4]],
      [[7,4],[7,5],[7,6],[7,7],[7,8],[6,8],[6,7]],
      [[8,1],[8,2],[8,3],[8,4],[8,5],[8,6],[8,7]],
      [[4,5],[4,6],[4,7],[4,8]]],
    kropki:[],
    renbans:[[[0,0],[1,0],[2,0],[2,1],[2,2]],[[0,3],[1,3],[1,4],[1,5],[1,6]],
      [[0,6],[1,6],[2,6],[3,6],[3,7]]],
    knights:true, kings:true
  },
  { // Week 3 — Kropki (0 givens, 40 dots with negative constraint)
    name:"Starlight", week:3, type:"Kropki + Palindrome + Thermo",
    desc:"Kropki dots with negative constraint, palindrome lines & thermometers!",
    reward:"You shone brighter than every star, princess!",
    emoji:"\u2B50",
    solution:[
      [8,2,7,1,5,4,3,9,6],[9,6,5,3,2,7,1,4,8],[3,4,1,6,8,9,7,5,2],
      [5,9,3,4,6,8,2,7,1],[4,7,2,5,1,3,6,8,9],[6,1,8,9,7,2,4,3,5],
      [7,8,6,2,3,5,9,1,4],[1,5,4,7,9,6,8,2,3],[2,3,9,8,4,1,5,6,7]],
    givens:[
      [0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0]],
    cages:[],
    thermos:[[[0,3],[1,3],[2,3],[2,4],[2,5]],[[1,6],[1,7],[2,7],[3,7],[4,7]]],
    arrows:[], whispers:[],
    kropki:[
      {c:[[0,4],[0,5]],t:"w"},{c:[[0,5],[0,6]],t:"w"},{c:[[1,1],[1,2]],t:"w"},
      {c:[[1,3],[1,4]],t:"w"},{c:[[1,7],[1,8]],t:"b"},{c:[[2,0],[2,1]],t:"w"},
      {c:[[2,4],[2,5]],t:"w"},{c:[[3,2],[3,3]],t:"w"},{c:[[4,5],[4,6]],t:"b"},
      {c:[[4,7],[4,8]],t:"w"},{c:[[5,2],[5,3]],t:"w"},{c:[[5,5],[5,6]],t:"b"},
      {c:[[5,6],[5,7]],t:"w"},{c:[[6,0],[6,1]],t:"w"},{c:[[6,3],[6,4]],t:"w"},
      {c:[[7,1],[7,2]],t:"w"},{c:[[7,7],[7,8]],t:"w"},{c:[[8,0],[8,1]],t:"w"},
      {c:[[8,2],[8,3]],t:"w"},{c:[[8,3],[8,4]],t:"b"},{c:[[8,6],[8,7]],t:"w"},
      {c:[[8,7],[8,8]],t:"w"},
      {c:[[0,0],[1,0]],t:"w"},{c:[[1,3],[2,3]],t:"b"},{c:[[1,7],[2,7]],t:"w"},
      {c:[[2,5],[3,5]],t:"w"},{c:[[2,8],[3,8]],t:"b"},{c:[[3,0],[4,0]],t:"w"},
      {c:[[3,2],[4,2]],t:"w"},{c:[[3,3],[4,3]],t:"w"},{c:[[3,7],[4,7]],t:"w"},
      {c:[[4,5],[5,5]],t:"w"},{c:[[5,0],[6,0]],t:"w"},{c:[[5,8],[6,8]],t:"w"},
      {c:[[6,5],[7,5]],t:"w"},{c:[[6,6],[7,6]],t:"w"},{c:[[6,7],[7,7]],t:"b"},
      {c:[[6,8],[7,8]],t:"w"},{c:[[7,0],[8,0]],t:"b"},{c:[[7,3],[8,3]],t:"w"}],
    palindromes:[[[1,4],[1,5],[1,6],[2,6],[3,6]],[[1,4],[2,4],[2,5],[3,5],[3,6]],
      [[1,6],[2,6],[2,7],[3,7],[3,8]]]
  },
  { // Week 4 — Mixed Variant (0 givens, thermos + killer cages + arrows)
    name:"Eternal Love", week:4, type:"Grand Artisanal Mix",
    desc:"Killer cages, thermos, arrows, palindromes, renbans & Dutch whispers \u2014 all combined! The ultimate challenge.",
    reward:"You conquered them all! You're unstoppable, my queen! Choose your gifts!",
    emoji:"\uD83D\uDC8E",
    solution:[
      [7,8,9,1,2,3,4,5,6],[4,5,6,7,8,9,1,2,3],[1,2,3,4,5,6,7,8,9],
      [2,1,4,3,6,5,8,9,7],[3,6,5,8,9,7,2,1,4],[8,9,7,2,1,4,3,6,5],
      [5,3,1,6,4,2,9,7,8],[6,4,2,9,7,8,5,3,1],[9,7,8,5,3,1,6,4,2]],
    givens:[
      [0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0]],
    cages:[
      {c:[[3,0],[3,1]],s:3},{c:[[3,2],[3,3]],s:7},{c:[[3,4],[3,5]],s:11},
      {c:[[3,6],[3,7],[3,8]],s:24},{c:[[4,0],[4,1]],s:9},{c:[[4,2],[4,3]],s:13},
      {c:[[4,4],[4,5]],s:16},{c:[[4,6],[4,7],[4,8]],s:7},
      {c:[[5,0],[5,1]],s:17},{c:[[5,2],[5,3]],s:9},{c:[[5,4],[5,5]],s:5},
      {c:[[5,6],[5,7],[5,8]],s:14},
      {c:[[6,3],[6,4]],s:10},{c:[[6,5],[6,6]],s:11},{c:[[6,7],[6,8]],s:15},
      {c:[[7,3],[7,4]],s:16},{c:[[7,5],[7,6]],s:13},{c:[[7,7],[7,8]],s:4},
      {c:[[8,3],[8,4]],s:8},{c:[[8,5],[8,6]],s:7},{c:[[8,7],[8,8]],s:6}],
    thermos:[
      [[0,0],[0,1],[0,2]],[[0,3],[0,4],[0,5]],[[0,6],[0,7],[0,8]],
      [[1,0],[1,1],[1,2]],[[1,3],[1,4],[1,5]],[[1,6],[1,7],[1,8]],
      [[2,0],[2,1],[2,2]],[[2,3],[2,4],[2,5]],[[2,6],[2,7],[2,8]],
      [[6,0],[7,0],[8,0]],[[6,1],[7,1],[8,1]],[[6,2],[7,2],[8,2]],
      [[8,4],[8,3]]],
    arrows:[
      {o:[1,3],a:[[2,3],[3,3]]},{o:[4,4],a:[[3,4],[3,3]]},
      {o:[0,2],a:[[1,2],[2,2]]},{o:[6,6],a:[[5,6],[5,7]]},
      {o:[5,0],a:[[6,0],[6,1]]}],
    whispers:[], kropki:[],
    palindromes:[[[1,0],[2,0],[2,1],[3,1],[3,2]],[[1,2],[2,2],[2,3],[3,3],[3,4]],
      [[1,4],[2,4],[2,5],[3,5],[3,6]]],
    renbans:[[[0,0],[0,1],[0,2],[1,2],[1,1]],[[0,1],[1,1],[1,2],[1,3],[2,3]]],
    dutchWhispers:[[[3,3],[4,3],[5,3],[6,3],[6,2],[5,2]],
      [[5,6],[6,6],[6,5],[7,5],[8,5],[8,6]]]
  }
];

// ============== GIFT DATA ==============
const GIFTS=[
  {cat:"Make up",name:"Setting Spray",brand:"One/Size",p:18},
  {cat:"Skincare",name:"PDRN Pink Collagen Face Masks",brand:"Medicube",p:20},
  {cat:"Skincare",name:"Rice Jelly Cleanser",brand:"De:maf",p:20},
  {cat:"Clothing",name:"Panties",brand:"Victoria's Secret",d:"S \u2022 black, pink, red",p:35},
  {cat:"Skincare",name:"Clinique Toner",brand:"Clinique",p:37},
  {cat:"Make up",name:"Powder Blush (Candy)",brand:"Dior",p:42},
  {cat:"Make up",name:"Lip Glow Oil",brand:"Dior",d:"Rose candy or Spicy",p:42},
  {cat:"Clothing",name:"White Skirt",brand:"Oh Polly",d:"S \u2022 White",p:50},
  {cat:"Jewelry",name:"Multi Color Bangle",brand:"Kate Spade",p:54},
  {cat:"Clothing",name:"Sweat Pants",brand:"Garage",d:"S \u2022 Teal, black, or spring grey",p:65},
  {cat:"Clothing",name:"Cream Top",brand:"Lioness",d:"S",p:69},
  {cat:"Clothing",name:"White Pants",brand:"Tiger Mist",d:"XXS/XS \u2022 Cream",p:75},
  {cat:"Jewelry",name:"Rainbow Bangle",brand:"Kate Spade",p:80},
  {cat:"Clothing",name:"Pajamas",brand:"Victoria's Secret",d:"S \u2022 Light pink / black",p:80},
  {cat:"Jewelry",name:"Emerald Bangle",brand:"Kate Spade",p:80},
  {cat:"Clothing",name:"Linen Pants",brand:"SNDYS",d:"S \u2022 black or white",p:93},
  {cat:"Clothing",name:"Turquoise Flowers Dress",brand:"Capittana",d:"xs/s",p:105},
  {cat:"Jewelry",name:"Bamboo Bangle",brand:"Anabel Aram",p:120},
  {cat:"Clothing",name:"Fishtail Polka Dot Dress",brand:"Oh Polly",d:"Size 2 \u2022 Pink Polka Dot",p:135},
  {cat:"Clothing",name:"Pink Tweed Blazer & Skirt",brand:"Revolve",d:"xs \u2022 Pink",p:156},
  {cat:"Clothing",name:"Bandage Top",brand:"House of CB",d:"S \u2022 Wine",p:159},
  {cat:"Jewelry",name:"Idylla Ring",brand:"Swarovski",d:"Size 50/52",p:189},
  {cat:"Jewelry",name:"Idylla Y Pendant",brand:"Swarovski",p:260},
  {cat:"Clothing",name:"Beaded Bikini Set",brand:"Bydee",d:"Top L, Bottom S \u2022 Florita",p:238},
  {cat:"Clothing",name:"Pink Silk Blouse",brand:"Alice + Olivia",d:"S \u2022 English Rose",p:350},
  {cat:"Clothing",name:"Mermaid Dress",brand:"Alice + Olivia",d:"Size 2",p:417},
  {cat:"Jewelry",name:"Gold Bangle",brand:"Adriana Orsini",p:475},
  {cat:"Handbags",name:"Swan Tote Bag & Wallet",brand:"Brahmin",d:"Odette Ombre Melbourne",p:490},
  {cat:"Accessories",name:"Dior Mirror Bag Charm",brand:"Dior",d:"Pink",p:550},
  {cat:"Clothing",name:"Maxi Dress",brand:"Loveshackfancy",d:"Size 2 \u2022 Black or white",p:516},
  {cat:"Clothing",name:"Sunset Glow Dress",brand:"La Fuori",d:"S",p:575},
  {cat:"Clothing",name:"Pink Metallic Dress",brand:"Self-Portrait",d:"Size 2",p:750},
  {cat:"Clothing",name:"Embroidered Dress",brand:"La Fuori",d:"S",p:793},
  {cat:"Clothing",name:"Pink Polka Dot Lace Dress",brand:"Loveshackfancy",d:"Size 2 \u2022 Pink",p:875},
  {cat:"Clothing",name:"Pink Blazer & Pants Set",brand:"Alice + Olivia",d:"Size 2 \u2022 English Rose",p:880},
  {cat:"Accessories",name:"Dior Icon Bag Charm",brand:"Dior",d:"Pink",p:950},
  {cat:"Clothing",name:"Gold Top & Skirt Set",brand:"Revolve",d:"Size 2",p:1120},
  {cat:"Clothing",name:"Embroidered Mini Dress",brand:"Alice + Olivia",d:"Size 2",p:1195}
];
const SMALL_MAX=120;
const LUXURY_MAX=500;
const PARTY_COLORS=['#e91e63','#FFD700','#FF69B4','#ff6b9d','#f8bbd0','#ce93d8','#fff','#9C27B0','#64b5f6','#ffb74d','#ff4081','#ffeb3b','#81c784'];

const GIFT_PATHS=[
  {id:'necklace',name:'Diamond Necklace',emoji:'\uD83D\uDC8E',desc:'Maxime picks a diamond necklace just for you'},
  {id:'luxury',name:'One Luxury Pick',emoji:'\u2728',desc:'Choose one special item'},
  {id:'treats',name:'3 Little Treats',emoji:'\uD83C\uDF81',desc:'Pick 3 cute things you love'}
];

const RULES_HTML = {
  "Killer + Thermo + Palindrome": `
    <p class="rule-heading">Constraint Types</p>
    <ul>
    <li>Normal sudoku rules apply (1\u20139 in each row, column and 3\u00d73 box).</li>
    <li><svg viewBox="0 0 28 14" width="28" height="14" style="vertical-align:middle;margin-right:4px"><rect x="1" y="1" width="26" height="12" rx="2" fill="none" stroke="#777" stroke-width="1.5" stroke-dasharray="4 2.5"/><text x="4" y="10" fill="#E65100" font-size="8" font-weight="800">12</text></svg> <strong style="color:#E65100">Killer cages</strong> \u2014 digits in a cage sum to the clue number. No repeats within a cage.</li>
    <li><svg viewBox="0 0 40 14" width="40" height="14" style="vertical-align:middle;margin-right:4px"><circle cx="7" cy="7" r="5" fill="#B0BEC5" opacity=".65"/><line x1="12" y1="7" x2="35" y2="7" stroke="#B0BEC5" stroke-width="3" stroke-linecap="round" opacity=".7"/></svg> <strong style="color:#B0BEC5">Thermometers</strong> \u2014 digits strictly increase from the round bulb toward the tip.</li>
    <li><svg viewBox="0 0 40 14" width="40" height="14" style="vertical-align:middle;margin-right:4px"><line x1="4" y1="7" x2="36" y2="7" stroke="#EC407A" stroke-width="3" stroke-linecap="round" opacity=".5"/></svg> <strong style="color:#EC407A">Palindrome lines</strong> \u2014 the sequence of digits reads the same forwards and backwards.</li>
    <li><svg viewBox="0 0 40 14" width="40" height="14" style="vertical-align:middle;margin-right:4px"><line x1="4" y1="7" x2="36" y2="7" stroke="#7B1FA2" stroke-width="3" stroke-linecap="round" opacity=".55"/></svg> <strong style="color:#7B1FA2">Renban lines</strong> \u2014 cells contain a set of consecutive digits in any order (e.g. {3,4,5,6}).</li>
    </ul>
    <div class="rule-note">Tip: On a renban line of length 5, the digits form a run like {3,4,5,6,7} but can appear in any order along the line.</div>`,
  "Whisper + Anti-Knight/King": `
    <p class="rule-heading">Constraint Types</p>
    <ul>
    <li>Normal sudoku rules apply (1\u20139 in each row, column and 3\u00d73 box).</li>
    <li><svg viewBox="0 0 40 14" width="40" height="14" style="vertical-align:middle;margin-right:4px"><line x1="4" y1="12" x2="13" y2="2" stroke="#43A047" stroke-width="3" stroke-linecap="round" opacity=".5"/><line x1="13" y1="2" x2="22" y2="12" stroke="#43A047" stroke-width="3" stroke-linecap="round" opacity=".5"/><line x1="22" y1="12" x2="36" y2="2" stroke="#43A047" stroke-width="3" stroke-linecap="round" opacity=".5"/></svg> <strong style="color:#43A047">German Whisper lines</strong> \u2014 adjacent digits on the line must differ by at least 5.</li>
    <li><svg viewBox="0 0 28 14" width="28" height="14" style="vertical-align:middle;margin-right:4px"><rect x="1" y="1" width="26" height="12" rx="2" fill="none" stroke="#777" stroke-width="1.5" stroke-dasharray="4 2.5"/><text x="4" y="10" fill="#E65100" font-size="8" font-weight="800">8</text></svg> <strong style="color:#E65100">Killer cages</strong> \u2014 digits sum to the clue. No repeats in a cage.</li>
    <li><svg viewBox="0 0 40 14" width="40" height="14" style="vertical-align:middle;margin-right:4px"><line x1="4" y1="7" x2="36" y2="7" stroke="#7B1FA2" stroke-width="3" stroke-linecap="round" opacity=".55"/></svg> <strong style="color:#7B1FA2">Renban lines</strong> \u2014 cells contain consecutive digits in any order.</li>
    <li><svg viewBox="0 0 20 14" width="20" height="14" style="vertical-align:middle;margin-right:4px"><text x="2" y="12" fill="#42A5F5" font-size="13" font-weight="800">\u265E</text></svg> <strong style="color:#42A5F5">Anti-Knight</strong> \u2014 cells a chess knight\u2019s move apart cannot contain the same digit.</li>
    <li><svg viewBox="0 0 20 14" width="20" height="14" style="vertical-align:middle;margin-right:4px"><text x="2" y="12" fill="#E91E63" font-size="13" font-weight="800">\u265A</text></svg> <strong style="color:#E91E63">Anti-King</strong> \u2014 cells diagonally adjacent cannot contain the same digit.</li>
    </ul>
    <div class="rule-note">Tip: Only digits 1\u20134 and 6\u20139 can appear on whisper lines (5 is never on a green line). Anti-knight and anti-king constraints are global \u2014 they apply to every cell!</div>`,
  "Kropki + Palindrome + Thermo": `
    <p class="rule-heading">Constraint Types</p>
    <ul>
    <li>Normal sudoku rules apply (1\u20139 in each row, column and 3\u00d73 box).</li>
    <li><svg viewBox="0 0 28 14" width="28" height="14" style="vertical-align:middle;margin-right:4px"><circle cx="14" cy="7" r="5" fill="#fff" stroke="#333" stroke-width="1.5"/></svg> <strong>White dot</strong> \u25CB \u2014 the two cells differ by exactly 1.</li>
    <li><svg viewBox="0 0 28 14" width="28" height="14" style="vertical-align:middle;margin-right:4px"><circle cx="14" cy="7" r="5" fill="#222" stroke="#333" stroke-width="1.5"/></svg> <strong>Black dot</strong> \u25CF \u2014 one cell is exactly double the other.</li>
    <li><strong>No dot</strong> \u2014 if no dot is shown between two adjacent cells, neither condition holds. <em>This is a clue!</em></li>
    <li><svg viewBox="0 0 40 14" width="40" height="14" style="vertical-align:middle;margin-right:4px"><line x1="4" y1="7" x2="36" y2="7" stroke="#EC407A" stroke-width="3" stroke-linecap="round" opacity=".5"/></svg> <strong style="color:#EC407A">Palindrome lines</strong> \u2014 the sequence of digits reads the same forwards and backwards.</li>
    <li><svg viewBox="0 0 40 14" width="40" height="14" style="vertical-align:middle;margin-right:4px"><circle cx="7" cy="7" r="5" fill="#B0BEC5" opacity=".65"/><line x1="12" y1="7" x2="35" y2="7" stroke="#B0BEC5" stroke-width="3" stroke-linecap="round" opacity=".7"/></svg> <strong style="color:#B0BEC5">Thermometers</strong> \u2014 digits strictly increase from the round bulb toward the tip.</li>
    </ul>
    <div class="rule-note">Tip: The pair (1,2) satisfies both a white dot (differ by 1) and a black dot (2=2\u00d71). All dots are shown \u2014 if a dot is missing between two cells, that\u2019s important information!</div>`,
  "Grand Artisanal Mix": `
    <p class="rule-heading">Constraint Types</p>
    <ul>
    <li>Normal sudoku rules apply (1\u20139 in each row, column and 3\u00d73 box).</li>
    <li><svg viewBox="0 0 28 14" width="28" height="14" style="vertical-align:middle;margin-right:4px"><rect x="1" y="1" width="26" height="12" rx="2" fill="none" stroke="#777" stroke-width="1.5" stroke-dasharray="4 2.5"/><text x="4" y="10" fill="#E65100" font-size="8" font-weight="800">15</text></svg> <strong style="color:#E65100">Killer cages</strong> \u2014 digits sum to the clue. No repeats in a cage.</li>
    <li><svg viewBox="0 0 40 14" width="40" height="14" style="vertical-align:middle;margin-right:4px"><circle cx="7" cy="7" r="5" fill="#B0BEC5" opacity=".65"/><line x1="12" y1="7" x2="35" y2="7" stroke="#B0BEC5" stroke-width="3" stroke-linecap="round" opacity=".7"/></svg> <strong style="color:#B0BEC5">Thermometers</strong> \u2014 digits strictly increase from the round bulb toward the tip.</li>
    <li><svg viewBox="0 0 40 14" width="40" height="14" style="vertical-align:middle;margin-right:4px"><circle cx="7" cy="7" r="7" fill="none" stroke="#3949AB" stroke-width="1.5" opacity=".8"/><line x1="14" y1="7" x2="36" y2="7" stroke="#3949AB" stroke-width="2" stroke-linecap="round" opacity=".8"/><polygon points="36,7 31,4 31,10" fill="#3949AB" opacity=".8"/></svg> <strong style="color:#3949AB">Sum arrows</strong> \u2014 the circled digit equals the sum of digits along the arrow.</li>
    <li><svg viewBox="0 0 40 14" width="40" height="14" style="vertical-align:middle;margin-right:4px"><line x1="4" y1="7" x2="36" y2="7" stroke="#EC407A" stroke-width="3" stroke-linecap="round" opacity=".5"/></svg> <strong style="color:#EC407A">Palindrome lines</strong> \u2014 digits read the same forwards and backwards.</li>
    <li><svg viewBox="0 0 40 14" width="40" height="14" style="vertical-align:middle;margin-right:4px"><line x1="4" y1="7" x2="36" y2="7" stroke="#7B1FA2" stroke-width="3" stroke-linecap="round" opacity=".55"/></svg> <strong style="color:#7B1FA2">Renban lines</strong> \u2014 cells contain consecutive digits in any order.</li>
    <li><svg viewBox="0 0 40 14" width="40" height="14" style="vertical-align:middle;margin-right:4px"><line x1="4" y1="12" x2="20" y2="2" stroke="#EF6C00" stroke-width="3" stroke-linecap="round" opacity=".5"/><line x1="20" y1="2" x2="36" y2="12" stroke="#EF6C00" stroke-width="3" stroke-linecap="round" opacity=".5"/></svg> <strong style="color:#EF6C00">Dutch Whisper lines</strong> \u2014 adjacent digits must differ by at least 4.</li>
    </ul>
    <div class="rule-note">The ultimate artisanal challenge \u2014 six constraint types combined! Use the constraint legend below the board to highlight each type.</div>`
};

const CELEB = [
  ["Magnifique!","You're absolutely brilliant, my princess!"],
  ["Incroyable!","You make everything look effortless, my baby!"],
  ["Superstar!","Even the stars are jealous, l'amour de ma vie!"],
  ["Legendary!","All 4 conquered! You're the queen of puzzles!"]
];

// ============== AUDIO ==============
const Audio = (()=>{
  let ctx;
  function getCtx(){
    if(!ctx) ctx=new (window.AudioContext||window.webkitAudioContext)();
    // iOS Safari suspends AudioContext until a user gesture resumes it
    if(ctx.state==='suspended') ctx.resume().catch(()=>{});
    return ctx;
  }
  function play(freq,dur,type='sine',vol=.12){
    try{
      const c=getCtx();
      if(c.state==='suspended')return; // Don't queue audio if context hasn't been unlocked yet
      const o=c.createOscillator(),g=c.createGain();
      o.type=type;o.frequency.value=freq;g.gain.value=vol;
      g.gain.exponentialRampToValueAtTime(.001,c.currentTime+dur);
      o.connect(g);g.connect(c.destination);o.start();o.stop(c.currentTime+dur);
    }catch(e){}
  }
  return{
    tap(){play(800,.06,'sine',.06)},
    place(){play(523,.15,'sine',.1);setTimeout(()=>play(784,.1,'sine',.04),60)},
    error(){play(180,.25,'sawtooth',.05);play(140,.3,'sawtooth',.03)},
    success(){
      [523,659,784,1047].forEach((f,i)=>setTimeout(()=>play(f,.35,'sine',.1),i*100));
      // Harmony layer
      [330,415,494,659].forEach((f,i)=>setTimeout(()=>play(f,.4,'sine',.04),i*100+30));
    },
    groupDone(){play(660,.15,'sine',.08);setTimeout(()=>play(880,.15,'sine',.06),100)},
    combo(){play(784,.12,'sine',.08);setTimeout(()=>play(988,.1,'sine',.06),50);setTimeout(()=>play(1175,.08,'sine',.04),100)},
    purr(){play(55,.6,'sine',.04);play(65,.6,'sine',.03)},
    meow(){
      try{
        const c=getCtx(),o=c.createOscillator(),g=c.createGain();
        o.type='sine';o.frequency.setValueAtTime(600,c.currentTime);
        o.frequency.exponentialRampToValueAtTime(900,c.currentTime+.08);
        o.frequency.exponentialRampToValueAtTime(500,c.currentTime+.25);
        g.gain.value=.1;g.gain.exponentialRampToValueAtTime(.001,c.currentTime+.3);
        o.connect(g);g.connect(c.destination);o.start();o.stop(c.currentTime+.3);
      }catch(e){}
    },
    getCtx
  };
})();

// ============== STATE ==============
let state = loadState();
let curPuzzle = null, curWeek = -1, selCell = null, selectedCells = new Set();
let pencilMode = false, history = [], redoStack = [], timer = null, elapsed = 0, gamePaused = false;
let debugMode = false, debugTaps = 0, debugTimer = null;
let hubGreeted = false;
let ellaInGame = false, streak = 0, ellaGameTimer = null;
let mistakes = 0, selectedNum = 0, bestTimes = JSON.parse(localStorage.getItem('celina-best')||'{}');
let digitFirstMode = false, lastNumpadTapTime = 0, lastNumpadTapDigit = 0;
let lastInputTime = Date.now(), ellaIdleTimer = null, ellaAsleep = false;
let stats = JSON.parse(localStorage.getItem('celina-stats')||'null')||{totalSolves:0,totalTime:0,totalMistakes:0,totalHints:0,bestStreak:0,perfectRuns:0,fastestSolve:Infinity,gamesStarted:0};
function saveStats(){localStorage.setItem('celina-stats',JSON.stringify(stats));}
const MAX_MISTAKES = 5;
const MAX_HINTS = 3;

function defaults(){
  return {
    firstVisit: new Date().toISOString(),
    puzzles:[{done:false,at:null,t:0,g:null,n:null,m:0,h:0,hc:null},{done:false,at:null,t:0,g:null,n:null,m:0,h:0,hc:null},
             {done:false,at:null,t:0,g:null,n:null,m:0,h:0,hc:null},{done:false,at:null,t:0,g:null,n:null,m:0,h:0,hc:null}],
    giftsSent:false, selectedGifts:[], giftPath:null
  };
}
function loadState(){
  try{
    const s=localStorage.getItem('celina-state');
    if(s){
      const p=JSON.parse(s);
      if(p.puzzles&&p.puzzles.length>=4){
        const d=defaults();
        if(p.giftsSent===undefined)p.giftsSent=d.giftsSent;
        if(!Array.isArray(p.selectedGifts))p.selectedGifts=d.selectedGifts;
        if(p.giftPath===undefined)p.giftPath=d.giftPath;
        if(!p.firstVisit)p.firstVisit=d.firstVisit;
        const dp={done:false,at:null,t:0,g:null,n:null,m:0,h:0,hc:null};
        for(let i=0;i<p.puzzles.length;i++){
          for(const k of Object.keys(dp)){
            if(p.puzzles[i][k]===undefined)p.puzzles[i][k]=dp[k];
          }
        }
        return p;
      }
    }
  }catch(e){}
  return defaults();
}
function save(){try{localStorage.setItem('celina-state',JSON.stringify(state));}catch(e){}}

// ============== VIEWS ==============
function showView(id){
  const cur=document.querySelector('.view.active');
  const next=document.getElementById(id);
  if(cur&&cur!==next){
    cur.classList.add('leaving');
    setTimeout(()=>{cur.classList.remove('active','leaving');next.classList.add('active');},200);
  }else{
    document.querySelectorAll('.view').forEach(v=>v.classList.remove('active'));
    next.classList.add('active');
  }
}

// ============== INIT ==============
document.addEventListener('DOMContentLoaded',()=>{
  initEmail(); initParticleCanvas(); initHearts(); initElla(); initSplash(); initHub(); initBoard(); initPoem(); initGifts();
  initCardTilt(); initRipples(); initSplashParallax(); initShootingStars(); initMusic();
});

// ============== FIRST-GAME TIPS ==============
let tipsShown=JSON.parse(localStorage.getItem('celina-tips')||'{}');
function showTipOnce(key,msg,delay){
  if(tipsShown[key])return;
  tipsShown[key]=true;
  localStorage.setItem('celina-tips',JSON.stringify(tipsShown));
  setTimeout(()=>ellaSayTypewriter(msg,4000),delay||1000);
}

// ============== PARTICLE CANVAS ==============
function initParticleCanvas(){
  const canvas=document.createElement('canvas');
  canvas.id='particle-canvas';
  document.body.insertBefore(canvas,document.body.firstChild);
  const ctx=canvas.getContext('2d');
  const particles=[];
  const COUNT=30;
  function resize(){canvas.width=window.innerWidth;canvas.height=window.innerHeight;}
  resize();window.addEventListener('resize',resize);
  const palettes=[
    [233,30,99],[156,39,176],[255,215,0],[255,255,255],
    [244,143,177],[206,147,216],[100,181,246]
  ];
  for(let i=0;i<COUNT;i++){
    const c=palettes[Math.floor(Math.random()*palettes.length)];
    particles.push({
      x:Math.random()*canvas.width,y:Math.random()*canvas.height,
      vx:(Math.random()-.5)*.25,vy:(Math.random()-.5)*.25,
      r:1+Math.random()*2.5,
      base:0.08+Math.random()*0.12,
      c,phase:Math.random()*Math.PI*2,
      drift:0.002+Math.random()*0.004
    });
  }
  let last=0;
  function draw(t){
    requestAnimationFrame(draw);
    // Skip drawing when hidden or during gameplay (hidden behind game view)
    if(document.hidden)return;
    const gameActive=document.getElementById('game').classList.contains('active');
    if(gameActive||t-last<33)return;
    last=t;
    ctx.clearRect(0,0,canvas.width,canvas.height);
    const s=t*0.001;
    for(const p of particles){
      p.x+=p.vx+Math.sin(s+p.phase)*0.12;
      p.y+=p.vy+Math.cos(s*0.7+p.phase)*0.08;
      if(p.x<-10)p.x=canvas.width+10;if(p.x>canvas.width+10)p.x=-10;
      if(p.y<-10)p.y=canvas.height+10;if(p.y>canvas.height+10)p.y=-10;
      const op=p.base+Math.sin(s*2+p.phase)*0.04;
      // Glow
      if(p.r>1.5){
        ctx.beginPath();ctx.arc(p.x,p.y,p.r*4,0,Math.PI*2);
        ctx.fillStyle=`rgba(${p.c[0]},${p.c[1]},${p.c[2]},${(op*.12).toFixed(3)})`;
        ctx.fill();
      }
      // Core
      ctx.beginPath();ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
      ctx.fillStyle=`rgba(${p.c[0]},${p.c[1]},${p.c[2]},${op.toFixed(2)})`;
      ctx.fill();
    }
  }
  requestAnimationFrame(draw);
}

// ============== HEARTS BG ==============
let _heartsInterval=null;
function initHearts(){
  const box=document.getElementById('hearts-bg');
  function add(){
    // Skip spawning when document is hidden (save battery)
    if(document.hidden)return;
    // Skip spawning during gameplay (hearts invisible behind game view)
    if(!document.getElementById('splash').classList.contains('active')&&
       !document.getElementById('hub').classList.contains('active'))return;
    // Cap DOM nodes: don't spawn if too many hearts already exist
    if(box.querySelectorAll('.fh').length>=15)return;
    const h=document.createElement('div');h.className='fh';
    h.innerHTML=['&#10084;','&#10085;','&#9829;'][Math.random()*3|0];
    h.style.cssText=`left:${Math.random()*100}%;font-size:${12+Math.random()*14}px;animation-duration:${9+Math.random()*11}s`;
    box.appendChild(h);h.addEventListener('animationend',()=>h.remove());
  }
  for(let i=0;i<4;i++) setTimeout(add,i*2500);
  _heartsInterval=setInterval(add,3500);
}

// ============== ELLA ==============
const ELLA_LINES=[
  "Mew! You got this!","Purrrr... so smart!","Meow~ keep going!","*nuzzle nuzzle*",
  "You're purrfect!","Ella believes in you!","*happy tail wag*","Mew mew!",
  "Almost there!","*purrs loudly*","Maxime loves you so much!","You're amazing, princess!",
  "*stretches happily*","Ella is proud of you!","So clever, meow!","The prettiest girl ever!",
  "Maxime's little pink~","L'amour de sa vie!","You make Maxime so happy!","*rolls over for belly rubs*"];
let ellaTimer=null, blinkInterval=null;
const ellaEl=()=>document.getElementById('ella-container');
const ellaSp=()=>document.getElementById('ella-speech');

function initElla(){
  const el=ellaEl();
  el.addEventListener('click',e=>{e.stopPropagation();if(!ellaDragJustEnded)ellaTap();ellaDragJustEnded=false;});
  initEllaDrag(el);
  startBlinking();
  ellaLoop();
}

// ---- Ella drag-to-move ----
let ellaDragged=false,ellaDragJustEnded=false;
function initEllaDrag(el){
  let startX=0,startY=0,origLeft=0,origBottom=0,dragging=false,moved=false;
  const THRESHOLD=8;
  el.addEventListener('touchstart',e=>{
    const t=e.touches[0];
    startX=t.clientX;startY=t.clientY;
    origLeft=el.style.left?parseFloat(el.style.left):el.getBoundingClientRect().left;
    origBottom=el.style.bottom?parseFloat(el.style.bottom):(window.innerHeight-el.getBoundingClientRect().bottom);
    dragging=true;moved=false;
    el.style.transition='none';
  },{passive:true});
  el.addEventListener('touchmove',e=>{
    if(!dragging)return;
    const t=e.touches[0];
    const dx=t.clientX-startX,dy=t.clientY-startY;
    if(!moved&&Math.abs(dx)<THRESHOLD&&Math.abs(dy)<THRESHOLD)return;
    moved=true;
    e.preventDefault();
    const newLeft=Math.max(0,Math.min(window.innerWidth-60,origLeft+dx));
    const newBottom=Math.max(0,Math.min(window.innerHeight-60,origBottom-dy));
    el.style.left=newLeft+'px';
    el.style.bottom=newBottom+'px';
  },{passive:false});
  el.addEventListener('touchend',()=>{
    if(moved){
      ellaDragged=true;
      ellaDragJustEnded=true;
      el.style.transition='transform .15s ease';
      el.classList.add('ella-landed');
      setTimeout(()=>el.classList.remove('ella-landed'),300);
    }
    dragging=false;
  },{passive:true});

  // Mouse events for desktop/laptop drag support
  el.addEventListener('mousedown',e=>{
    e.preventDefault();
    startX=e.clientX;startY=e.clientY;
    origLeft=el.style.left?parseFloat(el.style.left):el.getBoundingClientRect().left;
    origBottom=el.style.bottom?parseFloat(el.style.bottom):(window.innerHeight-el.getBoundingClientRect().bottom);
    dragging=true;moved=false;
    el.style.transition='none';
    el.style.cursor='grabbing';
  });
  document.addEventListener('mousemove',e=>{
    if(!dragging)return;
    const dx=e.clientX-startX,dy=e.clientY-startY;
    if(!moved&&Math.abs(dx)<THRESHOLD&&Math.abs(dy)<THRESHOLD)return;
    moved=true;
    e.preventDefault();
    document.body.style.cursor='grabbing';
    const newLeft=Math.max(0,Math.min(window.innerWidth-60,origLeft+dx));
    const newBottom=Math.max(0,Math.min(window.innerHeight-60,origBottom-dy));
    el.style.left=newLeft+'px';
    el.style.bottom=newBottom+'px';
  });
  document.addEventListener('mouseup',()=>{
    if(!dragging)return;
    if(moved){
      ellaDragged=true;
      ellaDragJustEnded=true;
      el.style.transition='transform .15s ease';
      el.classList.add('ella-landed');
      setTimeout(()=>el.classList.remove('ella-landed'),300);
    }
    dragging=false;
    el.style.cursor='grab';
    document.body.style.cursor='';
  });
}

function startBlinking(){
  if(blinkInterval) clearInterval(blinkInterval);
  blinkInterval=setInterval(()=>{
    const b=document.querySelector('.ella-blink');
    const e=document.querySelector('.ella-eyes');
    if(!b||!e)return;
    b.style.display='block';e.style.display='none';
    setTimeout(()=>{b.style.display='none';e.style.display='block';},180);
  },3000+Math.random()*3000);
}

let ellaTapCount=0,ellaTapTimer=null;
function ellaTap(){
  ellaTapCount++;clearTimeout(ellaTapTimer);
  ellaTapTimer=setTimeout(()=>{ellaTapCount=0;},500);
  Audio.meow();
  const el=ellaEl();
  if(ellaTapCount>=3){
    // Triple tap: Ella does a spin dance!
    ellaTapCount=0;
    el.classList.add('ella-spin');
    ellaSayTypewriter("*spins with joy!*",2000);
    setTimeout(()=>el.classList.remove('ella-spin'),1000);
    return;
  }
  ellaSay(ELLA_LINES[Math.random()*ELLA_LINES.length|0]);
  el.classList.add('purring');
  setTimeout(()=>el.classList.remove('purring'),2000);
  // Quick heart
  el.classList.remove('heart');
  void el.offsetWidth;
  el.classList.add('heart');
  setTimeout(()=>el.classList.remove('heart'),1600);
}

function ellaSay(text,dur){
  const sp=ellaSp();sp.textContent=text;sp.classList.add('show');
  clearTimeout(sp._t);sp._t=setTimeout(()=>sp.classList.remove('show'),dur||2800);
}

function ellaLoop(){
  clearTimeout(ellaTimer);
  if(ellaInGame)return; // Don't roam during game
  const el=ellaEl();
  el.classList.remove('walk','run','sleep','flip','purring');
  const sw=window.innerWidth;
  const act=['walk','walk','run','idle','sleep'][Math.random()*5|0];

  if(act==='walk'||act==='run'){
    const fast=act==='run';
    const target=Math.random()*(sw-120);
    const cur=parseFloat(el.style.left)||0;
    el.classList.toggle('flip',target<cur);
    el.classList.add(fast?'run':'walk');
    const dist=Math.abs(target-cur);
    const dur=dist/(fast?220:90);
    el.style.transition=`left ${dur}s linear`;
    el.style.left=target+'px';
    ellaTimer=setTimeout(()=>{el.classList.remove('walk','run');ellaLoop();},dur*1000+400);
  }else if(act==='sleep'){
    el.classList.add('sleep');
    const eyes=document.querySelector('.ella-eyes');
    const blink=document.querySelector('.ella-blink');
    if(eyes&&blink){eyes.style.display='none';blink.style.display='block';}
    ellaTimer=setTimeout(()=>{
      el.classList.remove('sleep');
      if(eyes&&blink){eyes.style.display='block';blink.style.display='none';}
      ellaLoop();
    },5000+Math.random()*5000);
  }else{
    // idle, just purr occasionally
    if(Math.random()<.4){el.classList.add('purring');Audio.purr();}
    ellaTimer=setTimeout(()=>{el.classList.remove('purring');ellaLoop();},4000+Math.random()*4000);
  }
}

// ============== ELLA GAME MODE ==============
const ELLA_GAME_LINES=[
  "*purrs softly*","You're doing great!","Ella is right here~","Think carefully...","Mew! So proud!",
  "*kneads paws*","Smart girl!","*watches intently*","Keep going, love!","Ella purrs for you~",
  "*nuzzle*","You've got this!","*happy chirp*","Focus, princess!","*tail swish*"
];
const ELLA_CORRECT_LINES=["Purrfect!","Yes!","Correct!","Nice one!","Brilliant!","*happy mew!*","So smart!","Amazing!"];
const ELLA_ERROR_LINES=["Hmm, try again~","Check that?","Not quite...","Mew...?","Almost!","Think again~"];
const ELLA_STREAK_LINES=["On fire!","Unstoppable!","Streak! Meow!","Keep it up!","You're glowing!","Genius!"];
const ELLA_GAME_EARLY=["Take your time~","Start with what you know!","No rush, princess!","Look for easy ones first~","*settles in to watch*"];
const ELLA_GAME_MID=["Getting there!","You're warming up!","Nice progress!","Rolling along~","*purrs approvingly*"];
const ELLA_GAME_LATE=["More than halfway!","So close I can feel it!","You're flying now!","The board is filling up!","*excited chirp!*"];
const ELLA_GAME_FINAL=["Almost there!!","Finish strong, princess!","So close! MEOW!","Just a few more!","*bouncing with excitement*"];
const ELLA_GAME_TIRED=["Take a break if you need~","Stretch those paws!","Rest your eyes for a sec~","No rush, we have time!"];
const ELLA_ERROR_CONCERNED=["Be careful now...","You've got this, stay calm","Deep breath~","Take it slow..."];
const ELLA_ERROR_WORRIED=["Last chance, think carefully!","One more try... you can do this!","Focus hard, princess!"];
const ELLA_STREAK_HIGH=["AMAZING combo!","Keep it going!!","You're incredible!","*amazed mew!*"];
const ELLA_STREAK_MEGA=["YOU'RE ON FIRE!!","UNSTOPPABLE!!","LEGENDARY!!","*SUPER EXCITED MEW!*"];
function ellaGetFillPercent(){
  if(!curPuzzle||!curPuzzle.user)return 0;
  let filled=0;
  for(let r=0;r<9;r++)for(let c=0;c<9;c++)if(curPuzzle.user[r][c]!==0)filled++;
  return filled/81;
}
function ellaPickIdleLine(){
  if(elapsed>900&&Math.random()<.25)return ELLA_GAME_TIRED[Math.random()*ELLA_GAME_TIRED.length|0];
  const pct=ellaGetFillPercent();
  if(pct>0.75)return Math.random()<.6?ELLA_GAME_FINAL[Math.random()*ELLA_GAME_FINAL.length|0]:ELLA_GAME_LINES[Math.random()*ELLA_GAME_LINES.length|0];
  if(pct>0.5)return Math.random()<.6?ELLA_GAME_LATE[Math.random()*ELLA_GAME_LATE.length|0]:ELLA_GAME_LINES[Math.random()*ELLA_GAME_LINES.length|0];
  if(pct>0.25)return Math.random()<.6?ELLA_GAME_MID[Math.random()*ELLA_GAME_MID.length|0]:ELLA_GAME_LINES[Math.random()*ELLA_GAME_LINES.length|0];
  return Math.random()<.6?ELLA_GAME_EARLY[Math.random()*ELLA_GAME_EARLY.length|0]:ELLA_GAME_LINES[Math.random()*ELLA_GAME_LINES.length|0];
}

function ellaTargetX(){
  // Center Ella horizontally, clamped within screen bounds
  return Math.max(0,Math.min(window.innerWidth-90,(window.innerWidth/2)-45));
}

function ellaEnterGame(){
  ellaInGame=true;ellaDragged=false;
  clearTimeout(ellaTimer);
  const el=ellaEl();
  el.style.bottom='';// reset drag offset
  el.classList.remove('walk','run','sleep','flip');
  el.classList.add('in-game');
  // Walk to center-bottom of screen, near the board
  const targetX=ellaTargetX();
  const cur=parseFloat(el.style.left)||0;
  el.classList.toggle('flip',targetX<cur);
  el.classList.add('walk');
  const dist=Math.abs(targetX-cur);
  const dur=Math.max(dist/120,0.5);
  el.style.transition=`left ${dur}s ease-out`;
  el.style.left=targetX+'px';
  setTimeout(()=>{
    el.classList.remove('walk');
    el.classList.add('purring');
    Audio.purr();
    ellaGameIdle();
  },dur*1000+200);
}

function ellaGameIdle(){
  clearTimeout(ellaGameTimer);
  if(!ellaInGame)return;
  const el=ellaEl();
  // Periodic purring & encouragement
  ellaGameTimer=setTimeout(()=>{
    if(!ellaInGame)return;
    // 10% chance: stretch animation
    if(Math.random()<.1){
      el.classList.add('stretching');
      setTimeout(()=>el.classList.remove('stretching'),1500);
    }
    el.classList.add('purring');
    Audio.purr();
    if(Math.random()<.45){
      ellaSayTypewriter(ellaPickIdleLine(),2200);
    }
    setTimeout(()=>{
      el.classList.remove('purring');
      // Small idle movements — slight shifts, don't wander away (skip if user dragged her)
      if(Math.random()<.3&&!ellaDragged){
        const shift=(Math.random()-.5)*40;
        const cur=parseFloat(el.style.left)||0;
        const newPos=Math.max(0,Math.min(window.innerWidth-120,cur+shift));
        el.style.transition='left 0.8s ease';
        el.style.left=newPos+'px';
      }
      ellaGameIdle();
    },2000);
  },6000+Math.random()*8000);
}

function ellaReactCorrect(){
  if(!ellaInGame)return;
  streak++;
  const el=ellaEl();
  // Show heart
  el.classList.remove('heart');void el.offsetWidth;el.classList.add('heart');
  setTimeout(()=>el.classList.remove('heart'),1600);
  // Purr
  el.classList.add('purring');
  setTimeout(()=>{if(ellaInGame)el.classList.remove('purring');},1500);

  if(streak>=15){
    // Mega streak: heart + special message
    ellaSayTypewriter(ELLA_STREAK_MEGA[Math.random()*ELLA_STREAK_MEGA.length|0],2000);
    Audio.meow();
    el.classList.add('jump');setTimeout(()=>el.classList.remove('jump'),500);
    ellaHappyEyes();
    if(streak===15)showAchievement('streakMaster');
  }else if(streak>=10){
    // High streak: excited
    ellaSayTypewriter(ELLA_STREAK_HIGH[Math.random()*ELLA_STREAK_HIGH.length|0],2000);
    Audio.meow();
    el.classList.add('jump');setTimeout(()=>el.classList.remove('jump'),500);
    ellaHappyEyes();
  }else if(streak>=5){
    // Good streak
    ellaSayTypewriter(ELLA_STREAK_LINES[Math.random()*ELLA_STREAK_LINES.length|0],2000);
    Audio.meow();
    el.classList.add('jump');setTimeout(()=>el.classList.remove('jump'),500);
    ellaHappyEyes();
  }else if(Math.random()<.35){
    ellaSayTypewriter(ELLA_CORRECT_LINES[Math.random()*ELLA_CORRECT_LINES.length|0],1800);
    ellaWhiskerTwitch();
  }
}

function ellaReactError(){
  if(!ellaInGame)return;
  streak=0;
  // Mistake-count-aware error messages
  if(mistakes>=4){
    ellaSay(ELLA_ERROR_WORRIED[Math.random()*ELLA_ERROR_WORRIED.length|0],2200);
  }else if(mistakes>=3){
    ellaSay(ELLA_ERROR_CONCERNED[Math.random()*ELLA_ERROR_CONCERNED.length|0],2000);
  }else if(Math.random()<.4){
    ellaSay(ELLA_ERROR_LINES[Math.random()*ELLA_ERROR_LINES.length|0],1800);
  }
  ellaSadEyes();
  // Ella head tilt + concerned blink
  const el=ellaEl();
  el.classList.add('head-tilt');
  setTimeout(()=>el.classList.remove('head-tilt'),1200);
  const eyes=document.querySelector('.ella-eyes');
  const blink=document.querySelector('.ella-blink');
  if(eyes&&blink){
    eyes.style.display='none';blink.style.display='block';
    setTimeout(()=>{eyes.style.display='block';blink.style.display='none';},400);
  }
}

function ellaLeaveGame(){
  ellaInGame=false;streak=0;ellaDragged=false;
  clearTimeout(ellaGameTimer);
  const el=ellaEl();
  el.style.bottom='';// reset drag offset
  el.classList.remove('purring','in-game','fast-tail','hyper-tail');
  // Reset eye position
  const eyes=document.querySelector('.ella-eyes');
  if(eyes)eyes.style.transform='';
  const sc=document.getElementById('streak-counter');if(sc)sc.classList.remove('show');
  // Clear crosshair
  const ch=document.getElementById('crosshair-h'),cv=document.getElementById('crosshair-v');
  if(ch)ch.classList.remove('active');if(cv)cv.classList.remove('active');
  ellaLoop();
}

// ============== ELLA RESIZE HANDLER ==============
// On orientation change or window resize, reposition Ella so she stays on-screen
window.addEventListener('resize',()=>{
  const el=ellaEl();
  if(!el)return;
  const maxLeft=window.innerWidth-90;
  const curLeft=parseFloat(el.style.left)||0;
  if(ellaInGame){
    // Smoothly recenter Ella near the board
    const targetX=ellaTargetX();
    el.style.transition='left 0.4s ease';
    el.style.left=targetX+'px';
  }else{
    // Not in game — just clamp so she doesn't go off-screen
    if(curLeft>maxLeft){
      el.style.transition='left 0.3s ease';
      el.style.left=maxLeft+'px';
    }
  }
});

// ============== SPLASH ==============
function initSplash(){
  document.getElementById('btn-enter').addEventListener('click',()=>{
    viewWipe();showView('hub');updateHub();
    const el=ellaEl();el.style.left='20px';el.style.transition='left 1s ease';
    ellaSayTypewriter("Mew! Welcome, Celina!",3500);
    // Time-aware greeting after the welcome message
    if(!hubGreeted){
      hubGreeted=true;
      const greetings={
        morning:["Good morning, sunshine!","Rise and shine, princess!"],
        afternoon:["Good afternoon, beautiful!"],
        evening:["Good evening, mon amour!"],
        night:["Can't sleep? Ella is here~","Late night puzzling!"]
      };
      const tod=getTimeOfDay();
      const g=greetings[tod];
      setTimeout(()=>ellaSayTypewriter(g[Math.random()*g.length|0],3500),4000);
    }
  });
}

// ============== TIME OF DAY ==============
function getTimeOfDay(){
  const h=new Date().getHours();
  if(h>=5&&h<12) return 'morning';
  if(h>=12&&h<17) return 'afternoon';
  if(h>=17&&h<21) return 'evening';
  return 'night';
}

// ============== HUB ==============
function initHub(){
  document.querySelectorAll('.puzzle-card').forEach(card=>{
    card.addEventListener('click',()=>{
      const w=+card.dataset.week;
      const st=puzzleStatus(w);
      if(st==='available'||st==='completed'||debugMode) openGame(w);
      else ellaSay("Not yet, meow! Wait for Monday~");
    });
  });
  // Debug: tap title 7x
  document.getElementById('hub-title').addEventListener('click',()=>{
    debugTaps++;clearTimeout(debugTimer);debugTimer=setTimeout(()=>{debugTaps=0;},2000);
    if(debugTaps>=7){debugMode=true;debugTaps=0;ellaSay("Debug! All unlocked~");updateHub();}
  });
  document.getElementById('btn-poem').addEventListener('click',()=>{
    showView('poem');
    document.querySelectorAll('.stanza').forEach(s=>{s.classList.remove('scroll-visible');s.classList.add('scroll-hidden');});
  });
  document.getElementById('btn-gifts').addEventListener('click',()=>showView('gifts'));
  document.getElementById('btn-stats').addEventListener('click',()=>{
    buildStatsView();
    document.getElementById('stats-modal').style.display='flex';
  });
  document.getElementById('btn-stats-ok').addEventListener('click',()=>{
    document.getElementById('stats-modal').style.display='none';
  });
  document.getElementById('btn-achievements').addEventListener('click',()=>{
    buildAchievementsView();
    document.getElementById('achieve-modal').style.display='flex';
  });
  document.getElementById('btn-achieve-ok').addEventListener('click',()=>{
    document.getElementById('achieve-modal').style.display='none';
  });
}

function fmtTime(s){if(s===Infinity||!s)return'--:--';const m=Math.floor(s/60),sec=s%60;return m+':'+(sec<10?'0':'')+sec;}
function buildStatsView(){
  const b=document.getElementById('stats-body');
  b.innerHTML=`<div class="stat-grid">
    <div class="stat-item"><span class="stat-val">${stats.totalSolves}</span><span class="stat-lbl">Puzzles Solved</span></div>
    <div class="stat-item"><span class="stat-val">${stats.perfectRuns}</span><span class="stat-lbl">Perfect Runs</span></div>
    <div class="stat-item"><span class="stat-val">${fmtTime(stats.fastestSolve)}</span><span class="stat-lbl">Fastest Solve</span></div>
    <div class="stat-item"><span class="stat-val">${stats.bestStreak}x</span><span class="stat-lbl">Best Streak</span></div>
    <div class="stat-item"><span class="stat-val">${fmtTime(Math.round(stats.totalTime/(stats.totalSolves||1)))}</span><span class="stat-lbl">Avg Time</span></div>
    <div class="stat-item"><span class="stat-val">${stats.totalHints}</span><span class="stat-lbl">Hints Used</span></div>
    <div class="stat-item"><span class="stat-val">${stats.totalMistakes}</span><span class="stat-lbl">Total Mistakes</span></div>
    <div class="stat-item"><span class="stat-val">${stats.gamesStarted}</span><span class="stat-lbl">Games Started</span></div>
  </div>`;
}

function updateHub(){
  const diff=[1,2,3,4]; // difficulty stars per puzzle
  document.querySelectorAll('.puzzle-card').forEach((card,i)=>{
    const st=debugMode&&!state.puzzles[i].done?'available':puzzleStatus(i);
    // Re-trigger card animation
    card.style.animation='none';void card.offsetHeight;card.style.animation='';
    card.className='puzzle-card '+st;
    const se=document.getElementById('status-'+i);
    if(st==='completed'){
      const bt=bestTimes['w'+i];
      se.innerHTML='\u2714 Completed'+(bt?' <span class="best-time">'+fmtTime(bt)+'</span>':'');
    }
    else if(st==='available'){
      // Show progress if puzzle was started
      if(state.puzzles[i].g){
        let filled=0;state.puzzles[i].g.forEach(row=>row.forEach(v=>{if(v>0)filled++;}));
        const pct=Math.round(filled/81*100);
        se.innerHTML=pct>0?`In progress <span class="card-pct">${pct}%</span>`:'Play now';
        if(pct>0) addProgressRing(card,pct);
      }else se.textContent='Play now';
    }
    else{
      const d=unlockDate(i),now=new Date(),days=Math.ceil((d-now)/(864e5));
      se.textContent=`Unlocks in ${days} day${days!==1?'s':''}`;
    }
    // Difficulty stars
    let dsEl=card.querySelector('.card-diff');
    if(!dsEl){dsEl=document.createElement('div');dsEl.className='card-diff';card.querySelector('.card-type').after(dsEl);}
    let stars='';for(let d=0;d<4;d++)stars+=`<span class="diff-star${d<diff[i]?' on':''}">\u2605</span>`;
    dsEl.innerHTML=stars;
  });
  const doneCount=state.puzzles.filter(p=>p.done).length;
  document.getElementById('btn-gifts').style.display=doneCount>=1?'inline-flex':'none';
  // Update gift button text based on tier
  const giftBtn=document.getElementById('btn-gifts');
  if(doneCount>=4) giftBtn.innerHTML=giftBtn.innerHTML.replace(/Choose Your Gifts!|Pick Your Gifts!/,'Choose Your Gifts!');
  else if(doneCount>=1) giftBtn.innerHTML=giftBtn.innerHTML.replace(/Choose Your Gifts!/,'Pick Your Gifts!');
  buildGiftTierTracker(doneCount);
  let hubProg=document.querySelector('.hub-progress');
  if(!hubProg){
    hubProg=document.createElement('div');hubProg.className='hub-progress';
    document.querySelector('.hub-header').appendChild(hubProg);
  }
  if(doneCount>0&&doneCount<4){
    hubProg.innerHTML=`<span class="prog-count">${doneCount}</span> / 4 puzzles completed`;
  }else if(doneCount===4){
    hubProg.innerHTML=`<span class="prog-count">All 4</span> puzzles completed! \u2728`;
  }else{
    hubProg.textContent='';
  }
  // Time-aware hub subtitle
  const todSubtitles={
    morning:"A perfect morning for puzzles",
    afternoon:"Take a break with some puzzles",
    evening:"Wind down with a puzzle",
    night:"A quiet night for thinking"
  };
  const descEl=document.querySelector('.hub-desc');
  if(descEl) descEl.textContent=todSubtitles[getTimeOfDay()];
  // Days since first visit
  const footerEl=document.querySelector('.hub-footer');
  if(footerEl&&state.firstVisit){
    const daysSince=Math.floor((Date.now()-new Date(state.firstVisit).getTime())/864e5);
    if(daysSince>0) footerEl.textContent='Day '+daysSince+' of your puzzle journey';
  }
  // Check if a new puzzle just unlocked → notify Celina + Maxime
  checkNewPuzzleNotify();
}

function puzzleStatus(i){if(state.puzzles[i].done)return'completed';return new Date()>=unlockDate(i)?'available':'locked';}

// Check for newly unlocked puzzles and notify Celina
function checkNewPuzzleNotify(){
  const notifiedKey='celina-notified-weeks';
  const notified=JSON.parse(localStorage.getItem(notifiedKey)||'[]');
  for(let i=0;i<PUZZLES.length;i++){
    if(puzzleStatus(i)==='available'&&!state.puzzles[i].done&&!notified.includes(i)){
      const pz=PUZZLES[i];
      sendToCelina(
        `New puzzle unlocked: ${pz.name}!`,
        `Hey princess!\n\nA new puzzle just unlocked for you:\n\n` +
        `Week ${pz.week}: ${pz.name}\n${pz.type}\n\n` +
        `${pz.desc}\n\nGo play it! Ella is waiting for you~`
      );
      sendToMaxime(
        `Puzzle ${pz.week} unlocked for Celina`,
        `Week ${pz.week} (${pz.name}) is now available.\n${pz.type}\n\nShe hasn't started it yet.`
      );
      notified.push(i);
      localStorage.setItem(notifiedKey,JSON.stringify(notified));
    }
  }
}

// ============== GIFT REWARD TRACKER ==============
function buildGiftTierTracker(doneCount){
  const el=document.getElementById('gift-tiers');if(!el)return;
  if(doneCount<4){
    const remaining=4-doneCount;
    el.innerHTML=`<div class="tier-header">\uD83C\uDF81 Solve ${remaining} more puzzle${remaining>1?'s':''} to unlock your reward!</div>`;
  }else{
    el.innerHTML='<div class="tier-header">\uD83C\uDF81 All puzzles done! Choose your reward!</div>';
  }
}
function unlockDate(i){
  const fv=new Date(state.firstVisit);if(i===0)return fv;
  const fm=new Date(fv);const dow=fm.getDay();
  fm.setDate(fm.getDate()+(dow===0?1:dow===1?0:8-dow));fm.setHours(0,0,0,0);
  return new Date(fm.getTime()+(i-1)*7*864e5);
}

// ============== RULES MODAL ==============
function showRules(type){
  document.getElementById('rules-title').textContent=type;
  document.getElementById('rules-body').innerHTML=RULES_HTML[type]||'';
  document.getElementById('rules-modal').style.display='flex';
}
document.addEventListener('DOMContentLoaded',()=>{
  document.getElementById('btn-rules-ok').addEventListener('click',()=>{
    document.getElementById('rules-modal').style.display='none';
  });
  document.getElementById('btn-rules-open').addEventListener('click',()=>{
    if(curPuzzle) showRules(PUZZLES[curWeek].type);
  });
});

// ============== GAME ==============
const cellGrid=Array.from({length:9},()=>Array(9).fill(null));
function getCell(r,c){return cellGrid[r][c];}
function initBoard(){
  const board=document.getElementById('game-board');
  let lastTapCell=null,lastTapTime=0;
  for(let r=0;r<9;r++)for(let c=0;c<9;c++){
    const d=document.createElement('div');d.className='cell';d.dataset.r=r;d.dataset.c=c;d.setAttribute('role','gridcell');
    cellGrid[r][c]=d;
    d.addEventListener('click',()=>{
      const now=Date.now();
      const sameCell=lastTapCell&&lastTapCell.r===r&&lastTapCell.c===c;
      // Digit-first mode: tap cells to place the locked digit
      if(digitFirstMode&&selectedNum>0&&curPuzzle&&!isGiven(r,c)){
        Audio.tap();haptic(5);
        selCell={r,c};
        if(curPuzzle.user[r][c]===selectedNum){
          // Erase if cell already has the locked digit
          pushHist();curPuzzle.user[r][c]=0;curPuzzle.notes[r][c]=new Set();render();updateSmartHighlight();checkDigitFirstComplete(selectedNum);
        }else if(curPuzzle.user[r][c]===0){
          // Place the locked digit
          inputNum(selectedNum);checkDigitFirstComplete(selectedNum);
        }
        lastTapCell={r,c};lastTapTime=now;
        return;
      }
      // Double-tap to erase
      if(sameCell&&now-lastTapTime<350&&!isGiven(r,c)&&curPuzzle&&curPuzzle.user[r][c]>0){
        erase();
        lastTapCell=null;lastTapTime=0;
        return;
      }
      lastTapCell={r,c};lastTapTime=now;
      Audio.tap();haptic(5);selectCell(r,c);
    });
    board.appendChild(d);
  }
  // Numpad: tap = normal, long press = temporary notes mode
  document.querySelectorAll('.num-btn').forEach(b=>{
    let lpTimer=null,wasLongPress=false;
    b.addEventListener('pointerdown',e=>{
      // Ripple effect
      const rip=document.createElement('span');rip.className='ripple';
      const rect=b.getBoundingClientRect();
      const sz=Math.max(rect.width,rect.height)*2;
      rip.style.width=rip.style.height=sz+'px';
      rip.style.left=(e.clientX-rect.left-sz/2)+'px';
      rip.style.top=(e.clientY-rect.top-sz/2)+'px';
      b.appendChild(rip);setTimeout(()=>rip.remove(),400);
      wasLongPress=false;
      lpTimer=setTimeout(()=>{
        wasLongPress=true;
        // Temp notes mode: toggle note without changing pencilMode permanently
        if(!pencilMode&&selCell){
          const n=+b.dataset.num,{r,c}=selCell;
          if(!isGiven(r,c)){
            pushHist();
            const s=curPuzzle.notes[r][c];s.has(n)?s.delete(n):s.add(n);
            curPuzzle.user[r][c]=0;
            haptic(5);render();
            b.classList.add('long-press-flash');
            setTimeout(()=>b.classList.remove('long-press-flash'),300);
          }
        }
      },400);
    });
    b.addEventListener('pointerup',()=>{clearTimeout(lpTimer);if(!wasLongPress){
      const tappedNum=+b.dataset.num;
      const now=Date.now();
      // Digit-first: if already locked on this digit, deactivate
      if(digitFirstMode&&tappedNum===selectedNum){
        digitFirstMode=false;selectedNum=0;renderSelectedNum();
        lastNumpadTapTime=0;lastNumpadTapDigit=0;
        return;
      }
      // Double-tap detection for digit-first activation
      if(!digitFirstMode&&tappedNum===lastNumpadTapDigit&&now-lastNumpadTapTime<350){
        digitFirstMode=true;selectedNum=tappedNum;renderSelectedNum();
        lastNumpadTapTime=0;lastNumpadTapDigit=0;
        return;
      }
      lastNumpadTapTime=now;lastNumpadTapDigit=tappedNum;
      // Normal behavior: trigger fly animation before inputting
      if(digitFirstMode){digitFirstMode=false;renderSelectedNum();}
      if(selCell&&!pencilMode){
        const tc=getCell(selCell.r,selCell.c);
        numFly(b,tc);
      }
      inputNum(tappedNum);
    }});
    b.addEventListener('pointerleave',()=>{clearTimeout(lpTimer);});
  });
  document.getElementById('btn-undo').addEventListener('click',undo);
  document.getElementById('btn-redo').addEventListener('click',redo);
  document.getElementById('btn-erase').addEventListener('click',erase);
  document.getElementById('btn-pencil').addEventListener('click',togglePencil);
  document.getElementById('btn-hint').addEventListener('click',giveHint);
  document.getElementById('btn-auto-pencil').addEventListener('click',autoPencilAll);
  document.getElementById('btn-restart').addEventListener('click',restartPuzzle);
  document.getElementById('btn-pause').addEventListener('click',togglePause);
  document.getElementById('btn-back-game').addEventListener('click',()=>{stopTimer();saveProgress();stopEllaIdleWatch();ellaLeaveGame();showView('hub');updateHub();});
  document.getElementById('btn-retry').addEventListener('click',retryPuzzle);
  document.getElementById('btn-go-hub').addEventListener('click',()=>{
    document.getElementById('game-over-overlay').style.display='none';
    state.puzzles[curWeek].g=null;state.puzzles[curWeek].t=0;state.puzzles[curWeek].m=0;state.puzzles[curWeek].h=0;state.puzzles[curWeek].hc=null;state.puzzles[curWeek].n=null;save();
    ellaLeaveGame();showView('hub');updateHub();
    ellaSay("You'll get it next time, princess!");
  });
  document.getElementById('btn-share-result').addEventListener('click',shareResult);
  document.getElementById('btn-celeb-continue').addEventListener('click',()=>{showView('hub');updateHub();
    // Hide streak counter
    const sc=document.getElementById('streak-counter');if(sc)sc.classList.remove('show');
  });
  // Keyboard
  document.addEventListener('keydown',e=>{
    if(!document.getElementById('game').classList.contains('active'))return;
    const n=+e.key;
    if(n>=1&&n<=9){
      if(e.shiftKey&&!e.ctrlKey&&!e.metaKey){
        // Shift+number: toggle note without changing pencil mode
        if(selCell&&!gamePaused){
          const{r,c}=selCell;
          if(!isGiven(r,c)){
            pushHist();
            const s=curPuzzle.notes[r][c];s.has(n)?s.delete(n):s.add(n);
            if(s.size>0)curPuzzle.user[r][c]=0;
            render();updateSmartHighlight();
          }
        }
      }else if(!e.ctrlKey&&!e.metaKey){
        inputNum(n);
      }
    }
    if(e.key==='Backspace'||e.key==='Delete')erase();
    if(e.key==='z'&&(e.ctrlKey||e.metaKey)&&!e.shiftKey)undo();
    if(e.key==='y'&&(e.ctrlKey||e.metaKey))redo();
    if(e.key==='z'&&(e.ctrlKey||e.metaKey)&&e.shiftKey)redo();
    if(e.key==='p'||e.key==='P')togglePencil();
    if(selCell){
      const{r,c}=selCell;
      if(e.key==='ArrowUp'){e.preventDefault();if(r>0)selectCell(r-1,c);}
      if(e.key==='ArrowDown'){e.preventDefault();if(r<8)selectCell(r+1,c);}
      if(e.key==='ArrowLeft'){e.preventDefault();if(c>0)selectCell(r,c-1);}
      if(e.key==='ArrowRight'){e.preventDefault();if(c<8)selectCell(r,c+1);}
    }
  });
  // Swipe on board for cell navigation (mobile)
  const boardEl=document.getElementById('game-board');
  let touchStart=null;
  boardEl.addEventListener('touchstart',e=>{touchStart={x:e.touches[0].clientX,y:e.touches[0].clientY};},{passive:true});
  boardEl.addEventListener('touchend',e=>{
    if(!touchStart||!selCell)return;
    const dx=e.changedTouches[0].clientX-touchStart.x;
    const dy=e.changedTouches[0].clientY-touchStart.y;
    const ax=Math.abs(dx),ay=Math.abs(dy);
    if(ax<15&&ay<15)return; // tap, not swipe
    const{r,c}=selCell;
    if(ax>ay){if(dx>0&&c<8)selectCell(r,c+1);else if(dx<0&&c>0)selectCell(r,c-1);}
    else{if(dy>0&&r<8)selectCell(r+1,c);else if(dy<0&&r>0)selectCell(r-1,c);}
    touchStart=null;
  },{passive:true});
}

function openGame(wi){
  curWeek=wi;
  const pz=PUZZLES[wi];
  // Show rules first time
  const ruleKey='rules-seen-'+wi;
  if(!localStorage.getItem(ruleKey)){showRules(pz.type);localStorage.setItem(ruleKey,'1');}

  if(state.puzzles[wi].g){
    curPuzzle={sol:pz.solution,user:state.puzzles[wi].g.map(r=>[...r]),notes:mk9(()=>new Set())};
    // Restore saved notes
    if(state.puzzles[wi].n){
      state.puzzles[wi].n.forEach((row,r)=>row.forEach((arr,c)=>{curPuzzle.notes[r][c]=new Set(arr);}));
    }
    if(state.puzzles[wi].hc)curPuzzle.hintCells=new Set(state.puzzles[wi].hc);
  }else{
    curPuzzle={sol:pz.solution,user:pz.givens.map(r=>[...r]),notes:mk9(()=>new Set())};
  }
  history=[];redoStack=[];selCell=null;selectedCells.clear();pencilMode=false;gamePaused=false;
  mistakes=state.puzzles[wi].m||0;hintsUsed=state.puzzles[wi].h||0;selectedNum=0;streak=0;lastMilestone=0;digitFirstMode=false;
  completedGroups=new Set();satisfiedConstraints=new Set();
  document.getElementById('btn-pencil').classList.remove('active');
  document.getElementById('game-board').classList.remove('pencil-mode');
  document.getElementById('game-over-overlay').style.display='none';
  document.getElementById('game-title').textContent=pz.name;
  elapsed=state.puzzles[wi].t||0;startTimer();
  stats.gamesStarted++;saveStats();
  renderMistakes();renderSelectedNum();renderHintCount();
  render();drawConstraints();showView('game');
  // Per-puzzle accent color
  const gameEl=document.getElementById('game');
  gameEl.className='view';gameEl.classList.add('active',`puzzle-${wi}`);
  // Board cell wave entry
  boardCellWaveEntry();
  // Board glow restore from saved progress
  setTimeout(updateBoardGlow,600);
  ellaEnterGame();
  startEllaIdleWatch();
  // Context-aware Ella greeting
  const isResuming=state.puzzles[wi].g&&elapsed>0;
  const resumeLines=["Welcome back!","Shall we continue?","I saved your spot!","Mew! You're back!"];
  const freshLines=["You can do this!","Ella is watching!","Go go go!","Smart and beautiful!"];
  const lines=isResuming?resumeLines:freshLines;
  setTimeout(()=>ellaSayTypewriter(lines[wi%lines.length]||"Meow!",2500),800);
}

function mk9(fn){return Array.from({length:9},()=>Array.from({length:9},fn));}
function isGiven(r,c){return PUZZLES[curWeek].givens[r][c]!==0;}

function togglePause(){
  gamePaused=!gamePaused;
  const board=document.getElementById('game-board');
  const overlay=document.getElementById('board-overlay');
  const btn=document.getElementById('btn-pause');
  if(gamePaused){
    stopTimer();
    board.classList.add('paused');
    overlay.classList.add('paused');
    btn.innerHTML='<svg viewBox="0 0 24 24" width="20" height="20"><path d="M8 5v14l11-7z" fill="currentColor"/></svg>';
    ellaSay("Take a break!");
  }else{
    startTimer();
    board.classList.remove('paused');
    overlay.classList.remove('paused');
    btn.innerHTML='<svg viewBox="0 0 24 24" width="20" height="20"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" fill="currentColor"/></svg>';
  }
}

function selectCell(r,c){
  if(gamePaused)return;
  resetIdleTimer();
  if(pencilMode){
    // Multi-select mode: toggle cell in selectedCells
    const key=r+','+c;
    if(selectedCells.has(key)){
      selectedCells.delete(key);
      // If we removed the primary selCell, update it to another selected cell or null
      if(selCell&&selCell.r===r&&selCell.c===c){
        if(selectedCells.size>0){
          const first=[...selectedCells][0].split(',');selCell={r:+first[0],c:+first[1]};
        }else{selCell=null;}
      }
    }else{
      selectedCells.add(key);
      selCell={r,c};
    }
  }else{
    // Normal single-select mode
    selectedCells.clear();
    selCell={r,c};
  }
  const v=curPuzzle.user[r][c];
  if(v>0)selectedNum=v;
  renderSelectedNum();
  render();
  updateCrosshair();
  updateSmartHighlight();
  updateAntiZones(r,c);
  ellaLookAt(r,c);
  // First-game tips
  if(!isGiven(r,c)&&v===0) showTipOnce('tap-num','Tap a number below to fill this cell!',500);
}

function ellaLookAt(r,c){
  if(!ellaInGame)return;
  const eyes=document.querySelector('.ella-eyes');
  if(!eyes)return;
  // Map cell position to a small eye offset
  const nx=(c-4)/4; // -1 to 1
  const ny=(r-4)/4;
  const ox=nx*2.5, oy=ny*1.5;
  eyes.style.transform=`translate(${ox}px,${oy}px)`;
}

function inputNum(n){
  if(gamePaused)return;
  if(!selCell)return;const{r,c}=selCell;if(isGiven(r,c)&&selectedCells.size<=1)return;
  resetIdleTimer();
  selectedNum=n;renderSelectedNum();
  pushHist();
  if(pencilMode){
    // Multi-select: toggle note on ALL selected cells
    const cells=selectedCells.size>0?[...selectedCells]:[r+','+c];
    cells.forEach(key=>{
      const[cr,cc]=key.split(',').map(Number);
      if(!isGiven(cr,cc)){
        const s=curPuzzle.notes[cr][cc];s.has(n)?s.delete(n):s.add(n);curPuzzle.user[cr][cc]=0;
      }
    });
  }else{
    if(curPuzzle.user[r][c]===n){curPuzzle.user[r][c]=0;streak=0;}
    else{
      const isCorrect=n===curPuzzle.sol[r][c];
      curPuzzle.user[r][c]=n;curPuzzle.notes[r][c]=new Set();
      autoClearNotes(r,c,n);
      if(isCorrect){
        // Combo-scaled feedback
        const comboLevel=streak>=10?3:streak>=5?2:streak>=3?1:0;
        if(comboLevel>=2){Audio.combo();haptic([10,5,10]);}else{Audio.place();haptic(10);}
        cellPop(r,c);
        spawnParticles(r,c,comboLevel);
        // Floating combo text
        if(streak>=10)spawnComboText(r,c,streak+'x COMBO!','mega');
        else if(streak>=5)spawnComboText(r,c,streak+'x!','large');
        else if(streak>=3)spawnComboText(r,c,streak+'x','medium');
        else if(streak>=1)spawnComboText(r,c,'+1','small');
        ellaReactCorrect();updateStreak();updateEllaTailSpeed();
        checkProgressMilestone();
        showTipOnce('pencil','Tip: Long-press a number for pencil marks!',3000);
        if(tipsShown['pencil']) showTipOnce('digit-first','Tip: Double-tap a number to lock it, then tap cells to place it!',4000);
        updateBoardGlow();
        updateNearCompletion();
        checkConstraintSatisfaction();
        // Check for group and number completions
        setTimeout(()=>{checkGroupCompletion(r,c);checkNumComplete(n);},150);
      }else{
        mistakes++;
        renderMistakes();
        Audio.error();haptic([40,25,40]);
        cellShake(r,c);screenShake();errorVignette();
        ellaReactError();
        flashError(r,c);
        highlightConflicts(r,c,n);
        const left=MAX_MISTAKES-mistakes;
        showToast(left>0?`${left} heart${left!==1?'s':''} left — tap Undo to fix`:'Last chance!',1800);
        showTipOnce('undo','Tip: Use Undo to take back mistakes!',2500);
        if(mistakes>=MAX_MISTAKES){
          setTimeout(()=>gameOver(),600);
        }
      }
    }
  }
  render();updateSmartHighlight();checkWin();
}

function autoClearNotes(r,c,n){
  // Remove n from pencil marks in same row, column, box
  for(let i=0;i<9;i++){
    curPuzzle.notes[r][i].delete(n);
    curPuzzle.notes[i][c].delete(n);
  }
  const br=Math.floor(r/3)*3,bc=Math.floor(c/3)*3;
  for(let dr=0;dr<3;dr++)for(let dc=0;dc<3;dc++){
    curPuzzle.notes[br+dr][bc+dc].delete(n);
  }
  // Also clear for anti-knight/anti-king constraints
  const pz=PUZZLES[curWeek];
  if(pz.knights){
    [[-2,-1],[-2,1],[-1,-2],[-1,2],[1,-2],[1,2],[2,-1],[2,1]].forEach(([dr,dc])=>{
      const nr=r+dr,nc=c+dc;
      if(nr>=0&&nr<9&&nc>=0&&nc<9)curPuzzle.notes[nr][nc].delete(n);
    });
  }
  if(pz.kings){
    [[-1,-1],[-1,1],[1,-1],[1,1]].forEach(([dr,dc])=>{
      const nr=r+dr,nc=c+dc;
      if(nr>=0&&nr<9&&nc>=0&&nc<9)curPuzzle.notes[nr][nc].delete(n);
    });
  }
}

function haptic(pattern){
  try{if(typeof navigator.vibrate==='function')navigator.vibrate(pattern);}catch(e){}
}

function cellPop(r,c){
  const cell=getCell(r,c);
  if(!cell)return;
  cell.classList.remove('pop');void cell.offsetWidth;cell.classList.add('pop');
  setTimeout(()=>cell.classList.remove('pop'),350);
  // Expanding ring effect
  const rect=cell.getBoundingClientRect();
  const ring=document.createElement('div');
  ring.className='cell-ring';
  ring.style.cssText=`left:${rect.left}px;top:${rect.top}px;width:${rect.width}px;height:${rect.height}px`;
  document.body.appendChild(ring);
  ring.addEventListener('animationend',()=>ring.remove());
}

function updateStreak(){
  if(streak>stats.bestStreak){stats.bestStreak=streak;saveStats();}
  const el=document.getElementById('streak-counter');
  if(!el)return;
  const bw=document.querySelector('.board-wrap');
  if(streak>=3){
    el.textContent=streak>=10?streak+'x \uD83D\uDD25\uD83D\uDD25':streak>=5?streak+'x \uD83D\uDD25':streak+'x';
    el.classList.add('show');
    el.classList.remove('pulse');void el.offsetWidth;el.classList.add('pulse');
    // Escalation classes
    el.classList.toggle('hot',streak>=5&&streak<10);
    el.classList.toggle('fire',streak>=10);
    // Numpad glow on streak
    const np=document.querySelector('.numpad');
    if(np){np.classList.toggle('streak-glow',streak>=3&&streak<10);np.classList.toggle('streak-fire',streak>=10);}
    // Board border glow on streak
    if(bw){
      bw.classList.toggle('streak-border',streak>=5);
      bw.classList.toggle('streak-fire-border',streak>=10);
    }
  }else{
    el.classList.remove('show','hot','fire');
    const np=document.querySelector('.numpad');
    if(np){np.classList.remove('streak-glow','streak-fire');}
    if(bw){bw.classList.remove('streak-border','streak-fire-border');}
  }
}

function renderMistakes(){
  const el=document.getElementById('mistake-hearts');if(!el)return;
  let html='';
  for(let i=0;i<MAX_MISTAKES;i++){
    const lost=i<mistakes;
    html+=`<span class="mheart${lost?' lost':''}">${lost?'<svg viewBox="0 0 24 24" width="14" height="14"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" fill="#ddd"/></svg>':'<svg viewBox="0 0 24 24" width="14" height="14"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" fill="#e91e63"/></svg>'}</span>`;
  }
  el.innerHTML=html;
  // Animate the last lost heart
  if(mistakes>0){
    const lost=el.querySelectorAll('.lost');
    const last=lost[lost.length-1];
    if(last){last.classList.add('breaking');setTimeout(()=>last.classList.remove('breaking'),600);}
  }
}

function renderSelectedNum(){
  document.querySelectorAll('.num-btn').forEach(b=>{
    const num=+b.dataset.num;
    b.classList.toggle('sel',num===selectedNum&&!pencilMode);
    b.classList.toggle('digit-locked',digitFirstMode&&num===selectedNum&&!pencilMode);
  });
  // Digit-first mode indicator
  const np=document.getElementById('numpad');
  let ind=document.getElementById('digit-first-indicator');
  if(digitFirstMode&&selectedNum>0){
    if(!ind){
      ind=document.createElement('div');ind.id='digit-first-indicator';ind.className='digit-first-ind';
      np.parentNode.insertBefore(ind,np);
    }
    ind.textContent='Placing '+selectedNum+'s \u2014 tap cells \u00b7 tap '+selectedNum+' again to exit';
    ind.classList.add('show');
  }else if(ind){
    ind.classList.remove('show');
  }
}

function checkDigitFirstComplete(n){
  if(!digitFirstMode||!curPuzzle)return;
  const g=curPuzzle.user,sol=curPuzzle.sol;
  let count=0;
  for(let r=0;r<9;r++)for(let c=0;c<9;c++){
    if(g[r][c]===n&&g[r][c]===sol[r][c])count++;
  }
  if(count>=9){digitFirstMode=false;selectedNum=0;renderSelectedNum();}
}

function screenShake(){
  const bw=document.querySelector('.board-wrap');if(!bw)return;
  bw.classList.remove('shake');void bw.offsetWidth;bw.classList.add('shake');
  setTimeout(()=>bw.classList.remove('shake'),600);
}

function errorVignette(){
  let v=document.getElementById('error-vignette');
  if(!v){
    v=document.createElement('div');v.id='error-vignette';
    v.style.cssText='position:fixed;inset:0;pointer-events:none;z-index:150;opacity:0;transition:opacity .15s ease;background:radial-gradient(ellipse at center,transparent 50%,rgba(239,83,80,.25) 100%)';
    document.body.appendChild(v);
  }
  v.style.opacity='1';
  setTimeout(()=>{v.style.opacity='0';},300);
}

let lastMilestone=0;
let hintsUsed=0;
function checkProgressMilestone(){
  if(!curPuzzle)return;
  const g=curPuzzle.user,sol=curPuzzle.sol;
  let filled=0;
  for(let r=0;r<9;r++)for(let c=0;c<9;c++)if(g[r][c]===sol[r][c]&&g[r][c]>0)filled++;
  const pct=Math.floor(filled/81*100);
  const milestones=[25,50,75];
  for(const m of milestones){
    if(pct>=m&&lastMilestone<m){
      lastMilestone=m;
      const msgs={25:"Quarter done!",50:"Halfway there!",75:"Almost done!"};
      showToast(msgs[m]+" "+m+"%",1800);
      if(m===50){Audio.groupDone();haptic([15,10,15]);}
      if(m===75){Audio.groupDone();haptic([20,10,20,10,20]);ellaSay("So close!",1800);}
      break;
    }
  }
}

function updateBoardGlow(){
  if(!curPuzzle)return;
  const g=curPuzzle.user,sol=curPuzzle.sol;
  let filled=0;
  for(let r=0;r<9;r++)for(let c=0;c<9;c++)if(g[r][c]===sol[r][c]&&g[r][c]>0)filled++;
  const pct=filled/81;
  const bw=document.querySelector('.board-wrap');if(!bw)return;
  // Intensify glow as puzzle nears completion
  const intensity=Math.max(0,pct-.3)/.7; // 0 at 30%, 1 at 100%
  const glow=Math.round(intensity*40);
  const pinkGlow=Math.round(intensity*60);
  if(pct>.3){
    bw.style.boxShadow=`0 0 40px rgba(255,255,255,.04),0 0 ${pinkGlow}px rgba(233,30,99,${(.06+intensity*.12).toFixed(2)}),0 0 ${glow}px rgba(255,215,0,${(intensity*.08).toFixed(2)}),0 8px 32px rgba(0,0,0,.4),0 2px 8px rgba(0,0,0,.2)`;
  }
}

function cellShake(r,c){
  const cell=getCell(r,c);
  if(!cell)return;
  cell.classList.remove('shake-hard');void cell.offsetWidth;cell.classList.add('shake-hard');
  setTimeout(()=>cell.classList.remove('shake-hard'),500);
}

function flashError(r,c){
  const cell=getCell(r,c);
  if(!cell)return;
  cell.classList.add('flash-error');
  setTimeout(()=>cell.classList.remove('flash-error'),800);
}

function gameOver(){
  stopTimer();stopEllaIdleWatch();
  // Show progress on game-over screen
  let correct=0;const g=curPuzzle.user,sol=curPuzzle.sol;
  for(let r=0;r<9;r++)for(let c=0;c<9;c++)if(g[r][c]===sol[r][c]&&g[r][c]>0)correct++;
  const pct=Math.round(correct/81*100);
  const gp=document.getElementById('go-progress');
  if(gp) gp.textContent=pct>=50?"You were "+pct+"% done — so close!":"You made it to "+pct+"% — you'll get further next time!";
  Audio.error();haptic([100,50,100,50,200]);
  // Ella sad reaction
  ellaSadEyes();
  const goLines=["Oh no...","Don't give up, princess!","You'll get it next time!","*sad mew*"];
  ellaSayTypewriter(goLines[Math.random()*goLines.length|0],3000);
  const board=document.getElementById('game-board');
  board.classList.add('game-over-flash');
  gameOverDramatic();
  // Intense red vignette for game over
  let v=document.getElementById('error-vignette');
  if(!v){v=document.createElement('div');v.id='error-vignette';v.style.cssText='position:fixed;inset:0;pointer-events:none;z-index:150;opacity:0;transition:opacity .3s ease;background:radial-gradient(ellipse at center,transparent 40%,rgba(239,83,80,.35) 100%)';document.body.appendChild(v);}
  v.style.opacity='1';v.style.transition='opacity .3s ease';
  setTimeout(()=>{v.style.transition='opacity 1s ease';v.style.opacity='0';},1200);
  setTimeout(()=>{
    board.classList.remove('game-over-flash');
    document.getElementById('game-over-overlay').style.display='flex';
  },900);
}

function retryPuzzle(){
  document.getElementById('game-over-overlay').style.display='none';
  state.puzzles[curWeek].g=null;state.puzzles[curWeek].t=0;state.puzzles[curWeek].m=0;state.puzzles[curWeek].h=0;state.puzzles[curWeek].hc=null;state.puzzles[curWeek].n=null;save();
  openGame(curWeek);
}

function restartPuzzle(){
  if(!curPuzzle)return;
  // Check if puzzle has progress
  let filled=0;
  for(let r=0;r<9;r++)for(let c=0;c<9;c++)if(!isGiven(r,c)&&curPuzzle.user[r][c]>0)filled++;
  if(filled>3&&!confirm('Restart this puzzle? All progress will be lost.'))return;
  pushHist();
  const pz=PUZZLES[curWeek];
  curPuzzle.user=pz.givens.map(r=>[...r]);
  curPuzzle.notes=mk9(()=>new Set());delete curPuzzle.hintCells;
  mistakes=0;streak=0;elapsed=0;selectedNum=0;lastMilestone=0;digitFirstMode=false;
  selectedCells.clear();selCell=null;pencilMode=false;
  document.getElementById('btn-pencil').classList.remove('active');
  document.getElementById('game-board').classList.remove('pencil-mode');
  completedGroups=new Set();satisfiedConstraints=new Set();hintsUsed=0;
  state.puzzles[curWeek].m=0;state.puzzles[curWeek].h=0;state.puzzles[curWeek].hc=null;state.puzzles[curWeek].n=null;
  renderMistakes();renderSelectedNum();renderHintCount();
  startTimer();render();saveProgress();
  showToast("Puzzle restarted");
  ellaSay("Fresh start!",1500);
}

function erase(){
  if(!selCell)return;const{r,c}=selCell;if(isGiven(r,c))return;
  pushHist();curPuzzle.user[r][c]=0;curPuzzle.notes[r][c]=new Set();render();
}

function togglePencil(){
  pencilMode=!pencilMode;
  document.getElementById('btn-pencil').classList.toggle('active',pencilMode);
  document.getElementById('game-board').classList.toggle('pencil-mode',pencilMode);
  // Clear multi-selection when leaving pencil mode
  if(!pencilMode){selectedCells.clear();render();}
  renderSelectedNum();
  haptic(pencilMode?[8,4,8]:[6,3,6]);
  if(pencilMode) showToast("Notes mode",800);
}

function renderHintCount(){
  const el=document.getElementById('hint-count');
  if(!el)return;
  const rem=MAX_HINTS-hintsUsed;
  el.textContent=rem;
  el.classList.toggle('empty',rem<=0);
}

// Find an empty cell with a simple logical explanation for its solution
function findExplainableCell(){
  const g=curPuzzle.user,sol=curPuzzle.sol;

  // Helper: get candidates for an empty cell (digits 1-9 not conflicting)
  function getCandidates(r,c){
    const cands=[];
    for(let v=1;v<=9;v++){if(!conflict(r,c,v))cands.push(v);}
    return cands;
  }

  // a. Naked Single: cell has only one possible candidate
  for(let r=0;r<9;r++)for(let c=0;c<9;c++){
    if(g[r][c]!==0||isGiven(r,c))continue;
    const cands=getCandidates(r,c);
    if(cands.length===1&&cands[0]===sol[r][c]){
      return {r,c,msg:"Only one digit fits here!"};
    }
  }

  // b. Hidden Single in Box
  for(let br=0;br<9;br+=3)for(let bc=0;bc<9;bc+=3){
    for(let v=1;v<=9;v++){
      // Check if v is already placed in this box
      let placed=false,spots=[];
      for(let dr=0;dr<3&&!placed;dr++)for(let dc=0;dc<3;dc++){
        const rr=br+dr,cc=bc+dc;
        if(g[rr][cc]===v){placed=true;break;}
        if(g[rr][cc]===0&&!isGiven(rr,cc)&&!conflict(rr,cc,v))spots.push({r:rr,c:cc});
      }
      if(placed)continue;
      if(spots.length===1&&sol[spots[0].r][spots[0].c]===v){
        return {r:spots[0].r,c:spots[0].c,msg:"Only spot for "+v+" in this box!"};
      }
    }
  }

  // c. Hidden Single in Row
  for(let r=0;r<9;r++){
    for(let v=1;v<=9;v++){
      let placed=false,spots=[];
      for(let c=0;c<9;c++){
        if(g[r][c]===v){placed=true;break;}
        if(g[r][c]===0&&!isGiven(r,c)&&!conflict(r,c,v))spots.push({r,c});
      }
      if(placed)continue;
      if(spots.length===1&&sol[spots[0].r][spots[0].c]===v){
        return {r:spots[0].r,c:spots[0].c,msg:"Only spot for "+v+" in this row!"};
      }
    }
  }

  // d. Hidden Single in Column
  for(let c=0;c<9;c++){
    for(let v=1;v<=9;v++){
      let placed=false,spots=[];
      for(let r=0;r<9;r++){
        if(g[r][c]===v){placed=true;break;}
        if(g[r][c]===0&&!isGiven(r,c)&&!conflict(r,c,v))spots.push({r,c});
      }
      if(placed)continue;
      if(spots.length===1&&sol[spots[0].r][spots[0].c]===v){
        return {r:spots[0].r,c:spots[0].c,msg:"Only spot for "+v+" in this column!"};
      }
    }
  }

  return null;
}

function giveHint(){
  if(!curPuzzle)return;
  if(hintsUsed>=MAX_HINTS){showToast("No hints remaining!",1500);return;}

  // Try to find a cell with a logical explanation first
  const explained=findExplainableCell();
  let pick,toastMsg;

  if(explained){
    pick={r:explained.r,c:explained.c};
    toastMsg=explained.msg;
  }else{
    // Fall back: find empty or wrong cells
    const targets=[];
    for(let r=0;r<9;r++)for(let c=0;c<9;c++){
      if(curPuzzle.user[r][c]===0) targets.push({r,c,priority:1});
      else if(curPuzzle.user[r][c]!==curPuzzle.sol[r][c]) targets.push({r,c,priority:0});
    }
    if(!targets.length)return;
    // Prefer wrong cells, then empty
    targets.sort((a,b)=>a.priority-b.priority);
    pick=targets[0].priority===0?targets[0]:targets[Math.random()*targets.length|0];
    toastMsg="Trust me on this one!";
  }

  // Actually reveal the correct digit
  pushHist();
  hintsUsed++;
  selectCell(pick.r,pick.c);
  curPuzzle.user[pick.r][pick.c]=curPuzzle.sol[pick.r][pick.c];
  curPuzzle.notes[pick.r][pick.c]=new Set();
  autoClearNotes(pick.r,pick.c,curPuzzle.sol[pick.r][pick.c]);
  // Track hint cells for visual distinction
  if(!curPuzzle.hintCells)curPuzzle.hintCells=new Set();
  curPuzzle.hintCells.add(`${pick.r},${pick.c}`);

  const cell=getCell(pick.r,pick.c);
  if(cell){
    cell.classList.add('hint-glow');
    setTimeout(()=>cell.classList.remove('hint-glow'),1500);
  }
  haptic(15);
  Audio.place();
  render();renderHintCount();
  showToast(toastMsg,2500);
  ellaSay("Here you go!",1500);

  // Check completions
  setTimeout(()=>{
    checkGroupCompletion(pick.r,pick.c);
    checkNumComplete(curPuzzle.sol[pick.r][pick.c]);
    checkWin();
  },200);
}

function pushHist(){
  history.push({u:curPuzzle.user.map(r=>[...r]),n:curPuzzle.notes.map(r=>r.map(s=>new Set(s)))});
  if(history.length>60)history.shift();
  redoStack=[];
}
function undo(){
  if(!history.length)return;
  redoStack.push({u:curPuzzle.user.map(r=>[...r]),n:curPuzzle.notes.map(r=>r.map(s=>new Set(s)))});
  const h=history.pop();curPuzzle.user=h.u;curPuzzle.notes=h.n;render();
  haptic([6,3,10]);
}
function redo(){
  if(!redoStack.length)return;
  history.push({u:curPuzzle.user.map(r=>[...r]),n:curPuzzle.notes.map(r=>r.map(s=>new Set(s)))});
  const h=redoStack.pop();curPuzzle.user=h.u;curPuzzle.notes=h.n;render();
  haptic([10,3,6]);
}

// ============== TOAST NOTIFICATIONS ==============
let toastTimer=null;
function showToast(msg,dur){
  const el=document.getElementById('game-toast');if(!el)return;
  el.textContent=msg;el.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer=setTimeout(()=>el.classList.remove('show'),dur||1800);
}

// ============== CONSTRAINT SATISFACTION TRACKING ==============
let satisfiedConstraints=new Set();
const ELLA_CONSTRAINT_LINES=["Purrfect constraint!","Meow! Nailed it!","That one's done!","So satisfying!","You're a natural!"];

// ============== ROW/COL/BOX COMPLETION ==============
let completedGroups=new Set();
function checkGroupCompletion(r,c){
  if(!curPuzzle)return;
  const g=curPuzzle.user,sol=curPuzzle.sol;
  const newCompletions=[];

  // Check row
  const rowKey='r'+r;
  if(!completedGroups.has(rowKey)){
    let rowDone=true;
    for(let cc=0;cc<9;cc++)if(g[r][cc]!==sol[r][cc]){rowDone=false;break;}
    if(rowDone){
      completedGroups.add(rowKey);
      newCompletions.push({type:'row',idx:r});
    }
  }

  // Check col
  const colKey='c'+c;
  if(!completedGroups.has(colKey)){
    let colDone=true;
    for(let rr=0;rr<9;rr++)if(g[rr][c]!==sol[rr][c]){colDone=false;break;}
    if(colDone){
      completedGroups.add(colKey);
      newCompletions.push({type:'col',idx:c});
    }
  }

  // Check box
  const br=Math.floor(r/3)*3,bc=Math.floor(c/3)*3;
  const boxKey='b'+br+bc;
  if(!completedGroups.has(boxKey)){
    let boxDone=true;
    for(let dr=0;dr<3;dr++)for(let dc=0;dc<3;dc++)if(g[br+dr][bc+dc]!==sol[br+dr][bc+dc]){boxDone=false;break;}
    if(boxDone){
      completedGroups.add(boxKey);
      newCompletions.push({type:'box',br,bc});
    }
  }

  // Animate completions
  newCompletions.forEach((comp,i)=>{
    setTimeout(()=>{
      let cells=[];
      if(comp.type==='row')for(let cc=0;cc<9;cc++)cells.push([r,cc]);
      else if(comp.type==='col')for(let rr=0;rr<9;rr++)cells.push([rr,c]);
      else for(let dr=0;dr<3;dr++)for(let dc=0;dc<3;dc++)cells.push([comp.br+dr,comp.bc+dc]);

      animateGroupComplete(cells);
      // Richer ascending chime
      const base=comp.type==='row'?523:comp.type==='col'?659:784;
      try{
        const ctx=Audio.getCtx();
        [base,base*1.25,base*1.5].forEach((f,j)=>setTimeout(()=>{
          const o=ctx.createOscillator(),gn=ctx.createGain();
          o.type='sine';o.frequency.value=f;gn.gain.value=.07;
          gn.gain.exponentialRampToValueAtTime(.001,ctx.currentTime+.25);
          o.connect(gn);gn.connect(ctx.destination);o.start();o.stop(ctx.currentTime+.25);
        },j*70));
      }catch(e){}
    },i*200);
  });

  if(newCompletions.length>0){
    haptic(15);
    const total=completedGroups.size;
    // Ella reacts to completed groups with type-specific messages
    const ellaGroupRow=["Full row! Meow!","Purrfect row!","Row done, princess!","That row is flawless!"];
    const ellaGroupCol=["Column cleared! Mew!","A whole column! Wow!","Column complete, yay!"];
    const ellaGroupBox=["Full box! Nya~","Box done! So smart!","That box is purrfect!"];
    const ellaGroupMulti=["Double completion! Amazing!","So clean!","You're on fire, meow!"];
    if(newCompletions.length>=2){
      ellaSayTypewriter(ellaGroupMulti[Math.random()*ellaGroupMulti.length|0],2000);
    }else{
      const comp=newCompletions[0];
      const lines=comp.type==='row'?ellaGroupRow:comp.type==='col'?ellaGroupCol:ellaGroupBox;
      ellaSayTypewriter(lines[Math.random()*lines.length|0],2000);
    }
  }
}

function animateGroupComplete(cells){
  cells.forEach(([r,c],i)=>{
    const cell=getCell(r,c);
    if(!cell)return;
    setTimeout(()=>{
      cell.classList.add('group-done');
      setTimeout(()=>cell.classList.remove('group-done'),600);
      // Golden shimmer sweep with staggered delay
      cell.classList.add('group-shimmer');
      setTimeout(()=>cell.classList.remove('group-shimmer'),800);
    },i*30);
  });
  // Firework burst from center of completed group
  const midIdx=Math.floor(cells.length/2);
  const midCell=getCell(cells[midIdx][0],cells[midIdx][1]);
  if(midCell){
    const rect=midCell.getBoundingClientRect();
    const cx=rect.left+rect.width/2,cy=rect.top+rect.height/2;
    spawnFirework(cx,cy);
  }
}

function spawnFirework(cx,cy){
  for(let i=0;i<16;i++){
    const p=document.createElement('div');p.className='sparkle-particle';
    const angle=(i/16)*Math.PI*2+Math.random()*.2;
    const dist=40+Math.random()*50;
    const dx=Math.cos(angle)*dist,dy=Math.sin(angle)*dist;
    const sz=2+Math.random()*4;
    p.style.cssText=`left:${cx}px;top:${cy}px;width:${sz}px;height:${sz}px;--dx:${dx}px;--dy:${dy}px;animation-delay:${Math.random()*80}ms;background:${PARTY_COLORS[i%PARTY_COLORS.length]};box-shadow:0 0 6px ${PARTY_COLORS[i%PARTY_COLORS.length]};animation-duration:.7s`;
    document.body.appendChild(p);
    p.addEventListener('animationend',()=>p.remove());
  }
}

// ============== NUMBER COMPLETION ==============
function checkNumComplete(n){
  if(!curPuzzle)return;
  const g=curPuzzle.user,sol=curPuzzle.sol;
  let count=0;
  for(let r=0;r<9;r++)for(let c=0;c<9;c++){
    if(g[r][c]===n&&g[r][c]===sol[r][c])count++;
  }
  // QoL: when 8/9 placed correctly, pulse the last remaining cell for this digit
  if(count===8){
    for(let r=0;r<9;r++)for(let c=0;c<9;c++){
      if(sol[r][c]===n&&g[r][c]!==n){
        const cell=cellGrid[r][c];
        cell.classList.add('last-digit-pulse');
        setTimeout(()=>cell.classList.remove('last-digit-pulse'),3000);
      }
    }
  }

  if(count===9){
    // All 9 of this digit placed correctly — golden shimmer on every cell
    for(let r=0;r<9;r++)for(let c=0;c<9;c++){
      if(curPuzzle.user[r][c]===n){
        const cell=cellGrid[r][c];
        cell.classList.add('num-complete-flash');
        setTimeout(()=>cell.classList.remove('num-complete-flash'),800);
      }
    }
    // Mark numpad button as permanently completed
    const btn=document.querySelector(`.num-btn[data-num="${n}"]`);
    if(btn){
      btn.classList.add('num-complete');
      btn.classList.add('completed');
    }
    showToast(`All ${n}'s placed!`,1200);
    // Sparkle sound
    try{
      const ctx=Audio.getCtx();
      [523,659,784].forEach((f,i)=>setTimeout(()=>{
        const o=ctx.createOscillator(),gn=ctx.createGain();
        o.type='sine';o.frequency.value=f;gn.gain.value=.06;
        gn.gain.exponentialRampToValueAtTime(.001,ctx.currentTime+.2);
        o.connect(gn);gn.connect(ctx.destination);o.start();o.stop(ctx.currentTime+.2);
      },i*80));
    }catch(e){}
  }
}

function conflict(r,c,v){
  if(!curPuzzle)return false;
  const g=curPuzzle.user;
  for(let i=0;i<9;i++){if(i!==c&&g[r][i]===v)return true;if(i!==r&&g[i][c]===v)return true;}
  const br=Math.floor(r/3)*3,bc=Math.floor(c/3)*3;
  for(let dr=0;dr<3;dr++)for(let dc=0;dc<3;dc++){const rr=br+dr,cc=bc+dc;if(rr!==r&&cc!==c&&g[rr][cc]===v)return true;}
  return false;
}

// Highlight cells that conflict with a placed digit
function highlightConflicts(r,c,v){
  const g=curPuzzle.user;
  const conflicts=[];
  for(let i=0;i<9;i++){
    if(i!==c&&g[r][i]===v)conflicts.push([r,i]);
    if(i!==r&&g[i][c]===v)conflicts.push([i,c]);
  }
  const br=Math.floor(r/3)*3,bc=Math.floor(c/3)*3;
  for(let dr=0;dr<3;dr++)for(let dc=0;dc<3;dc++){
    const rr=br+dr,cc=bc+dc;
    if((rr!==r||cc!==c)&&g[rr][cc]===v)conflicts.push([rr,cc]);
  }
  conflicts.forEach(([cr,cc])=>{
    const cell=getCell(cr,cc);
    if(cell){cell.classList.add('conflict-flash');setTimeout(()=>cell.classList.remove('conflict-flash'),900);}
  });
}

// Sparkle particles on correct placement — combo-scaled
function spawnParticles(r,c,comboLevel){
  comboLevel=comboLevel||0;
  const cell=getCell(r,c);
  if(!cell)return;
  const rect=cell.getBoundingClientRect();
  const cx=rect.left+rect.width/2,cy=rect.top+rect.height/2;
  const colors=comboLevel>=2
    ?['#FFD700','#fff','#ffeb3b','#ff4081','#e91e63','#ce93d8','#64b5f6','#81c784']
    :comboLevel>=1
    ?['#e91e63','#FFD700','#ff5722','#f48fb1','#ff9800','#fff']
    :['#e91e63','#ff5722','#FFD700','#f48fb1','#ff9800','#ce93d8','#fff','#ff4081'];
  const count=comboLevel>=2?20:comboLevel>=1?16:12;
  const maxDist=comboLevel>=2?70:comboLevel>=1?55:40;
  const maxSize=comboLevel>=2?7:comboLevel>=1?5.5:4;
  for(let i=0;i<count;i++){
    const p=document.createElement('div');p.className='sparkle-particle';
    const angle=Math.random()*Math.PI*2;
    const dist=20+Math.random()*maxDist;
    const dx=Math.cos(angle)*dist,dy=Math.sin(angle)*dist;
    const sz=3+Math.random()*maxSize;
    p.style.cssText=`left:${cx}px;top:${cy}px;width:${sz}px;height:${sz}px;--dx:${dx}px;--dy:${dy}px;animation-delay:${i*20}ms;background:${colors[i%colors.length]};box-shadow:0 0 ${comboLevel>=1?'4':'2'}px ${colors[i%colors.length]}`;
    document.body.appendChild(p);
    p.addEventListener('animationend',()=>p.remove());
  }
}

function render(){
  const g=curPuzzle.user,sol=curPuzzle.sol;
  const sn=selCell?g[selCell.r][selCell.c]:0;
  // Determine highlight number: selected cell value, or selected numpad digit
  const hlNum=sn>0?sn:selectedNum;
  const cnt={};
  let filled=0,correct=0;
  for(let r=0;r<9;r++)for(let c=0;c<9;c++){
    if(g[r][c]>0){cnt[g[r][c]]=(cnt[g[r][c]]||0)+1;filled++;}
    if(g[r][c]===sol[r][c]&&g[r][c]>0)correct++;
  }

  for(let r=0;r<9;r++)for(let c=0;c<9;c++){
    const cell=cellGrid[r][c],v=g[r][c],giv=isGiven(r,c);
    cell.className='cell';cell.innerHTML='';
    // Alternating 3x3 box tint (checkerboard pattern)
    const boxR=Math.floor(r/3),boxC=Math.floor(c/3);
    if((boxR+boxC)%2===1) cell.classList.add('box-alt');
    // cage classes removed – cages now rendered via SVG overlay

    if(giv){cell.classList.add('given');cell.textContent=v;}
    else if(v>0){
      const isHint=curPuzzle.hintCells&&curPuzzle.hintCells.has(`${r},${c}`);
      cell.classList.add(isHint?'hint-val':'user-val');cell.textContent=v;
      if(v!==sol[r][c])cell.classList.add('error');
      else cell.classList.add('correct');
    }else{
      const marks=curPuzzle.notes[r][c];
      if(marks.size){
        const d=document.createElement('div');d.className='notes';
        if(cell._cageLabel) d.classList.add('has-cage-label');
        for(let n=1;n<=9;n++){
          const s=document.createElement('span');
          s.textContent=marks.has(n)?n:'';
          if(marks.has(n)&&n===hlNum)s.classList.add('hl');
          d.appendChild(s);
        }
        cell.appendChild(d);
      }
    }
    if(selCell){
      if(r===selCell.r&&c===selCell.c)cell.classList.add('selected');
      else if(r===selCell.r||c===selCell.c||
        (Math.floor(r/3)===Math.floor(selCell.r/3)&&Math.floor(c/3)===Math.floor(selCell.c/3)))
        cell.classList.add('peer');
    }
    // Highlight all multi-selected cells in pencil mode
    if(selectedCells.has(r+','+c)&&!(selCell&&r===selCell.r&&c===selCell.c)){
      cell.classList.add('multi-selected');
    }
    // Highlight all cells with the same number
    if(hlNum>0&&v===hlNum&&!(selCell&&r===selCell.r&&c===selCell.c))cell.classList.add('same-num');
    // Re-add cage labels
    // cage label removed from DOM – now rendered in SVG overlay
  }

  // Progress bar with color gradient
  const pct=filled/81*100;
  const pf=document.getElementById('progress-fill');
  pf.style.width=pct+'%';
  if(pct>=90)pf.classList.add('almost');else pf.classList.remove('almost');
  // progress text removed — thin line only

  // Numpad — remaining count, selected state, done state
  document.querySelectorAll('.num-btn').forEach(b=>{
    const num=+b.dataset.num,used=cnt[num]||0;
    const isDone=used>=9;
    b.classList.toggle('done',isDone);
    b.classList.toggle('completed',isDone);
    b.classList.toggle('sel',num===selectedNum&&!pencilMode&&!isDone);
    b.classList.toggle('digit-locked',digitFirstMode&&num===selectedNum&&!pencilMode&&!isDone);
    let sub=b.querySelector('.num-remain');
    if(used>0&&used<9){
      if(!sub){sub=document.createElement('span');sub.className='num-remain';b.appendChild(sub);}
      sub.textContent=9-used;
    }else if(sub){sub.remove();}
  });
}

// ============== CONSTRAINTS DRAWING ==============
function drawConstraints(){
  const svg=document.getElementById('board-overlay');svg.innerHTML='';
  const cs=50; // viewBox 450/9

  for(let r=0;r<9;r++)for(let c=0;c<9;c++){const cell=cellGrid[r][c];cell._cageClasses=[];cell._cageLabel=null;}

  const pz=PUZZLES[curWeek];
  const activeTypes=new Set();

  // SVG defs
  const defs=document.createElementNS('http://www.w3.org/2000/svg','defs');
  svg.appendChild(defs);

  // Draw clean SVG grid lines (renders crisper than CSS borders)
  const gridG=svgEl('g',{'data-grid':'true','pointer-events':'none'});
  for(let i=1;i<9;i++){
    const thick=i%3===0;
    const w=thick?'1.5':'0.8';
    const col=thick?'#333':'#d0d0d0';
    gridG.appendChild(svgEl('line',{x1:0,y1:i*cs,x2:9*cs,y2:i*cs,stroke:col,'stroke-width':w}));
    gridG.appendChild(svgEl('line',{x1:i*cs,y1:0,x2:i*cs,y2:9*cs,stroke:col,'stroke-width':w}));
  }
  svg.appendChild(gridG);

  // Helpers
  function pt(r,c){return{x:c*cs+cs/2,y:r*cs+cs/2};}
  function smoothPath(pts){
    if(pts.length<2)return`M${pts[0].x},${pts[0].y}`;
    if(pts.length===2)return`M${pts[0].x},${pts[0].y} L${pts[1].x},${pts[1].y}`;
    let d=`M${pts[0].x},${pts[0].y}`;
    for(let i=0;i<pts.length-1;i++){
      const p0=pts[Math.max(0,i-1)],p1=pts[i],p2=pts[i+1],p3=pts[Math.min(pts.length-1,i+2)];
      d+=` C${p1.x+(p2.x-p0.x)/6},${p1.y+(p2.y-p0.y)/6} ${p2.x-(p3.x-p1.x)/6},${p2.y-(p3.y-p1.y)/6} ${p2.x},${p2.y}`;
    }
    return d;
  }
  function svgEl(tag,attrs){
    const el=document.createElementNS('http://www.w3.org/2000/svg',tag);
    for(const[k,v]of Object.entries(attrs))el.setAttribute(k,v);
    return el;
  }

  // Deferred cage labels – collected during cage drawing, rendered last
  const deferredCageLabels=[];

  // ---- 1. Killer cages (dashed outlines, behind everything) ----
  if(pz.cages&&pz.cages.length){
    activeTypes.add('killer');
    const IN=3.5;
    pz.cages.forEach(cage=>{
      const set=new Set(cage.c.map(([r,c])=>`${r},${c}`));
      const g=svgEl('g',{'data-constraint':'killer'});

      // Collect directed boundary edges (CW in SVG coords)
      const edgeMap=new Map();
      for(const [r,c] of cage.c){
        if(!set.has(`${r-1},${c}`)) edgeMap.set(`${r},${c}`,`${r},${c+1}`);
        if(!set.has(`${r},${c+1}`)) edgeMap.set(`${r},${c+1}`,`${r+1},${c+1}`);
        if(!set.has(`${r+1},${c}`)) edgeMap.set(`${r+1},${c+1}`,`${r+1},${c}`);
        if(!set.has(`${r},${c-1}`)) edgeMap.set(`${r+1},${c}`,`${r},${c}`);
      }

      // Trace boundary into continuous loops
      const visited=new Set();
      let pathD='';
      for(const [start] of edgeMap){
        if(visited.has(start))continue;
        const verts=[];
        let cur=start;
        while(cur&&!visited.has(cur)){visited.add(cur);verts.push(cur);cur=edgeMap.get(cur);}
        if(verts.length<3)continue;

        // Convert to SVG pixel coords
        const pts=verts.map(v=>{const[r,c]=v.split(',').map(Number);return{x:c*cs,y:r*cs};});
        const n=pts.length;

        // Compute inset at each vertex using left-hand normals (interior side in SVG CW)
        const ip=[];
        for(let i=0;i<n;i++){
          const prev=pts[(i-1+n)%n],curr=pts[i],next=pts[(i+1)%n];
          const dix=curr.x-prev.x,diy=curr.y-prev.y;
          const dox=next.x-curr.x,doy=next.y-curr.y;
          let ox=curr.x,oy=curr.y;
          // Horizontal edge → y offset; Vertical edge → x offset
          if(dix!==0) oy=curr.y+(dix>0?IN:-IN); else if(dox!==0) oy=curr.y+(dox>0?IN:-IN);
          if(diy!==0) ox=curr.x+(diy>0?-IN:IN); else if(doy!==0) ox=curr.x+(doy>0?-IN:IN);
          ip.push({x:ox,y:oy});
        }

        pathD+=`M${ip[0].x.toFixed(1)},${ip[0].y.toFixed(1)}`;
        for(let i=1;i<ip.length;i++) pathD+=`L${ip[i].x.toFixed(1)},${ip[i].y.toFixed(1)}`;
        pathD+='Z ';
      }

      if(pathD.trim()){
        // Subtle fill to make cage area visible even without reading the outline
        g.appendChild(svgEl('path',{d:pathD.trim(),fill:'rgba(0,0,0,.03)',stroke:'none'}));
        // Solid thin outline — crisp and visible at any screen size
        g.appendChild(svgEl('path',{d:pathD.trim(),fill:'none',stroke:'#000','stroke-width':'1.2','stroke-linejoin':'round','stroke-linecap':'round'}));
      }

      // Collect cage sum label data for deferred rendering
      let tl=cage.c[0];cage.c.forEach(([r,c])=>{if(r<tl[0]||(r===tl[0]&&c<tl[1]))tl=[r,c];});
      deferredCageLabels.push({x:tl[1]*cs+IN+1.5,y:tl[0]*cs+IN+8.5,s:cage.s});
      svg.appendChild(g);
      cage.c.forEach(([r,c])=>{const cell=getCell(r,c);if(cell)cell._cageClasses=[];});
      if(tl){const tlCell=getCell(tl[0],tl[1]);if(tlCell)tlCell._cageLabel=cage.s;}
    });
  }

  // ---- 2. Thermos (thick gray, background layer) ----
  if(pz.thermos&&pz.thermos.length){
    activeTypes.add('thermo');
    pz.thermos.forEach(th=>{
      if(th.length<2)return;
      const g=svgEl('g',{'data-constraint':'thermo'});
      const pts=th.map(([r,c])=>pt(r,c));
      g.appendChild(svgEl('path',{d:smoothPath(pts),fill:'none',stroke:'#B0BEC5','stroke-width':'8','stroke-linecap':'round','stroke-linejoin':'round',opacity:'.7'}));
      g.appendChild(svgEl('circle',{cx:pts[0].x,cy:pts[0].y,r:'14',fill:'#B0BEC5',opacity:'.65'}));
      svg.appendChild(g);
    });
  }

  // ---- 3. Palindrome lines ----
  if(pz.palindromes&&pz.palindromes.length){
    activeTypes.add('palindrome');
    pz.palindromes.forEach(pl=>{
      if(pl.length<2)return;
      const g=svgEl('g',{'data-constraint':'palindrome'});
      const pts=pl.map(([r,c])=>pt(r,c));
      g.appendChild(svgEl('path',{d:smoothPath(pts),fill:'none',stroke:'#EC407A','stroke-width':'5','stroke-linecap':'round','stroke-linejoin':'round',opacity:'.5'}));
      svg.appendChild(g);
    });
  }

  // ---- 4. Renban lines (PURPLE) ----
  if(pz.renbans&&pz.renbans.length){
    activeTypes.add('renban');
    pz.renbans.forEach(rb=>{
      if(rb.length<2)return;
      const g=svgEl('g',{'data-constraint':'renban'});
      const pts=rb.map(([r,c])=>pt(r,c));
      g.appendChild(svgEl('path',{d:smoothPath(pts),fill:'none',stroke:'#7B1FA2','stroke-width':'5','stroke-linecap':'round','stroke-linejoin':'round',opacity:'.55'}));
      svg.appendChild(g);
    });
  }

  // ---- 5. German Whisper lines (GREEN) ----
  if(pz.whispers&&pz.whispers.length){
    activeTypes.add('whisper');
    pz.whispers.forEach(wh=>{
      if(wh.length<2)return;
      const g=svgEl('g',{'data-constraint':'whisper'});
      const pts=wh.map(([r,c])=>pt(r,c));
      g.appendChild(svgEl('path',{d:smoothPath(pts),fill:'none',stroke:'#43A047','stroke-width':'5','stroke-linecap':'round','stroke-linejoin':'round',opacity:'.5'}));
      svg.appendChild(g);
    });
  }

  // ---- 6. Dutch Whisper lines (ORANGE) ----
  if(pz.dutchWhispers&&pz.dutchWhispers.length){
    activeTypes.add('dutch');
    pz.dutchWhispers.forEach(dw=>{
      if(dw.length<2)return;
      const g=svgEl('g',{'data-constraint':'dutch'});
      const pts=dw.map(([r,c])=>pt(r,c));
      g.appendChild(svgEl('path',{d:smoothPath(pts),fill:'none',stroke:'#EF6C00','stroke-width':'5','stroke-linecap':'round','stroke-linejoin':'round',opacity:'.5'}));
      svg.appendChild(g);
    });
  }

  // ---- 7. Arrows (circle + line + arrowhead) ----
  if(pz.arrows&&pz.arrows.length){
    activeTypes.add('arrow');
    pz.arrows.forEach(ar=>{
      const g=svgEl('g',{'data-constraint':'arrow'});
      const cx=ar.o[1]*cs+cs/2,cy=ar.o[0]*cs+cs/2;
      g.appendChild(svgEl('circle',{cx,cy,r:'19',fill:'none',stroke:'#3949AB','stroke-width':'1.8',opacity:'.8'}));
      if(ar.a.length){
        const pts=[{x:cx,y:cy},...ar.a.map(([r,c])=>pt(r,c))];
        g.appendChild(svgEl('path',{d:smoothPath(pts),fill:'none',stroke:'#3949AB','stroke-width':'2.5','stroke-linecap':'round','stroke-linejoin':'round',opacity:'.8'}));
        const last=pts[pts.length-1],prev=pts[pts.length-2];
        const ang=Math.atan2(last.y-prev.y,last.x-prev.x),hl=10;
        g.appendChild(svgEl('polygon',{points:[`${last.x},${last.y}`,`${last.x-hl*Math.cos(ang-.45)},${last.y-hl*Math.sin(ang-.45)}`,`${last.x-hl*Math.cos(ang+.45)},${last.y-hl*Math.sin(ang+.45)}`].join(' '),fill:'#3949AB',opacity:'.8'}));
      }
      svg.appendChild(g);
    });
  }

  // ---- 8. Kropki dots (on top of lines) ----
  if(pz.kropki&&pz.kropki.length){
    activeTypes.add('kropki');
    pz.kropki.forEach(k=>{
      const [[r1,c1],[r2,c2]]=k.c;
      const mx=(c1+c2)/2*cs+cs/2,my=(r1+r2)/2*cs+cs/2;
      const g=svgEl('g',{'data-constraint':'kropki'});
      const isBlack=k.t==='b';
      g.appendChild(svgEl('circle',{cx:mx,cy:my,r:'7',fill:isBlack?'#222':'#fff',stroke:'#333','stroke-width':'1.5'}));
      svg.appendChild(g);
    });
  }

  // ---- 9. Cage labels (text, always on top of everything) ----
  if(deferredCageLabels.length){
    const labelG=svgEl('g',{'data-constraint':'killer-labels','pointer-events':'none'});
    deferredCageLabels.forEach(lb=>{
      // White halo behind label for readability
      const halo=svgEl('text',{x:lb.x,y:lb.y,fill:'#fff',stroke:'#fff','stroke-width':'3','font-size':'11','font-weight':'800','font-family':"'Quicksand',sans-serif",'pointer-events':'none','paint-order':'stroke'});
      halo.textContent=lb.s;
      labelG.appendChild(halo);
      const label=svgEl('text',{x:lb.x,y:lb.y,fill:'#B71C1C','font-size':'11','font-weight':'800','font-family':"'Quicksand',sans-serif",'pointer-events':'none'});
      label.textContent=lb.s;
      labelG.appendChild(label);
    });
    svg.appendChild(labelG);
  }

  // Track anti-knight/king
  if(pz.knights)activeTypes.add('knight');
  if(pz.kings)activeTypes.add('king');

  buildConstraintLegend(activeTypes);
}

// ============== CONSTRAINT LEGEND ==============
function buildConstraintLegend(types){
  const el=document.getElementById('constraint-legend');if(!el)return;
  el.innerHTML='';
  const defs={
    killer:{color:'#000',label:'Cages',shape:'line'},
    thermo:{color:'#B0BEC5',label:'Thermo',shape:'line'},
    arrow:{color:'#3949AB',label:'Arrow',shape:'dot'},
    whisper:{color:'#43A047',label:'Whisper',shape:'line'},
    kropki:{color:'#888',label:'Kropki',shape:'dot'},
    palindrome:{color:'#EC407A',label:'Palindrome',shape:'line'},
    renban:{color:'#7B1FA2',label:'Renban',shape:'line'},
    dutch:{color:'#EF6C00',label:'Dutch',shape:'line'},
    knight:{color:'#42A5F5',label:'Anti-Knight',shape:'dot'},
    king:{color:'#E91E63',label:'Anti-King',shape:'dot'}
  };
  const tips={
    killer:'Cage digits sum to the clue. No repeats.',
    thermo:'Digits increase from bulb to tip.',
    arrow:'Circled digit = sum of arrow digits.',
    whisper:'Adjacent digits differ by \u22655.',
    kropki:'White: differ by 1. Black: one is double.',
    palindrome:'Reads the same forwards & backwards.',
    renban:'Consecutive digits in any order.',
    dutch:'Adjacent digits differ by \u22654.',
    knight:'Same digit can\'t be a knight\'s move apart.',
    king:'Same digit can\'t be diagonally adjacent.'
  };
  types.forEach(t=>{
    const d=defs[t];if(!d)return;
    const item=document.createElement('div');item.className='cl-item';item.dataset.type=t;
    const shape=d.shape==='dot'?`<span class="cl-dot" style="background:${d.color}"></span>`
      :d.shape==='dash'?`<span class="cl-dash" style="color:${d.color}"></span>`
      :`<span class="cl-line" style="background:${d.color}"></span>`;
    item.innerHTML=`${shape}${d.label}`;
    item.addEventListener('click',()=>{
      // Show tooltip
      const tip=document.getElementById('constraint-tip');
      tip.textContent=tips[t]||'';
      tip.classList.add('show');
      clearTimeout(tip._t);tip._t=setTimeout(()=>tip.classList.remove('show'),2500);
      // Highlight matching constraints on board
      document.querySelectorAll('#board-overlay g.constraint-hl').forEach(g=>g.classList.remove('constraint-hl'));
      document.querySelectorAll(`#board-overlay g[data-constraint="${t}"]`).forEach(g=>{
        g.classList.add('constraint-hl');
        setTimeout(()=>g.classList.remove('constraint-hl'),2000);
      });
    });
    el.appendChild(item);
  });
}

// ============== ANTI-KNIGHT/KING ZONE ==============
function updateAntiZones(r,c){
  for(let rr=0;rr<9;rr++)for(let cc=0;cc<9;cc++){const cell=cellGrid[rr][cc];cell.classList.remove('knight-zone','king-zone');}
  if(!curPuzzle)return;
  const pz=PUZZLES[curWeek];
  if(pz.knights){
    [[-2,-1],[-2,1],[-1,-2],[-1,2],[1,-2],[1,2],[2,-1],[2,1]].forEach(([dr,dc])=>{
      const nr=r+dr,nc=c+dc;
      if(nr>=0&&nr<9&&nc>=0&&nc<9) cellGrid[nr][nc].classList.add('knight-zone');
    });
  }
  if(pz.kings){
    [[-1,-1],[-1,1],[1,-1],[1,1]].forEach(([dr,dc])=>{
      const nr=r+dr,nc=c+dc;
      if(nr>=0&&nr<9&&nc>=0&&nc<9) cellGrid[nr][nc].classList.add('king-zone');
    });
  }
}

function checkWin(){
  const g=curPuzzle.user,sol=curPuzzle.sol;
  for(let r=0;r<9;r++)for(let c=0;c<9;c++)if(g[r][c]!==sol[r][c])return;
  // WIN!
  stopTimer();stopEllaIdleWatch();
  state.puzzles[curWeek].done=true;state.puzzles[curWeek].at=new Date().toISOString();
  state.puzzles[curWeek].t=elapsed;state.puzzles[curWeek].g=null;
  state.puzzles[curWeek].m=mistakes;state.puzzles[curWeek].h=hintsUsed;
  state.puzzles[curWeek].n=null;state.puzzles[curWeek].hc=null;save();
  // Update stats
  stats.totalSolves++;stats.totalTime+=elapsed;stats.totalMistakes+=mistakes;stats.totalHints+=hintsUsed;
  if(mistakes===0)stats.perfectRuns++;
  if(elapsed<stats.fastestSolve)stats.fastestSolve=elapsed;
  saveStats();
  // Multi-stage celebration sequence
  winSequence();
}

function playRisingChord(){
  try{
    const ctx=Audio.getCtx();
    const now=ctx.currentTime;
    // Rising major chord: C5 -> E5 -> G5 -> C6, staggered with harmonics
    const notes=[523,659,784,1047];
    const harmonics=[262,330,392,523];
    notes.forEach((f,i)=>{
      const o=ctx.createOscillator(),gn=ctx.createGain();
      o.type='sine';o.frequency.value=f;gn.gain.value=.1;
      gn.gain.setValueAtTime(.1,now+i*.12);
      gn.gain.exponentialRampToValueAtTime(.001,now+i*.12+.8);
      o.connect(gn);gn.connect(ctx.destination);o.start(now+i*.12);o.stop(now+i*.12+.8);
    });
    // Soft harmony layer underneath
    harmonics.forEach((f,i)=>{
      const o=ctx.createOscillator(),gn=ctx.createGain();
      o.type='triangle';o.frequency.value=f;gn.gain.value=.04;
      gn.gain.exponentialRampToValueAtTime(.001,now+i*.12+1);
      o.connect(gn);gn.connect(ctx.destination);o.start(now+i*.12+.04);o.stop(now+i*.12+1);
    });
  }catch(e){}
}

function winSequence(){
  const bw=document.querySelector('.board-wrap');

  // === Stage 1 (0ms): Rising chord + golden glow + last-cell flash ===
  playRisingChord();
  if(bw) bw.classList.add('golden');
  // Flash the last-placed cell with extra emphasis
  if(selCell){
    const lastCell=cellGrid[selCell.r][selCell.c];
    lastCell.classList.add('cell-last-placed');
    setTimeout(()=>lastCell.classList.remove('cell-last-placed'),1200);
  }

  // === Stage 2 (300ms): Board wave + Ella extreme happiness ===
  setTimeout(()=>{
    boardWave();
    const el=ellaEl();
    el.classList.remove('heart');void el.offsetWidth;el.classList.add('heart');
    el.classList.add('purring');
    const winMsg=['YOU DID IT!!','MAGNIFIQUE!!'][Math.random()*2|0];
    ellaSayTypewriter(winMsg,2200);
    haptic([20,10,20,10,20]);
  },300);

  // === Stage 3 (800ms): Board zoom — satisfying completion moment ===
  setTimeout(()=>{
    if(bw) bw.classList.add('board-zoom');
  },800);

  // === Stage 4 (1500ms): Remove board effects + transition to celebration ===
  setTimeout(()=>{
    if(bw){bw.classList.remove('golden','board-zoom');}
    const el=ellaEl();
    el.classList.remove('purring','heart');
    celebrate();
  },1500);
}

function saveProgress(showIndicator){
  if(curWeek>=0&&curPuzzle){
    state.puzzles[curWeek].g=curPuzzle.user.map(r=>[...r]);
    state.puzzles[curWeek].t=elapsed;
    // Save notes
    state.puzzles[curWeek].n=curPuzzle.notes.map(r=>r.map(s=>[...s]));
    state.puzzles[curWeek].m=mistakes;
    state.puzzles[curWeek].h=hintsUsed;
    state.puzzles[curWeek].hc=curPuzzle.hintCells?[...curPuzzle.hintCells]:null;
    save();
    if(showIndicator) flashSaveIndicator();
  }
}

function flashSaveIndicator(){
  let si=document.getElementById('save-indicator');
  if(!si){
    si=document.createElement('div');si.id='save-indicator';
    si.innerHTML='<svg viewBox="0 0 24 24" width="12" height="12"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" fill="currentColor"/></svg> Saved';
    document.body.appendChild(si);
  }
  si.classList.remove('show');void si.offsetWidth;si.classList.add('show');
  setTimeout(()=>si.classList.remove('show'),1500);
}

// Timer
function startTimer(){stopTimer();updTimer();timer=setInterval(()=>{elapsed++;updTimer();if(elapsed%10===0)updateTimerColor();},1000);}
function stopTimer(){if(timer){clearInterval(timer);timer=null;}}
function updTimer(){
  const m=Math.floor(elapsed/60),s=elapsed%60;
  document.getElementById('game-timer').textContent=String(m).padStart(2,'0')+':'+String(s).padStart(2,'0');
}
function fmtTimeLong(t){const m=Math.floor(t/60),s=t%60;return m?m+'m '+s+'s':s+'s';}

// ============== CELEBRATION ==============
function celebrate(){
  const msg=CELEB[curWeek]||CELEB[0];
  document.getElementById('celeb-title').textContent=msg[0];
  document.getElementById('celeb-msg').textContent=msg[1];
  document.getElementById('celeb-time').textContent=fmtTimeLong(elapsed);
  // Best time tracking
  const key='w'+curWeek;
  const isBest=!bestTimes[key]||elapsed<bestTimes[key];
  if(isBest){bestTimes[key]=elapsed;localStorage.setItem('celina-best',JSON.stringify(bestTimes));}
  // Show mistakes count
  document.getElementById('celeb-mistakes').textContent=mistakes;
  // Show best time
  const btEl=document.getElementById('celeb-best');
  if(btEl){
    btEl.textContent=isBest?'New best!':fmtTimeLong(bestTimes[key]);
    if(isBest)btEl.classList.add('new-best');else btEl.classList.remove('new-best');
  }
  const pz=PUZZLES[curWeek];
  const rw=document.getElementById('celeb-reward');
  // Star rating based on mistakes
  const stars=mistakes===0?3:mistakes<=2?2:1;
  let starsHtml='';
  for(let i=0;i<3;i++)starsHtml+=`<span class="celeb-star${i<stars?' lit':''}">\u2605</span>`;
  let html=`<div class="celeb-stars">${starsHtml}</div>`;
  // Flawless badge for zero-mistake runs
  if(mistakes===0) html+=`<div class="celeb-flawless">FLAWLESS!</div>`;
  html+=`<strong>${pz.emoji} Week ${curWeek+1} Complete!</strong><p>${pz.reward}</p>`;
  const doneNow=state.puzzles.filter(p=>p.done).length;
  const isAllDone=doneNow>=4;
  if(isAllDone) html+=`<br><p style="font-weight:700;color:var(--pink-600)" class="celeb-all-done">\uD83C\uDF81 You conquered them ALL! Your reward awaits!</p>`;
  else html+=`<br><p style="font-weight:700;color:var(--gold-soft)">${4-doneNow} more puzzle${4-doneNow>1?'s':''} to unlock your reward!</p>`;
  rw.innerHTML=html;
  // boardWave already ran in winSequence stage 2
  setTimeout(()=>{
    viewWipe();
    showView('celebration');
    // Staggered celebration effects
    animateStatCounters();
    Audio.success();
    haptic([80,40,80,40,150]);
    confetti();
    cornerBursts();
    ellaLeaveGame();
    ellaWinDance();
    const el=ellaEl();
    el.classList.add('purring');
    el.classList.remove('heart');void el.offsetWidth;el.classList.add('heart');
    ellaSayTypewriter(mistakes===0?"PURRFECT! Zero mistakes!!!":"MEWWW! AMAZING!!!",5000);
    // Second + third wave of haptic + confetti
    setTimeout(()=>{haptic([30,20,30]);confetti();cornerBursts();},1500);
    setTimeout(()=>{haptic([20,15,20]);confetti();},3200);
    // Double confetti for completing ALL puzzles
    if(isAllDone){
      setTimeout(()=>{confetti();cornerBursts();haptic([40,20,40,20,40]);},2000);
      setTimeout(()=>{confetti();cornerBursts();},3800);
    }
    setTimeout(()=>el.classList.remove('purring','heart'),5000);
    // Achievements
    checkAchievements();
  },800);
  notifyPuzzleComplete(curWeek+1, pz.name, fmtTimeLong(elapsed));
}

function shareResult(){
  const pz=PUZZLES[curWeek];
  const stars=mistakes===0?'⭐⭐⭐':mistakes<=2?'⭐⭐':'⭐';
  const hearts='❤️'.repeat(MAX_MISTAKES-mistakes)+'🤍'.repeat(mistakes);
  const text=`🌹 Celina's Puzzle Garden\nWeek ${curWeek+1}: ${pz.name}\n${stars} ${fmtTimeLong(elapsed)}\n${hearts}\n${mistakes===0?'✨ FLAWLESS! ✨':''}`;
  if(navigator.share){
    navigator.share({text}).catch(()=>{});
  }else if(navigator.clipboard){
    navigator.clipboard.writeText(text).then(()=>showToast('Copied to clipboard!',1500)).catch(()=>showToast('Could not copy',1200));
  }
}

function boardWave(){
  const bw=document.querySelector('.board-wrap');
  if(bw)bw.classList.add('golden');
  for(let r=0;r<9;r++)for(let c=0;c<9;c++){
    const cell=cellGrid[r][c];
    const delay=(r+c)*50;
    setTimeout(()=>{
      cell.classList.add('golden-cell');
      setTimeout(()=>cell.classList.remove('golden-cell'),800);
    },delay);
  }
  setTimeout(()=>{if(bw)bw.classList.remove('golden');},1200);
}

// Canvas-based confetti + corner bursts — single composited layer instead of ~260 DOM elements
let _confettiCanvas=null;
let _confettiCtx=null;
let _confettiParticles=[];
let _confettiRafId=null;
let _confettiStartTime=0;

function _ensureConfettiCanvas(){
  if(_confettiCanvas&&_confettiCanvas.parentNode)return;
  const box=document.getElementById('confetti-box');box.innerHTML='';
  const c=document.createElement('canvas');
  c.style.cssText='position:fixed;inset:0;width:100%;height:100%;pointer-events:none;z-index:1';
  const dpr=Math.min(devicePixelRatio||1,2); // Cap at 2x to save GPU on 3x devices
  c.width=window.innerWidth*dpr;
  c.height=window.innerHeight*dpr;
  box.appendChild(c);
  _confettiCanvas=c;
  _confettiCtx=c.getContext('2d');
  _confettiCtx.scale(dpr,dpr);
}

function _spawnConfettiParticles(count,opts){
  const cols=PARTY_COLORS;
  const W=window.innerWidth,H=window.innerHeight;
  for(let i=0;i<count;i++){
    const isCorner=opts&&opts.corner;
    let x,y,vx,vy;
    if(isCorner){
      x=opts.cx;y=opts.cy;
      const base=opts.baseAngle;
      const angle=base+(Math.random()-.5)*Math.PI/2;
      const speed=3+Math.random()*5;
      vx=Math.cos(angle)*speed;vy=Math.sin(angle)*speed;
    }else{
      x=Math.random()*W;y=-20-Math.random()*H*0.4;
      vx=(Math.random()-.5)*2;vy=1.5+Math.random()*3;
    }
    const shape=Math.random()<0.5?'circle':'square';
    const size=isCorner?(3+Math.random()*4):(4+Math.random()*12);
    _confettiParticles.push({
      x,y,vx,vy,
      rotation:Math.random()*Math.PI*2,
      rotSpeed:(Math.random()-.5)*0.15,
      color:cols[Math.random()*cols.length|0],
      size,shape,
      gravity:isCorner?0.15:0.08+Math.random()*0.04,
      friction:isCorner?0.97:0.995,
      alpha:1,
      fadeRate:isCorner?0.015:0.002+Math.random()*0.002,
      born:performance.now()
    });
  }
}

function _drawConfettiFrame(){
  const ctx=_confettiCtx;
  if(!ctx){_confettiRafId=null;return;}
  const W=window.innerWidth,H=window.innerHeight;
  ctx.clearRect(0,0,W,H);
  const now=performance.now();
  let alive=0;
  for(let i=_confettiParticles.length-1;i>=0;i--){
    const p=_confettiParticles[i];
    p.vy+=p.gravity;
    p.vx*=p.friction;
    p.vy*=p.friction;
    p.x+=p.vx;p.y+=p.vy;
    p.rotation+=p.rotSpeed;
    if(now-p.born>2000)p.alpha=Math.max(0,p.alpha-p.fadeRate);
    if(p.y>H+50||p.alpha<=0||p.x<-50||p.x>W+50){
      _confettiParticles.splice(i,1);continue;
    }
    alive++;
    ctx.save();
    ctx.globalAlpha=p.alpha;
    ctx.translate(p.x,p.y);
    ctx.rotate(p.rotation);
    ctx.fillStyle=p.color;
    if(p.shape==='circle'){
      ctx.beginPath();ctx.arc(0,0,p.size/2,0,Math.PI*2);ctx.fill();
    }else{
      ctx.fillRect(-p.size/2,-p.size/2,p.size,p.size);
    }
    ctx.restore();
  }
  if(alive>0&&now-_confettiStartTime<6000){
    _confettiRafId=requestAnimationFrame(_drawConfettiFrame);
  }else{
    _confettiParticles=[];
    if(_confettiCanvas&&_confettiCanvas.parentNode)_confettiCanvas.parentNode.removeChild(_confettiCanvas);
    _confettiCanvas=null;_confettiCtx=null;_confettiRafId=null;
  }
}

function _startConfettiLoop(){
  _confettiStartTime=performance.now(); // reset safety cap on each spawn
  if(_confettiRafId)return; // loop already running, new particles picked up automatically
  _confettiRafId=requestAnimationFrame(_drawConfettiFrame);
}

function confetti(){
  _ensureConfettiCanvas();
  _spawnConfettiParticles(150);
  _startConfettiLoop();
}

// ============== POEM ==============
function initPoem(){
  document.getElementById('btn-back-poem').addEventListener('click',()=>showView('hub'));
  // Floating sparkles in poem background
  const poemEl=document.getElementById('poem');
  for(let i=0;i<12;i++){
    const s=document.createElement('span');
    s.className='poem-sparkle';
    s.textContent=['✦','♥','✧','·'][i%4];
    s.style.cssText=`left:${5+Math.random()*90}%;animation-delay:${Math.random()*8}s;animation-duration:${6+Math.random()*6}s;font-size:${8+Math.random()*10}px;color:rgba(233,30,99,${.08+Math.random()*.12})`;
    poemEl.appendChild(s);
  }
  // Scroll-reveal stanzas with staggered line fade-in
  const observer=new IntersectionObserver(entries=>{
    entries.forEach(e=>{
      if(e.isIntersecting){
        e.target.classList.add('scroll-visible');
        e.target.classList.remove('scroll-hidden');
        // Stagger each line within the stanza
        e.target.querySelectorAll('p').forEach((p,i)=>{
          p.style.opacity='0';p.style.transform='translateY(8px)';
          p.style.transition=`opacity .5s ease ${i*150}ms, transform .5s ease ${i*150}ms`;
          requestAnimationFrame(()=>{p.style.opacity='1';p.style.transform='translateY(0)';});
        });
        // Stop observing once visible (one-shot reveal)
        observer.unobserve(e.target);
      }
    });
  },{threshold:0.15,rootMargin:'0px 0px -40px 0px'});
  document.querySelectorAll('.stanza').forEach(s=>{
    s.classList.add('scroll-hidden');
    observer.observe(s);
  });
}

// ============== GIFTS ==============
function initGifts(){
  buildGiftList();
  document.getElementById('btn-back-gifts').addEventListener('click',()=>showView('hub'));
  document.getElementById('btn-submit-gifts').addEventListener('click',submitGifts);
  document.getElementById('btn-sent-back').addEventListener('click',()=>{showView('hub');updateHub();});
  document.querySelectorAll('input[name="gift-path"]').forEach(r=>{
    r.addEventListener('change',onPathChange);
  });
}

function onPathChange(){
  const path=document.querySelector('input[name="gift-path"]:checked')?.value;
  if(!path)return;
  state.giftPath=path;
  state.selectedGifts=[];
  save();
  document.querySelectorAll('.gift-path-card').forEach(c=>{
    c.classList.toggle('selected',c.dataset.path===path);
  });
  buildGiftItems();
}

function buildGiftList(){
  const doneCount=state.puzzles.filter(p=>p.done).length;
  const allDone=doneCount>=4;
  const heading=document.querySelector('.gifts-heading');
  const sub=document.querySelector('.gifts-sub');
  if(heading&&sub){
    if(allDone){heading.textContent="Your reward, princess!";sub.textContent='All 4 puzzles conquered! Choose one reward below.';}
    else{heading.textContent="Rewards await!";sub.textContent='Finish all puzzles to unlock your gift.';}
  }
  const lockMsg=document.getElementById('gifts-lock-msg');
  const pathCards=document.getElementById('gift-paths');
  const submitBtn=document.getElementById('btn-submit-gifts');
  const list=document.getElementById('gifts-list');
  if(!allDone){
    const remaining=4-doneCount;
    lockMsg.textContent=`Solve ${remaining} more puzzle${remaining>1?'s':''} to unlock your reward!`;
    lockMsg.style.display='';
    pathCards.classList.add('locked');
    submitBtn.style.display='none';
    list.innerHTML='';
    return;
  }
  lockMsg.style.display='none';
  pathCards.classList.remove('locked');
  if(state.giftPath){
    const radio=document.querySelector(`input[name="gift-path"][value="${state.giftPath}"]`);
    if(radio)radio.checked=true;
    document.querySelectorAll('.gift-path-card').forEach(c=>{
      c.classList.toggle('selected',c.dataset.path===state.giftPath);
    });
    buildGiftItems();
  }else{
    submitBtn.style.display='none';
    list.innerHTML='';
  }
}

function buildGiftItems(){
  const list=document.getElementById('gifts-list');
  list.innerHTML='';
  const submitBtn=document.getElementById('btn-submit-gifts');
  const path=state.giftPath;
  if(path==='necklace'){
    list.innerHTML='<div class="necklace-confirm"><div class="necklace-icon">\uD83D\uDC8E</div><p>Maxime will pick the perfect diamond necklace for you!</p><p class="necklace-sub">Just send your choice and he\'ll handle the rest.</p></div>';
    submitBtn.style.display='';
    submitBtn.disabled=false;
    submitBtn.textContent='Send to Maxime \uD83D\uDC8E';
    return;
  }
  const isLuxury=path==='luxury';
  const maxPicks=isLuxury?1:3;
  const items=GIFTS.map((g,i)=>({...g,idx:i})).filter(g=>{
    if(isLuxury)return g.p>SMALL_MAX&&g.p<=LUXURY_MAX;
    return g.p<=SMALL_MAX;
  });
  const info=document.createElement('div');
  info.className='gift-pick-info';
  info.innerHTML=isLuxury?'<p>Pick <strong>1</strong> special item:</p>':'<p>Pick <strong>3</strong> cute things:</p>';
  list.appendChild(info);
  items.forEach(g=>{
    const row=document.createElement('div');
    row.className='gift-row';
    row.dataset.i=g.idx;
    const checked=(state.selectedGifts||[]).includes(g.idx);
    if(checked)row.classList.add('on');
    row.innerHTML=`<div class="gift-info"><div class="gift-name">${g.name}</div><div class="gift-brand">${g.brand} \u2022 ${g.cat}</div>${g.d?`<div class="gift-detail">${g.d}</div>`:''}</div><div class="gift-price">$${g.p}</div><label class="toggle"><input type="checkbox" data-gi="${g.idx}"${checked?' checked':''}><span class="toggle-track"></span></label>`;
    row.querySelector('input').addEventListener('change',()=>onGiftToggle(g.idx,maxPicks));
    list.appendChild(row);
  });
  updateSubmitBtn(maxPicks);
  initGiftFlip();
}

function onGiftToggle(idx,maxPicks){
  const cb=document.querySelector(`input[data-gi="${idx}"]`);
  if(cb.checked){
    if(state.selectedGifts.length>=maxPicks){
      cb.checked=false;
      showToast(`You can only pick ${maxPicks}!`,1500);
      return;
    }
    state.selectedGifts.push(idx);
  }else{
    state.selectedGifts=state.selectedGifts.filter(i=>i!==idx);
  }
  document.querySelectorAll('#gifts-list .gift-row').forEach(row=>{
    const rcb=row.querySelector('input');
    if(rcb)row.classList.toggle('on',rcb.checked);
  });
  save();
  updateSubmitBtn(maxPicks);
}

function updateSubmitBtn(maxPicks){
  const submitBtn=document.getElementById('btn-submit-gifts');
  const count=state.selectedGifts.length;
  submitBtn.style.display='';
  if(count>=maxPicks){
    submitBtn.disabled=false;
    submitBtn.textContent='Send to Maxime';
  }else{
    submitBtn.disabled=true;
    submitBtn.textContent=`Pick ${maxPicks-count} more`;
  }
}

function submitGifts(){
  const doneCount=state.puzzles.filter(p=>p.done).length;
  if(doneCount<4){ellaSay("Finish all 4 puzzles first!");showToast("Complete all puzzles first!",2500);return;}
  if(!state.giftPath){ellaSay("Pick a reward first, meow!");return;}
  if(state.giftPath!=='necklace'&&!state.selectedGifts.length){ellaSay("Pick something, meow!");return;}
  if(!confirm("Send your choice to Maxime?"))return;
  const submitBtn=document.getElementById('btn-submit-gifts');
  submitBtn.classList.add('btn-submit-gifts-sending');
  submitBtn.textContent='Sending...';
  const selectedRows=document.querySelectorAll('#gifts-list .gift-row.on');
  selectedRows.forEach((row,idx)=>{
    setTimeout(()=>row.classList.add('submit-fly'),idx*60);
  });
  const delay=Math.max(selectedRows.length*60+200,400);
  setTimeout(()=>{
    const burst=document.createElement('div');
    burst.className='gift-confirm-burst';
    burst.innerHTML='<div class="burst-circle"><span class="burst-check">\u2764\uFE0F</span></div>';
    document.body.appendChild(burst);
    setTimeout(()=>{
      burst.remove();
      submitBtn.classList.remove('btn-submit-gifts-sending');
      submitBtn.textContent='Send to Maxime';
      selectedRows.forEach(r=>r.classList.remove('submit-fly'));
      state.giftsSent=true;save();showView('gift-sent');confetti();Audio.success();
      ellaSay("Maxime will be so happy!!");
      notifyGiftsChosen();
    },700);
  },delay);
}

// ============== NUMBER FLY ANIMATION ==============
function numFly(numBtn, targetCell){
  if(!numBtn||!targetCell)return;
  const from=numBtn.getBoundingClientRect();
  const to=targetCell.getBoundingClientRect();
  const el=document.createElement('div');
  el.className='num-fly';
  el.textContent=numBtn.dataset.num;
  const startX=from.left+from.width/2;
  const startY=from.top+from.height/2;
  const endX=to.left+to.width/2;
  const endY=to.top+to.height/2;
  const fontSize=Math.max(from.width*.6,20);
  el.style.cssText=`left:${startX}px;top:${startY}px;font-size:${fontSize}px;--fly-dur:.45s`;
  // Animate position with JS for curved path
  document.body.appendChild(el);
  const dx=endX-startX, dy=endY-startY;
  let start=null;
  function anim(t){
    if(!start)start=t;
    const p=Math.min((t-start)/450,1);
    const ease=1-Math.pow(1-p,3); // easeOutCubic
    const cx=startX+dx*ease;
    const cy=startY+dy*ease-Math.sin(p*Math.PI)*40; // arc
    el.style.left=cx+'px';el.style.top=cy+'px';
    if(p<1)requestAnimationFrame(anim);
    else el.remove();
  }
  requestAnimationFrame(anim);
}

// ============== 3D TILT ON HUB CARDS ==============
function initCardTilt(){
  document.querySelectorAll('.puzzle-card').forEach(card=>{
    card.addEventListener('touchmove',e=>{
      const t=e.touches[0];
      const rect=card.getBoundingClientRect();
      const x=(t.clientX-rect.left)/rect.width-.5; // -0.5 to 0.5
      const y=(t.clientY-rect.top)/rect.height-.5;
      card.style.transform=`perspective(600px) rotateY(${x*12}deg) rotateX(${-y*12}deg) scale(.98)`;
    },{passive:true});
    card.addEventListener('touchend',()=>{
      card.style.transform='';
    },{passive:true});
    card.addEventListener('touchcancel',()=>{
      card.style.transform='';
    },{passive:true});
  });
}

// ============== UNIVERSAL TOUCH RIPPLE + PRESS FEEDBACK ==============
function initRipples(){
  const targets=document.querySelectorAll('.btn-primary,.btn-outline,.t-btn,.icon-btn,.g-back,.puzzle-card');
  targets.forEach(el=>{
    el.style.overflow='hidden';el.style.position=el.style.position||'relative';
    el.addEventListener('pointerdown',e=>{
      const rip=document.createElement('span');rip.className='ripple-wave';
      const rect=el.getBoundingClientRect();
      const sz=Math.max(rect.width,rect.height)*2.5;
      rip.style.width=rip.style.height=sz+'px';
      rip.style.left=(e.clientX-rect.left-sz/2)+'px';
      rip.style.top=(e.clientY-rect.top-sz/2)+'px';
      el.appendChild(rip);
      setTimeout(()=>rip.remove(),500);
    });
  });
  // Press-down scale feedback for all interactive buttons
  const pressTargets=document.querySelectorAll('.btn-primary,.btn-outline,.t-btn,.num-btn,.icon-btn,.g-back,.puzzle-card');
  pressTargets.forEach(el=>{
    el.addEventListener('pointerdown',()=>el.classList.add('pressing'),{passive:true});
    el.addEventListener('pointerup',()=>el.classList.remove('pressing'),{passive:true});
    el.addEventListener('pointerleave',()=>el.classList.remove('pressing'),{passive:true});
    el.addEventListener('pointercancel',()=>el.classList.remove('pressing'),{passive:true});
  });
}

// ============== CELEBRATION STAT COUNTER ==============
function animateStatCounters(){
  // Animate time counter
  const timeEl=document.getElementById('celeb-time');
  const mistakesEl=document.getElementById('celeb-mistakes');
  if(!timeEl||!mistakesEl)return;

  const finalTime=elapsed;
  const finalMistakes=mistakes;

  // Counter animation for time
  let startT=null;
  const dur=1200;
  timeEl.textContent='0:00';
  mistakesEl.textContent='0';

  function tick(t){
    if(!startT)startT=t;
    const p=Math.min((t-startT)/dur,1);
    const ease=1-Math.pow(1-p,3);

    const curTime=Math.round(finalTime*ease);
    timeEl.textContent=fmtTimeLong(curTime);

    const curMist=Math.round(finalMistakes*ease);
    mistakesEl.textContent=curMist;

    if(p>=1){
      timeEl.classList.add('counting');
      mistakesEl.classList.add('counting');
      setTimeout(()=>{
        timeEl.classList.remove('counting');
        mistakesEl.classList.remove('counting');
      },300);
      return;
    }
    requestAnimationFrame(tick);
  }
  // Start after celebration entrance animation
  setTimeout(()=>requestAnimationFrame(tick),800);
}

// ============== CONSTRAINT SATISFACTION CHECK ==============
function checkConstraintSatisfaction(){
  if(!curPuzzle)return;
  const pz=PUZZLES[curWeek];
  const g=curPuzzle.user;
  const cs=50;
  let newlyCompleted=0;

  // Helper: check if all cells in a list are filled (non-zero)
  function allFilled(cells){
    for(const [r,c] of cells) if(!g[r][c])return false;
    return true;
  }
  // Helper: get values for a list of cells
  function vals(cells){ return cells.map(([r,c])=>g[r][c]); }
  // Killer cage: all filled AND sum matches AND no repeats
  function cageOk(cage){
    if(!allFilled(cage.c))return false;
    const v=vals(cage.c);
    if(v.reduce((a,b)=>a+b,0)!==cage.s)return false;
    return new Set(v).size===v.length;
  }
  // Thermo: all filled AND strictly increasing from bulb
  function thermoOk(cells){
    if(!allFilled(cells))return false;
    const v=vals(cells);
    for(let i=1;i<v.length;i++) if(v[i]<=v[i-1])return false;
    return true;
  }
  // Palindrome: all filled AND reads same both ways
  function palindromeOk(cells){
    if(!allFilled(cells))return false;
    const v=vals(cells);
    for(let i=0;i<Math.floor(v.length/2);i++) if(v[i]!==v[v.length-1-i])return false;
    return true;
  }
  // Renban: all filled AND forms consecutive set with no repeats
  function renbanOk(cells){
    if(!allFilled(cells))return false;
    const v=vals(cells);
    if(new Set(v).size!==v.length)return false;
    return Math.max(...v)-Math.min(...v)===v.length-1;
  }
  // German whisper: all filled AND adjacent cells differ by >=5
  function whisperOk(cells){
    if(!allFilled(cells))return false;
    const v=vals(cells);
    for(let i=1;i<v.length;i++) if(Math.abs(v[i]-v[i-1])<5)return false;
    return true;
  }
  // Dutch whisper: all filled AND adjacent cells differ by >=4
  function dutchWhisperOk(cells){
    if(!allFilled(cells))return false;
    const v=vals(cells);
    for(let i=1;i<v.length;i++) if(Math.abs(v[i]-v[i-1])<4)return false;
    return true;
  }
  // Arrow: all filled AND circle value = sum of arrow cells
  function arrowOk(ar){
    const cells=[ar.o,...ar.a];
    if(!allFilled(cells))return false;
    return g[ar.o[0]][ar.o[1]]===ar.a.reduce((s,[r,c])=>s+g[r][c],0);
  }
  // Kropki: both filled AND white=consecutive, black=double/half
  function kropkiOk(k){
    if(!allFilled(k.c))return false;
    const a=g[k.c[0][0]][k.c[0][1]], b=g[k.c[1][0]][k.c[1][1]];
    if(k.t==='w') return Math.abs(a-b)===1;
    if(k.t==='b') return a===2*b||b===2*a;
    return false;
  }
  // Helper: find SVG group for a constraint by first point
  function findGroup(type,cells){
    if(!cells||!cells.length)return null;
    const fp=`${cells[0][1]*cs+cs/2},${cells[0][0]*cs+cs/2}`;
    const groups=document.querySelectorAll(`#board-overlay g[data-constraint="${type}"]`);
    for(const grp of groups){
      const path=grp.querySelector('path');
      if(path&&path.getAttribute('d')&&path.getAttribute('d').includes(fp))return grp;
    }
    return null;
  }
  // Build a unique key for a constraint instance
  function constraintKey(type,cells){
    if(!cells||!cells.length)return null;
    return type+':'+cells[0][0]+','+cells[0][1];
  }
  // Add checkmark SVG to a satisfied constraint group
  function addCheckmark(grp){
    if(!grp||grp.querySelector('.constraint-check'))return;
    const bb=grp.getBBox();
    const cx=bb.x+bb.width/2,cy=bb.y+bb.height/2;
    const check=document.createElementNS('http://www.w3.org/2000/svg','g');
    check.setAttribute('class','constraint-check');
    check.setAttribute('transform','translate('+cx+','+cy+')');
    const bg=document.createElementNS('http://www.w3.org/2000/svg','circle');
    bg.setAttribute('r','10');bg.setAttribute('fill','rgba(76,175,80,.25)');
    check.appendChild(bg);
    const p=document.createElementNS('http://www.w3.org/2000/svg','path');
    p.setAttribute('d','M-4,0 L-1.5,3 L4,-3');
    p.setAttribute('fill','none');p.setAttribute('stroke','#43A047');
    p.setAttribute('stroke-width','2.5');p.setAttribute('stroke-linecap','round');
    p.setAttribute('stroke-linejoin','round');
    check.appendChild(p);
    grp.appendChild(check);
  }
  // Remove checkmark when constraint is no longer satisfied
  function removeCheckmark(grp){
    if(!grp)return;
    const ch=grp.querySelector('.constraint-check');
    if(ch)ch.remove();
  }
  // Play a gentle chime for constraint completion
  function constraintChime(){
    try{
      const ctx=Audio.getCtx();
      [587,784].forEach((f,i)=>setTimeout(()=>{
        const o=ctx.createOscillator(),gn=ctx.createGain();
        o.type='sine';o.frequency.value=f;gn.gain.value=.06;
        gn.gain.exponentialRampToValueAtTime(.001,ctx.currentTime+.2);
        o.connect(gn);gn.connect(ctx.destination);o.start();o.stop(ctx.currentTime+.2);
      },i*80));
    }catch(e){}
  }
  function markGroup(grp,ok,key){
    if(!grp)return;
    if(ok&&!grp.classList.contains('constraint-satisfied')){
      grp.classList.add('constraint-satisfied');
      addCheckmark(grp);
      if(key&&!satisfiedConstraints.has(key)){
        satisfiedConstraints.add(key);
        newlyCompleted++;
      }
    }else if(!ok){
      grp.classList.remove('constraint-satisfied');
      removeCheckmark(grp);
      if(key)satisfiedConstraints.delete(key);
    }
  }

  // Cages — cell-level glow + tracking
  if(pz.cages)pz.cages.forEach((cage,ci)=>{
    const ok=cageOk(cage);
    const key='cage:'+ci;
    cage.c.forEach(([r,c])=>{
      const cell=getCell(r,c);
      if(cell){
        if(ok&&!cell.classList.contains('cage-done'))cell.classList.add('cage-done');
        else if(!ok)cell.classList.remove('cage-done');
      }
    });
    if(ok&&!satisfiedConstraints.has(key)){
      satisfiedConstraints.add(key);
      newlyCompleted++;
    }else if(!ok){
      satisfiedConstraints.delete(key);
    }
  });

  // Thermos
  if(pz.thermos)pz.thermos.forEach(th=>{
    const key=constraintKey('thermo',th);
    markGroup(findGroup('thermo',th),thermoOk(th),key);
  });
  // Arrows
  if(pz.arrows)pz.arrows.forEach(ar=>{
    const key=constraintKey('arrow',[ar.o]);
    markGroup(findGroup('arrow',[ar.o]),arrowOk(ar),key);
  });
  // Whispers
  if(pz.whispers)pz.whispers.forEach(wh=>{
    const key=constraintKey('whisper',wh);
    markGroup(findGroup('whisper',wh),whisperOk(wh),key);
  });
  // Palindromes
  if(pz.palindromes)pz.palindromes.forEach(pl=>{
    const key=constraintKey('palindrome',pl);
    markGroup(findGroup('palindrome',pl),palindromeOk(pl),key);
  });
  // Renbans
  if(pz.renbans)pz.renbans.forEach(rb=>{
    const key=constraintKey('renban',rb);
    markGroup(findGroup('renban',rb),renbanOk(rb),key);
  });
  // Dutch Whispers
  if(pz.dutchWhispers)pz.dutchWhispers.forEach(dw=>{
    const key=constraintKey('dutch',dw);
    markGroup(findGroup('dutch',dw),dutchWhisperOk(dw),key);
  });
  // Kropki
  if(pz.kropki)pz.kropki.forEach((k,ki)=>{
    const ok=kropkiOk(k);
    const key='kropki:'+ki;
    const fp=`${(k.c[0][1]+k.c[1][1])/2*cs+cs/2}`;
    const groups=document.querySelectorAll('#board-overlay g[data-constraint="kropki"]');
    for(const grp of groups){
      const circ=grp.querySelector('circle');
      if(circ&&circ.getAttribute('cx')===fp){markGroup(grp,ok,key);break;}
    }
  });

  // Feedback for newly completed constraints
  if(newlyCompleted>0){
    constraintChime();
    haptic([10,5,10]);
    // Ella reacts on first constraint completion of this game session
    if(satisfiedConstraints.size===newlyCompleted){
      setTimeout(()=>ellaSayTypewriter(ELLA_CONSTRAINT_LINES[Math.random()*ELLA_CONSTRAINT_LINES.length|0],2200),300);
    }
  }
}

// ============== BOARD NEAR-COMPLETION ==============
function updateNearCompletion(){
  if(!curPuzzle)return;
  const g=curPuzzle.user,sol=curPuzzle.sol;
  let correct=0;
  for(let r=0;r<9;r++)for(let c=0;c<9;c++)if(g[r][c]===sol[r][c]&&g[r][c]>0)correct++;
  const bw=document.querySelector('.board-wrap');if(!bw)return;
  bw.classList.toggle('near-done',correct>=70); // ~86%+ triggers pulse
}

// ============== GAME OVER DRAMATIC ==============
function gameOverDramatic(){
  const board=document.getElementById('game-board');
  board.classList.add('game-over-desaturate');
  // Apply filter to the board as a whole instead of individual cells (much cheaper)
  setTimeout(()=>{
    board.classList.remove('game-over-desaturate');
  },3000);
}

// ============== SPLASH PARALLAX ==============
function initSplashParallax(){
  const splash=document.getElementById('splash');
  const content=splash.querySelector('.splash-content');
  if(!content)return;

  // Device orientation for mobile
  window.addEventListener('deviceorientation',e=>{
    if(!splash.classList.contains('active'))return;
    const x=(e.gamma||0)/30; // -1 to 1 range
    const y=(e.beta||0-45)/30;
    content.style.transform=`translate(${x*8}px,${y*5}px)`;
  },{passive:true});

  // Mouse fallback for desktop
  splash.addEventListener('mousemove',e=>{
    const rect=splash.getBoundingClientRect();
    const x=(e.clientX-rect.width/2)/rect.width; // -0.5 to 0.5
    const y=(e.clientY-rect.height/2)/rect.height;
    content.style.transform=`translate(${x*12}px,${y*8}px)`;
  });
}

// ============== ELLA WHISKER TWITCH ==============
function ellaWhiskerTwitch(){
  const el=ellaEl();
  el.classList.add('whisker-twitch');
  setTimeout(()=>el.classList.remove('whisker-twitch'),900);
}

// ============== ELLA EXPRESSIONS ==============
function ellaHappyEyes(){
  const el=ellaEl();
  el.classList.add('happy-eyes');
  setTimeout(()=>el.classList.remove('happy-eyes'),2000);
}

function ellaSadEyes(){
  const el=ellaEl();
  el.classList.add('sad-eyes');
  setTimeout(()=>el.classList.remove('sad-eyes'),1500);
}

// ============== HUB CARD PROGRESS RING ==============
function addProgressRing(card, pct){
  let ring=card.querySelector('.card-progress');
  if(!ring){
    ring=document.createElement('div');
    ring.className='card-progress';
    ring.innerHTML='<svg viewBox="0 0 22 22"><circle class="track" cx="11" cy="11" r="9"/><circle class="fill" cx="11" cy="11" r="9"/></svg>';
    card.appendChild(ring);
  }
  const circ=ring.querySelector('.fill');
  const circumference=2*Math.PI*9;
  circ.style.strokeDasharray=circumference;
  circ.style.strokeDashoffset=circumference*(1-pct/100);
}

// ============== FLOATING COMBO TEXT ==============
function spawnComboText(r,c,text,size){
  const cell=getCell(r,c);
  if(!cell)return;
  const rect=cell.getBoundingClientRect();
  const el=document.createElement('div');
  el.className=`combo-float ${size||'small'}`;
  el.textContent=text;
  el.style.left=(rect.left+rect.width/2)+'px';
  el.style.top=(rect.top)+'px';
  el.style.transform='translateX(-50%)';
  document.body.appendChild(el);
  el.addEventListener('animationend',()=>el.remove());
}

// ============== SELECTION CROSSHAIR ==============
function updateCrosshair(){
  const ch=document.getElementById('crosshair-h');
  const cv=document.getElementById('crosshair-v');
  if(!ch||!cv)return;
  if(!selCell){ch.classList.remove('active');cv.classList.remove('active');return;}
  const cell=getCell(selCell.r,selCell.c);
  if(!cell)return;
  const board=document.getElementById('game-board');
  const bRect=board.getBoundingClientRect();
  const cRect=cell.getBoundingClientRect();
  ch.style.top=(cRect.top-bRect.top)+'px';
  ch.classList.add('active');
  cv.style.left=(cRect.left-bRect.left)+'px';
  cv.classList.add('active');
}

// ============== GENERATIVE MUSIC ENGINE ==============
const MusicEngine=(function(){
  let ctx=null,master=null,reverb=null,dry=null,playing=false,schedId=null;

  // Jazz chord voicings (frequencies)
  const CHORDS_CALM=[
    [130.81,164.81,196.00,246.94],[110.00,130.81,164.81,196.00],
    [87.31,110.00,130.81,164.81],[98.00,123.47,146.83,174.61],
    [146.83,174.61,220.00,261.63],[164.81,196.00,246.94,293.66],
    [87.31,110.00,130.81,164.81],[98.00,123.47,146.83,174.61]
  ];
  const MELODY=[261.63,293.66,329.63,392.00,440.00,523.25,587.33,659.25];
  const BASS=[65.41,55.00,43.65,49.00,73.42,82.41,43.65,49.00];

  function makeReverb(c){
    const conv=c.createConvolver();
    const len=c.sampleRate*2.5|0;
    const buf=c.createBuffer(2,len,c.sampleRate);
    for(let ch=0;ch<2;ch++){
      const d=buf.getChannelData(ch);
      for(let i=0;i<len;i++) d[i]=(Math.random()*2-1)*Math.pow(1-i/len,1.8);
    }
    conv.buffer=buf;return conv;
  }

  function piano(freq,time,dur,vel){
    if(!ctx||!playing)return;
    const partials=[1,2,3,4,5,6];
    const amps=[1,.45,.25,.12,.06,.03];
    const g=ctx.createGain();
    g.gain.setValueAtTime(0,time);
    g.gain.linearRampToValueAtTime(vel*.22,time+.008);
    g.gain.exponentialRampToValueAtTime(vel*.08,time+.15);
    g.gain.exponentialRampToValueAtTime(.0001,time+dur+1.2);
    g.connect(master);
    partials.forEach((p,i)=>{
      const o=ctx.createOscillator();
      o.type='sine';o.frequency.value=freq*p;
      const pg=ctx.createGain();pg.gain.value=amps[i];
      o.connect(pg);pg.connect(g);
      o.start(time);o.stop(time+dur+1.5);
    });
  }

  function pad(freq,time,dur,vel){
    if(!ctx||!playing)return;
    const o=ctx.createOscillator();
    o.type='sine';o.frequency.value=freq;
    const g=ctx.createGain();
    g.gain.setValueAtTime(0,time);
    g.gain.linearRampToValueAtTime(vel*.04,time+1);
    g.gain.linearRampToValueAtTime(vel*.03,time+dur-.5);
    g.gain.linearRampToValueAtTime(0,time+dur);
    const lfo=ctx.createOscillator();const lg=ctx.createGain();
    lfo.frequency.value=.3+Math.random()*.3;lg.gain.value=freq*.003;
    lfo.connect(lg);lg.connect(o.frequency);lfo.start(time);lfo.stop(time+dur+.5);
    o.connect(g);g.connect(master);o.start(time);o.stop(time+dur+.5);
  }

  function bass(freq,time,dur){
    if(!ctx||!playing)return;
    const o=ctx.createOscillator();o.type='triangle';o.frequency.value=freq;
    const g=ctx.createGain();
    g.gain.setValueAtTime(0,time);
    g.gain.linearRampToValueAtTime(.06,time+.02);
    g.gain.exponentialRampToValueAtTime(.0001,time+dur);
    o.connect(g);g.connect(dry);o.start(time);o.stop(time+dur+.2);
  }

  function scheduleBar(barStart,chordIdx){
    const chord=CHORDS_CALM[chordIdx%CHORDS_CALM.length];
    const bpm=62;
    const beat=60/bpm;
    const barLen=beat*4;

    // Arpeggiate chord
    chord.forEach((f,i)=>{
      const t=barStart+i*.6+Math.random()*.08;
      piano(f,t,beat*2,.5+Math.random()*.2);
    });

    // Soft bass note
    bass(BASS[chordIdx%BASS.length],barStart,barLen*.9);

    // Pad (every other bar)
    if(chordIdx%2===0){
      chord.slice(0,2).forEach(f=>pad(f,barStart,barLen,.4));
    }

    // Melody (random, ~40% of bars)
    if(Math.random()<.4){
      const count=1+Math.floor(Math.random()*3);
      for(let n=0;n<count;n++){
        const note=MELODY[Math.random()*MELODY.length|0];
        const t=barStart+beat*(1+Math.random()*2.5);
        piano(note,t,beat*(1+Math.random()),.3+Math.random()*.15);
      }
    }
    return barLen;
  }

  function scheduleLoop(){
    if(!playing)return;
    const now=ctx.currentTime;
    const lookahead=12; // schedule 12s ahead
    let t=now+.1;
    let idx=Math.floor(Math.random()*8);
    while(t<now+lookahead){
      t+=scheduleBar(t,idx);
      idx=(idx+1)%8;
    }
    schedId=setTimeout(scheduleLoop,8000);
  }

  return{
    start(){
      if(playing)this.stop();
      ctx=Audio.getCtx();playing=true;
      reverb=makeReverb(ctx);
      const revGain=ctx.createGain();revGain.gain.value=.45;
      reverb.connect(revGain);revGain.connect(ctx.destination);
      dry=ctx.createGain();dry.gain.value=.55;dry.connect(ctx.destination);
      master=ctx.createGain();master.gain.value=0;
      master.connect(dry);master.connect(reverb);
      master.gain.linearRampToValueAtTime(.18,ctx.currentTime+2);
      scheduleLoop();
    },
    stop(){
      playing=false;clearTimeout(schedId);schedId=null;
      if(master&&ctx){
        try{
          master.gain.cancelScheduledValues(ctx.currentTime);
          master.gain.setValueAtTime(master.gain.value,ctx.currentTime);
          master.gain.linearRampToValueAtTime(0,ctx.currentTime+1.5);
        }catch(e){}
        setTimeout(()=>{
          try{
            if(master){master.disconnect();master=null;}
            if(reverb){reverb.disconnect();reverb=null;}
            if(dry){dry.disconnect();dry=null;}
          }catch(e){}
        },2000);
      }
    },
    isPlaying(){return playing;}
  };
})();

const SPOTIFY_PLAYLIST='0PIJbH66qhmNLaUgGuLp7C';

function initMusic(){
  const btn=document.getElementById('music-toggle');
  const panel=document.getElementById('music-panel');
  const now=document.getElementById('music-now');
  const embed=document.getElementById('music-embed');
  if(!btn||!panel)return;
  let activeMode=null;

  btn.addEventListener('click',()=>{
    const open=panel.classList.toggle('open');
    btn.classList.toggle('on',open||!!activeMode);
  });
  document.addEventListener('click',e=>{
    if(panel.classList.contains('open')&&!panel.contains(e.target)&&!btn.contains(e.target)){
      panel.classList.remove('open');
      btn.classList.toggle('on',!!activeMode);
    }
  });

  function stopAll(){
    MusicEngine.stop();
    if(embed)embed.innerHTML='';
    if(now){now.textContent='';now.classList.remove('playing');}
    activeMode=null;
  }

  document.querySelectorAll('.music-opt').forEach(opt=>{
    opt.addEventListener('click',()=>{
      const m=opt.dataset.mode;
      if(activeMode===m){
        stopAll();
        opt.classList.remove('active');btn.classList.remove('on');
        return;
      }
      stopAll();
      document.querySelectorAll('.music-opt').forEach(o=>o.classList.remove('active'));
      opt.classList.add('active');btn.classList.add('on');
      activeMode=m;

      if(m==='playlist'){
        if(embed)embed.innerHTML=`<iframe src="https://open.spotify.com/embed/playlist/${SPOTIFY_PLAYLIST}?theme=0&utm_source=generator" width="100%" height="152" frameBorder="0" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy" style="border-radius:12px"></iframe>`;
        if(now){now.textContent='Spotify \u2022 tap play in the player';now.classList.add('playing');}
      }else{
        if(embed)embed.innerHTML='';
        MusicEngine.start();
        if(now){now.textContent='Now playing: Calm Piano';now.classList.add('playing');}
      }
    });
  });
}

// ============== AUTO-PENCIL MARKS ==============
function autoPencilAll(){
  if(!curPuzzle)return;
  pushHist();
  const g=curPuzzle.user;
  let count=0;
  for(let r=0;r<9;r++)for(let c=0;c<9;c++){
    if(g[r][c]>0)continue;
    const candidates=new Set();
    for(let n=1;n<=9;n++){
      if(!conflict(r,c,n))candidates.add(n);
    }
    if(candidates.size>0){
      // Merge with existing notes
      candidates.forEach(n=>curPuzzle.notes[r][c].add(n));
      count++;
    }
  }
  render();
  if(count>0){
    showToast(`Notes filled for ${count} cells`,1500);
    Audio.tap();haptic(10);
    ellaSayTypewriter("Notes filled!",1500);
  }else{
    showToast("No new notes to add",1200);
  }
}

// ============== ELLA WIN DANCE ==============
function ellaWinDance(){
  const el=ellaEl();
  el.classList.add('win-dance');
  // Spawn hearts around Ella
  const rect=el.getBoundingClientRect();
  for(let i=0;i<8;i++){
    setTimeout(()=>{
      const heart=document.createElement('div');
      heart.className='sparkle-particle';
      heart.innerHTML='\u2665';
      heart.style.cssText=`left:${rect.left+rect.width/2+Math.random()*40-20}px;top:${rect.top}px;width:auto;height:auto;background:none;color:#e91e63;font-size:${10+Math.random()*8}px;--dx:${(Math.random()-.5)*60}px;--dy:${-30-Math.random()*40}px`;
      document.body.appendChild(heart);
      heart.addEventListener('animationend',()=>heart.remove());
    },i*250);
  }
  setTimeout(()=>el.classList.remove('win-dance'),6000);
}


// ============== SMART HIGHLIGHT ==============
function updateSmartHighlight(){
  // Show which empty cells could contain the selected number
  for(let r=0;r<9;r++)for(let c=0;c<9;c++)cellGrid[r][c].classList.remove('can-place');
  if(!selCell||!curPuzzle||selectedNum<=0||pencilMode)return;
  const g=curPuzzle.user;
  for(let r=0;r<9;r++)for(let c=0;c<9;c++){
    if(g[r][c]>0)continue;
    if(!conflict(r,c,selectedNum)) cellGrid[r][c].classList.add('can-place');
  }
}

// ============== SHOOTING STARS ==============
function initShootingStars(){
  function spawn(){
    if(document.hidden)return;
    if(!document.getElementById('splash').classList.contains('active')&&
       !document.getElementById('hub').classList.contains('active'))return;
    const star=document.createElement('div');
    star.className='shooting-star';
    const angle=-20-Math.random()*30; // angled downward
    const startX=Math.random()*window.innerWidth;
    const startY=Math.random()*window.innerHeight*0.5;
    const len=150+Math.random()*200;
    star.style.cssText=`left:${startX}px;top:${startY}px;transform:rotate(${angle}deg);--shoot-dx:${len*.5}px;--shoot-end:${len}px;--shoot-dur:${1+Math.random()*1.2}s;width:${60+Math.random()*60}px`;
    document.body.appendChild(star);
    star.addEventListener('animationend',()=>star.remove());
  }
  function scheduleNext(){setTimeout(()=>{spawn();scheduleNext();},4000+Math.random()*6000);}
  setTimeout(spawn,2000);
  scheduleNext();
}

// ============== BOARD CELL WAVE ENTRY ==============
function boardCellWaveEntry(){
  for(let r=0;r<9;r++)for(let c=0;c<9;c++){
    const cell=cellGrid[r][c];
    const delay=(r+c)*25+Math.random()*15; // diagonal wave
    cell.classList.add('cell-enter');
    cell.style.animationDelay=delay+'ms';
    setTimeout(()=>{cell.classList.remove('cell-enter');cell.style.animationDelay='';},delay+300);
  }
}

// ============== ACHIEVEMENT SYSTEM ==============
const ACHIEVEMENTS={
  firstSolve:{icon:'\uD83C\uDF1F',title:'First Victory!',desc:'You solved your first puzzle!'},
  perfectRun:{icon:'\uD83D\uDC8E',title:'Perfectionist!',desc:'Zero mistakes — flawless!'},
  speedDemon:{icon:'\u26A1',title:'Speed Demon!',desc:'Solved in under 10 minutes!'},
  streakMaster:{icon:'\uD83D\uDD25',title:'Streak Master!',desc:'15x streak — unstoppable!'},
  halfwayHero:{icon:'\uD83C\uDFC6',title:'Halfway Hero!',desc:'2 puzzles conquered!'},
  grandMaster:{icon:'\uD83D\uDC51',title:'Grand Master!',desc:'All 4 puzzles completed!'},
  noHints:{icon:'\uD83E\uDDE0',title:'Pure Genius!',desc:'Completed without any hints!'}
};
let earnedAchievements=JSON.parse(localStorage.getItem('celina-achievements')||'[]');

function showAchievement(key){
  if(earnedAchievements.includes(key))return;
  earnedAchievements.push(key);
  localStorage.setItem('celina-achievements',JSON.stringify(earnedAchievements));
  const a=ACHIEVEMENTS[key];if(!a)return;
  const el=document.createElement('div');
  el.className='achievement-toast';
  el.innerHTML=`<div class="achieve-icon">${a.icon}</div><div class="achieve-title">${a.title}</div><div class="achieve-desc">${a.desc}</div>`;
  document.body.appendChild(el);
  // Sound
  try{
    const ctx=Audio.getCtx();
    [880,1047,1319,1568].forEach((f,i)=>setTimeout(()=>{
      const o=ctx.createOscillator(),g=ctx.createGain();
      o.type='sine';o.frequency.value=f;g.gain.value=.06;
      g.gain.exponentialRampToValueAtTime(.001,ctx.currentTime+.3);
      o.connect(g);g.connect(ctx.destination);o.start();o.stop(ctx.currentTime+.3);
    },i*120));
  }catch(e){}
  haptic([15,8,15,8,30]);
  setTimeout(()=>{
    el.classList.add('closing');
    el.addEventListener('animationend',()=>el.remove());
  },2800);
}

function buildAchievementsView(){
  const b=document.getElementById('achieve-body');
  let html='<div class="achieve-grid">';
  for(const[key,a] of Object.entries(ACHIEVEMENTS)){
    const earned=earnedAchievements.includes(key);
    html+=`<div class="achieve-item${earned?' earned':''}">
      <span class="achieve-icon-lg">${earned?a.icon:'?'}</span>
      <span class="achieve-name">${earned?a.title:'???'}</span>
      <span class="achieve-desc-sm">${earned?a.desc:'Keep playing to unlock!'}</span>
    </div>`;
  }
  html+=`</div><p class="achieve-count">${earnedAchievements.length} / ${Object.keys(ACHIEVEMENTS).length} unlocked</p>`;
  b.innerHTML=html;
}

function checkAchievements(){
  const done=state.puzzles.filter(p=>p.done).length;
  if(done===1)showAchievement('firstSolve');
  if(done===2)showAchievement('halfwayHero');
  if(done===4)setTimeout(()=>showAchievement('grandMaster'),3500);
  if(mistakes===0)setTimeout(()=>showAchievement('perfectRun'),1500);
  if(elapsed<600)setTimeout(()=>showAchievement('speedDemon'),2000);
  if(streak>=15)showAchievement('streakMaster');
  if(hintsUsed===0)setTimeout(()=>showAchievement('noHints'),2500);
}

// ============== ELLA TAIL SPEED ==============
function updateEllaTailSpeed(){
  const el=ellaEl();
  el.classList.remove('fast-tail','hyper-tail');
  if(streak>=10)el.classList.add('hyper-tail');
  else if(streak>=5)el.classList.add('fast-tail');
}

// ============== ELLA IDLE DURING GAME ==============
const ELLA_IDLE_LINES=[
  "Take your time~","I believe in you!","Try the pencil marks~",
  "Look at the rows...","Check the columns!","*purrs patiently*","I'm here if you need a hint!",
  "You've got this, princess!","*stretches and yawns*","Focus on one box~","You're doing great!"
];
function getIdleMessage(){
  if(!curPuzzle)return ELLA_IDLE_LINES[Math.random()*ELLA_IDLE_LINES.length|0];
  let filled=0;const g=curPuzzle.user,sol=curPuzzle.sol;
  for(let r=0;r<9;r++)for(let c=0;c<9;c++)if(g[r][c]===sol[r][c]&&g[r][c]>0)filled++;
  const remaining=81-filled;
  if(remaining<=10)return["Almost there! Just "+remaining+" left!","So close! "+remaining+" cells to go!","Finish strong!"][Math.random()*3|0];
  if(remaining<=25)return["Under "+remaining+" left!","You're in the home stretch!","Keep going, you've got this!"][Math.random()*3|0];
  if(hintsUsed===0&&filled>30)return["No hints so far — impressive!","Pure brainpower!"][Math.random()*2|0];
  return ELLA_IDLE_LINES[Math.random()*ELLA_IDLE_LINES.length|0];
}
const ELLA_SLEEP_LINES=["*falls asleep*","Zzz...","*soft purring*","*curls up*"];

function resetIdleTimer(){
  lastInputTime=Date.now();
  if(ellaAsleep){
    ellaAsleep=false;
    const el=ellaEl();
    el.classList.remove('sleep','ella-sleeping');
    el.classList.add('jump');
    setTimeout(()=>el.classList.remove('jump'),500);
    const wakeLines=["I'm awake!","*stretches* Let's go!","Mew! I'm here!","Back to work!"];
    ellaSayTypewriter(wakeLines[Math.random()*wakeLines.length|0],1800);
    Audio.meow();
  }
}

function startEllaIdleWatch(){
  clearInterval(ellaIdleTimer);
  lastInputTime=Date.now();
  ellaAsleep=false;
  ellaIdleTimer=setInterval(()=>{
    if(!ellaInGame||gamePaused||!curPuzzle)return;
    const idle=(Date.now()-lastInputTime)/1000;
    if(idle>90&&!ellaAsleep){
      // Fall asleep after 90s idle
      ellaAsleep=true;
      const el=ellaEl();
      el.classList.add('sleep','ella-sleeping');
      ellaSay(ELLA_SLEEP_LINES[Math.random()*ELLA_SLEEP_LINES.length|0],3000);
    }else if(idle>30&&idle<90&&!ellaAsleep&&Math.random()<0.15){
      // Occasional idle encouragement (progress-aware)
      ellaSayTypewriter(getIdleMessage(),2500);
    }
  },10000);
}

function stopEllaIdleWatch(){
  clearInterval(ellaIdleTimer);ellaIdleTimer=null;ellaAsleep=false;
  ellaEl().classList.remove('sleep','ella-sleeping');
}

// ============== ELLA TYPEWRITER ==============
function ellaSayTypewriter(text,dur){
  const sp=ellaSp();
  // Clear any existing typewriter interval from previous call
  if(sp._twInterval){clearInterval(sp._twInterval);sp._twInterval=null;}
  sp.textContent='';
  sp.classList.add('show','typewriter');
  let i=0;
  sp._twInterval=setInterval(()=>{
    if(i<text.length){sp.textContent+=text[i];i++;}
    else{clearInterval(sp._twInterval);sp._twInterval=null;sp.classList.remove('typewriter');}
  },35);
  clearTimeout(sp._t);
  sp._t=setTimeout(()=>{sp.classList.remove('show','typewriter');if(sp._twInterval){clearInterval(sp._twInterval);sp._twInterval=null;}},dur||Math.max(text.length*35+1500,2800));
}

// ============== TIMER COLOR SHIFT ==============
function updateTimerColor(){
  const timerEl=document.getElementById('game-timer');if(!timerEl)return;
  timerEl.classList.remove('warm','hot','on-fire','record-pace');
  // Check if on record pace
  const key='w'+curWeek;
  if(bestTimes[key]&&elapsed<bestTimes[key]*0.8){
    timerEl.classList.add('record-pace');return;
  }
  if(elapsed>600)timerEl.classList.add('on-fire');
  else if(elapsed>300)timerEl.classList.add('hot');
  else if(elapsed>180)timerEl.classList.add('warm');
}

// ============== GIFT CARD FLIP ==============
function initGiftFlip(){
  document.querySelectorAll('#gifts-list .gift-row').forEach(row=>{
    const cb=row.querySelector('input[type="checkbox"]');
    if(!cb)return;
    cb.addEventListener('change',()=>{
      row.classList.add('flipping');
      setTimeout(()=>row.classList.remove('flipping'),400);
      // Highlight shimmer animation
      row.classList.remove('highlight-on','highlight-off');
      void row.offsetWidth; // force reflow
      if(cb.checked){
        row.classList.add('highlight-on');
        setTimeout(()=>row.classList.remove('highlight-on'),600);
      }else{
        row.classList.add('highlight-off');
        setTimeout(()=>row.classList.remove('highlight-off'),500);
      }
    });
  });
}

// ============== VIEW TRANSITION WIPE ==============
function viewWipe(){
  const wipe=document.createElement('div');
  wipe.className='view-wipe';
  document.body.appendChild(wipe);
  wipe.addEventListener('animationend',()=>wipe.remove());
}

// ============== CORNER FIREWORKS (canvas-based) ==============
function cornerBursts(){
  _ensureConfettiCanvas();
  const W=window.innerWidth,H=window.innerHeight;
  const corners=[
    {cx:0,cy:0,baseAngle:Math.PI/4},
    {cx:W,cy:0,baseAngle:3*Math.PI/4},
    {cx:0,cy:H,baseAngle:-Math.PI/4},
    {cx:W,cy:H,baseAngle:-3*Math.PI/4}
  ];
  corners.forEach((c,ci)=>{
    setTimeout(()=>{
      _spawnConfettiParticles(16,{corner:true,cx:c.cx,cy:c.cy,baseAngle:c.baseAngle});
      _startConfettiLoop();
    },ci*200);
  });
}

// Auto-save
setInterval(()=>{if(curWeek>=0&&curPuzzle&&document.getElementById('game').classList.contains('active'))saveProgress(true);},10000);
document.addEventListener('visibilitychange',()=>{
  const gameActive=curWeek>=0&&curPuzzle&&document.getElementById('game').classList.contains('active');
  if(document.hidden){
    // Pause game timer when app goes to background
    if(gameActive){
      saveProgress();stopTimer();
      document.getElementById('game-timer').classList.add('paused');
    }
    // Pause music engine to save battery
    if(MusicEngine.isPlaying()&&!MusicEngine._wasPlayingBeforeHide){
      MusicEngine._wasPlayingBeforeHide=true;
      MusicEngine.stop();
    }
    // Cancel confetti animation to save battery
    if(_confettiRafId){cancelAnimationFrame(_confettiRafId);_confettiRafId=null;}
  }else{
    if(gameActive){
      startTimer();
      document.getElementById('game-timer').classList.remove('paused');
    }
    // Resume music if it was playing before hide
    if(MusicEngine._wasPlayingBeforeHide){
      delete MusicEngine._wasPlayingBeforeHide;
      MusicEngine.start();
    }
  }
});

// Save on page close/navigate — critical last-resort persistence
window.addEventListener('beforeunload',()=>{
  if(curWeek>=0&&curPuzzle&&document.getElementById('game').classList.contains('active'))saveProgress();
});

// ============== SERVICE WORKER ==============
if('serviceWorker' in navigator){
  window.addEventListener('load',()=>{
    navigator.serviceWorker.register('sw.js').catch(()=>{});
  });
}
