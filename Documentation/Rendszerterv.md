# Rendszerterv

## A rendszer célja
A startup-unk célja egy olyan webalkalmazás elkészítése, melyben a felhasználónak lehetősége van létrehoznia a saját bevásárlólistáját. Erre a listára a felhasználó tetszőleges tételeket vihet fel, melyeknek a kategóriáját is megadhatja (pl. élelmiszer, tisztítószer stb.). Továbbá a felhasználónak lehetősége van *kihúzni* tételeket a listából, illetve *lezárni/törölni* egész listákat is. Az alkalmazás különlegessé az, hogy mindemellett a felhasználó egy térképen láthatja a közelében lévő boltokat, ahonnan az adott terméket megvásárolhatja, akár útvonalat is tervezhet hozzájuk. 

Az alkalmazás tervezésekor különös figyelmet szentelünk az igényes felhasználói felület megalkotására, a könnyű és intuitív használatra, valamint a praktikusságra.

## Projektterv
A projekt menedzselése Trello-n keresztül történik.
Csapattagok:
 - Czövek Bence
 - Duba Anita
 - Szabó Dániel József
 - Kalló György Dávid
 
## Követelmények
 |  ID |  Név  | Kifejtés |
|:-----:|:-----:|:---------:|
| K1  | Bevásárlólista | A felhasználó tudjon akár több bevásárlólistát létrehozni, törölni, módosítani.|
| K2 | Listaelem | Lehetőséget kell biztosítani a felhasználónak, hogy valamennyi elemet rögzíteni tudjon az adott bevásárlólistán. Ezeknek nevet, kategóriát tudjon beállítani, kihúzni |
| K3 | Perzisztencia | A bevásárlólisták a felhasználó igénye szerint menthető és bármikor visszatölthető legyen bármely eszközön. |
| K4 | Térkép | Interaktív térképen megjeleníthető legyen egy adott bevásárlólista elemei hol kaphatók. Az üzletek kijelölése a listaelem kategória alapján történjen. |
| K5 | Térkép paraméterezése | A felhasználó beállíthatja milyen távolságra lévő boltokat keres. Továbbá nyitvatartás és árkategória szerint szűrheti azokat. |
| K6 | Helymeghatározás | A térkép helymeghatározást csak a felhasználó beleegyezésével alkalmazhat. Ezeket az adatokat nem tárolhatja az alkalmazás. |
| K7 | Webböngésző támogatás | Az alkalmazásnak megfelelően kell működnie a legnépszerűbb modern webböngészőkben |

## Ütemterv
- 2021.09.06. - 2021.09.12. Elkezdeni és befejezni a Követelmény Specifikációt.
- 2021.09.13. - 2021.09.19. Elkezdeni a Funkcionális Specifikációt és a Rendszertervet. POC elkezdése, esetleges befejezése.
- 2021.09.20. - 2021.09.26. Befejezni a Rendszertervet és a Funkcionális Specifikációt, továbbá POC fejlesztése.
- 2021.09.27. - 2021.10.03. Google Maps API implementálás.

- 2021.10.04. - 2021.10.10. ~~TODO~~
...
- 2021.12.06. Projekt véglegesítése, befejezése.

## Funkcionális terv

**Rendszer szereplők:**
- *Felhasználó*
 - **Funckionális követelmények:**
	 - Képes új bevásárlólistát létrehozni
	 - Képes meglévő bevásárlólistát módosítani
	 - Képes bevásárlólistát lezárni/törölni
	 - Képes termékeket felvenni a listára, ezekhez kategóriát is tud rendelni
	 - Beépített térképen láthatóak a felhasználó földrajzi helyéhez legközelebb eső boltok
	 - A megjelenített boltok az áru kategóriájától függően frissülnek
	 - A felhasználó beállíthatja, hogy milyen távolságra jelenjenek meg boltok a térképen
	 - A felhasználó útitervet is készíthet a kiválasztott bolthoz
- **Nem funkcionális követelmények:**
	- Igényes UI
	- Firebase által kínált lehetőségek minél nagyobb kihasználása

## Fizikai környezet

 - Böngésző (webalkalmazás)
 - **Fejlesztői eszközök**:
	 - Visual Studio Code
	 - git
	 - Trello
	 - Firebase

## Technology Stack

- **Frontend**:
	- HTML
	- CSS
	- JavaScript
- **Backend**:
	- Firebase
