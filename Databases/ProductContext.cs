using Microsoft.EntityFrameworkCore;
using UBetterSurplus.Models;

namespace UBetterSurplus.Databases;

public class ProductContext : DbContext
{
    public ProductContext(DbContextOptions<ProductContext> options) : base(options)
    {
        
    }
    
    public DbSet<SurplusItem> SurplusItems { get; set; }
}