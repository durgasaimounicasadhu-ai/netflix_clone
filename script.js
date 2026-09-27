/* Netflix Clone — full app */

function makeAvatar(initials, bg) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="160" height="160" viewBox="0 0 160 160"><rect width="160" height="160" rx="12" fill="${bg}"/><circle cx="80" cy="62" r="30" fill="#f0c7a4"/><path d="M36 145c5-31 25-48 44-48s39 17 44 48" fill="#202020"/><text x="80" y="154" text-anchor="middle" font-family="Arial,sans-serif" font-size="18" font-weight="700" fill="#fff">${initials}</text></svg>`;
  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
}
const PROFILE_AVATARS = [
  makeAvatar("YOU", "#5b8def"),
  makeAvatar("A", "#8f6ad9"),
  makeAvatar("S", "#5aa6a6"),
  makeAvatar("J", "#d16a86"),
  makeAvatar("C", "#c68a4a"),
  makeAvatar("R", "#7b76c7"),
];
const KIDS_AVATAR = makeAvatar("KIDS", "#58a6d8");

let profiles = [
  { id: 1, name: "You", avatar: PROFILE_AVATARS[0], isKids: false },
  { id: 2, name: "Kids", avatar: KIDS_AVATAR, isKids: true },
];
let currentProfile = null;
let currentMovie = null;

/** Movie artwork uses the corresponding YouTube trailer thumbnail, so posters match the titles without an API key. */
function media(title, id) {
  return {
    image: `https://i.ytimg.com/vi/${id}/hqdefault.jpg`,
    banner: `https://i.ytimg.com/vi/${id}/maxresdefault.jpg`,
    trailer: `https://www.youtube.com/embed/${id}?rel=0&modestbranding=1`,
  };
}
function yt(id) {
  return {
    image: `https://i.ytimg.com/vi/${id}/hqdefault.jpg`,
    banner: `https://i.ytimg.com/vi/${id}/maxresdefault.jpg`,
    trailer: id,
  };
}

