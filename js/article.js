document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("articleDetail");

  // Récupération de l'id dans l'URL (?id=...)
  const params = new URLSearchParams(window.location.search);
  const projectId = parseInt(params.get("id"), 10);

  // Recherche du projet correspondant
  const project = articles.find(item => item.id === projectId);

  if (!project) {
    container.innerHTML = `
      <div style="text-align: center; padding: 60px 0;">
        <h2>Projet non trouvé</h2>
        <p style="margin: 16px 0; color: #64748b;">Le projet que vous cherchez n'existe pas ou a été déplacé.</p>
        <a href="index.html" class="btn-read">← Retour à l'accueil</a>
      </div>
    `;
    return;
  }

  // Mise à jour du titre du document
  document.title = `${project.title} — ISTA Projects Hub`;

  // Génération des badges technologies
  const techBadges = project.technologies
    .map(tech => `<span class="tech-badge">${tech}</span>`)
    .join("");

  // Rendu complet de la fiche
  container.innerHTML = `
    <header class="detail-header">
      <h1>${project.title}</h1>
      <p class="detail-subtitle">${project.subtitle}</p>
      <div class="detail-meta-bar">
        <span>📅 ${project.date}</span>
        <span class="badge-cat">${project.categoryLabel}</span>
        <span>👥 ${project.authorGroup}</span>
      </div>
    </header>

    <img src="${project.image}" alt="${project.title}" class="detail-banner">

    <div class="detail-grid">
      <div class="info-block">
        <h3>⏱️ La problématique</h3>
        <p>${project.probleme}</p>
      </div>

      <div class="info-block">
        <h3>💡 La solution</h3>
        <p>${project.solution}</p>
      </div>
    </div>

    <div class="tech-section">
      <strong>Technologies utilisées :</strong>
      ${techBadges}
    </div>
  `;
});