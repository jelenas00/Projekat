import { AutoSalon } from "./AutoSalon.js";
import { Model } from "./Model.js"

export class Partner{
    constructor(partnerID,ime,sedisteFirme){
        this.id=partnerID;
        this.ime=ime;
        this.sedisteFirme=sedisteFirme;
        this.listaModela=[];
        this.contnainer=null;
    }

    crtajPartnera(host){

        this.contnainer=document.createElement("div");
        this.contnainer.className="kontejnerPartner";
        host.appendChild(this.contnainer);

        let divPartner=document.createElement("div");
        divPartner.className="partnerDiv";
        this.contnainer.appendChild(divPartner);

        let imePartnera=document.createElement("label");
        imePartnera.className="podaciPartner";
        imePartnera.innerHTML=this.ime;
        divPartner.appendChild(imePartnera);

        let sedistePartnera=document.createElement("label");
        sedistePartnera.className="podaciPartner";
        sedistePartnera.innerHTML="Sediste firme: "+this.sedisteFirme;
        divPartner.appendChild(sedistePartnera);
    }

    preuzmiModele(){
        console.log("hej");
        fetch("https://localhost:5001/Model/PrikaziModele/"+this.id,{method:"GET"})
        .then(response=>{
            if(response.ok){
                response.json()
                .then(modeli=>{
                    modeli.forEach(model => {
                        let m= new Model(model.modelID,model.naziv,model.cena);
                        console.log(m);
                        this.listaModela.push(m);
                    });
                })
            }
            else{
                response.text().then(response=>console.log(response))
            }
        })
    }
    prikaziModelePartnera(host){
        if(host.querySelector(".divModeliPartnera")!=null)
        {
            var dete=host.querySelector(".divModeliPartnera");
            var roditelj=dete.parentNode;
            roditelj.removeChild(dete);
        }
        if(this.listaModela.length<1){
            alert("Partner nema dostupne modele!");
        }
        let divModeli=document.createElement("div");
        divModeli.className="divModeliPartnera";
        host.appendChild(divModeli);

        this.listaModela.forEach((model,i)=>
            {
                console.log(model);
                let divZaModel=document.createElement("div");
                divZaModel.className="divZaModelPartner";
                divModeli.appendChild(divZaModel);
                model.crtajModel(divZaModel);

                let dugmici=document.createElement("div");
                dugmici.className="dugmiciModeldiv";
                divZaModel.appendChild(dugmici);

                let ukloni=document.createElement("button");
                ukloni.className="modelDugmici";
                ukloni.innerHTML="Ukloni";
                dugmici.appendChild(ukloni);
                ukloni.onclick=(ev)=>this.ukloniModel(model.id,i,host);

                let promeniCenu=document.createElement("button");
                promeniCenu.className="modelDugmici";
                promeniCenu.innerHTML="Promeni cenu";
                dugmici.appendChild(promeniCenu);
                promeniCenu.onclick=(ev)=>this.promenaCene(dugmici,model.id,i,host);
            })
    }
    obrisi(){
        fetch("https://localhost:5001/Partner/ObrisiPartnera/"+this.id,{method:"DELETE"})
        .then(response=>{
            if(response.ok){
                response.text().then(response=>alert(response));
            }
            else{
                response.text().then(response=>alert(response));
            }
        })
    }
    dodajModel(naziv,cena){
        fetch("https://localhost:5001/Model/DodajModel/"+naziv+"/"+cena+"/"+this.id,{method:"POST",header:{
            'Content-Type':'application/json'}
        }).then(response=>{
            if(response.ok){
                response.json().then(model=>{
                    var m= new Model(model.modelID,model.naziv,model.cena);
                    console.log(m);
                    this.listaModela.push(m);
                    alert("Model je dodajt!");
                })
            }
        })
    }
    ukloniModel(id,i,host){
        fetch("https://localhost:5001/Model/ObrisiModel/"+id,{method:"DELETE"})
        .then(response=>
            {
                if(response.ok){
                    response.text().then(response=>alert("Ok:"+response));
                    this.listaModela.pop(i);
                    this.prikaziModelePartnera(host);
                }
                else{
                    response.text().then(response=>alert(response));
                }
            })
    }
    promenaCene(host,id,i,prenetiHost){
        let novaCena=document.createElement("input");
        novaCena.className="novaCena";
        novaCena.type="int";
        host.appendChild(novaCena);
        let promeni=document.createElement("button");
        promeni.innerHTML="Promeni";
        promeni.className="modelDugmiciPromeni";
        host.appendChild(promeni);
        promeni.onclick=(ev)=>this.promCenu(novaCena.value,id,i,prenetiHost);
    }
    promCenu(c,id,i,host){
        fetch("https://localhost:5001/Model/PromeniCenu/"+id+"/"+c,{method:"PUT"})
        .then(response=>{
            if(response.ok){
                response.text().then(response=>alert("Ok:"+response));
                this.listaModela[i].promenaCene(c);
                this.prikaziModelePartnera(host);
            }
            else{
                response.text().then(response=>alert(response));
            }
        })
    }
    obrisiPrethodno(){
        var dete=this.contnainer.querySelector(".novaCena");
        if(dete){
            var roditelj=dete.parentNode;
            roditelj.removeChild;
        }
        dete=this.contnainer.querySelector(".modelDugmiciPromeni");
        if(dete){
            var roditelj=dete.parentNode;
            roditelj.removeChild;
        }
    }
}