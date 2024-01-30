namespace UBetterSurplus.Dtos;

/// <summary>
/// Dto: Data Transfer Object
/// Facilitate communication between two systems (like an API and your server) without potentially exposing sensitive information.
/// </summary>
public class RegisterDto
{
    public string Name { get; set; } = null!;
    public string Password { get; set; } = null!;
}