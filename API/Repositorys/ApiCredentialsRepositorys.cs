using GeneralTools.Data;
using GeneralTools.Interfaces;
using GeneralTools.Models;

namespace GeneralTools.Repositorys
{
    public class ApiCredentialsRepository : IApiCredentialsRepository
    {
        //Injeção de dependência
        private readonly IConfiguration _configuration = new ConfigurationBuilder().AddJsonFile("appsettings.json").Build();


        /// <summary>
        /// Valida uma credencial
        /// </summary>
        /// <param name="credentials">Objeto</param>
        public bool ValidateCredentials(Credentials credentials)
        {
            try
            {
                using var db = new EFData();
                var list = db.Credentials.ToList();


                
                return true;
            }
            catch (Exception ex)
            {
                throw new Exception("Erro ao validar usuario: " + ex.Message);
            }
        }

    }
}
