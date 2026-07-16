/* ============================================================================
   CAR ZONE AUTO REPAIR — site interactivity
   ============================================================================
   CONFIG — replace these placeholders to go live. Nothing below breaks if
   left as-is; the page runs in DEMO_MODE with simulated data until you do.
   ========================================================================== */
const CONFIG = {
  VAPI_PUBLIC_KEY: "", // e.g. "b21e..." from your Vapi dashboard
  VAPI_ASSISTANT_ID: "", // the Assistant you configure in Vapi to handle Q&A + booking
  CALENDLY_URL: "", // e.g. "https://calendly.com/car-zone-auto/appointment"
  GOOGLE_REVIEW_URL: "https://g.page/r/REPLACE_WITH_YOUR_PLACE_ID/review", // Google Business Profile "write a review" link
  FEEDBACK_ENDPOINT: "", // e.g. a Formspree/EmailJS endpoint for 1-3 star feedback
  BUSINESS_PHONE: "(281) 555-0142",

  // DEMO-ONLY credentials, checked client-side — readable by anyone via
  // devtools and NOT real security. Fine for a demo/pitch; replace with real
  // server-side auth (Netlify Identity, Auth0, Firebase Auth, custom backend)
  // before this ever gates anything actually sensitive.
  MGMT_USERNAME: "admin",
  MGMT_PASSWORD: "carzone2024",
};

const LIVE_VOICE = Boolean(CONFIG.VAPI_PUBLIC_KEY && CONFIG.VAPI_ASSISTANT_ID);
const LIVE_BOOKING = Boolean(CONFIG.CALENDLY_URL);
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

document.addEventListener("DOMContentLoaded", () => {
  initHeader();
  initMobileNav();
  initFooterYear();
  initRevealAnimations();
  initCounters();
  initStarRating();
  initFeedbackForm();
  initAiPanel();
  initCalendly();
  initManagementLogin();
});

/* --------------------------------- Header --------------------------------- */
function initHeader() {
  const header = document.getElementById("siteHeader");
  if (!header) return;
  const onScroll = () => header.classList.toggle("is-scrolled", window.scrollY > 12);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
}

function initMobileNav() {
  const toggle = document.getElementById("navToggle");
  const nav = document.getElementById("mobileNav");
  if (!toggle || !nav) return;

  const closeNav = () => {
    nav.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
  };
  const openNav = () => {
    nav.classList.add("is-open");
    toggle.setAttribute("aria-expanded", "true");
  };

  toggle.addEventListener("click", () => {
    nav.classList.contains("is-open") ? closeNav() : openNav();
  });
  nav.querySelectorAll("a").forEach((a) => a.addEventListener("click", closeNav));
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeNav();
  });
}

function initFooterYear() {
  const el = document.getElementById("year");
  if (el) el.textContent = new Date().getFullYear();
}

/* ------------------------------ Scroll reveals ----------------------------- */
/* Dependency-free: CSS transitions + IntersectionObserver. No animation
   library, no external requests — works identically offline or on any device. */
function initRevealAnimations() {
  const items = document.querySelectorAll("[data-reveal]");
  if (!items.length) return;

  if (prefersReducedMotion || !window.IntersectionObserver) {
    items.forEach((el) => el.classList.add("is-visible"));
  } else {
    // Small index-based stagger so groups of cards don't all pop at once.
    items.forEach((el, i) => {
      el.style.transitionDelay = `${(i % 3) * 80}ms`;
    });

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" }
    );
    items.forEach((el) => io.observe(el));

    // Hero content is already in view on load — reveal immediately, staggered.
    document.querySelectorAll(".hero [data-reveal]").forEach((el, i) => {
      el.style.transitionDelay = `${150 + i * 110}ms`;
      requestAnimationFrame(() => el.classList.add("is-visible"));
    });
  }

  initParallax();
}

/* Subtle hero background drift on scroll — plain rAF-throttled scroll listener. */
function initParallax() {
  const heroBg = document.querySelector(".hero-bg");
  const hero = document.querySelector(".hero");
  if (!heroBg || !hero || prefersReducedMotion) return;

  let ticking = false;
  const update = () => {
    ticking = false;
    const heroHeight = hero.offsetHeight;
    const progress = Math.min(Math.max(window.scrollY / heroHeight, 0), 1);
    heroBg.style.transform = `translateY(${progress * 80}px)`;
  };
  window.addEventListener(
    "scroll",
    () => {
      if (!ticking) {
        window.requestAnimationFrame(update);
        ticking = true;
      }
    },
    { passive: true }
  );
}

