const i18n = window.portfolioI18n;
const localize = (text) => i18n?.t(text) || text;

const projects = [
  {
    id: "cinematic-edit",
    title: "Cinematic edit",
    category: "VIDEO EDITING",
    filter: "video",
    description: "A concept study in atmosphere, image and editorial rhythm. Replace this placeholder with a real film, its story and your contribution.",
    year: "TBC",
    image: "",
    video: "",
    tools: [],
    role: "CONCEPT PLACEHOLDER",
    art: "art-cinema",
    featured: true,
    link: ""
  },
  {
    id: "youtube-gaming",
    title: "YouTube / gaming",
    category: "VIDEO EDITING",
    filter: "video",
    description: "A placeholder for long-form gaming edits: pacing, clarity and visual energy, built around the story in the footage.",
    year: "TBC",
    image: "",
    video: "",
    tools: [],
    role: "CONCEPT PLACEHOLDER",
    art: "art-gaming",
    featured: true,
    link: ""
  },
  {
    id: "motion-study",
    title: "Motion design",
    category: "MOTION DESIGN",
    filter: "motion",
    description: "A graphic movement study exploring how typography, shape and timing can give a visual idea its own pulse.",
    year: "TBC",
    image: "",
    video: "",
    tools: [],
    role: "CONCEPT PLACEHOLDER",
    art: "art-motion",
    featured: true,
    link: ""
  },
  {
    id: "web-experience",
    title: "Web experience",
    category: "WEB DESIGN",
    filter: "web",
    description: "A placeholder for an editorial digital experience. Replace with project context, interface imagery and the live destination when ready.",
    year: "TBC",
    image: "",
    video: "",
    tools: [],
    role: "CONCEPT PLACEHOLDER",
    art: "art-web",
    featured: true,
    link: ""
  },
  {
    id: "creative-direction",
    title: "Creative direction",
    category: "MOTION DESIGN",
    filter: "motion",
    description: "A visual direction placeholder for a cohesive image world: tone, composition, typography and movement working as one.",
    year: "TBC",
    image: "",
    video: "",
    tools: [],
    role: "CONCEPT PLACEHOLDER",
    art: "art-direction",
    featured: true,
    link: ""
  },
  {
    id: "short-form",
    title: "Short form",
    category: "VIDEO EDITING",
    filter: "video",
    description: "A short-form concept placeholder. Replace with vertical edits, social cutdowns or a campaign sequence when available.",
    year: "TBC",
    image: "",
    video: "",
    tools: [],
    role: "CONCEPT PLACEHOLDER",
    art: "art-short",
    featured: true,
    link: ""
  }
];

const showreelMedia = {
  video: "",
  poster: ""
};

const yearElements = document.querySelectorAll("[data-year]");
yearElements.forEach((element) => {
  element.textContent = new Date().getFullYear();
});

const header = document.querySelector("[data-header]");
let headerFrame = 0;
window.addEventListener("scroll", () => {
  if (headerFrame) return;
  headerFrame = window.requestAnimationFrame(() => {
    header?.classList.toggle("is-compact", window.scrollY > 40);
    headerFrame = 0;
  });
}, { passive: true });

const heroAtmosphere = document.querySelector(".hero");
if (heroAtmosphere && "IntersectionObserver" in window) {
  const atmosphereObserver = new IntersectionObserver(([entry]) => {
    heroAtmosphere.classList.toggle("is-atmosphere-active", entry.isIntersecting);
  }, { threshold: 0.01 });
  atmosphereObserver.observe(heroAtmosphere);
} else {
  heroAtmosphere?.classList.add("is-atmosphere-active");
}

const menuToggle = document.querySelector(".menu-toggle");
const mobileNav = document.querySelector(".mobile-nav");

if (menuToggle && mobileNav) {
  const setMenuOpen = (isOpen) => {
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute("aria-label", localize(isOpen ? "Close navigation" : "Open navigation"));
    mobileNav.classList.toggle("is-open", isOpen);
    mobileNav.inert = !isOpen;
    document.body.classList.toggle("menu-open", isOpen);
    if (isOpen) mobileNav.querySelector("a")?.focus();
  };

  menuToggle.addEventListener("click", () => {
    playInterfaceTone();
    setMenuOpen(menuToggle.getAttribute("aria-expanded") !== "true");
  });
  mobileNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => setMenuOpen(false));
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && menuToggle.getAttribute("aria-expanded") === "true") {
      setMenuOpen(false);
      menuToggle.focus();
    }
  });
}

