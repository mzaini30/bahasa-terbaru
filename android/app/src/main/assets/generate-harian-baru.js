const fs = require('fs');

const mufrodatData = [
  { nomor: 1, bahasa_indonesia: "Jangan makan pakai tangan kiri", bahasa_arab_putra: "لَا تَأْكُلْ بِيَدِكَ الْيُسْرَى", bahasa_arab_putri: "لَا تَأْكُلِي بِيَدِكِ الْيُسْرَى" },
  { nomor: 2, bahasa_indonesia: "Kamu jahat, tidak mau bantuin aku", bahasa_arab_putra: "أَنْتَ شِرِّيرٌ، لَا تُرِيدُ أَنْ تُسَاعِدَنِي", bahasa_arab_putri: "أَنْتِ شِرِّيرَةٌ، لَا تُرِيدِينَ أَنْ تُسَاعِدِينَنِي" },
  { nomor: 3, bahasa_indonesia: "Makan lah pakai piring", bahasa_arab_putra: "كُلْ فِي الصَّحْنِ", bahasa_arab_putri: "كُلِي فِي الصَّحْنِ" },
  { nomor: 4, bahasa_indonesia: "Kepalaku pusing bah", bahasa_arab_putra: "رَأْسِي يُؤْلِمُنِي", bahasa_arab_putri: "رَأْسِي يُؤْلِمُنِي" },
  { nomor: 5, bahasa_indonesia: "Cepetin bagi makanannya", bahasa_arab_putra: "أَسْرِعْ فِي تَوْزِيعِ الطَّعَامِ", bahasa_arab_putri: "أَسْرِعِي فِي تَوْزِيعِ الطَّعَامِ" },
  { nomor: 6, bahasa_indonesia: "Apa lauknya?", bahasa_arab_putra: "مَا الْإِدَامُ؟", bahasa_arab_putri: "مَا الْإِدَامُ؟" },
  { nomor: 7, bahasa_indonesia: "Cepetin sudah ada akhwatnya / ikhwannya", bahasa_arab_putra: "أَسْرِعْ، فَقَدْ جَاءَتِ الْأَخَوَاتُ", bahasa_arab_putri: "أَسْرِعِي، فَقَدْ جَاءَ الْإِخْوَانُ" },
  { nomor: 8, bahasa_indonesia: "Siapa yang piket sapu?", bahasa_arab_putra: "مَنْ حَارِسُ الْمَطْعَمِ؟", bahasa_arab_putri: "مَنْ حَارِسَةُ الْمَطْعَمِ؟" },
  { nomor: 9, bahasa_indonesia: "Hijabnya pindah situ", bahasa_arab_putra: "اُنْقُلِ الْحِجَابَ إِلَى هُنَاكَ", bahasa_arab_putri: "اُنْقُلِي الْحِجَابَ إِلَى هُنَاكِ" },
  { nomor: 10, bahasa_indonesia: "Ah, fresh meat", bahasa_arab_putra: "آهِ، لَحْمٌ طَازَجٌ", bahasa_arab_putri: "آهِ، لَحْمٌ طَازَجٌ" },
  { nomor: 11, bahasa_indonesia: "Kekurangan konsumsi", bahasa_arab_putra: "الطَّعَامُ نَاقِصٌ", bahasa_arab_putri: "الطَّعَامُ نَاقِصٌ" },
  { nomor: 12, bahasa_indonesia: "Jatahku mana?", bahasa_arab_putra: "أَيْنَ حِصَّتِي؟", bahasa_arab_putri: "أَيْنَ حِصَّتِي؟" },
  { nomor: 13, bahasa_indonesia: "Makan apa?", bahasa_arab_putra: "مَاذَا نَأْكُلُ؟", bahasa_arab_putri: "مَاذَا نَأْكُلُ؟" },
  { nomor: 14, bahasa_indonesia: "Ambil aja jatahku", bahasa_arab_putra: "خُذْ حِصَّتِي", bahasa_arab_putri: "خُذِي حِصَّتِي" },
  { nomor: 15, bahasa_indonesia: "Mana sendok nasi?", bahasa_arab_putra: "أَيْنَ مِلْعَقَةُ الْأَرُزِّ؟", bahasa_arab_putri: "أَيْنَ مِلْعَقَةُ الْأَرُزِّ؟" },
  { nomor: 16, bahasa_indonesia: "Kamu nggak makan?", bahasa_arab_putra: "أَلَا تَأْكُلُ؟", bahasa_arab_putri: "أَلَا تَأْكُلِينَ؟" },
  { nomor: 17, bahasa_indonesia: "Siapa yang ambil makan?", bahasa_arab_putra: "مَنْ أَخَذَ الطَّعَامَ؟", bahasa_arab_putri: "مَنْ أَخَذَ الطَّعَامَ؟" },
  { nomor: 18, bahasa_indonesia: "Makannya sudah datang", bahasa_arab_putra: "جَاءَ الطَّعَامُ", bahasa_arab_putri: "جَاءَ الطَّعَامُ" },
  { nomor: 19, bahasa_indonesia: "Siapa belum makan?", bahasa_arab_putra: "مَنْ لَمْ يَأْكُلْ؟", bahasa_arab_putri: "مَنْ لَمْ تَأْكُلْ؟" },
  { nomor: 20, bahasa_indonesia: "Makan di mana?", bahasa_arab_putra: "أَيْنَ نَأْكُلُ؟", bahasa_arab_putri: "أَيْنَ نَأْكُلُ؟" },
  { nomor: 21, bahasa_indonesia: "Tolong ambilkan ikan lele aku", bahasa_arab_putra: "مِنْ فَضْلِكَ خُذْ لِي سَمَكَ السِّلُّورِ", bahasa_arab_putri: "مِنْ فَضْلِكِ خُذِي لِي سَمَكَ السِّلُّورِ" },
  { nomor: 22, bahasa_indonesia: "Aku mau makan", bahasa_arab_putra: "أُرِيدُ أَنْ آكُلَ", bahasa_arab_putri: "أُرِيدُ أَنْ آكُلَ" },
  { nomor: 23, bahasa_indonesia: "Siapa yang mau makananku?", bahasa_arab_putra: "مَنْ يُرِيدُ طَعَامِي؟", bahasa_arab_putri: "مَنْ تُرِيدُ طَعَامِي؟" },
  { nomor: 24, bahasa_indonesia: "Lantainya licin", bahasa_arab_putra: "الْأَرْضُ زَلِقَةٌ", bahasa_arab_putri: "الْأَرْضُ زَلِقَةٌ" },
  { nomor: 25, bahasa_indonesia: "Ada sambal kah?", bahasa_arab_putra: "هَلْ تُوجَدُ شَطَّةٌ؟", bahasa_arab_putri: "هَلْ تُوجَدُ شَطَّةٌ؟" },
  { nomor: 26, bahasa_indonesia: "Enak betul", bahasa_arab_putra: "لَذِيذٌ جِدًّا", bahasa_arab_putri: "لَذِيذٌ جِدًّا" },
  { nomor: 27, bahasa_indonesia: "Makan kok masih hamburan", bahasa_arab_putra: "لِمَاذَا الطَّعَامُ مُتَنَاثِرٌ هَكَذَا؟", bahasa_arab_putri: "لِمَاذَا الطَّعَامُ مُتَنَاثِرٌ هَكَذَا؟" },
  { nomor: 28, bahasa_indonesia: "Tinggal makan berisik betul", bahasa_arab_putra: "الْأَكْلُ فَقَطْ وَمَعَ ذَلِكَ الضَّجِيجُ كَثِيرٌ", bahasa_arab_putri: "الْأَكْلُ فَقَطْ وَمَعَ ذَلِكَ الضَّجِيجُ كَثِيرٌ" },
  { nomor: 29, bahasa_indonesia: "Awas kepleset", bahasa_arab_putra: "اِنْتَبِهْ لَا تَنْزَلِقْ", bahasa_arab_putri: "اِنْتَبِهِي لَا تَنْزَلِقِي" },
  { nomor: 30, bahasa_indonesia: "Bagi yang rata", bahasa_arab_putra: "اِقْسِمْ بِالتَّسَاوِي", bahasa_arab_putri: "اِقْسِمِي بِالتَّسَاوِي" },
  { nomor: 31, bahasa_indonesia: "Lauknya basi", bahasa_arab_putra: "الْإِدَامُ فَاسِدٌ", bahasa_arab_putri: "الْإِدَامُ فَاسِدٌ" }
];

const harianBaru = {};

for (let day = 1; day <= 31; day++) {
  const mufrodatList = [];
  
  for (let i = 0; i < 5; i++) {
    const mufrodatIndex = ((day - 1) * 5 + i) % 31;
    const mufrodat = mufrodatData[mufrodatIndex];
    
    mufrodatList.push({
      nomor: mufrodat.nomor,
      mufrodat_putra: mufrodat.bahasa_arab_putra,
      mufrodat_putri: mufrodat.bahasa_arab_putri,
      terjemah: mufrodat.bahasa_indonesia
    });
  }
  
  harianBaru[day.toString()] = {
    tanggal: day,
    mufrodat: mufrodatList
  };
}

const output = { harian_baru: harianBaru };

fs.writeFileSync('harian-baru.json', JSON.stringify(output, null, 2));

console.log('harian-baru.json generated successfully!');
