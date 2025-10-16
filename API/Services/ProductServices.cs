using GeneralTools.Data;
using GeneralTools.Interfaces;
using GeneralTools.Models;
using System.Threading.Tasks;

namespace GeneralTools.Services
{
    public class ProductServices : IProductServices
    {

        #region Injeção de Dependência

        /// <summary>
        /// Injeção de dependência
        /// </summary>
        private readonly IProductRepository productsRepository;

        /// <summary>
        /// Injeção de dependência
        /// </summary>
        private readonly IApiCredentialsRepository apiRepository;

        public ProductServices(IProductRepository productsRepository, IApiCredentialsRepository apiRepository)
        {
            this.productsRepository = productsRepository;
            this.apiRepository = apiRepository;
        }


        #endregion

        #region Product

        /// <summary>
        /// Método para salvar um produto
        /// </summary>
        /// <param name="product">Objeto</param>
        public async Task SaveProduct(Product product)
        {
            try
            {
                var val = ValidatorObj(product);
                if (!val.isValid)
                    throw new Exception(val.validation.message);

                if (ExistsProduct(product).Result)
                    throw new Exception("Já existe um produto cadastrado com esses dados!");


                await productsRepository.SaveProduct(product);

            }
            catch (Exception ex)
            {
                throw;
            }
        }
        /// <summary>
        /// Lista todos os produtos
        /// </summary>
        public async Task<List<Product>> ListProduct(bool? status)
        {
            try
            {
                var productList = await productsRepository.ListProduct();

                if (productList == null || productList.Count == 0)
                    throw new Exception("Nenhum produto cadastrado!");

                if (status != null)
                    productList = productList.FindAll(x => x.Status == status).ToList();


                return productList;
            }
            catch (Exception ex)
            {
                throw;
            }
        }


        /// <summary>
        /// Método para atualizar um produto
        /// </summary>
        /// <param name="product">Objeto</param>
        public async Task UpadateProduct(Product product)
        {
            try
            {               
                var val = ValidatorObj(product);
                if (!val.isValid)
                    throw new Exception(val.validation.message);

                var id = product.Id.HasValue;
                if(!id)
                    throw new Exception("Id incorreto ou faltando na request");

                var task = GetProduct(product.Id.Value);
                if (task == null)
                    throw new Exception($"Nenhum produto cadastrado com esse Id: {id}");

                if (ExistsProduct(product).Result)
                    throw new Exception("Já existe um produto cadastrado com esses dados!");

                await productsRepository.UpadateProduct(product);
            }
            catch (Exception ex)
            {
                throw;
            }
        }

        /// <summary>
        /// Pega um unico produto pelo ID
        /// </summary>
        /// <param name="id"></param>
        public async Task<Product> GetProduct(int id)
        {
            try
            {
                var product = productsRepository.GetProduct(id);
                if (product == null)
                    throw new Exception($"Nenhum produto cadastrado com esse Id: {id}");
                
                return await product;
            }
            catch (Exception ex)
            {
                throw;
            }
        }

        /// <summary>
        /// Método para deletar um produto
        /// </summary>
        /// <param name="id">
        public async Task DeleteProduct(int id)
        {
            try
            {
                var product = productsRepository.GetProduct(id);
                if (product == null)
                    throw new Exception($"Nenhum produto cadastrado com esse Id: {id}");

               await  productsRepository.DeleteProduct(id);
            }
            catch (Exception ex)
            {
                throw;
            }
        }
        #endregion

        #region ApiCredencials
        /// <summary>
        /// Valida uma credencial
        /// </summary>
        /// <param name="credentials">Objeto</param>
        public bool ValidateCredentials(Credentials credentials)
        {
            try
            {
                return apiRepository.ValidateCredentials(credentials);
            }
            catch (Exception ex)
            {
                throw;
            }
        }

        //public string GetToken(Credentials credentials)
        //{
        //    try
        //    {
        //        var val = ValidatorObj(credentials);
        //        if (!val.isValid)
        //            throw new Exception(val.validation.message);

        //        //Valida no banco de dados
        //        if (!ValidateCredentials(credentials))              
        //            throw new Exception("Credenciais Invalidas!");                
                
                    
        //        return GenerateToken(credentials.User);

        //    }
        //    catch (Exception ex)
        //    {
        //        throw;
        //    }
        //}

        #endregion

        #region Validations

        /// <summary>
        /// Campos que não serão validados
        /// </summary>
        private string[] rulesValidation = ["ID"];


        /// <summary>
        /// Gera Token JWT com base nas credenciais
        /// </summary>
        /// <param name="username"></param>
        /// <returns></returns>
        //public string GenerateToken(string username)
        //{
        //    var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]));
        //    var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

        //    var claims = new[]
        //    {
        //         new Claim(ClaimTypes.Name, username)
        //    };

        //    var token = new JwtSecurityToken(
        //        issuer: _configuration["Jwt:Issuer"],
        //        audience: _configuration["Jwt:Audience"],
        //        claims: claims,
        //        expires: DateTime.Now.AddMinutes(30),
        //        signingCredentials: creds
        //    );

        //    return new JwtSecurityTokenHandler().WriteToken(token);
        //}

        /// <summary>
        /// Valida se os campos do objeto são nulos ou vazios
        /// </summary>
        /// <param name="obj"></param>
        /// <returns></returns>
        public (bool isValid, ValidationObj validation) ValidatorObj(object obj)
        {
            foreach (var prop in obj.GetType().GetProperties())
            {
                var value = prop.GetValue(obj);

                var validation = ValidateValue(value, prop.Name);

                if (!string.IsNullOrEmpty(validation.message))
                    return (false, validation);

            }

            return (true, new ValidationObj());
        }

        /// <summary>
        /// Valida propriedades específicas
        /// </summary>
        /// <param name="value"></param>
        /// <param name="propName"></param>
        /// <returns></returns>
        private ValidationObj ValidateValue(object value, string propName)
        {
            if (rulesValidation.Contains(propName.ToUpper()))
                return new ValidationObj();

            if (value is string str && string.IsNullOrWhiteSpace(str))
                return new ValidationObj($"O campo => {propName} <= é obrigatório e não pode ser nulo ou vazio.");
            if (value == null || (value is int integer && (integer == 0 || integer < 1)))
                return new ValidationObj($"O campo => {propName} <= é obrigatório e não pode ser nulo,vazio, igual a zero ou menor que zero.");

            return new ValidationObj();
        }

        #endregion Validations

        #region AddtionalMethods

        private async Task<bool> ExistsProduct(Product product)
        {
            try
            {

                var listProduct = await productsRepository.ListProduct();

                if (listProduct != null && listProduct.Count > 0 && listProduct.Any(x=>x.Nome.Equals(product.Nome) || x.Descricao.Equals(product.Descricao)))
                    return true;
                else
                    return false;
            }
            catch (Exception ex)
            {
                throw;

            }
        }


        #endregion


    }
}
