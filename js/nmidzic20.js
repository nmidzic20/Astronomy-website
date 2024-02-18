var kolacic = document.cookie.split(";");
var kljucKolacic = "korime";
var postojiKolacic = false;

for (i = 0; i < kolacic.length; i++) {
  if (kolacic[i].includes(kljucKolacic)) {
    postojiKolacic = true;
    console.log("kolacic true");
  }
}
var lokacija = location.toString();
if (!postojiKolacic && !lokacija.includes("prijava")) {
  obrisiKolacice();
  console.log("uslo");
  //location = "./prijava.html";
  if (
    lokacija.includes("kreativna") ||
    lokacija.includes("o_autoru") ||
    lokacija.includes("multimedija") ||
    lokacija.includes("popis")
  ) {
    location = "../prijava.html";
  } else {
    location = "./prijava.html";
  }
} else {
  document.addEventListener("DOMContentLoaded", function () {
    if (document.URL.indexOf("?") > -1) {
      htmlDokument = document.URL.substring(
        document.URL.lastIndexOf("/") + 1,
        document.URL.indexOf("?")
      );
    } else {
      htmlDokument = document.URL.substring(document.URL.lastIndexOf("/") + 1);
    }
    console.log(htmlDokument);

    for (i = 0; i < kolacic.length; i++) {
      if (
        kolacic[i].includes("boja") ||
        kolacic[i].includes("fontsize") ||
        kolacic[i].includes("logoVerzija") ||
        kolacic[i].includes("bojatekst") ||
        kolacic[i].includes("visina")
      ) {
        let k = kolacic[i].split("=")[1];
        console.log(k);

        document.body.style.backgroundImage = "none"; //obavezno none, s "" i dalje će nadjačavati boju
        if (k == "plava") {
          document.body.style.backgroundColor = "rgb(16, 38, 109)";
        } else if (k == "ljubicasta") {
          document.body.style.backgroundColor = "rgb(81, 14, 119)";
        }

        if (
          htmlDokument != "prijava.html" &&
          htmlDokument != "dizajn.html" &&
          htmlDokument != "pregled.html"
        ) {
          if (k == "300px")
            document.getElementById("verzijaLoga").style.height = "300px";
          else if (k == "150px") {
            if (htmlDokument == "kreativna.html") {
              document.getElementById("verzijaLoga").className = "";
            }
            document.getElementById("verzijaLoga").style.height = "150px";
          }
        }

        if (k == "mali") document.body.style.fontSize = "12px";
        else if (k == "veliki") document.body.style.fontSize = "20px";
        else if (k == "standardni") document.body.style.fontSize = "16px";

        if (k == "v1") {
          if (
            lokacija.includes("kreativna") ||
            lokacija.includes("o_autoru") ||
            lokacija.includes("multimedija") ||
            lokacija.includes("popis")
          )
            document.getElementById("verzijaLoga").src =
              "../materijali/logo.jpg";
          else if (
            htmlDokument != "prijava.html" &&
            htmlDokument != "dizajn.html" &&
            htmlDokument != "pregled.html"
          )
            document.getElementById("verzijaLoga").src =
              "./materijali/logo.jpg";
        } else if (k == "v2") {
          if (
            lokacija.includes("kreativna") ||
            lokacija.includes("o_autoru") ||
            lokacija.includes("multimedija") ||
            lokacija.includes("popis")
          )
            document.getElementById("verzijaLoga").src =
              "../materijali/orion.jpg";
          else if (
            htmlDokument != "prijava.html" &&
            htmlDokument != "dizajn.html" &&
            htmlDokument != "pregled.html"
          )
            document.getElementById("verzijaLoga").src =
              "./materijali/orion.jpg";
        }

        if (k == "bijela") document.body.style.color = "rgb(233, 225, 225)";
        else if (k == "siva") document.body.style.color = "rgb(125, 123, 122)";
      }
    }

    if (
      htmlDokument != "prijava.html" &&
      htmlDokument != "dizajn.html" &&
      htmlDokument != "pregled.html"
    ) {
      otvoriPoveznicu(); //skočni prozori kad se napušta stranica

      nazivLinkaPrijavaOdjava(); //postavlja se naziv linka Prijava odnosno Odjava
      prijavaOdjavaPrekoLinka(); //prijava/odjava linkom

      if (postojiKolacic) ispisKolacica();
      otvoriProzorDizajn();
    }

    if (htmlDokument == "index.html") {
      pozicijaMisa();
      animPovecajSmanji();
      statistika();
    }
    if (htmlDokument == "obrazac.html") {
      provjeraObrasca();
    }
    if (htmlDokument == "kreativna.html") {
      animPoZelji();
    }
    if (lokacija.includes("multimedija")) {
      animRotiraj();
    }
    if (htmlDokument == "prijava.html") {
      prijavaPrekoForme();
    }
    if (htmlDokument == "dizajn.html") {
      console.log("Ovo je dizajn");
      promijeniDizajn();
      console.log(document.cookie.split(";")[0].split("=")[1]);
    }
    //poslije implementirati racunanje koordinata za mapu t.d. bude responzivna
    //https://stackoverflow.com/questions/32870568/how-to-recalculate-x-y-coordinates-based-on-screensize
    //za sad koordinate funkcioniraju samo na desktopu
  });
}

