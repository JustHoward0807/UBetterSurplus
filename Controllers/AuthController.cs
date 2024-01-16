using Microsoft.AspNetCore.Mvc;
using UBetterSurplus.Databases;
using UBetterSurplus.Dtos;
using UBetterSurplus.Helpers;
using UBetterSurplus.Models;

namespace UBetterSurplus.Controllers;

// [Route("api")]
[Route("[controller]")]
[ApiController]
public class AuthController : Controller
{
    private readonly IUserRepository _repository;
    private readonly JwtService _jwtService;

    public AuthController(IUserRepository repository, JwtService jwtService)
    {
        _repository = repository;
        _jwtService = jwtService;
    }


    [HttpPost("RegisterOrLogin")]
    public IActionResult RegisterOrLogin(RegisterDto dto)
    {
        // Check if the user exist or not, if not then do the register. if exist, do the login
        var user = _repository.GetByUsername(dto.Name);

        if (user == null)
        {
            user = new User
            {
                Name = dto.Name,
                Password = BCrypt.Net.BCrypt.HashPassword(dto.Password)
            };

            var userCreated = _repository.Create(user);
            var _jwt = _jwtService.Generate(userCreated.Id);

            Response.Cookies.Append("jwt", _jwt, new CookieOptions
            {
                // Bc of this, so I cannot access cookie in client side which is good for security.
                // I struggle here a lot since I keep trying to print out cookie in front-end.
                HttpOnly = true, 
                Secure = true,
                SameSite = SameSiteMode.None
            
            });
            
            return Ok(new
            {
                message = "Success Register"
            });
            // return Created("Success Register", _repository.Create(user));
        }

        if (!BCrypt.Net.BCrypt.Verify(dto.Password, user.Password))
        {
            return BadRequest(new { message = "Invalid password" });
        }

        var jwt = _jwtService.Generate(user.Id);

        Response.Cookies.Append("jwt", jwt, new CookieOptions
        {
            // Bc of this, so I cannot access cookie in client side which is good for security.
            // I struggle here a lot since I keep trying to print out cookie in front-end.
            HttpOnly = true, 
            Secure = true,
            SameSite = SameSiteMode.None
            
        });
        

        return Ok(new
        {
            message = "Success Login"
        });
    }

    [HttpGet("User")]
    public IActionResult User()
    {
        try
        {
            var jwt = Request.Cookies["jwt"];

            var token = _jwtService.Verify(jwt!);

            int userId = int.Parse(token.Issuer);

            var user = _repository.GetById(userId);

            return Ok(user);
        }

        catch (Exception)
        {
            return Unauthorized();
        }
    }

    [HttpPost("Logout")]
    public IActionResult Logout()
    {
        
        Response.Cookies.Delete("jwt",  new CookieOptions
        {
            HttpOnly = true, 
            Secure = true,
            SameSite = SameSiteMode.None
        });
        return Ok(new
        {
            message = "Success delete cookies"
        });
    }
}