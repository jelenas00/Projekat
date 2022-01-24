using Microsoft.EntityFrameworkCore;

namespace Models{
    public class KontekstKlasa:DbContext
    {
        public DbSet<AutoSalon> AutoSaloni { get; set; }
        public DbSet<Partner> Partneri { get; set; }
        public DbSet<Model> Modeli { set; get; }

        public KontekstKlasa(DbContextOptions options): base(options)
        {}
    }
}