using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;
using DatingApp.API.Data;
using DatingApp.API.Helpers;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Diagnostics;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;

namespace DatingApp.API
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            var key = Encoding.ASCII.GetBytes(Configuration.GetSection("AppSettings:Token").Value); //Retreiving value from appsettings.json

            services.AddDbContext<DataContext>(x => x.UseSqlServer(Configuration.GetConnectionString("DefaultConnection")));
            services.AddMvc();
            services.AddCors();
            services.AddScoped<IAuthRepository,AuthRepository>();
            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                    .AddJwtBearer(options => {
                        options.TokenValidationParameters = new TokenValidationParameters
                        {
                            ValidateIssuerSigningKey = true,
                            IssuerSigningKey = new SymmetricSecurityKey(key),
                            ValidateIssuer = false,
                            ValidateAudience = false
                        };
                    });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else // if I run project in Production mode this code helps me handle global exeptions
            {
                app.UseExceptionHandler(builder =>{
                    builder.Run(async context =>{
                       context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;

                       var error = context.Features.Get<IExceptionHandlerFeature>();
                       if (error !=null)
                       {
                           context.Response.AddApplicationError(error.Error.Message); //AddApplicationError is a method which I created. It responsibly to attach error message to our response header
                           await context.Response.WriteAsync(error.Error.Message);
                       }
                    });
                });
            }
            app.UseCors(x =>x.AllowAnyHeader().AllowAnyMethod().AllowAnyOrigin().AllowCredentials()); //have to be executed before app.UseMvc();
            app.UseAuthentication();
            app.UseMvc();
        }
    }
}