function otvoriPoveznicu() {
  navigacija = document.getElementsByTagName("nav");
  if (
    navigacija[0] != undefined &&
    navigacija[0] != null &&
    htmlDokument != "kreativna.html"
  ) {
    listaPoveznica = navigacija[0].children[0].children;
    poveznica = [];
    for (i = 0; i < listaPoveznica.length; i++)
      poveznica.push(listaPoveznica[i].children[0]);
    for (i = 0; i < poveznica.length; i++) {
      dodajSlusac(i);
    }
  }
}

function dodajSlusac(i) {
  poveznica[i].addEventListener("click", function (event) {
    event.preventDefault();
    skocni =
      "<dialog open id='dijaloski'><p id='tekstProzora'>Sigurno želite napustiti stranicu?</p><button id='ok'>OK</button><button id='cancel'>Cancel</button></dialog>";
    div = document.getElementById("skocni");
    div.innerHTML = skocni;
    skocni = document.getElementById("dijaloski");
    skocni.style = "position: fixed; z-index: 10";
    var tekst = document.getElementById("tekstProzora");
    btnOK = document.getElementById("ok");
    btnCancel = document.getElementById("cancel");
    btnOK.addEventListener("click", function () {
      location = poveznica[i].href;
    });
    btnCancel.addEventListener("click", function () {
      tekst.innerHTML = "Ostajete na stranici: " + document.title;
      btnOK.style.display = "none";
      btnCancel.style.display = "none";
      setTimeout(zatvori, 1800);
    });
  });
}

function zatvori() {
  div.innerHTML = "";
}

function pozicijaMisa() {
  podrucjeIspisa = document.getElementById("oblik-koordinate");
  slika = document.getElementById("slika-mapa");
  slika.addEventListener("mouseover", function (event) {
    mapa = document.getElementById("moja_mapa").areas;
    for (i = 0; i < mapa.length; i++) {
      dodajSlusacArea(i);
    }
  });
}

function dodajSlusacArea(i) {
  mapa[i].addEventListener("mouseover", function () {
    koordinate = mapa[i].coords.split(",");
    ispis = mapa[i].alt + ": ";
    if (mapa[i].shape == "circle") offset = 2;
    else offset = 1;
    k = 0;
    for (j = 0; j < koordinate.length - offset; ) {
      ispis += "X<sub>" + (k + 1) + "</sub>=" + koordinate[j];
      ispis += ", ";
      ispis += "Y<sub>" + (k + 1) + "</sub>=" + koordinate[j + 1];
      if (j != koordinate.length - 2) ispis += ", ";
      else ispis += " ";

      if (mapa[i].shape == "circle") {
        j++;
      } else {
        j = j + 2;
      }
      k++;
    }
    if (mapa[i].shape == "circle") {
      ispis += "R=" + koordinate[2];
    }
    podrucjeIspisa.innerHTML = ispis;
  });
}