const movies = {
  trending: [
    {
      id: 1, title: "Stranger Things", year: 2022, rating: "TV-14", match: "98%", duration: "4 Seasons",
      description: "When a young boy vanishes, a small town uncovers a mystery involving secret experiments, terrifying supernatural forces and one strange little girl.",
      cast: "Millie Bobby Brown, Finn Wolfhard, Winona Ryder", genres: "Sci-Fi, Horror, Drama", tags: "Suspenseful, Scary, Nostalgic",
      ...yt("b9EkMc79ZSU"),
    },
    {
      id: 2, title: "The Witcher", year: 2023, rating: "TV-MA", match: "94%", duration: "3 Seasons",
      description: "Geralt of Rivia, a solitary monster hunter, struggles to find his place in a world where people often prove more wicked than beasts.",
      cast: "Henry Cavill, Anya Chalotra, Freya Allan", genres: "Fantasy, Action, Adventure", tags: "Epic, Violent, Exciting",
      ...yt("ndl1W4ltcmg"),
    },
    {
      id: 3, title: "Wednesday", year: 2022, rating: "TV-14", match: "96%", duration: "1 Season",
      description: "Smart, sarcastic and a bit dead inside, Wednesday Addams investigates a murder spree while making new friends at Nevermore Academy.",
      cast: "Jenna Ortega, Gwendoline Christie, Emma Myers", genres: "Comedy, Horror, Mystery", tags: "Dark, Quirky, Stylish",
      ...yt("Di310WS8zLk"),
    },
    {
      id: 4, title: "Squid Game", year: 2021, rating: "TV-MA", match: "95%", duration: "2 Seasons",
      description: "Hundreds of cash-strapped contestants accept an invitation to compete in children's games for a tempting prize, but the stakes are deadly.",
      cast: "Lee Jung-jae, Park Hae-soo, Wi Ha-jun", genres: "Thriller, Drama, Action", tags: "Intense, Suspenseful, Brutal",
      ...yt("oqxAJKy0ii4"),
    },
    {
      id: 5, title: "Money Heist", year: 2021, rating: "TV-MA", match: "93%", duration: "5 Seasons",
      description: "Eight thieves take hostages and lock themselves in the Royal Mint of Spain as a criminal mastermind manipulates the police.",
      cast: "Úrsula Corberó, Álvaro Morte, Itziar Ituño", genres: "Crime, Drama, Thriller", tags: "Clever, Suspenseful, Exciting",
      ...yt("_InqQJRqGW4"),
    },
    {
      id: 6, title: "Arcane", year: 2021, rating: "TV-14", match: "97%", duration: "2 Seasons",
      description: "Amid the stark discord of two cities, two sisters fight on rival sides of a war between magic technologies and clashing convictions.",
      cast: "Hailee Steinfeld, Ella Purnell, Kevin Alejandro", genres: "Animation, Action, Adventure", tags: "Stunning, Emotional, Epic",
      ...yt("fXmAurh012s"),
    },
  ],
  popular: [
    {
      id: 7, title: "Breaking Bad", year: 2013, rating: "TV-MA", match: "99%", duration: "5 Seasons",
      description: "A high school chemistry teacher turned methamphetamine manufacturer partners with a former student to secure his family's future.",
      cast: "Bryan Cranston, Aaron Paul, Anna Gunn", genres: "Crime, Drama, Thriller", tags: "Intense, Gripping, Iconic",
      ...yt("HhesaQXLuRY"),
    },
    {
      id: 8, title: "The Mandalorian", year: 2023, rating: "TV-14", match: "92%", duration: "3 Seasons",
      description: "The travels of a lone bounty hunter in the outer reaches of the galaxy, far from the authority of the New Republic.",
      cast: "Pedro Pascal, Gina Carano, Carl Weathers", genres: "Sci-Fi, Action, Adventure", tags: "Epic, Exciting, Fun",
      ...yt("aOC8E8z_ifw"),
    },
    {
      id: 9, title: "Ozark", year: 2022, rating: "TV-MA", match: "94%", duration: "4 Seasons",
      description: "A financial adviser drags his family from Chicago to the Missouri Ozarks, where he must launder money to appease a drug cartel.",
      cast: "Jason Bateman, Laura Linney, Sofia Hublitz", genres: "Crime, Drama, Thriller", tags: "Tense, Dark, Gripping",
      ...yt("5hAXVqrljbs"),
    },
    {
      id: 10, title: "The Umbrella Academy", year: 2022, rating: "TV-14", match: "89%", duration: "4 Seasons",
      description: "A dysfunctional family of adopted sibling superheroes reunites to solve the mystery of their father's death and prevent an apocalypse.",
      cast: "Elliot Page, Tom Hopper, David Castañeda", genres: "Action, Adventure, Comedy", tags: "Quirky, Action-packed, Fun",
      ...yt("0DAmWHxeoKw"),
    },
    {
      id: 11, title: "Sex Education", year: 2023, rating: "TV-MA", match: "92%", duration: "4 Seasons",
      description: "A teenage boy with a sex therapist mother teams up with a classmate to set up an underground sex therapy clinic at school.",
      cast: "Asa Butterfield, Gillian Anderson, Ncuti Gatwa", genres: "Comedy, Drama", tags: "Honest, Heartfelt, Funny",
      ...yt("Hd2ldTR-WpI"),
    },
    {
      id: 12, title: "The Office", year: 2013, rating: "TV-14", match: "98%", duration: "9 Seasons",
      description: "A mockumentary on a group of typical office workers, where the workday consists of ego clashes, inappropriate behavior, and tedium.",
      cast: "Steve Carell, Rainn Wilson, John Krasinski", genres: "Comedy", tags: "Iconic, Hilarious, Relatable",
      ...yt("LHOtME2DL4g"),
    },
  ],
  top10: [
    {
      id: 13, title: "Stranger Things", year: 2022, rating: "TV-14", match: "98%", duration: "4 Seasons",
      description: "When a young boy vanishes, a small town uncovers a mystery involving secret experiments, terrifying supernatural forces and one strange little girl.",
      cast: "Millie Bobby Brown, Finn Wolfhard, Winona Ryder", genres: "Sci-Fi, Horror, Drama", tags: "Suspenseful, Scary, Nostalgic",
      ...yt("b9EkMc79ZSU"),
    },
    {
      id: 14, title: "Wednesday", year: 2022, rating: "TV-14", match: "96%", duration: "1 Season",
      description: "Smart, sarcastic and a bit dead inside, Wednesday Addams investigates a murder spree while making new friends at Nevermore Academy.",
      cast: "Jenna Ortega, Gwendoline Christie, Emma Myers", genres: "Comedy, Horror, Mystery", tags: "Dark, Quirky, Stylish",
      ...yt("Di310WS8zLk"),
    },
    {
      id: 15, title: "Squid Game", year: 2021, rating: "TV-MA", match: "95%", duration: "2 Seasons",
      description: "Hundreds of cash-strapped contestants accept an invitation to compete in children's games for a tempting prize, but the stakes are deadly.",
      cast: "Lee Jung-jae, Park Hae-soo, Wi Ha-jun", genres: "Thriller, Drama, Action", tags: "Intense, Suspenseful, Brutal",
      ...yt("oqxAJKy0ii4"),
    },
    {
      id: 16, title: "Breaking Bad", year: 2013, rating: "TV-MA", match: "99%", duration: "5 Seasons",
      description: "A high school chemistry teacher turned methamphetamine manufacturer partners with a former student to secure his family's future.",
      cast: "Bryan Cranston, Aaron Paul, Anna Gunn", genres: "Crime, Drama, Thriller", tags: "Intense, Gripping, Iconic",
      ...yt("HhesaQXLuRY"),
    },
    {
      id: 17, title: "Arcane", year: 2021, rating: "TV-14", match: "97%", duration: "2 Seasons",
      description: "Amid the stark discord of two cities, two sisters fight on rival sides of a war between magic technologies and clashing convictions.",
      cast: "Hailee Steinfeld, Ella Purnell, Kevin Alejandro", genres: "Animation, Action, Adventure", tags: "Stunning, Emotional, Epic",
      ...yt("fXmAurh012s"),
    },
    {
      id: 18, title: "The Witcher", year: 2023, rating: "TV-MA", match: "94%", duration: "3 Seasons",
      description: "Geralt of Rivia, a solitary monster hunter, struggles to find his place in a world where people often prove more wicked than beasts.",
      cast: "Henry Cavill, Anya Chalotra, Freya Allan", genres: "Fantasy, Action, Adventure", tags: "Epic, Violent, Exciting",
      ...yt("ndl1W4ltcmg"),
    },
    {
      id: 19, title: "Money Heist", year: 2021, rating: "TV-MA", match: "93%", duration: "5 Seasons",
      description: "Eight thieves take hostages and lock themselves in the Royal Mint of Spain as a criminal mastermind manipulates the police.",
      cast: "Úrsula Corberó, Álvaro Morte, Itziar Ituño", genres: "Crime, Drama, Thriller", tags: "Clever, Suspenseful, Exciting",
      ...yt("_InqQJRqGW4"),
    },
    {
      id: 20, title: "The Mandalorian", year: 2023, rating: "TV-14", match: "92%", duration: "3 Seasons",
      description: "The travels of a lone bounty hunter in the outer reaches of the galaxy, far from the authority of the New Republic.",
      cast: "Pedro Pascal, Gina Carano, Carl Weathers", genres: "Sci-Fi, Action, Adventure", tags: "Epic, Exciting, Fun",
      ...yt("aOC8E8z_ifw"),
    },
    {
      id: 21, title: "Ozark", year: 2022, rating: "TV-MA", match: "94%", duration: "4 Seasons",
      description: "A financial adviser drags his family from Chicago to the Missouri Ozarks, where he must launder money to appease a drug cartel.",
      cast: "Jason Bateman, Laura Linney, Sofia Hublitz", genres: "Crime, Drama, Thriller", tags: "Tense, Dark, Gripping",
      ...yt("5hAXVqrljbs"),
    },
    {
      id: 22, title: "Sex Education", year: 2023, rating: "TV-MA", match: "92%", duration: "4 Seasons",
      description: "A teenage boy with a sex therapist mother teams up with a classmate to set up an underground sex therapy clinic at school.",
      cast: "Asa Butterfield, Gillian Anderson, Ncuti Gatwa", genres: "Comedy, Drama", tags: "Honest, Heartfelt, Funny",
      ...yt("Hd2ldTR-WpI"),
    },
  ],
  action: [
    {
      id: 23, title: "Extraction", year: 2020, rating: "R", match: "90%", duration: "1h 56m",
      description: "A black-market mercenary who has nothing to lose is hired to rescue the kidnapped son of an imprisoned international crime lord.",
      cast: "Chris Hemsworth, Rudhraksh Jaiswal, Randeep Hooda", genres: "Action, Thriller", tags: "Intense, Violent, Gripping",
      ...yt("L6P3nI6VnlY"),
    },
    {
      id: 24, title: "Red Notice", year: 2021, rating: "PG-13", match: "85%", duration: "1h 58m",
      description: "An Interpol agent tracks the world's most wanted art thief in this action-comedy heist film.",
      cast: "Dwayne Johnson, Ryan Reynolds, Gal Gadot", genres: "Action, Comedy, Crime", tags: "Fun, Entertaining, Light",
      ...yt("Pj0wz7zu3Ms"),
    },
    {
      id: 25, title: "Army of the Dead", year: 2021, rating: "R", match: "80%", duration: "2h 28m",
      description: "Following a zombie outbreak in Las Vegas, a group of mercenaries takes the ultimate gamble inside the quarantine zone.",
      cast: "Dave Bautista, Ella Purnell, Omari Hardwick", genres: "Action, Horror", tags: "Gory, Fun, Explosive",
      ...yt("tI1JGPhYBS8"),
    },
    {
      id: 26, title: "The Witcher", year: 2023, rating: "TV-MA", match: "94%", duration: "3 Seasons",
      description: "Geralt of Rivia, a solitary monster hunter, struggles to find his place in a world where people often prove more wicked than beasts.",
      cast: "Henry Cavill, Anya Chalotra, Freya Allan", genres: "Fantasy, Action, Adventure", tags: "Epic, Violent, Exciting",
      ...yt("ndl1W4ltcmg"),
    },
    {
      id: 27, title: "The Mandalorian", year: 2023, rating: "TV-14", match: "92%", duration: "3 Seasons",
      description: "The travels of a lone bounty hunter in the outer reaches of the galaxy, far from the authority of the New Republic.",
      cast: "Pedro Pascal, Gina Carano, Carl Weathers", genres: "Sci-Fi, Action, Adventure", tags: "Epic, Exciting, Fun",
      ...yt("aOC8E8z_ifw"),
    },
    {
      id: 28, title: "Extraction", year: 2020, rating: "R", match: "90%", duration: "1h 56m",
      description: "A black-market mercenary who has nothing to lose is hired to rescue the kidnapped son of an imprisoned international crime lord.",
      cast: "Chris Hemsworth, Rudhraksh Jaiswal, Randeep Hooda", genres: "Action, Thriller", tags: "Intense, Violent, Gripping",
      ...yt("L6P3nI6VnlY"),
    },
  ],
  comedy: [
    {
      id: 29, title: "The Office", year: 2013, rating: "TV-14", match: "98%", duration: "9 Seasons",
      description: "A mockumentary on a group of typical office workers, where the workday consists of ego clashes, inappropriate behavior, and tedium.",
      cast: "Steve Carell, Rainn Wilson, John Krasinski", genres: "Comedy", tags: "Iconic, Hilarious, Relatable",
      ...yt("LHOtME2DL4g"),
    },
    {
      id: 30, title: "Brooklyn Nine-Nine", year: 2021, rating: "TV-14", match: "94%", duration: "8 Seasons",
      description: "Comedy series following the exploits of Det. Jake Peralta and his diverse, lovable colleagues of the 99th Precinct.",
      cast: "Andy Samberg, Stephanie Beatriz, Terry Crews", genres: "Comedy, Crime", tags: "Funny, Heartwarming, Quirky",
      ...yt("sEOuJ4z5aTc"),
    },
    {
      id: 31, title: "Wednesday", year: 2022, rating: "TV-14", match: "96%", duration: "1 Season",
      description: "Smart, sarcastic and a bit dead inside, Wednesday Addams investigates a murder spree while making new friends at Nevermore Academy.",
      cast: "Jenna Ortega, Gwendoline Christie, Emma Myers", genres: "Comedy, Horror, Mystery", tags: "Dark, Quirky, Stylish",
      ...yt("Di310WS8zLk"),
    },
    {
      id: 32, title: "Sex Education", year: 2023, rating: "TV-MA", match: "92%", duration: "4 Seasons",
      description: "A teenage boy with a sex therapist mother teams up with a classmate to set up an underground sex therapy clinic at school.",
      cast: "Asa Butterfield, Gillian Anderson, Ncuti Gatwa", genres: "Comedy, Drama", tags: "Honest, Heartfelt, Funny",
      ...yt("Hd2ldTR-WpI"),
    },
    {
      id: 33, title: "The Umbrella Academy", year: 2022, rating: "TV-14", match: "89%", duration: "4 Seasons",
      description: "A dysfunctional family of adopted sibling superheroes reunites to solve the mystery of their father's death and prevent an apocalypse.",
      cast: "Elliot Page, Tom Hopper, David Castañeda", genres: "Action, Adventure, Comedy", tags: "Quirky, Action-packed, Fun",
      ...yt("0DAmWHxeoKw"),
    },
    {
      id: 34, title: "Brooklyn Nine-Nine", year: 2021, rating: "TV-14", match: "94%", duration: "8 Seasons",
      description: "Comedy series following the exploits of Det. Jake Peralta and his diverse, lovable colleagues of the 99th Precinct.",
      cast: "Andy Samberg, Stephanie Beatriz, Terry Crews", genres: "Comedy, Crime", tags: "Funny, Heartwarming, Quirky",
      ...yt("sEOuJ4z5aTc"),
    },
  ],
  horror: [
    {
      id: 35, title: "Bird Box", year: 2018, rating: "R", match: "88%", duration: "2h 4m",
      description: "Five years after an ominous unseen presence drives most of society to suicide, a mother and her two children make a desperate bid for survival.",
      cast: "Sandra Bullock, Trevante Rhodes, John Malkovich", genres: "Horror, Drama, Sci-Fi", tags: "Tense, Emotional, Suspenseful",
      ...yt("o2AsIXSh2xo"),
    },
    {
      id: 36, title: "The Platform", year: 2019, rating: "TV-MA", match: "86%", duration: "1h 34m",
      description: "A vertical prison with one cell per level. Two people per cell. One food platform and two minutes per day to feed.",
      cast: "Ivan Massagué, Zorion Eguileor, Antonia San Juan", genres: "Horror, Sci-Fi, Thriller", tags: "Brutal, Thought-provoking, Disturbing",
      ...yt("RlfooqeZcdY"),
    },
    {
      id: 37, title: "Stranger Things", year: 2022, rating: "TV-14", match: "98%", duration: "4 Seasons",
      description: "When a young boy vanishes, a small town uncovers a mystery involving secret experiments, terrifying supernatural forces and one strange little girl.",
      cast: "Millie Bobby Brown, Finn Wolfhard, Winona Ryder", genres: "Sci-Fi, Horror, Drama", tags: "Suspenseful, Scary, Nostalgic",
      ...yt("b9EkMc79ZSU"),
    },
    {
      id: 38, title: "Wednesday", year: 2022, rating: "TV-14", match: "96%", duration: "1 Season",
      description: "Smart, sarcastic and a bit dead inside, Wednesday Addams investigates a murder spree while making new friends at Nevermore Academy.",
      cast: "Jenna Ortega, Gwendoline Christie, Emma Myers", genres: "Comedy, Horror, Mystery", tags: "Dark, Quirky, Stylish",
      ...yt("Di310WS8zLk"),
    },
    {
      id: 39, title: "Army of the Dead", year: 2021, rating: "R", match: "80%", duration: "2h 28m",
      description: "Following a zombie outbreak in Las Vegas, a group of mercenaries takes the ultimate gamble inside the quarantine zone.",
      cast: "Dave Bautista, Ella Purnell, Omari Hardwick", genres: "Action, Horror", tags: "Gory, Fun, Explosive",
      ...yt("tI1JGPhYBS8"),
    },
    {
      id: 40, title: "Bird Box", year: 2018, rating: "R", match: "88%", duration: "2h 4m",
      description: "Five years after an ominous unseen presence drives most of society to suicide, a mother and her two children make a desperate bid for survival.",
      cast: "Sandra Bullock, Trevante Rhodes, John Malkovich", genres: "Horror, Drama, Sci-Fi", tags: "Tense, Emotional, Suspenseful",
      ...yt("o2AsIXSh2xo"),
    },
  ],
  documentaries: [
    {
      id: 41, title: "My Octopus Teacher", year: 2020, rating: "TV-G", match: "95%", duration: "1h 25m",
      description: "A filmmaker forges an unusual friendship with an octopus living in a South African kelp forest, learning as the animal shares the mysteries of her world.",
      cast: "Craig Foster", genres: "Documentary", tags: "Beautiful, Emotional, Unique",
      ...yt("3s0LTDhqe5A"),
    },
    {
      id: 42, title: "The Platform", year: 2019, rating: "TV-MA", match: "86%", duration: "1h 34m",
      description: "A vertical prison with one cell per level. Two people per cell. One food platform and two minutes per day to feed.",
      cast: "Ivan Massagué, Zorion Eguileor, Antonia San Juan", genres: "Horror, Sci-Fi, Thriller", tags: "Brutal, Thought-provoking, Disturbing",
      ...yt("RlfooqeZcdY"),
    },
    {
      id: 43, title: "My Octopus Teacher", year: 2020, rating: "TV-G", match: "95%", duration: "1h 25m",
      description: "A filmmaker forges an unusual friendship with an octopus living in a South African kelp forest.",
      cast: "Craig Foster", genres: "Documentary", tags: "Beautiful, Emotional, Unique",
      ...yt("3s0LTDhqe5A"),
    },
    {
      id: 44, title: "Arcane", year: 2021, rating: "TV-14", match: "97%", duration: "2 Seasons",
      description: "Amid the stark discord of two cities, two sisters fight on rival sides of a war between magic technologies and clashing convictions.",
      cast: "Hailee Steinfeld, Ella Purnell, Kevin Alejandro", genres: "Animation, Action, Adventure", tags: "Stunning, Emotional, Epic",
      ...yt("fXmAurh012s"),
    },
    {
      id: 45, title: "The Office", year: 2013, rating: "TV-14", match: "98%", duration: "9 Seasons",
      description: "A mockumentary on a group of typical office workers.",
      cast: "Steve Carell, Rainn Wilson, John Krasinski", genres: "Comedy", tags: "Iconic, Hilarious, Relatable",
      ...yt("LHOtME2DL4g"),
    },
    {
      id: 46, title: "Breaking Bad", year: 2013, rating: "TV-MA", match: "99%", duration: "5 Seasons",
      description: "A high school chemistry teacher turned methamphetamine manufacturer partners with a former student.",
      cast: "Bryan Cranston, Aaron Paul, Anna Gunn", genres: "Crime, Drama, Thriller", tags: "Intense, Gripping, Iconic",
      ...yt("HhesaQXLuRY"),
    },
  ],
};

