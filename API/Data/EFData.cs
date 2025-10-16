using GeneralTools.Models;
using Microsoft.EntityFrameworkCore;

namespace GeneralTools.Data;

public partial class EFData : DbContext
{

    public EFData()
    {
    }

    public EFData(DbContextOptions<EFData> options )
        : base(options)
    {
    }

    public virtual DbSet<Product> Product { get; set; }

    public virtual DbSet<Credentials> Credentials { get; set; }

}