//3.zadaca 7a)
function provjeraTextInputa() {
  var inputText = document.getElementById("Korisnicko_ime");
  if (inputText.type != "text") {
    inputText.type = "text";
  }
}

//3.zadaca 7b)
function provjeraURL() {
  var greskaURL = false;
  var inputURL = document.getElementById("URL").value;
  if (inputURL.includes("?")) {
    var parametri = inputURL.split("?")[1];
    var parametriJSON = [];
    for (let p of parametri.split("&")) {
      let naziv = p.split("=")[0];
      let vrijednost = p.split("=")[1];
      let obj = {};
      obj[naziv] = vrijednost;
      parametriJSON.push(obj);
    }
    var tekst = "";

    for (let obj of parametriJSON) {
      Object.keys(obj).forEach(function (kljuc) {
        let x = kljuc;
        let y = obj[kljuc];
        tekst +=
          "GET parameter " +
          x +
          " i vrijednost " +
          y +
          " nije dozvoljen na ovoj stranici\n";
      });
    }

    alert(tekst);
    greskaURL = true;
  }
  return greskaURL;
}

//3.zadaca regex
function provjeraRegex() {
  var inputNumber = document.getElementById("Dob");
  var reNumber = /^(\d{1,2}|100)$/;
  if (inputNumber.value && !reNumber.test(inputNumber.value)) {
    greska.push(inputNumber.id);
    console.log("regNumber");
  }

  var inputDate = document.getElementById("Termin");
  var reDate = /^[0-3]\d\.[0,1]\d\.\d{4}\. [0-2]\d:[0-5]\d:[0-5]\d$/;
  if (inputDate.value && !reDate.test(inputDate.value)) {
    greska.push(inputDate.id);
    console.log("regDate");
  }

  var inputTextarea = document.getElementById("Motivacija");
  var reTextarea = /^(?!.*\.\.)[^"'<>]{100,1000}$/;
  if (inputTextarea.value && !reTextarea.test(inputTextarea.value)) {
    greska.push(inputTextarea.id);
    console.log("regTextarea");
  }
}

function provjeraObrasca() {
  obrazac = document.getElementById("obrazac");
  cjeline = document.getElementsByTagName("fieldset");
  cjeline[1].style = "display: none";
  cjeline[2].style = "display: none";
  trenutnaCjelina = 0;
  obrazac.addEventListener("submit", function (event) {
    greska = [];

    provjeraTextInputa();
    var greskaURL = provjeraURL();
    provjeraRegex();

    labele = document.getElementsByClassName("labela");
    polja = document.getElementsByClassName("input");
    brSelected = 0;
    brChecked = 0;
    radioOdabir = false;
    //kod svakog novog klika na submit i svake nove provjere grešaka,
    //ukloni zaostatke starih provjera grešaka
    for (l of labele)
      if (l.innerHTML.indexOf("*") > -1) {
        l.innerHTML = l.innerHTML.slice(0, -1);
        if (l.id != null && (l.id == "checkboxPolje" || l.id == "radiobutton"))
          l.style.color = "";
        else document.getElementById(l.htmlFor).style.border = "";
      }

    for (i = 0; i < polja.length; i++) {
      //ako polja nisu validna prema provjerama iz html-a: pattern, size itd.
      //stavi to kao gresku i tretiraj na isti nacin dodavanjem zvjezdice i crvenog obruba
      //za textarea se ne moze provjeriti validnost na ovaj nacin, a zbog 3.dz 7a)
      //ne zelim provjeravati za ovaj specifican input Korisnicko_ime ako mu je promijenjen type
      //jer onda nece provjeriti za validan type (text) nego za taj tip koji je korisnik promijenio u Inspectoru
      if (
        polja[i].tagName != "TEXTAREA" &&
        !(polja[i].id == "Korisnicko_ime" && polja[i].type != "text") &&
        !polja[i].reportValidity()
      ) {
        greska.push(polja[i].id);
      }
      //provjeravaj specificna polja samo ako se prikazuju njihove cjeline,
      //inace nema potrebe
      if (
        cjeline[0].style.display != "none" &&
        polja[i].parentElement.name == cjeline[0].name
      ) {
        if (polja[i].type == "radio") {
          if (polja[i].checked) radioOdabir = true;
        } else if (polja[i].value == "") {
          greska.push(polja[i].id);
        }
      }
      if (
        cjeline[1].style.display != "none" &&
        polja[i].parentElement.name == cjeline[1].name
      ) {
        if ((polja[i].tagName = "TEXTAREA" && polja[i].value == "")) {
          greska.push(polja[i].id);
        }
        if (
          polja[i].type == "number" &&
          (polja[i].value < 0 || polja[i].value > 100)
        ) {
          greska.push(polja[i].id);
        }
        if (
          polja[i].tagName == "SELECT" &&
          polja[i].selectedOptions.length < 2
        ) {
          greska.push(document.getElementById("teme").id);
        }
        if (polja[i].type == "datetime-local" && polja[i].value == "") {
          greska.push(polja[i].id);
        }
      }
      if (
        cjeline[2].style.display != "none" &&
        polja[i].parentElement.name == cjeline[2].name
      ) {
        if (polja[i].type == "checkbox" && polja[i].checked) {
          brChecked++;
        }
      }
    }
    if (cjeline[0].style.display != "none")
      if (!radioOdabir)
        greska.push(document.getElementById("radiobutton").innerHTML);

    if (cjeline[2].style.display != "none")
      if (brChecked < 2)
        greska.push(document.getElementById("checkboxPolje").innerHTML);

    for (l of labele) {
      for (g of greska) {
        if (l.htmlFor == g && l.innerHTML.indexOf("*") == -1) {
          l.innerHTML += "*";
          document.getElementById(l.htmlFor).style.border = "3px solid crimson";
        } else if (l.innerHTML == g && l.innerHTML.indexOf("*") == -1) {
          l.innerHTML += "*";
          if (
            l.id != null &&
            (l.id == "checkboxPolje" || l.id == "radiobutton")
          )
            l.style.color = "crimson";
        }
      }
    }

    /*ako ima greski ILI ako nije treci fieldset (ILI dodatno za 3.dz 7b, ako URL ima get parametre), 
            sprijeci slanje
        ako nema greski I ako nije zadnji fieldset, (I ako nema get param u URL-u) 
            prikazi iduci fieldset
        ako nije nista iznad, znaci da nema greski I zadnji je fieldset, pa 
            pusti da se izvrši submit*/
    if (greska.length != 0 || cjeline[2].style.display == "none" || greskaURL)
      event.preventDefault();
    if (greska.length == 0 && cjeline[2].style.display == "none" && !greskaURL)
      cjeline[++trenutnaCjelina].style.display = "";
  });
}

//JS animacije

function animPovecajSmanji() {
  var prijavaLink = document.getElementById("PrijavaOdjava");
  console.log(prijavaLink);
  var anim1 = document.getElementById("anim1");
  var disableClick = false; //da se onemoguci ponovno klikanje dok se animacija odvija
  anim1.addEventListener("click", function (event) {
    event.preventDefault();
    if (disableClick) return;
    let interval = null;
    let fontVelicina = 12;
    smanji = false;
    clearInterval(interval);
    interval = setInterval(frame, 20);

    disableClick = true;
    setTimeout(() => {
      disableClick = false;
    }, 1000); //1 sek do ponovnog omogucavanja utjecaja klika

    function frame() {
      if (smanji) {
        fontVelicina--;
        if (fontVelicina <= 12) clearInterval(interval);
      } else {
        fontVelicina++;
        if (fontVelicina > 30) smanji = true;
      }
      prijavaLink.style.fontSize = fontVelicina + "px";
    }
  });
}

function animRotiraj() {
  var slikeRot = document.getElementsByClassName("ispis");
  slikaRot = [];
  for (s of slikeRot) {
    slikaRot.push(s);
  }
  trenutnaRot = 0;
  for (i = 0; i < slikaRot.length; i++) {
    dodajSlusacRot(i);
  }
}

function dodajSlusacRot(i) {
  slikaRot[i].addEventListener("click", function (event) {
    //Math.floor(Math.random() * 2) vraća 0 ili 1, 50% šanse za poz ili neg rotaciju
    smjer = Math.floor(Math.random() * 2) ? 1 : -1;
    trenutnaRot += 90 * smjer;
    //ovi width i height nemaju veze s rotacijom ali potrebno dodati da bi slika zadržala isti transition za povećavanje slike definirano u CSS-u kod hover
    //tj da ovdje ne prebrišem za transition ono što je već definirano u CSS-u
    slikaRot[i].style.transition = "transform 1.5s, width 0.4s, height 0.4s";
    slikaRot[i].style.transform = "rotate(" + trenutnaRot + "deg)";
  });
}

function animPoZelji() {
  var promatrac = new IntersectionObserver(
    function (entries) {
      if (entries[0].isIntersecting === true) vidljiv = true;
      else vidljiv = false;
    },
    { threshold: [0] }
  );

  promatrac.observe(document.querySelector("#scrollKont"));

  setInterval(() => {
    if (vidljiv) {
      //jer ce bez important pravila bit overrideano od important pravila za display iz ukljucenog bootstrapa
      slikaScroll.style.setProperty("display", "block", "important");
      slikaScroll.style.animationName = "JSanimacija";
      slikaScroll.style.animationDuration = "1s";
      slikaScroll.style.animationIterationCount = "1";
    } else {
      slikaScroll.style.setProperty("display", "none", "important");
      slikaScroll.style.animationName = "";
      slikaScroll.style.animationDuration = "";
      slikaScroll.style.animationIterationCount = "";
    }
  }, 500);
}

//Kolačići

function kreirajKolacicePrijava() {
  vrijemeTrajanja = 600000;
  datumDanas = Date.now();
  istice = new Date(datumDanas + vrijemeTrajanja);
  let korime = document.getElementById("korime").value;
  let lozinka = document.getElementById("lozinka").value;
  document.cookie =
    "korime=" + korime + ";expires=" + istice + ";SameSite=Lax;path=/";
  document.cookie =
    "lozinka=" + lozinka + ";expires=" + istice + ";SameSite=Lax;path=/";
  document.cookie =
    "vrijeme=" +
    vrijemeTrajanja / 1000 +
    ";expires=" +
    istice +
    ";SameSite=Lax;path=/";
  document.cookie =
    "datumIsteka=" + istice + ";expires=" + istice + ";SameSite=Lax;path=/";
}

function ispisKolacica() {
  var mjestoIspisa = document.getElementById("ispisKolacica");
  mjestoIspisa.innerHTML =
    "<p>Korisničko ime: " +
    document.cookie.split(";")[0].split("=")[1] +
    "</p>" +
    "<p>Datum i vrijeme do kad vrijedi kolačić: " +
    document.cookie.split(";")[3].split("=")[1] +
    "</p>";
}

function obrisiKolacice() {
  document.cookie = "korime=; expires=" + new Date(0) + ";path=/";
  document.cookie = "lozinka=; expires=" + new Date(0) + ";path=/";
  document.cookie = "vrijeme=; expires=" + new Date(0) + ";path=/";
  document.cookie = "datumIsteka=; expires=" + new Date(0) + ";path=/";
  document.cookie = "boja=; expires=" + new Date(0) + ";path=/";
  document.cookie = "fontsize=; expires=" + new Date(0) + ";path=/";
  document.cookie = "visina=; expires=" + new Date(0) + ";path=/";
  document.cookie = "logoVerzija=; expires=" + new Date(0) + ";path=/";
  document.cookie = "bojatekst=; expires=" + new Date(0) + ";path=/";
  console.log(document.cookie);

  console.log("Obrisani");
}

//prijava/odjava

function prijavaPrekoForme() {
  var forma = document.getElementById("prijava");
  var gumbPrijava = document.getElementById("ovoJeGumb");
  gumbPrijava.addEventListener("click", function () {
    kreirajKolacicePrijava();
  });
}

function nazivLinkaPrijavaOdjava() {
  var prijavaOdjava = document.getElementById("PrijavaOdjava");
  if (prijavaOdjava) {
    if (postojiKolacic) prijavaOdjava.innerHTML = "Odjava";
    else prijavaOdjava.innerHTML = "Prijava";
  }
}

function prijavaOdjavaPrekoLinka() {
  var prijavaOdjava = document.getElementById("PrijavaOdjava");

  prijavaOdjava.addEventListener("click", function (event) {
    event.preventDefault();
    /*stara verzija gdje se ostaje na stranici i link se mijenja u Prijava, pa se tek na pokušaju odlaska na drugu stranicu baca na prijavu
        if (prijavaOdjava.innerHTML == "Prijava") {
            location = "./prijava.html";
            console.log("prijava");
        }
        else if (prijavaOdjava.innerHTML == "Odjava") {
            prijavaOdjava.innerHTML = "Prijava";
            obrisiKolacice();
            postojiKolacic = false;
            document.getElementById("korisnickiDizajn").style.display = "none";
            console.log("odjava");
        }*/
    obrisiKolacice();
    if (
      lokacija.includes("kreativna") ||
      lokacija.includes("o_autoru") ||
      lokacija.includes("multimedija") ||
      lokacija.includes("popis")
    )
      location = "../prijava.html";
    else location = "./prijava.html";
  });
}

//dizajn korisnika

function otvoriProzorDizajn() {
  var gumbDizajn = document.getElementById("korisnickiDizajn");
  //gumbDizajn.style.display = "";
  var prozor = null;

  gumbDizajn.addEventListener("click", function () {
    if (prozor == null) {
      if (
        lokacija.includes("kreativna") ||
        lokacija.includes("o_autoru") ||
        lokacija.includes("multimedija") ||
        lokacija.includes("popis")
      ) {
        prozor = window.open(
          "../ostalo/dizajn.html",
          "Korisnički dizajn",
          "width=400, height=400"
        );
      } else
        prozor = window.open(
          "./ostalo/dizajn.html",
          "Korisnički dizajn",
          "width=400, height=400"
        );
    }
  });
}

//zovemo iz dizajn.html!
function promijeniDizajn() {
  dizajnGumb = document.getElementById("promijeniDiz");
  console.log(dizajnGumb);
  dizajnGumb.addEventListener("click", function (event) {
    //napravicookie i kod ucitavanja stranice promijeni iz cookiea
    event.preventDefault();
    var boja = document.getElementById("boja").selectedOptions[0].value;
    var fontsize = document.getElementById("fontsize").selectedOptions[0].value;
    var visina = document.getElementById("visina").selectedOptions[0].value;
    var logoVerzija =
      document.getElementById("logoVerzija").selectedOptions[0].value;
    var bojatekst =
      document.getElementById("bojatekst").selectedOptions[0].value;
    console.log("hi");
    let istek = document.cookie.split(";")[3].split("=")[1];
    document.cookie =
      "boja=" + boja + ";expires=" + istek + ";SameSite=Lax;path=/";
    document.cookie =
      "fontsize=" + fontsize + ";expires=" + istek + ";SameSite=Lax;path=/";
    document.cookie =
      "visina=" + visina + ";expires=" + istek + ";SameSite=Lax;path=/";
    document.cookie =
      "logoVerzija=" +
      logoVerzija +
      ";expires=" +
      istek +
      ";SameSite=Lax;path=/";
    document.cookie =
      "bojatekst=" + bojatekst + ";expires=" + istek + ";SameSite=Lax;path=/";
    prozor = null;
    window.close();
  });
}

//grafički prikaz statistike u canvasu na početnoj

function statistika() {
  //prvo izvaditi iz templatea
  templ = document.getElementById("template");
  child = template.content.cloneNode(true);
  canv = document.getElementById("canvas");
  canv.appendChild(child);
  canvas = canv.children[0];

  sirina = canvas.width;
  visina = canvas.height;
  kontekst = canvas.getContext("2d");

  //kreira objekte koji se prikazuju na grafu
  objekt1 = {
    ime: "Planeti",
    kolicina: 10,
    x1: 50,
    y1: 0,
    sirinaObjekta: 50,
    visinaObjekta: canvas.height,
    bojaObjekta: "green",
  };
  objekt2 = {
    ime: "Zvijezde",
    kolicina: 10,
    x1: 150,
    y1: 0,
    sirinaObjekta: 50,
    visinaObjekta: canvas.height,
    bojaObjekta: "red",
  };
  poljeObjekata = [objekt1, objekt2];

  stvoriGraf();

  prikaziFormu = document.getElementById("prikaziFormu");
  grafForma = document.getElementById("grafForma");
  grafGumb = document.getElementById("grafGumb");

  prikaziFormu.addEventListener("click", function () {
    if (grafForma.style.display == "none") {
      grafForma.style.display = "";
      prikaziFormu.value = "Sakrij formu";
    } else {
      grafForma.style.display = "none";
      prikaziFormu.value = "Prikaži formu";
    }
  });

  grafGumb.addEventListener("click", function (event) {
    event.preventDefault();
    kolicinaGraf = document.getElementById("kolicinaGraf").value;
    objektGrafa =
      document.getElementById("objektGrafa").selectedOptions[0].value;
    if (kolicinaGraf >= 0 && kolicinaGraf <= 20) {
      var odabraniObjekt = null;
      for (o of poljeObjekata) {
        console.log(o, o.ime, objektGrafa);
        if (o.ime == objektGrafa) {
          odabraniObjekt = o;
          break;
        }
      }

      odabraniObjekt.kolicina = kolicinaGraf;
      console.log(odabraniObjekt.kolicina, objekt2.kolicina);
      stvoriGraf();
      grafForma.style.display = "none";
      prikaziFormu.value = "Prikaži formu";
    }
  });
}

function stvoriGraf() {
  kontekst.clearRect(0, 0, canvas.width, canvas.height);

  //za svaki unos korisnika izracunaj kolicinu tj. visinu stupaca
  objekt1.y1 = canvas.height - 10 * objekt1.kolicina;
  objekt2.y1 = canvas.height - 10 * objekt2.kolicina;

  //koord. osi
  nacrtajLiniju(0, canvas.height, canvas.width, canvas.height);
  nacrtajLiniju(0, canvas.height, 0, 0);

  //nacrtaj oba objekta
  kontekst.fillStyle = objekt1.bojaObjekta;
  kontekst.fillRect(
    objekt1.x1,
    objekt1.y1,
    objekt1.sirinaObjekta,
    objekt1.visinaObjekta
  );
  kontekst.fillStyle = objekt2.bojaObjekta;
  kontekst.fillRect(
    objekt2.x1,
    objekt2.y1,
    objekt2.sirinaObjekta,
    objekt2.visinaObjekta
  );
}

function nacrtajLiniju(m1, m2, l1, l2) {
  kontekst.lineWidth = 5;
  kontekst.moveTo(m1, m2);
  kontekst.lineTo(l1, l2);
  kontekst.stroke();
}
