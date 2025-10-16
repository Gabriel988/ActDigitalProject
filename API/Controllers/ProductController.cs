using GeneralTools.Data;
using GeneralTools.Interfaces;
using GeneralTools.Models;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;


namespace GeneralTools.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        #region Injeção de Dependência

        /// <summary>
        /// Injeção de dependência
        /// </summary>
        public IProductServices productServices;

        public ProductController(IProductServices productServices, EFData context)
        {
            this.productServices = productServices;
        }

        #endregion

        #region Endpoints
        [HttpGet]
        //[Authorize]
        public async Task<ObjectResult> Get([FromQuery] string ?nome)
        {
            try
            {
                var productList = await productServices.ListProduct(nome);
                return Ok(productList);
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = $"Erro ao buscar os produtos: {ex.Message}" });
            }

        }
        
        [HttpGet("getProduct/{id}")]
        //[Authorize]
        public async Task<ObjectResult> GetProduct(int id)
        {
            try
            {
                var product = await productServices.GetProduct(id);
                return Ok(product);

            }
            catch (Exception ex)
            {
                return BadRequest(new { message = $"Erro ao buscar produto: {ex.Message}" });
            }
        }

        [HttpPost("registerProduct")]
        //[Authorize]
        public async Task<ObjectResult> PostProductAsync([FromBody] Product value)
        {
            try {

                await productServices.SaveProduct(value);
                return Ok(new {message = "Produto adicionado com sucesso!"});

            }
            catch(Exception ex)
            {
                return BadRequest(new { message = $"Erro ao adicionar produto: {ex.Message}" });
            }

        }

        [HttpPut("changeProduct/{id}")]
        //[Authorize]
        public async Task<ObjectResult> PutProduct(int id, [FromBody] Product value)
        {
            try
            {

                value.Id = id;
                await productServices.UpadateProduct(value);
                return Ok(new { message = "Produto alterado com sucesso!" });

            }
            catch (Exception ex)
            {
                return BadRequest(new { message = $"Erro ao adicionar um produto: {ex.Message}" });
            }
        }

        [HttpDelete("deleteProduct/{id}")]
        //[Authorize]
        public async Task<ObjectResult> DeleteProduct(int id)
        {
            try
            {
                await productServices.DeleteProduct(id);
                return Ok(new { message = "Produto deletado com sucesso!" });
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = $"Erro ao adicionar produto: {ex.Message}" });
            }
           
        }
        #endregion

    }
}
