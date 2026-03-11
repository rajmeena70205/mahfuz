export interface TopicEntry {
  topic: string;
  topicEn: string;
  icon: string;
  refs: string[]; // "surah:verse" or "surah:start-end"
}

export const TOPIC_INDEX: TopicEntry[] = [
  {
    topic: "Tevhid (Allah'ın Birliği)",
    topicEn: "Tawhid (Oneness of God)",
    icon: "🌙",
    refs: ["112:1-4", "2:255", "59:22-24", "3:18", "6:102-103", "23:91", "21:22", "16:51", "42:11", "57:3"],
  },
  {
    topic: "Namaz",
    topicEn: "Prayer (Salah)",
    icon: "🕌",
    refs: ["2:43", "2:238", "4:103", "11:114", "17:78", "20:14", "29:45", "62:9-10", "73:20", "107:4-5"],
  },
  {
    topic: "Oruç",
    topicEn: "Fasting (Sawm)",
    icon: "🌅",
    refs: ["2:183", "2:184", "2:185", "2:186", "2:187"],
  },
  {
    topic: "Zekât ve Sadaka",
    topicEn: "Zakat & Charity",
    icon: "🤲",
    refs: ["2:43", "2:110", "2:267", "2:274", "9:60", "9:103", "57:18", "63:10", "64:16"],
  },
  {
    topic: "Hac ve Umre",
    topicEn: "Hajj & Umrah",
    icon: "🕋",
    refs: ["2:196", "2:197", "2:198-203", "3:97", "5:1-2", "22:26-29", "22:36-37"],
  },
  {
    topic: "Dua",
    topicEn: "Supplication (Dua)",
    icon: "💫",
    refs: ["2:186", "2:201", "3:8", "3:26-27", "7:55-56", "14:40-41", "25:74", "40:60", "46:15"],
  },
  {
    topic: "Tövbe ve Bağışlanma",
    topicEn: "Repentance & Forgiveness",
    icon: "🔄",
    refs: ["2:222", "3:135-136", "4:17-18", "4:110", "9:104", "11:3", "11:90", "25:70-71", "39:53", "66:8"],
  },
  {
    topic: "Sabır",
    topicEn: "Patience (Sabr)",
    icon: "⛰️",
    refs: ["2:45", "2:153", "2:155-157", "3:200", "8:46", "11:115", "16:127", "39:10", "103:3"],
  },
  {
    topic: "Tevekkül (Allah'a Güven)",
    topicEn: "Trust in God (Tawakkul)",
    icon: "🤝",
    refs: ["3:159", "5:11", "8:2", "9:51", "12:67", "14:12", "33:3", "65:3"],
  },
  {
    topic: "Şükür",
    topicEn: "Gratitude (Shukr)",
    icon: "🙏",
    refs: ["2:152", "2:172", "14:7", "16:114", "27:40", "31:12", "34:13", "54:35", "76:3"],
  },
  {
    topic: "Adalet",
    topicEn: "Justice",
    icon: "⚖️",
    refs: ["4:58", "4:135", "5:8", "5:42", "6:152", "16:90", "42:15", "49:9", "57:25"],
  },
  {
    topic: "Ahlâk ve Güzel Davranış",
    topicEn: "Morals & Good Conduct",
    icon: "🌿",
    refs: ["2:83", "3:134", "4:36", "16:90", "17:23-39", "25:63-76", "31:12-19", "33:70", "49:9-13"],
  },
  {
    topic: "Anne-Baba Hakkı",
    topicEn: "Rights of Parents",
    icon: "👨‍👩‍👧",
    refs: ["2:83", "4:36", "6:151", "17:23-24", "29:8", "31:14-15", "46:15-18"],
  },
  {
    topic: "Aile ve Evlilik",
    topicEn: "Family & Marriage",
    icon: "💍",
    refs: ["2:221", "2:228-237", "4:1", "4:3-4", "4:19-25", "4:34-35", "24:32", "30:21", "65:1-7"],
  },
  {
    topic: "İlim ve Hikmet",
    topicEn: "Knowledge & Wisdom",
    icon: "📖",
    refs: ["2:31-32", "2:269", "3:7", "4:162", "20:114", "35:28", "39:9", "58:11", "96:1-5"],
  },
  {
    topic: "Rızık ve Geçim",
    topicEn: "Sustenance & Provision",
    icon: "🌾",
    refs: ["2:212", "3:27", "11:6", "15:20-21", "17:30-31", "29:60", "42:12", "51:58", "65:3"],
  },
  {
    topic: "Cennet",
    topicEn: "Paradise (Jannah)",
    icon: "🌳",
    refs: ["2:25", "3:15", "3:133-136", "4:57", "9:72", "13:35", "47:15", "55:46-78", "56:10-40", "76:5-22"],
  },
  {
    topic: "Cehennem",
    topicEn: "Hellfire (Jahannam)",
    icon: "🔥",
    refs: ["2:24", "3:131", "4:56", "14:16-17", "22:19-22", "44:43-50", "56:41-56", "67:6-11", "74:26-31"],
  },
  {
    topic: "Kıyamet ve Ahiret",
    topicEn: "Day of Judgment & Hereafter",
    icon: "⏳",
    refs: ["2:4", "3:185", "6:32", "23:99-115", "75:1-40", "81:1-29", "82:1-19", "84:1-25", "99:1-8", "101:1-11"],
  },
  {
    topic: "Hz. Âdem",
    topicEn: "Prophet Adam",
    icon: "🌱",
    refs: ["2:30-39", "7:11-27", "15:26-44", "17:61-65", "18:50", "20:115-127", "38:71-85"],
  },
  {
    topic: "Hz. Nûh",
    topicEn: "Prophet Noah",
    icon: "🚢",
    refs: ["7:59-64", "10:71-73", "11:25-49", "23:23-30", "26:105-122", "29:14-15", "54:9-17", "71:1-28"],
  },
  {
    topic: "Hz. İbrahim",
    topicEn: "Prophet Abraham",
    icon: "⭐",
    refs: ["2:124-141", "2:258-260", "6:74-83", "14:35-41", "19:41-50", "21:51-73", "26:69-104", "37:83-113"],
  },
  {
    topic: "Hz. Mûsâ",
    topicEn: "Prophet Moses",
    icon: "📜",
    refs: ["2:49-73", "7:103-174", "10:75-93", "20:9-98", "26:10-68", "27:7-14", "28:1-46", "79:15-26"],
  },
  {
    topic: "Hz. Yûsuf",
    topicEn: "Prophet Joseph",
    icon: "🏛️",
    refs: ["12:1-111"],
  },
  {
    topic: "Hz. Dâvûd ve Süleyman",
    topicEn: "Prophets David & Solomon",
    icon: "👑",
    refs: ["2:251", "21:78-82", "27:15-44", "34:10-14", "38:17-26", "38:30-40"],
  },
  {
    topic: "Hz. Îsâ",
    topicEn: "Prophet Jesus",
    icon: "✨",
    refs: ["3:42-64", "4:157-159", "4:171-172", "5:110-120", "19:16-40", "43:57-65", "61:6", "61:14"],
  },
  {
    topic: "Hz. Muhammed ﷺ",
    topicEn: "Prophet Muhammad ﷺ",
    icon: "🕊️",
    refs: ["3:144", "9:128-129", "21:107", "33:21", "33:40", "33:45-46", "48:29", "68:4", "94:1-8"],
  },
  {
    topic: "Kur'an'ın Özellikleri",
    topicEn: "Qualities of the Quran",
    icon: "📗",
    refs: ["2:2", "2:185", "3:138", "10:57", "15:9", "16:89", "17:9", "17:88", "41:42", "56:77-80"],
  },
  {
    topic: "Cihad ve Savunma",
    topicEn: "Jihad & Defense",
    icon: "🛡️",
    refs: ["2:190-195", "2:216-218", "3:139-143", "4:74-76", "8:60", "9:38-41", "22:39-40", "47:4", "61:4"],
  },
  {
    topic: "İnfak (Harcama)",
    topicEn: "Spending (Infaq)",
    icon: "💰",
    refs: ["2:195", "2:261-274", "3:92", "9:34-35", "57:7", "57:10-11", "63:10", "64:16-17", "92:5-11"],
  },
  {
    topic: "Zikir ve Tesbih",
    topicEn: "Remembrance (Dhikr)",
    icon: "📿",
    refs: ["2:152", "3:41", "7:205", "13:28", "18:24", "33:41-42", "62:10", "73:8", "87:1"],
  },
];