/* ---------------------------------- Counters -------------------------------- */
/* Custom rAF ease-out tween — no animation library required. */
function tweenNumber(el, target, duration = 1200) {
  if (prefersReducedMotion) {
    el.textContent = target;
    return;
  }
  const start = performance.now();
  const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);

  function step(now) {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    el.textContent = Math.round(easeOutCubic(progress) * target);
    if (progress < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}

/* Triggered via IntersectionObserver where available, with a scroll-position
   fallback/backstop — some embedding contexts never fire IO callbacks even
   though the element is genuinely on screen, so counters must not depend on
   IO alone to ever resolve. */
function initCounters() {
  const counters = document.querySelectorAll("[data-counter]");
  if (!counters.length) return;

  const done = new WeakSet();
  const animateCounter = (el) => {
    if (done.has(el)) return;
    done.add(el);
    const target = parseInt(el.getAttribute("data-counter"), 10) || 0;
    tweenNumber(el, target);
  };

  const isInView = (el) => {
    const r = el.getBoundingClientRect();
    return r.top < window.innerHeight * 0.85 && r.bottom > 0;
  };

  const checkScrollFallback = () => {
    counters.forEach((el) => {
      if (!done.has(el) && isInView(el)) animateCounter(el);
    });
  };

  if (window.IntersectionObserver) {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.isIntersecting && animateCounter(entry.target)),
      { threshold: 0.4 }
    );
    counters.forEach((el) => io.observe(el));
  }

  // Plain time-based throttle (not rAF) — this is a one-shot visibility check
  // per element, not a continuous paint-synced animation, so it doesn't need
  // to be tied to the display refresh and stays reliable even in contexts
  // that throttle or never schedule rAF (e.g. background/inactive tabs).
  let throttled = false;
  window.addEventListener(
    "scroll",
    () => {
      if (throttled) return;
      throttled = true;
      checkScrollFallback();
      window.setTimeout(() => (throttled = false), 150);
    },
    { passive: true }
  );
  checkScrollFallback(); // catch counters already in view on load
}

/* ------------------------------ Star rating widget --------------------------- */
function initStarRating() {
  const starRow = document.getElementById("starRow");
  const hint = document.getElementById("ratingHint");
  const highFollowup = document.getElementById("highRatingFollowup");
  const lowForm = document.getElementById("lowRatingForm");
  if (!starRow) return;

  const stars = Array.from(starRow.querySelectorAll(".star-btn"));
  let selected = 0;

  const paint = (value, cls) => {
    stars.forEach((btn) => {
      const idx = Number(btn.dataset.star);
      btn.classList.toggle(cls, idx <= value);
    });
  };

  stars.forEach((btn) => {
    btn.addEventListener("mouseenter", () => paint(Number(btn.dataset.star), "is-hover"));
    btn.addEventListener("mouseleave", () => paint(selected, "is-hover"));
    btn.addEventListener("focus", () => paint(Number(btn.dataset.star), "is-hover"));
    btn.addEventListener("blur", () => paint(selected, "is-hover"));

    btn.addEventListener("click", () => {
      selected = Number(btn.dataset.star);
      stars.forEach((b) => b.setAttribute("aria-checked", String(Number(b.dataset.star) === selected)));
      paint(selected, "is-active");
      paint(0, "is-hover");
      handleRatingSelected(selected);
    });
  });

  function handleRatingSelected(rating) {
    lowForm.classList.remove("is-visible");
    highFollowup.classList.remove("is-visible");
    document.getElementById("fbSuccess").classList.remove("is-visible");

    if (rating >= 4) {
      hint.textContent = "Thanks for the great rating!";
      highFollowup.classList.add("is-visible");
      // Give the user a beat to see the confirmation, then send them to Google.
      window.setTimeout(() => {
        window.open(CONFIG.GOOGLE_REVIEW_URL, "_blank", "noopener");
      }, 900);
    } else {
      hint.textContent = "We're sorry to hear that. Please tell us what happened below.";
      lowForm.classList.add("is-visible");
      const firstField = document.getElementById("fbName");
      if (firstField) firstField.focus({ preventScroll: true });
    }
  }
}

/* ------------------------------ Low-star feedback form ------------------------ */
function initFeedbackForm() {
  const form = document.getElementById("lowRatingForm");
  const success = document.getElementById("fbSuccess");
  if (!form) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const data = {
      name: form.fbName.value.trim(),
      contact: form.fbEmail.value.trim(),
      message: form.fbMessage.value.trim(),
      rating: document.querySelectorAll(".star-btn.is-active").length,
      submittedAt: new Date().toISOString(),
    };
    await submitFeedback(data);
    success.classList.add("is-visible");
    form.reset();
  });
}

