const PORT_MAP: Record<string, string> = {
  // Taiwan
  KAOHSIUNG: '高雄',
  KEELUNG: '基隆',
  TAICHUNG: '台中',
  TAIPEI: '台北',
  TAINAN: '台南',
  HUALIEN: '花蓮',
  SUAO: '蘇澳',
  ANPING: '安平',

  // China
  SHANGHAI: '上海',
  GUANGZHOU: '廣州',
  SHENZHEN: '深圳',
  TIANJIN: '天津',
  QINGDAO: '青島',
  NINGBO: '寧波',
  XIAMEN: '廈門',
  DALIAN: '大連',
  FUZHOU: '福州',
  ZHOUSHAN: '舟山',
  NANJING: '南京',
  WUHAN: '武漢',
  CHONGQING: '重慶',
  LIANYUNGANG: '連雲港',
  YANTAI: '煙台',
  WEIHAI: '威海',
  RIZHAO: '日照',
  TANGSHAN: '唐山',
  NANTONG: '南通',
  TAICANG: '太倉',
  ZHANGJIAGANG: '張家港',
  ZHUHAI: '珠海',
  HUANGPU: '黃埔',
  YINGKOU: '營口',
  JINZHOU: '錦州',

  // Japan
  TOKYO: '東京',
  YOKOHAMA: '橫濱',
  OSAKA: '大阪',
  KOBE: '神戶',
  NAGOYA: '名古屋',
  FUKUOKA: '福岡',
  HAKATA: '博多',
  KITAKYUSHU: '北九州',
  CHIBA: '千葉',
  KAWASAKI: '川崎',
  SHIMIZU: '清水',
  NAGASAKI: '長崎',
  NAHA: '那霸',
  SENDAI: '仙台',
  TOMAKOMAI: '苫小牧',
  MOJI: '門司',

  // South Korea
  BUSAN: '釜山',
  INCHEON: '仁川',
  GWANGYANG: '光陽',
  ULSAN: '蔚山',
  PYEONGTAEK: '平澤',

  // Hong Kong / Macau
  'HONG KONG': '香港',
  HONGKONG: '香港',
  MACAU: '澳門',

  // Southeast Asia
  SINGAPORE: '新加坡',
  MANILA: '馬尼拉',
  JAKARTA: '雅加達',
  SURABAYA: '泗水',
  SEMARANG: '三寶瓏',
  MEDAN: '棉蘭',
  MAKASSAR: '望加錫',
  BANGKOK: '曼谷',
  'LAEM CHABANG': '林查班',
  'HO CHI MINH': '胡志明市',
  'HO CHI MINH CITY': '胡志明市',
  SAIGON: '西貢',
  HANOI: '河內',
  HAIPHONG: '海防',
  'DANANG': '峴港',
  'DA NANG': '峴港',
  'PORT KLANG': '巴生港',
  PENANG: '檳城',
  'PASIR GUDANG': '巴西古當',
  'TANJUNG PELEPAS': '丹戎帕拉帕斯',
  KUANTAN: '關丹',
  'PHNOM PENH': '金邊',
  YANGON: '仰光',
  RANGOON: '仰光',
  COLOMBO: '可倫坡',
  'PORT LOUIS': '路易港',

  // India
  MUMBAI: '孟買',
  NHAVA: '那瓦舍瓦',
  'NHAVA SHEVA': '那瓦舍瓦',
  CHENNAI: '金奈',
  MADRAS: '馬德拉斯',
  KOLKATA: '加爾各答',
  CALCUTTA: '加爾各答',
  COCHIN: '科欽',
  KOCHI: '科欽',
  VIZAG: '維沙卡帕特南',
  VISHAKHAPATNAM: '維沙卡帕特南',
  HALDIA: '哈爾迪亞',
  KANDLA: '甘德拉',
  MUNDRA: '蒙德拉',
  PIPAVAV: '皮帕瓦夫',

  // Middle East
  DUBAI: '杜拜',
  'JEBEL ALI': '傑貝阿里',
  ABUDHABI: '阿布達比',
  'ABU DHABI': '阿布達比',
  SHARJAH: '沙迦',
  MUSCAT: '馬斯喀特',
  'SALALAH': '薩拉拉',
  DAMMAM: '達曼',
  JEDDAH: '吉達',
  'UMMALQUWAIN': '烏姆蓋萬',

  // Australia / NZ
  SYDNEY: '雪梨',
  MELBOURNE: '墨爾本',
  BRISBANE: '布里斯本',
  PERTH: '伯斯',
  FREMANTLE: '弗里曼틀',
  ADELAIDE: '阿得雷德',
  AUCKLAND: '奧克蘭',
  TAURANGA: '陶朗加',

  // Americas
  'LOS ANGELES': '洛杉磯',
  'LONG BEACH': '長灘',
  SEATTLE: '西雅圖',
  TACOMA: '塔科馬',
  VANCOUVER: '溫哥華',
  'NEW YORK': '紐約',
  SAVANNAH: '薩凡納',
  HOUSTON: '休士頓',
  'NEW ORLEANS': '紐奧良',
  'SANTOS': '桑托斯',
  'BUENOS AIRES': '布宜諾斯艾利斯',
  VALPARAISO: '瓦爾帕萊索',

  // Europe
  ROTTERDAM: '鹿特丹',
  HAMBURG: '漢堡',
  ANTWERP: '安特衛普',
  FELIXSTOWE: '費利克斯托',
  SOUTHAMPTON: '南安普頓',
  BARCELONA: '巴塞隆納',
  VALENCIA: '瓦倫西亞',
  PIRAEUS: '比雷埃夫斯',
  GENOA: '熱那亞',
  MARSEILLE: '馬賽',
  'LE HAVRE': '勒哈弗爾',
  BREMERHAVEN: '不來梅港',
  GDANSK: '格但斯克',

  // Africa
  'DURBAN': '德班',
  'CAPE TOWN': '開普敦',
  MOMBASA: '蒙巴薩',
  DAR: '三蘭港',
  'DAR ES SALAAM': '三蘭港',
  LAGOS: '拉各斯',
  APAPA: '阿帕帕',
  DAKAR: '達卡',
  CASABLANCA: '卡薩布蘭卡',
  ALEXANDRIA: '亞歷山大',

  // Philippines
  CEBU: '宿霧',
  DAVAO: '達沃',
  BATANGAS: '八打雁',
  CAGAYAN: '卡加延',
  ILOILO: '伊洛伊洛',
};

/**
 * Translate a destination string to Chinese.
 * Returns the Chinese name if found in the map, otherwise returns the original value.
 * Matching is case-insensitive and trims whitespace.
 */
export function translateDestination(destination: string): string {
  if (!destination || destination === '—') return destination;
  const key = destination.trim().toUpperCase();
  return PORT_MAP[key] ?? destination;
}