const createProjectArt = (project) => {
  const art = document.createElement("span");
  art.className = `project-art ${project.art}`;
  art.setAttribute("aria-hidden", "true");

  if (project.art === "art-cinema" || project.art === "art-gaming" || project.art === "art-web" || project.art === "art-short") {
    const sun = document.createElement("span");
    sun.className = "art-sun";
    art.append(sun);
  }
  if (project.art === "art-cinema") {
    const figure = document.createElement("span");
    figure.className = "art-figure";
    art.append(figure);
  }
  if (project.art === "art-web") {
    const windowFrame = document.createElement("span");
    windowFrame.className = "art-web-window";
    art.append(windowFrame);
  }
  if (project.art === "art-short") {
    const bars = document.createElement("span");
    bars.className = "art-short-bars";
    art.append(bars);
  }
  if (project.image) {
    const image = document.createElement("img");
    image.src = project.image;
    image.alt = "";
    image.loading = "lazy";
    image.decoding = "async";
    art.append(image);
  }
  return art;
};

const enableHoverPreview = (element, project) => {
  if (!project.video) return;
  let preview;
  element.addEventListener("pointerenter", (event) => {
    if (event.pointerType !== "mouse" || preview) return;
    const showPreviewError = () => {
      let notice = element.querySelector(".preview-error");
      if (!notice) {
        notice = document.createElement("span");
        notice.className = "preview-error mono";
        notice.textContent = "PREVIEW UNAVAILABLE — OPEN FOR DETAILS";
        element.append(notice);
      }
    };
    preview = document.createElement("video");
    preview.src = project.video;
    if (project.image) preview.poster = project.image;
    preview.muted = true;
    preview.loop = true;
    preview.playsInline = true;
    preview.preload = "none";
    preview.className = "project-preview-video";
    preview.addEventListener("error", showPreviewError, { once: true });
    element.append(preview);
    preview.play().catch(() => {
      showPreviewError();
    });
  });
  element.addEventListener("pointerleave", () => {
    if (!preview) return;
    preview.pause();
    preview.removeAttribute("src");
    preview.load();
    preview.remove();
    preview = null;
  });
};

const dialog = document.querySelector("[data-project-dialog]");
const dialogMedia = dialog?.querySelector("[data-dialog-media]");
const dialogTitle = dialog?.querySelector("[data-dialog-title]");
const dialogMeta = dialog?.querySelector("[data-dialog-meta]");
const dialogDescription = dialog?.querySelector("[data-dialog-description]");
const dialogTags = dialog?.querySelector("[data-dialog-tags]");
const dialogContact = dialog?.querySelector("[data-dialog-contact]");
let activeVideo = null;

const closeProjectDialog = () => {
  if (!dialog?.open) return;
  activeVideo?.pause();
  activeVideo = null;
  dialog.close();
};

const openProject = (project) => {
  if (!dialog || !dialogMedia || !dialogTitle || !dialogDescription || !dialogMeta || !dialogTags) return;
  playInterfaceTone();

  dialogTitle.textContent = localize(project.title);
  dialogMeta.textContent = `${localize(project.role)} / ${localize(project.category)} / ${localize(project.year)}`;
  dialogDescription.textContent = localize(project.description);
  dialogTags.replaceChildren();
  const tags = project.tools.length ? project.tools : [localize(project.category), localize("FOOTAGE / ARTWORK TO ADD")];
  tags.forEach((tag) => {
    const item = document.createElement("span");
    item.textContent = tag;
    dialogTags.append(item);
  });
  if (dialogContact) {
    dialogContact.href = project.link || (window.location.pathname.endsWith("index.html") || window.location.pathname === "/"
      ? "#contact"
      : "index.html#contact");
    dialogContact.textContent = localize(project.link ? "VISIT PROJECT ↗" : "DISCUSS A SIMILAR PROJECT ↗");
    if (project.link) {
      dialogContact.target = "_blank";
      dialogContact.rel = "noopener noreferrer";
    } else {
      dialogContact.removeAttribute("target");
      dialogContact.removeAttribute("rel");
    }
  }
  dialogMedia.replaceChildren(createProjectArt(project));

  if (project.video) {
    const video = document.createElement("video");
    video.src = project.video;
    if (project.image) video.poster = project.image;
    video.controls = true;
    video.muted = true;
    video.playsInline = true;
    video.preload = "none";
    const mediaNotice = document.createElement("span");
    mediaNotice.className = "dialog-media-placeholder mono";
    mediaNotice.setAttribute("role", "status");
    mediaNotice.textContent = localize("VIDEO COULD NOT START — CHECK THE MEDIA PATH OR USE THE PLAYER CONTROLS.");
    mediaNotice.hidden = true;
    video.addEventListener("error", () => {
      mediaNotice.hidden = false;
    }, { once: true });
    dialogMedia.append(video);
    dialogMedia.append(mediaNotice);
    activeVideo = video;
  } else {
    const placeholder = document.createElement("span");
    placeholder.className = "dialog-media-placeholder mono";
    placeholder.textContent = localize("PROJECT MEDIA PLACEHOLDER — ADD A POSTER OR VIDEO URL IN script.js");
    dialogMedia.append(placeholder);
  }

  if (!dialog.open) dialog.showModal();
  document.body.classList.add("dialog-open");
  if (activeVideo) {
    activeVideo.play().catch(() => {
      const mediaNotice = dialogMedia.querySelector('[role="status"]');
      if (mediaNotice) mediaNotice.hidden = false;
    });
  }
};

