using UBetterSurplus.Models;

namespace UBetterSurplus.Databases;

public interface ITrackedItemsRepository
{
    TrackedItems? Track(string surplusNumber, int uid);
    TrackedItems? UnTrack(string surplusNumber, int uid);

    bool TrackCheck(string surplusNumber, int uid);

    IEnumerable<SurplusItem> GetTrackedItems(int uid);

}