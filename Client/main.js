import { AutoSalon  } from "./AutoSalon.js";


let zaglavlje= document.createElement("div");
zaglavlje.className="zaglavlje";
document.body.appendChild(zaglavlje);

let body=document.createElement("body");
body.className="bodyMain";
document.body.appendChild(body);

var listaSalona=[];

function uzmiSalone(){
    fetch("https://localhost:5001/AutoSalon/PrikaziSalone",{method:"GET"})
    .then(response=>{
        if(response.ok){
            response.json().then(saloni=>{
                saloni.forEach(salon => {
                    var s= new AutoSalon(salon.autoSalonID,salon.ime,salon.adresa);
                    listaSalona.push(s);
                    console.log(s);
                });
            }
                )
        }
        })
        
}

uzmiSalone();

let prikaziSalon=document.createElement("button");
prikaziSalon.className="dodajSalon";
prikaziSalon.innerHTML="Prikazi salone";
zaglavlje.appendChild(prikaziSalon);

prikaziSalon.onclick=(ev)=>prikaziSalone();

let dodajSalon=document.createElement("button");
dodajSalon.className="dodajSalon";
dodajSalon.innerHTML="Dodaj salon";
zaglavlje.appendChild(dodajSalon);
dodajSalon.onclick=(ev)=>noviSalon();

function noviSalon(){
    brisiSadrzaj();
    let popuniSalon=document.createElement("div");
    popuniSalon.className="popuniSalon";
    body.appendChild(popuniSalon);

    let divIme=document.createElement("div");
    divIme.className="divPopuniSalon";
    popuniSalon.appendChild(divIme);

    let labelaIme=document.createElement("label");
    labelaIme.innerHTML="Ime auto salona: ";
    labelaIme.className="imeNovogSalona";
    divIme.appendChild(labelaIme);

    let imeVrednost=document.createElement("input");
    imeVrednost.type="string";
    imeVrednost.className="imeVrednost"
    divIme.appendChild(imeVrednost);

    let divAdresa=document.createElement("div");
    divAdresa.className="divPopuniSalon";
    popuniSalon.appendChild(divAdresa);

    let labelaAdresa=document.createElement("label");
    labelaAdresa.innerHTML="Adresa auto salona: ";
    labelaAdresa.className="imeNovogSalona";
    divAdresa.appendChild(labelaAdresa);

    let adresaVrednost=document.createElement("input");
    adresaVrednost.type="string";
    adresaVrednost.className="imeVrednost"
    divAdresa.appendChild(adresaVrednost);

    let dodaj=document.createElement("button");
    dodaj.innerHTML="Dodaj";
    dodaj.className="dugmePartnerMain";
    popuniSalon.appendChild(dodaj);

    dodaj.onclick=(ev)=>dodajNoviSalon(imeVrednost.value,adresaVrednost.value);
}

function dodajNoviSalon(ime,adresa){
    fetch("https://localhost:5001/AutoSalon/DodajSalon/"+ime+"/"+adresa,{method:"POST",
    header:{
        'Content-Type':'application/json'}
    }).then(response=>response.json()).then(salon => {
        var s= new AutoSalon(salon.autoSalonID,salon.ime,salon.adresa);
        listaSalona.push(s);
        console.log(s);
    })

    
}

function prikaziSalone(){
    brisiSadrzaj();
    let bodyZaCrtanjeSalona=document.createElement("div");
    bodyZaCrtanjeSalona.className="bodyZaSalone";
    body.appendChild(bodyZaCrtanjeSalona);

    listaSalona.forEach((s,i)=>{
        let salon=document.createElement("div");
        salon.className="salonMain";
        bodyZaCrtanjeSalona.appendChild(salon);

        let salonPodaci=document.createElement("div")
        salonPodaci.className="salonPodaciMain";
        salon.appendChild(salonPodaci);

        let salonDugmici=document.createElement("div");
        salonDugmici.className="salonDugmiciMain";
        salon.appendChild(salonDugmici);

        let ukloniSalon=document.createElement("button");
        ukloniSalon.className="dodajSalon";
        ukloniSalon.innerHTML="Ukloni salon";
        salonDugmici.appendChild(ukloniSalon);
        ukloniSalon.onclick=(ev)=>obrisiSalon(i);

        let imeSalona=document.createElement("h1");
        imeSalona.innerHTML=s.ime;
        imeSalona.className="imeSalonaMain";
        imeSalona.onclick=(ev)=>prikaziKliknutiSalon(i);
        salonPodaci.appendChild(imeSalona);

        let adresa=document.createElement("h6");
        adresa.className="adresa";
        adresa.innerHTML=s.adresa;
        salonPodaci.appendChild(adresa);
    })
   
}
function prikaziKliknutiSalon(id){
    brisiSadrzaj();
    let bodyZaSalon=document.createElement("div");
    bodyZaSalon.className="bodyZaSalon";
    body.appendChild(bodyZaSalon);
    listaSalona[id].crtajSalon(bodyZaSalon);
}

function obrisiSalon(i){
    fetch("https://localhost:5001/AutoSalon/Obrisi/"+listaSalona[i].id,{method:"DELETE"})
    .then(response=>
        {
            if(response.ok){
                response.text().then(response=>alert(response));
                listaSalona.pop(i);
                prikaziSalone();
            }
            else{
                response.text().then(response=>alert(response));
            }
        })

    prikaziSalone();
}

function brisiSadrzaj(){
    var dete=body.querySelector(".bodyZaSalone");
    if(dete){
        var roditelj=dete.parentNode;
        roditelj.removeChild(dete);
    }
    dete=body.querySelector(".popuniSalon");
    if(dete){
        var roditelj=dete.parentNode;
        roditelj.removeChild(dete);
    }
    dete=body.querySelector(".bodyZaSalon");
    if(dete){
        var roditelj=dete.parentNode;
        roditelj.removeChild(dete);
    }
}