if (dialog) {
  dialog.querySelector("[data-dialog-close]")?.addEventListener("click", closeProjectDialog);
  dialogContact?.addEventListener("click", () => {
    if (!dialogContact.target) closeProjectDialog();
  });
  dialog.addEventListener("close", () => {
    activeVideo?.pause();
    activeVideo = null;
    document.body.classList.remove("dialog-open");
  });
  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) closeProjectDialog();
  });
}

const workSection = document.querySelector(".work-section");
const projectTrack = document.querySelector("[data-project-track]");
const archiveGrid = document.querySelector("[data-project-grid]");
const projectButtonLabel = (verb, project) => i18n?.language === "fr"
  ? `${verb === "Open" ? "Ouvrir le projet" : "Voir le projet"} ${localize(project.title)}`
  : `${verb} ${project.title} project details`;

const makeWorkCard = (project, index) => {
  const card = document.createElement("article");
  card.className = "work-card";
  card.dataset.projectIndex = String(index);
  card.setAttribute("aria-label", `${localize(project.category)}: ${localize(project.title)}`);
  const visual = document.createElement("div");
  visual.className = "work-card-visual";
  visual.append(createProjectArt(project));
  const top = document.createElement("span");
  top.className = "work-card-top mono";
  top.innerHTML = `<span>${String(index + 1).padStart(2, "0")} / <span>${project.category}</span></span><span>${project.year}</span>`;
  const info = document.createElement("span");
  info.className = "work-card-info";
  info.innerHTML = `<span><p class="mono">${project.role}</p><h3>${project.title}</h3></span><span class="mono">OPEN<br>PROJECT ↗</span>`;
  const button = document.createElement("button");
  button.className = "work-card-open";
  button.type = "button";
  button.dataset.projectIndex = String(index);
  button.setAttribute("aria-label", projectButtonLabel("Open", project));
  button.dataset.cursor = project.video ? "PLAY" : "VIEW";
  button.addEventListener("click", () => openProject(project));
  enableHoverPreview(visual, project);
  card.append(visual, top, info, button);
  return card;
};

const makeArchiveCard = (project, index) => {
  const article = document.createElement("article");
  article.className = "archive-card";
  article.dataset.category = project.filter;
  article.dataset.projectIndex = String(index);
  const button = document.createElement("button");
  button.className = "archive-card-button";
  button.type = "button";
  button.dataset.cursor = project.video ? "PLAY" : "VIEW";
  button.dataset.projectIndex = String(index);
  button.setAttribute("aria-label", projectButtonLabel("View", project));
  const art = document.createElement("span");
  art.className = "archive-art";
  art.append(createProjectArt(project));
  const indexLabel = document.createElement("span");
  indexLabel.className = "archive-index mono";
  indexLabel.innerHTML = `${String(index + 1).padStart(2, "0")} / <span>${project.year}</span>`;
  const view = document.createElement("span");
  view.className = "archive-view";
  view.setAttribute("aria-hidden", "true");
  view.textContent = "↗";
  art.append(indexLabel, view);
  button.append(art);
  button.addEventListener("click", () => openProject(project));
  enableHoverPreview(art, project);
  const copy = document.createElement("div");
  copy.className = "archive-card-copy";
  const text = document.createElement("div");
  const category = document.createElement("p");
  category.className = "mono";
  category.innerHTML = `<span>${project.category}</span> / <span>CONCEPT</span>`;
  const title = document.createElement("h2");
  title.textContent = project.title;
  text.append(category, title);
  const role = document.createElement("span");
  role.className = "mono";
  role.textContent = String(index + 1).padStart(2, "0");
  copy.append(text, role);
  article.append(button, copy);
  return article;
};

if (projectTrack) {
  projects.filter((project) => project.featured).forEach((project, index) => {
    projectTrack.append(makeWorkCard(project, projects.indexOf(project)));
  });
}

if (archiveGrid) {
  projects.forEach((project, index) => archiveGrid.append(makeArchiveCard(project, index)));
}

