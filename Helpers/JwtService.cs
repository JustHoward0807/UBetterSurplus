using System.IdentityModel.Tokens.Jwt;
using System.Text;
using Microsoft.IdentityModel.Tokens;

namespace UBetterSurplus.Helpers;

public class JwtService
{
    private readonly string _secureKey;
    // Getting secret key for jwt service
    public JwtService(IConfiguration config)
    {
        _secureKey = config["JwtSecureKey"]!;
    }

    public string Generate(int id)
    {
        var symmetricSecurityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_secureKey));
        var credentials = new SigningCredentials(symmetricSecurityKey, SecurityAlgorithms.HmacSha256Signature);
        var header = new JwtHeader(credentials);

        var payload = new JwtPayload(id.ToString(), null, null, null, DateTime.Today.AddDays(1));
        var securityToken = new JwtSecurityToken(header, payload);

        return new JwtSecurityTokenHandler().WriteToken(securityToken);
    }

    public JwtSecurityToken Verify(string jwt)
    {
        var tokenHandler = new JwtSecurityTokenHandler();
        var key = Encoding.ASCII.GetBytes(_secureKey);
        tokenHandler.ValidateToken(jwt, new TokenValidationParameters
        {
            IssuerSigningKey = new SymmetricSecurityKey(key),
            ValidateIssuerSigningKey = true,
            ValidateIssuer = false,
            ValidateAudience = false
        }, out var validatedToken);

        return (JwtSecurityToken) validatedToken;
    }
}