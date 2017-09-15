var gulp = require('gulp'),
ejs = require('gulp-ejs');

var cities = [
  { name: 'Bielawa', icon: 'bielawa', value: 0 },
  { name: 'Dzierżoniów', icon: 'dzierzoniow', value: 2 },
  { name: 'Jodłownik', icon: 'dzierzoniow-commune', value: 1 },
  { name: 'Piława Dolna', icon: 'dzierzoniow-commune', value: 8 },
  { name: 'Ostroszowice', icon: 'dzierzoniow-commune', value: 11 },
  { name: 'Dobrocin', icon: 'dzierzoniow-commune', value: 14 },
  { name: 'Roztocznik', icon: 'dzierzoniow-commune', value: 15 },
  { name: 'Pieszyce', icon: 'pieszyce', value: 3 },
  { name: 'Kamionki', icon: 'pieszyce', value: 4 },
  { name: 'Rościszów', icon: 'pieszyce', value: 5 },
  { name: 'Piskorzów', icon: 'pieszyce', value: 6 },
  { name: 'Bratoszów', icon: 'pieszyce', value: 7 },
  { name: 'Piława Górna', icon: 'pilawa-gorna', value: 9 },
  { name: 'Kośmin', icon: 'pilawa-gorna', value: 10 },
  { name: 'Rudnica', icon: 'placeholder', value: 12 },
  { name: 'Jemna', icon: 'placeholder', value: 13 },
  { name: 'Niemcza', icon: 'niemcza', value: 21 },
  { name: 'Gilów', icon: 'niemcza', value: 17 },
  { name: 'Kietlin', icon: 'niemcza', value: 19 },
  { name: 'Wilków Wielki', icon: 'niemcza', value: 20 },
  { name: 'Podlesie', icon: 'niemcza', value: 24 },
  { name: 'Ligota Mała', icon: 'niemcza', value: 25 },
  { name: 'Przerzeczyn Zdrój', icon: 'niemcza', value: 23 },
  { name: 'Nowa Wieś Niemczańska', icon: 'niemcza', value: 22 },
  { name: 'Gola Dzierżoniowska', icon: 'niemcza', value: 18 },
];