/**
 * Delivers 1-3 star feedback to Car Zone. Currently a front-end-only stub —
 * wire this to a real backend to actually deliver mail. Two drop-in options:
 *
 * Option A — form backend (Formspree/EmailJS, recommended, no server needed):
 *   const res = await fetch(CONFIG.FEEDBACK_ENDPOINT, {
 *     method: "POST",
 *     headers: { "Content-Type": "application/json", Accept: "application/json" },
 *     body: JSON.stringify(data),
 *   });
 *
 * Option B — mailto: (zero backend, opens the visitor's email client):
 *   const subject = encodeURIComponent(`Low-star feedback from ${data.name}`);
 *   const body = encodeURIComponent(`${data.message}\n\nContact: ${data.contact}`);
 *   window.location.href = `mailto:service@carzoneautobaytown.com?subject=${subject}&body=${body}`;
 */
async function submitFeedback(data) {
  if (CONFIG.FEEDBACK_ENDPOINT) {
    try {
      await fetch(CONFIG.FEEDBACK_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(data),
      });
      return;
    } catch (err) {
      console.error("Feedback submission failed:", err);
    }
  }
  // DEMO fallback — no backend configured yet.
  console.info("[DEMO] Low-star feedback captured (not yet sent — see submitFeedback() in js/main.js):", data);
}

/* ------------------------------ Lazy SDK loaders ------------------------------ */
/* Third-party scripts/styles are only ever requested when a live feature is
   actually configured — zero external network calls in demo mode. */
const _loadedScripts = {};
function loadScript(src) {
  if (_loadedScripts[src]) return _loadedScripts[src];
  _loadedScripts[src] = new Promise((resolve, reject) => {
    const s = document.createElement("script");
    s.src = src;
    s.async = true;
    s.onload = resolve;
    s.onerror = reject;
    document.head.appendChild(s);
  });
  return _loadedScripts[src];
}
function loadStylesheet(href) {
  if (document.querySelector(`link[href="${href}"]`)) return;
  const l = document.createElement("link");
  l.rel = "stylesheet";
  l.href = href;
  document.head.appendChild(l);
}

/* ---------------------------------- Calendly --------------------------------- */
function initCalendly() {
  const mount = document.getElementById("calendlyEmbed");
  if (!mount || !LIVE_BOOKING) return; // fallback markup already in HTML

  loadStylesheet("https://assets.calendly.com/assets/external/widget.css");
  loadScript("https://assets.calendly.com/assets/external/widget.js")
    .then(() => {
      mount.innerHTML = "";
      window.Calendly.initInlineWidget({
        url: CONFIG.CALENDLY_URL,
        parentElement: mount,
      });
    })
    .catch(() => console.warn("Calendly widget failed to load — showing fallback."));
}

/* ============================================================================
   AI Assistant (Zoe) — chat + voice
   Runs in DEMO_MODE (simulated, on-page responses) until CONFIG.VAPI_PUBLIC_KEY
   and CONFIG.VAPI_ASSISTANT_ID are set, at which point it connects to your real
   Vapi assistant for live conversation + tool-calling based booking.
   ========================================================================== */
