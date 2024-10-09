using ContactManager.ExceptionHandler;

namespace ContactManager
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Add services to the container.

            builder.Services.AddControllers();
            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();
            builder.Services.AddCors(options =>
            {
                options.AddPolicy("AllowAngularApp", policy =>
                {
                    policy.WithOrigins("http://localhost:4200")  // Allow Angular app origin
                          .AllowAnyHeader()                     // Allow any headers
                          .AllowAnyMethod()                     // Allow any HTTP method
                          .AllowCredentials();                  // Allow credentials if needed
                });
            });

            var app = builder.Build();
            // Use the global exception middleware
            app.UseMiddleware<GlobalExceptionMiddleware>();
            // Enable CORS
            app.UseCors("AllowAngularApp");

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseHttpsRedirection();

            app.UseAuthorization();


            app.MapControllers();

            app.Run();
        }
    }
}
