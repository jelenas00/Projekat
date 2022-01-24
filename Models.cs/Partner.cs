using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace Models{
    [Table("Partner")]

    public class Partner{

        [Key]
        public int PartnerID { get; set; }

        [Required]
        public string Ime { get; set; }

        public string SedisteFirme { get; set; }

        [JsonIgnore]
        public AutoSalon AutoSalon {get; set; }
        
        public virtual IList<Model> Modeli { get; set; }
    }
}