const ROW_TITLES = {
  trending: "Trending Now",
  popular: "Popular on Netflix Clone",
  top10: "Top 10 in Your Country Today",
  action: "Action & Adventure",
  comedy: "Comedies",
  horror: "Horror",
  documentaries: "Documentaries",
};

/* DOM */
const loginScreen = document.getElementById("loginScreen");
const profileScreen = document.getElementById("profileScreen");
const mainApp = document.getElementById("mainApp");
const enterDemoBtn = document.getElementById("enterDemoBtn");
const profilesGrid = document.getElementById("profilesGrid");
const addProfileModal = document.getElementById("addProfileModal");
const newProfileName = document.getElementById("newProfileName");
const kidsToggle = document.getElementById("kidsToggle");
const newProfileAvatar = document.getElementById("newProfileAvatar");
const navbar = document.getElementById("navbar");
const modal = document.getElementById("modal");
const trailerModal = document.getElementById("trailerModal");
const trailerFrame = document.getElementById("trailerFrame");
const searchInput = document.getElementById("searchInput");
const searchBox = document.querySelector(".search-box");
const contentRows = document.getElementById("contentRows");

function showScreen(screen) {
  [loginScreen, profileScreen, mainApp].forEach((s) => s.classList.remove("active"));
  screen.classList.add("active");
  window.scrollTo(0, 0);
}

