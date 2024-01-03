using Microsoft.EntityFrameworkCore;
using MySql.Data.MySqlClient;
// using MySql.Data.MySqlClient;
using UBetterSurplus.Databases;
using UBetterSurplus.Helpers;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllersWithViews();
var conStrBuilder = new MySqlConnectionStringBuilder(
    builder.Configuration.GetConnectionString("Default"))
{
    Password = builder.Configuration["DbPassword"]
};
builder.Services.AddCors(); 
builder.Services.AddDbContext<UserContext>(opt => opt.UseMySQL(conStrBuilder.GetConnectionString(true)));
builder.Services.AddScoped<IUserRepository, UserRepository>();
builder.Services.AddScoped<JwtService>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseCors(options => options
    .WithOrigins(new [] {"https://localhost:44406", "http://localhost:3000", "http://localhost:5064"})
    .AllowCredentials()
    .AllowAnyMethod()
    .AllowAnyHeader()
);

// app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseRouting();



app.MapControllerRoute(
    name: "default",
    pattern: "{controller}/{action=Index}/{id?}");

app.MapFallbackToFile("index.html");

app.Run();