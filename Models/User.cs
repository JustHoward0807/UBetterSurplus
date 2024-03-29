using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace UBetterSurplus.Models;

public class User
{
    [Key]
    public int Id { get; set; }
    public string Name { get; set; } = null!;
    [JsonIgnore] public string Password { get; set; } = null!;
}