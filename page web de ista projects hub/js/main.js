document.addEventListener("DOMContentLoaded", () => {
  const grid = document.getElementById("projectsGrid");
  const countBadge = document.getElementById("projectCount");
  const searchInput = document.getElementById("searchInput");
  const filterBtns = document.querySelectorAll(".filter-btn");
  const noResults = document.getElementById("noResults");

  let currentCategory = "all";
  let searchKeyword = "";

  // Fonction d'affichage des cartes
  function renderProjects(list) {
    grid.innerHTML = "";
    
    if (list.length === 0) {
      noResults.style.display = "block";
      countBadge.textContent = "0 projet";
      return;
    }

    noResults.style.display = "none";
    countBadge.textContent = `${list.length} projet${list.length > 1 ? "s" : ""}`;

    list.forEach(project => {
      const card = document.createElement("div");
      card.className = "project-card";
      card.innerHTML = `
        <img src="${project.image}" alt="${project.title}" class="card-img">
        <div class="card-body">
          <div class="card-meta">
            <span class="badge-cat">${project.categoryLabel}</span>
            <span>📅 ${project.date}</span>
          </div>
          <h3>${project.title}</h3>
          <p>${project.summary}</p>
          <div class="card-footer">
            <span class="promo-tag">${project.promoTag}</span>
            <a href="article.html?id=${project.id}" class="btn-read">En savoir plus →</a>
          </div>
        </div>
      `;
      grid.appendChild(card);
    });
  }

  // Filtrage combiné : catégorie + recherche textuelle
  function applyFilters() {
    const filtered = articles.filter(project => {
      const matchCategory = (currentCategory === "all") || (project.category === currentCategory);
      const textToSearch = `${project.title} ${project.summary} ${project.technologies.join(" ")}`.toLowerCase();
      const matchSearch = textToSearch.includes(searchKeyword.toLowerCase());
      return matchCategory && matchSearch;
    });

    renderProjects(filtered);
  }

  // Écouteur pour la recherche en direct
  searchInput.addEventListener("input", (e) => {
    searchKeyword = e.target.value.trim();
    applyFilters();
  });

  // Écouteurs pour les boutons de filtre
  filterBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      filterBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      currentCategory = btn.getAttribute("data-category");
      applyFilters();
    });
  });

  // Rendu initial
  renderProjects(articles);
});