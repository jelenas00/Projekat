import { Partner } from "./Partner.js"

export class AutoSalon{
    constructor(id,ime,adresa)
    {
        this.id=id;
        this.ime=ime;
        this.adresa=adresa;
        this.listaPartnera=[];
        this.container=null;
    }

    crtajSalon(host){
        this.container=document.createElement("div");
        this.container.className="salonDiv";
        host.appendChild(this.container);

        let podaci=document.createElement("div");
        podaci.className="podaciSalon"
        this.container.appendChild(podaci);

        let formaPrikaz=document.createElement("div");
        formaPrikaz.className="prikazForme";
        this.container.appendChild(formaPrikaz);

        let imeSalona=document.createElement("h1");
        imeSalona.innerHTML=this.ime;
        imeSalona.className="imeSalona";
        imeSalona.onclick=(ev)=>this.klikLabela();
        podaci.appendChild(imeSalona);

        let adresa=document.createElement("h6");
        adresa.className="adresa";
        adresa.innerHTML=this.adresa;
        podaci.appendChild(adresa);

       /* let dugmiciPartner=document.createElement("div");
        dugmiciPartner.className="dugmiciPartnerSalon";
        podaci.appendChild(dugmiciPartner);*/

        let prikaziPartnere=document.createElement("button");
        prikaziPartnere.className="dugmePartner";
        prikaziPartnere.innerHTML="Prikazi partnere";
        podaci.appendChild(prikaziPartnere);
        prikaziPartnere.onclick=(ev)=>this.prikaziPartnere(formaPrikaz);

        let dodajPartnere=document.createElement("button");
        dodajPartnere.className="dugmePartner";
        dodajPartnere.innerHTML="Dodaj partnera";
        podaci.appendChild(dodajPartnere);
        dodajPartnere.onclick=(ev)=>this.dodajPartnera(formaPrikaz);

        let odaberiModel=document.createElement("button");
        odaberiModel.className="dugmePartner";
        odaberiModel.innerHTML="Odaberi model";
        podaci.appendChild(odaberiModel);
        odaberiModel.onclick=(ev)=>this.modeliPrikaz(formaPrikaz);

        if(this.listaPartnera.length<1)
            this.preuzmiPartnere();
    }
    brisiPrikazForme(){
        var dete=this.container.querySelector(".dodavanjePartnera");
        if(dete){
            var roditelj=dete.parentNode;
            roditelj.removeChild(dete);
        }

        dete=this.container.querySelector(".prikazPartnera");
        if(dete){
            var roditelj=dete.parentNode;
            roditelj.removeChild(dete);
        }
        dete=this.container.querySelector(".divPrikazModela");
        if(dete)
        {
            var roditelj=dete.parentNode;
            roditelj.removeChild(dete);
        }
        this.brisiPrikazModelaHost();
    }

    preuzmiPartnere(){
        fetch("https://localhost:5001/Partner/VratiPartnere/"+this.id,{method:"GET"})
        .then(response=>{
            if(response.ok)
            {
                response.json()
                .then(partneri=>{
                    partneri.forEach(partner=>{
                        let p= new Partner(partner.partnerID,partner.ime,partner.sedisteFirme);
                        console.log(p);
                        this.listaPartnera.push(p);
                        p.preuzmiModele();
                    })
                })
            }
            else{
                response.text().then(response=>console.log(response));
            }
        })
        
    }

    prikaziPartnere(host){
        if(this.listaPartnera.length<1)
        alert("Salon nema partnere!");
        this.brisiPrikazForme();

        let bodyZaPartnere=document.createElement("div");
        bodyZaPartnere.className="prikazPartnera";
        host.appendChild(bodyZaPartnere);

        this.listaPartnera.forEach((p,i)=>{
            let divZaPartnera=document.createElement("div");
            divZaPartnera.className="divPartnerSalon";
            bodyZaPartnere.appendChild(divZaPartnera);
            p.crtajPartnera(divZaPartnera);

            let brisi=document.createElement("button");
            brisi.className="dugmePartner2";
            brisi.innerHTML="Obrisi partnera";
            brisi.onclick=(ev)=>this.obrisiP(i,host);
            divZaPartnera.appendChild(brisi);
        })
    }
    obrisiP(i,host){
        this.listaPartnera[i].obrisi();
        this.listaPartnera.pop(i);
        this.prikaziPartnere(host);
    }

