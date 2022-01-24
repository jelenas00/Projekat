using System;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Cors;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using Models;
using System.Collections.Generic;

namespace Controllers{
    [ApiController]
    [Route("[controller]")]

    public class ModelController:ControllerBase{
        public KontekstKlasa Context;
        public ModelController(KontekstKlasa context){
            Context=context;
        }

        [Route("DodajModel/{naziv}/{cena}/{partnerID}")]
        [HttpPost]
        public async Task<ActionResult> DodajModel(string naziv,int cena,int partnerID){
            if(naziv.Length>50 || string.IsNullOrWhiteSpace(naziv))
                return BadRequest("Unesite validan naziv modela!");

            if(cena<0)
                return BadRequest("Unesite validnu cenu modela!");

            var partner= await Context.Partneri.FindAsync(partnerID);
            if(partner==null){
                return BadRequest("Partner ne postoji");
            }
            try{
                Model model= new Model{
                    Naziv=naziv,
                    Cena=cena,
                    Partner=partner
                };
                Context.Modeli.Add(model);
                await Context.SaveChangesAsync();
                return Ok(model);
            }
            catch(Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [Route("PrikaziModele/{partnerID}")]
        [HttpGet]
        public async Task<ActionResult> PrikaziModele(int partnerID)
        {
            var modeli=await Context.Modeli.Where(m=>m.Partner.PartnerID==partnerID).ToListAsync();
            if(modeli==null){
                return BadRequest("Partner nema modele!");
            }
            else{
                try{
                    return Ok(modeli);
                }
                catch(Exception e){
                    return BadRequest(e.Message);
                }
            }
        }

        [Route("PromeniCenu/{id}/{cena}")]
        [HttpPut]
        public async Task<ActionResult> PromeniCenu(int id,int cena){
            var model= await Context.Modeli.FindAsync(id);
            if(model==null)
            {
                return BadRequest("Nema modela sa tim id-jem");
            }

            try{
                model.Cena=cena;
                await Context.SaveChangesAsync();
                return Ok("Cena uspesno azurirana!");
            }
            catch(Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [Route("ObrisiModel/{id}")]
        [HttpDelete]
        public async Task<ActionResult> ObrisiModel(int id){
            var model= await Context.Modeli.FindAsync(id);
            if(model==null)
            {
                return BadRequest("Nema modela sa tim id-jem");
            }
            try{
                var ime= model.Naziv;
                Context.Modeli.Remove(model);
                await Context.SaveChangesAsync();
                return Ok($"Model {ime} je obrisan");
            }
            catch(Exception e)
            {
                return BadRequest(e.Message);
            }
        }
    }
}