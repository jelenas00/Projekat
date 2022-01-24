using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace Models{
    [Table("Model")]
    public class Model{
        [Key]
        public int ModelID { get; set; }

        public string Naziv { get; set; }

        public int Cena { get; set; }

        [JsonIgnore]
        public Partner Partner { get; set; }
    }
}