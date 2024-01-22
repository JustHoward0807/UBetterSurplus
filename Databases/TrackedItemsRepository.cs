using UBetterSurplus.Models;

namespace UBetterSurplus.Databases;

public class TrackedItemsRepository : ITrackedItemsRepository
{
    private readonly TrackedItemsContext _trackedItemsContext;
    private readonly ProductContext _productContext;
    private readonly ILogger<PurchaseRepository> _logger;

    public TrackedItemsRepository(TrackedItemsContext trackedItemsContext, ProductContext productContext,
        ILogger<PurchaseRepository> logger)
    {
        _trackedItemsContext = trackedItemsContext;
        _productContext = productContext;
        _logger = logger;
    }
    
    public TrackedItems? Track(string surplusNumber, int uid)
    {
        var trackedItem = new TrackedItems
        {
            Sid = surplusNumber,
            Uid = uid
        };
        
        _trackedItemsContext.TrackedItems.Add(trackedItem);
        trackedItem.Tid = _trackedItemsContext.SaveChanges();

        return trackedItem;
    }

    public bool TrackCheck(string surplusNumber, int uid)
    {
        return _trackedItemsContext.TrackedItems.Any(item => item.Sid == surplusNumber && item.Uid == uid);
    }
}