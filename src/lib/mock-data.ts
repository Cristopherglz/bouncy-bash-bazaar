import {
  PartyPopper,
  Cake,
  Sparkles,
  Gift,
  Candy,
  Cookie,
  CupSoda,
  Crown,
  Utensils,
  Drum,
  Wand2,
  Baby,
  Rocket,
  Heart,
  type LucideIcon,
} from "lucide-react";

export type Category = { id: string; name: string; color: string; icon: LucideIcon };

export type Product = {
  id: string;
  sku: string;
  name: string;
  category: string;
  price: number;
  cost: number;
  stock: number;
  minStock: number;
  supplier: string;
  barcode: string;
  image: string;
  images: string[];
  description: string;
  wholesalePrice: number;
  wholesaleMinQty: number;
  publishedOnline: boolean;
  discountPct: number; // 0 = no discount
  updatedAt: string;
};

export const CATEGORIES: Category[] = [
  { id: "globos", name: "Globos", color: "oklch(0.60 0.22 27)", icon: PartyPopper },
  { id: "decoracion", name: "Decoración de Fiesta", color: "oklch(0.80 0.17 85)", icon: Sparkles },
  { id: "tematicas", name: "Fiestas Temáticas", color: "oklch(0.65 0.20 350)", icon: Wand2 },
  { id: "pinatas", name: "Piñatas y Juegos", color: "oklch(0.70 0.18 45)", icon: Drum },
  { id: "velas", name: "Velas y Torta", color: "oklch(0.75 0.15 60)", icon: Cake },
  { id: "vajilla", name: "Vajilla Descartable", color: "oklch(0.68 0.14 210)", icon: Utensils },
  { id: "disfraces", name: "Disfraces y Accesorios", color: "oklch(0.62 0.19 300)", icon: Crown },
  { id: "sorpresitas", name: "Sorpresitas y Cotillón", color: "oklch(0.70 0.18 145)", icon: Gift },
  { id: "infantil", name: "Cumpleaños Infantil", color: "oklch(0.78 0.14 340)", icon: Baby },
  { id: "eventos", name: "Casamientos y Egresados", color: "oklch(0.55 0.14 265)", icon: Heart },
  { id: "puflitos", name: "Puflitos y Chizitos", color: "oklch(0.78 0.18 75)", icon: Rocket },
  { id: "snacks", name: "Snacks Salados", color: "oklch(0.72 0.16 65)", icon: Cookie },
  { id: "golosinas", name: "Golosinas y Candy Bar", color: "oklch(0.66 0.20 15)", icon: Candy },
  { id: "bebidas", name: "Bebidas para Fiesta", color: "oklch(0.65 0.18 250)", icon: CupSoda },
];

export const SUPPLIERS = [
  "Cotillón del Litoral",
  "Distribuidora Fiesta Misiones",
  "Globos Sempertex",
  "Piñatas Posadas",
  "Papelera Guaraní",
  "Arcor",
  "Bagley",
  "Pepsico Argentina",
  "Georgalos",
  "Mondelez Argentina",
  "Coca-Cola FEMSA",
  "Distribuidora Iguazú",
  "Juguetería Mayorista Norte",
];

