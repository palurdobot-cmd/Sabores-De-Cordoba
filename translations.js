// =============================================================================
// js/translations.js
// Fuente única de verdad para i18n y datos de medios.
// — Los textos en EN usan {es}término{/es} para marcar cursivas con lang="es".
// — Las listas (ingredientes, pasos) se renderizan con createElement/textContent.
// — El grupo edita los créditos en ui.footerGroup y ui.footerCourse.
// =============================================================================

window.I18N = {
  // =========================================================================
  // ESPAÑOL
  // =========================================================================
  es: {
    meta: {
      title: 'Sabores de Córdoba — Gastronomía cordobesa',
      description: 'Descubrí cuatro recetas emblemáticas de la provincia de Córdoba, Argentina: alfajores de maicena, alfajores de fruta, empanadas dulces y chivito a la parrilla.'
    },
    ui: {
      siteName: 'Sabores de Córdoba',
      heroTitle: 'Sabores de Córdoba',
      heroSubtitle: 'Cuatro recetas que cuentan la historia de nuestra tierra',
      viewRecipe: 'Ver receta ›',
      closeModal: 'Cerrar',
      ingredientsTitle: 'Ingredientes',
      stepsTitle: 'Preparación',
      tipTitle: 'Consejo',
      videoTitle: 'Video de la receta',
      videoComingSoon: 'Video disponible próximamente',
      videoError: 'No se pudo cargar el video',
      videoAlt: 'Video de la preparación',
      timeLabel: 'Tiempo',
      servingsLabel: 'Porciones',
      difficultyLabel: 'Dificultad',
      skipToContent: 'Ir al contenido principal',
      noscriptMessage: 'Este sitio requiere JavaScript para la traducción y las funciones interactivas. Las recetas están disponibles en español sin JavaScript.',
      footerGroup: 'Bastian · Eleazar · Agustín · Bautista · Josías',
      footerCourse: 'Cuarto Año — 2026',
      footerImageCredits: 'Hecho con dedicación y muchas horas de esfuerzo.',
      langToggleLabel: 'Cambiar idioma',
      recipesSection: 'Recetas'
    },
    recipes: {
      alfajores: {
        name: 'Alfajores de maicena',
        tagline: 'Dulzura cordobesa en cada bocado',
        culture: 'Clásico argentino de merienda: tapas tiernas de maicena unidas con dulce de leche y bordes cubiertos de coco rallado, un ícono de la repostería criolla.',
        time: '1 h 30 min',
        servings: '~15 unidades',
        difficulty: 'Media',
        imgAlt: 'Alfajores de maicena con dulce de leche y coco rallado',
        ingredients: [
          '100 g de manteca pomada (a temperatura ambiente)',
          '100 g de azúcar impalpable',
          '2 yemas de huevo',
          '100 g de harina 0000',
          '200 g de maicena (fécula de maíz)',
          '1 cucharadita de polvo de hornear',
          '1 cucharadita de esencia de vainilla',
          'Ralladura de 1 limón',
          '250 g de dulce de leche repostero',
          '50 g de coco rallado'
        ],
        steps: [
          'Batir la manteca pomada con el azúcar impalpable hasta obtener una crema suave y blanquecina, unos 3 minutos.',
          'Incorporar las yemas de a una, la esencia de vainilla y la ralladura de limón. Mezclar hasta integrar bien.',
          'Tamizar juntas la harina, la maicena y el polvo de hornear. Agregar a la mezcla anterior en forma envolvente, sin amasar de más para que las tapas queden tiernas.',
          'Envolver la masa en film plástico y refrigerar durante al menos 30 minutos.',
          'Precalentar el horno a 170 °C. Estirar la masa a unos 5 mm de espesor sobre superficie espolvoreada con maicena.',
          'Cortar discos de unos 5 cm con cortante liso. Colocar en placa con papel manteca, separados 2 cm entre sí.',
          'Hornear de 10 a 12 minutos: las tapas deben quedar claras, sin tomar color. Dejar enfriar completamente sobre rejilla.',
          'Untar una tapa con abundante dulce de leche repostero y cubrir con otra tapa presionando suavemente.',
          'Pasar los bordes (donde se ve el dulce de leche) por el coco rallado. Dejar reposar al menos 1 hora antes de servir.'
        ],
        tip: 'Si la masa se ablanda al estirarla, volvé a llevarla a la heladera unos 10 minutos. La clave es que nunca tome color en el horno: deben quedar pálidos y tiernos.'
      },
      alfajores_fruta: {
        name: 'Alfajores cordobeses de fruta',
        tagline: 'El clásico relleno de dulce de membrillo o batata',
        culture: 'En Argentina, los alfajores de fruta son un clásico tradicional relleno de dulce de membrillo o batata, cubiertos de glasé real o chocolate.',
        time: '1 h 30 min',
        servings: '12 a 15 alfajores',
        difficulty: 'Media',
        imgAlt: 'Alfajores de fruta con relleno de membrillo o batata y glaseado',
        ingredients: [
          '300 g de harina 0000',
          '100 g de maicena (fécula de maíz)',
          '150 g de manteca sin sal (a temperatura ambiente)',
          '120 g de azúcar',
          '2 yemas de huevo',
          '1 cucharadita de esencia de vainilla',
          'Ralladura de 1 limón',
          '400 g de dulce de membrillo o batata'
        ],
        steps: [
          'Batir la manteca con el azúcar en un bol hasta obtener una mezcla suave y pálida.',
          'Agregar las yemas de huevo, la esencia de vainilla y la ralladura de limón, mezclando bien hasta integrar por completo.',
          'Tamizar juntos la harina y la maicena, luego incorporarlos gradualmente a la mezcla húmeda, integrando suavemente sin amasar de más hasta formar una masa tierna.',
          'Envolver la masa en film transparente y refrigerar durante 30 minutos para que tome consistencia.',
          'Estirar la masa sobre una superficie ligeramente enharinada hasta un grosor de unos 5 mm. Cortar discos con un cortante circular.',
          'Colocar las tapas en una placa para horno forrada con papel manteca y hornear en horno precalentado a 180 °C durante 10 a 12 minutos, hasta que estén secas y apenas doradas en la base. Retirar y dejar enfriar por completo.',
          'Fundir el dulce de fruta con un chorrito de agua a fuego bajo hasta que esté maleable y homogéneo; luego dejar templar.',
          'Rellenar la base de una tapa con una cucharada generosa de dulce de fruta y cubrir con otra tapa para formar el alfajor. Presionar suavemente y servir.'
        ],
        tip: 'Para un acabado tradicional, podés pincelar la superficie con un glasé simple de azúcar impalpable con unas gotas de jugo de limón, o espolvorearlos con azúcar impalpable.'
      },
      empanadas: {
        name: 'Empanadas dulces cordobesas',
        tagline: 'El sabor agridulce que distingue a Córdoba',
        culture: 'La empanada cordobesa es agridulce: se diferencia del resto del país por llevar azúcar y pasas de uva junto a la carne, con un relleno más seco.',
        time: '1 h 45 min',
        servings: '12 unidades',
        difficulty: 'Media',
        imgAlt: 'Empanadas cordobesas doradas recién salidas del horno',
        ingredients: [
          '500 g de carne picada (o cortada a cuchillo)',
          '500 g de cebolla, picada fina',
          '100 g de papa cocida, cortada en cubos pequeños',
          '2 huevos duros, picados',
          '50 g de pasas de uva',
          '50 g de aceitunas verdes, picadas',
          '1 cucharada de azúcar (+ extra para espolvorear)',
          '1 cucharadita de comino molido',
          '1 cucharadita de pimentón dulce o ají molido',
          'Sal y pimienta a gusto',
          '3 cucharadas de grasa vacuna o aceite',
          '12 tapas de empanada para horno'
        ],
        steps: [
          'Calentar la grasa o aceite en una sartén grande. Rehogar la cebolla a fuego medio hasta que esté transparente, unos 10 minutos.',
          'Agregar la carne picada, desgranar con cuchara de madera y cocinar hasta que pierda el color rosado, unos 8 minutos.',
          'Condimentar con el comino, el pimentón, la sal y la pimienta. Incorporar la cucharada de azúcar y mezclar bien.',
          'Añadir la papa en cubos, las pasas de uva y las aceitunas. Cocinar 3 minutos más para integrar sabores. Retirar del fuego y dejar enfriar completamente.',
          'Incorporar los huevos duros picados al relleno ya frío. Mezclar con cuidado.',
          'Precalentar el horno a 200 °C. Colocar una porción generosa de relleno en el centro de cada tapa.',
          'Humedecer los bordes con agua, cerrar formando un repulgue y acomodar en placa con papel manteca. Pincelar con huevo batido y espolvorear con un poco de azúcar.',
          'Hornear durante 15 a 20 minutos o hasta que estén bien doradas. Servir calientes.'
        ],
        tip: 'El relleno debe estar bien frío antes de armar las empanadas para que las tapas no se ablanden. El toque de azúcar espolvoreado antes de hornear les da el brillo y sabor característico de Córdoba.'
      },
      chivito: {
        name: 'Chivito cordobés',
        tagline: 'Tradición serrana a fuego lento',
        culture: 'En Argentina, chivito es la cría de cabra. En el norte de Córdoba —zona de Quilino, sede del Festival Provincial del Cabrito— se cocina a la parrilla, al disco o a la cacerola con fuego bajo y mucha paciencia.',
        time: '3 h 30 min (+ marinado)',
        servings: '6–8 personas',
        difficulty: 'Alta',
        imgAlt: 'Chivito cordobés asado lentamente a la parrilla con brasas',
        ingredients: [
          '3 a 4 kg de chivito (cuartos o costillar)',
          '6 dientes de ajo, picados',
          'Jugo de 2 limones',
          '2 cucharadas de orégano seco',
          '1 cucharada de pimentón dulce',
          '100 ml de aceite de oliva',
          'Sal gruesa a gusto',
          'Pimienta negra molida a gusto',
          '1 kg de papas para acompañar',
          'Ensalada criolla (tomate, cebolla, morrón, vinagre y aceite)'
        ],
        steps: [
          'Preparar el adobo mezclando el ajo picado, el jugo de limón, el orégano, el pimentón, el aceite de oliva y una cucharada de sal gruesa.',
          'Untar las piezas de chivito con el adobo por todos lados. Cubrir y refrigerar entre 4 y 12 horas para que absorba los sabores.',
          'Encender el fuego con leña o carbón y esperar a obtener brasas medias a bajas, sin llama directa (Nota de seguridad: el manejo del fuego debe estar siempre a cargo de un adulto).',
          'Colocar el chivito sobre la parrilla a unos 30 cm de las brasas. Cocinar a fuego lento, girando cada 30 a 40 minutos.',
          'Humedecer periódicamente con el adobo restante usando un hisopo o rama de romero. Evitar que se seque la superficie.',
          'Cocinar durante 2 horas y media a 3 horas en total, hasta que la carne se separe fácilmente del hueso y esté bien dorada.',
          'Retirar de la parrilla y dejar reposar cubierto con papel de aluminio por 15 minutos antes de cortar.',
          'Servir con papas asadas y ensalada criolla. Acompañar con un buen vino tinto regional.'
        ],
        tip: 'La paciencia es la clave: nunca apures la cocción con fuego alto. Las brasas deben estar bajas y constantes. Si usás carbón, agregá de a poco para mantener la temperatura pareja.'
      }
    }
  },

  // =========================================================================
  // ENGLISH
  // =========================================================================
  en: {
    meta: {
      title: 'Flavors of Córdoba — Argentine Cuisine',
      description: 'Discover four iconic recipes from the province of Córdoba, Argentina: cornstarch alfajores, fruit alfajores, sweet empanadas, and slow-roasted kid goat.'
    },
    ui: {
      siteName: 'Flavors of Córdoba',
      heroTitle: 'Flavors of Córdoba',
      heroSubtitle: 'Four recipes that tell the story of our land',
      viewRecipe: 'View recipe ›',
      closeModal: 'Close',
      ingredientsTitle: 'Ingredients',
      stepsTitle: 'Directions',
      tipTitle: 'Tip',
      videoTitle: 'Recipe video',
      videoComingSoon: 'Video coming soon',
      videoError: 'Could not load the video',
      videoAlt: 'Preparation video',
      timeLabel: 'Time',
      servingsLabel: 'Servings',
      difficultyLabel: 'Difficulty',
      skipToContent: 'Skip to main content',
      noscriptMessage: 'This site requires JavaScript for translation and interactive features. Recipes are available in Spanish without JavaScript.',
      footerGroup: 'Bastian · Eleazar · Agustín · Bautista · Josías',
      footerCourse: '4th Year — 2026',
      footerImageCredits: 'Crafted with dedication and many hours of effort.',
      langToggleLabel: 'Change language',
      recipesSection: 'Recipes'
    },
    recipes: {
      alfajores: {
        name: 'Cornstarch {es}Alfajores{/es}',
        tagline: 'A taste of Córdoba in every bite',
        culture: '{es}Alfajores{/es} (delicate sandwich cookies) are a classic Argentine afternoon treat: tender cornstarch wafers filled with {es}dulce de leche{/es} (milk caramel) and rimmed with shredded coconut — an icon of Creole pastry.',
        time: '1 h 30 min',
        servings: '~15 pieces',
        difficulty: 'Medium',
        imgAlt: 'Cornstarch alfajores with dulce de leche and shredded coconut',
        ingredients: [
          '100 g (3.5 oz) softened butter',
          '100 g (3.5 oz) powdered sugar',
          '2 egg yolks',
          '100 g (3.5 oz) all-purpose flour (Argentine "0000")',
          '200 g (7 oz) cornstarch',
          '1 teaspoon baking powder',
          '1 teaspoon vanilla extract',
          'Zest of 1 lemon',
          '250 g (9 oz) dulce de leche (thick, pastry-grade)',
          '50 g (1.8 oz) shredded coconut'
        ],
        steps: [
          'Beat the softened butter with the powdered sugar until light and creamy, about 3 minutes.',
          'Add the egg yolks one at a time, then the vanilla extract and lemon zest. Mix until well combined.',
          'Sift together the flour, cornstarch, and baking powder. Fold gently into the butter mixture — do not over-knead, as this keeps the cookies tender.',
          'Wrap the dough in plastic wrap and refrigerate for at least 30 minutes.',
          'Preheat the oven to 170 °C (340 °F). Roll out the dough to about 5 mm (¼ in) thick on a surface dusted with cornstarch.',
          'Cut rounds of about 5 cm (2 in) with a plain cutter. Place on a baking sheet lined with parchment paper, 2 cm (¾ in) apart.',
          'Bake for 10 to 12 minutes — the cookies must stay pale with no browning. Let them cool completely on a wire rack.',
          'Spread a generous amount of dulce de leche on one cookie and sandwich with another, pressing gently.',
          'Roll the exposed dulce de leche edges in shredded coconut. Let the alfajores rest for at least 1 hour before serving.'
        ],
        tip: 'If the dough softens while rolling, return it to the fridge for 10 minutes. The key is to never let them brown in the oven — they should come out pale and tender.'
      },
      alfajores_fruta: {
        name: 'Fruit {es}Alfajores{/es}',
        tagline: 'Traditional sweet cookies filled with fruit paste',
        culture: 'In Argentina, fruit {es}alfajores{/es} are a traditional classic filled with quince or sweet potato paste, coated in royal icing or chocolate.',
        time: '1 h 30 min',
        servings: '12 to 15 alfajores',
        difficulty: 'Medium',
        imgAlt: 'Fruit alfajores filled with quince or sweet potato paste',
        ingredients: [
          '300 g (2½ cups) flour 0000',
          '100 g (¾ cup) cornstarch',
          '150 g (¾ cup) unsalted butter at room temperature',
          '120 g (½ cup + 1 tbsp) sugar',
          '2 egg yolks',
          '1 teaspoon vanilla extract',
          'Zest of 1 lemon',
          '400 g (14 oz) fruit jam or paste (membrillo or batata)'
        ],
        steps: [
          'Cream the butter and sugar together in a bowl until smooth and pale.',
          'Add the egg yolks, vanilla extract, and lemon zest, mixing well until fully incorporated.',
          'Sift together the flour and cornstarch, then gradually add them to the wet mixture, integrating gently without kneading too much until a soft dough forms.',
          'Wrap the dough in plastic wrap and refrigerate for 30 minutes to firm up.',
          'Roll out the dough on a lightly floured surface to a thickness of about 5 mm (¼ in). Cut out round discs using a cookie cutter.',
          'Place the cookies on a baking sheet lined with parchment paper and bake in a preheated oven at 180 °C (350 °F) for 10 to 12 minutes until dry and lightly golden on the bottom. Remove and let cool completely.',
          'Melt the fruit paste with a splash of water over low heat until smooth and pliable, then let it cool slightly.',
          'Fill the bottom of one cookie with a generous spoonful of the fruit paste and top with another cookie to form the alfajor. Press gently and serve.'
        ],
        tip: 'For a traditional finish, you can brush the top with a simple glaze made of powdered sugar and a few drops of lemon juice, or dust them with powdered sugar.'
      },
      empanadas: {
        name: 'Córdoba-Style Sweet {es}Empanadas{/es}',
        tagline: 'The bittersweet flavor that sets Córdoba apart',
        culture: 'The {es}empanada cordobesa{/es} (Córdoba-style turnover) is uniquely bittersweet: unlike other Argentine empanadas, it includes sugar and raisins alongside the meat, and has a drier filling.',
        time: '1 h 45 min',
        servings: '12 pieces',
        difficulty: 'Medium',
        imgAlt: 'Golden Córdoba-style empanadas fresh from the oven',
        ingredients: [
          '500 g (1.1 lb) ground beef (or hand-cut)',
          '500 g (1.1 lb) onion, finely diced',
          '100 g (3.5 oz) boiled potato, in small cubes',
          '2 hard-boiled eggs, chopped',
          '50 g (1.8 oz) raisins',
          '50 g (1.8 oz) green olives, chopped',
          '1 tablespoon sugar (+ extra for sprinkling)',
          '1 teaspoon ground cumin',
          '1 teaspoon sweet paprika or mild chili powder',
          'Salt and pepper to taste',
          '3 tablespoons beef tallow or cooking oil',
          '12 oven-ready empanada wrappers'
        ],
        steps: [
          'Heat the tallow or oil in a large skillet. Sauté the onion over medium heat until translucent, about 10 minutes.',
          'Add the ground beef, break it apart with a wooden spoon, and cook until no longer pink, about 8 minutes.',
          'Season with cumin, paprika, salt, and pepper. Add the tablespoon of sugar and stir well.',
          'Add the diced potato, raisins, and olives. Cook for 3 more minutes to meld the flavors. Remove from heat and let the filling cool completely.',
          'Gently mix the chopped hard-boiled eggs into the cooled filling.',
          'Preheat the oven to 200 °C (400 °F). Place a generous spoonful of filling in the center of each wrapper.',
          'Moisten the edges with water, fold over, and crimp with a traditional repulgue. Place on a parchment-lined baking sheet, brush with beaten egg, and sprinkle lightly with sugar.',
          'Bake for 15 to 20 minutes or until deeply golden. Serve warm.'
        ],
        tip: 'The filling must be completely cold before assembling so the wrappers do not get soggy. The sugar sprinkled before baking gives them the signature Córdoba gloss and flavor.'
      },
      chivito: {
        name: '{es}Chivito{/es} (Córdoba-Style Roast Kid Goat)',
        tagline: 'Mountain tradition, slow-cooked over embers',
        culture: 'In Argentina, {es}chivito{/es} refers to young goat (kid). In northern Córdoba — around the town of Quilino, home to the Provincial Kid Goat Festival — it is slow-roasted over a grill, in a disc, or in a pot with low embers and plenty of patience.',
        time: '3 h 30 min (+ marinating)',
        servings: '6–8 servings',
        difficulty: 'High',
        imgAlt: 'Córdoba-style chivito slowly roasting on the grill over embers',
        ingredients: [
          '3 to 4 kg (6.5–9 lb) kid goat (quarters or rack)',
          '6 garlic cloves, minced',
          'Juice of 2 lemons',
          '2 tablespoons dried oregano',
          '1 tablespoon sweet paprika',
          '100 ml (⅓ cup + 1 tbsp) olive oil',
          'Coarse salt to taste',
          'Freshly ground black pepper to taste',
          '1 kg (2.2 lb) potatoes for roasting',
          'Ensalada criolla (tomato, onion, bell pepper, vinegar, and oil)'
        ],
        steps: [
          'Prepare the marinade by mixing the minced garlic, lemon juice, oregano, paprika, olive oil, and a tablespoon of coarse salt.',
          'Rub the kid goat pieces with the marinade on all sides. Cover and refrigerate for 4 to 12 hours so the meat absorbs the flavors.',
          'Light a wood or charcoal fire and wait until you have medium-low embers with no open flame (Safety note: fire handling must always be supervised by an adult).',
          'Place the kid goat on the grill about 30 cm (12 in) above the embers. Cook slowly, turning every 30 to 40 minutes.',
          'Baste periodically with the remaining marinade using a brush or a sprig of rosemary. Keep the surface moist at all times.',
          'Cook for a total of 2½ to 3 hours, until the meat pulls easily from the bone and is beautifully golden.',
          'Remove from the grill and let rest, covered loosely with foil, for 15 minutes before carving.',
          'Serve with roasted potatoes and ensalada criolla. Pair with a good regional red wine.'
        ],
        tip: 'Patience is the key: never rush the cooking with high heat. The embers should be low and steady. If using charcoal, add small amounts at a time to maintain an even temperature.'
      }
    }
  }
};

