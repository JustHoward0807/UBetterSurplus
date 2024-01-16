using Microsoft.EntityFrameworkCore;
using UBetterSurplus.Models;


namespace UBetterSurplus.Databases;

public class PurchaseHistoryContext : DbContext
{
    public PurchaseHistoryContext(DbContextOptions<PurchaseHistoryContext> options) : base(options)
    {
        
    }
    
    public DbSet<PurchaseHistory> PurchaseHistories { get; set; }
    public DbSet<SurplusItem> SurplusItems { get; set; }
}