    dodajPartnera(host){
        this.brisiPrikazForme();

        let dodavanjePartnera=document.createElement("div");
        dodavanjePartnera.className="dodavanjePartnera";
        host.appendChild(dodavanjePartnera);
        
        let divIme=document.createElement("div");
        divIme.className="dodajPartneraDivovi";
        dodavanjePartnera.appendChild(divIme);

        let ime=document.createElement("label")
        ime.className="dodajPartneraLabele";
        ime.innerHTML="Ime proizvodjaca: ";
        divIme.appendChild(ime);

        let imeInput=document.createElement("input");
        imeInput.type="string";
        imeInput.className="dodajPartneraVrednosti";
        divIme.appendChild(imeInput);

        let divSediste=document.createElement("div");
        divSediste.className="dodajPartneraDivovi";
        dodavanjePartnera.appendChild(divSediste);

        let sediste=document.createElement("label");
        sediste.className="dodajPartneraLabele";
        sediste.innerHTML="Sediste firme: ";
        divSediste.appendChild(sediste);

        let sedisteInput=document.createElement("input");
        sedisteInput.type="string";
        sedisteInput.className="dodajPartneraVrednosti";
        divSediste.appendChild(sedisteInput);

        let dodaj=document.createElement("button");
        dodaj.className="dugmePartner";
        dodaj.innerHTML="Dodaj";
        dodavanjePartnera.appendChild(dodaj);
        dodaj.onclick=(ev)=>this.napraviPartnera(imeInput.value,sedisteInput.value);

    }
    napraviPartnera(ime,sediste){
        fetch("https://localhost:5001/Partner/Dodaj/"+ime+"/"+sediste+"/"+this.id,{method:"POST",header:{
            'Content-Type':'application/json'}
        }).then(response=>response.json()).then(partner=>{
            var p= new Partner(partner.partnerID,partner.ime,partner.sedisteFirme);
            this.listaPartnera.push(p);
            console.log(p);
        })
    }
    brisiPrikazModelaHost(){
        var dete=this.container.querySelector(".prikaziModeleHost");
        if(dete){
            var roditelj=dete.parentNode;
            roditelj.removeChild(dete);
        }
        dete=this.container.querySelector(".bodyDodavanjeModela");
        if(dete){
            var roditelj=dete.parentNode;
            roditelj.removeChild(dete);
        }
    }

    modeliPrikaz(host){
        if(this.listaPartnera.length<1){
            alert("Salon nema partnere!");
        }
        else{
        this.brisiPrikazForme();

        let divPrikazModela=document.createElement("div");
        divPrikazModela.className="divPrikazModela";
        host.appendChild(divPrikazModela);

        let prikazModelaZaglavlje=document.createElement("div");
        prikazModelaZaglavlje.className="prikazModelaZaglavlje";
        divPrikazModela.appendChild(prikazModelaZaglavlje);
        
        let prikazModela= document.createElement("div");
        prikazModela.className="prikazModela";
        host.appendChild(prikazModela);

        let divSelekt=document.createElement("div");
        divSelekt.className="selektDiv";
        prikazModelaZaglavlje.appendChild(divSelekt);

        this.crtajSelekt(divSelekt);

        let prikaziModele=document.createElement("button");
        prikaziModele.innerHTML="Prikazi dostupne modele";
        prikaziModele.className="dugmePartner";
        prikazModelaZaglavlje.appendChild(prikaziModele);
        prikaziModele.onclick=(ev)=>this.prikazOdabranogModela(prikazModela);

        let dodajModel=document.createElement("button");
        dodajModel.innerHTML="Dodaj model";
        dodajModel.className="dugmePartner";
        prikazModelaZaglavlje.appendChild(dodajModel);
        dodajModel.onclick=(ev)=>this.dodavanjeModela(prikazModela);
        }
        

    }