/* ===== DEMO ENTRY ===== */
enterDemoBtn.addEventListener("click", () => {
  loadProfilesFromStorage();
  renderProfiles();
  showScreen(profileScreen);
});

/* ===== PROFILES ===== */
function loadProfilesFromStorage() {
  try {
    const saved = localStorage.getItem("netflix_profiles");
    if (saved) profiles = JSON.parse(saved);
  } catch (_) {}
}
function saveProfiles() {
  localStorage.setItem("netflix_profiles", JSON.stringify(profiles));
}

function renderProfiles() {
  profilesGrid.innerHTML = "";
  profiles.forEach((p) => {
    const card = document.createElement("div");
    card.className = "profile-card";
    card.innerHTML =
      '<img src="' + p.avatar + '" alt="' + p.name + '" class="profile-avatar" />' +
      '<span class="profile-name">' + p.name + "</span>";
    card.addEventListener("click", () => selectProfile(p));
    profilesGrid.appendChild(card);
  });
  const addCard = document.createElement("div");
  addCard.className = "profile-card add-profile";
  addCard.innerHTML =
    '<div class="profile-avatar"><i class="fas fa-plus"></i></div><span class="profile-name">Add Profile</span>';
  addCard.addEventListener("click", openAddProfile);
  profilesGrid.appendChild(addCard);
}