const workCards = projectTrack ? Array.from(projectTrack.children) : [];
const workCurrent = document.querySelector("[data-work-current]");
const workTotal = document.querySelector("[data-work-total]");
const workPrev = document.querySelector("[data-work-prev]");
const workNext = document.querySelector("[data-work-next]");
const workViewport = document.querySelector("[data-work-viewport]");
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
const wideScreen = window.matchMedia("(min-width: 901px)");
let horizontalFrame = 0;
let currentWorkIndex = 0;
let workViewportFlowOffset = 0;

if (workTotal) workTotal.textContent = String(workCards.length).padStart(2, "0");

const travelForProjects = () => projectTrack && workViewport
  ? Math.max(0, projectTrack.scrollWidth - workViewport.clientWidth)
  : 0;

const workScrollStart = () => workSection && workViewport
  ? workSection.getBoundingClientRect().top + window.scrollY + workViewportFlowOffset - window.innerHeight * .17
  : 0;

const setActiveProject = (index) => {
  currentWorkIndex = Math.max(0, Math.min(index, workCards.length - 1));
  if (workCurrent) workCurrent.textContent = String(currentWorkIndex + 1).padStart(2, "0");
};

const updateHorizontalWork = () => {
  horizontalFrame = 0;
  if (!workSection || !projectTrack || !workViewport || !wideScreen.matches || reducedMotion.matches) return;
  const distance = travelForProjects();
  const start = workScrollStart();
  const progress = Math.max(0, Math.min(1, (window.scrollY - start) / Math.max(distance, 1)));
  const offset = distance * progress;
  projectTrack.style.transform = `translate3d(${-offset}px,0,0)`;
  const viewportCenter = workViewport.clientWidth / 2 + offset;
  const index = workCards.reduce((closest, card, candidate) => {
    const center = card.offsetLeft + card.offsetWidth / 2;
    const closestCenter = workCards[closest].offsetLeft + workCards[closest].offsetWidth / 2;
    return Math.abs(center - viewportCenter) < Math.abs(closestCenter - viewportCenter) ? candidate : closest;
  }, 0);
  if (index !== currentWorkIndex) setActiveProject(index);
};

const requestHorizontalUpdate = () => {
  if (horizontalFrame) return;
  horizontalFrame = window.requestAnimationFrame(updateHorizontalWork);
};

const sizeHorizontalWork = () => {
  if (!workSection || !projectTrack || !workViewport) return;
  workSection.classList.toggle("is-static", !wideScreen.matches || reducedMotion.matches);
  projectTrack.style.removeProperty("transform");
  if (wideScreen.matches && !reducedMotion.matches) {
    const previousPosition = workViewport.style.position;
    const previousTop = workViewport.style.top;
    workViewport.style.position = "relative";
    workViewport.style.top = "auto";
    workViewportFlowOffset = workViewport.getBoundingClientRect().top - workSection.getBoundingClientRect().top;
    workViewport.style.position = previousPosition;
    workViewport.style.top = previousTop;
    const distance = travelForProjects();
    workSection.style.height = `${workViewportFlowOffset + workViewport.offsetHeight + distance}px`;
  } else {
    workSection.style.removeProperty("height");
  }
  requestHorizontalUpdate();
};

if (workSection && workCards.length) {
  window.addEventListener("scroll", requestHorizontalUpdate, { passive: true });
  window.addEventListener("resize", sizeHorizontalWork);
  wideScreen.addEventListener?.("change", sizeHorizontalWork);
  reducedMotion.addEventListener?.("change", sizeHorizontalWork);
  document.fonts?.ready.then(sizeHorizontalWork);
  projectTrack.querySelectorAll(".work-card-open").forEach((button) => {
    button.addEventListener("pointerenter", () => {
      const index = workCards.indexOf(button.closest(".work-card"));
      setActiveProject(index);
    });
  });
  workPrev?.addEventListener("click", () => navigateWork(-1));
  workNext?.addEventListener("click", () => navigateWork(1));
  sizeHorizontalWork();
}

function navigateWork(direction) {
  if (!workCards.length || !projectTrack) return;
  const nextIndex = Math.max(0, Math.min(currentWorkIndex + direction, workCards.length - 1));
  setActiveProject(nextIndex);
  if (wideScreen.matches && !reducedMotion.matches && workSection) {
    const travel = travelForProjects();
    const card = workCards[nextIndex];
    const targetOffset = Math.max(0, Math.min(travel, card.offsetLeft + card.offsetWidth / 2 - workViewport.clientWidth / 2));
    window.scrollTo({ top: workScrollStart() + targetOffset, behavior: reducedMotion.matches ? "auto" : "smooth" });
  } else {
    const card = workCards[nextIndex];
    projectTrack.scrollTo({ left: card.offsetLeft - projectTrack.offsetLeft, behavior: reducedMotion.matches ? "auto" : "smooth" });
  }
}

