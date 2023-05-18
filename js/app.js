"use strict";

import * as flsFunctions from "./modules/functions.js";

flsFunctions.isWebp();

/*------------------------------ */
window.addEventListener("load", windowLoad);

function windowLoad() {
  document.addEventListener("click", documentActions);
  activeAnimations();
  document.addEventListener("click", filterActivate);
}

function documentActions(e) {
  const targetE = e.target;
  if (targetE.closest(".menu__icon")) {
    document.documentElement.classList.toggle("menu__open");
  }
  if (targetE.closest("[data-goto]")) {
    document.documentElement.classList.contains("menu__open")
      ? document.documentElement.classList.remove("menu__open")
      : null;

    const nav = targetE.closest("[data-goto]").dataset.goto;
    const navElement = document.querySelector(nav);
    const headerHeigth = document.querySelector(".header").offsetHeight;
    if (navElement) {
      window.scrollTo({
        top: navElement.offsetTop - (headerHeigth + 15),
        behavior: "smooth",
      });
    }
    e.preventDefault();
  }
}

function activeAnimations() {
  // wacher
  const items = document.querySelectorAll("[data-item]");
  const options = {
    threshold: 0.2,
  };
  const callback = (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
      }
    });
  };
  const observer = new IntersectionObserver(callback, options);
  items.forEach((item) => {
    observer.observe(item);
  });
}

function filterActivate(e) {
  const targetE = e.target;
  if (
    targetE.classList.contains("filter__type") &&
    !targetE.classList.contains("active")
  ) {
    const activeElement = document.querySelector(".filter__type.active");
    const elements = document.querySelectorAll(".filter__item");
    const elementType = targetE.dataset.filter;

    activeElement.classList.remove("active");
    targetE.classList.add("active");

    elements.forEach((element) => {
      !elementType || element.dataset.filter === elementType
        ? (element.hidden = false)
        : (element.hidden = true);
    });
  }
}