const IMG = (id: string, crop = "entropy") =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&crop=${crop}&w=700&q=72`;

/** Productos con foto real generada para la tienda (public/images/products). */
const GENERATED = new Set([
  "g1", "g2", "g3", "g4", "g5",
  "d1", "d2", "d3", "d4", "d5",
  "t1", "t2", "t3", "t4", "t5",
  "pi1", "pi2", "pi3", "pi4", "v1",
]);

/** Productos con una sola foto generada (packshot fondo blanco). */
const GENERATED_SINGLE = new Set([
  "v2", "v3", "v4",
  "va1", "va2", "va3", "va4", "va5",
  "di1", "di2", "di3", "di4",
  "s1", "s2", "s3", "s4",
  "in1", "in2", "e1", "e2",
  "pu1", "pu2", "pu3", "pu4", "pu5",
  "sn1", "sn2", "sn3", "sn4",
  "go1", "go2", "go3", "go4",
  "b1", "b2", "b3", "b4",
]);

const galleryFor = (id: string, imgId: string) =>
  GENERATED.has(id)
    ? [`/images/products/${id}-1.jpg`, `/images/products/${id}-2.jpg`]
    : GENERATED_SINGLE.has(id)
      ? [`/images/products/${id}-1.jpg`]
      : [IMG(imgId), IMG(imgId, "edges")];


const P = (
  id: string,
  sku: string,
  name: string,
  category: string,
  price: number,
  cost: number,
  stock: number,
  minStock: number,
  supplier: string,
  barcode: string,
  imgId: string,
  description: string,
  wholesalePrice: number,
  wholesaleMinQty: number,
  discountPct = 0,
  publishedOnline = true,
): Product => ({
  id,
  sku,
  name,
  category,
  price,
  cost,
  stock,
  minStock,
  supplier,
  barcode,
  image: galleryFor(id, imgId)[0],
  images: galleryFor(id, imgId),
  description,
  wholesalePrice,
  wholesaleMinQty,
  publishedOnline,
  discountPct,
  updatedAt: "2026-07-29",
});

export const INITIAL_PRODUCTS: Product[] = [
  P("g1", "GLO-001", "Globos Látex Rojos x50", "globos", 4500, 2800, 120, 30, "Globos Sempertex", "7791100000012", "photo-1530103862676-de8c9debad1d", "Bolsa de 50 globos de látex rojo intenso, ideales para arcos y decoración de salón.", 3600, 6, 0),
  P("g2", "GLO-004", "Globos Látex Amarillos x50", "globos", 4500, 2800, 96, 30, "Globos Sempertex", "7791100000029", "photo-1464349095431-e9a21285b5f3", "50 globos amarillos de látex premium, perfectos para combinar con el rojo de Papita's.", 3600, 6, 0),
  P("g3", "GLO-010", "Globo Metalizado Número (0 al 9)", "globos", 3200, 1900, 64, 20, "Globos Sempertex", "7791100000036", "photo-1513151233558-d860c5398176", "Globo metalizado de 80 cm en forma de número. Elegí el número al retirar o avisanos por WhatsApp.", 2560, 6, 10),
  P("g4", "GLO-018", "Arco de Globos Kit Rojo y Dorado", "globos", 18900, 12500, 22, 8, "Cotillón del Litoral", "7791100000043", "photo-1527529482837-4698179dc6ce", "Kit completo para armar un arco orgánico: globos de distintos tamaños, cinta guía y ganchos.", 15120, 6, 0),
  P("g5", "GLO-025", "Globos Confetti Transparentes x10", "globos", 5900, 3600, 40, 15, "Globos Sempertex", "7791100000050", "photo-1533139502658-0198f920d8e8", "Globos cristal rellenos de confetti metalizado. Efecto brillante para fotos.", 4720, 6, 0),
  P("d1", "DEC-002", "Guirnalda Feliz Cumple Metalizada", "decoracion", 2900, 1750, 85, 25, "Cotillón del Litoral", "7791100000067", "photo-1519671482749-fd09be7ccebf", "Guirnalda metalizada de 2 metros con letras Feliz Cumple. Reutilizable.", 2320, 12, 0),
  P("d2", "DEC-007", "Cortina Metalizada Dorada 1x2m", "decoracion", 3900, 2400, 48, 15, "Papelera Guaraní", "7791100000074", "photo-1517824806704-9040b037703b", "Cortina de flecos metalizados dorados de 1x2 m para fondo de fotos.", 3120, 6, 0),
  P("d3", "DEC-012", "Banderines de Papel x10m", "decoracion", 2400, 1400, 70, 20, "Papelera Guaraní", "7791100000081", "photo-1541532713592-79a0317b6b77", "Tira de 10 metros con banderines triangulares de papel en colores surtidos.", 1920, 12, 0),
  P("d4", "DEC-020", "Confetti Metalizado Bolsa 100g", "decoracion", 1800, 950, 130, 30, "Cotillón del Litoral", "7791100000098", "photo-1478147427282-58a87a120781", "Bolsa de 100 g de confetti metalizado multicolor para mesas y cañones.", 1440, 12, 15),
  P("d5", "DEC-028", "Backdrop Telón Rojo con Luces", "decoracion", 24900, 16800, 10, 5, "Distribuidora Fiesta Misiones", "7791100000104", "photo-1513885535751-8b9238bd345a", "Telón rojo de 2x2 m con guirnalda de luces LED cálidas incluida.", 19920, 6, 0),
  P("t1", "TEM-003", "Kit Temático Superhéroes (12 personas)", "tematicas", 15900, 10200, 24, 8, "Distribuidora Fiesta Misiones", "7791100000111", "photo-1516684732162-798a0062be99", "Vasos, platos, servilletas, mantel y gorritos temáticos para 12 invitados.", 12720, 6, 0),
  P("t2", "TEM-008", "Kit Temático Princesas (12 personas)", "tematicas", 15900, 10200, 26, 8, "Distribuidora Fiesta Misiones", "7791100000128", "photo-1558636508-e0db3814bd1d", "Set completo de vajilla y cotillón princesas para 12 chicos.", 12720, 6, 0),
  P("t3", "TEM-014", "Kit Temático Fútbol (12 personas)", "tematicas", 15900, 10200, 18, 8, "Distribuidora Fiesta Misiones", "7791100000135", "photo-1441986300917-64674bd600d8", "Todo para el cumple futbolero: vajilla, mantel y accesorios para 12.", 12720, 6, 10),
  P("t4", "TEM-021", "Kit Temático Dinosaurios (12 personas)", "tematicas", 16900, 10900, 15, 6, "Distribuidora Fiesta Misiones", "7791100000142", "photo-1470337458703-46ad1756a187", "Kit jurásico con vajilla, mantel, gorritos y sorpresitas para 12 invitados.", 13520, 6, 0),
  P("t5", "TEM-030", "Kit Temático Unicornio (12 personas)", "tematicas", 16900, 10900, 20, 6, "Distribuidora Fiesta Misiones", "7791100000159", "photo-1481391319762-47dff72954d9", "Kit pastel de unicornio: vajilla, banderín y accesorios para 12 chicos.", 13520, 6, 0),
  P("pi1", "PIN-001", "Piñata Cartón Grande Temática", "pinatas", 12900, 8400, 18, 6, "Piñatas Posadas", "7791100000166", "photo-1497534446932-c925b458314e", "Piñata artesanal de cartón y papel, 50 cm. Consultanos por el diseño disponible.", 10320, 6, 0),
  P("pi2", "PIN-006", "Piñata Mini para Mesa Dulce", "pinatas", 5900, 3600, 34, 12, "Piñatas Posadas", "7791100000173", "photo-1499195333224-3ce974eecb47", "Piñata pequeña decorativa de 20 cm, ideal como centro de mesa dulce.", 4720, 6, 0),
  P("pi3", "PIN-011", "Relleno para Piñata Surtido 1kg", "pinatas", 8900, 5800, 40, 15, "Arcor", "7791100000180", "photo-1514362545857-3bc16c4c7d1b", "Mix de golosinas surtidas de 1 kg pensado para rellenar piñatas.", 7120, 6, 0),
  P("pi4", "PIN-015", "Juego Ponele la Cola al Burro", "pinatas", 3900, 2300, 26, 10, "Juguetería Mayorista Norte", "7791100000197", "photo-1516035069371-29a1b244cc32", "Clásico juego de cumpleaños con afiche, colas adhesivas y antifaz.", 3120, 6, 0),
  P("v1", "VEL-002", "Vela Número Dorada", "velas", 1900, 1050, 90, 25, "Cotillón del Litoral", "7791100000203", "photo-1517686469429-8bdb88b9f907", "Vela dorada de 12 cm en forma de número. Indicanos el número al comprar.", 1520, 12, 0),
  P("v2", "VEL-006", "Velas Chispita x4", "velas", 2600, 1500, 68, 20, "Cotillón del Litoral", "7791100000210", "photo-1519681393784-d120267933ba", "Pack de 4 velas chispita de efecto fuego frío para el momento de la torta.", 2080, 12, 12),
  P("v3", "VEL-010", "Topper Feliz Cumpleaños Acrílico", "velas", 3400, 2100, 44, 15, "Papelera Guaraní", "7791100000227", "photo-1523294587484-bae6cc870010", "Topper de acrílico espejado para torta con leyenda Feliz Cumpleaños.", 2720, 6, 0),
  P("v4", "VEL-014", "Base Cartón para Torta x5", "velas", 2200, 1250, 75, 20, "Papelera Guaraní", "7791100000234", "photo-1541167760496-1628856ab772", "5 bases redondas de cartón rígido plateado de 25 cm.", 1760, 12, 0),
  P("va1", "VAJ-001", "Vasos Descartables Rojos x50", "vajilla", 3200, 1900, 140, 40, "Papelera Guaraní", "7791100000241", "photo-1548943487-a2e4e43b4853", "50 vasos plásticos rojos de 300 ml, resistentes para bebidas frías.", 2560, 6, 0),
  P("va2", "VAJ-005", "Platos de Cartón Amarillos x25", "vajilla", 2900, 1700, 110, 35, "Papelera Guaraní", "7791100000258", "photo-1549007994-cb92caebd54b", "25 platos de cartón laminado amarillo de 22 cm.", 2320, 12, 0),
  P("va3", "VAJ-009", "Servilletas Temáticas x40", "vajilla", 1600, 900, 160, 40, "Papelera Guaraní", "7791100000265", "photo-1550583724-b2692b85b150", "40 servilletas de papel doble hoja con estampado de fiesta.", 1280, 12, 0),
  P("va4", "VAJ-013", "Mantel Plástico Rojo 1.8m", "vajilla", 2400, 1400, 88, 25, "Cotillón del Litoral", "7791100000272", "photo-1554866585-cd94860890b7", "Mantel descartable de polietileno rojo de 1,8 x 1,2 m.", 1920, 12, 0),
  P("va5", "VAJ-018", "Bandejas Descartables x10", "vajilla", 3600, 2200, 52, 18, "Papelera Guaraní", "7791100000289", "photo-1556909212-d5b604d0c90d", "10 bandejas rectangulares descartables para picada y copetín.", 2880, 6, 0),
  P("di1", "DIS-002", "Gorritos de Cumpleaños x12", "disfraces", 2800, 1600, 95, 30, "Cotillón del Litoral", "7791100000296", "photo-1560472354-b33ff0c44a43", "12 gorritos de cartón con elástico, colores surtidos.", 2240, 12, 0),
  P("di2", "DIS-007", "Antifaces Surtidos x10", "disfraces", 3400, 2000, 62, 20, "Cotillón del Litoral", "7791100000302", "photo-1560769629-975ec94e6a86", "10 antifaces de cartón glitter en modelos y colores variados.", 2720, 6, 0),
  P("di3", "DIS-011", "Vinchas de Luz LED x6", "disfraces", 6900, 4300, 38, 12, "Juguetería Mayorista Norte", "7791100000319", "photo-1563805042-7684c019e1cb", "6 vinchas con luces LED intermitentes, pilas incluidas.", 5520, 6, 10),
  P("di4", "DIS-016", "Pelucas de Colores x4", "disfraces", 7900, 5000, 24, 10, "Juguetería Mayorista Norte", "7791100000326", "photo-1566478989037-eec170784d0b", "4 pelucas sintéticas de colores flúo para fiestas y despedidas.", 6320, 6, 0),
  P("s1", "SOR-003", "Bolsitas Sorpresa Armadas x10", "sorpresitas", 9900, 6300, 45, 15, "Cotillón del Litoral", "7791100000333", "photo-1571091718767-18b5b1457add", "10 bolsitas ya armadas con golosinas y juguetitos para los invitados.", 7920, 6, 0),
  P("s2", "SOR-008", "Cotillón Mixto para Fiesta x50", "sorpresitas", 12900, 8300, 30, 10, "Cotillón del Litoral", "7791100000340", "photo-1571997478779-2adcbbe9ab2f", "Combo de 50 piezas: gorritos, matracas, antifaces, cornetas y guirnaldas.", 10320, 6, 0),
  P("s3", "SOR-012", "Matracas y Cornetas x12", "sorpresitas", 4900, 3000, 70, 20, "Juguetería Mayorista Norte", "7791100000357", "photo-1575224300306-1b8da36134ec", "12 elementos sonoros surtidos para el brindis y el cotillón.", 3920, 6, 0),
  P("s4", "SOR-017", "Burbujeros Mini x24", "sorpresitas", 6400, 4000, 55, 18, "Juguetería Mayorista Norte", "7791100000364", "photo-1578985545062-69928b1d9587", "24 burbujeros pequeños, el clásico souvenir para los más chicos.", 5120, 6, 0),
  P("in1", "INF-002", "Set Mesa Dulce Infantil", "infantil", 18900, 12400, 14, 6, "Distribuidora Fiesta Misiones", "7791100000371", "photo-1587049352846-4a222e784d38", "Bases, bandejas, carteles y decoración para armar tu mesa dulce.", 15120, 6, 0),
  P("in2", "INF-006", "Invitaciones Infantiles x20", "infantil", 2600, 1500, 80, 25, "Papelera Guaraní", "7791100000388", "photo-1587854692152-cbe660dbde88", "20 tarjetas de invitación con sobre, listas para completar.", 2080, 12, 0),
  P("e1", "EVE-003", "Kit Casamiento Blanco y Dorado", "eventos", 29900, 19800, 8, 4, "Distribuidora Fiesta Misiones", "7791100000395", "photo-1595295333158-4742f28fbd85", "Decoración elegante para casamientos: caminos de mesa, velas y cartelería.", 23920, 6, 0),
  P("e2", "EVE-008", "Souvenirs Egresados x20", "eventos", 15900, 10500, 16, 6, "Cotillón del Litoral", "7791100000401", "photo-1595475207225-428b62bda831", "20 souvenirs personalizables para fiestas de egresados.", 12720, 6, 10),
  P("pu1", "PUF-001", "Puflito Clásico 100g", "puflitos", 1200, 700, 200, 50, "Distribuidora Iguazú", "7791100000418", "photo-1600271886742-f049cd451bba", "El clásico puflito de maíz inflado, liviano y crocante. Bolsa de 100 g.", 960, 12, 0),
  P("pu2", "PUF-004", "Chizito Queso 120g", "puflitos", 1450, 850, 180, 50, "Pepsico Argentina", "7791100000425", "photo-1600788886242-5c96aabe3757", "Chizitos de maíz con sabor a queso, bolsa familiar de 120 g.", 1160, 12, 0),
  P("pu3", "PUF-008", "Conitos de Maíz 90g", "puflitos", 1100, 620, 150, 40, "Distribuidora Iguazú", "7791100000432", "photo-1600891964092-4316c288032e", "Conitos de maíz salados de 90 g, ideales para copetín.", 880, 12, 15),
  P("pu4", "PUF-012", "Palitos Salados 100g", "puflitos", 990, 560, 165, 40, "Bagley", "7791100000449", "photo-1606787366850-de6330128bfc", "Palitos salados horneados de 100 g, el infaltable de la picada.", 790, 12, 0),
  P("pu5", "PUF-016", "Pack Fiesta Puflito + Chizito x6", "puflitos", 6900, 4300, 60, 20, "Distribuidora Iguazú", "7791100000456", "photo-1607013251379-e6eecfffe234", "6 bolsas combinadas de puflito y chizito para servir en la fiesta.", 5520, 6, 0),
  P("sn1", "SNK-002", "Papas Fritas Clásicas 250g", "snacks", 2200, 1400, 130, 35, "Pepsico Argentina", "7791100000463", "photo-1607083206869-4c7672e72a8a", "Papas fritas de corte clásico con sal, bolsa de 250 g.", 1760, 12, 0),
  P("sn2", "SNK-006", "Nachos con Queso 200g", "snacks", 2600, 1650, 88, 25, "Pepsico Argentina", "7791100000470", "photo-1607478900766-efe13248b125", "Nachos de maíz sabor queso, 200 g. Combinan con salsas y guacamole.", 2080, 12, 0),
  P("sn3", "SNK-010", "Maní Salado 200g", "snacks", 1700, 1000, 140, 35, "Georgalos", "7791100000487", "photo-1608571423902-eed4a5ad8108", "Maní tostado y salado de 200 g para el copetín.", 1360, 12, 0),
  P("sn4", "SNK-014", "Palitos de Queso 150g", "snacks", 1600, 950, 0, 30, "Bagley", "7791100000494", "photo-1608889825205-eebdb9fc5806", "Palitos horneados sabor queso, bolsa de 150 g.", 1280, 12, 0),
  P("go1", "GOL-002", "Mix Golosinas Candy Bar 1kg", "golosinas", 9900, 6400, 48, 15, "Arcor", "7791100000500", "photo-1610450949065-1f2841536c88", "1 kg de golosinas surtidas seleccionadas para armar tu candy bar.", 7920, 6, 0),
  P("go2", "GOL-006", "Chupetines Surtidos x50", "golosinas", 5200, 3300, 90, 25, "Arcor", "7791100000517", "photo-1611080626919-7cf5a9dbab5b", "50 chupetines de frutas en colores surtidos.", 4160, 6, 10),
  P("go3", "GOL-010", "Gomitas Frutales 1kg", "golosinas", 7400, 4700, 55, 18, "Mondelez Argentina", "7791100000524", "photo-1613919113640-25732ec5e61f", "1 kg de gomitas frutales blandas, sin gluten.", 5920, 6, 0),
  P("go4", "GOL-015", "Alfajorcitos Mini x24", "golosinas", 8900, 5800, 42, 15, "Georgalos", "7791100000531", "photo-1614707267537-b85aaf00c4b7", "24 alfajorcitos de dulce de leche bañados, tamaño mini.", 7120, 6, 0),
  P("b1", "BEB-002", "Gaseosa Cola 2.25L", "bebidas", 2600, 1700, 120, 30, "Coca-Cola FEMSA", "7791100000548", "photo-1621939514649-280e2ee25f60", "Botella de gaseosa cola de 2,25 L bien fría para tu fiesta.", 2080, 12, 0),
  P("b2", "BEB-006", "Gaseosa Naranja 2.25L", "bebidas", 2400, 1550, 96, 30, "Coca-Cola FEMSA", "7791100000555", "photo-1621996346565-e3dbc646d9a9", "Gaseosa sabor naranja de 2,25 L.", 1920, 12, 0),
  P("b3", "BEB-010", "Jugo en Polvo Surtido x10", "bebidas", 2900, 1800, 110, 30, "Arcor", "7791100000562", "photo-1622483767028-3f66f32aef97", "10 sobres de jugo en polvo de distintos sabores.", 2320, 12, 0),
  P("b4", "BEB-014", "Agua Saborizada 1.5L", "bebidas", 1900, 1150, 84, 25, "Coca-Cola FEMSA", "7791100000579", "photo-1530103862676-de8c9debad1d", "Agua saborizada de 1,5 L, opción liviana para acompañar la picada.", 1520, 12, 10),
];

export const SALES_LAST_7_DAYS = [
  { day: "Mié", sales: 185000, orders: 62 },
  { day: "Jue", sales: 212000, orders: 78 },
  { day: "Vie", sales: 425000, orders: 134 },
  { day: "Sáb", sales: 512000, orders: 168 },
  { day: "Dom", sales: 298000, orders: 97 },
  { day: "Lun", sales: 165000, orders: 52 },
  { day: "Mar", sales: 208000, orders: 76 },
];