const filterButtons = document.querySelectorAll("[data-filter]");
if (archiveGrid && filterButtons.length) {
  const status = document.querySelector(".filter-status");
  const params = new URLSearchParams(window.location.search);
  const requestedFilter = params.get("filter");
  const allowedFilters = new Set(["all", "video", "motion", "web"]);
  const initialFilter = allowedFilters.has(requestedFilter) ? requestedFilter : "all";

  const applyProjectFilter = (filter, selectedButton) => {
    let count = 0;
    filterButtons.forEach((button) => {
      const isActive = button === selectedButton;
      button.classList.toggle("is-active", isActive);
      button.setAttribute("aria-pressed", String(isActive));
    });
    archiveGrid.querySelectorAll(".archive-card").forEach((card) => {
      const visible = filter === "all" || card.dataset.category === filter;
      card.hidden = !visible;
      if (visible) count += 1;
    });
    if (status) {
      status.innerHTML = `<span>${String(count).padStart(2, "0")}</span> <span>${count === 1 ? "PROJECT" : "PROJECTS"}</span>`;
      i18n?.refresh();
    }
  };

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => applyProjectFilter(button.dataset.filter, button));
  });
  const selectedButton = Array.from(filterButtons).find((button) => button.dataset.filter === initialFilter);
  applyProjectFilter(initialFilter, selectedButton || filterButtons[0]);
}

document.querySelectorAll("[data-showreel]").forEach((button) => {
  button.addEventListener("click", () => {
    openProject({
      title: "Showreel",
      category: "VIDEO / MOTION / WEB",
      year: "TBC",
      role: "REEL PLACEHOLDER",
      description: localize("Add your real showreel video by setting the video path in showreelMedia at the top of script.js. The video will only load after you open it."),
      tools: [],
      image: showreelMedia.poster,
      video: showreelMedia.video,
      art: "art-cinema",
      link: ""
    });
  });
});

const pointer = document.querySelector(".pointer-orb");
const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
if (pointer && finePointer.matches && !reducedMotion.matches) {
  document.body.classList.add("custom-pointer");
  let pointerFrame = 0;
  document.addEventListener("pointermove", (event) => {
    if (event.pointerType !== "mouse" || pointerFrame) return;
    pointerFrame = window.requestAnimationFrame(() => {
      pointer.style.transform = `translate3d(${event.clientX}px,${event.clientY}px,0) translate(-50%,-50%)`;
      pointer.classList.add("is-visible");
      pointerFrame = 0;
    });
  }, { passive: true });
  document.addEventListener("pointerover", (event) => {
    const target = event.target.closest("a, button");
    pointer.classList.toggle("is-active", Boolean(target));
    pointer.querySelector("span").textContent = target?.dataset.cursor || (target ? "OPEN" : "");
  });
  document.addEventListener("pointerout", (event) => {
    if (event.target.closest("a, button")) {
      pointer.classList.remove("is-active");
      pointer.querySelector("span").textContent = "";
    }
  });
}

const heroParallax = document.querySelector("[data-parallax]");
if (heroParallax && finePointer.matches && !reducedMotion.matches) {
  const heroImage = heroParallax.querySelector(".hero-image");
  heroParallax.addEventListener("pointermove", (event) => {
    if (event.pointerType !== "mouse" || !heroImage) return;
    const rect = heroParallax.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - .5;
    const y = (event.clientY - rect.top) / rect.height - .5;
    heroImage.style.setProperty("--parallax-x", `${x * -12}px`);
    heroImage.style.setProperty("--parallax-y", `${y * -12}px`);
  });
  heroParallax.addEventListener("pointerleave", () => {
    heroImage?.style.removeProperty("--parallax-x");
    heroImage?.style.removeProperty("--parallax-y");
  });
}

if (finePointer.matches && !reducedMotion.matches) {
  document.querySelectorAll(".contact-cta, .nav-contact").forEach((link) => {
    link.addEventListener("pointermove", (event) => {
      if (event.pointerType !== "mouse") return;
      const rect = link.getBoundingClientRect();
      const x = event.clientX - rect.left - rect.width / 2;
      const y = event.clientY - rect.top - rect.height / 2;
      link.style.transform = `translate3d(${x * .04}px,${y * .08}px,0)`;
    });
    link.addEventListener("pointerleave", () => link.style.removeProperty("transform"));
  });
}

