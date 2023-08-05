using Microsoft.EntityFrameworkCore;
using Persistence;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddDbContext<DataContext>(opt =>
{
    opt.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection"));
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();


//using means when this particular method is finished 
// anything inside it is goinf to be disposed or destoreyed
// cleaned up from memory as soon as this code is executed
using var scope = app.Services.CreateScope();
var services = scope.ServiceProvider;

try
{
    // automated the migrations 
    // migrations will run as soon application is run
    var context = services.GetRequiredService<DataContext>();
    await context.Database.MigrateAsync();
    await Seed.SeedData(context);
}
catch (Exception ex)
{
    // logger logs against Program
    var logger = services.GetRequiredService<ILogger<Program>>();
    logger.LogError(ex, "An Error occured during migration");
}

app.Run();
