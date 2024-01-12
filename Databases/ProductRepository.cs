namespace UBetterSurplus.Databases;

public class ProductRepository : IProductRepository
{
    
    private readonly ProductContext _context;
    
    public ProductRepository(ProductContext context)
    {
        _context = context;
    }
    public IEnumerable<SurplusItem> GetAllSurplusItems()
    {
        try
        {
            return _context.SurplusItems.Where(item => item.Qty > 0).ToList();
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            throw;
        }
        
    }
}