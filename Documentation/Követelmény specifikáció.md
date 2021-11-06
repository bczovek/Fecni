## Követelmény specifikáció

# Jelenlegi helyzet

A piacon nincs olyan alkalmazás, ami minden igényt egyszerre ki tudna elégíteni. 
Az alkalmazások nagy részéért fizetni kell, ha az összes funkcióját szeretnénk kihasználni. 
Az ingyenes verziók általában csak egy-egy területre fókuszálnak. Más appok pedig minél több 
dolgot zsúfolnak egybe, ami miatt átláthatatlan, nehezen érthető és tanulható lesz a kezelésük. 
Valamint ezek az alkalmazások nagyrészt csak okostelefonról érhetőek el.

# Vágyálomrendszer

Célunk egy olyan alkalmazás piacra dobása, aminek fejlesztése során maximálisan figyelembe vesszük 
a felhasználói élményt. Tehát egyszerű, letisztult felületének kezelése könnyen megtanulható és 
kényelmesen használható. A használata ugyanolyan élvezetes legyen egy fiatalabb és egy idősebb felhasználónak is.
Az alkalmazás szinte minden eszközről elérhető, legyen az Android vagy iOS rendszerű okostelefon, asztali PC vagy akár televízió.

# Jelenlegi üzleti folyamatok modellje
A jelenlegi bevásárló listákat vagy kézzel írják, vagy bonyolult alkalmazásokba veszik fel őket. 
Ezek között nincs semmilyen kapcsolat, átláthatatlan a rendszer.

Fizikai listák:
-	kézzel írott, amit sok esetben még az is nehezen olvas, aki írta
-	papír alapú, ami könnyen sérül, elhagyható és környezetszennyező

Digitális listák:
-	Drága, fizetős alkalmazások, reklámok
-	A különböző eszközökről nem lehet elérni ugyanazt a listát
-	Bonyolult felhasználó felület

# Igényelt üzleti folyamatok

-	Letisztult felület
-	Bármilyen eszközön elérhető
-	Több lista felvétele
-	Kategóriák beállításának lehetősége
-	Közeli boltok megjelenítése interaktív térképes nézetben
-	Listaelemek szerkesztésének lehetősége
-	Ingyenes hozzáférés
-	Felhasználó kezelés

# Követelmény lista

 |  ID |  Név  | Kifejtés |
|:-----:|:-----:|:---------:|
| K1  | Bevásárlólista | A felhasználó tudjon akár több bevásárlólistát létrehozni, törölni, módosítani.|
| K2 | Listaelem | Lehetőséget kell biztosítani a felhasználónak, hogy valamennyi elemet rögzíteni tudjon az adott bevásárlólistán. Ezeknek nevet, kategóriát tudjon beállítani, kihúzni |
| K3 | Térkép | Interaktív térképen megjeleníthető legyen egy adott bevásárlólista elemei hol kaphatók. Az üzletek kijelölése a listaelem kategória alapján történjen. |
| K4 | Térkép paraméterezése | A felhasználó beállíthatja milyen távolságra lévő boltokat keres. Továbbá nyitvatartás szerint szűrheti azokat. |
| K5 | Helymeghatározás | A térkép helymeghatározást csak a felhasználó beleegyezésével alkalmazhat. Ezeket az adatokat nem tárolhatja az alkalmazás. |
| K6 | Webböngésző támogatás | Az alkalmazásnak megfelelően kell működnie a legnépszerűbb modern webböngészőkben |
| K7 | Windows alkalmazás | A projektnek a webes felülettel megegyező Windows asztali alkalmazással kell rendelkeznie |
| K8 | Regisztráció, bejelentkezés | Az alkalmazáshoz regisztráció, bejelentkező felület implementálása |
| K9 | Vendég felhasználó | A regisztráció nélküli vendég felhasználók csak egy darab listát tudjanak készíteni |
| K10 | Megosztás | Felhasználók közötti megosztás lehetőségének implementálása |
| K11 | Közös csoportok | A felhasználók közös csoportokat tudnak létrehozni, így egy listát közösen szerkeszteni |
| K12 | Térkép opciók | A térkép paraméterezési lehetőségeinek bővítése |
| K13 | Adatbázis (NoSQL) | A listák adatbázisba mentése | 
| K14 | Adatbázis (MySQL) | A felhasználók és adataik adatbázissal történő kezelése |