// =============================================================================
// Medios de cada receta — no se traducen.
// Para activar un video: cambiar videoAvailable a true y colocar el .mp4
// en assets/videos/ con el nombre correspondiente.
// =============================================================================
window.RECIPE_MEDIA = {
    alfajores: {
        img: 'assets/img/alfajores.webp',
        poster: 'assets/img/alfajores.webp',
        video: 'assets/videos/alfajores.mp4',
        videoUrl: 'https://www.facebook.com/isabelvermal/videos/alfajores-de-maicena/1421250326365152/',
        youtube: null,
        videoAvailable: true
    },
    alfajores_fruta: {
        img: 'assets/img/alfajores-fruta.jpg',
        poster: 'assets/img/alfajores-fruta.jpg',
        video: 'assets/videos/alfajores_fruta.mp4',
        videoUrl: 'https://www.youtube.com/watch?v=SmZpVUSPpeo',
        youtube: 'https://www.youtube.com/watch?v=SmZpVUSPpeo',
        videoAvailable: true
    },
    empanadas: {
        img: 'assets/img/empanadas.webp',
        poster: 'assets/img/empanadas.webp',
        video: 'assets/videos/empanadas.mp4',
        videoUrl: 'https://www.youtube.com/watch?v=lw_cOZYX2_Q',
        youtube: 'https://www.youtube.com/watch?v=lw_cOZYX2_Q',
        videoAvailable: true
    },
    chivito: {
        img: 'assets/img/chivito.webp',
        poster: 'assets/img/chivito.webp',
        video: 'assets/videos/chivito.mp4',
        videoUrl: 'https://www.youtube.com/live/dRE7qxP1EBM',
        youtube: 'https://www.youtube.com/live/dRE7qxP1EBM',
        videoAvailable: true
    }
};
