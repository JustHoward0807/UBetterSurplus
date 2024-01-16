namespace UBetterSurplus.Databases;

public interface IProductRepository
{
    IEnumerable<SurplusItem> GetAllSurplusItems();

}