const robotMarkup = (small = false) => `
  <span class="robot-avatar${small ? " robot-avatar-small" : ""}" aria-hidden="true">
    <span class="robot-scene">
      <span class="robot-model">
        <span class="robot-arm robot-arm-left"></span><span class="robot-arm robot-arm-right"></span>
        <span class="robot-shell">
          <span class="robot-face">
            <span class="robot-eye"></span><span class="robot-eye"></span>
            <span class="robot-mouth"></span>
          </span>
        </span>
      </span>
    </span>
  </span>`;

const assistantMarkup = `
  <button class="assistant-launcher" type="button" data-assistant-open aria-expanded="false" aria-controls="assistant-panel" data-cursor="ASK" aria-label="${localize("Open Ask Charlie assistant")}">${robotMarkup()}<span class="assistant-launcher-label">ASK CHARLIE</span></button>
  <section class="assistant-panel" id="assistant-panel" data-assistant-panel aria-label="Charlie portfolio assistant" aria-hidden="true" inert>
    <div class="assistant-head"><div class="assistant-identity">${robotMarkup(true)}<span class="assistant-status"></span><span class="mono">ASK CHARLIE</span></div><button type="button" data-assistant-close aria-label="Close assistant">×</button></div>
    <div class="assistant-intro"><p class="mono">A SMALL GUIDE TO THE WORK</p><h2>What are you<br>looking for?</h2></div>
    <div class="assistant-messages" data-assistant-messages aria-live="polite"><p class="assistant-message assistant-answer">I can point you toward Charlie’s disciplines, placeholder projects, or contact details.</p></div>
    <div class="assistant-suggestions"><button type="button" data-prompt="Who is Charlie?">Who is Charlie?</button><button type="button" data-prompt="Show me video work">Show me video work</button><button type="button" data-prompt="Show me the web design">Show me the web design</button><button type="button" data-prompt="What services are available?">Services?</button><button type="button" data-prompt="What tools does Charlie use?">What tools does Charlie use?</button><button type="button" data-prompt="How can I contact Charlie?">Contact Charlie</button></div>
    <form class="assistant-form" data-assistant-form><label class="visually-hidden" for="assistant-input">Ask a question</label><input id="assistant-input" name="question" placeholder="Ask about the work…" autocomplete="off" required><button type="submit" aria-label="Send question">↗</button></form>
    <p class="assistant-disclaimer mono">DEMO ASSISTANT / NO AI API CONNECTED</p>
  </section>`;

if (!document.querySelector("[data-assistant-panel]")) {
  document.body.insertAdjacentHTML("beforeend", assistantMarkup);
}
document.querySelectorAll(".assistant-launcher .robot-avatar").forEach((avatar) => {
  avatar.outerHTML = robotMarkup();
});
document.querySelectorAll(".assistant-identity .robot-avatar").forEach((avatar) => {
  avatar.outerHTML = robotMarkup(true);
});

const soundToggle = document.createElement("button");
soundToggle.className = "sound-toggle mono";
soundToggle.type = "button";
soundToggle.setAttribute("aria-pressed", "false");
soundToggle.textContent = localize("SOUND / OFF");
soundToggle.setAttribute("aria-label", "Turn interface sound on");
document.body.append(soundToggle);

let soundEnabled = false;
let translationsReady = false;
let audioContext;
let soundStorageAvailable = true;
const SoundContext = window.AudioContext;

try {
  soundEnabled = localStorage.getItem("charlie-portfolio-sound") === "on";
} catch {
  soundStorageAvailable = false;
}

const setSoundState = (enabled) => {
  soundEnabled = enabled;
  soundToggle.setAttribute("aria-pressed", String(enabled));
  soundToggle.textContent = `${translationsReady ? localize(`SOUND / ${enabled ? "ON" : "OFF"}`) : `SOUND / ${enabled ? "ON" : "OFF"}`}${soundStorageAvailable ? "" : "*"}`;
  soundToggle.setAttribute("aria-label", translationsReady ? localize(`Turn interface sound ${enabled ? "off" : "on"}`) : `Turn interface sound ${enabled ? "off" : "on"}`);
  soundToggle.title = soundStorageAvailable ? "Sound is off by default; your preference is saved." : "Your sound preference can only be kept for this session.";
};

const disableSound = () => {
  soundStorageAvailable = false;
  soundToggle.disabled = true;
  soundToggle.textContent = translationsReady ? localize("SOUND / UNAVAILABLE") : "SOUND / UNAVAILABLE";
  soundToggle.setAttribute("aria-label", translationsReady ? localize("Interface sound unavailable in this browser") : "Interface sound unavailable in this browser");
  soundToggle.title = "This browser could not start interface sound.";
};