function initAiPanel() {
  const panel = document.getElementById("aiPanel");
  const launcherBtn = document.getElementById("aiLauncherBtn");
  const closeBtn = document.getElementById("aiPanelClose");
  const heroBtn = document.getElementById("heroAiBtn");
  const copyBtn = document.getElementById("aiCopyBtn");
  const badge = document.getElementById("demoBadge");
  const statusText = document.getElementById("aiStatusText");
  const chatBody = document.getElementById("aiChatBody");
  const input = document.getElementById("aiChatInput");
  const sendBtn = document.getElementById("aiSendBtn");
  const micBtn = document.getElementById("aiMicBtn");
  const tabChat = document.getElementById("tabChat");
  const tabVoice = document.getElementById("tabVoice");
  if (!panel || !launcherBtn) return;

  if (badge) badge.style.display = LIVE_VOICE ? "none" : "inline-flex";
  if (statusText) statusText.textContent = LIVE_VOICE ? "Online now" : "Online now (demo)";

  const openPanel = () => {
    panel.classList.add("is-open");
    launcherBtn.setAttribute("aria-expanded", "true");
    window.setTimeout(() => input && input.focus(), 250);
  };
  const closePanel = () => {
    panel.classList.remove("is-open");
    launcherBtn.setAttribute("aria-expanded", "false");
  };

  launcherBtn.addEventListener("click", () => {
    panel.classList.contains("is-open") ? closePanel() : openPanel();
  });
  closeBtn && closeBtn.addEventListener("click", closePanel);
  heroBtn && heroBtn.addEventListener("click", openPanel);
  copyBtn && copyBtn.addEventListener("click", openPanel);
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closePanel();
  });

  let mode = "chat";
  const setMode = (next) => {
    mode = next;
    tabChat.classList.toggle("is-active", next === "chat");
    tabVoice.classList.toggle("is-active", next === "voice");
    tabChat.setAttribute("aria-pressed", String(next === "chat"));
    tabVoice.setAttribute("aria-pressed", String(next === "voice"));
  };
  tabChat && tabChat.addEventListener("click", () => setMode("chat"));
  tabVoice && tabVoice.addEventListener("click", () => setMode("voice"));

  function appendBubble(text, from) {
    const bubble = document.createElement("div");
    bubble.className = `chat-bubble ${from}`;
    bubble.textContent = text;
    chatBody.appendChild(bubble);
    chatBody.scrollTop = chatBody.scrollHeight;
    return bubble;
  }

  function showTyping() {
    const typing = document.createElement("div");
    typing.className = "chat-typing";
    typing.innerHTML = "<span></span><span></span><span></span>";
    chatBody.appendChild(typing);
    chatBody.scrollTop = chatBody.scrollHeight;
    return typing;
  }

  function demoReply(userText) {
    const t = userText.toLowerCase();
    if (/(book|appoint|schedul|slot|available|thursday|tomorrow|today)/.test(t)) {
      return "I can get that on the calendar for you. Scroll down to “Book Your Appointment” and pick any open slot — or give me a day/time that works and I'll flag it for our front desk to confirm.";
    }
    if (/(price|cost|how much|charge)/.test(t)) {
      return "Pricing depends on your vehicle and the specific issue, but we always give a free written estimate before any work starts — no surprises. Want me to book a diagnostic?";
    }
    if (/(hour|open|close)/.test(t)) {
      return "We're open Monday–Friday 7:30 AM–6:00 PM and Saturday 8:00 AM–4:00 PM, closed Sundays.";
    }
    if (/(brake)/.test(t)) {
      return "We do free brake inspections and back every brake job with a 24-month/24,000-mile warranty. Want me to check availability this week?";
    }
    if (/(oil)/.test(t)) {
      return "Full-synthetic oil changes usually take about 30 minutes, no appointment strictly required — but I can reserve you a spot so there's no wait.";
    }
    if (/(ac|air condition|heat)/.test(t)) {
      return "We handle AC diagnostics, recharges, and compressor repair — especially busy this time of year in Baytown. Want me to find you the next open slot?";
    }
    return "Got it! I can answer questions about our services, hours, and pricing, or get you booked in directly. What would you like to do?";
  }

  function handleUserMessage(text) {
    if (!text.trim()) return;
    appendBubble(text, "user");
    input.value = "";

    if (LIVE_VOICE && window.vapiInstance && mode === "voice") {
      // In live voice mode, messages are spoken/handled by Vapi directly.
      return;
    }

    const typing = showTyping();
    window.setTimeout(() => {
      typing.remove();
      appendBubble(demoReply(text), "bot");
    }, 700 + Math.random() * 500);
  }

  sendBtn && sendBtn.addEventListener("click", () => handleUserMessage(input.value));
  input &&
    input.addEventListener("keydown", (e) => {
      if (e.key === "Enter") handleUserMessage(input.value);
    });

  micBtn && micBtn.addEventListener("click", () => toggleVoice(micBtn, statusText, appendBubble, handleUserMessage));
}

/* ------------------------------- Voice handling ------------------------------- */
let voiceActive = false;

function toggleVoice(micBtn, statusText, appendBubble, handleUserMessage) {
  if (LIVE_VOICE) {
    liveVoiceToggle(micBtn, statusText, appendBubble);
    return;
  }

  // DEMO MODE: simulate listening -> transcription -> reply, no real audio capture.
  if (voiceActive) return;
  voiceActive = true;
  micBtn.classList.add("is-listening");
  statusText.textContent = "Listening…";

  window.setTimeout(() => {
    micBtn.classList.remove("is-listening");
    statusText.textContent = "Online now (demo)";
    voiceActive = false;
    const simulatedTranscript = "Do you have any openings for an oil change this week?";
    handleUserMessage(simulatedTranscript);
  }, 1800);
}

