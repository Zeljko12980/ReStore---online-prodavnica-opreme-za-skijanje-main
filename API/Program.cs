using API.Data;
using API.Middleware;

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
var logger=scope.ServiceProvider.GetRequiredService<ILogger<Program>>();//loger za errors
try
{
context.Database.Migrate();
DbInitializer.Initialize(context);
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