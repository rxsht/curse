import { Booking, Review, Tour } from "../types";

const placeholderBlur = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0nMzIwJyBoZWlnaHQ9JzIwMCcgeG1sbnM9J2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJz48cmVjdCB3aWR0aD0nMzIwJyBoZWlnaHQ9JzIwMCcgZmlsbD0nI2UyZThmMCcvPjwvc3ZnPg==";

export const mockTours: Tour[] = [
  {
    id: 1,
    title: "Секретные улочки Старого Тбилиси",
    description: "Гастро-прогулка с локальным гидом и дегустацией вина.",
    city: "Тбилиси",
    country: "Грузия",
    category: "Food & Culture",
    price: 49,
    rating: 4.8,
    reviewsCount: 132,
    durationHours: 3,
    imageUrl: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      { imageUrl: "https://images.unsplash.com/photo-1518544866330-4e1fdf8f6f61?auto=format&fit=crop&w=1200&q=80", alt: "Тбилиси улицы", blurDataUrl: placeholderBlur },
      { imageUrl: "https://images.unsplash.com/photo-1521295121783-8a321d551ad2?auto=format&fit=crop&w=1200&q=80", alt: "Тбилиси закат", blurDataUrl: placeholderBlur }
    ],
    guideAvatar: { imageUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80", alt: "Nino Beridze", blurDataUrl: placeholderBlur },
    lat: 41.7151,
    lng: 44.8271,
    guideName: "Nino Beridze",
    includedServices: ["Дегустация локального вина", "Пеший маршрут", "Фото-точки"],
    badges: ["TOP_RATED"]
  },
  {
    id: 2,
    title: "Рассвет в Каппадокии",
    description: "Панорамы долин, фототочки и местные легенды.",
    city: "Гёреме",
    country: "Турция",
    category: "Adventure",
    price: 95,
    rating: 4.9,
    reviewsCount: 214,
    durationHours: 5,
    imageUrl: "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      { imageUrl: "https://images.unsplash.com/photo-1526778548025-fa2f459cd5ce?auto=format&fit=crop&w=1200&q=80", alt: "Каппадокия шары", blurDataUrl: placeholderBlur },
      { imageUrl: "https://images.unsplash.com/photo-1533526971632-8f4f0f4f6765?auto=format&fit=crop&w=1200&q=80", alt: "Каппадокия долины", blurDataUrl: placeholderBlur }
    ],
    guideAvatar: { imageUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80", alt: "Can Demir", blurDataUrl: placeholderBlur },
    lat: 38.6431,
    lng: 34.8286,
    guideName: "Can Demir",
    includedServices: ["Трансфер от центра", "Горячие напитки", "Мини-фотосессия"],
    badges: ["TOP_RATED", "NEW"]
  },
  {
    id: 3,
    title: "Архитектура и кофе в Барселоне",
    description: "Гауди, уютные дворики и speciality coffee маршрут.",
    city: "Барселона",
    country: "Испания",
    category: "City Highlights",
    price: 62,
    rating: 4.7,
    reviewsCount: 98,
    durationHours: 4,
    imageUrl: "https://images.unsplash.com/photo-1539037116277-4db20889f2d4?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      { imageUrl: "https://images.unsplash.com/photo-1533106418989-88406c7cc8ca?auto=format&fit=crop&w=1200&q=80", alt: "Барселона вид", blurDataUrl: placeholderBlur },
      { imageUrl: "https://images.unsplash.com/photo-1495567720989-cebdbdd97913?auto=format&fit=crop&w=1200&q=80", alt: "Барселона улица", blurDataUrl: placeholderBlur }
    ],
    guideAvatar: { imageUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80", alt: "Marta Ruiz", blurDataUrl: placeholderBlur },
    lat: 41.3874,
    lng: 2.1686,
    guideName: "Marta Ruiz",
    includedServices: ["Билеты без очереди", "Кофейный сет", "Локальные рекомендации"],
    badges: ["NEW"]
  },
  {
    id: 4,
    title: "Ночной Стамбул: огни Босфора",
    description: "Вечерняя прогулка по набережной, мостам и скрытым смотровым точкам.",
    city: "Стамбул",
    country: "Турция",
    category: "City Highlights",
    price: 58,
    rating: 4.6,
    reviewsCount: 77,
    durationHours: 3,
    imageUrl: "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      { imageUrl: "https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?auto=format&fit=crop&w=1200&q=80", alt: "Стамбул ночной", blurDataUrl: placeholderBlur },
      { imageUrl: "https://images.unsplash.com/photo-1554907984-15263bfd63bd?auto=format&fit=crop&w=1200&q=80", alt: "Босфор", blurDataUrl: placeholderBlur }
    ],
    guideAvatar: { imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80", alt: "Mehmet Kaya", blurDataUrl: placeholderBlur },
    lat: 41.0082,
    lng: 28.9784,
    guideName: "Mehmet Kaya",
    includedServices: ["Чай по-турецки", "Локальные истории", "Фото-стопы"],
    badges: ["TOP_RATED"]
  },
  {
    id: 5,
    title: "Римские каникулы: колизей и скрытые дворики",
    description: "Исторический маршрут по древнему Риму и атмосферным кварталам.",
    city: "Рим",
    country: "Италия",
    category: "History",
    price: 71,
    rating: 4.8,
    reviewsCount: 143,
    durationHours: 4,
    imageUrl: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      { imageUrl: "https://images.unsplash.com/photo-1525874684015-58379d421a52?auto=format&fit=crop&w=1200&q=80", alt: "Рим", blurDataUrl: placeholderBlur },
      { imageUrl: "https://images.unsplash.com/photo-1529260830199-42c24126f198?auto=format&fit=crop&w=1200&q=80", alt: "Колизей", blurDataUrl: placeholderBlur }
    ],
    guideAvatar: { imageUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80", alt: "Luca Bianchi", blurDataUrl: placeholderBlur },
    lat: 41.9028,
    lng: 12.4964,
    guideName: "Luca Bianchi",
    includedServices: ["Билеты fast-track", "Аудио-набор", "Кофе-брейк"],
    badges: ["TOP_RATED"]
  },
  {
    id: 6,
    title: "Париж для гурманов",
    description: "Рынки, пекарни и сырные лавки с дегустациями и историей районов.",
    city: "Париж",
    country: "Франция",
    category: "Food & Culture",
    price: 83,
    rating: 4.9,
    reviewsCount: 201,
    durationHours: 4,
    imageUrl: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      { imageUrl: "https://images.unsplash.com/photo-1549144511-f099e773c147?auto=format&fit=crop&w=1200&q=80", alt: "Париж", blurDataUrl: placeholderBlur },
      { imageUrl: "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?auto=format&fit=crop&w=1200&q=80", alt: "Французская кухня", blurDataUrl: placeholderBlur }
    ],
    guideAvatar: { imageUrl: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=200&q=80", alt: "Claire Dubois", blurDataUrl: placeholderBlur },
    lat: 48.8566,
    lng: 2.3522,
    guideName: "Claire Dubois",
    includedServices: ["Дегустация сыров", "Пекарни", "Карта гастро-точек"],
    badges: ["TOP_RATED", "NEW"]
  },
  {
    id: 7,
    title: "Афины: мифы и закаты Акрополя",
    description: "Истории античной Греции с закатной панорамой над городом.",
    city: "Афины",
    country: "Греция",
    category: "History",
    price: 54,
    rating: 4.5,
    reviewsCount: 64,
    durationHours: 3,
    imageUrl: "https://images.unsplash.com/photo-1555993539-1732b0258235?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      { imageUrl: "https://images.unsplash.com/photo-1603565816030-6b389eeb23cb?auto=format&fit=crop&w=1200&q=80", alt: "Афины", blurDataUrl: placeholderBlur },
      { imageUrl: "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1200&q=80", alt: "Акрополь", blurDataUrl: placeholderBlur }
    ],
    guideAvatar: { imageUrl: "https://images.unsplash.com/photo-1552058544-f2b08422138a?auto=format&fit=crop&w=200&q=80", alt: "Nikos Papadopoulos", blurDataUrl: placeholderBlur },
    lat: 37.9838,
    lng: 23.7275,
    guideName: "Nikos Papadopoulos",
    includedServices: ["Входные билеты", "Исторический гид", "Закатная смотровая"],
    badges: []
  },
  {
    id: 8,
    title: "Порту: винные погреба и мосты",
    description: "Пешеходный тур по старому городу и дегустация портвейна.",
    city: "Порту",
    country: "Португалия",
    category: "Food & Culture",
    price: 57,
    rating: 4.7,
    reviewsCount: 88,
    durationHours: 3,
    imageUrl: "https://images.unsplash.com/photo-1513735492246-483525079686?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      { imageUrl: "https://images.unsplash.com/photo-1585208798174-6cedd86e019a?auto=format&fit=crop&w=1200&q=80", alt: "Порту", blurDataUrl: placeholderBlur },
      { imageUrl: "https://images.unsplash.com/photo-1560109947-543149eceb16?auto=format&fit=crop&w=1200&q=80", alt: "Португальское вино", blurDataUrl: placeholderBlur }
    ],
    guideAvatar: { imageUrl: "https://images.unsplash.com/photo-1521119989659-a83eee488004?auto=format&fit=crop&w=200&q=80", alt: "Joao Silva", blurDataUrl: placeholderBlur },
    lat: 41.1579,
    lng: -8.6291,
    guideName: "Joao Silva",
    includedServices: ["Дегустация", "Локальные закуски", "Гид по районам"],
    badges: ["NEW"]
  },
  {
    id: 9,
    title: "Прага: легенды старого города",
    description: "Средневековые истории, астрономические часы и секретные дворики.",
    city: "Прага",
    country: "Чехия",
    category: "City Highlights",
    price: 46,
    rating: 4.6,
    reviewsCount: 112,
    durationHours: 3,
    imageUrl: "https://images.unsplash.com/photo-1519677100203-a0e668c92439?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      { imageUrl: "https://images.unsplash.com/photo-1541849546-216549ae216d?auto=format&fit=crop&w=1200&q=80", alt: "Прага", blurDataUrl: placeholderBlur },
      { imageUrl: "https://images.unsplash.com/photo-1526481280695-3c4696d9e1f1?auto=format&fit=crop&w=1200&q=80", alt: "Старый город", blurDataUrl: placeholderBlur }
    ],
    guideAvatar: { imageUrl: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=200&q=80", alt: "Jan Novak", blurDataUrl: placeholderBlur },
    lat: 50.0755,
    lng: 14.4378,
    guideName: "Jan Novak",
    includedServices: ["Легенды и мифы", "Карта маршрута", "Кофе-пауза"],
    badges: []
  },
  {
    id: 10,
    title: "Киото: храмы, сады и чайная церемония",
    description: "Традиционный маршрут по культовым местам Киото с церемонией чая.",
    city: "Киото",
    country: "Япония",
    category: "Culture",
    price: 102,
    rating: 4.9,
    reviewsCount: 176,
    durationHours: 5,
    imageUrl: "https://images.unsplash.com/photo-1492571350019-22de08371fd3?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      { imageUrl: "https://images.unsplash.com/photo-1528360983277-13d401cdc186?auto=format&fit=crop&w=1200&q=80", alt: "Киото", blurDataUrl: placeholderBlur },
      { imageUrl: "https://images.unsplash.com/photo-1558862107-d49ef2a04d72?auto=format&fit=crop&w=1200&q=80", alt: "Японский сад", blurDataUrl: placeholderBlur }
    ],
    guideAvatar: { imageUrl: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80", alt: "Aiko Tanaka", blurDataUrl: placeholderBlur },
    lat: 35.0116,
    lng: 135.7681,
    guideName: "Aiko Tanaka",
    includedServices: ["Чайная церемония", "Входные билеты", "Гид-историк"],
    badges: ["TOP_RATED"]
  },
  {
    id: 11,
    title: "Сеул: street food и современные кварталы",
    description: "От традиционных рынков до неоновых улиц Гангнама.",
    city: "Сеул",
    country: "Южная Корея",
    category: "Food & Culture",
    price: 68,
    rating: 4.7,
    reviewsCount: 93,
    durationHours: 4,
    imageUrl: "https://images.unsplash.com/photo-1538485399081-7c897b1b1c03?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      { imageUrl: "https://images.unsplash.com/photo-1517154421773-0529f29ea451?auto=format&fit=crop&w=1200&q=80", alt: "Сеул", blurDataUrl: placeholderBlur },
      { imageUrl: "https://images.unsplash.com/photo-1568084680786-a84f91d1153c?auto=format&fit=crop&w=1200&q=80", alt: "Корейская еда", blurDataUrl: placeholderBlur }
    ],
    guideAvatar: { imageUrl: "https://images.unsplash.com/photo-1541534401786-2077eed87a72?auto=format&fit=crop&w=200&q=80", alt: "Jin Woo", blurDataUrl: placeholderBlur },
    lat: 37.5665,
    lng: 126.9780,
    guideName: "Jin Woo",
    includedServices: ["Street food set", "Маршрут по районам", "Фото-локации"],
    badges: ["NEW"]
  },
  {
    id: 12,
    title: "Лиссабон: трамваи, азулежу и фаду",
    description: "Атмосферный тур по холмам Лиссабона и музыкальным кварталам.",
    city: "Лиссабон",
    country: "Португалия",
    category: "City Highlights",
    price: 52,
    rating: 4.6,
    reviewsCount: 79,
    durationHours: 3,
    imageUrl: "https://images.unsplash.com/photo-1585208798174-6cedd86e019a?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      { imageUrl: "https://images.unsplash.com/photo-1555881400-74d7acaacd8b?auto=format&fit=crop&w=1200&q=80", alt: "Лиссабон", blurDataUrl: placeholderBlur },
      { imageUrl: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?auto=format&fit=crop&w=1200&q=80", alt: "Трамвай", blurDataUrl: placeholderBlur }
    ],
    guideAvatar: { imageUrl: "https://images.unsplash.com/photo-1506863530036-1efeddceb993?auto=format&fit=crop&w=200&q=80", alt: "Ines Costa", blurDataUrl: placeholderBlur },
    lat: 38.7223,
    lng: -9.1393,
    guideName: "Ines Costa",
    includedServices: ["Трамвайный маршрут", "Пастел-де-ната", "Фаду-гид"],
    badges: []
  },
  {
    id: 13,
    title: "Дубай: пустыня и skyline",
    description: "Контрастный тур от старого Дубая до современных небоскребов.",
    city: "Дубай",
    country: "ОАЭ",
    category: "Adventure",
    price: 120,
    rating: 4.8,
    reviewsCount: 167,
    durationHours: 6,
    imageUrl: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      { imageUrl: "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1200&q=80", alt: "Пустыня", blurDataUrl: placeholderBlur },
      { imageUrl: "https://images.unsplash.com/photo-1526495124232-a04e1849168c?auto=format&fit=crop&w=1200&q=80", alt: "Дубай skyline", blurDataUrl: placeholderBlur }
    ],
    guideAvatar: { imageUrl: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=200&q=80", alt: "Omar Hassan", blurDataUrl: placeholderBlur },
    lat: 25.2048,
    lng: 55.2708,
    guideName: "Omar Hassan",
    includedServices: ["Сафари в пустыне", "Трансфер", "Фото-стоп у Burj Khalifa"],
    badges: ["TOP_RATED"]
  },
  {
    id: 14,
    title: "Будапешт: термы и панорамы Дуная",
    description: "История города, купальни и лучшие виды на парламент.",
    city: "Будапешт",
    country: "Венгрия",
    category: "Relax",
    price: 51,
    rating: 4.7,
    reviewsCount: 96,
    durationHours: 4,
    imageUrl: "https://images.unsplash.com/photo-1549877452-9c387954fbc2?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      { imageUrl: "https://images.unsplash.com/photo-1571055107559-3e67626fa8be?auto=format&fit=crop&w=1200&q=80", alt: "Будапешт", blurDataUrl: placeholderBlur },
      { imageUrl: "https://images.unsplash.com/photo-1528892952291-009c663ce843?auto=format&fit=crop&w=1200&q=80", alt: "Дунай", blurDataUrl: placeholderBlur }
    ],
    guideAvatar: { imageUrl: "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?auto=format&fit=crop&w=200&q=80", alt: "Eva Horvath", blurDataUrl: placeholderBlur },
    lat: 47.4979,
    lng: 19.0402,
    guideName: "Eva Horvath",
    includedServices: ["Вход в термы", "Пешеходный маршрут", "Локальные советы"],
    badges: []
  },
  {
    id: 15,
    title: "Вена: классика, музеи и десерты",
    description: "Имперская архитектура и сладкий маршрут по кафе Вены.",
    city: "Вена",
    country: "Австрия",
    category: "Culture",
    price: 66,
    rating: 4.8,
    reviewsCount: 121,
    durationHours: 4,
    imageUrl: "https://images.unsplash.com/photo-1516550893885-985f7c0c8f2f?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      { imageUrl: "https://images.unsplash.com/photo-1511732351661-8f4f2f2b5a84?auto=format&fit=crop&w=1200&q=80", alt: "Вена центр", blurDataUrl: placeholderBlur },
      { imageUrl: "https://images.unsplash.com/photo-1470337458703-46ad1756a187?auto=format&fit=crop&w=1200&q=80", alt: "Австрийские десерты", blurDataUrl: placeholderBlur }
    ],
    guideAvatar: { imageUrl: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=200&q=80", alt: "Anna Gruber", blurDataUrl: placeholderBlur },
    lat: 48.2082,
    lng: 16.3738,
    guideName: "Anna Gruber",
    includedServices: ["Музейный pass", "Кофе и десерт", "Маршрут по центру"],
    badges: ["TOP_RATED"]
  },
  {
    id: 16,
    title: "Марракеш: рынки и сады",
    description: "Яркие базары, исторические дворцы и отдых в оазисных садах.",
    city: "Марракеш",
    country: "Марокко",
    category: "City Highlights",
    price: 59,
    rating: 4.6,
    reviewsCount: 84,
    durationHours: 4,
    imageUrl: "https://images.unsplash.com/photo-1597212618440-806262de4f6b?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      { imageUrl: "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=1200&q=80", alt: "Марракеш базар", blurDataUrl: placeholderBlur },
      { imageUrl: "https://images.unsplash.com/photo-1539650116574-75c0c6d73f0e?auto=format&fit=crop&w=1200&q=80", alt: "Сады", blurDataUrl: placeholderBlur }
    ],
    guideAvatar: { imageUrl: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80", alt: "Youssef Amrani", blurDataUrl: placeholderBlur },
    lat: 31.6295,
    lng: -7.9811,
    guideName: "Youssef Amrani",
    includedServices: ["Чай и сладости", "Рынок-гид", "Трансфер из отеля"],
    badges: ["NEW"]
  },
  {
    id: 17,
    title: "Рейкьявик: северная романтика",
    description: "Прогулка по столице Исландии и охота за северным сиянием.",
    city: "Рейкьявик",
    country: "Исландия",
    category: "Adventure",
    price: 130,
    rating: 4.9,
    reviewsCount: 109,
    durationHours: 6,
    imageUrl: "https://images.unsplash.com/photo-1520769945061-0a448c463865?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      { imageUrl: "https://images.unsplash.com/photo-1476610182048-b716b8518aae?auto=format&fit=crop&w=1200&q=80", alt: "Исландия", blurDataUrl: placeholderBlur },
      { imageUrl: "https://images.unsplash.com/photo-1483347756197-71ef80e95f73?auto=format&fit=crop&w=1200&q=80", alt: "Северное сияние", blurDataUrl: placeholderBlur }
    ],
    guideAvatar: { imageUrl: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=200&q=80", alt: "Bjorn Olafsson", blurDataUrl: placeholderBlur },
    lat: 64.1466,
    lng: -21.9426,
    guideName: "Bjorn Olafsson",
    includedServices: ["Термос с какао", "Трансфер", "Фото-поддержка"],
    badges: ["TOP_RATED"]
  },
  {
    id: 18,
    title: "Сингапур: футуризм и сады у залива",
    description: "Город будущего, food courts и легендарные сады.",
    city: "Сингапур",
    country: "Сингапур",
    category: "City Highlights",
    price: 88,
    rating: 4.8,
    reviewsCount: 133,
    durationHours: 5,
    imageUrl: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      { imageUrl: "https://images.unsplash.com/photo-1536152470836-b943b246224c?auto=format&fit=crop&w=1200&q=80", alt: "Сингапур skyline", blurDataUrl: placeholderBlur },
      { imageUrl: "https://images.unsplash.com/photo-1521804906057-1df8fdb718b7?auto=format&fit=crop&w=1200&q=80", alt: "Gardens by the Bay", blurDataUrl: placeholderBlur }
    ],
    guideAvatar: { imageUrl: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=200&q=80", alt: "Ethan Lim", blurDataUrl: placeholderBlur },
    lat: 1.3521,
    lng: 103.8198,
    guideName: "Ethan Lim",
    includedServices: ["Карточка метро", "Street food tasting", "Вечерние локации"],
    badges: ["NEW"]
  },
  {
    id: 19,
    title: "Мехико: арт, муралы и тако",
    description: "Современное искусство, колониальная архитектура и уличная гастрономия.",
    city: "Мехико",
    country: "Мексика",
    category: "Food & Culture",
    price: 63,
    rating: 4.7,
    reviewsCount: 118,
    durationHours: 4,
    imageUrl: "https://images.unsplash.com/photo-1518655048521-f130df041f66?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      { imageUrl: "https://images.unsplash.com/photo-1534351590666-13e3e96b5017?auto=format&fit=crop&w=1200&q=80", alt: "Мехико центр", blurDataUrl: placeholderBlur },
      { imageUrl: "https://images.unsplash.com/photo-1552332386-f8dd00dc2f85?auto=format&fit=crop&w=1200&q=80", alt: "Тако", blurDataUrl: placeholderBlur }
    ],
    guideAvatar: { imageUrl: "https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?auto=format&fit=crop&w=200&q=80", alt: "Diego Ramirez", blurDataUrl: placeholderBlur },
    lat: 19.4326,
    lng: -99.1332,
    guideName: "Diego Ramirez",
    includedServices: ["Фуд-сет", "Арт-гид", "Маршрут по районам"],
    badges: []
  },
  {
    id: 20,
    title: "Кейптаун: океан, винодельни и Table Mountain",
    description: "Комбо-тур по природе, городским видам и винодельням региона.",
    city: "Кейптаун",
    country: "ЮАР",
    category: "Adventure",
    price: 115,
    rating: 4.9,
    reviewsCount: 156,
    durationHours: 7,
    imageUrl: "https://images.unsplash.com/photo-1576485290814-1c72aa4bbb8e?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      { imageUrl: "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=1200&q=80", alt: "Кейптаун", blurDataUrl: placeholderBlur },
      { imageUrl: "https://images.unsplash.com/photo-1593642532973-d31b6557fa68?auto=format&fit=crop&w=1200&q=80", alt: "Винодельни", blurDataUrl: placeholderBlur }
    ],
    guideAvatar: { imageUrl: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=200&q=80", alt: "Thabo Mbeki", blurDataUrl: placeholderBlur },
    lat: -33.9249,
    lng: 18.4241,
    guideName: "Thabo Mbeki",
    includedServices: ["Подъем на фуникулере", "Дегустация вин", "Трансфер"],
    badges: ["TOP_RATED"]
  }
];

export const mockBookings: Booking[] = [
  { id: 11, tourId: 1, tourTitle: "Секретные улочки Старого Тбилиси", participants: 2, status: "CONFIRMED", tourDate: "2026-05-02" }
];

export const mockReviews: Review[] = [
  { id: 1, tourId: 1, userId: 101, author: "Анна", rating: 5, comment: "Очень душевная экскурсия!", createdAt: "2026-04-15T10:00:00Z" },
  { id: 2, tourId: 1, userId: 102, author: "Илья", rating: 4, comment: "Отличный темп и интересные факты.", createdAt: "2026-04-16T12:30:00Z" }
];