/**
 * Live voice via Vapi Web SDK (loaded on-demand, only in live mode). Requires
 * CONFIG.VAPI_PUBLIC_KEY and CONFIG.VAPI_ASSISTANT_ID (see top of this file).
 * Configure your Vapi Assistant with a "book appointment" tool/function so
 * it can write directly to your calendar.
 */
function liveVoiceToggle(micBtn, statusText, appendBubble) {
  const start = () => {
    if (!window.vapiInstance) {
      window.vapiInstance = new Vapi(CONFIG.VAPI_PUBLIC_KEY);

      window.vapiInstance.on("call-start", () => {
        micBtn.classList.add("is-listening");
        statusText.textContent = "Listening…";
      });
      window.vapiInstance.on("call-end", () => {
        micBtn.classList.remove("is-listening");
        statusText.textContent = "Online now";
      });
      window.vapiInstance.on("message", (msg) => {
        if (msg.type === "transcript" && msg.transcriptType === "final") {
          appendBubble(msg.transcript, msg.role === "assistant" ? "bot" : "user");
        }
      });
    }

    if (micBtn.classList.contains("is-listening")) {
      window.vapiInstance.stop();
    } else {
      window.vapiInstance.start(CONFIG.VAPI_ASSISTANT_ID);
    }
  };

  if (typeof Vapi === "undefined") {
    statusText.textContent = "Connecting…";
    loadScript("https://cdn.jsdelivr.net/npm/@vapi-ai/web@2.1.5/dist/index.js")
      .then(start)
      .catch(() => {
        statusText.textContent = "Voice unavailable — try chat instead";
        console.error("Vapi SDK failed to load.");
      });
    return;
  }
  start();
}

/* ============================================================================
   Management login (demo-only — see CONFIG.MGMT_USERNAME/MGMT_PASSWORD above)
   ========================================================================== */
const MGMT_SESSION_KEY = "carZoneMgmtSignedIn";

function initManagementLogin() {
  const trigger = document.getElementById("mgmtLoginTrigger");
  const loginOverlay = document.getElementById("loginOverlay");
  const loginClose = document.getElementById("loginClose");
  const loginForm = document.getElementById("loginForm");
  const loginError = document.getElementById("loginError");
  const mgmtOverlay = document.getElementById("mgmtOverlay");
  const mgmtClose = document.getElementById("mgmtClose");
  const mgmtLogoutBtn = document.getElementById("mgmtLogoutBtn");
  if (!trigger || !loginOverlay || !mgmtOverlay) return;

  const openOverlay = (el) => el.classList.add("is-open");
  const closeOverlay = (el) => el.classList.remove("is-open");

  const openLogin = () => {
    loginError.classList.remove("is-visible");
    loginForm.reset();
    openOverlay(loginOverlay);
    window.setTimeout(() => document.getElementById("loginUsername").focus(), 200);
  };
  const openMgmt = () => openOverlay(mgmtOverlay);

  trigger.addEventListener("click", () => {
    if (sessionStorage.getItem(MGMT_SESSION_KEY) === "true") {
      openMgmt();
    } else {
      openLogin();
    }
  });

  loginClose && loginClose.addEventListener("click", () => closeOverlay(loginOverlay));
  mgmtClose && mgmtClose.addEventListener("click", () => closeOverlay(mgmtOverlay));
  [loginOverlay, mgmtOverlay].forEach((overlay) => {
    overlay.addEventListener("click", (e) => {
      if (e.target === overlay) closeOverlay(overlay);
    });
  });
  document.addEventListener("keydown", (e) => {
    if (e.key !== "Escape") return;
    closeOverlay(loginOverlay);
    closeOverlay(mgmtOverlay);
  });

  loginForm &&
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const username = document.getElementById("loginUsername").value.trim();
      const password = document.getElementById("loginPassword").value;

      if (username === CONFIG.MGMT_USERNAME && password === CONFIG.MGMT_PASSWORD) {
        sessionStorage.setItem(MGMT_SESSION_KEY, "true");
        closeOverlay(loginOverlay);
        openMgmt();
      } else {
        loginError.classList.add("is-visible");
      }
    });

  mgmtLogoutBtn &&
    mgmtLogoutBtn.addEventListener("click", () => {
      sessionStorage.removeItem(MGMT_SESSION_KEY);
      closeOverlay(mgmtOverlay);
    });
}
