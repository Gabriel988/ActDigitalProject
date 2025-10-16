using GeneralTools.Models;

namespace GeneralTools.Interfaces
{
    public interface IProductRepository
    {
        Task<List<Product>> ListProduct();
        Task SaveProduct(Product product);
        Task UpadateProduct(Product product);
        Task<Product> GetProduct(int id);
        Task DeleteProduct(int id);
    }
}
