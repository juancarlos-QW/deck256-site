"use strict";

/* ==========================================================
   CONFIGURAÇÃO — troque pelo número real do bar (com DDI 55 e DDD)
   ========================================================== */
const WHATSAPP = "5500000000000";

const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
const $ = (s, root = document) => root.querySelector(s);
const $$ = (s, root = document) => [...root.querySelectorAll(s)];

/* ---------- Links de WhatsApp ---------- */
function whatsappUrl(text = "") {
  return (
    `https://wa.me/${WHATSAPP}` +
    (text ? `?text=${encodeURIComponent(text)}` : "")
  );
}
$$("[data-whatsapp]").forEach((a) => {
  a.href = whatsappUrl(a.dataset.whatsapp);
  a.target = "_blank";
  a.rel = "noopener noreferrer";
});

/* ---------- Menu mobile ---------- */
const toggle = $(".nav-toggle");
const nav = $("#navigation");
$$("a", nav).forEach((a, i) => a.style.setProperty("--i", i));
function setNav(open) {
  nav.classList.toggle("open", open);
  toggle.setAttribute("aria-expanded", String(open));
  toggle.setAttribute("aria-label", open ? "Fechar menu" : "Abrir menu");
  document.body.classList.toggle("nav-open", open);
}
toggle.addEventListener("click", () =>
  setNav(toggle.getAttribute("aria-expanded") !== "true"),
);
$$("a", nav).forEach((a) => a.addEventListener("click", () => setNav(false)));
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && nav.classList.contains("open")) {
    setNav(false);
    toggle.focus();
  }
});

/* ---------- Header, barra de progresso, voltar ao topo e parallax ---------- */
const header = $(".site-header");
const progress = $(".scroll-progress");
const topButton = $(".back-top");
const parallax = $$("[data-parallax]");
let ticking = false;
function onScroll() {
  const y = window.scrollY;
  const max = document.documentElement.scrollHeight - innerHeight;
  header.classList.toggle("scrolled", y > 40);
  document.documentElement.classList.toggle("is-scrolled", y > 40);
  progress.style.setProperty("--progress", max > 0 ? y / max : 0);
  topButton.classList.toggle("show", y > 700);
  if (!reduceMotion) {
    parallax.forEach((el) => {
      const r = el.parentElement.getBoundingClientRect();
      if (r.bottom < 0 || r.top > innerHeight) return;
      const speed = parseFloat(el.dataset.parallax) || 0.2;
      el.style.transform = `translate3d(0, ${(r.top + r.height / 2 - innerHeight / 2) * -speed}px, 0)`;
    });
  }
  ticking = false;
}
window.addEventListener(
  "scroll",
  () => {
    if (!ticking) {
      requestAnimationFrame(onScroll);
      ticking = true;
    }
  },
  { passive: true },
);
onScroll();
topButton.addEventListener("click", () =>
  window.scrollTo({ top: 0, behavior: reduceMotion ? "instant" : "smooth" }),
);

/* ---------- Texto letra por letra (data-split) ---------- */
$$("[data-split]").forEach((el) => {
  const label = el.textContent.trim();
  let i = 0;
  const walk = (node) => {
    [...node.childNodes].forEach((child) => {
      if (child.nodeType === Node.TEXT_NODE) {
        const frag = document.createDocumentFragment();
        for (const ch of child.textContent) {
          if (ch.trim() === "") {
            frag.append(ch);
            continue;
          }
          const span = document.createElement("span");
          span.className = "char";
          span.textContent = ch;
          span.style.setProperty("--i", i++);
          span.setAttribute("aria-hidden", "true");
          frag.append(span);
        }
        child.replaceWith(frag);
      } else walk(child);
    });
  };
  walk(el);
  el.setAttribute("aria-label", label);
  el.classList.add("split-text");
});

