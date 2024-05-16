using API.Data;
using API.Entities;
using API.Middleware;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
builder.Services.AddDbContext<StoreContext>(opt=>
{
    opt.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection"));
});//dodat db context

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddCors();

builder.Services.AddIdentityCore<User>(opt =>
{
    opt.User.RequireUniqueEmail = true;
})
    .AddRoles<IdentityRole>()
    .AddEntityFrameworkStores<StoreContext>();
builder.Services.AddAuthentication();
builder.Services.AddAuthorization();


var app = builder.Build();

// Configure the HTTP request pipeline.

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}








app.UseAuthorization();
app.MapControllers();
var scope= app.Services.CreateScope();//oportunity za db
var context=scope.ServiceProvider.GetRequiredService<StoreContext>();//oportunity za db
var userManager = scope.ServiceProvider.GetRequiredService<UserManager<User>>();
var logger=scope.ServiceProvider.GetRequiredService<ILogger<Program>>();//loger za errors
try
{
await context.Database.MigrateAsync();
await DbInitializer.Initialize(context,userManager);
}
catch(Exception ex)
{
    logger.LogError(ex,"A problem occurred during migration");
}
// Startup.cs


    // Other configurations...
app.UseMiddleware<ExceptionMiddleware>();

app.UseCors(opt=>{
    opt.AllowAnyHeader().AllowAnyMethod().AllowCredentials().WithOrigins("http://localhost:3000");
});
  

    // Other middleware configurations...




app.Run();