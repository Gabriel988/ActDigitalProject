using GeneralTools.Data;
using GeneralTools.Interfaces;
using GeneralTools.Repositorys;
using GeneralTools.Services;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Banco em memória
builder.Services.AddDbContext<EFData>(opt =>
    opt.UseInMemoryDatabase("ProdutosDB"));

// Serviços e repositórios
builder.Services.AddScoped<IProductRepository, ProductRepositorys>();
builder.Services.AddScoped<IApiCredentialsRepository, ApiCredentialsRepository>();
builder.Services.AddScoped<IProductServices, ProductServices>();

// Controllers
builder.Services.AddControllers();

// Swagger/OpenAPI
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddAuthorization();

// CORS (para Angular)
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAngularApp",
        policy => policy.WithOrigins("http://localhost:4200")
                        .AllowAnyHeader()
                        .AllowAnyMethod());
});

var app = builder.Build();


app.UseCors("AllowAngularApp");
app.UseAuthentication();
app.UseAuthorization();

// Swagger
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.MapControllers();

app.Run();
