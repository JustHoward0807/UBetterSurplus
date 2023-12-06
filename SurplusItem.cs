using System.Text.Json.Serialization;

namespace UBetterSurplus;


/// <summary>
/// TODO: Maybe store image in the future
/// </summary>
public class SurplusItem
{
    // "Surplus Number": "159220 0023 42742",
    [JsonPropertyName("Surplus Number")]
    public string SurplusNumber { get; set; } = null!;
    
    // "Qty": "1",
    [JsonPropertyName("Qty")]
    public string Qty { get; set; } = null!;
    
    // "Description": "COMPUTER, DELL, OPTIPLEX 7070 MFF, 6CW64Y2",
    [JsonPropertyName("Description")]
    public string Description { get; set; } = null!;


    // "Price": "$200.00",
    [JsonPropertyName("Price")]
    public string Price { get; set; } = null!;
    
    // "Public Date": "null",
    [JsonPropertyName("Public Date")] 
    public string? PublicDate { get; set; } = null!;
    
    // "Type": "CPU",
    [JsonPropertyName("Type")]
    public string? Type { get; set; }
    
    // "Category": "Computer/IT/Telecommunication Equipment/Supply"
    [JsonPropertyName("Category")]
    public string? Category { get; set; }
    

}