function selectProfile(profile) {
  currentProfile = profile;
  document.getElementById("currentAvatar").src = profile.avatar;
  updateDropdownProfiles();
  buildRows();
  showScreen(mainApp);
}

function openAddProfile() {
  newProfileName.value = "";
  kidsToggle.checked = false;
  newProfileAvatar.src = PROFILE_AVATARS[profiles.length % PROFILE_AVATARS.length];
  addProfileModal.classList.remove("hidden");
  newProfileName.focus();
}

document.getElementById("cancelProfileBtn").addEventListener("click", () => {
  addProfileModal.classList.add("hidden");
});

document.getElementById("saveProfileBtn").addEventListener("click", () => {
  const name = newProfileName.value.trim();
  if (!name) {
    newProfileName.focus();
    return;
  }
  const isKids = kidsToggle.checked;
  profiles.push({
    id: Date.now(),
    name,
    avatar: isKids ? KIDS_AVATAR : PROFILE_AVATARS[profiles.length % PROFILE_AVATARS.length],
    isKids,
  });
  saveProfiles();
  renderProfiles();
  addProfileModal.classList.add("hidden");
});

document.getElementById("manageProfilesBtn").addEventListener("click", openAddProfile);

function updateDropdownProfiles() {
  const container = document.getElementById("dropdownProfiles");
  container.innerHTML = "";
  profiles.forEach((p) => {
    if (currentProfile && p.id === currentProfile.id) return;
    const item = document.createElement("div");
    item.className = "dropdown-profile-item";
    item.innerHTML = '<img src="' + p.avatar + '" alt="" /><span>' + p.name + "</span>";
    item.addEventListener("click", () => selectProfile(p));
    container.appendChild(item);
  });
}