var stops = [
  [
    { name: 'Leśny Dworek', direction: 'Dzierżoniów', value: 1 },
    { name: 'Nowobielawska', direction: 'Dzierżoniów', value: 4 },
    { name: 'Nowobielawska II', direction: 'Bielawa', value: 2 },
    { name: 'Nowobielawska II', direction: 'Dzierżoniów', value: 3 },
    { name: 'Sowia', direction: 'Bielawa', value: 7 },
    { name: 'Sowia', direction: 'Dzierżoniów', value: 8 },
    { name: 'Waryńskiego', direction: 'Bielawa', value: 9 },
    { name: 'Waryńskiego', direction: 'Dzierżoniów', value: 10 },
    { name: 'Słowiańska', direction: 'Dzierżoniów', value: 11 },
    { name: 'Os. Białe', direction: 'Bielawa', value: 12 },
    { name: 'Sudety', direction: 'Dzierżoniów', value: 13 },
    { name: 'Kasztanowa', direction: 'Bielawa', value: 14 },
    { name: 'Pl. Kościelny', direction: 'Bielawa', value: 16 },
    { name: 'Pl. Kościelny', direction: 'Dzierżoniów', value: 17 },
    { name: 'Przodowników Pracy', direction: 'Bielawa', value: 18 },
    { name: 'Ostroszowicka', direction: 'Ostroszowice', value: 19 },
    { name: 'Ace Rico', direction: 'Ostroszowice', value: 20 },
    { name: 'Ace Rico', direction: 'Dzierżoniów', value: 21 },
    { name: 'Szewska', direction: 'Ostroszowice', value: 22 },
    { name: 'Szewska', direction: 'Dzierżoniów', value: 23 },
    { name: 'Józefówek', direction: 'Ostroszowice', value: 25 },
    { name: 'Józefówek', direction: 'Dzierżoniów', value: 26 },
    { name: 'Ludowa', direction: 'Bielawa', value: 27 },
    { name: 'Ludowa', direction: 'Dzierżoniów', value: 28 },
    { name: 'Bielbaw', direction: 'Bielawa', value: 29 },
    { name: 'Bielbaw', direction: 'Dzierżoniów', value: 30 },
    { name: 'Góra Parkowa', direction: 'Bielawa', value: 31 },
    { name: 'Góra Parkowa', direction: 'Dzierżoniów', value: 32 },
    { name: 'Sikorskiego', direction: 'Bielawa', value: 33 },
    { name: 'Sikorskiego', direction: 'Dzierżoniów', value: 34 },
    { name: 'Sikorskiego Rondo', direction: 'Bielawa', value: 35 },
    { name: 'Sikorskiego Rondo', direction: 'Dzierżoniów', value: 36 },
    { name: 'Berlinga I', direction: 'Bielawa', value: 37 },
    { name: 'Berlinga II', direction: 'Dzierżoniów', value: 38 },
    { name: 'Berlinga III', direction: 'Dzierżoniów', value: 39 },
    { name: 'Os. XXV-lecia', direction: 'Bielawa', value: 40 },
    { name: 'Parkowa', direction: 'Dzierżoniów', value: 41 },
    { name: 'Bata', direction: 'Bielawa', value: 42 },
    { name: 'Bata', direction: 'Dzierżoniów', value: 44 },
    { name: 'Łącznik 1 Maja', direction: 'Bielawa', value: 43 },
    { name: 'Łącznik 1 Maja', direction: 'Dzierżoniów', value: 45 },
    { name: 'Bieltex I', direction: 'Bielawa', value: 46 },
    { name: 'Bieltex II', direction: 'Dzierżoniów', value: 47 },
    { name: 'Gazownia', direction: 'Bielawa', value: 48 },
    { name: 'Gazownia', direction: 'Dzierżoniów', value: 49 },
    { name: 'Cmentarz', direction: 'Bielawa / DDZ', value: 51 },
    { name: 'Bohaterów Getta', direction: 'Bielawa', value: 56 },
    { name: 'Bohaterów Getta', direction: 'Pieszyce', value: 57 },
    { name: 'LOK', direction: 'Bielawa', value: 58 },
    { name: 'Hotel "Pod Wielką Sową"', direction: 'Bielawa', value: 59 },
    { name: 'Żeromskiego', direction: 'Bielawa', value: 60 },
    { name: 'L.O. (Pl. Wolności)', direction: 'Dzierżoniów', value: 61 },
    { name: 'Ogródki', direction: 'Bielawa', value: 62 },
    { name: 'Ogródki', direction: 'Pieszyce', value: 63 }


  ],
  [
    { name: 'Jodłownik', direction: 'Bielawa', value: 6 },
  ],
  [
    { name: 'MZK', direction: 'Bielawa', value: 66 },
    { name: 'MZK Zajezdnia', direction: 'Dzierżoniów', value: 65 },
    { name: 'MZK', direction: 'Dzierżoniów', value: 67 },
    { name: 'Batalionów Chł.', direction: 'Bielawa', value: 68 },
    { name: 'Batalionów Chł.', direction: 'Dzierżoniów', value: 69 },
    { name: 'Dworzec PKS', direction: 'Dzierżoniów', value: 70 },
    { name: 'Piłsudskiego', direction: 'Kamionki', value: 71 },
    { name: 'Piłsudskiego', direction: 'Bielawa', value: 72 },
    { name: 'Os. Jasne', direction: 'Niemcza / DDZ', value: 73 },
    { name: 'Os. Jasne', direction: 'Bielawa', value: 74 },
    { name: 'Lidl', direction: 'Bielawa / DDZ', value: 76 },
    { name: 'Bar Kaprys', direction: 'Bielawa / DDZ', value: 77 },
    { name: 'Diora', direction: 'Niemcza / DDZ', value: 78 },
    { name: 'Kościuszki', direction: 'Niemcza / DDZ', value: 79 },
    { name: 'Bielawa', direction: 'Bielawa', value: 80 },
    { name: 'Dworzec PKP', direction: 'Bielawa', value: 81 },
    { name: 'Dworzec PKP', direction: 'MZK', value: 82 },
    { name: 'Klińskiego', direction: 'Niemcza / DDZ', value: 83 },
    { name: 'Klińskiego', direction: 'Pieszyce / Niem', value: 140 },
    { name: 'Pieszyce-Dzierżoniów', direction: 'Pieszyce / DDZ', value: 84 },
    { name: 'DT. Ślązak', direction: 'Pieszyce', value: 85 },
    { name: 'Dworzec PKS', direction: 'Bielawa', value: 86 },
    { name: 'Dworzec PKS Kopernika', direction: 'Pieszyce', value: 87 },
    { name: 'Wrocławska', direction: 'Dzierżoniów', value: 88 },
    { name: 'Wrocławska', direction: 'Bielawa', value: 89 },
    { name: 'Cmentarz', direction: 'Bielawa / DDZ', value: 90 },
    { name: 'Korczaka', direction: 'Bielawa', value: 91 },
    { name: 'Korczaka', direction: 'Dzierżoniów', value: 92 },
    { name: 'Sikorskiego I', direction: 'Dzierżoniów', value: 93 },
    { name: 'Sikorskiego I', direction: 'Bielawa', value: 94 },
    { name: 'Sikorskiego II', direction: 'Dzierżoniów', value: 95 },
    { name: 'Sikorskiego II', direction: 'Bielawa', value: 96 },
    { name: 'Os. Błękitne', direction: 'Dzierżoniów', value: 97 },
    { name: 'Bielawska', direction: 'Bielawa', value: 101 },
    { name: 'Brzegowa', direction: 'Dzierżoniów', value: 102 },
    { name: 'Dzierżoniów Dolny', direction: 'Dzierżoniów', value: 107 },
    { name: 'Kasztanowa', direction: 'Dzierżoniów', value: 108 },
    { name: 'Nowowiejska', direction: 'Dzierżoniów', value: 109 },
    { name: 'Nowowiejska Szkoła', direction: 'Dzierżoniów', value: 112 },
    { name: 'Ogródki', direction: 'Niemcza', value: 113 },
    { name: 'Ogródki', direction: 'Dzierżoniów', value: 114 },
    { name: 'Os. Zielone', direction: 'Bielawa', value: 115 },
    { name: 'Os. Zielone II', direction: 'Dzierżoniów', value: 116 },
    { name: 'Staszica', direction: 'Dzierżoniów', value: 121 },
    { name: 'Strefa', direction: 'Dzierżoniów', value: 122 },
    { name: 'Strefa Metzeler', direction: 'Dzierżoniów', value: 123 },
    { name: 'Strefa Orion', direction: 'Dzierżoniów', value: 124 },
    { name: 'Świdnicka', direction: 'Dzierżoniów', value: 125 },
    { name: 'Technika Szpitalna', direction: 'Bielawa / DDZ', value: 126 },
    { name: 'Technika Szpitalna', direction: 'Bielawa', value: 127 },
    { name: 'ul. Strefowa', direction: 'Dzierżoniów', value: 128 },
    { name: 'Wojska Polskiego I', direction: 'Dzierżoniów', value: 130 },
    { name: 'Wojska Polskiego I', direction: 'Dzierżoniów', value: 131 },
    { name: 'Wojska Polskiego II', direction: 'Dzierżoniów', value: 141 },
    { name: 'Zajezdnia PKS', direction: 'Pieszyce', value: 133 },
    { name: 'Zajezdnia PKS', direction: 'Dzierżoniów', value: 134 },
    { name: 'Ząbkowicka', direction: 'Dzierżoniów', value: 135 },
    { name: 'Ząbkowicka', direction: 'Niemcza', value: 136 },
    { name: 'Złota II', direction: 'Dzierżoniów', value: 137 },
    { name: 'Złota III', direction: 'Bielawa', value: 138 },
    { name: 'Złota kotłownia', direction: 'Bielawa', value: 139 }
  ],
  [
    { name: 'Ogrodowa', direction: 'Pieszyce', value: 142 },
    { name: 'Ogrodowa', direction: 'Bielawa', value: 143 },
    { name: 'Urząd Miejski', direction: 'Pieszyce', value: 144 },
    { name: 'Urząd Miejski', direction: 'Bielawa / DDZ', value: 145 },
    { name: 'Urząd Miejski', direction: 'Rościszów', value: 167 },
    { name: 'Urząd Miejski', direction: 'Dzierżoniów', value: 168 },
    { name: 'Kino', direction: 'Pieszyce', value: 146 },
    { name: 'Kino', direction: 'Bielawa / DDZ', value: 147 },
    { name: 'IX Oddział', direction: 'Pieszyce', value: 148 },
    { name: 'IX Oddział', direction: 'Bielawa / DDZ', value: 149 },
    { name: 'Sklep', direction: 'Pieszyce', value: 150 },
    { name: 'Sklep', direction: 'Bielawa / DDZ', value: 151 },
    { name: 'VII Oddział', direction: 'Pieszyce', value: 152 },
    { name: 'VII Oddział', direction: 'Bielawa', value: 153 },
    { name: 'Mostek', direction: 'Kamionki', value: 154 },
    { name: 'Mostek', direction: 'Dzierżoniów', value: 155 },
    { name: 'Bielawa', direction: 'Pieszyce / DDZ', value: 163 },
    { name: 'Bielawa', direction: 'Dzierżoniów', value: 164 },
    { name: 'Sanatoryjna', direction: 'Rościszów', value: 165 },
    { name: 'Sanatoryjna', direction: 'Dzierżoniów', value: 166 },
    { name: 'Tkalnia', direction: 'Dzierżoniów', value: 182 },
    { name: 'Świdnicka', direction: 'Pieszyce / DDZ', value: 183 },
    { name: 'Świdnicka', direction: 'Dzierżoniów', value: 184 },
    { name: 'Szkoła', direction: 'Pieszyce / DDZ', value: 185 },
    { name: 'Kółko Rolnicze', direction: 'Pieszyce / DDZ', value: 186 },
    { name: 'Pieszyce Dolne', direction: 'Pieszyce', value: 187 },
    { name: 'Szkoła', direction: 'Pieszyce / DDZ', value: 188 },
    { name: 'Osiedle Górskie', direction: 'Dzierżoniów', value: 296 },
    { name: 'Osiedle Górskie', direction: 'Pieszyce', value: 297 }
  ],
  [
    { name: 'Kamionki Dolne', direction: 'Kamionki', value: 156 },
    { name: 'Kamionki Dolne', direction: 'Dzierżoniów', value: 157 },
    { name: 'Kamionki I', direction: 'Kamionki', value: 158 },
    { name: 'Kamionki I', direction: 'Dzierżoniów', value: 159 },
    { name: 'Kamionki II', direction: 'Kamionki', value: 160 },
    { name: 'Kamionki II', direction: 'Dzierżoniów', value: 161 },
    { name: 'Kamionki III', direction: 'Dzierżoniów', value: 162 }
  ],
  [
    { name: 'Rościszów I', direction: 'Rościszów', value: 169 },
    { name: 'Rościszów I', direction: 'Dzierżoniów', value: 170 },
    { name: 'Rościszów II', direction: 'Rościszów', value: 172 },
    { name: 'Rościszów II', direction: 'Dzierżoniów', value: 171 },
    { name: 'Rościszów III', direction: 'Rościszów', value: 174 },
    { name: 'Rościszów III', direction: 'Dzierżoniów', value: 173 },
    { name: 'Rościszów IV', direction: 'Dzierżoniów', value: 175 }
  ],
  [
    { name: 'Kolonia', direction: 'Bratoszów', value: 176 },
    { name: 'Piskorzów I', direction: 'Bratoszów', value: 177 },
    { name: 'Piskorzów II', direction: 'Bratoszów', value: 178 },
    { name: 'Piskorzów III', direction: 'Bratoszów', value: 179 }
  ],
  [
    { name: 'Bratoszów I', direction: 'Dzierżoniów', value: 180 },
    { name: 'Bratoszów II', direction: 'Bratoszów', value: 181 },
  ],
  [
    { name: 'POM', direction: 'Niemcza', value: 189 },
    { name: 'POM', direction: 'Dzierżoniów', value: 190 },
    { name: 'Piława Dolna I', direction: 'Niemcza', value: 191 },
    { name: 'Piława Dolna I', direction: 'Dzierżoniów', value: 192 },
    { name: 'Szkoła', direction: 'Niemcza', value: 193 },
    { name: 'Szkoła', direction: 'Dzierżoniów', value: 194 },
    { name: 'Remiza', direction: 'Niemcza', value: 195 },
    { name: 'Remiza', direction: 'Dzierżoniów', value: 196 },
    { name: 'B. Kościół', direction: 'Niemcza', value: 197 },
    { name: 'B. Kościół', direction: 'Dzierżoniów', value: 198 },
    { name: 'Cz. Kościół', direction: 'Niemcza', value: 199 },
    { name: 'Cz. Kościół', direction: 'Dzierżoniów', value: 200 }
  ],
  [
    { name: 'Staw', direction: 'Niemcza', value: 202 },
    { name: 'Staw', direction: 'Dzierżoniów', value: 203 },
    { name: 'Os. Młyńskie', direction: 'Niemcza', value: 204 },
    { name: 'Os. Młyńskie', direction: 'Dzierżoniów', value: 205 },
    { name: 'Żłobek', direction: 'Niemcza', value: 206 },
    { name: 'Żłobek', direction: 'Dzierżoniów', value: 207 },
    { name: '"BoBo"', direction: 'Niemcza', value: 208 },
    { name: '"BoBo"', direction: 'Dzierżoniów', value: 209 },
    { name: 'Kamieniołomy', direction: 'Niemcza', value: 210 },
    { name: 'Kamieniołomy', direction: 'Dzierżoniów', value: 211 },
    { name: 'Szkoła', direction: 'Niemcza', value: 212 },
    { name: 'Szkoła', direction: 'Dzierżoniów', value: 213 },
    { name: 'Dworzec PKP', direction: 'Niemcza', value: 214 },
    { name: 'Dworzec PKP', direction: 'Dzierżoniów', value: 215 },
    { name: 'Kopanica', direction: 'Dzierżoniów', value: 219 },
    { name: 'Zakłady', direction: 'Niemcza', value: 220 },
    { name: 'Zakłady', direction: 'Dzierżoniów', value: 221 },
  ],
  [
    { name: 'Kośmin I', direction: 'Kośmin', value: 216 },
    { name: 'Kośmin I', direction: 'Dzierżoniów', value: 217 },
    { name: 'Kośmin', direction: 'Dzierżoniów', value: 218 },
  ],
  [
    { name: 'Ostroszowice I', direction: 'Dzierżoniów', value: 223 },
    { name: 'Ostroszowice I', direction: 'Dzierżoniów', value: 224 },
    { name: 'Ostroszowice I', direction: 'Dzierżoniów', value: 235 },
    { name: 'Ostroszowice I bis', direction: 'Dzierżoniów', value: 236 },
    { name: 'Sklep', direction: 'Dzierżoniów', value: 225 },
    { name: 'Sklep', direction: 'Dzierżoniów', value: 226 },
    { name: 'Sklep', direction: 'Dzierżoniów', value: 237 },
    { name: 'Fabryka Mebli', direction: 'Dzierżoniów', value: 227 },
    { name: 'Poczta', direction: 'Dzierżoniów', value: 228 },
    { name: 'Poczta', direction: 'Dzierżoniów', value: 229 },
    { name: 'Zakład Stolarski', direction: 'Dzierżoniów', value: 230 },
    { name: 'Zakład Stolarski', direction: 'Dzierżoniów', value: 231 },
    { name: 'Ośrodek Zdrowia', direction: 'Dzierżoniów', value: 232 },
    { name: 'Ośrodek Zdrowia', direction: 'Dzierżoniów', value: 233 }
  ],
  [
    { name: 'Rudnica I', direction: 'Jemna', value: 238 },
    { name: 'Rudnica I', direction: 'Dzierżoniów', value: 239 },
    { name: 'Rudnica II', direction: 'Jemna', value: 240 },
    { name: 'Rudnica II', direction: 'Dzierżoniów', value: 241 },
    { name: 'Rudnica III', direction: 'Jemna', value: 242 },
    { name: 'Rudnica III', direction: 'Dzierżoniów', value: 243 },
  ],
  [
    { name: 'Jemna', direction: 'Dzierżoniów', value: 244 },
  ],
  [
    { name: 'Dobrocin I', direction: 'Dzierżoniów', value: 245 },
    { name: 'Dobrocin I', direction: 'Niemcza', value: 246 },
    { name: 'Dobrocin II', direction: 'Dzierżoniów', value: 249 },
    { name: 'Dobrocin II', direction: 'Niemcza', value: 250 },
    { name: 'Dobrocin Sklep', direction: 'Dzierżoniów', value: 247 },
    { name: 'Dobrocin Sklep', direction: 'Niemcza', value: 248 },
  ],
  [
    { name: 'Roztocznik I', direction: 'Dzierżoniów', value: 251 },
    { name: 'Roztocznik I', direction: 'Niemcza', value: 252 },
    { name: 'Wieś', direction: 'Dzierżoniów', value: 253 },
    { name: 'Wieś', direction: 'Niemcza', value: 254 },
    { name: 'Wieś II', direction: 'Dzierżoniów', value: 255 },
    { name: 'Skrzyżowanie', direction: 'Dzierżoniów', value: 257 },
    { name: 'Skrzyżowanie', direction: 'Niemcza', value: 258 },
  ],
  [
    { name: 'Byszów', direction: 'Dzierżoniów', value: 259 },
    { name: 'Byszów', direction: 'Niemcza', value: 260 },
  ],
  [
    { name: 'Gilów I', direction: 'Dzierżoniów', value: 261 },
    { name: 'Gilów I', direction: 'Niemcza', value: 262 },
    { name: 'Sklep', direction: 'Dzierżoniów', value: 263 },
    { name: 'Sklep', direction: 'Niemcza', value: 264 },
    { name: 'Skrzyżowanie', direction: 'Dzierżoniów', value: 265 },
    { name: 'Skrzyżowanie', direction: 'Niemcza', value: 266 },
    { name: 'Gilów II', direction: 'Dzierżoniów', value: 267 },
    { name: 'Gilów II', direction: 'Niemcza', value: 268 },
  ],
  [
    { name: 'Gola Dzierżoniowska', direction: 'Dzierżoniów', value: 271 },
    { name: 'Gola Dzierżoniowska', direction: 'Niemcza', value: 272 },
  ],
  [
    { name: 'Kietlin', direction: 'Dzierżoniów', value: 273 },
    { name: 'Kietlin', direction: 'Niemcza', value: 274 },
  ],
  [
    { name: 'Skrzyżowanie', direction: 'Dzierżoniów', value: 275 },
    { name: 'Sklep', direction: 'Kietlin', value: 277 },
  ],
  [
    { name: 'Os. Podmiejskie', direction: 'Niemcza', value: 278 },
    { name: 'Os. Podmiejskie', direction: 'Dzierżoniów', value: 279 },
    { name: 'Dworzec PKP', direction: 'Niemcza', value: 280 },
    { name: 'Dworzec PKP', direction: 'Dzierżoniów', value: 281 },
    { name: 'Słowackiego', direction: 'Niemcza', value: 282 },
    { name: 'Słowackiego', direction: 'Dzierżoniów', value: 283 },
    { name: 'Remiza', direction: 'Dzierżoniów', value: 284 }
  ],
  [
    { name: 'Nowa Wieś Niemczańska', direction: 'Dzierżoniów', value: 285 },
    { name: 'Nowa Wieś Niemczańska', direction: 'Niemcza', value: 286 },
  ],
  [
    { name: 'Przerzeczyn Zdrój', direction: 'Dzierżoniów', value: 287 },
    { name: 'Przerzeczyn Zdrój', direction: 'Niemcza', value: 288 },
    { name: 'Sklep', direction: 'Dzierżoniów', value: 289 },
  ],
  [
    { name: 'Podlesie I', direction: 'Niemcza / DDZ', value: 290 },
    { name: 'Podlesie I', direction: 'Niemcza', value: 291 },
    { name: 'Podlesie', direction: 'Niemcza / DDZ', value: 292 },
  ],
  [
    { name: 'Ligota Mała', direction: 'Dzierżoniów', value: 293 },
    { name: 'Ligota Mała', direction: 'Niemcza', value: 294 },
  ]
];

gulp.task('views', function() {
  return gulp.src('app/assets/views/pages/*.ejs')
    .pipe(ejs({ cities: cities, stops: stops }, {}, { ext:'.html' }))
    .on('error', function(err){
      console.log(err.toString());
    })
    .pipe(gulp.dest('./app'));
});