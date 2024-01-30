using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace UBetterSurplus.Models;

[Table("TrackedItems")]
public class TrackedItems
{
    [Key]
    public int Tid { get; set; }
    
    [ForeignKey("User")]
    public int Uid { get; set; }

    [ForeignKey("SurplusItem")]
    public string Sid { get; set; } = null!;
    
    public virtual User User { get; set; }
    
    public virtual SurplusItem SurplusItem { get; set; }
}