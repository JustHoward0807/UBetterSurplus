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

    public TrackedItems? UnTrack(string surplusNumber, int uid)
    {
        var trackedItem = _trackedItemsContext.TrackedItems
            .FirstOrDefault(items => items.Sid == surplusNumber && items.Uid == uid);

        if (trackedItem != null)
        {
            // Remove the tracked item from the DbSet
            _trackedItemsContext.TrackedItems.Remove(trackedItem);

            // Save the changes to the database
            _trackedItemsContext.SaveChanges();
            return trackedItem;
        }

        return null;


    }

    public bool TrackCheck(string surplusNumber, int uid)
    {
        return _trackedItemsContext.TrackedItems.Any(item => item.Sid == surplusNumber && item.Uid == uid);
    }

    public IEnumerable<SurplusItem> GetTrackedItems(int uid)
    {
        var matchingSurplusItems = _trackedItemsContext.SurplusItems
            .Where(item => _trackedItemsContext.TrackedItems.Any(ph => ph.Uid == uid && ph.Sid == item.SurplusNumber)).ToList();
            

        return matchingSurplusItems;
    }
}