document.getElementById("switchProfile").addEventListener("click", (e) => {
  e.preventDefault();
  showScreen(profileScreen);
});

document.getElementById("signOutBtn").addEventListener("click", (e) => {
  e.preventDefault();
  currentProfile = null;
  showScreen(loginScreen);
});

/* ===== TRAILER ===== */
function playTrailer(movie) {
  currentMovie = movie;
  const id = movie.trailer || "b9EkMc79ZSU";
  trailerFrame.src =
    "https://www.youtube.com/embed/" + id + "?autoplay=1&rel=0&modestbranding=1&playsinline=1";
  document.getElementById("trailerTitle").textContent = movie.title;
  document.getElementById("trailerMeta").textContent =
    movie.year + " · " + movie.rating + " · " + movie.duration;
  var fallback = document.getElementById("trailerFallback");
  var watchLink = document.getElementById("watchOnYt");
  if (fallback && watchLink) {
    fallback.classList.remove("hidden");
    watchLink.href = "https://www.youtube.com/watch?v=" + id;
  }
  trailerModal.classList.add("open");
  document.body.style.overflow = "hidden";
}

function closeTrailer() {
  trailerModal.classList.remove("open");
  trailerFrame.src = "";
  document.body.style.overflow = "";
}

document.getElementById("trailerClose").addEventListener("click", closeTrailer);
trailerModal.addEventListener("click", (e) => {
  if (e.target === trailerModal) closeTrailer();
});

