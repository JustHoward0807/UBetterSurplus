using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;


namespace UBetterSurplus.Models;

[Table("PurchaseHistory")]
public class PurchaseHistory
{
    [Key]
    public int Pid { get; set; }
    
    [ForeignKey("User")]
    public int Uid { get; set; }

    [ForeignKey("SurplusItem")]
    public string Sid { get; set; } = null!;
    
    public DateTime PurchaseTime { get; set; }
    
    public virtual User User { get; set; }
    
    public virtual SurplusItem SurplusItem { get; set; }
    
}