const playInterfaceTone = () => {
  if (!soundEnabled || !SoundContext) return;
  try {
    audioContext ||= new SoundContext();
    if (audioContext.state === "suspended") audioContext.resume().catch(disableSound);
    const oscillator = audioContext.createOscillator();
    const gain = audioContext.createGain();
    const now = audioContext.currentTime;
    oscillator.type = "sine";
    oscillator.frequency.setValueAtTime(360, now);
    oscillator.frequency.exponentialRampToValueAtTime(190, now + 0.07);
    gain.gain.setValueAtTime(0.012, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.08);
    oscillator.connect(gain);
    gain.connect(audioContext.destination);
    oscillator.start(now);
    oscillator.stop(now + 0.08);
  } catch {
    disableSound();
  }
};

if (!SoundContext) disableSound();
else setSoundState(soundEnabled);

soundToggle.addEventListener("click", () => {
  if (!SoundContext) return;
  const nextState = !soundEnabled;
  try {
    localStorage.setItem("charlie-portfolio-sound", nextState ? "on" : "off");
  } catch {
    soundStorageAvailable = false;
  }
  setSoundState(nextState);
  playInterfaceTone();
});

const assistantPanel = document.querySelector("[data-assistant-panel]");
const assistantLauncher = document.querySelector("[data-assistant-open]");
const assistantClose = document.querySelector("[data-assistant-close]");
const assistantMessages = document.querySelector("[data-assistant-messages]");
const assistantForm = document.querySelector("[data-assistant-form]");
const assistantInput = assistantForm?.querySelector("input");
const assistantHistory = [];
let assistantOpeningTimer;
let assistantSpeakingTimer;

const setAssistantOpen = (isOpen) => {
  if (!assistantPanel || !assistantLauncher) return;
  assistantPanel.classList.toggle("is-open", isOpen);
  assistantPanel.setAttribute("aria-hidden", String(!isOpen));
  assistantPanel.inert = !isOpen;
  assistantLauncher.setAttribute("aria-expanded", String(isOpen));
  document.body.classList.toggle("assistant-open", isOpen);
  if (isOpen) assistantInput?.focus();
  else assistantLauncher.focus();
};

assistantLauncher?.addEventListener("click", () => {
  playInterfaceTone();
  if (assistantLauncher.getAttribute("aria-expanded") === "true") {
    setAssistantOpen(false);
    return;
  }
  if (assistantOpeningTimer) return;
  assistantLauncher.classList.add("is-waking");
  assistantPanel?.classList.add("is-opening");
  assistantOpeningTimer = window.setTimeout(() => {
    assistantLauncher.classList.remove("is-waking");
    assistantOpeningTimer = undefined;
    setAssistantOpen(true);
    window.setTimeout(() => assistantPanel?.classList.remove("is-opening"), 450);
  }, 150);
});
assistantClose?.addEventListener("click", () => setAssistantOpen(false));
assistantInput?.addEventListener("focus", () => assistantPanel?.classList.add("is-listening"));
assistantInput?.addEventListener("blur", () => assistantPanel?.classList.remove("is-listening"));
assistantInput?.addEventListener("input", () => assistantPanel?.classList.toggle("is-typing", assistantInput.value.length > 0));

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && assistantLauncher?.getAttribute("aria-expanded") === "true") {
    setAssistantOpen(false);
  }
});

const answerFor = (prompt) => {
  const text = prompt.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  if (text.includes("who") || text.includes("qui") || (text.includes("charlie") && !text.includes("contact") && !text.includes("tool") && !text.includes("logiciel"))) {
    return { text: localize("Charlie Pineau works across video editing, motion design and web design."), label: localize("MEET CHARLIE"), href: "a-propos.html" };
  }
  if (text.includes("video") || text.includes("edit") || text.includes("montage") || text.includes("gaming") || text.includes("showreel") || text.includes("bande-demo")) {
    return { text: localize("The archive includes concept placeholders for cinematic edits, gaming and short-form work."), label: localize("EXPLORE VIDEO WORK"), href: "projets.html?filter=video" };
  }
  if (text.includes("motion") || text.includes("mouvement")) {
    return { text: localize("Motion design is one of Charlie’s three disciplines. The archive’s motion studies are marked as placeholders."), label: localize("EXPLORE MOTION"), href: "projets.html?filter=motion" };
  }
  if (text.includes("web") || text.includes("website") || text.includes("site") || text.includes("design")) {
    return { text: localize("Charlie works on web design and digital experiences. The archive preview is a concept placeholder."), label: localize("EXPLORE WEB WORK"), href: "projets.html?filter=web" };
  }
  if (text.includes("service") || text.includes("offer") || text.includes("help") || text.includes("propose")) {
    return { text: localize("The three disciplines are video editing, motion design and web design."), label: localize("SEE SERVICES"), href: "services.html" };
  }
  if (text.includes("tool") || text.includes("software") || text.includes("logiciel")) {
    return { text: localize("Charlie’s software and tool list hasn’t been added to the portfolio yet, so I won’t guess."), label: localize("ABOUT CHARLIE"), href: "a-propos.html" };
  }
  if (text.includes("contact") || text.includes("email") || text.includes("mail") || text.includes("projet")) {
    return { text: localize("Let’s talk about your project. The contact address is marked as a placeholder and needs Charlie’s real email."), label: localize("CONTACT CHARLIE"), href: "index.html#contact" };
  }
  return { text: localize("I can help you find Charlie’s work, services, background or contact section. Try one of the prompts below."), label: localize("VIEW THE WORK"), href: "projets.html" };
};

