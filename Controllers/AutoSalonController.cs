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
    public class AutoSalonController : ControllerBase{
        public KontekstKlasa Context;
        public AutoSalonController(KontekstKlasa context)
        {
            Context=context;
        }

        [Route("DodajSalon/{ime}/{adresa}")]
        [HttpPost]
        public async Task<ActionResult> DodajSalon(string ime,string adresa)
        {
            
            if(ime.Length>50 || string.IsNullOrWhiteSpace(ime) )
            {
                return BadRequest("Nevalidno ime!");
            }
            if(adresa.Length>50 || string.IsNullOrWhiteSpace(adresa) )
            {
                return BadRequest("Nevalidna adresa!");
            }
            try{
                AutoSalon salon= new AutoSalon{
                    Ime=ime,
                    Adresa=adresa
                };
                Context.AutoSaloni.Add(salon);
                await Context.SaveChangesAsync();
                return Ok(salon);
            }
            catch(Exception e)
            {
                return BadRequest(e.Message);
            }
        }
        [Route("PrikaziSalone")]
        [HttpGet]
        public async Task<ActionResult> PrikaziSalone()
        {
            var saloni=Context.AutoSaloni.Include(s=>s.PartneriLista);
            try{
                var salon= await saloni.ToListAsync();
                return Ok(salon);
            }
            catch(Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [Route("Obrisi/{id}")]
        [HttpDelete]
        public async Task<ActionResult> ObrisiSalon(int id){
            try{
                var salon= Context.AutoSaloni.Find(id);
                Context.AutoSaloni.Remove(salon);
                await Context.SaveChangesAsync();
                return Ok("Uklonjen");
            }
            catch(Exception e){
                return BadRequest(e.Message);
            }
        }
    }
}