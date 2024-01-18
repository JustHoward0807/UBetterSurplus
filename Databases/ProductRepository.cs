namespace UBetterSurplus.Databases;

public class ProductRepository : IProductRepository
{
    
    private readonly ProductContext _productContext;
    private readonly PurchaseHistoryContext _purchaseHistoryContext;
    public ProductRepository(ProductContext productContext, PurchaseHistoryContext purchaseHistoryContext)
    {
        _productContext = productContext;
        _purchaseHistoryContext = purchaseHistoryContext;
    }
    public IEnumerable<SurplusItem> GetAllSurplusItems()
    {
        try
        {
            return _productContext.SurplusItems.ToList();
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            throw;
        }
        
    }
    
    
}