/* ---------- Revelação ao rolar ---------- */
$$("[data-stagger]").forEach((group) =>
  [...group.children].forEach((child, i) => {
    child.style.setProperty("--i", i);
    if (!child.hasAttribute("data-reveal"))
      child.setAttribute("data-reveal", group.dataset.stagger || "");
  }),
);
const revealItems = $$("[data-reveal]");
if ("IntersectionObserver" in window && !reduceMotion) {
  const io = new IntersectionObserver(
    (entries) =>
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      }),
    { threshold: 0.15, rootMargin: "0px 0px -40px 0px" },
  );
  revealItems.forEach((el) => io.observe(el));
} else revealItems.forEach((el) => el.classList.add("is-visible"));

/* ---------- Luz que segue o mouse nos cards ---------- */
$$(".feature").forEach((card) =>
  card.addEventListener("pointermove", (e) => {
    const r = card.getBoundingClientRect();
    card.style.setProperty("--mx", `${e.clientX - r.left}px`);
    card.style.setProperty("--my", `${e.clientY - r.top}px`);
  }),
);

/* ---------- Efeito 3D (tilt) ---------- */
if (!reduceMotion)
  $$(".tilt").forEach((box) => {
    const inner = $(".tilt-inner", box);
    box.addEventListener("pointermove", (e) => {
      const r = box.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      inner.style.transform = `rotateY(${x * 14}deg) rotateX(${-y * 14}deg) scale(1.02)`;
    });
    box.addEventListener("pointerleave", () => (inner.style.transform = ""));
  });

/* ---------- Contagem regressiva ---------- */
$$("[data-countdown]").forEach((box) => {
  const target = new Date(box.dataset.countdown).getTime();
  const parts = $$("b", box);
  const tick = () => {
    const diff = target - Date.now();
    if (diff <= 0) {
      box.innerHTML = "<p class='form-note'>Esse já rolou! Fique de olho nos próximos eventos.</p>";
      clearInterval(timer);
      return;
    }
    const values = [
      diff / 864e5,
      (diff / 36e5) % 24,
      (diff / 6e4) % 60,
      (diff / 1e3) % 60,
    ].map((v) => String(Math.floor(v)).padStart(2, "0"));
    parts.forEach((b, i) => (b.textContent = values[i]));
  };
  const timer = setInterval(tick, 1000);
  tick();
});

/* ---------- Lightbox ---------- */
const viewer = $("#lightbox");
if (viewer) {
  const img = $("img", viewer);
  $$("[data-image]").forEach((button) =>
    button.addEventListener("click", () => {
      img.src = button.dataset.image;
      img.alt = $("img", button)?.alt || "";
      viewer.showModal();
    }),
  );
  $(".close-viewer", viewer).addEventListener("click", () => viewer.close());
  viewer.addEventListener("click", (e) => {
    if (e.target === viewer) viewer.close();
  });
}

/* ---------- Abas do cardápio ---------- */
const tabs = $$("[data-tab]");
const indicator = $(".tab-indicator");
function moveIndicator(tab) {
  if (!indicator || !tab) return;
  indicator.style.width = `${tab.offsetWidth}px`;
  indicator.style.transform = `translateX(${tab.offsetLeft}px)`;
}
function selectTab(key, focus = false) {
  const selected = tabs.find((t) => t.dataset.tab === key);
  if (!selected) return false;
  tabs.forEach((t) => {
    const active = t === selected;
    const panel = document.getElementById(t.getAttribute("aria-controls"));
    t.setAttribute("aria-selected", String(active));
    t.tabIndex = active ? 0 : -1;
    panel.hidden = !active;
    if (active) {
      panel.classList.remove("is-entering");
      void panel.offsetWidth; // reinicia a animação
      panel.classList.add("is-entering");
    }
  });
  moveIndicator(selected);
  selected.scrollIntoView({ block: "nearest", inline: "center", behavior: reduceMotion ? "instant" : "smooth" });
  if (focus) selected.focus();
  return true;
}
if (tabs.length) {
  tabs.forEach((tab, index) => {
    tab.addEventListener("click", () => {
      selectTab(tab.dataset.tab);
      history.replaceState(null, "", "#" + tab.dataset.tab);
    });
    tab.addEventListener("keydown", (e) => {
      let next;
      if (e.key === "ArrowRight") next = (index + 1) % tabs.length;
      if (e.key === "ArrowLeft") next = (index - 1 + tabs.length) % tabs.length;
      if (e.key === "Home") next = 0;
      if (e.key === "End") next = tabs.length - 1;
      if (next !== undefined) {
        e.preventDefault();
        selectTab(tabs[next].dataset.tab, true);
        history.replaceState(null, "", "#" + tabs[next].dataset.tab);
      }
    });
  });
  if (!selectTab(location.hash.slice(1))) moveIndicator(tabs[0]);
  window.addEventListener("hashchange", () => selectTab(location.hash.slice(1)));
  window.addEventListener("resize", () =>
    moveIndicator(tabs.find((t) => t.getAttribute("aria-selected") === "true")),
  );
  document.fonts?.ready.then(() =>
    moveIndicator(tabs.find((t) => t.getAttribute("aria-selected") === "true")),
  );
}

