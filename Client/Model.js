export class Model{
    constructor(modelID,naziv,cena)
    {
        this.id=modelID;
        this.naziv=naziv;
        this.cena=cena;
        this.container=null;
    }

    crtajModel(host){
        this.container=document.createElement("div");
        this.container.className="modelKontejner";
        host.appendChild(this.container);

        let modelPodaci=document.createElement("div")
        modelPodaci.className="modelPodaci";
        this.container.appendChild(modelPodaci);

        let ime= document.createElement("label");
        ime.className="modelIme";
        ime.innerHTML=this.naziv;
        modelPodaci.appendChild(ime);

        let cena= document.createElement("label");
        cena.className="modelIme";
        cena.innerHTML="Cena: "+this.cena;
        modelPodaci.appendChild(cena);
    }
    promenaCene(c){
        this.cena=c;
    }
}