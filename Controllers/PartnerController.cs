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
    public class PartnerController: ControllerBase{

        public KontekstKlasa Context;

        public PartnerController(KontekstKlasa context){
            Context=context;
        }


        [Route("Dodaj/{ime}/{sediste}/{salonID}")]
        [HttpPost]
        public async Task<ActionResult> Dodaj(string ime,string sediste,int salonID){
            var salon= await Context.AutoSaloni.FindAsync(salonID);
            if(salon==null){
                return BadRequest("Salon ne postoji!");
            }
            try{
                Partner partner= new Partner{
                    Ime=ime,
                    SedisteFirme=sediste,
                    AutoSalon=salon
                };
                Context.Partneri.Add(partner);
                salon.PartneriLista.Add(partner);
                await Context.SaveChangesAsync();
                return Ok(partner);
            }
            catch(Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [Route("VratiPartnere/{salonID}")]
        [HttpGet]
        public async Task<ActionResult> VratiPartnere(int salonID)
        {
            var partneri= await Context.Partneri.Where(p=>p.AutoSalon.AutoSalonID==salonID).Include(p=>p.Modeli).ToListAsync();
            if(partneri==null)
            {
                return BadRequest("Salon nema partnere!");
            }
            else{
                try{
                    return Ok(partneri);
                }
                catch(Exception e){
                    return BadRequest(e.Message);
                }
            }
        }

        [Route("ObrisiPartnera/{partnerID}")]
        [HttpDelete]
        public async Task<ActionResult> ObrisiPartnera(int partnerID){
            var partner=await Context.Partneri.FindAsync(partnerID);
            if(partner==null){
                return BadRequest("Greska kod pronalaska partnera!");
            }
            AutoSalon salon= partner.AutoSalon;
            try{
                Context.Partneri.Remove(partner);
                await Context.SaveChangesAsync();
                return Ok("Partner uklonjen!");
            }
            catch(Exception e){
                return BadRequest(e.Message);
            }
        }

        
    }
}