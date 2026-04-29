import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import SectionPage from '../components/layout/SectionPage.jsx';
import ConteneurPage from '../components/layout/ConteneurPage.jsx';
import { projectsApi } from '../services/api.js';

/**
 * PageDetailProjet - Affiche le détail d'un projet avec ses informations.
 */
export default function PageDetailProjet() {
  var { id } = useParams();
  var [project, setProject] = useState(null);
  var [loading, setLoading] = useState(true);
  var [error, setError] = useState('');
  var [mediaOuvert, setMediaOuvert] = useState(null);
  var [indexMedia, setIndexMedia] = useState(0);
  var apiBaseUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';
  var backendOrigin = apiBaseUrl.replace(/\/api\/?$/, '');

  // Charger le projet
  useEffect(function () {
    projectsApi.getOne(id)
      .then(function (reponse) { setProject(reponse.data); })
      .catch(function () { setError('Impossible de charger ce projet.'); })
      .finally(function () { setLoading(false); });
  }, [id]);

  // Vérifie si c'est une vidéo
  /**
  * Indique si un média est une vidéo.
   */
  function estVideo(media) {
    return media.file_type === 'video';
  }

  // Résout l'URL d'un média quelle que soit sa source (storage Laravel, URL absolue, ancien dossier Assets)
  /**
  * Résout l'URL d'un média (storage, URL absolue, Assets).
   */
  function cheminMedia(media) {
    if (!media) {
      return '';
    }

    var filePath = '';
    if (typeof media.file_path === 'string') {
      filePath = media.file_path;
    }

    // Compatibilité anciens projets : médias stockés dans frontend/public/Assets
    if (filePath.startsWith('Assets/')) {
      return '/' + filePath;
    }

    if (filePath.startsWith('/Assets/')) {
      return filePath;
    }

    if (/^https?:\/\//i.test(filePath)) {
      return filePath;
    }

    if (typeof media.file_url === 'string' && media.file_url !== '') {
      if (/^https?:\/\//i.test(media.file_url)) {
        return media.file_url;
      }

      if (media.file_url.startsWith('/Assets/')) {
        return media.file_url;
      }

      return backendOrigin + media.file_url;
    }

    if (filePath === '') {
      return '';
    }

    if (filePath.startsWith('/')) {
      if (filePath.startsWith('/storage/')) {
        return backendOrigin + filePath;
      }
      return filePath;
    }

    return backendOrigin + '/storage/' + filePath;
  }

  // --- Chargement ---
  if (loading) {
    return (
      <SectionPage id="detail-projet" eyebrow="Portfolio" title="Chargement...">
        <ConteneurPage>
          <div className="animate-pulse space-y-4">
            <div className="h-6 w-48 bg-slate-800 rounded" />
            <div className="h-4 w-full bg-slate-800 rounded" />
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-6">
              <div className="aspect-video bg-slate-800 rounded-xl" />
              <div className="aspect-video bg-slate-800 rounded-xl" />
              <div className="aspect-video bg-slate-800 rounded-xl" />
            </div>
          </div>
        </ConteneurPage>
      </SectionPage>
    );
  }

  // --- Erreur ---
  if (error) {
    return (
      <SectionPage id="detail-projet" eyebrow="Portfolio" title="Erreur">
        <ConteneurPage>
          <div className="text-center p-8">
            <p className="text-red-400 mb-4">{error}</p>
            <Link to="/projets" className="px-4 py-2 rounded-lg bg-cyan-600 text-white">
              ← Retour aux projets
            </Link>
          </div>
        </ConteneurPage>
      </SectionPage>
    );
  }

  if (!project) {
    return (
      <SectionPage id="detail-projet" eyebrow="Portfolio" title="Erreur">
        <ConteneurPage>
          <div className="text-center p-8">
            <p className="text-red-400 mb-4">Projet introuvable.</p>
            <Link to="/projets" className="px-4 py-2 rounded-lg bg-cyan-600 text-white">
              ← Retour aux projets
            </Link>
          </div>
        </ConteneurPage>
      </SectionPage>
    );
  }

  // Récupérer les technologies (tableau)
  var technologies = [];
  if (Array.isArray(project.technologies)) {
    technologies = project.technologies;
  }

  // Récupérer les médias (images + vidéos)
  var medias = [];
  if (Array.isArray(project.images)) {
    medias = project.images;
  }

  // Affiche le bon contenu
  /**
  * Retourne le JSX du média pour l'afficher en plein écran (vidéo ou image).
   */
  function afficherMediaModal() {
    if (!mediaOuvert) {
      return null;
    }
    if (estVideo(mediaOuvert)) {
      return <video src={cheminMedia(mediaOuvert)} controls autoPlay className="w-full max-h-[85vh] rounded-lg" />;
    }
    return <img src={cheminMedia(mediaOuvert)} alt="Capture" className="w-full max-h-[85vh] object-contain rounded-lg" />;
  }

  return (
    <SectionPage id="detail-projet" eyebrow="Portfolio" title={project.title}>
      <ConteneurPage>

        {/* Bouton retour */}
        <Link to="/projets" className="inline-flex items-center gap-2 text-sm text-cyan-400 hover:text-cyan-300 mb-6">
          ← Retour aux projets
        </Link>

        {/* Description */}
        {project.description && (
          <p className="text-gray-300 mb-6 leading-relaxed">{project.description}</p>
        )}

        {/* Technologies */}
        {technologies.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-6">
            {technologies.map(function (tech, i) {
              return (
                <span key={i} className="px-3 py-1 rounded-full bg-cyan-950/60 text-cyan-200 text-sm border border-cyan-500/30">
                  {tech}
                </span>
              );
            })}
          </div>
        )}

        {/* Démo */}
        {project.github_link && (
          <div className="flex gap-3 mb-8">
            <a href={project.github_link} target="_blank" rel="noreferrer"
              className="px-4 py-2 rounded-lg bg-slate-800 text-gray-200 border border-cyan-500/20 hover:border-cyan-400/40 text-sm">
              GitHub
            </a>
          </div>
        )}
        {project.demo_link && (
          <div className="flex gap-3 mb-8">
            <a href={project.demo_link} target="_blank" rel="noreferrer"
              className="px-4 py-2 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white text-sm">
              Voir la démo
            </a>
          </div>
        )}

        {/* Captures */}
        {medias.length > 0 && (
          <div>
            <h3 className="text-sm font-semibold text-gray-400 uppercase mb-4">
              Captures & vidéos ({medias.length})
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {medias.map(function (media, index) {
                var contenuMedia;
                if (estVideo(media)) {
                  contenuMedia = (
                    <div className="w-full h-full flex items-center justify-center bg-slate-800">
                      <span className="text-4xl">▶️</span>
                    </div>
                  );
                } else {
                  contenuMedia = (
                    <img src={cheminMedia(media)} alt={'Capture ' + (media.order + 1)}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform" loading="lazy" />
                  );
                }

                return (
                  <button key={media.id} onClick={function () { setMediaOuvert(media); setIndexMedia(index); }}
                    className="group relative aspect-video rounded-xl overflow-hidden border border-cyan-500/20 hover:border-cyan-400/50 bg-slate-900 cursor-pointer transition-all">
                    {contenuMedia}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {medias.length === 0 && (
          <p className="text-gray-400 text-center py-8">Aucune capture disponible.</p>
        )}

        {/* Plein écran */}
        {mediaOuvert && (
          <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
            onClick={function () { setMediaOuvert(null); }}>

            {/* Bouton fermer */}
            <button onClick={function () { setMediaOuvert(null); }}
              className="absolute top-4 right-4 text-white text-3xl z-10">✕</button>

            {/* Flèches navigation */}
            {medias.length > 1 && (
              <>
                <button className="absolute left-4 text-white text-4xl z-10"
                  onClick={function (e) {
                    e.stopPropagation();
                    var prev = indexMedia - 1;
                    if (indexMedia === 0) {
                      prev = medias.length - 1;
                    }
                    setIndexMedia(prev);
                    setMediaOuvert(medias[prev]);
                  }}>‹</button>
                <button className="absolute right-14 text-white text-4xl z-10"
                  onClick={function (e) {
                    e.stopPropagation();
                    var next = indexMedia + 1;
                    if (indexMedia === medias.length - 1) {
                      next = 0;
                    }
                    setIndexMedia(next);
                    setMediaOuvert(medias[next]);
                  }}>›</button>
              </>
            )}

            {/* Contenu */}
            <div className="max-w-5xl w-full max-h-[85vh]" onClick={function (e) { e.stopPropagation(); }}>
              {afficherMediaModal()}
              <p className="text-center text-gray-400 text-sm mt-2">
                {indexMedia + 1} / {medias.length}
              </p>
            </div>
          </div>
        )}

      </ConteneurPage>
    </SectionPage>
  );
}