const assistantService = {
  async reply(prompt) {
    await new Promise((resolve) => window.setTimeout(resolve, 360));
    return answerFor(prompt);
  }
};

const sendAssistantMessage = async (prompt) => {
  if (!assistantMessages || !prompt.trim()) return;
  window.clearTimeout(assistantSpeakingTimer);
  assistantPanel?.classList.remove("is-speaking");
  const question = document.createElement("p");
  question.className = "assistant-message assistant-question";
  question.textContent = localize(prompt.trim());
  assistantMessages.append(question);
  assistantPanel?.classList.remove("has-replied", "is-confused");
  assistantPanel?.classList.add("is-thinking");

  let responseData;
  try {
    responseData = await assistantService.reply(prompt);
  } catch {
    responseData = {
      text: localize("The assistant is unavailable right now. Please use the contact section to reach Charlie."),
      label: localize("CONTACT CHARLIE"),
      href: window.location.pathname.endsWith("index.html") || window.location.pathname === "/"
        ? "#contact"
        : "index.html#contact"
    };
  }
  const response = document.createElement("p");
  response.className = "assistant-message assistant-answer";
  response.textContent = responseData.text;
  const link = document.createElement("a");
  link.href = responseData.href;
  link.textContent = responseData.label;
  response.append(document.createElement("br"), link);
  assistantMessages.append(response);
  assistantHistory.push({ prompt: prompt.trim(), response: responseData });
  assistantPanel?.classList.remove("is-thinking");
  assistantPanel?.classList.add("has-replied");
  assistantPanel?.classList.toggle("is-confused", responseData.label === localize("VIEW THE WORK"));
  assistantPanel?.classList.add("is-speaking");
  assistantSpeakingTimer = window.setTimeout(() => {
    assistantPanel?.classList.remove("is-speaking");
  }, Math.min(1800, Math.max(700, responseData.text.length * 22)));
  assistantMessages.scrollTop = assistantMessages.scrollHeight;
};

window.addEventListener("portfolio-languagechange", () => {
  if (!assistantMessages || !assistantHistory.length) return;
  assistantMessages.replaceChildren();
  assistantHistory.forEach(({ prompt, response: previousResponse }) => {
    const question = document.createElement("p");
    question.className = "assistant-message assistant-question";
    question.textContent = localize(prompt);
    const responseData = answerFor(prompt);
    const response = document.createElement("p");
    response.className = "assistant-message assistant-answer";
    response.textContent = responseData.text || previousResponse.text;
    const link = document.createElement("a");
    link.href = responseData.href || previousResponse.href;
    link.textContent = responseData.label || previousResponse.label;
    response.append(document.createElement("br"), link);
    assistantMessages.append(question, response);
  });
  assistantMessages.scrollTop = assistantMessages.scrollHeight;
});

assistantForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  assistantPanel?.classList.remove("is-typing");
  sendAssistantMessage(assistantInput.value);
  assistantInput.value = "";
  assistantInput.focus();
});
document.querySelectorAll("[data-prompt]").forEach((button) => {
  button.addEventListener("click", () => sendAssistantMessage(button.dataset.prompt));
});

window.addEventListener("portfolio-languagechange", () => {
  document.querySelectorAll("[data-project-index]").forEach((element) => {
    const project = projects[Number(element.dataset.projectIndex)];
    if (!project) return;
    if (element.matches(".work-card")) {
      element.setAttribute("aria-label", `${localize(project.category)}: ${localize(project.title)}`);
    } else if (element.matches(".work-card-open")) {
      element.setAttribute("aria-label", projectButtonLabel("Open", project));
    } else if (element.matches(".archive-card-button")) {
      element.setAttribute("aria-label", projectButtonLabel("View", project));
    }
  });
});

i18n?.init();
translationsReady = true;
if (soundEnabled) setSoundState(true);