    dodavanjeModela(host){
        this.brisiPrikazModelaHost();
        let bodyDodavanjeModela=document.createElement("div");
        bodyDodavanjeModela.className="bodyDodavanjeModela";
        host.appendChild(bodyDodavanjeModela);

        let nazivDiv=document.createElement("div");
        nazivDiv.className="dodavanjeModelaNazivDiv";
        bodyDodavanjeModela.appendChild(nazivDiv);

        let labelaNaziv=document.createElement("label");
        labelaNaziv.className="dodavanjeModelaPodaci";
        labelaNaziv.innerHTML="Naziv: ";
        nazivDiv.appendChild(labelaNaziv);

        let nazivInoput=document.createElement("input");
        nazivInoput.className="dodavanjeModelaInput";
        nazivInoput.type="string";
        nazivDiv.appendChild(nazivInoput);

        let cenaDiv=document.createElement("div");
        cenaDiv.className="dodavanjeModelaNazivDiv";
        bodyDodavanjeModela.appendChild(cenaDiv);

        let labelaCena=document.createElement("label");
        labelaCena.className="dodavanjeModelaPodaci";
        labelaCena.innerHTML="Cena: ";
        cenaDiv.appendChild(labelaCena);

        let cenaInoput=document.createElement("input");
        cenaInoput.className="dodavanjeModelaInput";
        cenaInoput.type="int";
        cenaDiv.appendChild(cenaInoput);

        let divSelekt=document.createElement("div");
        divSelekt.className="selektDiv";
        bodyDodavanjeModela.appendChild(divSelekt);

        this.crtajSelekt2(divSelekt);

        let dodaj=document.createElement("button");
        dodaj.className="dugmePartner";
        dodaj.innerHTML="Dodaj";
        bodyDodavanjeModela.appendChild(dodaj);
        dodaj.onclick=(ev)=>this.novModel(nazivInoput.value,cenaInoput.value);

    }
    novModel(naziv,cena){
        let index=this.container.querySelector(".selektPartnera").value;
        if(index==null)
            alert("Odaberite partnera!");
        this.listaPartnera[index].dodajModel(naziv,cena);
    }

    crtajSelekt(host){
        let selekt=document.createElement("select");
        selekt.className="selektPartnera";
        host.appendChild(selekt);

        this.listaPartnera.forEach((partner,i)=>{
            let opcija=document.createElement("option");
            opcija.className="opcijaPartner";
            opcija.innerHTML=partner.ime;
            opcija.value=i;
            selekt.appendChild(opcija);
        })
    }
    crtajSelekt2(host){
        let selekt=document.createElement("select");
        selekt.className="selektPartnera2";
        host.appendChild(selekt);

        this.listaPartnera.forEach((partner,i)=>{
            let opcija=document.createElement("option");
            opcija.className="opcijaPartner";
            opcija.innerHTML=partner.ime;
            opcija.value=i;
            selekt.appendChild(opcija);
        })
    }

    prikazOdabranogModela(host){
        let prikaziModele=document.createElement("div");
        prikaziModele.className="crtanjeModelaSalon";
        host.appendChild(prikaziModele);

        let index=this.container.querySelector(".selektPartnera").value;
        console.log(index);
        console.log(this.listaPartnera[index]);
        this.brisiPrikazModelaHost();
        let prikaziModeleHost=document.createElement("div");
        prikaziModeleHost.className="prikaziModeleHost";
        host.appendChild(prikaziModeleHost);
        this.listaPartnera[index].prikaziModelePartnera(prikaziModeleHost);
    }
    ukloniPartnera(kog){
        this.listaPartnera.forEach((partner,index)=>{
            if(partner.ID==kog)
                this.listaPartnera.pop(index);
        })
    }
    
}