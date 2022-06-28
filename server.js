const fs = require("fs");
const express = require('/home/lintu/node_modules/express'); 
const server = express();
const port = 5000;

server.get('/multimedija', (zahtjev, odg) => {

	zaglavlje_mult = fs.readFileSync('ostalo/zaglavlje_mult.html', 'utf-8');
    podnozje_mult = fs.readFileSync('ostalo/podnozje_mult.html', 'utf-8');
    urls = JSON.parse(fs.readFileSync('datoteke/galerija.json', 'utf-8'));

    var tekst = "";
    var images = [];
    var videos = [];
    var audios = [];
    for (obj of urls)
    {
        if (obj.url.endsWith(".png") || obj.url.endsWith(".jpg") || obj.url.endsWith(".jpeg"))
        {
            images.push(obj.url);
        }
        if (obj.url.endsWith(".mp4"))
        {
            videos.push(obj.url);
        }
        if (obj.url.endsWith(".mp3"))
        {
            audios.push(obj.url);
        }
    }
    tekst += "<article id='clanak_slike'><h2>Slike</h2><div id='grid'><div class='grid-kontejner'>";
    for (let i = 0; i < images.length; i++)
    {
        tekst += "<figure><img class='ispis' src='" + images[i] + "'/></figure>";
    }
    tekst += "</div></div></article><div class='grid-kontejner2'><article id='clanak_video'><h2>Videi</h2><div class='grid-kontejner3'>";
    for (let i = 0; i < videos.length; i++)
        tekst += "<video controls src='" + videos[i] + "'></video>";
    tekst += "</div></article><article id='clanak_audio'><h2>Audio</h2><div id='grid-kontejner4'>";
    for (let i = 0; i < audios.length; i++)
        tekst += "<audio controls muted src='" + audios[i] + "'></audio>";
    tekst += "</div></article></div><br/>";

    odg.write(zaglavlje_mult);
    odg.write(tekst);
    odg.write(podnozje_mult);
    odg.end();
});

server.get("/popis", (zahtjev, odg) => {

    tablica = stvoriTablicuCSV();
    zaglavlje_popis = fs.readFileSync("ostalo/zaglavlje_popis.html", "utf-8");
    podnozje_popis = fs.readFileSync("ostalo/podnozje_popis.html", "utf-8");
    odg.write(zaglavlje_popis);
    odg.write(tablica);
    odg.write(podnozje_popis);
    odg.end();
});

function stvoriTablicuCSV()
{
    tablica = "";
    podaci = fs.readFileSync('datoteke/podaci.csv', 'utf-8');
    tablica += '<table id="popis_korisnika"><caption id="naslov-tablice">Podaci o novim članovima astronomskog kluba</caption>';
    for (var redak of podaci.split("\n"))
    {
        tablica += "<tr>";
        for (var podatak of redak.split(","))
        {
            tablica += "<td>";
            tablica += podatak;
            tablica += "</td>";
        }
        tablica += "</tr>";
    }
    tablica += "</table>"

    return tablica;
}
server.use(express.static(__dirname));
server.use((zahtjev, odgovor) => {
    odgovor.send('Stranica nije pronađena!');
});
server.listen(port, () => {
  console.log(`Server pokrenut na portu: ${port}`)
})