/* ---------- Cardápio: foto muda conforme o prato ---------- */
$$(".menu-panel").forEach((panel) => {
  const figure = $(".menu-panel-media", panel);
  const caption = $("figcaption", figure);
  const items = $$(".menu-item[data-img]", panel);
  if (!figure || !items.length) return;
  let current = $("img", figure);
  let active = null;

  function show(item) {
    if (item === active) return;
    active?.classList.remove("is-active");
    active = item;
    item.classList.add("is-active");

    const name = $("h3", item).firstChild.textContent.trim();
    caption.classList.remove("swap");
    void caption.offsetWidth; // reinicia a animação da legenda
    caption.textContent = name;
    caption.classList.add("swap");

    if (current.getAttribute("src") === item.dataset.img) return;
    const next = new Image();
    next.src = item.dataset.img;
    next.alt = name;
    next.className = "menu-photo-next";
    const reveal = () => {
      if (active !== item) return; // o usuário já passou para outro item
      figure.insertBefore(next, caption);
      requestAnimationFrame(() => next.classList.add("in"));
      const old = current;
      current = next;
      setTimeout(() => {
        old.remove();
        next.classList.remove("menu-photo-next", "in");
      }, reduceMotion ? 0 : 600);
    };
    next.decode ? next.decode().then(reveal, reveal) : (next.onload = reveal);
  }

  items.forEach((item) => {
    item.addEventListener("pointerenter", () => show(item));
    item.addEventListener("focus", () => show(item));
    item.addEventListener("click", () => {
      show(item);
      // no celular a foto fica acima da lista: garante que ela esteja visível
      if (matchMedia("(max-width: 860px)").matches) {
        const r = figure.getBoundingClientRect();
        if (r.bottom < 0 || r.top > innerHeight)
          figure.scrollIntoView({ block: "center", behavior: reduceMotion ? "instant" : "smooth" });
      }
    });
  });
});
// pré-carrega as fotos do cardápio depois que a página termina de carregar
window.addEventListener("load", () => {
  const preload = () =>
    $$(".menu-item[data-img]").forEach((item) => (new Image().src = item.dataset.img));
  "requestIdleCallback" in window ? requestIdleCallback(preload) : setTimeout(preload, 1500);
});

/* ---------- Formulário de reserva → WhatsApp ---------- */
const form = $("#reserva-form");
if (form) {
  const dateInput = form.elements.data;
  if (dateInput) dateInput.min = new Date().toISOString().slice(0, 10);
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (!form.reportValidity()) return;
    const d = new FormData(form);
    const date = d.get("data")
      ? new Date(d.get("data") + "T12:00").toLocaleDateString("pt-BR")
      : "";
    const lines = [
      "Olá, Deck 256! Gostaria de fazer uma reserva:",
      `• Nome: ${d.get("nome")}`,
      `• Data: ${date}`,
      `• Horário: ${d.get("horario")}`,
      `• Pessoas: ${d.get("pessoas")}`,
    ];
    if (d.get("obs")) lines.push(`• Observação: ${d.get("obs")}`);
    window.open(whatsappUrl(lines.join("\n")), "_blank", "noopener");
  });
}

/* ---------- Ano no rodapé ---------- */
$$("[data-year]").forEach((el) => (el.textContent = new Date().getFullYear()));