/* ===== DETAILS MODAL ===== */
function openModal(movie) {
  currentMovie = movie;
  document.getElementById("modalTitle").textContent = movie.title;
  document.getElementById("modalMatch").textContent = movie.match + " Match";
  document.getElementById("modalYear").textContent = movie.year;
  document.getElementById("modalRating").textContent = movie.rating;
  document.getElementById("modalDuration").textContent = movie.duration;
  document.getElementById("modalDesc").textContent = movie.description;
  document.getElementById("modalCast").textContent = movie.cast;
  document.getElementById("modalGenres").textContent = movie.genres;
  document.getElementById("modalTags").textContent = movie.tags;
  document.getElementById("modalBanner").style.backgroundImage =
    "linear-gradient(to top,#181818 0%,transparent 50%),url(" + movie.banner + ")";
  modal.classList.add("open");
  document.body.style.overflow = "hidden";
}

function closeModal() {
  modal.classList.remove("open");
  document.body.style.overflow = "";
}

document.getElementById("modalClose").addEventListener("click", closeModal);
modal.addEventListener("click", (e) => {
  if (e.target === modal) closeModal();
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    if (trailerModal.classList.contains("open")) closeTrailer();
    else if (modal.classList.contains("open")) closeModal();
  }
});
document.getElementById("modalPlayBtn").addEventListener("click", () => {
  if (currentMovie) {
    closeModal();
    playTrailer(currentMovie);
  }
});

