using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Models{
    [Table("Klijent")]

    public class AutoSalon{
        [Key]
        public int AutoSalonID{ get; set; }

        public string Ime { get; set; }

        public string Adresa { get; set; }

        public virtual IList<Partner>  PartneriLista { get; set; }
    }

}