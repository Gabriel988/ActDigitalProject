using GeneralTools.Data;
using GeneralTools.Interfaces;
using GeneralTools.Models;
using Microsoft.AspNetCore.Mvc;


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
        public async Task<ObjectResult> Get([FromQuery] string ?status)
        {
            try
            {
                var taskList = await productServices.ListProduct(status);
                return Ok(taskList);
            }
            catch (Exception ex)
            {
                return BadRequest($"Erro ao buscar os produtos: {ex.Message}");
            }

        }
        // GET: api/<ValuesController>
        //[HttpPost("auth")]
        //public ObjectResult Auth([FromBody] Credentials credentials)
        //{

        //    try
        //    {
        //        var token = productServices.GetToken(credentials);
        //        return Ok(token);
        //    }
        //    catch (Exception ex)
        //    {
        //        return BadRequest($"Erro ao buscar task: {ex.Message}");
        //    }


        //}

        [HttpGet("getProduct/{id}")]
        //[Authorize]
        public ObjectResult GetProduct(int id)
        {
            try
            {
                var task = productServices.GetProduct(id);
                return Ok(task);

            }
            catch (Exception ex)
            {
                return BadRequest($"Erro ao buscar produto: {ex.Message}");
            }
        }

        [HttpPost("registerProduct")]
        //[Authorize]
        public async Task<ObjectResult> PostProductAsync([FromBody] Product value)
        {
            try {

                await productServices.SaveProduct(value);
                return Ok("Produto adicionado com sucesso!");

            }catch(Exception ex)
            {
                return BadRequest($"Erro ao adicionar produto: {ex.Message}");
            }

        }

        [HttpPut("changeProduct/{id}")]
        //[Authorize]
        public ObjectResult PutProduct(int id, [FromBody] Product value)
        {
            try
            {

                value.Id = id;
                productServices.UpadateProduct(value);
                return Ok("Produto alterado com sucesso!");

            }
            catch (Exception ex)
            {
                return BadRequest($"Erro ao adicionar um produto: {ex.Message}");
            }
        }

        [HttpDelete("deleteProduct/{id}")]
        //[Authorize]
        public ObjectResult DeleteProduct(int id)
        {
            try
            {
                productServices.DeleteProduct(id);
                return Ok("Produto deletado com sucesso!");
            }
            catch (Exception ex)
            {
                return BadRequest($"Erro ao adicionar produto: {ex.Message}");
            }
           
        }
        #endregion

    }
}