/* ===== POSTERS & ROWS ===== */
function createPoster(movie, isTop10, rank) {
  const el = document.createElement("div");
  el.className = "poster";
  if (isTop10) el.setAttribute("data-rank", rank);
  el.innerHTML =
    '<img src="' + movie.image + '" alt="' + movie.title + '" loading="lazy" ' +
    'onerror="this.onerror=null;this.style.display=\'none\';this.parentElement.style.background=\'#202020\'" />' +
    '<div class="poster-title-bar">' +
    "<h3>" + movie.title + "</h3>" +
    '<div class="poster-meta"><span class="match">' + movie.match + "</span><span>" +
    movie.year + '</span><span class="rating">' + movie.rating + "</span></div>" +
    '<div class="poster-actions">' +
    '<button type="button" title="Play"><i class="fas fa-play"></i></button>' +
    '<button type="button" title="My List"><i class="fas fa-plus"></i></button>' +
    '<button type="button" title="Info"><i class="fas fa-chevron-down"></i></button>' +
    "</div></div>";

  el.addEventListener("click", (e) => {
    if (!e.target.closest(".poster-actions")) openModal(movie);
  });
  const btns = el.querySelectorAll(".poster-actions button");
  btns[0].addEventListener("click", (e) => {
    e.stopPropagation();
    playTrailer(movie);
  });
  btns[1].addEventListener("click", (e) => {
    e.stopPropagation();
    e.currentTarget.innerHTML = '<i class="fas fa-check"></i>';
  });
  btns[2].addEventListener("click", (e) => {
    e.stopPropagation();
    openModal(movie);
  });
  return el;
}

function buildRows() {
  contentRows.innerHTML = "";
  Object.keys(movies).forEach((key) => {
    let list = movies[key];
    if (currentProfile && currentProfile.isKids) {
      list = list.filter(
        (m) => !["TV-MA", "R"].includes(m.rating) && !m.genres.toLowerCase().includes("horror")
      );
    }
    if (!list.length) return;

    const section = document.createElement("section");
    section.className = "row";
    section.id = key;
    section.innerHTML =
      '<h2 class="row-title">' + (ROW_TITLES[key] || key) + "</h2>" +
      '<div class="row-container">' +
      '<button class="row-arrow left" type="button" aria-label="Scroll left"><i class="fas fa-chevron-left"></i></button>' +
      '<div class="row-posters' + (key === "top10" ? " top10" : "") + '" data-row="' + key + '"></div>' +
      '<button class="row-arrow right" type="button" aria-label="Scroll right"><i class="fas fa-chevron-right"></i></button>' +
      "</div>";

    const postersEl = section.querySelector(".row-posters");
    const isTop10 = key === "top10";
    list.forEach((movie, i) => postersEl.appendChild(createPoster(movie, isTop10, i + 1)));

    const left = section.querySelector(".row-arrow.left");
    const right = section.querySelector(".row-arrow.right");
    left.addEventListener("click", () => postersEl.scrollBy({ left: -500, behavior: "smooth" }));
    right.addEventListener("click", () => postersEl.scrollBy({ left: 500, behavior: "smooth" }));

    contentRows.appendChild(section);
  });
}

/* Navbar / search / hero */
window.addEventListener("scroll", () => {
  navbar.classList.toggle("scrolled", window.scrollY > 50);
});
searchInput.addEventListener("focus", () => searchBox.classList.add("expanded"));
searchInput.addEventListener("blur", () => {
  if (!searchInput.value) searchBox.classList.remove("expanded");
});
searchInput.addEventListener("input", (e) => {
  const q = e.target.value.toLowerCase().trim();
  document.querySelectorAll(".poster").forEach((p) => {
    const t = (p.querySelector("h3") && p.querySelector("h3").textContent.toLowerCase()) || "";
    p.style.display = !q || t.includes(q) ? "" : "none";
  });
});

document.getElementById("playBtn").addEventListener("click", () => playTrailer(movies.trending[0]));
document.getElementById("infoBtn").addEventListener("click", () => openModal(movies.trending[0]));

/* Init: always begin with the clearly labeled demo entry screen. */
(function init() {
  showScreen(loginScreen);
})();
