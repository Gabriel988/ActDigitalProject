using GeneralTools.Data;
using GeneralTools.Interfaces;
using GeneralTools.Models;
using Microsoft.EntityFrameworkCore;

namespace GeneralTools.Repositorys
{
    public class ProductRepositorys : IProductRepository
    {

        public EFData _context;

        public ProductRepositorys(EFData context)
        {
            this._context = context;
        }


        /// <summary>
        /// Método para salvar um prduto
        /// </summary>
        /// <param name="product">Objeto</param>
        public async Task SaveProduct(Product product)
        {
            try {
                
                _context.Product.Add(product);
                await _context.SaveChangesAsync();

            }
            catch (Exception ex)
            {
                throw new Exception("Erro ao salvar os produto: " + ex.Message);
            }
        }

        /// <summary>
        /// Lista todos os produtos
        /// </summary>
        public async Task<List<Product>> ListProduct()
        {
            try { 
            
                return await _context.Product.ToListAsync();
            }
            catch (Exception ex)
            {
                throw new Exception("Erro ao listar os produtos: " + ex.Message);
            }
        }

        /// <summary>
        /// Método para atualizar um produto
        /// </summary>
        public void UpadateProduct(Product product)
        {
            try
            {
               _context.Product.Update(product);
            }
            catch (Exception ex)
            {
                throw new Exception("Erro ao atualizar o produto: " + ex.Message);
            }
        }

        /// <summary>
        /// Pega um unico produto pelo ID
        /// </summary>
        /// <param name="id"></param>
        public Product GetProduct(int id)
        {
            try
            {
                _context.Product.Find(id);

                return new Product();
            }
            catch (Exception ex)
            {
                throw new Exception("Erro ao buscar o produto: " + ex.Message);
            }
        }

        /// <summary>
        /// Método para deletar um produto
        /// </summary>
        /// <param name="id">
        public void DeleteProduct(int id)
        {
            try
            {
                _context.Product.Remove(_context.Product.Find(id));
            }
            catch (Exception ex)
            {
                throw new Exception("Erro ao deletar o produto: " + ex.Message);
            }
        }

    }
}
