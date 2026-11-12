// =============================================================================
// js/script.js
// Lógica principal: i18n, modal (<dialog>), IntersectionObserver,
// video con overlay, history API (Atrás) y reduced-motion.
// Sin frameworks; compatible con file:// y GitHub Pages.
// =============================================================================

(function () {
  'use strict';

  // ===========================================================================
  // Estado y constantes
  // ===========================================================================

  var currentLang = 'es';
  var currentRecipeId = null;   // ID de la receta abierta en el modal
  var closingTimeout = null;    // timeout de seguridad al cerrar
  var triggerElement = null;    // botón que abrió el modal (para devolver foco)
  var isTransitioning = false;  // evita clicks rápidos en el toggle de idioma

  var ANIMATION_DURATION = 300;
  var SAFETY_TIMEOUT = 400;

  // Media query para respetar preferencia de movimiento reducido
  var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  // Elementos del DOM — se cachean en init()
  var modal, modalTitle, modalImage, modalCulture;
  var modalTime, modalServings, modalDifficulty;
  var modalIngredients, modalSteps, modalTipText;
  var modalVideo, modalVideoSource, videoOverlay, videoOverlayText;
  var modalCloseBtn, modalBody;
  var langButtons;

  // ===========================================================================
  // Utilidades
  // ===========================================================================

  /**
   * Accede a una propiedad anidada de un objeto por ruta de puntos.
   * getNestedValue(obj, 'ui.siteName') → obj.ui.siteName
   */
  function getNestedValue(obj, path) {
    var keys = path.split('.');
    var result = obj;
    for (var i = 0; i < keys.length; i++) {
      if (result == null) return undefined;
      result = result[keys[i]];
    }
    return result;
  }

  /**
   * Renderiza texto con marcadores {es}…{/es} creando nodos <em lang="es">.
   * Seguro: usa createElement/textContent, nunca innerHTML con datos.
   */
  function renderRichText(element, text) {
    if (text == null) return;
    // Limpiar contenido actual
    while (element.firstChild) {
      element.removeChild(element.firstChild);
    }
    var parts = text.split(/\{es\}|\{\/es\}/);
    for (var i = 0; i < parts.length; i++) {
      if (i % 2 === 1) {
        // Índice impar → término en español que va en cursiva
        var em = document.createElement('em');
        em.lang = 'es';
        em.textContent = parts[i];
        element.appendChild(em);
      } else if (parts[i]) {
        element.appendChild(document.createTextNode(parts[i]));
      }
    }
  }

  /**
   * Limpia los marcadores {es}…{/es} y devuelve texto plano.
   * Útil para atributos (alt, aria-label) donde no va HTML.
   */
  function cleanRichText(text) {
    if (text == null) return '';
    return text.replace(/\{es\}|\{\/es\}/g, '');
  }

  /**
   * Pausa el video del modal (si existe y está reproduciéndose).
   */
  function pauseVideo() {
    var video = document.getElementById('modal-video');
    if (video) {
      try { video.pause(); } catch (e) { /* ignorar */ }
    }
  }

  // ===========================================================================
  // Sistema i18n
  // ===========================================================================

  /**
   * Cambia el idioma de todo el sitio.
   * Actualiza <html lang>, <title>, meta description, todos los data-i18n,
   * data-i18n-attr, botones de idioma, y el modal abierto (solo textos/listas).
   */
  function setLanguage(lang) {
    if (!window.I18N || !window.I18N[lang]) {
      console.warn('Idioma no disponible:', lang);
      return;
    }

    currentLang = lang;
    var data = window.I18N[lang];
    var fallback = window.I18N.es;

    // --- <html lang> ---
    document.documentElement.lang = lang;

    // --- <title> ---
    var titleText = getNestedValue(data, 'meta.title') ||
                    getNestedValue(fallback, 'meta.title');
    if (titleText) document.title = cleanRichText(titleText);

    // --- meta description ---
    var descMeta = document.querySelector('meta[name="description"]');
    if (descMeta) {
      var descText = getNestedValue(data, 'meta.description') ||
                     getNestedValue(fallback, 'meta.description');
      if (descText) descMeta.setAttribute('content', cleanRichText(descText));
    }

    // --- Textos con data-i18n ---
    var elements = document.querySelectorAll('[data-i18n]');
    for (var i = 0; i < elements.length; i++) {
      var el = elements[i];
      var key = el.getAttribute('data-i18n');
      var value = getNestedValue(data, key);

      // Fallback a español si falta la clave en el idioma actual
      if (value == null && lang !== 'es') {
        value = getNestedValue(fallback, key);
        if (value != null) {
          console.warn('i18n: clave faltante en "' + lang + '": ' + key + '. Usando español.');
        }
      }

      if (value != null && typeof value === 'string') {
        renderRichText(el, value);
      }
    }

    // --- Atributos con data-i18n-attr ---
    var attrElements = document.querySelectorAll('[data-i18n-attr]');
    for (var j = 0; j < attrElements.length; j++) {
      var el2 = attrElements[j];
      var attrPairs = el2.getAttribute('data-i18n-attr').split(';');
      for (var k = 0; k < attrPairs.length; k++) {
        var pair = attrPairs[k].trim();
        if (!pair) continue;
        var parts = pair.split(':');
        var attrName = parts[0].trim();
        var attrKey = parts[1].trim();
        var attrValue = getNestedValue(data, attrKey);
        if (attrValue == null && lang !== 'es') {
          attrValue = getNestedValue(fallback, attrKey);
        }
        if (attrValue != null) {
          el2.setAttribute(attrName, cleanRichText(attrValue));
        }
      }
    }

    // --- Botones de idioma ---
    if (langButtons) {
      for (var b = 0; b < langButtons.length; b++) {
        var btn = langButtons[b];
        var isActive = btn.getAttribute('data-lang') === lang;
        btn.setAttribute('aria-pressed', isActive ? 'true' : 'false');
        if (isActive) {
          btn.classList.remove('bg-madera', 'text-crema-dim');
          btn.classList.add('bg-vino', 'text-crema');
        } else {
          btn.classList.remove('bg-vino', 'text-crema');
          btn.classList.add('bg-madera', 'text-crema-dim');
        }
      }
    }

    // --- Modal abierto: actualizar contenido sin recrear video ni perder scroll ---
    if (modal && modal.open && currentRecipeId) {
      updateModalContent(currentRecipeId, true);
    }

    // --- Guardar preferencia ---
    try {
      localStorage.setItem('sabores-lang', lang);
    } catch (e) {
      // localStorage puede no estar disponible en file://
    }
  }

  /**
   * Verifica paridad de claves entre es y en.
   * Llama desde la consola: checkI18nParity()
   */
  function checkI18nParity() {
    if (!window.I18N) {
      console.warn('I18N no está disponible.');
      return [];
    }

    var missing = [];

    function check(esObj, enObj, path) {
      if (esObj == null || typeof esObj !== 'object' || Array.isArray(esObj)) return;

      var keys = Object.keys(esObj);
      for (var i = 0; i < keys.length; i++) {
        var key = keys[i];
        var fullPath = path ? path + '.' + key : key;
        if (enObj == null || enObj[key] == null) {
          missing.push('en: falta "' + fullPath + '"');
        } else if (typeof esObj[key] === 'object' && !Array.isArray(esObj[key])) {
          check(esObj[key], enObj[key], fullPath);
        }
      }

      // Claves en en que no están en es
      if (enObj && typeof enObj === 'object' && !Array.isArray(enObj)) {
        var enKeys = Object.keys(enObj);
        for (var j = 0; j < enKeys.length; j++) {
          var enKey = enKeys[j];
          var enFullPath = path ? path + '.' + enKey : enKey;
          if (esObj[enKey] == null) {
            missing.push('es: falta "' + enFullPath + '"');
          }
        }
      }
    }

    check(window.I18N.es, window.I18N.en, '');

    if (missing.length === 0) {
      console.log('%c✔ checkI18nParity: todas las claves coinciden entre es y en.', 'color: #4CAF50');
    } else {
      console.warn('✖ checkI18nParity: claves faltantes:');
      for (var m = 0; m < missing.length; m++) {
        console.warn('  - ' + missing[m]);
      }
    }
    return missing;
  }

  // Exponer para pruebas desde la consola del navegador
  window.checkI18nParity = checkI18nParity;

  // ===========================================================================
  // Modal — contenido
  // ===========================================================================

  /**
   * Actualiza el contenido del modal con los datos de la receta.
   * @param {string} recipeId — alfajores | empanadas | chivito
   * @param {boolean} isLanguageUpdate — true si solo cambia el idioma
   *   (no recrea video ni resetea scroll)
   */
  function updateModalContent(recipeId, isLanguageUpdate) {
    var data = window.I18N[currentLang];
    var fallback = window.I18N.es;
    var recipe = getNestedValue(data, 'recipes.' + recipeId);
    var recipeFallback = getNestedValue(fallback, 'recipes.' + recipeId);
    var media = window.RECIPE_MEDIA[recipeId];

    if (!recipe) recipe = recipeFallback;
    if (!recipe || !media) return;

    // Auxiliar: valor con fallback
    function val(field) {
      var v = recipe[field];
      if (v == null && recipeFallback) v = recipeFallback[field];
      return v;
    }

    // Título
    renderRichText(modalTitle, val('name'));

    // Imagen (no recargar en cambio de idioma)
    if (!isLanguageUpdate) {
      modalImage.src = media.img;
      modalImage.setAttribute('width', '600');
      modalImage.setAttribute('height', '400');
    }
    modalImage.alt = cleanRichText(val('imgAlt') || val('name'));

    // Dato cultural
    renderRichText(modalCulture, val('culture'));

    // Meta
    modalTime.textContent = val('time') || '';
    modalServings.textContent = val('servings') || '';
    modalDifficulty.textContent = val('difficulty') || '';

    // Ingredientes (createElement/textContent — nunca innerHTML)
    while (modalIngredients.firstChild) {
      modalIngredients.removeChild(modalIngredients.firstChild);
    }
    var ingredients = val('ingredients');
    if (ingredients && Array.isArray(ingredients)) {
      for (var i = 0; i < ingredients.length; i++) {
        var li = document.createElement('li');
        li.textContent = ingredients[i];
        modalIngredients.appendChild(li);
      }
    }

    // Pasos
    while (modalSteps.firstChild) {
      modalSteps.removeChild(modalSteps.firstChild);
    }
    var steps = val('steps');
    if (steps && Array.isArray(steps)) {
      for (var s = 0; s < steps.length; s++) {
        var stepLi = document.createElement('li');
        stepLi.textContent = steps[s];
        modalSteps.appendChild(stepLi);
      }
    }

    // Consejo
    var tip = val('tip');
    var tipContainer = document.getElementById('modal-tip');
    if (tip) {
      modalTipText.textContent = tip;
      tipContainer.style.display = '';
    } else {
      tipContainer.style.display = 'none';
    }

    // Video (no recrear en cambio de idioma para no perder estado de reproducción)
    if (!isLanguageUpdate) {
      setupVideo(recipeId, media);
    }
  }

  /**
   * Configura el video. Si videoAvailable es false, muestra overlay "Próximamente".
   */
  function setupVideo(recipeId, media) {
    var overlay = document.getElementById('video-overlay');
    var overlayText = document.getElementById('video-overlay-text');
    var video = document.getElementById('modal-video');
    var source = document.getElementById('modal-video-source');
    var container = document.getElementById('modal-video-container');

    // Restaurar texto del overlay al original ("Próximamente")
    var comingSoonText = getNestedValue(window.I18N[currentLang], 'ui.videoComingSoon') ||
                         getNestedValue(window.I18N.es, 'ui.videoComingSoon') ||
                         'Video disponible próximamente';
    if (overlayText) overlayText.textContent = comingSoonText;

    if (!media.videoAvailable) {
      // Sin video: overlay visible, <video> oculto
      overlay.classList.remove('is-hidden');
      video.removeAttribute('src');
      source.removeAttribute('src');
      video.style.display = 'none';
      // Poster como fondo del contenedor
      if (media.poster) {
        container.style.backgroundImage = 'url(' + media.poster + ')';
        container.style.backgroundSize = 'cover';
        container.style.backgroundPosition = 'center';
      }
    } else {
      // Con video: overlay oculto, <video> visible
      overlay.classList.add('is-hidden');
      video.style.display = '';
      source.src = media.video;
      if (media.poster) {
        video.poster = media.poster;
      }
      video.load();
      container.style.backgroundImage = '';
    }
  }

  // ===========================================================================
  // Modal — abrir / cerrar
  // ===========================================================================

  /**
   * Abre el modal con animación para la receta indicada.
   */
  function openModal(recipeId) {
    if (!modal) return;

    // Limpiar cualquier cierre pendiente
    if (closingTimeout) {
      clearTimeout(closingTimeout);
      closingTimeout = null;
    }
    modal.classList.remove('is-closing');

    currentRecipeId = recipeId;
    updateModalContent(recipeId, false);

    // Scroll al inicio del cuerpo del modal
    if (modalBody) modalBody.scrollTop = 0;

    // Bloquear scroll del fondo
    document.documentElement.classList.add('no-scroll');

    // Mostrar (showModal aporta fondo inerte, foco contenido, Esc, ::backdrop)
    modal.showModal();

    // P1: pushState para que el botón Atrás cierre el modal
    try {
      if (window.history && window.history.pushState) {
        history.pushState({ modal: recipeId }, '', '#' + recipeId);
      }
    } catch (e) {
      // Puede fallar en file://
    }
  }

  /**
   * Cierra el modal con animación de salida.
   * @param {boolean} skipHistory — true cuando el cierre viene del popstate
   *   (el navegador ya manejó la historia; no hacer replaceState).
   */
  function closeModal(skipHistory) {
    if (!modal || !modal.open) return;

    pauseVideo();

    // Si reduced-motion, cerrar sin animación
    if (prefersReducedMotion.matches) {
      finishClose(skipHistory);
      return;
    }

    // Animación de salida
    modal.classList.add('is-closing');
    var finished = false;

    function onAnimEnd() {
      if (finished) return;
      finished = true;
      modal.removeEventListener('animationend', onAnimEnd);
      finishClose(skipHistory);
    }

    modal.addEventListener('animationend', onAnimEnd);

    // Timeout de seguridad por si animationend no se dispara
    closingTimeout = setTimeout(function () {
      if (!finished) {
        finished = true;
        modal.removeEventListener('animationend', onAnimEnd);
        finishClose(skipHistory);
      }
    }, SAFETY_TIMEOUT);
  }

  /**
   * Finaliza el cierre: limpia estado, devuelve foco y quita hash.
   */
  function finishClose(skipHistory) {
    modal.classList.remove('is-closing');
    modal.close();
    document.documentElement.classList.remove('no-scroll');
    currentRecipeId = null;

    // Devolver foco al botón que abrió el modal
    if (triggerElement) {
      triggerElement.focus();
      triggerElement = null;
    }

    // Limpiar hash de la URL (solo si no viene de popstate)
    if (!skipHistory) {
      try {
        if (window.history && window.history.replaceState) {
          history.replaceState(null, '', window.location.pathname + window.location.search);
        }
      } catch (e) {
        // Puede fallar en file://
      }
    }
  }

  // ===========================================================================
  // IntersectionObserver — aparición escalonada de tarjetas
  // ===========================================================================

  function setupCardObserver() {
    var cards = document.querySelectorAll('.recipe-card');

    // Sin animaciones si el usuario lo prefiere
    if (prefersReducedMotion.matches) {
      for (var i = 0; i < cards.length; i++) {
        cards[i].classList.add('is-visible');
        cards[i].style.opacity = '1';
      }
      return;
    }

    // Fallback si IO no está disponible
    if (!('IntersectionObserver' in window)) {
      for (var j = 0; j < cards.length; j++) {
        cards[j].classList.add('is-visible');
      }
      return;
    }

    var observer = new IntersectionObserver(function (entries) {
      for (var k = 0; k < entries.length; k++) {
        if (entries[k].isIntersecting) {
          entries[k].target.classList.add('is-visible');
          observer.unobserve(entries[k].target); // solo una vez
        }
      }
    }, { threshold: 0.15 });

    for (var m = 0; m < cards.length; m++) {
      observer.observe(cards[m]);
    }
  }

  // ===========================================================================
  // Sincronización y manejo de errores de imagen y video
  // ===========================================================================

  function setupCardImages() {
    if (!window.RECIPE_MEDIA) return;
    var cards = document.querySelectorAll('[data-recipe]');
    for (var i = 0; i < cards.length; i++) {
      var card = cards[i];
      var recipeId = card.getAttribute('data-recipe');
      if (recipeId && window.RECIPE_MEDIA[recipeId]) {
        var cardImg = card.querySelector('.card-img');
        if (cardImg && window.RECIPE_MEDIA[recipeId].img) {
          cardImg.src = window.RECIPE_MEDIA[recipeId].img;
        }
      }
    }
  }

  function setupImageErrorHandlers() {
    var images = document.querySelectorAll('.card-img');
    for (var i = 0; i < images.length; i++) {
      images[i].addEventListener('error', function () {
        // Ocultar imagen rota y mostrar degradado de fondo
        this.style.display = 'none';
        if (this.parentElement) {
          this.parentElement.classList.add('card-img-error');
        }
      });
    }
  }

  function setupVideoErrorHandler() {
    var videoContainer = document.getElementById('modal-video-container');
    if (!videoContainer) return;

    // Los errores de <source> no burbujean: escuchamos en fase de captura
    videoContainer.addEventListener('error', function (e) {
      if (e.target && (e.target.tagName === 'VIDEO' || e.target.tagName === 'SOURCE')) {
        var overlay = document.getElementById('video-overlay');
        var overlayText = document.getElementById('video-overlay-text');
        var video = document.getElementById('modal-video');

        if (overlay) overlay.classList.remove('is-hidden');
        if (video) video.style.display = 'none';

        // Cambiar texto a mensaje de error
        if (overlayText) {
          var errorText = getNestedValue(window.I18N[currentLang], 'ui.videoError') ||
                          getNestedValue(window.I18N.es, 'ui.videoError') ||
                          'No se pudo cargar el video';
          overlayText.textContent = errorText;
        }
      }
    }, true); // true = fase de captura
  }

  // ===========================================================================
  // Inicialización
  // ===========================================================================

  function init() {
    // Cachear elementos del DOM
    modal            = document.getElementById('recipe-modal');
    modalTitle       = document.getElementById('modal-title');
    modalImage       = document.getElementById('modal-image');
    modalCulture     = document.getElementById('modal-culture');
    modalTime        = document.getElementById('modal-time');
    modalServings    = document.getElementById('modal-servings');
    modalDifficulty  = document.getElementById('modal-difficulty');
    modalIngredients = document.getElementById('modal-ingredients');
    modalSteps       = document.getElementById('modal-steps');
    modalTipText     = document.getElementById('modal-tip-text');
    modalVideo       = document.getElementById('modal-video');
    modalVideoSource = document.getElementById('modal-video-source');
    videoOverlay     = document.getElementById('video-overlay');
    videoOverlayText = document.getElementById('video-overlay-text');
    modalCloseBtn    = document.getElementById('modal-close-btn');
    modalBody        = modal ? modal.querySelector('.modal-body') : null;
    langButtons      = document.querySelectorAll('[data-lang]');

    // --- Eventos de las tarjetas ---
    var cardButtons = document.querySelectorAll('.card-open-btn');
    for (var i = 0; i < cardButtons.length; i++) {
      cardButtons[i].addEventListener('click', function () {
        var card = this.closest('[data-recipe]');
        if (!card) return;
        var recipeId = card.getAttribute('data-recipe');
        if (!recipeId) return;
        triggerElement = this;
        openModal(recipeId);
      });
    }

    // --- Modal: botón cerrar ---
    if (modalCloseBtn) {
      modalCloseBtn.addEventListener('click', function () {
        closeModal(false);
      });
    }

    // --- Modal: click en el backdrop (target === dialog) ---
    if (modal) {
      modal.addEventListener('click', function (e) {
        if (e.target === modal) {
          closeModal(false);
        }
      });

      // Interceptar Esc (cancel nativo) para usar nuestra animación de salida
      modal.addEventListener('cancel', function (e) {
        e.preventDefault();
        closeModal(false);
      });
    }

    // --- P1: Botón Atrás (popstate) ---
    try {
      window.addEventListener('popstate', function () {
        if (modal && modal.open) {
          // El modal está abierto y se presionó Atrás → cerrar sin tocar historia
          closeModal(true);
        } else {
          // Quizás el hash coincide con una receta → abrir
          var hash = window.location.hash.replace('#', '');
          if (hash && window.RECIPE_MEDIA && window.RECIPE_MEDIA[hash]) {
            openModal(hash);
          }
        }
      });
    } catch (e) {
      // popstate puede no funcionar en file://
    }

    // --- Toggle de idioma ---
    for (var b = 0; b < langButtons.length; b++) {
      langButtons[b].addEventListener('click', function () {
        var lang = this.getAttribute('data-lang');
        if (lang === currentLang || isTransitioning) return;

        // Fade suave al cambiar idioma (si no hay reduced-motion)
        if (!prefersReducedMotion.matches) {
          isTransitioning = true;
          document.body.classList.add('lang-fade', 'is-fading');
          setTimeout(function () {
            setLanguage(lang);
            document.body.classList.remove('is-fading');
            setTimeout(function () {
              document.body.classList.remove('lang-fade');
              isTransitioning = false;
            }, 150);
          }, 150);
        } else {
          setLanguage(lang);
        }
      });
    }

    // --- Determinar idioma inicial ---
    var initialLang = 'es';

    // 1. Parámetro URL ?lang=en (prioridad máxima)
    try {
      var params = new URLSearchParams(window.location.search);
      var urlLang = params.get('lang');
      if (urlLang && window.I18N && window.I18N[urlLang]) {
        initialLang = urlLang;
      }
    } catch (e) {
      // URLSearchParams puede no estar disponible
    }

    // 2. localStorage (solo si no hay ?lang= en la URL)
    if (initialLang === 'es') {
      try {
        var savedLang = localStorage.getItem('sabores-lang');
        if (savedLang && window.I18N && window.I18N[savedLang]) {
          initialLang = savedLang;
        }
      } catch (e) {
        // localStorage puede no estar disponible en file://
      }
    }

    // Aplicar idioma
    setLanguage(initialLang);

    // --- Observador de tarjetas ---
    setupCardObserver();

    // --- Sincronizar imágenes de tarjetas y manejo de errores ---
    setupCardImages();
    setupImageErrorHandlers();
    setupVideoErrorHandler();

    // --- Abrir modal desde hash al cargar (ej: #alfajores) ---
    try {
      var hash = window.location.hash.replace('#', '');
      if (hash && window.RECIPE_MEDIA && window.RECIPE_MEDIA[hash]) {
        // Pequeño retraso para que Tailwind CDN termine de procesar las clases
        setTimeout(function () {
          openModal(hash);
        }, 150);
      }
    } catch (e) {
      // Ignorar
    }
  }

  // Ejecutar cuando el DOM esté listo
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
